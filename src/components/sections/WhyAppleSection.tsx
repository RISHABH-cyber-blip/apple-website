'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { WHY_APPLE_STEPS } from '@/lib/constants'
import styles from './WhyAppleSection.module.css'

interface CardProps {
  step: typeof WHY_APPLE_STEPS[0]
  index: number
  scrollYProgress: MotionValue<number>
}

function Card({ step, index, scrollYProgress }: CardProps) {
  // y position mapping (continuous scroll)
  const y = useTransform(scrollYProgress, (v) => {
    const activeScroll = v * WHY_APPLE_STEPS.length;
    const diff = index - activeScroll;
    if (diff < -1) return "-130%";
    if (diff < 0) {
      // Card slides up off-screen
      return `${diff * 130}%`;
    }
    // Cards stack below
    return `${diff * 12}px`;
  });

  // scale mapping
  const scale = useTransform(scrollYProgress, (v) => {
    const activeScroll = v * WHY_APPLE_STEPS.length;
    const diff = index - activeScroll;
    if (diff < -1) return 0.95;
    if (diff < 0) {
      return 1 + diff * 0.05;
    }
    return Math.max(0.88, 1 - diff * 0.04);
  });

  // rotate mapping
  const rotate = useTransform(scrollYProgress, (v) => {
    const activeScroll = v * WHY_APPLE_STEPS.length;
    const diff = index - activeScroll;
    const baseRotation = index % 2 === 0 ? -1 : 1;
    if (diff < -1) return -4;
    if (diff < 0) {
      return baseRotation + diff * (4 + baseRotation);
    }
    return baseRotation + diff * 1.5;
  });

  // opacity mapping
  const opacity = useTransform(scrollYProgress, (v) => {
    const activeScroll = v * WHY_APPLE_STEPS.length;
    const diff = index - activeScroll;
    if (diff < -1) return 0;
    if (diff < 0) {
      return 1 + diff;
    }
    return Math.max(0, 1 - diff * 0.3);
  });

  // zIndex mapping
  const zIndex = useTransform(scrollYProgress, (v) => {
    const activeScroll = v * WHY_APPLE_STEPS.length;
    const diff = index - activeScroll;
    if (diff < 0) {
      return Math.round(20 + index);
    }
    return Math.round(10 - index);
  });

  return (
    <motion.div
      style={{ y, scale, rotate, opacity, zIndex }}
      className={`${styles.card} ${index % 2 === 0 ? styles.cardDark : styles.cardLight}`}
    >
      {/* Top accent line */}
      <div className={styles.cardAccentLine} />

      <div className="grid md:grid-cols-2 gap-0 h-full">
        {/* Left column */}
        <div className="p-6 md:p-16 flex flex-col justify-center">
          <div className={styles.stepContainer}>
            <span className={styles.stepNumber}>0{step.step}</span>
            <div className={styles.stepDivider} />
          </div>

          <p className={styles.stepTitle}>
            {step.title}
          </p>

          <h3 className={styles.stepHeading}>
            {step.heading}
          </h3>

          <p className={styles.stepBody}>
            {step.body}
          </p>

          <a href="#" className={styles.stepCta}>
            {step.cta}
          </a>
        </div>

        {/* Right column */}
        <div 
          className={`relative hidden md:flex items-center justify-center overflow-hidden ${styles.rightColumn}`}
        >
          <motion.div 
            className={styles.scanLine}
            animate={{ top: ['-5%', '105%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
          />
          
          <div className={styles.iconGrid}>
            <div className={styles.iconBox}>
              {step.icon}
            </div>
            <p className={styles.iconLabel}>
              {step.title}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function WhyAppleSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  })

  return (
    <section 
      ref={sectionRef} 
      className={styles.section}
    >
      {/* Child 1: Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <span className={styles.headerLabel}>
            The Apple Difference
          </span>
          <h2 className={styles.headerTitle}>
            Why Apple is the best place to buy iPhone.
          </h2>
        </div>
      </div>

      {/* Child 2: Card Deck Container */}
      <div className={styles.deckContainer}>
        <div className={styles.deckContent}>
          {WHY_APPLE_STEPS.map((step, index) => (
            <Card 
              key={index} 
              step={step} 
              index={index} 
              scrollYProgress={scrollYProgress} 
            />
          ))}
        </div>
      </div>
    </section>
  )
}
