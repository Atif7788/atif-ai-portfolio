import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, MapPin, GraduationCap, School, BookOpen, Terminal } from 'lucide-react';
import { CardGlass } from './CardGlass';

interface SceneAboutProps {
  onNext: () => void;
}

export const SceneAbout: React.FC<SceneAboutProps> = ({ onNext }) => {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [isDoneTyping, setIsDoneTyping] = useState(false);

  const logs = [
    "Initializing Profile...",
    "Querying B.Tech AIML core database...",
    "Loading student credentials...",
    "Locating coordinator nodes (Jodhpur, Rajasthan)...",
    "Verifying secondary science foundations (12th Mathematics)...",
    "System diagnostics: ACTIVE",
    "Command Deck status: ONLINE",
    "Core interface loaded successfully."
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < logs.length) {
        setTerminalLines(prev => [...prev, `> ${logs[currentLine]}`]);
        currentLine++;
      } else {
        clearInterval(interval);
        setIsDoneTyping(true);
      }
    }, 900);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-16 relative z-10 select-none">
      <div className="max-w-5xl w-full space-y-10">
        
        {/* Title Indicator */}
        <div className="text-center md:text-left">
          <span className="font-mono text-xs text-[#64FFDA] tracking-widest font-bold uppercase">SECTOR_02 // COGNITIVE BLUEPRINTS</span>
          <h2 className="text-4xl font-sans font-extrabold text-white tracking-tight mt-1">HOLOGRAPHIC BIOGRAPHY</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Terminal Log (Diagnostic Output) */}
          <div className="md:col-span-5 h-full">
            <CardGlass glowColor="cyan" className="h-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2">
                  <div className="flex items-center space-x-2">
                    <Terminal className="w-4 h-4 text-[#00E5FF] animate-pulse" />
                    <span className="font-mono text-[10px] text-white uppercase tracking-wider">JARVIS_TERMINAL.sh</span>
                  </div>
                  <div className="flex space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/60"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/60"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60"></span>
                  </div>
                </div>

                <div className="h-56 font-mono text-[11px] text-[#00E5FF] space-y-2.5 overflow-y-auto leading-relaxed scrollbar-thin">
                  {terminalLines.map((line, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {line}
                    </motion.div>
                  ))}
                  {!isDoneTyping && (
                    <span className="inline-block w-1.5 h-3 bg-[#00E5FF] animate-[pulse_0.8s_infinite] ml-1"></span>
                  )}
                </div>

                {isDoneTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="pt-2 border-t border-cyan-500/10 flex justify-between items-center"
                  >
                    <span className="text-[9px] text-[#64FFDA] font-mono font-semibold uppercase">SEQUENCE RESOLVED</span>
                    <span className="text-[9px] text-slate-500 font-mono">100% PARSED</span>
                  </motion.div>
                )}
              </div>
            </CardGlass>
          </div>

          {/* Column 2: Profile Holographic Display */}
          <div className="md:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <CardGlass glowColor="blue" delay={0.1}>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-[#00B0FF]">
                    <User className="w-4 h-4" />
                    <span className="font-mono text-[10px] font-bold tracking-wider">CORE IDENTITY</span>
                  </div>
                  <div className="font-sans">
                    <p className="text-lg font-bold text-white">Atif Ali</p>
                    <p className="text-xs text-slate-400 mt-1">Student, Developer, and tech-driven venture builder.</p>
                  </div>
                </div>
              </CardGlass>

              <CardGlass glowColor="mint" delay={0.2}>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-[#64FFDA]">
                    <MapPin className="w-4 h-4" />
                    <span className="font-mono text-[10px] font-bold tracking-wider">GEO-LOCATION</span>
                  </div>
                  <div className="font-sans">
                    <p className="text-lg font-bold text-white">Jodhpur, Rajasthan</p>
                    <p className="text-xs text-slate-400 mt-1">India's vibrant Sun City, operating from high-speed digital arrays.</p>
                  </div>
                </div>
              </CardGlass>

              <CardGlass glowColor="cyan" delay={0.3}>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-[#00E5FF]">
                    <GraduationCap className="w-4 h-4" />
                    <span className="font-mono text-[10px] font-bold tracking-wider">DEGREE MATRIX</span>
                  </div>
                  <div className="font-sans">
                    <p className="text-lg font-bold text-white">B.Tech in AI & ML</p>
                    <p className="text-xs text-slate-400 mt-1">Deep specialization in neural network configurations, data models, and ML pipelines.</p>
                  </div>
                </div>
              </CardGlass>

              <CardGlass glowColor="orange" delay={0.4}>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-amber-400">
                    <School className="w-4 h-4" />
                    <span className="font-mono text-[10px] font-bold tracking-wider">COORDINATE HEADQUARTERS</span>
                  </div>
                  <div className="font-sans">
                    <p className="text-base font-bold text-white">Lachoo Memorial College</p>
                    <p className="text-xs text-slate-400 mt-1">Lachoo Memorial College of Science & Technology (Autonomous), Jodhpur.</p>
                  </div>
                </div>
              </CardGlass>

            </div>

            {/* Academic Background Banner */}
            <CardGlass glowColor="cyan" delay={0.5}>
              <div className="flex items-start space-x-4">
                <div className="p-2.5 rounded-lg border border-cyan-500/20 bg-cyan-950/20">
                  <BookOpen className="w-5 h-5 text-[#00E5FF]" />
                </div>
                <div className="font-sans space-y-1">
                  <span className="font-mono text-[9px] font-bold text-[#00E5FF] tracking-wider uppercase">ACADEMIC DNA</span>
                  <h4 className="text-sm font-bold text-white">12th Grade Science (Mathematics)</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Built a strong foundation in calculus, geometry, and matrix algebra, providing the vital mathematical frameworks required for advanced neural learning computations.
                  </p>
                </div>
              </div>
            </CardGlass>

            {/* Next Sector Button */}
            <div className="flex justify-end pt-2">
              <button
                id="next-skills-btn"
                onClick={onNext}
                className="px-5 py-2.5 rounded-lg border border-cyan-500/30 bg-cyan-950/20 text-cyan-300 font-mono text-xs font-semibold uppercase tracking-widest cursor-pointer hover:bg-cyan-500/10 hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,229,255,0.25)] flex items-center space-x-2"
              >
                <span>ENTER SKILLS GALAXY</span>
                <span>→</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
