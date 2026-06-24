import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, Zap, Compass, Flame, Rocket, CircleSlash } from 'lucide-react';
import { CardGlass } from './CardGlass';
import { MilestoneItem } from '../types';
import { audioEngine } from './AudioEngine';

interface SceneEducationProps {
  onNext: () => void;
}

const MILESTONES: MilestoneItem[] = [
  {
    id: "1",
    year: "FOUNDATIONS",
    title: "12th Science (Mathematics)",
    subtitle: "High School Certification",
    description: "Rigorous study of matrix calculus, linear transformations, probability structures, and analytical geometry. Forged the mathematical engine that underpins all modern neural network operations.",
    icon: "CircleSlash"
  },
  {
    id: "2",
    year: "CORE ADMISSION",
    title: "B.Tech in AI & ML",
    subtitle: "Lachoo Memorial College, Jodhpur",
    description: "Entered an autonomous specialized curriculum diving deep into statistical machine learning architectures, cognitive data modeling, Python scripting, and algorithmic theory.",
    icon: "Compass"
  },
  {
    id: "3",
    year: "SYNAPSE BOOT",
    title: "Compiling Programming Prowess",
    subtitle: "Exploratory Development Mode",
    description: "Mastered fundamental concepts in data structures, OOPs paradigms, logical workflows, and database queries. Initiated personal experimental automation nodes.",
    icon: "Zap"
  },
  {
    id: "4",
    year: "SYSTEM BINDING",
    title: "Building High-Fidelity Systems",
    subtitle: "Full-Stack Project Deployments",
    description: "Bridged the gap between theories and concrete code. Authored face recognition surveillance platforms, cloud databases, and machine learning crowd density forecasting equations.",
    icon: "Award"
  },
  {
    id: "5",
    year: "ORBITAL STABILIZATION",
    title: "Launching Corporate Ventures",
    subtitle: "Student Entrepreneurship Initialization",
    description: "Merged engineering skillsets with commercial distribution nodes. Formed Unique Handicraft online arrays and Bespoke Aqua packaged solutions to disrupt regional logistics channels.",
    icon: "Rocket"
  }
];

export const SceneEducation: React.FC<SceneEducationProps> = ({ onNext }) => {
  const [activeMilestoneId, setActiveMilestoneId] = useState("1");

  const handleHoverMilestone = (id: string) => {
    if (activeMilestoneId !== id) {
      audioEngine.playBeep(2200, 0.02);
      setActiveMilestoneId(id);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Compass": return <Compass className="w-5 h-5 text-[#00E5FF]" />;
      case "Zap": return <Zap className="w-5 h-5 text-[#64FFDA]" />;
      case "Award": return <Award className="w-5 h-5 text-[#00B0FF]" />;
      case "Rocket": return <Rocket className="w-5 h-5 text-amber-400" />;
      default: return <CircleSlash className="w-5 h-5 text-white" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-16 relative z-10 select-none">
      <div className="max-w-5xl w-full space-y-10">
        
        {/* Header Title */}
        <div className="text-center md:text-left">
          <span className="font-mono text-xs text-[#64FFDA] tracking-widest font-bold uppercase">SECTOR_04 // EXPONENTIAL ROADMAPS</span>
          <h2 className="text-4xl font-sans font-extrabold text-white tracking-tight mt-1">JOURNEY VECTOR</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Vertical Segment Timeline */}
          <div className="md:col-span-6 relative border-l border-cyan-500/20 pl-6 ml-4 space-y-6">
            
            {/* Timeline nodes */}
            {MILESTONES.map((milestone) => {
              const isActive = activeMilestoneId === milestone.id;
              return (
                <div
                  key={milestone.id}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => handleHoverMilestone(milestone.id)}
                  onClick={() => handleHoverMilestone(milestone.id)}
                >
                  {/* Outer Pulsing Indicator Node */}
                  <span className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border transition-all duration-300 ${
                    isActive 
                      ? 'border-[#00E5FF] bg-black shadow-[0_0_8px_rgba(0,229,255,0.8)] scale-125' 
                      : 'border-cyan-500/35 bg-cyan-950/40 group-hover:border-cyan-500/70'
                  }`}>
                    {isActive && <span className="absolute inset-1 rounded-full bg-[#00E5FF] animate-ping" />}
                  </span>

                  <div className={`p-4 rounded-xl border transition-all duration-300 ${
                    isActive 
                      ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-[0_0_12px_rgba(0,229,255,0.1)]' 
                      : 'border-transparent bg-black/20 text-slate-400 hover:text-white'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-[9px] font-bold text-cyan-400/80 tracking-widest uppercase">{milestone.year}</span>
                      {isActive && <Flame className="w-3 h-3 text-[#64FFDA] animate-pulse" />}
                    </div>
                    <h3 className="text-sm font-bold mt-1 tracking-tight">{milestone.title}</h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{milestone.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Milestone Full Diagnostics Panel */}
          <div className="md:col-span-6">
            {MILESTONES.map((milestone) => {
              if (milestone.id !== activeMilestoneId) return null;
              return (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <CardGlass glowColor={milestone.id === "5" ? "orange" : milestone.id === "2" ? "blue" : "cyan"}>
                    <div className="space-y-6">
                      
                      <div className="flex items-center space-x-3 pb-3 border-b border-cyan-500/10">
                        <div className="p-3 rounded-xl border border-cyan-500/20 bg-cyan-950/20">
                          {getIcon(milestone.icon)}
                        </div>
                        <div>
                          <span className="font-mono text-[9px] text-[#64FFDA] tracking-widest font-bold uppercase">{milestone.year}</span>
                          <h4 className="text-lg font-bold text-white tracking-tight leading-tight">{milestone.title}</h4>
                        </div>
                      </div>

                      <div className="space-y-3 font-sans">
                        <p className="text-xs font-mono text-[#00E5FF] uppercase tracking-wider">LOG CONTENT_</p>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>

                      <div className="bg-cyan-950/25 p-3 rounded-lg border border-cyan-500/5 flex items-center justify-between font-mono text-[10px] text-[#00E5FF]">
                        <span>COORDINATE LOCK_</span>
                        <span className="font-bold text-white">LAT_DECK.B4.{milestone.id}</span>
                      </div>

                      {/* Transition button */}
                      <div className="flex justify-end pt-2 border-t border-cyan-500/10">
                        <button
                          id="next-projects-btn"
                          onClick={onNext}
                          className="px-5 py-2.5 rounded-lg border border-cyan-500/30 bg-cyan-950/20 text-[#00E5FF] font-mono text-xs font-semibold uppercase tracking-widest cursor-pointer hover:bg-cyan-500/10 hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,229,255,0.25)] flex items-center space-x-2"
                        >
                          <span>OPEN PROJECTS CENTER</span>
                          <span>→</span>
                        </button>
                      </div>

                    </div>
                  </CardGlass>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
};
