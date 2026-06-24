import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code, Brain, Cpu, Globe, Database, BarChart2, Star, Zap, Library } from 'lucide-react';
import { CardGlass } from './CardGlass';
import { SkillItem } from '../types';
import { audioEngine } from './AudioEngine';

interface SceneSkillsProps {
  onNext: () => void;
}

const SKILL_PLANETS: SkillItem[] = [
  {
    name: "Python Planet",
    category: "Programming Core",
    rating: 90,
    description: "The mathematical backbone of all AI models. Experienced in object-oriented structures, automation scripts, and quantitative analysis formulas.",
    color: "from-blue-500/30 to-yellow-500/10"
  },
  {
    name: "Machine Learning Planet",
    category: "Predictive Analytics",
    rating: 85,
    description: "Configuring supervised, unsupervised, and reinforcement algorithms. Professional deployment of classification, regression, and clustering engines.",
    color: "from-blue-600/30 to-cyan-500/10"
  },
  {
    name: "AI Planet",
    category: "Neural Architectures",
    rating: 80,
    description: "Designing convolutional neural networks (CNNs), deep learning weights, natural language understanding layers, and real-time computer vision engines.",
    color: "from-cyan-500/30 to-[#64FFDA]/10"
  },
  {
    name: "Web Development Planet",
    category: "Responsive Architectures",
    rating: 85,
    description: "Building production-ready user interfaces with high-density layouts, React context handlers, TypeScript, Tailwind CSS styling, and standard REST proxy backends.",
    color: "from-[#64FFDA]/30 to-emerald-500/10"
  },
  {
    name: "Data Analytics Planet",
    category: "Data Cleansing",
    rating: 82,
    description: "Performing detailed exploratory data analysis (EDA), data wrangling, missing-value interpolations, statistical indexing, and quantitative matrix formatting.",
    color: "from-pink-500/30 to-purple-500/10"
  },
  {
    name: "Power BI Planet",
    category: "Business Intelligence",
    rating: 88,
    description: "Drafting highly structured, interactive business executive dashboards, automating ETL workflows, writing DAX expressions, and mapping metrics into clean visualizations.",
    color: "from-amber-500/30 to-yellow-500/10"
  }
];

const SKILL_DETAILS: Record<string, { icon: any; libraries: string[]; projects: string[] }> = {
  "Python Planet": {
    icon: Code,
    libraries: ["NumPy", "Pandas", "Math / Statistics", "Object-Oriented Programming", "BeautifulSoup"],
    projects: ["Automated Data Scrapers", "Handicrafts Inventory Analytics", "Mathematical Solver Modules"]
  },
  "Machine Learning Planet": {
    icon: Brain,
    libraries: ["Scikit-Learn", "SciPy", "Matplotlib", "Seaborn", "Regression / Classifier Algorithmic weights"],
    projects: ["Cafeteria Crowd Density Predictor Model", "Venture Demand Modeler", "Risk Evaluators"]
  },
  "AI Planet": {
    icon: Cpu,
    libraries: ["Keras / TensorFlow", "OpenCV", "Face Recognition", "Neural Weights Fitting", "Deep Learning CNNs"],
    projects: ["AI Face Recognition Attendance Terminal", "Camera Synaptic Surveillance Grid"]
  },
  "Web Development Planet": {
    icon: Globe,
    libraries: ["React / Vite / Next.js", "TypeScript", "Tailwind CSS", "Express / Node.js API Proxies", "Framer Motion"],
    projects: ["Unique Handicrafts Corporate Catalog Portal", "Bespoke Aqua Commercial Landing Systems"]
  },
  "Data Analytics Planet": {
    icon: Database,
    libraries: ["Pandas DataFrames", "SQL (Structured Queries)", "Exploratory Plots", "Outlier Interpolation"],
    projects: ["Venture Sales Trend Reports", "Automotive Sector Supply-Chain Datasets"]
  },
  "Power BI Planet": {
    icon: BarChart2,
    libraries: ["DAX Queries", "PowerQuery ETL Engine", "Automated Scheduled Refresh", "Interactive Executive KPI Visuals"],
    projects: ["Direct Corporate Sales Dashboard", "FMCG Inventory Distribution Matrix Map"]
  }
};

