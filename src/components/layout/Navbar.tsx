'use client';
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { NAV_LINKS } from '@/lib/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 30));
    return unsub;
  }, [scrollY]);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[1000] h-[52px] flex items-center justify-between px-11"
      style={{
        backgroundColor: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '0.5px solid rgba(255,255,255,0.07)' : 'none',
        transition: 'all 0.4s ease',
      }}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Apple logo */}
      <motion.button className="text-white opacity-80 hover:opacity-100 transition-opacity"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
      >
        <svg width="16" height="20" viewBox="0 0 814 1000" fill="currentColor">
          <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-103.3C200 589.2 176.7 454.1 207.8 332.2c14.4-55.7 54.7-107.7 107.2-141.7 51.4-33 99.7-42 147.4-42 74.1 0 134.3 44.4 181.6 44.4 44.5 0 115.4-50.2 198.2-50.2zm-234.1-181c31.6-37.6 54.5-89.5 54.5-141.5 0-7.1-.5-14.3-1.7-20.3-51.8 1.9-113.1 34.5-149.3 77.4-28.2 32.4-56.1 83.5-56.1 136.3 0 7.9 1.2 15.8 1.7 18.4 3.2.5 8.5 1.2 13.7 1.2 46.5 0 102.4-31.1 137.2-71.5z"/>
        </svg>
      </motion.button>

      {/* Links */}
      <ul className="hidden md:flex gap-7 list-none">
        {NAV_LINKS.map((link, i) => (
          <motion.li key={link.href}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
          >
            <a href={link.href} className="text-[13px] text-white/55 hover:text-white transition-colors no-underline">
              {link.label}
            </a>
          </motion.li>
        ))}
      </ul>

      {/* CTA */}
      <motion.a href="#lineup" className="btn-primary hidden md:inline-flex"
        style={{ padding: '7px 18px', fontSize: 13 }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
      >
        Buy iPhone
      </motion.a>

      {/* Mobile hamburger */}
      <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="w-5 flex flex-col gap-1.5">
          <span className={`block h-px bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-px bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
      </button>

      {/* Mobile menu */}
      <motion.div
        className="absolute top-[52px] left-0 right-0 bg-black border-b border-white/08 md:hidden overflow-hidden"
        animate={{ height: menuOpen ? 'auto' : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ul className="flex flex-col py-4 px-8 list-none">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="block py-3 text-[17px] text-white/65 border-b border-white/06 no-underline"
                onClick={() => setMenuOpen(false)}
              >{link.label}</a>
            </li>
          ))}
          <li className="pt-4">
            <a href="#lineup" className="btn-primary w-full text-center" onClick={() => setMenuOpen(false)}>Buy iPhone</a>
          </li>
        </ul>
      </motion.div>
    </motion.nav>
  );
}
