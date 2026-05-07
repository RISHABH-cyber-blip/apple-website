'use client';
import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Dot follows cursor exactly
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const isHovering = useRef(false);
  const scale = useSpring(1, { damping: 20, stiffness: 300 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 20);
      mouseY.set(e.clientY - 20);
      dotX.set(e.clientX - 3);
      dotY.set(e.clientY - 3);
    };

    const onEnter = () => {
      scale.set(1.6);
      isHovering.current = true;
    };
    const onLeave = () => {
      scale.set(1);
      isHovering.current = false;
    };

    window.addEventListener('mousemove', onMove);

    const interactables = document.querySelectorAll(
      'a, button, [data-cursor="hover"], .closer-card, .lineup-item'
    );
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, [mouseX, mouseY, dotX, dotY, scale]);

  // Only show on desktop
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-orange-DEFAULT/60 pointer-events-none z-[9998] mix-blend-difference"
        style={{ x: cursorX, y: cursorY, scale }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          background: 'var(--orange)',
        }}
      />
    </>
  );
}