export const SceneSkills: React.FC<SceneSkillsProps> = ({ onNext }) => {
  const [selectedPlanetIndex, setSelectedPlanetIndex] = useState(0);

  const activePlanet = SKILL_PLANETS[selectedPlanetIndex];
  const activeDetail = SKILL_DETAILS[activePlanet.name];
  const IconComponent = activeDetail.icon;

  const handleSelectPlanet = (idx: number) => {
    audioEngine.playBeep(2000, 0.08);
    setSelectedPlanetIndex(idx);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-16 relative z-10 select-none">
      <div className="max-w-5xl w-full space-y-10">
        
        {/* Header Title */}
        <div className="text-center md:text-left">
          <span className="font-mono text-xs text-[#00E5FF] tracking-widest font-bold uppercase">SECTOR_03 // CORE CAPABILITIES</span>
          <h2 className="text-4xl font-sans font-extrabold text-white tracking-tight mt-1">SKILLS CORES</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Orbital Planet Navigators */}
          <div className="md:col-span-5 space-y-3">
            <span className="font-mono text-[9px] font-bold text-gray-500 tracking-wider block uppercase mb-1">SELECT SECTOR ORBIT</span>
            <div className="space-y-2">
              {SKILL_PLANETS.map((planet, idx) => {
                const isSelected = selectedPlanetIndex === idx;
                return (
                  <button
                    key={planet.name}
                    onClick={() => handleSelectPlanet(idx)}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-left group cursor-pointer ${
                      isSelected 
                        ? 'bg-gradient-to-r from-[#00E5FF]/10 to-transparent border-[#00E5FF] text-white shadow-[0_0_15px_rgba(0,229,255,0.15)]' 
                        : 'border-cyan-500/15 bg-black/35 text-cyan-400/80 hover:bg-cyan-500/5 hover:border-cyan-500/40 hover:text-cyan-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {/* Interactive Planet Orb ring visual indicator */}
                      <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#00E5FF] bg-black' : 'border-cyan-500/40'}`}>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]"></span>}
                      </span>
                      <span className="font-mono text-xs font-semibold tracking-wide uppercase">{planet.name}</span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-500 group-hover:text-cyan-400/80">{planet.rating}%</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Planet Data HUD */}
          <div className="md:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePlanet.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <CardGlass glowColor={selectedPlanetIndex % 2 === 0 ? "cyan" : "mint"}>
                  <div className="space-y-6">
                    
                    {/* Header Details */}
                    <div className="flex items-start justify-between border-b border-cyan-500/10 pb-4">
                      <div className="flex items-center space-x-3.5">
                        <div className="p-3 rounded-xl border border-cyan-500/20 bg-cyan-950/20">
                          <IconComponent className="w-6 h-6 text-[#00E5FF]" />
                        </div>
                        <div>
                          <span className="font-mono text-[9px] font-bold text-[#64FFDA] tracking-wider uppercase">{activePlanet.category}</span>
                          <h3 className="text-xl font-bold text-white tracking-tight">{activePlanet.name}</h3>
                        </div>
                      </div>

                      {/* Diagnostic Score Bars */}
                      <div className="text-right">
                        <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold">COMPILING RATIO</span>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="font-mono text-sm font-bold text-[#00E5FF]">{activePlanet.rating}%</span>
                          <div className="flex space-x-0.5">
                            {[1, 2, 3, 4, 5].map((s) => {
                              const score = activePlanet.rating / 20;
                              return (
                                <Star 
                                  key={s} 
                                  className={`w-3.5 h-3.5 ${s <= score ? 'text-[#00E5FF] fill-[#00E5FF]' : 'text-slate-700'}`} 
                                />
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Description text */}
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {activePlanet.description}
                    </p>

                    {/* Libraries / Methods block */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-white uppercase tracking-wider">
                        <Library className="w-4 h-4 text-[#64FFDA]" />
                        <span>SPECIALIZATION GRID</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {activeDetail.libraries.map((lib, i) => (
                          <div 
                            key={lib}
                            className="px-2.5 py-1 rounded-md border border-[#64FFDA]/10 bg-[#64FFDA]/5 font-mono text-[10px] text-[#64FFDA] font-semibold"
                          >
                            {lib}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Production Projects block */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-white uppercase tracking-wider">
                        <Zap className="w-4 h-4 text-[#00B0FF]" />
                        <span>SYS INTEGRATIONS / USE CASES</span>
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400 font-mono">
                        {activeDetail.projects.map((proj, i) => (
                          <li key={proj} className="flex items-start space-x-2">
                            <span className="text-[#00B0FF] mt-0.5">▪</span>
                            <span>{proj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Next Sector Navigation */}
                    <div className="flex justify-end pt-3 border-t border-cyan-500/10">
                      <button
                        id="next-education-btn"
                        onClick={onNext}
                        className="px-5 py-2.5 rounded-lg border border-cyan-500/30 bg-cyan-950/20 text-[#64FFDA] font-mono text-xs font-semibold uppercase tracking-widest cursor-pointer hover:bg-[#64FFDA]/10 hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(100,255,218,0.25)] flex items-center space-x-2"
                      >
                        <span>ENTER TIME WARP TUNNEL</span>
                        <span>→</span>
                      </button>
                    </div>

                  </div>
                </CardGlass>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
};
