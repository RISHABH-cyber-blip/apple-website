'use client';
import { motion } from 'framer-motion';

interface MarqueeProps {
  items: string[];
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
}

export default function Marquee({
  items,
  speed = 40,
  direction = 'left',
  className,
}: MarqueeProps) {
  const doubled = [...items, ...items];
  const dir = direction === 'left' ? '-50%' : '0%';
  const dirStart = direction === 'left' ? '0%' : '-50%';

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex gap-12"
        animate={{ x: [dirStart, dir] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-12 text-[13px] tracking-[0.18em] uppercase text-white/20 font-medium"
          >
            {item}
            <span className="text-orange-DEFAULT/40 text-[10px]">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
