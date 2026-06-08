'use client';
import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const ECO_STATS = [
  { value: '100%', label: 'recycled rare earth elements in all magnets' },
  { value: '100%', label: 'recycled tin in the solder of the main logic board' },
  { value: '100%', label: 'recycled aluminum in the enclosure' },
  { value: '2030',  label: 'carbon neutral across the entire supply chain' },
];

export default function EnvironmentSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const { scrollYProgress } = useScroll({
    target: ref,
    layoutEffect: false,
    offset: ['start end', 'end start'],
  });

  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section
      id="environment"
      ref={ref}
      style={{ position: 'relative' }}
      className="section relative bg-black py-36 px-11 overflow-hidden"
      aria-label="Environment"
    >
      {/* Parallax BG text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ y: bgY }}
      >
        <span
          className="text-[clamp(80px,16vw,200px)] font-bold tracking-tight leading-none"
          style={{ color: 'rgba(255,255,255,0.015)' }}
        >
          EARTH
        </span>
      </motion.div>

      <div className="max-w-[980px] mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-20 items-center">

          {/* Left — animated ring visual */}
          <motion.div
            className="relative flex items-center justify-center"
            style={{ aspectRatio: '1' }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Rotating rings */}
            {[1, 0.8, 0.6, 0.4].map((size, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border"
                style={{
                  width: `${size * 100}%`,
                  height: `${size * 100}%`,
                  borderColor: `rgba(${i % 2 === 0 ? '120,200,80' : '255,107,43'},${0.12 + i * 0.04})`,
                }}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{
                  duration: 20 + i * 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            ))}

            {/* Center */}
            <motion.div
              className="relative z-10 flex flex-col items-center justify-center text-center"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
            >
              <div className="text-6xl mb-3">🌍</div>
              <p
                className="text-[32px] font-bold"
                style={{ color: '#78C850' }}
              >
                2030
              </p>
              <p className="text-[13px] text-white/40 tracking-wide">Carbon Neutral</p>
            </motion.div>
          </motion.div>

          {/* Right — content */}
          <div>
            <motion.p
              className="label text-orange-DEFAULT mb-5"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
            >
              Environment
            </motion.p>
            <motion.h2
              className="display-md text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Designed with the planet in mind.
            </motion.h2>
            <motion.p
              className="body-md text-white/55 mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              iPhone 12 Pro is made with more recycled and responsibly sourced materials
              than ever. And we're on track to be fully carbon neutral by 2030 — across
              our entire supply chain and product life cycle.
            </motion.p>

            {/* Eco stats */}
            <div className="flex flex-col gap-4">
              {ECO_STATS.map((stat, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className="flex-shrink-0 w-1 rounded-full mt-2"
                    style={{ height: 32, background: '#78C850' }}
                  />
                  <div>
                    <span
                      className="text-[22px] font-bold"
                      style={{ color: '#78C850' }}
                    >
                      {stat.value}
                    </span>
                    <p className="text-[13px] text-white/45 leading-snug">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#"
              className="inline-flex items-center gap-2 mt-10 text-[15px] font-medium no-underline"
              style={{ color: '#78C850' }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
              whileHover={{ x: 4 }}
            >
              Apple and the Environment →
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
