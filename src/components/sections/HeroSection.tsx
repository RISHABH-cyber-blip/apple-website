'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('@/components/3d/Scene'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="w-10 h-10 border border-orange-DEFAULT/40 rounded-full border-t-orange-DEFAULT animate-spin" />
      <p className="label text-white/30 text-[11px]">Loading 3D Model...</p>
    </div>
  ),
});

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="hero"
      ref={ref}
      className="section relative bg-black min-h-screen flex flex-col items-center justify-start text-center px-6 pt-28 overflow-hidden"
      aria-label="iPhone 12 Pro hero"
    >
      {/* Ambient glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 50% 40%, rgba(255,107,43,0.10) 0%, transparent 70%)',
        }}
      />
      <div className="absolute inset-0 pointer-events-none noise-overlay opacity-30" />

      {/* Content */}
      <motion.p
        className="label text-orange-DEFAULT mb-5 relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Get to Know iPhone
      </motion.p>

      <motion.h1
        className="display-xl text-gradient mb-5 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        iPhone 12 Pro.
      </motion.h1>

      <motion.p
        className="body-lg text-white/55 max-w-md mb-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.25 }}
      >
        A new era of Pro begins.
      </motion.p>

      {/* CTA Buttons (Above the iPhone model) */}
      <motion.div
        className="flex gap-4 relative z-10 mb-10"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5 }}
      >
        <a href="#lineup" className="btn-primary">Buy</a>
        <a href="#closer" className="btn-ghost">Learn more</a>
      </motion.div>

      {/* 3D GLB phone model */}
      <motion.div
        className="relative z-10 w-full max-w-[340px] h-[400px] md:h-[480px]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <Scene />
      </motion.div>
    </section>
  );
}
