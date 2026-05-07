'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  as?: 'h1' | 'h2' | 'h3';
  splitBy?: 'word' | 'char';
}

export default function AnimatedHeading({
  text,
  className,
  delay = 0,
  stagger = 0.08,
  once = true,
  as: Tag = 'h2',
  splitBy = 'word',
}: AnimatedHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once, margin: '-80px' });

  const items = splitBy === 'word' ? text.split(' ') : text.split('');

  return (
    <Tag ref={ref} className={cn('overflow-visible', className)} aria-label={text}>
      {items.map((item, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ marginRight: splitBy === 'word' ? '0.28em' : '0' }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: '105%', opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.75,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {item}
            {splitBy === 'word' ? '' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
