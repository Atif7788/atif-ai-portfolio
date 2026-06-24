import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, Landmark, HelpCircle, Activity, Globe, HeartHandshake, Layers, Award, Droplet } from 'lucide-react';
import { CardGlass } from './CardGlass';
import { BusinessItem } from '../types';
import { audioEngine } from './AudioEngine';

interface SceneEntrepreneurProps {
  onNext: () => void;
}

const VENTURES: BusinessItem[] = [
  {
    id: "biz-1",
    title: "UNIQUE HANDICRAFT",
    category: "Wholesale Aluminium & Metal Crafts",
    description: "An offline-to-online venture specializing in the manufacturing and distribution of premium aluminium handicrafts, home decor, and customized metal products.",
    details: [
      "Direct integration of traditional Jodhpur artisanal craftsmanship with global commercial channels.",
      "Automated logistics management and digital inventory mapping for high-speed container-load wholesale operations.",
      "High-fidelity wholesale digital design showroom, streamlining international buyer queries."
    ],
    metrics: [
      { label: "ARTISANS CONNECTED", value: "50+" },
      { label: "PRODUCT PORTFOLIO", value: "1,200+ items" },
      { label: "REGIONAL FOCUS", value: "National & Exports" },
      { label: "SUPPLY CHAIN STABILITY", value: "100% SECURE" }
    ]
  },
  {
    id: "biz-2",
    title: "BESPOKE AQUA",
    category: "Customized Premium Packaged Water Solutions",
    description: "A customized premium packaged drinking water brand redefining advertising and events. Integrates personalized corporate labels onto premium micro-filtered water bottles.",
    details: [
      "Tailor-made labeling campaigns for five-star hotels, luxury weddings, business forums, and major events.",
      "High-grade purification logistics involving multi-stage reverse osmosis and mineral enrichment.",
      "Green eco-conscious bottle manufacturing structures minimizing regional transport emissions."
    ],
    metrics: [
      { label: "CUSTOMIZED CORPS", value: "30+ Brands" },
      { label: "DISTRIBUTION CHANNELS", value: "Jodhpur & Rajasthan" },
      { label: "DAILY REVENUE MULTIPLIER", value: "1.8x Q-on-Q" },
      { label: "QUALITY GRADE", value: "autonomous micro-filter" }
    ]
  }
];

export const SceneEntrepreneur: React.FC<SceneEntrepreneurProps> = ({ onNext }) => {
  const [activeVentureId, setActiveVentureId] = useState("biz-1");

  const handleSelectVenture = (id: string) => {
    audioEngine.playBeep(2300, 0.05);
    setActiveVentureId(id);
  };

  const activeVenture = VENTURES.find(v => v.id === activeVentureId)!;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-16 relative z-10 select-none">
      <div className="max-w-5xl w-full space-y-10">
        
        {/* Title */}
        <div className="text-center md:text-left">
          <span className="font-mono text-xs text-[#64FFDA] tracking-widest font-bold uppercase">SECTOR_06 // VENTURE DEVELOPMENT COMMAND</span>
          <h2 className="text-4xl font-sans font-extrabold text-white tracking-tight mt-1">BUSINESS COMMAND STATION</h2>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 border-b border-cyan-500/10 pb-4">
          {VENTURES.map((venture) => {
            const isActive = venture.id === activeVentureId;
            return (
              <button
                key={venture.id}
                onClick={() => handleSelectVenture(venture.id)}
                className={`px-6 py-3 rounded-xl border font-mono text-xs font-bold tracking-widest transition-all cursor-pointer uppercase ${
                  isActive 
                    ? 'bg-[#00E5FF]/10 border-[#00E5FF] text-white shadow-[0_0_15px_rgba(0,229,255,0.15)]' 
                    : 'border-cyan-500/15 bg-black/40 text-cyan-400/70 hover:bg-cyan-500/5 hover:text-white hover:border-cyan-500/40'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {venture.id === "biz-1" ? <HeartHandshake className="w-4 h-4 text-[#00E5FF]" /> : <Droplet className="w-4 h-4 text-[#64FFDA]" />}
                  <span>{venture.title}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Venture Data Display */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Metrics and Category */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-mono text-[9px] font-bold text-gray-500 tracking-wider block uppercase">VENTURE INTEL STATS</span>
            <div className="grid grid-cols-2 gap-3">
              {activeVenture.metrics.map((metric) => (
                <CardGlass 
                  key={metric.label} 
                  glowColor={activeVenture.id === "biz-1" ? "cyan" : "mint"}
                  hoverGlow={false}
                  className="p-4"
                >
                  <div className="space-y-1 font-mono">
                    <span className="text-[8px] text-slate-500 leading-tight block font-bold uppercase">{metric.label}</span>
                    <span className="text-sm font-extrabold text-white block truncate tracking-tight">{metric.value}</span>
                  </div>
                </CardGlass>
              ))}
            </div>

            <CardGlass glowColor="blue" hoverGlow={false} className="p-4 flex items-center space-x-3">
              <Activity className="w-5 h-5 text-[#00B0FF] animate-pulse shrink-0" />
              <div className="font-mono text-[10px]">
                <span className="text-slate-500 block">SYSTEM LOAD INDEX_</span>
                <span className="text-[#00B0FF] font-bold">STABLE AT 100% POWER</span>
              </div>
            </CardGlass>
          </div>

          {/* Right Panel: Descriptions & Corporate details */}
          <div className="md:col-span-8">
            <CardGlass glowColor={activeVenture.id === "biz-1" ? "cyan" : "mint"}>
              <div className="space-y-6">
                
                {/* Venture Corporate Header */}
                <div className="pb-4 border-b border-cyan-500/10">
                  <span className="font-mono text-[9px] font-bold text-[#64FFDA] tracking-widest uppercase">VENTURE DIRECTIVE PROFILE</span>
                  <h3 className="text-2xl font-bold text-white tracking-tight mt-1">{activeVenture.title}</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{activeVenture.category}</p>
                </div>

                {/* Venture Description */}
                <div className="space-y-4">
                  <p className="text-sm text-slate-200 leading-relaxed font-sans">
                    {activeVenture.description}
                  </p>

                  {/* Operation checkpoints */}
                  <div className="space-y-3 pt-2">
                    <span className="font-mono text-[9px] font-bold text-[#00E5FF] tracking-wider uppercase">VIRTUAL OPERATION LEDGER</span>
                    <div className="space-y-2 text-xs text-slate-300 font-sans">
                      {activeVenture.details.map((detail, i) => (
                        <div key={i} className="flex items-start space-x-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] shrink-0 mt-2"></span>
                          <span className="leading-relaxed">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Next Sector Navigation */}
                <div className="flex justify-end pt-3 border-t border-cyan-500/10">
                  <button
                    id="next-achievements-btn"
                    onClick={onNext}
                    className="px-5 py-2.5 rounded-lg border border-cyan-500/30 bg-cyan-950/20 text-[#64FFDA] font-mono text-xs font-semibold uppercase tracking-widest cursor-pointer hover:bg-cyan-500/10 hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(100,255,218,0.25)] flex items-center space-x-2"
                  >
                    <span>OPEN ACHIEVEMENTS CORRIDOR</span>
                    <span>→</span>
                  </button>
                </div>

              </div>
            </CardGlass>
          </div>

        </div>

      </div>
    </div>
  );
};
