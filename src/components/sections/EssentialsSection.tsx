'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ESSENTIALS = [
  { name: 'AirPods Pro', subtitle: 'Adaptive Audio. Now playing.', price: 'From $249', emoji: '🎧' },
  { name: 'Apple Watch Ultra 2', subtitle: 'Adventure. Redefined.', price: 'From $799', emoji: '⌚' },
  { name: 'MagSafe Charger', subtitle: 'Perfectly aligned. Every time.', price: '$39', emoji: '🔌' },
  { name: 'iPhone Case', subtitle: 'Protection meets style.', price: 'From $49', emoji: '📱' },
  { name: 'Apple TV 4K', subtitle: 'Cinematic. Like you mean it.', price: 'From $129', emoji: '📺' },
  { name: 'AirTag', subtitle: "Lose your knack for losing things.", price: '$29', emoji: '🔵' },
];

const SIGNIFICANT_OTHERS = [
  { name: 'MacBook Pro', subtitle: 'The most powerful Mac laptop.', emoji: '💻' },
  { name: 'iPad Pro', subtitle: 'Supercharged by M4.', emoji: '📐' },
  { name: 'Apple Watch', subtitle: 'The future of health.', emoji: '⌚' },
  { name: 'AirPods', subtitle: 'Magical. Wireless. Effortless.', emoji: '🎵' },
];

export default function EssentialsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="essentials" ref={ref} className="section bg-black py-32 px-11" aria-label="iPhone essentials">
      <div className="max-w-[1200px] mx-auto">

        {/* ── iPhone Essentials ── */}
        <div className="mb-24">
          <motion.p className="label text-white/30 mb-4"
            initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          >Accessorize your iPhone</motion.p>
          <motion.h2 className="display-lg text-gradient mb-14"
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >iPhone essentials.</motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {ESSENTIALS.map((item, i) => (
              <motion.div key={item.name}
                className="rounded-[24px] overflow-hidden cursor-pointer group relative"
                style={{ background: '#0a0a0a', aspectRatio: '1', border: '0.5px solid rgba(255,255,255,0.07)' }}
                initial={{ opacity: 0, y: 36, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -5, borderColor: 'rgba(255,255,255,0.18)', transition: { duration: 0.2 } }}
              >
                <div className="p-8 h-full flex flex-col justify-between">
                  <motion.span className="text-4xl"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.25 }}
                  >{item.emoji}</motion.span>
                  <div>
                    <h3 className="text-[16px] font-semibold text-white mb-1">{item.name}</h3>
                    <p className="text-[13px] text-white/35 mb-3">{item.subtitle}</p>
                    <span className="text-[14px] font-medium text-white/60">{item.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="divider mb-24" />

        {/* ── Significant Others ── */}
        <div className="mb-20">
          <motion.p className="label text-white/30 mb-4"
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          >Works beautifully together</motion.p>
          <motion.h2 className="display-lg text-gradient mb-14"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >Significant others.</motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {SIGNIFICANT_OTHERS.map((item, i) => (
              <motion.a key={item.name} href="#" className="no-underline group rounded-[24px] overflow-hidden"
                style={{ background: '#080808', aspectRatio: '3/4', border: '0.5px solid rgba(255,255,255,0.07)', display: 'block' }}
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, borderColor: 'rgba(255,255,255,0.18)', transition: { duration: 0.2 } }}
              >
                <div className="p-8 h-full flex flex-col justify-between">
                  <motion.span className="text-4xl"
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ duration: 4, repeat: Infinity, delay: i * 0.4 }}
                  >{item.emoji}</motion.span>
                  <div>
                    <h3 className="text-[16px] font-semibold text-white mb-1 group-hover:text-white/70 transition-colors">{item.name}</h3>
                    <p className="text-[13px] text-white/30">{item.subtitle}</p>
                    <p className="text-[13px] mt-3 text-white/0 group-hover:text-white/50 transition-all duration-300">Learn more →</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* ── Final CTA ── */}
        <motion.div
          className="relative rounded-[28px] overflow-hidden p-14 md:p-20 text-center"
          style={{ background: '#080808', border: '0.5px solid rgba(255,255,255,0.1)' }}
          initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 100%, rgba(255,255,255,0.03) 0%, transparent 70%)' }}
          />
          <p className="label text-white/30 mb-4">Built into every iPhone</p>
          <h2 className="display-md text-white mb-6">iPhone.</h2>
          <p className="body-lg text-white/35 max-w-xl mx-auto mb-12">
            FaceTime. iMessage. Maps. Health. Photos. Translate. Everything you need — designed to work perfectly together.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#" className="btn-primary">Shop iPhone 12 Pro</a>
            <a href="#" className="btn-ghost">Learn about iOS</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
