'use client';
import { useEffect, useRef } from 'react';

let globalLenis: any = null;
export function getLenis() {
  return globalLenis;
}

export function useLenis() {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    let lenisInstance: any = null;
    let isDestroyed = false;
    let rafId: number | null = null;

    const init = async () => {
      const { default: Lenis } = await import('lenis');
      if (isDestroyed) return;

      const lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });
      lenisRef.current = lenis;
      globalLenis = lenis;
      lenisInstance = lenis;

      function raf(time: number) {
        if (isDestroyed) return;
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    };

    init();

    return () => {
      isDestroyed = true;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (lenisInstance) {
        lenisInstance.destroy();
      }
      lenisRef.current = null;
      if (globalLenis === lenisInstance) {
        globalLenis = null;
      }
    };
  }, []);

  return lenisRef;
}
