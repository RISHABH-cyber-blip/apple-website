'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { LINEUP_ITEMS } from '@/lib/constants';

function LineupCard({ item, index }: { item: (typeof LINEUP_ITEMS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="flex-shrink-0 w-[290px] rounded-[28px] overflow-hidden relative group"
      style={{
        background: item.isHighlighted ? '#0f0f0f' : '#080808',
        border: item.isHighlighted ? '0.5px solid rgba(255,255,255,0.2)' : '0.5px solid rgba(255,255,255,0.07)',
      }}
      initial={{ opacity: 0, x: 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      {/* Top highlight line on featured */}
      {item.isHighlighted && (
        <div className="absolute top-0 left-0 right-0 h-px bg-white/30" />
      )}

      {/* Visual area */}
      <div className="h-64 relative flex items-center justify-center overflow-hidden"
        style={{ background: item.isHighlighted ? '#111' : '#0a0a0a' }}
      >
        {/* Phone SVG silhouette */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
        >
          <svg width="90" height="170" viewBox="0 0 90 170" fill="none">
            <rect x="6" y="2" width="78" height="166" rx="20"
              fill="none"
              stroke={item.isHighlighted ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)'}
              strokeWidth="1.5"
            />
            <rect x="14" y="14" width="62" height="130" rx="4" fill="rgba(255,255,255,0.03)" />
            <circle cx="45" cy="154" r="5" fill="rgba(255,255,255,0.08)" />
            <rect x="34" y="5" width="22" height="3" rx="1.5" fill="rgba(255,255,255,0.12)" />
            {item.model.includes('Pro') && (
              <>
                <rect x="14" y="18" width="24" height="24" rx="5"
                  fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                <circle cx="26" cy="26" r="4" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
                <circle cx="26" cy="35" r="3.5" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
                <circle cx="32" cy="30" r="3" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
              </>
            )}
          </svg>
        </motion.div>

        {item.isHighlighted && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider"
            style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', border: '0.5px solid rgba(255,255,255,0.2)' }}
          >
            Most Pro
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-7 pb-8 pt-5">
        <h3 className="text-[19px] font-semibold mb-1 tracking-tight text-white">{item.model}</h3>
        <p className="text-[13px] text-white/35 mb-5 leading-snug">{item.tagline}</p>

        <div className="flex flex-col gap-2 mb-5">
          {[['Display', item.size], ['Chip', item.chip], ['Camera', item.camera]].map(([label, value]) => (
            <div key={label} className="flex justify-between text-[12px]">
              <span className="text-white/25">{label}</span>
              <span className="text-white/60">{value}</span>
            </div>
          ))}
        </div>

        {/* Color swatches */}
        <div className="flex items-center gap-2 mb-5">
          {item.colors.map((color, ci) => (
            <button key={ci}
              className="w-4 h-4 rounded-full hover:scale-110 transition-transform"
              style={{ background: color, border: '1px solid rgba(255,255,255,0.15)' }}
            />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[16px] font-semibold text-white">{item.price}</span>
          <a href="#" className="text-[13px] text-white/50 hover:text-white no-underline transition-colors">Shop →</a>
        </div>
      </div>
    </motion.div>
  );
}

export default function LineupSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="lineup" ref={ref} className="section bg-black py-32 overflow-hidden" aria-label="Explore the lineup">
      <div className="px-11 mb-14">
        <motion.p className="label text-white/30 mb-5"
          initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          Explore the line‑up.
        </motion.p>
        <div className="flex items-end justify-between flex-wrap gap-6">
          <motion.h2 className="display-lg text-gradient max-w-[560px]"
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Which iPhone is right for you?
          </motion.h2>
          <motion.p className="body-md text-white/35 max-w-[300px]"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
          >
            Compare models to find the perfect iPhone.
          </motion.p>
        </div>
      </div>

      {/* Horizontal scroll strip */}
      <motion.div className="flex gap-4 px-11 overflow-x-auto pb-4"
        style={{ scrollbarWidth: 'none' }}
        initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.15 }}
      >
        {LINEUP_ITEMS.map((item, i) => (
          <LineupCard key={item.model} item={item} index={i} />
        ))}
      </motion.div>

      <motion.div className="px-11 mt-10 flex gap-4"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
      >
        <a href="#" className="btn-primary">Compare all models</a>
        <a href="#" className="btn-ghost">iPhone Upgrade Program</a>
      </motion.div>
    </section>
  );
}
