'use client';
import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const PRIVACY_FEATURES = [
  { icon: '🔒', title: 'App Tracking Transparency', body: 'Apps must ask your permission before tracking you across other apps and websites.' },
  { icon: '🧠', title: 'On‑Device Intelligence', body: 'Apple Intelligence processes requests on your device. Your data never leaves your phone.' },
  { icon: '📍', title: 'Precise Location Control', body: 'Share your approximate location with apps — not your exact position.' },
  { icon: '📋', title: 'Privacy Nutrition Labels', body: 'See exactly what data every app collects before you download it.' },
];

export default function PrivacySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section id="privacy" ref={ref} className="section relative bg-black py-32 px-11 overflow-hidden" aria-label="Privacy">
      {/* Animated rings BG — white only */}
      <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ y: bgY }}>
        {[320, 520, 720, 920].map((size, i) => (
          <motion.div key={size}
            className="absolute rounded-full border"
            style={{ width: size, height: size, left: -size / 2, top: -size / 2, borderColor: `rgba(255,255,255,${0.025 - i * 0.004})` }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 40 + i * 12, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </motion.div>

      <div className="max-w-[960px] mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.p className="label text-white/30 mb-5"
            initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          >Privacy</motion.p>
          <motion.h2 className="display-lg mb-6"
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-gradient">Privacy is</span><br />
            <span className="text-white/20">a human right.</span>
          </motion.h2>
          <motion.p className="body-lg text-white/40 max-w-lg mx-auto"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.22 }}
          >
            Built from the ground up. Not an afterthought.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-3 mb-14">
          {PRIVACY_FEATURES.map((feat, i) => (
            <motion.div key={feat.title}
              className="p-8 rounded-[24px] group"
              style={{ background: '#080808', border: '0.5px solid rgba(255,255,255,0.07)' }}
              initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ borderColor: 'rgba(255,255,255,0.18)', transition: { duration: 0.2 } }}
            >
              <div className="text-3xl mb-5">{feat.icon}</div>
              <h3 className="text-[18px] font-semibold text-white mb-3">{feat.title}</h3>
              <p className="text-[14px] text-white/40 leading-relaxed">{feat.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Peace of Mind block */}
        <motion.div
          className="relative rounded-[28px] overflow-hidden p-14 md:p-20 text-center"
          style={{ background: '#080808', border: '0.5px solid rgba(255,255,255,0.1)' }}
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(255,255,255,0.03) 0%, transparent 70%)' }}
          />

          <motion.div className="text-5xl mb-8 inline-block"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >🛡️</motion.div>

          <p className="label text-white/30 mb-4">Peace of Mind</p>
          <h3 className="display-md text-white mb-6">
            We make the tech.<br />
            <span className="text-white/20">You keep the data.</span>
          </h3>
          <p className="body-md text-white/35 max-w-md mx-auto mb-12">
            AppleCare+. Face ID. Secure Enclave. Find My. iPhone comes with
            industry‑leading protections so you can focus on what matters.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="#" className="btn-primary">Learn about privacy</a>
            <a href="#" className="btn-ghost">AppleCare+</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
