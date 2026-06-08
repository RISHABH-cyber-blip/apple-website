'use client';
import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { HERO_PANELS } from '@/lib/constants';
import { mapRange } from '@/lib/utils';

const Scene = dynamic(() => import('@/components/3d/Scene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border border-orange-DEFAULT/40 rounded-full border-t-orange-DEFAULT animate-spin" />
        <p className="label text-white/30">Loading iPhone 12 Pro...</p>
      </div>
    </div>
  ),
});

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activePanel, setActivePanel] = useState<string | null>('know');
  const [showScrollHint, setShowScrollHint] = useState(true);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    layoutEffect: false,
    offset: ['start start', 'end end'],
  });

  // Sync scroll progress
  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      setScrollProgress(v);
      setShowScrollHint(v < 0.03);

      // Determine active panel
      let found = null;
      for (const panel of HERO_PANELS) {
        if (v >= panel.triggerAt && v <= panel.exitAt) {
          found = panel.id;
          break;
        }
      }
      setActivePanel(found);
    });
  }, [scrollYProgress]);

  const currentPanel = HERO_PANELS.find((p) => p.id === activePanel);

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{ height: '600vh', position: 'relative' }}
      className="relative"
      aria-label="iPhone 12 Pro hero"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 3D Canvas */}
        <div className="absolute inset-0 z-0">
          <Scene scrollProgress={scrollProgress} />
        </div>

        {/* Ambient BG glow */}
        <div
          className="absolute inset-0 pointer-events-none z-[1] transition-opacity duration-1000"
          style={{
            background: scrollProgress > 0.35 && scrollProgress < 0.52
              ? 'radial-gradient(ellipse 50% 60% at 60% 50%, rgba(255,107,43,0.12) 0%, transparent 70%)'
              : 'radial-gradient(ellipse 40% 50% at 50% 50%, rgba(255,107,43,0.05) 0%, transparent 70%)',
          }}
        />

        {/* Noise grain overlay */}
        <div className="absolute inset-0 z-[2] pointer-events-none noise-overlay opacity-30" />

        {/* CENTER INTRO PANEL (initial) */}
        <AnimatePresence mode="wait">
          {activePanel === 'know' && (
            <motion.div
              key="know-center"
              className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center pointer-events-none"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.p
                className="label text-orange-DEFAULT mb-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Get to Know iPhone
              </motion.p>
              <motion.h1
                className="display-xl text-gradient mb-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                iPhone 12 Pro.
              </motion.h1>
              <motion.p
                className="body-lg text-white/55 max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                A new era of Pro begins.
              </motion.p>

              {/* perspective indicators */}
              <motion.div
                className="absolute bottom-[18%] flex gap-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {['Front', 'Left', 'Right'].map((label, i) => (
                  <span
                    key={label}
                    className="label text-white/30"
                    style={{ color: i === 0 ? 'var(--orange)' : undefined }}
                  >
                    {label}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SIDE PANELS — shown for all non-center panels */}
        <AnimatePresence mode="wait">
          {currentPanel && currentPanel.id !== 'know' && (
            <motion.div
              key={currentPanel.id}
              className={`absolute z-10 top-1/2 -translate-y-1/2 max-w-[440px] pointer-events-none ${
                currentPanel.side === 'left'
                  ? 'left-[7%]'
                  : currentPanel.side === 'right'
                  ? 'right-[7%]'
                  : 'left-1/2 -translate-x-1/2 text-center'
              }`}
              initial={{ opacity: 0, x: currentPanel.side === 'left' ? -40 : 40, y: '-50%' }}
              animate={{ opacity: 1, x: 0, y: '-50%' }}
              exit={{ opacity: 0, x: currentPanel.side === 'left' ? -20 : 20, y: '-50%' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.p
                className="label text-orange-DEFAULT mb-4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {currentPanel.tag}
              </motion.p>
              <motion.h2
                className="display-md text-white mb-5 whitespace-pre-line"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
              >
                {currentPanel.heading}
              </motion.h2>
              <motion.p
                className="body-md text-white/60 max-w-[360px]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.26 }}
              >
                {currentPanel.body}
              </motion.p>

              {/* Decorative line */}
              <motion.div
                className="mt-8 flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="h-px w-12 bg-orange-DEFAULT/60" />
                <span className="text-[11px] tracking-[0.2em] uppercase text-white/25">
                  {currentPanel.id}
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section progress dots */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-3">
          {HERO_PANELS.map((panel) => (
            <div
              key={panel.id}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{
                background: activePanel === panel.id ? 'var(--orange)' : 'rgba(255,255,255,0.2)',
                transform: activePanel === panel.id ? 'scale(1.6)' : 'scale(1)',
              }}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <AnimatePresence>
          {showScrollHint && (
            <motion.div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.5 }}
            >
              <span className="label text-white/30 text-[10px]">Scroll to explore</span>
              <div
                className="w-px h-12"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255,107,43,0.8), transparent)',
                  animation: 'scrollPulse 1.8s ease-in-out infinite',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
