import React from 'react';
import { motion } from 'motion/react';
import { Eye, ShieldAlert, Cpu } from 'lucide-react';
import { CardGlass } from './CardGlass';
import { audioEngine } from './AudioEngine';

interface SceneArrivalProps {
  onNext: () => void;
}

export const SceneArrival: React.FC<SceneArrivalProps> = ({ onNext }) => {
  const handleInitiate = () => {
    audioEngine.playBoot();
    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 relative z-10 select-none">
      
      {/* Absolute Ambient Coordinates and Cyber Accents */}
      <div className="absolute top-8 right-8 font-mono text-[10px] text-cyan-400/50 hidden md:block">
        GRID_SECTOR: //001-ARRIVAL<br />
        SYS_LATENCY: 4.12ms // STABLE
      </div>

      <div className="max-w-4xl w-full text-center space-y-8">
        
        {/* Animated Cyber Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, type: 'spring' }}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/20 backdrop-blur-md"
        >
          <Cpu className="w-4 h-4 text-[#00E5FF] animate-spin-slow" />
          <span className="font-mono text-[10px] text-[#00E5FF] tracking-widest font-semibold uppercase">
            HOLOGRAPHIC AI PORTFOLIO v1.0
          </span>
        </motion.div>

        {/* Master Heading - Cinematic Apple-Style Font Pairing */}
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
            className="text-6xl sm:text-8xl font-sans font-extrabold tracking-tighter text-white bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#00E5FF]"
          >
            ATIF ALI
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2, ease: 'easeOut' }}
            className="text-lg sm:text-2xl font-sans font-medium text-[#00B0FF] tracking-wide"
          >
            AI & Machine Learning Student Engineer & Entrepreneur
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="max-w-xl mx-auto text-sm text-slate-400 leading-relaxed font-mono"
          >
            "Building Intelligent Solutions Through Technology. Welcome to the Command Core."
          </motion.p>
        </div>

        {/* Glowing Interactive Launcher Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.5 }}
          className="max-w-md mx-auto"
        >
          <CardGlass glowColor="cyan" hoverGlow={true}>
            <div className="text-center space-y-4 p-2">
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full border border-[#00E5FF]/40 bg-[#00E5FF]/10 flex items-center justify-center animate-pulse">
                  <Eye className="w-6 h-6 text-[#00E5FF]" />
                </div>
              </div>
              
              <div className="space-y-1 font-mono">
                <p className="text-xs text-white uppercase tracking-wider font-bold">BIOMETRIC LINK REQUIRED</p>
                <p className="text-[10px] text-slate-400">Scan retina or click link below to initialize</p>
              </div>

              <button
                id="initiate-biometric-btn"
                onClick={handleInitiate}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#00E5FF] to-[#00B0FF] text-black font-mono font-bold text-xs tracking-widest rounded-lg cursor-pointer transition-all duration-300 hover:brightness-125 hover:shadow-[0_0_20px_rgba(0,229,255,0.6)] uppercase"
              >
                INITIATE BIOMETRIC COMMAND
              </button>
            </div>
          </CardGlass>
        </motion.div>

        {/* Cyber disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.8 }}
          className="flex items-center justify-center space-x-1.5 font-mono text-[9px] text-cyan-500/40"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>SECURE QUANTUM LINK REGISTERED TO PORT 3000 // USER CONFIRMED</span>
        </motion.div>

      </div>
    </div>
  );
};
