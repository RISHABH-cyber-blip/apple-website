'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CLOSER_CARDS } from '@/lib/constants';

function CloserCard({ card, index }: { card: (typeof CLOSER_CARDS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-[28px] cursor-pointer group"
      style={{ background: '#0a0a0a', aspectRatio: '4/5', border: '0.5px solid rgba(255,255,255,0.07)' }}
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
    >
      {/* Background Image */}
      {card.bgImage && (
        <div className="absolute inset-0 overflow-hidden rounded-[28px] z-0">
          <motion.img
            src={card.bgImage}
            alt={card.title}
            className="w-full h-full object-cover object-center pointer-events-none select-none"
            initial={{ scale: 1.08, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 0.45 } : {}}
            whileHover={{ scale: 1.03, opacity: 0.75 }}
            transition={{
              opacity: { duration: 0.8, ease: 'easeOut' },
              scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
            }}
          />
          {/* Subtle gradient overlay to make text pop */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
        </div>
      )}

      {/* Hover glow — white */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[28px] z-10"
        style={{ background: 'radial-gradient(ellipse at 40% 30%, rgba(255,255,255,0.04) 0%, transparent 70%)' }}
      />

      {/* Top border on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/0 group-hover:bg-white/20 transition-all duration-500 z-10" />

      {/* Icon */}
      <div className="absolute top-8 left-8 w-12 h-12 rounded-xl flex items-center justify-center text-xl z-10"
        style={{ background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.1)' }}
      >
        {card.icon}
      </div>

      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-52 h-52 rounded-full border border-white/[0.03] translate-x-20 -translate-y-20 z-10" />
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full border border-white/[0.02] translate-x-28 -translate-y-28 z-10" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-10"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 100%)' }}
      >
        <motion.h3
          className="text-[22px] font-semibold text-white mb-2 tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 + index * 0.07 }}
        >
          {card.title}
        </motion.h3>
        <motion.p
          className="text-[14px] text-white/45 max-w-[240px] leading-relaxed"
          initial={{ opacity: 0, y: 6 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.28 + index * 0.07 }}
        >
          {card.body}
        </motion.p>
        <motion.div
          className="mt-4 flex items-center gap-2 text-white/40 text-[13px] group-hover:text-white/70 transition-colors"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.36 + index * 0.07 }}
        >
          Learn more
          <span className="group-hover:translate-x-1 transition-transform duration-300 inline-block">→</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function CloserLookSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="closer" ref={ref} className="section bg-black py-32 px-11" aria-label="Take a closer look">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="mb-20">
          <motion.p className="label text-white/30 mb-5"
            initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            Take a closer look
          </motion.p>
          <div className="flex items-end justify-between flex-wrap gap-8">
            <motion.h2 className="display-lg text-gradient max-w-[600px]"
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Designed for those who demand more.
            </motion.h2>
            <motion.p className="body-md text-white/40 max-w-[280px]"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.25 }}
            >
              Every material chosen with obsessive precision.
            </motion.p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {CLOSER_CARDS.map((card, i) => (
            <CloserCard key={card.id} card={card} index={i} />
          ))}
        </div>

        <motion.div className="text-center mt-14"
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
        >
          <a href="#lineup" className="btn-ghost">Compare all models →</a>
        </motion.div>
      </div>
    </section>
  );
}
