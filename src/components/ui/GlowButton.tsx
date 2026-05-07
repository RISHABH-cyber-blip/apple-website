'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'ghost' | 'outline';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function GlowButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className,
  size = 'md',
}: GlowButtonProps) {
  const sizes = {
    sm: 'px-4 py-2 text-[13px]',
    md: 'px-6 py-3 text-[15px]',
    lg: 'px-8 py-4 text-[17px]',
  };

  const variants = {
    primary: 'bg-orange-DEFAULT text-white hover:bg-orange-deep',
    ghost: 'bg-transparent text-white border border-white/25 hover:bg-white/08 hover:border-white/50',
    outline: 'bg-transparent text-orange-DEFAULT border border-orange-DEFAULT/50 hover:bg-orange-muted',
  };

  const base = cn(
    'inline-flex items-center gap-2 rounded-full font-medium transition-all duration-300 no-underline cursor-pointer',
    sizes[size],
    variants[variant],
    className
  );

  const Component = href ? 'a' : 'button';

  return (
    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
      <Component href={href} onClick={onClick} className={base}>
        {children}
      </Component>
    </motion.div>
  );
}
