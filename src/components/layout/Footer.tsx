'use client';
import { motion } from 'framer-motion';
import { useInView } from '@/lib/hooks/useScrollProgress';

const FOOTER_LINKS = [
  {
    heading: 'Shop & Learn',
    links: ['Store', 'Mac', 'iPad', 'iPhone', 'Watch', 'AirPods', 'TV & Home', 'AirTag'],
  },
  {
    heading: 'Services',
    links: ['Apple Music', 'Apple TV+', 'Apple Arcade', 'iCloud', 'Apple One', 'Apple Pay'],
  },
  {
    heading: 'Account',
    links: ['Manage Your Apple ID', 'Apple Store Account', 'iCloud.com'],
  },
  {
    heading: 'Apple Store',
    links: ['Find a Store', 'Genius Bar', 'Today at Apple', 'Apple Camp', 'Apple Store App'],
  },
];

export default function Footer() {
  const { ref, inView } = useInView(0.1);

  return (
    <footer
      ref={ref}
      className="bg-[#111] border-t border-white/[0.08]"
      role="contentinfo"
    >
      <div className="max-w-[980px] mx-auto px-11 py-12">
        {/* Disclaimer */}
        <motion.p
          className="text-[12px] text-white/40 leading-relaxed border-b border-white/[0.08] pb-8 mb-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          1. Available space is less and varies due to many factors. A standard configuration uses approximately 11GB to 14GB of space (including iOS and preinstalled apps) depending on the model and settings. Preinstalled apps use about 4GB, and you can delete these apps and restore them. Storage capacity subject to change based on software version and may vary by device.
          <br /><br />
          2. Battery life varies by use and configuration; see apple.com/batteries for more information.
        </motion.p>

        {/* Links Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-white/[0.08]"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {FOOTER_LINKS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-[12px] font-semibold text-white/90 mb-3 tracking-wide">{col.heading}</h3>
              <ul className="list-none space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[12px] text-white/40 hover:text-white/70 transition-colors no-underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-6 gap-4">
          <p className="text-[12px] text-white/35">
            Copyright © 2024 Apple Inc. All rights reserved.
          </p>
          <div className="flex gap-5 flex-wrap">
            {['Privacy Policy', 'Terms of Use', 'Sales Policy', 'Legal', 'Site Map'].map((item) => (
              <a key={item} href="#" className="text-[12px] text-white/35 hover:text-white/60 transition-colors no-underline">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Big wordmark */}
      <div className="text-center pb-8 overflow-hidden">
        <motion.p
          className="text-[clamp(64px,12vw,140px)] font-bold tracking-[-0.05em] leading-none select-none"
          style={{ color: 'rgba(255,255,255,0.04)' }}
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          iPhone 12 Pro
        </motion.p>
      </div>
    </footer>
  );
}
