'use client';
import { useEffect, useRef } from 'react';
import { mapRange, randomRange, lerp } from '@/lib/utils';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
  phase: 'disperse' | 'gather';
  targetX: number;
  targetY: number;
}

interface ParticleCanvasProps {
  progress: number; // 0 = image, 1 = fully formed new image
  width?: number;
  height?: number;
  className?: string;
}

export default function ParticleCanvas({ progress, width = 600, height = 400, className }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>();
  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    // Init particles
    const count = 1200;
    particlesRef.current = Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = randomRange(20, 180);
      return {
        x: width / 2 + Math.cos(angle) * radius * randomRange(0.5, 1.5),
        y: height / 2 + Math.sin(angle) * radius * randomRange(0.5, 1.5),
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: randomRange(0.5, 2.5),
        opacity: randomRange(0.3, 1),
        color: Math.random() > 0.7 ? '#FF6B2B' : '#FFFFFF',
        life: Math.random(),
        maxLife: randomRange(0.5, 1),
        phase: 'disperse',
        targetX: width / 2 + (Math.random() - 0.5) * width * 0.8,
        targetY: height / 2 + (Math.random() - 0.5) * height * 0.8,
      };
    });

    const animate = () => {
      animRef.current = requestAnimationFrame(animate);
      const prog = progressRef.current;

      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.fillRect(0, 0, width, height);

      particlesRef.current.forEach((p) => {
        // Dispersal phase (0–0.5): particles fly outward
        // Gathering phase (0.5–1): particles converge to form battery/chip image
        if (prog < 0.5) {
          const t = prog * 2; // 0 to 1 during disperse
          p.x = lerp(p.x, p.targetX, 0.02 * t);
          p.y = lerp(p.y, p.targetY, 0.02 * t);
          p.x += p.vx * (1 - t * 0.5);
          p.y += p.vy * (1 - t * 0.5);
        } else {
          const t = (prog - 0.5) * 2; // 0 to 1 during gather
          const gatherX = width / 2 + (Math.random() - 0.5) * 40 * (1 - t);
          const gatherY = height / 2 + (Math.random() - 0.5) * 40 * (1 - t);
          p.x = lerp(p.x, gatherX, 0.04 * t);
          p.y = lerp(p.y, gatherY, 0.04 * t);
        }

        // Pulsing opacity
        p.life += 0.008;
        if (p.life > p.maxLife) p.life = 0;
        const lifeFactor = Math.sin((p.life / p.maxLife) * Math.PI);

        ctx.save();
        ctx.globalAlpha = p.opacity * lifeFactor * (0.4 + prog * 0.6);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Connection lines between nearby particles when gathering
      if (prog > 0.6) {
        const connectDist = 30 * (prog - 0.6) * 2.5;
        ctx.save();
        ctx.strokeStyle = 'rgba(255,107,43,0.15)';
        ctx.lineWidth = 0.3;
        for (let i = 0; i < Math.min(particlesRef.current.length, 300); i++) {
          const a = particlesRef.current[i];
          for (let j = i + 1; j < Math.min(particlesRef.current.length, 300); j++) {
            const b = particlesRef.current[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < connectDist) {
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
        ctx.restore();
      }
    };

    animate();
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
  );
}
