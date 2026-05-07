'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { IPHONE_COLORS } from '@/lib/constants';

const COLORS = [
  { key: 'cosmicOrange', hex: '#FF6B2B', label: 'Cosmic Orange' },
  { key: 'pacificBlue', hex: '#1B4F72', label: 'Pacific Blue' },
  { key: 'silver',       hex: '#C8C8C8', label: 'Silver' },
  { key: 'graphite',     hex: '#3A3A3C', label: 'Graphite' },
];

interface ColorPickerProps {
  selected: string;
  onChange: (color: string) => void;
}

export default function ColorPicker({ selected, onChange }: ColorPickerProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const currentLabel = COLORS.find((c) => c.hex === selected)?.label ?? '';
  const hoveredLabel = COLORS.find((c) => c.hex === hovered)?.label ?? '';

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={hovered ?? selected}
          className="label text-white/40 text-[11px]"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
        >
          {hovered ? hoveredLabel : currentLabel}
        </motion.p>
      </AnimatePresence>

      {/* Swatches */}
      <div className="flex gap-3">
        {COLORS.map((color) => {
          const isSelected = selected === color.hex;
          return (
            <motion.button
              key={color.key}
              className="relative rounded-full focus:outline-none"
              style={{ width: 22, height: 22 }}
              onClick={() => onChange(color.hex)}
              onHoverStart={() => setHovered(color.hex)}
              onHoverEnd={() => setHovered(null)}
              aria-label={color.label}
              aria-pressed={isSelected}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Outer ring when selected */}
              <AnimatePresence>
                {isSelected && (
                  <motion.span
                    className="absolute -inset-1 rounded-full border border-white/50"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  />
                )}
              </AnimatePresence>
              {/* Dot */}
              <span
                className="block w-full h-full rounded-full"
                style={{ background: color.hex }}
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
