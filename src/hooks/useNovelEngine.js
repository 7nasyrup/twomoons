import { useState, useEffect, useRef, useCallback } from 'react';

export function useNovelEngine(scenarioData, options = {}) {
  const { manualTestMode = false, endMode = false } = options;
  const prologueLines = scenarioData ? scenarioData.filter(line => line.scene === "PROLOGUE") : [];
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isWaitingForChoice, setIsWaitingForChoice] = useState(false);
  const [backlog, setBacklog] = useState(prologueLines);
  const [autoMode, setAutoMode] = useState(false);
  const [hudVisible, setHudVisible] = useState(true);
  const [currentBg, setCurrentBg] = useState('');
  const [isBgTransitioning, setIsBgTransitioning] = useState(false);
  const [isBgFadingOut, setIsBgFadingOut] = useState(false);
  const prevBgRef = useRef('');
  const nextBgRef = useRef('');
  const typingTimer = useRef(null);
  const autoTimer = useRef(null);
  const fullTextRef = useRef('');
  const isAdvancingRef = useRef(false);

  const currentLine = scenarioData?.[currentStep] || null;

  const triggerTypewriter = useCallback((text, speed = 35) => {
    clearInterval(typingTimer.current);
    setIsTyping(true);
    fullTextRef.current = text;

    let currentString = '';
    setDisplayedText('');

    typingTimer.current = setInterval(() => {
      if (currentString.length < text.length) {
        currentString += text.charAt(currentString.length);
        setDisplayedText(currentString);
      } else {
        clearInterval(typingTimer.current);
        setDisplayedText(text);
        setIsTyping(false);
      }
    }, speed);
  }, []);

  const completeTypewriter = useCallback(() => {
    clearInterval(typingTimer.current);
    setDisplayedText(fullTextRef.current);
    setIsTyping(false);
  }, []);

  // Trigger typewriter when step changes
  useEffect(() => {
    isAdvancingRef.current = false;
    if (currentLine?.text) {
      triggerTypewriter(currentLine.text);
    }
    if (currentLine?.type === 'choice') {
      setIsWaitingForChoice(true);
    }
    // Block all advancement on ending screens
    if (
      currentLine?.action === 'FADE_TO_HAPPY_END' ||
      currentLine?.action === 'FADE_TO_BAD_END' ||
      currentLine?.action === 'FADE_TO_DEMO_END'
    ) {
      setIsWaitingForChoice(true);
    }
    if (currentLine?.speaker_sprite && currentLine.speaker_sprite === 'Mutsunori_default') {
      const charLeftImg = document.getElementById("char-left-img");
      if (charLeftImg) {
        charLeftImg.style.backgroundImage = `url(/character/Mutsunori/${currentLine.speaker_sprite}.png)`;
      }
    } else if (currentLine?.speaker_sprite && currentLine.speaker_sprite === 'Professor_default') {
      const charRightImg = document.getElementById("char-right-img");
      if (charRightImg) {
        charRightImg.style.backgroundImage = `url(/character/Hirumi/Hirumi_default.png)`;
      }
    }
    
    if (currentLine?.bg) {
      const newBg = currentLine.bg;
      const isPrologue = currentLine.scene === 'PROLOGUE';
      const isSpecialAction = [
        'FADE_TO_BLACK', 'WAKE_UP', 'FADE_IN', 'FADE_OUT',
        'WAIT_SECONDS', 'SLOW_FADE_IN', 'WAIT_SECONDS_AND_MOVE_MOON', 'ALL_FADE_OUT', 'WAIT_FADE',
        'WHITE_OUT_END'
      ].includes(currentLine.action);

      if (
        !isPrologue &&
        !isSpecialAction &&
        prevBgRef.current !== '' &&
        prevBgRef.current !== newBg
      ) {
        // Bg changed: trigger blackout and delay typing
        setIsBgTransitioning(true);
        clearInterval(typingTimer.current);
        setDisplayedText('');
        setIsTyping(false);
        // 背景は暗転中に切り替えるため、今はまだ setCurrentBg しない
        nextBgRef.current = newBg;
        prevBgRef.current = newBg;
      } else {
        prevBgRef.current = newBg;
        setCurrentBg(newBg);
      }
    }
  }, [currentStep, currentLine, triggerTypewriter]);

  // Handle the blackout duration
  useEffect(() => {
    if (isBgTransitioning) {
      // 暗転開始から500msで画面が完全に黒くなる
      const transTimer = setTimeout(() => {
        // 画面が真っ黒の状態で背景を切り替える
        setCurrentBg(nextBgRef.current);
        // 暗転を解除してテキストを表示
        setIsBgTransitioning(false);
        setIsBgFadingOut(true);
        if (currentLine?.text) {
          triggerTypewriter(currentLine.text);
        }
      }, 500);
      return () => clearTimeout(transTimer);
    }
  }, [isBgTransitioning, currentLine, triggerTypewriter]);

  // Handle the fade out duration
  useEffect(() => {
    if (isBgFadingOut) {
      const fadeTimer = setTimeout(() => {
        setIsBgFadingOut(false);
      }, 500);
      return () => clearTimeout(fadeTimer);
    }
  }, [isBgFadingOut]);

  const [skipMode, setSkipMode] = useState(false);
  const skipTimer = useRef(null);
  const toggleSkip = useCallback(() => setSkipMode(prev => !prev), []);

  const advanceStep = useCallback(() => {
    if (currentStep < scenarioData.length - 1) {
      if (isAdvancingRef.current) return;
      isAdvancingRef.current = true;

      // Add to backlog (exclude prologue since it is pre-populated)
      if (currentLine && currentLine.scene !== "PROLOGUE") {
        setBacklog(prev => [...prev, currentLine]);
      }

      // Check if current line has a jumpTo property
      if (currentLine?.jumpTo) {
        const targetIdx = scenarioData.findIndex(line => line.label === currentLine.jumpTo);
        if (targetIdx !== -1) {
          setCurrentStep(targetIdx);
          setIsWaitingForChoice(false);
          return;
        }
      }

      setCurrentStep(prev => prev + 1);
      setIsWaitingForChoice(false);
    }
  }, [currentStep, scenarioData, currentLine]);

  const nextStep = useCallback(() => {
    if (isTyping) {
      completeTypewriter();
    } else if (!isWaitingForChoice && currentStep < scenarioData.length - 1) {
      advanceStep();
    }
  }, [isTyping, isWaitingForChoice, currentStep, scenarioData.length, completeTypewriter, advanceStep]);

  const selectChoice = useCallback((choiceIndex) => {
    setIsWaitingForChoice(false);
    const selectedChoice = currentLine?.choices?.[choiceIndex];
    if (selectedChoice && selectedChoice.targetLabel) {
      const targetIdx = scenarioData.findIndex(line => line.label === selectedChoice.targetLabel);
      if (targetIdx !== -1) {
        if (currentLine && currentLine.scene !== "PROLOGUE") {
          setBacklog(prev => [...prev, currentLine]);
        }
        setCurrentStep(targetIdx);
        return;
      }
    }
    advanceStep();
  }, [currentLine, scenarioData, advanceStep]);

  const jumpToStep = useCallback((stepIndex) => {
    if (stepIndex >= 0 && stepIndex < scenarioData.length) {
      setCurrentStep(stepIndex);
      setIsWaitingForChoice(false);
    }
  }, [scenarioData.length]);

  const toggleAuto = useCallback(() => setAutoMode(prev => !prev), []);
  const toggleHud = useCallback(() => setHudVisible(prev => !prev), []);
  const clearBacklog = useCallback(() => {
    const prologue = scenarioData ? scenarioData.filter(line => line.scene === "PROLOGUE") : [];
    setBacklog(prologue);
  }, [scenarioData]);

  useEffect(() => {
    const isMinigame = currentLine?.action?.startsWith('TRIGGER_');
    const isActionWithoutText = currentLine?.action && !currentLine?.text && !currentLine?.action?.startsWith('TRIGGER_');
    
    // We pause autoMode if it's a minigame, choice, or during a background transition.
    if (autoMode && !isBgTransitioning && !isBgFadingOut && !isTyping && !isWaitingForChoice && !isMinigame && !isActionWithoutText && !manualTestMode && !endMode) {
      autoTimer.current = setTimeout(() => {
        if (currentStep < scenarioData.length - 1) {
          advanceStep();
        }
      }, 2500);
    }
    return () => clearTimeout(autoTimer.current);
  }, [autoMode, isTyping, isWaitingForChoice, currentStep, scenarioData, advanceStep, currentLine, manualTestMode, endMode, isBgTransitioning, isBgFadingOut]);

  // Skip mode
  useEffect(() => {
    if (skipMode && !endMode) {
      if (currentLine?.type === 'choice' || currentLine?.action?.startsWith('TRIGGER_')) {
        setSkipMode(false);
        return;
      }
      
      if (!isTyping && !isWaitingForChoice && !isBgTransitioning && !isBgFadingOut) {
        skipTimer.current = setTimeout(() => {
          if (currentStep < scenarioData.length - 1) {
            advanceStep();
          }
        }, 50);
      } else if (isTyping && !isBgTransitioning && !isBgFadingOut) {
        completeTypewriter();
      }
    }
    return () => clearTimeout(skipTimer.current);
  }, [skipMode, endMode, isTyping, isWaitingForChoice, currentStep, currentLine, scenarioData, advanceStep, completeTypewriter, isBgTransitioning, isBgFadingOut]);

  // Cleanup
  useEffect(() => {
    return () => {
      clearInterval(typingTimer.current);
      clearTimeout(autoTimer.current);
      clearTimeout(skipTimer.current);
    };
  }, []);

  return {
    currentStep,
    currentLine,
    displayedText,
    isTyping,
    isWaitingForChoice,
    backlog,
    autoMode,
    skipMode,
    hudVisible,
    currentBg,
    isBgTransitioning,
    isBgFadingOut,
    nextStep,
    selectChoice,
    jumpToStep,
    toggleAuto,
    toggleSkip,
    setSkipMode,
    toggleHud,
    setHudVisible,
    clearBacklog,
    totalSteps: scenarioData.length,
  };
}
