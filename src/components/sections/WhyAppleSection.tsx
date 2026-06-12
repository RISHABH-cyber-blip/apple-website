'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from 'framer-motion'
import { WHY_APPLE_STEPS } from '@/lib/constants'
import styles from './WhyAppleSection.module.css'

interface CardProps {
  step: typeof WHY_APPLE_STEPS[0]
  index: number
  scrollYProgress: MotionValue<number>
}

function Card({ step, index, scrollYProgress }: CardProps) {
  const totalTransitions = WHY_APPLE_STEPS.length - 1; // 4 transitions for 5 cards
  const progressStart = index / totalTransitions;
  const progressEnd = (index + 1) / totalTransitions;

  // y position mapping - range-based mapping with clamp: true for maximum stability
  const y = useTransform(
    scrollYProgress,
    [0, progressStart, progressEnd],
    [-index * 12, 0, -600],
    { clamp: true }
  );

  // scale mapping
  const scale = useTransform(
    scrollYProgress,
    [0, progressStart, progressEnd],
    [Math.max(0.88, 1 - index * 0.04), 1, 0.98],
    { clamp: true }
  );

  // rotate mapping
  const baseRotation = index % 2 === 0 ? -1 : 1;
  const rotate = useTransform(
    scrollYProgress,
    [0, progressStart, progressEnd],
    [baseRotation + index * 1.5, baseRotation, baseRotation - 2],
    { clamp: true }
  );

  // opacity mapping - keeps card 100% opaque when active and during slide-out to prevent text overlap
  const opacity = useTransform(
    scrollYProgress,
    [0, progressStart, progressEnd],
    [0.6, 1.0, 1.0],
    { clamp: true }
  );

  // zIndex mapping - ensures active card stays on top as it slides out
  const zIndex = useTransform(scrollYProgress, (v) => {
    return v >= progressStart ? Math.round(20 + index) : Math.round(10 - index);
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
    layoutEffect: false,
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
