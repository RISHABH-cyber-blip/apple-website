'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { mapRange } from '@/lib/utils';

export default function CameraZoomSection() {
  const ref = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>();
  const inView = useInView(ref, { once: false, margin: '-10%' });

  const { scrollYProgress } = useScroll({
    target: ref,
    layoutEffect: false,
    offset: ['start end', 'end start'],
  });

  const lensScale = useTransform(scrollYProgress, [0.1, 0.5], [0.6, 1.4]);
  const lensOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.3, 0.6], [40, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.55], [0, 1]);
  const tunnelProgress = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);

  const [tp, setTp] = useState(0);
  useEffect(() => tunnelProgress.on('change', setTp), [tunnelProgress]);

  // Lens tunnel canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let t = 0;
    const draw = () => {
      animRef.current = requestAnimationFrame(draw);
      t += 0.012;

      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;

      ctx.fillStyle = 'rgba(0,0,0,0.18)';
      ctx.fillRect(0, 0, W, H);

      const rings = 12;
      for (let i = rings; i >= 0; i--) {
        const progress = ((i / rings) + t * 0.3) % 1;
        const r = progress * Math.min(W, H) * 0.55 * (0.5 + tp * 0.5);
        const alpha = (1 - progress) * 0.6 * (inView ? 1 : 0);
        const colorT = progress;
        const hue = 20 + colorT * 15;
        const sat = 80 + colorT * 20;
        const light = 45 + colorT * 10;

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${hue},${sat}%,${light}%,${alpha})`;
        ctx.lineWidth = 1.5 + (1 - progress) * 2;
        ctx.stroke();
      }

      // Central glow
      const glowR = 30 + Math.sin(t * 2) * 8;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR * (1 + tp));
      grad.addColorStop(0, `rgba(255,255,255,${0.9 * (inView ? 1 : 0)})`);
      grad.addColorStop(0.3, `rgba(255,107,43,${0.6 * (inView ? 1 : 0)})`);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, glowR * (1 + tp), 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Lens flare streaks
      if (tp > 0.3) {
        for (let s = 0; s < 6; s++) {
          const angle = (s / 6) * Math.PI * 2 + t * 0.5;
          const len = 60 * tp * (0.8 + Math.sin(t + s) * 0.2);
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
          ctx.strokeStyle = `rgba(255,107,43,${0.15 * tp})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    };

    canvas.width = 500;
    canvas.height = 500;
    draw();
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [inView, tp]);

  const CAMERA_SPECS = [
    { label: 'Main', mp: '12MP', aperture: 'ƒ/1.6', detail: 'Largest aperture ever in iPhone' },
    { label: 'Ultra Wide', mp: '12MP', aperture: 'ƒ/2.4', detail: '120° field of view' },
    { label: 'Telephoto', mp: '12MP', aperture: 'ƒ/2.0', detail: '4× optical zoom range' },
  ];

  return (
    <section
      id="camera"
      ref={ref}
      style={{ position: 'relative' }}
      className="section relative bg-black py-36 overflow-hidden"
      aria-label="Cutting-edge camera"
    >
      {/* Section background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,107,43,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-[1240px] mx-auto px-11">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            className="label text-orange-DEFAULT mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Cutting-Edge Camera
          </motion.p>
          <motion.h2
            className="display-lg text-gradient mb-6"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, ease: [0.16, 1, 0.3, 1], duration: 0.9 }}
          >
            Pro camera.<br />Pro results.
          </motion.h2>
          <motion.p
            className="body-lg text-white/50 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
          >
            Triple-camera system with LiDAR Scanner. Night mode portraits.
            ProRAW. Dolby Vision HDR video.
          </motion.p>
        </div>

        {/* Main visual + content */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">

          {/* Left — Lens tunnel animation */}
          <motion.div
            className="relative flex items-center justify-center"
            style={{ scale: lensScale, opacity: lensOpacity }}
          >
            <canvas
              ref={canvasRef}
              className="rounded-full"
              style={{
                width: '100%',
                maxWidth: 460,
                aspectRatio: '1',
                filter: `blur(${(1 - tp) * 0.5}px)`,
              }}
            />
            {/* Outer ring decoration */}
            <motion.div
              className="absolute inset-0 rounded-full border"
              style={{ borderColor: 'rgba(255,107,43,0.2)' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute rounded-full border"
              style={{
                inset: '8%',
                borderColor: 'rgba(255,255,255,0.06)',
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>

          {/* Right — Spec content */}
          <motion.div style={{ y: textY, opacity: textOpacity }}>
            <h3 className="display-sm text-white mb-6">
              Go inside the lens.
            </h3>
            <p className="body-md text-white/55 mb-10 leading-relaxed">
              The most versatile iPhone camera system ever.
              With three pro lenses, a new sensor‑shift optical image stabilisation system,
              and advanced computational photography, every shot is extraordinary.
            </p>

            {/* Camera specs */}
            <div className="flex flex-col gap-4">
              {CAMERA_SPECS.map((spec, i) => (
                <motion.div
                  key={spec.label}
                  className="flex items-center gap-5 p-4 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.07)' }}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ borderColor: 'rgba(255,107,43,0.3)', transition: { duration: 0.2 } }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-[11px] font-bold"
                    style={{ background: 'rgba(255,107,43,0.15)', color: 'var(--orange)' }}
                  >
                    {spec.mp}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3">
                      <span className="text-[15px] font-semibold">{spec.label}</span>
                      <span className="text-[13px]" style={{ color: 'var(--orange)' }}>{spec.aperture}</span>
                    </div>
                    <p className="text-[13px] text-white/40 truncate">{spec.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom feature row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '🌙', title: 'Night Mode', body: 'Portraits in low light, stunningly bright.' },
            { icon: '🎬', title: 'Dolby Vision', body: 'HDR video recording, up to 60 fps.' },
            { icon: '📡', title: 'LiDAR Scanner', body: 'Instant AR. Accurate depth sensing.' },
            { icon: '🖼', title: 'ProRAW', body: 'Full creative control in post-production.' },
          ].map((feat, i) => (
            <motion.div
              key={feat.title}
              className="p-6 rounded-3xl text-center group cursor-pointer"
              style={{ background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.07)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{
                y: -6,
                borderColor: 'rgba(255,107,43,0.3)',
                transition: { duration: 0.25 },
              }}
            >
              <div className="text-3xl mb-3">{feat.icon}</div>
              <h4 className="text-[15px] font-semibold mb-1 group-hover:text-orange-DEFAULT transition-colors">{feat.title}</h4>
              <p className="text-[13px] text-white/40 leading-snug">{feat.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
