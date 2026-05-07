'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Marquee from '@/components/ui/Marquee';

const STATS = [
  { value: 5,   suffix: 'nm',  label: 'chip process node',     detail: 'Most advanced in a smartphone' },
  { value: 17,  suffix: 'hr',  label: 'video playback',        detail: 'All-day battery life' },
  { value: 12,  suffix: 'MP',  label: 'triple camera system',  detail: 'Pro-grade photography' },
  { value: 4,   suffix: '×',   label: 'optical zoom range',    detail: 'Get closer to every moment' },
  { value: 5,   suffix: 'G',   label: 'connectivity',          detail: 'Fastest wireless speeds' },
  { value: 2532, suffix: 'px', label: 'display resolution',    detail: 'Super Retina XDR' },
];

const MARQUEE_ITEMS = [
  'A14 Bionic',
  'Pro Camera System',
  'Ceramic Shield',
  'MagSafe',
  '5G Speed',
  'Super Retina XDR',
  'Night Mode',
  'ProRAW',
  'LiDAR Scanner',
  'Apple Intelligence',
  'Face ID',
  'Surgical-Grade Steel',
];

function AnimatedCounter({
  target,
  suffix,
  animate,
  delay = 0,
}: {
  target: number;
  suffix: string;
  animate: boolean;
  delay?: number;
}) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!animate || startedRef.current) return;
    startedRef.current = true;

    const duration = 1800;
    const startTime = performance.now() + delay * 1000;
    let raf: number;

    const tick = (now: number) => {
      if (now < startTime) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setCount(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate, target, delay]);

  return (
    <span className="tabular-nums">
      {count.toLocaleString()}
      <span style={{ color: 'var(--orange)' }}>{suffix}</span>
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="section bg-black py-24 overflow-hidden"
      aria-label="iPhone 12 Pro stats"
    >
      {/* Marquee top */}
      <div className="mb-16 py-4" style={{ borderTop: '0.5px solid rgba(255,255,255,0.07)', borderBottom: '0.5px solid rgba(255,255,255,0.07)' }}>
        <Marquee items={MARQUEE_ITEMS} speed={35} />
      </div>

      {/* Stats grid */}
      <div className="max-w-[1240px] mx-auto px-11">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.06)' }}>
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col gap-2 p-10"
              style={{ background: '#000' }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.07 }}
            >
              <div
                className="text-[clamp(36px,5vw,64px)] font-bold tracking-tight leading-none"
                style={{ color: '#fff' }}
              >
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  animate={inView}
                  delay={i * 0.08}
                />
              </div>
              <div className="text-[14px] text-white/50 leading-snug">{stat.label}</div>
              <div className="text-[12px] text-white/25">{stat.detail}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee bottom (reverse) */}
      <div className="mt-16 py-4" style={{ borderTop: '0.5px solid rgba(255,255,255,0.07)', borderBottom: '0.5px solid rgba(255,255,255,0.07)' }}>
        <Marquee items={MARQUEE_ITEMS} speed={50} direction="right" />
      </div>
    </section>
  );
}
