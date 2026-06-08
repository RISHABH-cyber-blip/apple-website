'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { WHY_APPLE_STEPS } from '@/lib/constants'
import styles from './WhyAppleSection.module.css'

export default function WhyAppleSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const prevRef = useRef(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(Math.floor(v * WHY_APPLE_STEPS.length), WHY_APPLE_STEPS.length - 1)
    if (idx !== prevRef.current) {
      prevRef.current = idx
      setActiveIndex(idx)
    }
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
          {WHY_APPLE_STEPS.map((step, index) => {
            let cardState = 'rest'
            if (index === activeIndex) cardState = 'current'
            else if (index === activeIndex + 1) cardState = 'next'
            else if (index < activeIndex) cardState = 'out'

            const variants = {
              current: { rotate: -1, x: 0, y: 0, scale: 1, zIndex: 10, opacity: 1 },
              next: { rotate: 4, x: 25, y: -25, scale: 0.95, zIndex: 5, opacity: 0.8 },
              out: { rotate: 8, x: 55, y: -50, scale: 0.92, zIndex: 1, opacity: 0.3 },
              rest: { rotate: 4, x: 25, y: 0, scale: 0.92, zIndex: 2, opacity: 0.5 }
            }

            return (
              <motion.div
                key={index}
                animate={variants[cardState as keyof typeof variants]}
                transition={{ duration: 0.6, ease: [0.8, 0.2, 0.1, 0.8] }}
                className={`${styles.card} ${index % 2 === 0 ? styles.cardDark : styles.cardLight}`}
              >
                {/* Top accent line */}
                <div className={styles.cardAccentLine} />

                <div className="grid md:grid-cols-2 gap-0 h-full">
                  {/* Left column */}
                  <div className="p-12 md:p-16 flex flex-col justify-center">
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
          })}
        </div>
      </div>
    </section>
  )
}
