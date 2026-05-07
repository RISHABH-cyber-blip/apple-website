'use client';
import { useEffect, useRef, RefObject } from 'react';
import { mapRange, easeInOutCubic } from '@/lib/utils';

/**
 * Registers a scroll-linked GSAP-style callback.
 * Uses IntersectionObserver + requestAnimationFrame for performance.
 */
export function useScrollAnimation(
  ref: RefObject<HTMLElement>,
  onProgress: (progress: number) => void,
  options?: {
    start?: string; // e.g. 'top bottom'
    end?: string;   // e.g. 'bottom top'
    scrub?: boolean;
  }
) {
  const rafRef = useRef<number>();
  const progressRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 = element enters viewport bottom, 1 = element exits top
      const raw = (vh - rect.top) / (vh + rect.height);
      const clamped = Math.max(0, Math.min(1, raw));
      progressRef.current = clamped;
      onProgress(clamped);
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ref, onProgress]);
}

/**
 * Staggered entrance animation values computed from scroll progress.
 * Returns per-item opacity and y-transform values.
 */
export function staggerValues(
  progress: number,
  count: number,
  startAt = 0.1,
  endAt = 0.6,
  stagger = 0.08
): Array<{ opacity: number; y: number }> {
  return Array.from({ length: count }, (_, i) => {
    const itemStart = startAt + i * stagger;
    const itemEnd = itemStart + 0.2;
    const t = mapRange(progress, itemStart, itemEnd, 0, 1);
    const eased = easeInOutCubic(t);
    return {
      opacity: eased,
      y: (1 - eased) * 40,
    };
  });
}

/**
 * Parallax offset — returns a translateY value based on scroll progress.
 */
export function parallaxOffset(
  progress: number,
  strength: number = 80,
  reverse: boolean = false
): number {
  const direction = reverse ? -1 : 1;
  return direction * (progress - 0.5) * strength;
}

/**
 * Text reveal clip-path value from scroll progress.
 * Returns CSS clip-path string.
 */
export function textRevealClip(progress: number, threshold = 0.3): string {
  const t = Math.max(0, Math.min(1, (progress - threshold) / 0.3));
  const pct = (1 - t) * 100;
  return `inset(0 0 ${pct}% 0)`;
}

/**
 * Scale value for hero zoom effect.
 */
export function heroScale(progress: number, from = 1.0, to = 1.15): number {
  return mapRange(progress, 0, 0.5, from, to);
}

/**
 * Color interpolation between two hex colors.
 */
export function lerpColor(color1: string, color2: string, t: number): string {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  if (!c1 || !c2) return color1;
  const r = Math.round(c1.r + (c2.r - c1.r) * t);
  const g = Math.round(c1.g + (c2.g - c1.g) * t);
  const b = Math.round(c1.b + (c2.b - c1.b) * t);
  return `rgb(${r},${g},${b})`;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
