'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { BATTERY_STATS } from '@/lib/constants';
import dynamic from 'next/dynamic';
import styles from './BatterySection.module.css';
const ParticleCanvas = dynamic(() => import('@/components/3d/ParticleCanvas'), { ssr: false });

function BatteryBar({ stat, index, animate }: { stat: (typeof BATTERY_STATS)[0]; index: number; animate: boolean }) {
  const maxHours = 65;
  const pct = (stat.hours / maxHours) * 100;

  return (
    <motion.div className="flex flex-col gap-3"
      initial={{ opacity: 0, x: -24 }} animate={animate ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-lg">{stat.icon}</span>
          <span className="text-[15px] text-white/70">{stat.label}</span>
        </div>
        <motion.span className="text-[26px] font-bold text-white tabular-nums"
          initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 + index * 0.12 }}
        >
          {stat.hours}<span className="text-[14px] font-normal text-white/30 ml-1">hr</span>
        </motion.span>
      </div>
      <div className="relative h-px rounded-full bg-white/10">
        <motion.div className={`absolute left-0 top-0 bottom-0 rounded-full bg-white ${styles.barFill}`}
          initial={{ width: '0%' }} animate={animate ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.4, delay: 0.5 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  );
}

export default function BatterySection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({ target: ref, layoutEffect: false, offset: ['start end', 'end start'] });
  const particleProgress = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);
  const [pProgress, setPProgress] = useState(0);
  useEffect(() => particleProgress.on('change', setPProgress), [particleProgress]);

  return (
    <section id="chip" ref={ref} className="relative section bg-black py-32 px-11" aria-label="Chip and battery">
      <div className="max-w-[960px] mx-auto">
        <div className="text-center mb-20">
          <motion.p className="label text-white/30 mb-5"
            initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          >Chip & Battery Life</motion.p>
          <motion.h2 className="display-lg text-gradient mb-6"
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >Power that lasts.</motion.h2>
          <motion.p className="body-lg text-white/40 max-w-md mx-auto"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.22 }}
          >A14 Bionic chip and all-day battery life in one device.</motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Particle visual */}
          <motion.div className="relative rounded-[28px] overflow-hidden"
            style={{ aspectRatio: '4/5', background: '#080808', border: '0.5px solid rgba(255,255,255,0.07)' }}
            initial={{ opacity: 0, scale: 0.94 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <ParticleCanvas progress={pProgress} width={600} height={750} className="absolute inset-0 w-full h-full" />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <motion.div className="text-center"
                initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
              >
                <div className="text-[68px] font-bold tracking-tight text-white mb-0">A14</div>
                <div className="text-[22px] font-semibold text-white/50 tracking-[0.3em] uppercase">Bionic</div>
                <div className="mt-2 label text-white/20">5‑nanometer chip</div>
              </motion.div>
            </div>
            <div className={styles.overlay} />
          </motion.div>

          {/* Battery bars */}
          <div className="flex flex-col gap-10">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
              <h3 className="display-sm text-white mb-3">All‑day battery.</h3>
              <p className="body-md text-white/40">Up to 17 hours video playback. MagSafe charging. Ready for anything.</p>
            </motion.div>

            <div className="flex flex-col gap-8">
              {BATTERY_STATS.map((stat, i) => (
                <BatteryBar key={stat.label} stat={stat} index={i} animate={inView} />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 mt-2">
              {[['40%', 'faster CPU'], ['30%', 'faster GPU'], ['2×', 'Neural Engine']].map(([value, label], i) => (
                <motion.div key={label} className="text-center p-5 rounded-2xl"
                  style={{ background: '#0a0a0a', border: '0.5px solid rgba(255,255,255,0.08)' }}
                  initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.08 }}
                >
                  <div className="text-[22px] font-bold text-white">{value}</div>
                  <div className="text-[11px] text-white/30 mt-1">{label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
