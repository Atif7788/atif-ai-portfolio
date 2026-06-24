import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Star, Compass, Shield, Target, Lightbulb, Zap, Users } from 'lucide-react';
import { CardGlass } from './CardGlass';
import { AchievementItem } from '../types';
import { audioEngine } from './AudioEngine';

interface SceneAchievementsProps {
  onNext: () => void;
}

const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "ach-1",
    title: "AI & ML Academic Specialist",
    category: "Academic & Tech Specialized Cores",
    description: "Successfully maintaining high marks and deep conceptual authority in advanced neural nets, computer vision, data pipelines, and mathematical regression modeling at Lachoo Memorial College.",
    badge: "B.TECH AIML NODE"
  },
  {
    id: "ach-2",
    title: "Web Development Architect",
    category: "Full-Stack Integrator",
    description: "Designed, compiled, and maintained high-fidelity client-server architectures, corporate catalog portals, e-commerce networks, and face-recognition database systems.",
    badge: "SYSTEMS DEPLOYED"
  },
  {
    id: "ach-3",
    title: "Venture Builder & Student Entrepreneur",
    category: "Commercial Logistics & Ventures",
    description: "Directly founded and managed regional production ventures: UNIQUE HANDICRAFT and BESPOKE AQUA, linking Jodhpur logistics directly to bulk wholesale buyers and premium customized labeling.",
    badge: "FOUNDER & OPERATOR"
  },
  {
    id: "ach-4",
    title: "Algorithmic Problem Solver",
    category: "Logical Diagnostics",
    description: "Analytical mathematical background with a proven ability to architect scalable algorithms, solve logical matrix math challenges, and optimize code latency.",
    badge: "LOGICAL MATRIX ENG"
  },
  {
    id: "ach-5",
    title: "Innovation Mindset Explorer",
    category: "Exponential Horizons",
    description: "Committed to leveraging artificial intelligence models, cloud technologies, and modern web systems to solve complex regional agricultural, manufacturing, and commercial inefficiencies.",
    badge: "INNOVATION LEADER"
  }
];

export const SceneAchievements: React.FC<SceneAchievementsProps> = ({ onNext }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleAchievementHover = (idx: number | null) => {
    if (idx !== null && hoveredIndex !== idx) {
      audioEngine.playBeep(2500, 0.02);
    }
    setHoveredIndex(idx);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-16 relative z-10 select-none">
      <div className="max-w-5xl w-full space-y-10">
        
        {/* Title */}
        <div className="text-center md:text-left flex flex-col md:flex-row justify-between items-baseline gap-2">
          <div>
            <span className="font-mono text-xs text-[#00E5FF] tracking-widest font-bold uppercase">SECTOR_07 // DIGITAL HALL OF ACHIEVEMENT</span>
            <h2 className="text-4xl font-sans font-extrabold text-white tracking-tight mt-1">ACHIEVEMENTS ARCHIVE</h2>
          </div>
          <span className="font-mono text-[10px] text-slate-500 hidden md:inline">QUANTUM DECK SYNCED: SECURE READ</span>
        </div>

        {/* Dynamic Cards Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {ACHIEVEMENTS.map((ach, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <div
                key={ach.id}
                onMouseEnter={() => handleAchievementHover(idx)}
                onMouseLeave={() => handleAchievementHover(null)}
                className="flex"
              >
                <CardGlass
                  glowColor={idx % 3 === 0 ? "cyan" : idx % 3 === 1 ? "blue" : "mint"}
                  className="w-full flex flex-col justify-between"
                  delay={idx * 0.1}
                >
                  <div className="space-y-4">
                    
                    {/* Badge & Category */}
                    <div className="flex items-center justify-between pb-2 border-b border-cyan-500/10">
                      <div className="flex items-center space-x-1.5">
                        {idx === 0 ? <Award className="w-4 h-4 text-[#00E5FF]" /> :
                         idx === 1 ? <Zap className="w-4 h-4 text-[#00B0FF]" /> :
                         idx === 2 ? <Users className="w-4 h-4 text-[#64FFDA]" /> :
                         idx === 3 ? <Target className="w-4 h-4 text-amber-400" /> :
                         <Lightbulb className="w-4 h-4 text-emerald-400" />}
                        <span className="font-mono text-[8px] text-[#64FFDA] tracking-widest font-bold uppercase">{ach.badge}</span>
                      </div>
                      <Star className={`w-3.5 h-3.5 transition-all ${isHovered ? 'text-yellow-400 fill-yellow-400 scale-110' : 'text-slate-600'}`} />
                    </div>

                    {/* Achievement details */}
                    <div>
                      <h4 className="text-base font-bold text-white tracking-tight leading-snug">{ach.title}</h4>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5 uppercase tracking-wide">{ach.category}</p>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      {ach.description}
                    </p>

                  </div>

                  {/* Accents Footer */}
                  <div className="mt-4 pt-3 border-t border-cyan-500/5 font-mono text-[8px] text-[#00E5FF] flex justify-between">
                    <span>SECURITY_TAG_OK</span>
                    <span className="text-slate-500">SECTOR_07_{idx + 1}</span>
                  </div>

                </CardGlass>
              </div>
            );
          })}
        </div>

        {/* Next Sector Navigation */}
        <div className="flex justify-end pt-2">
          <button
            id="next-contact-btn"
            onClick={onNext}
            className="px-5 py-2.5 rounded-lg border border-cyan-500/30 bg-cyan-950/20 text-[#00E5FF] font-mono text-xs font-semibold uppercase tracking-widest cursor-pointer hover:bg-cyan-500/10 hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,229,255,0.25)] flex items-center space-x-2"
          >
            <span>OPEN COMMUNICATIONS COMMS</span>
            <span>→</span>
          </button>
        </div>

      </div>
    </div>
  );
};
