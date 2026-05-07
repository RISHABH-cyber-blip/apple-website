'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15 + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => setLoading(false), 500);
      }
      setProgress(Math.min(current, 100));
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <svg width="28" height="34" viewBox="0 0 814 1000" fill="white" opacity="0.8">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-103.3C200 589.2 176.7 454.1 207.8 332.2c14.4-55.7 54.7-107.7 107.2-141.7 51.4-33 99.7-42 147.4-42 74.1 0 134.3 44.4 181.6 44.4 44.5 0 115.4-50.2 198.2-50.2zm-234.1-181c31.6-37.6 54.5-89.5 54.5-141.5 0-7.1-.5-14.3-1.7-20.3-51.8 1.9-113.1 34.5-149.3 77.4-28.2 32.4-56.1 83.5-56.1 136.3 0 7.9 1.2 15.8 1.7 18.4 3.2.5 8.5 1.2 13.7 1.2 46.5 0 102.4-31.1 137.2-71.5z"/>
            </svg>
          </motion.div>

          <motion.p className="label text-white/25 mb-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          >iPhone 12 Pro</motion.p>

          {/* Progress bar — white */}
          <div className="w-44 h-px bg-white/10 relative overflow-hidden rounded-full">
            <motion.div className="absolute left-0 top-0 bottom-0 rounded-full bg-white"
              style={{ width: `${progress}%` }}
            />
          </div>

          <motion.p className="text-[11px] text-white/15 mt-4 font-mono tabular-nums"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          >{Math.round(progress)}%</motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
