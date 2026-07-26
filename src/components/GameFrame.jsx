import { useState, useEffect } from 'react';

/**
 * Detects whether the device is a mobile/touch device.
 * Uses pointer: coarse media query as primary check, with maxTouchPoints as fallback.
 * This runs once on mount and on resize (to handle desktop ↔ responsive dev tools).
 */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const hasTouch = navigator.maxTouchPoints > 0;
    const smallScreen = window.innerWidth < 1024;
    return (coarse || hasTouch) && smallScreen;
  });

  useEffect(() => {
    const check = () => {
      const coarse = window.matchMedia('(pointer: coarse)').matches;
      const hasTouch = navigator.maxTouchPoints > 0;
      const smallScreen = window.innerWidth < 1024;
      setIsMobile((coarse || hasTouch) && smallScreen);
    };

    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
}

export default function GameFrame({ children, uiLayer }) {
  const isMobile = useIsMobile();

  return (
    <div className="w-screen h-screen bg-[#000000] flex items-center justify-center overflow-hidden">
      <div
        id="game-canvas-wrapper"
        className="relative overflow-hidden bg-luna-abyss"
        style={
          isMobile
            ? {
                /* Mobile: fill the full screen, CSS handles aspect via media queries */
                width: '100vw',
                height: '100dvh',
              }
            : {
                /* PC: preserve existing 16:9 aspect-ratio scaling */
                aspectRatio: '16 / 9',
                width: '100vw',
                maxHeight: '100vh',
                maxWidth: '177.78vh',
              }
        }
      >
        <div className="absolute inset-0">
          {children}
        </div>
        {uiLayer && (
          <div className="absolute inset-0 z-[100]">
            {uiLayer}
          </div>
        )}
      </div>
    </div>
  );
}
