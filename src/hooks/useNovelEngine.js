import { useState, useEffect, useRef, useCallback } from 'react';

export function useNovelEngine(scenarioData) {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isWaitingForChoice, setIsWaitingForChoice] = useState(false);
  const [backlog, setBacklog] = useState([]);
  const [autoMode, setAutoMode] = useState(false);
  const [hudVisible, setHudVisible] = useState(true);
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
  }, [currentStep, currentLine, triggerTypewriter]);

  // Auto mode
  useEffect(() => {
    if (autoMode && !isTyping && !isWaitingForChoice) {
      autoTimer.current = setTimeout(() => {
        if (currentStep < scenarioData.length - 1) {
          advanceStep();
        }
      }, 2500);
    }
    return () => clearTimeout(autoTimer.current);
  }, [autoMode, isTyping, isWaitingForChoice, currentStep]);

  const advanceStep = useCallback(() => {
    if (currentStep < scenarioData.length - 1) {
      // Add to backlog
      if (currentLine) {
        setBacklog(prev => [...prev, currentLine]);
      }
      setCurrentStep(prev => prev + 1);
      setIsWaitingForChoice(false);
    }
  }, [currentStep, scenarioData.length, currentLine]);

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
        if (currentLine) {
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

  // Cleanup
  useEffect(() => {
    return () => {
      clearInterval(typingTimer.current);
      clearTimeout(autoTimer.current);
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
    hudVisible,
    nextStep,
    selectChoice,
    jumpToStep,
    toggleAuto,
    toggleHud,
    setHudVisible,
    totalSteps: scenarioData.length,
  };
}
