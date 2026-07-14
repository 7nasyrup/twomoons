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
  const typingTimer = useRef(null);
  const autoTimer = useRef(null);
  const fullTextRef = useRef('');

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
      setCurrentBg(currentLine.bg);
    }
  }, [currentStep, currentLine, triggerTypewriter]);

  const [skipMode, setSkipMode] = useState(false);
  const skipTimer = useRef(null);
  const toggleSkip = useCallback(() => setSkipMode(prev => !prev), []);

  const advanceStep = useCallback(() => {
    if (currentStep < scenarioData.length - 1) {
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
    
    // We pause autoMode if it's a minigame, choice.
    if (autoMode && !isTyping && !isWaitingForChoice && !isMinigame && !isActionWithoutText && !manualTestMode && !endMode) {
      autoTimer.current = setTimeout(() => {
        if (currentStep < scenarioData.length - 1) {
          advanceStep();
        }
      }, 2500);
    }
    return () => clearTimeout(autoTimer.current);
  }, [autoMode, isTyping, isWaitingForChoice, currentStep, scenarioData, advanceStep, currentLine, manualTestMode, endMode]);

  // Skip mode
  useEffect(() => {
    if (skipMode && !endMode) {
      if (currentLine?.type === 'choice' || currentLine?.action?.startsWith('TRIGGER_')) {
        setSkipMode(false);
        return;
      }
      
      if (!isTyping && !isWaitingForChoice) {
        skipTimer.current = setTimeout(() => {
          if (currentStep < scenarioData.length - 1) {
            advanceStep();
          }
        }, 50);
      } else if (isTyping) {
        completeTypewriter();
      }
    }
    return () => clearTimeout(skipTimer.current);
  }, [skipMode, endMode, isTyping, isWaitingForChoice, currentStep, currentLine, scenarioData, advanceStep, completeTypewriter]);

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
