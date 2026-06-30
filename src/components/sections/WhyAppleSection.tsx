'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WHY_APPLE_STEPS } from '@/lib/constants'
import styles from './WhyAppleSection.module.css'

interface CardProps {
  step: typeof WHY_APPLE_STEPS[0]
  index: number
}

function Card({ step, index }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -15, scale: 0.98 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
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
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section className={styles.section}>
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

      <div className={styles.mainContainer}>
        {/* Sidebar buttons */}
        <div className={styles.sidebar}>
          {WHY_APPLE_STEPS.map((step, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`${styles.sidebarBtn} ${index === activeStep ? styles.activeBtn : ''}`}
            >
              <span className={styles.btnNumber}>0{step.step}</span>
              <span className={styles.btnTitle}>{step.title}</span>
              {index === activeStep && (
                <motion.div 
                  layoutId="activeIndicator"
                  className={styles.activeIndicator}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Active Card Content */}
        <div className={styles.cardWrapper}>
          <AnimatePresence mode="wait">
            <Card 
              key={activeStep}
              step={WHY_APPLE_STEPS[activeStep]}
              index={activeStep}
            />
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
