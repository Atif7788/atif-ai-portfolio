import { motion } from 'motion/react';
import React from 'react';
import { audioEngine } from './AudioEngine';

interface CardGlassProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'blue' | 'mint' | 'orange';
  animateIn?: boolean;
  delay?: number;
  hoverGlow?: boolean;
  onClick?: () => void;
  id?: string;
}

export const CardGlass: React.FC<CardGlassProps> = ({
  children,
  className = '',
  glowColor = 'cyan',
  animateIn = true,
  delay = 0,
  hoverGlow = true,
  onClick,
  id,
}) => {
  const getGlowStyles = () => {
    switch (glowColor) {
      case 'blue':
        return {
          border: 'border-blue-500/30',
          bgGlow: 'shadow-[0_0_15px_rgba(0,176,255,0.15)] hover:shadow-[0_0_25px_rgba(0,176,255,0.3)]',
          textGlow: 'text-[#00B0FF]',
          borderGlow: 'group-hover:border-[#00B0FF]/60',
          scanBg: 'bg-gradient-to-b from-transparent via-[#00B0FF]/20 to-transparent',
        };
      case 'mint':
        return {
          border: 'border-emerald-400/30',
          bgGlow: 'shadow-[0_0_15px_rgba(100,255,218,0.15)] hover:shadow-[0_0_25px_rgba(100,255,218,0.3)]',
          textGlow: 'text-[#64FFDA]',
          borderGlow: 'group-hover:border-[#64FFDA]/60',
          scanBg: 'bg-gradient-to-b from-transparent via-[#64FFDA]/20 to-transparent',
        };
      case 'orange':
        return {
          border: 'border-amber-500/30',
          bgGlow: 'shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_25px_rgba(245,158,11,0.3)]',
          textGlow: 'text-amber-400',
          borderGlow: 'group-hover:border-amber-400/60',
          scanBg: 'bg-gradient-to-b from-transparent via-amber-400/20 to-transparent',
        };
      case 'cyan':
      default:
        return {
          border: 'border-cyan-500/30',
          bgGlow: 'shadow-[0_0_15px_rgba(0,229,255,0.15)] hover:shadow-[0_0_25px_rgba(0,229,255,0.3)]',
          textGlow: 'text-[#00E5FF]',
          borderGlow: 'group-hover:border-[#00E5FF]/60',
          scanBg: 'bg-gradient-to-b from-transparent via-[#00E5FF]/20 to-transparent',
        };
    }
  };

  const style = getGlowStyles();

  const handleMouseEnter = () => {
    if (hoverGlow) {
      audioEngine.playBeep(2400, 0.02);
    }
  };

  const handleClick = () => {
    audioEngine.playClick();
    if (onClick) onClick();
  };

  const cardContent = (
    <div
      id={id}
      className={`relative group overflow-hidden rounded-xl border bg-black/45 backdrop-blur-md p-6 transition-all duration-300 ${style.border} ${hoverGlow ? style.bgGlow : ''} ${style.borderGlow} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      {/* Scanline Effect */}
      <div className={`absolute inset-x-0 h-10 -top-10 opacity-20 group-hover:animate-[scan_2s_infinite] pointer-events-none ${style.scanBg}`} />
      
      {/* Corner Brackets */}
      <div className={`absolute top-0 left-0 w-3 h-3 border-t border-l ${glowColor === 'cyan' ? 'border-[#00E5FF]/60' : glowColor === 'blue' ? 'border-[#00B0FF]/60' : glowColor === 'mint' ? 'border-[#64FFDA]/60' : 'border-amber-500/60'}`} />
      <div className={`absolute top-0 right-0 w-3 h-3 border-t border-r ${glowColor === 'cyan' ? 'border-[#00E5FF]/60' : glowColor === 'blue' ? 'border-[#00B0FF]/60' : glowColor === 'mint' ? 'border-[#64FFDA]/60' : 'border-amber-500/60'}`} />
      <div className={`absolute bottom-0 left-0 w-3 h-3 border-b border-l ${glowColor === 'cyan' ? 'border-[#00E5FF]/60' : glowColor === 'blue' ? 'border-[#00B0FF]/60' : glowColor === 'mint' ? 'border-[#64FFDA]/60' : 'border-amber-500/60'}`} />
      <div className={`absolute bottom-0 right-0 w-3 h-3 border-b border-r ${glowColor === 'cyan' ? 'border-[#00E5FF]/60' : glowColor === 'blue' ? 'border-[#00B0FF]/60' : glowColor === 'mint' ? 'border-[#64FFDA]/60' : 'border-amber-500/60'}`} />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] opacity-20 pointer-events-none" />

      {/* Subtle Dot Matrix Accent */}
      <div className="absolute top-2 right-4 flex space-x-1 opacity-20">
        <span className="w-1 h-1 rounded-full bg-white"></span>
        <span className="w-1 h-1 rounded-full bg-white"></span>
        <span className="w-1 h-1 rounded-full bg-white"></span>
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );

  if (animateIn) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay }}
        whileHover={hoverGlow ? { scale: 1.02 } : undefined}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};
