import React, { useEffect, useState } from 'react';
import { Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PortraitWarningOverlay() {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      // Check if it's a mobile device size and portrait orientation
      const isMobileSize = window.innerWidth < 1024;
      setIsPortrait(isMobileSize && window.innerHeight > window.innerWidth);
    };

    // Initial check
    checkOrientation();

    // Listen to resize
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  return (
    <AnimatePresence>
      {isPortrait && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 text-slate-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ rotate: -90 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="mb-8 text-[#00e5ff]"
          >
            <Smartphone size={80} strokeWidth={1.5} />
          </motion.div>
          <h2 className="text-xl font-bold font-noto tracking-wider mb-4 text-center">
            スマートフォンを<br/>横向きにしてください
          </h2>
          <p className="text-sm text-slate-400 font-noto text-center px-8 leading-relaxed">
            このゲームは横画面でのプレイに最適化されています。<br/>
            画面の自動回転をオンにして、端末を横に傾けてお楽しみください。
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
