import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Globe, Award, ShieldAlert, Layers, CheckCircle2, ExternalLink } from 'lucide-react';
import { CardGlass } from './CardGlass';
import { ProjectItem } from '../types';
import { audioEngine } from './AudioEngine';

interface SceneProjectsProps {
  onNext: () => void;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    title: "AI Cafeteria Crowd Prediction System",
    subtitle: "Decision Support & Predictive Modeling",
    description: "An advanced, high-precision AI forecasting core that predicts regional cafeteria crowd density. Empowers college staff and students to optimize scheduling and reduce wait times.",
    tags: ["Python", "Machine Learning", "Scikit-Learn", "Pandas", "Matplotlib"],
    features: [
      "Time-series algorithmic forecasting based on temporal peak scheduling variables",
      "Automated outlier cleansing and data filtration workflows",
      "Executive reporting visualizations representing real-time traffic statistics"
    ],
    modelType: "Cube"
  },
  {
    id: "proj-2",
    title: "Unique Handicraft Corporate Portal",
    subtitle: "Enterprise E-Commerce Systems",
    description: "A wholesale aluminium handicraft business portal, showcasing fine Indian artisanal metallic goods to international bulk buyers and business chains.",
    tags: ["React.js", "Next.js", "Tailwind CSS", "Node.js", "PostgreSQL"],
    features: [
      "High-density responsive visual catalogs displaying metallic structures",
      "Optimized static rendering grids for fast bulk inventory loadouts",
      "Direct B2B secure wholesale inquiry and lead generation routing"
    ],
    modelType: "Octahedron"
  },
  {
    id: "proj-3",
    title: "BESPOKE AQUA Web Infrastructure",
    subtitle: "Commercial Brand Operations",
    description: "Customized premium packaged drinking water brand web ecosystem, introducing bespoke labeling solutions to the luxury hospitality, wedding, and corporate sectors.",
    tags: ["Web Dev", "Tailwind CSS", "Motion / Animations", "Figma Design", "ETL Pipelines"],
    features: [
      "Luxurious, high-contrast, minimalist showcase templates",
      "Interactive 3D mock labeling visual previews for prospective corporate clients",
      "Automated logistics delivery requests integration"
    ],
    modelType: "Sphere"
  },
  {
    id: "proj-4",
    title: "AI Attendance Recognition Terminal",
    subtitle: "Computer Vision & Identity",
    description: "Biometric attendance tracking platform utilizing facial recognition neural frameworks to automate entry-point logging with absolute precision.",
    tags: ["Python", "OpenCV", "Face Recognition", "Deep Learning", "SQL Database"],
    features: [
      "Sub-second face detection and matching weights indexing",
      "Robust anti-spoofing algorithms to prevent fraudulent photo attempts",
      "Instant administrative attendance logs syncing and reporting dashboard"
    ],
    modelType: "Torus"
  }
];

export const SceneProjects: React.FC<SceneProjectsProps> = ({ onNext }) => {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  const handleProjectHover = (id: string | null) => {
    if (id && hoveredProjectId !== id) {
      audioEngine.playBeep(2100, 0.02);
    }
    setHoveredProjectId(id);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-16 relative z-10 select-none">
      <div className="max-w-6xl w-full space-y-8">
        
        {/* Title */}
        <div className="text-center md:text-left flex flex-col md:flex-row justify-between items-baseline gap-2">
          <div>
            <span className="font-mono text-xs text-[#00E5FF] tracking-widest font-bold uppercase">SECTOR_05 // QUANTUM REPOSITORIES</span>
            <h2 className="text-4xl font-sans font-extrabold text-white tracking-tight mt-1">COMMAND PROJECT CONSOLES</h2>
          </div>
          <span className="font-mono text-[10px] text-slate-500 hidden md:inline">SYSTEM STATE: 4 CORES ACTIVE // MULTIPLEXED</span>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, idx) => {
            const isHovered = hoveredProjectId === project.id;
            return (
              <div
                key={project.id}
                onMouseEnter={() => handleProjectHover(project.id)}
                onMouseLeave={() => handleProjectHover(null)}
              >
                <CardGlass 
                  glowColor={idx === 0 ? "cyan" : idx === 1 ? "blue" : idx === 2 ? "mint" : "orange"}
                  className="h-full flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    
                    {/* Project Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-mono text-[9px] text-cyan-400 font-bold uppercase tracking-wider">PROJECT 0{idx + 1}</span>
                        <h3 className="text-lg font-bold text-white tracking-tight leading-snug mt-0.5">{project.title}</h3>
                        <p className="text-xs text-slate-400 font-mono mt-0.5">{project.subtitle}</p>
                      </div>
                      <div className="p-2 border border-cyan-500/20 bg-cyan-950/20 rounded-lg">
                        {idx === 0 ? <Cpu className="w-5 h-5 text-[#00E5FF]" /> : 
                         idx === 1 ? <Globe className="w-5 h-5 text-[#00B0FF]" /> : 
                         idx === 2 ? <Layers className="w-5 h-5 text-[#64FFDA]" /> : 
                         <ShieldAlert className="w-5 h-5 text-amber-400" />}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {project.description}
                    </p>

                    {/* Features list */}
                    <div className="space-y-1.5 pt-1">
                      <span className="font-mono text-[9px] font-bold text-[#64FFDA] tracking-wider uppercase">CORE METRICS & INTEGRATIONS</span>
                      <ul className="space-y-1 text-[11px] text-slate-400 font-sans">
                        {project.features.map((feature, i) => (
                          <li key={i} className="flex items-start space-x-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/80 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Tags and Action */}
                  <div className="mt-5 pt-3 border-t border-cyan-500/10 flex flex-wrap gap-1.5 items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-1.5 py-0.5 rounded border border-cyan-500/10 bg-cyan-950/10 font-mono text-[9px] text-[#00E5FF]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1 font-mono text-[10px] text-white hover:text-[#00E5FF] transition-colors"
                      >
                        <span>SOURCE</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                </CardGlass>
              </div>
            );
          })}
        </div>

        {/* Next Sector Navigation */}
        <div className="flex justify-end pt-2">
          <button
            id="next-entrepreneur-btn"
            onClick={onNext}
            className="px-5 py-2.5 rounded-lg border border-cyan-500/30 bg-cyan-950/20 text-cyan-300 font-mono text-xs font-semibold uppercase tracking-widest cursor-pointer hover:bg-cyan-500/10 hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,229,255,0.25)] flex items-center space-x-2"
          >
            <span>LAUNCH ENTREPRENEUR LAB</span>
            <span>→</span>
          </button>
        </div>

      </div>
    </div>
  );
};
