'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { WHY_APPLE_STEPS } from '@/lib/constants';

// Each card stacks OVER the previous one as you scroll — like a card deck
function StackCard({ step, index }: { step: (typeof WHY_APPLE_STEPS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: '-20% 0px -20% 0px' });

  return (
    // sticky so each card pins in place while the next one slides over it
    <div
      ref={ref}
      className="sticky top-0 h-screen flex items-center justify-center px-6"
      style={{ zIndex: 10 + index }}
    >
      <motion.div
        className="w-full max-w-[900px] rounded-[32px] overflow-hidden relative"
        style={{
          background: index % 2 === 0 ? '#0a0a0a' : '#111111',
          border: '0.5px solid rgba(255,255,255,0.1)',
          minHeight: 480,
        }}
        initial={{ scale: 0.92, opacity: 0, y: 60 }}
        animate={inView ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.92, opacity: 0.6, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Top white line accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />

        <div className="grid md:grid-cols-2 gap-0 h-full">
          {/* Left — text */}
          <div className="p-12 md:p-16 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <span
                className="text-[11px] font-mono tracking-[0.2em] text-white/30"
              >
                0{step.step}
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <motion.p
              className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-4 font-semibold"
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              {step.title}
            </motion.p>

            <motion.h3
              className="text-[clamp(28px,4vw,44px)] font-bold tracking-tight text-white mb-6 leading-tight whitespace-pre-line"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {step.heading}
            </motion.h3>

            <motion.p
              className="text-[15px] text-white/50 leading-relaxed mb-8 max-w-[340px]"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              {step.body}
            </motion.p>

            <motion.a
              href="#"
              className="inline-flex items-center gap-2 text-[14px] text-white/60 hover:text-white no-underline transition-colors group"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              whileHover={{ x: 4 }}
            >
              {step.cta}
            </motion.a>
          </div>

          {/* Right — visual */}
          <div
            className="relative hidden md:flex items-center justify-center overflow-hidden"
            style={{ background: '#050505' }}
          >
            {/* Scan line animation */}
            <motion.div
              className="absolute left-0 right-0 h-[1px] bg-white/10"
              animate={{ top: ['-5%', '105%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
            />

            {/* Icon centered */}
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
            >
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
                style={{ background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)' }}
              >
                {step.icon}
              </div>
              <p className="text-[13px] text-white/30 tracking-widest uppercase">{step.title}</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function WhyAppleSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="why-apple"
      ref={ref}
      className="relative bg-black"
      aria-label="Why Apple is the best place to buy iPhone"
    >
      {/* Section header — sticky at very top */}
      <div className="sticky top-0 z-[5] bg-black/90 backdrop-blur-xl border-b border-white/[0.06] px-11 py-8">
        <motion.p
          className="text-[11px] tracking-[0.2em] uppercase text-white/30 mb-2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          The Apple Difference
        </motion.p>
        <motion.h2
          className="text-[clamp(28px,5vw,52px)] font-bold tracking-tight text-white"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Why Apple is the best place
          <span className="text-white/25"> to buy iPhone.</span>
        </motion.h2>
      </div>

      {/* Stacking cards */}
      <div>
        {WHY_APPLE_STEPS.map((step, i) => (
          <StackCard key={step.step} step={step} index={i} />
        ))}
      </div>

      {/* Spacer so last card unsticks properly */}
      <div className="h-32 bg-black" />
    </section>
  );
}
