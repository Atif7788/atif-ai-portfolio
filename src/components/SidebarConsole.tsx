import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Cpu, 
  Activity, 
  Volume2, 
  VolumeX, 
  Clock, 
  Database,
  Terminal as TermIcon,
  ChevronsRight,
  MapPin
} from 'lucide-react';
import { audioEngine } from './AudioEngine';

interface SidebarConsoleProps {
  activeScene: number;
  onSceneSelect: (sceneNum: number) => void;
}

const SECTOR_NAMES = [
  "01. ARRIVAL CORE",
  "02. PROFILE MATRIX",
  "03. SKILLS GALAXY",
  "04. SPACE WARP TUNNEL",
  "05. PROJECTS COMMAND",
  "06. GITHUB COMMONS",
  "07. VENTURE DISTRICT",
  "08. ACHIEVEMENT HALL",
  "09. CONTACT COMMS"
];

const LOG_MESSAGES = [
  "SYS // Core power reserves: nominal",
  "SYS // Orbiting Skill planets calibrated",
  "SYS // Telemetry synced with Jodhpur Node",
  "SYS // Holographic interface running at 60FPS",
  "SYS // Sound module initialized",
  "SYS // Brain synapses firing... ok",
  "SYS // Portals loaded on standard canvas",
  "SYS // Business structures growing on grid"
];

export const SidebarConsole: React.FC<SidebarConsoleProps> = ({ activeScene, onSceneSelect }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [logs, setLogs] = useState<string[]>([
    "SYS // Boot sequence complete",
    "SYS // Lab sensors: ACTIVE"
  ]);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Generate rotating real-time diagnostics
    const logInterval = setInterval(() => {
      const randomMsg = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
      setLogs(prev => [randomMsg, prev[0]].slice(0, 5));
    }, 4500);

    // Dynamic Clock
    const clockInterval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);

    return () => {
      clearInterval(logInterval);
      clearInterval(clockInterval);
    };
  }, []);

  const handleMuteToggle = () => {
    audioEngine.playClick();
    if (isMuted) {
      audioEngine.startAmbientHum();
      setIsMuted(false);
      setLogs(prev => ["SYS // Synth hum online", ...prev].slice(0, 5));
    } else {
      audioEngine.stopAmbientHum();
      setIsMuted(true);
      setLogs(prev => ["SYS // Synth hum offline", ...prev].slice(0, 5));
    }
  };

  const handleSelectSector = (num: number) => {
    audioEngine.playTransition();
    onSceneSelect(num);
  };

  return (
    <>
      {/* LEFT SIDEBAR - Desktop HUD */}
      <div className="fixed left-5 top-5 bottom-5 w-76 z-50 hidden lg:flex flex-col justify-between border border-cyan-500/20 rounded-2xl bg-black/55 backdrop-blur-lg p-5 font-mono text-xs text-cyan-400 select-none shadow-[0_0_30px_rgba(0,229,255,0.05)]">
        
        {/* Top Segment: Brand and Coordinates */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-cyan-500/10 pb-3">
            <div className="flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-[#00E5FF] animate-pulse" />
              <div>
                <h2 className="text-sm font-semibold tracking-wider text-white">JARVIS_LAB.v9</h2>
                <div className="flex items-center space-x-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-[9px] text-emerald-400 uppercase tracking-widest font-bold">ONLINE</span>
                </div>
              </div>
            </div>
            
            {/* Audio Toggle button */}
            <button 
              onClick={handleMuteToggle}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${!isMuted ? 'border-[#64FFDA] bg-[#64FFDA]/10 text-[#64FFDA]' : 'border-cyan-500/20 hover:border-cyan-500/50 text-cyan-500'}`}
              title={isMuted ? "Activate Core Hum (Ambient)" : "Deactivate Core Hum"}
            >
              {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

          <div className="bg-cyan-950/20 rounded-lg p-2.5 border border-cyan-500/5 space-y-1">
            <div className="flex items-center text-gray-400 space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#00B0FF]" />
              <span className="font-bold text-[10px] text-white">LAB TELEMETRY</span>
            </div>
            <div className="text-[10px] text-[#00E5FF] leading-relaxed">
              LOC: Jodhpur, Rajasthan, IN<br />
              COORDS: 26.2389° N, 73.0243° E<br />
              NODE: Lachoo Memorial College
            </div>
          </div>
        </div>

        {/* Middle Segment: Teleporter Navigation */}
        <div className="space-y-2 py-4">
          <div className="text-[9px] font-bold tracking-widest text-gray-500 mb-2 uppercase">SECTOR TELEPORT</div>
          <div className="space-y-1">
            {SECTOR_NAMES.map((name, idx) => {
              const num = idx + 1;
              const isActive = activeScene === num;
              return (
                <button
                  key={name}
                  onClick={() => handleSelectSector(num)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all text-left group border cursor-pointer ${
                    isActive 
                      ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-[0_0_12px_rgba(0,229,255,0.15)]' 
                      : 'border-transparent text-cyan-400/75 hover:bg-cyan-500/5 hover:text-white'
                  }`}
                >
                  <span className="font-medium tracking-wide">{name}</span>
                  <ChevronsRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'translate-x-0.5 text-white' : 'opacity-0 group-hover:opacity-100'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Segment: Diagnostic Logs & Time */}
        <div className="space-y-3 pt-3 border-t border-cyan-500/10">
          <div className="flex items-center justify-between text-[10px] text-gray-400">
            <div className="flex items-center space-x-1">
              <TermIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>TERMINAL FEED</span>
            </div>
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          </div>

          <div className="h-20 bg-black/45 rounded-lg p-2.5 border border-cyan-500/5 flex flex-col justify-end space-y-1 overflow-hidden">
            <AnimatePresence initial={false}>
              {logs.map((log, i) => (
                <motion.div
                  key={log + i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-[9px] text-[#64FFDA] truncate leading-tight font-mono"
                >
                  {log}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex justify-between items-center text-[10px] text-gray-400 pt-1">
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-cyan-400" />
              {currentTime || "00:00:00"}
            </span>
            <span className="flex items-center text-emerald-400">
              <Database className="w-3.5 h-3.5 mr-1 text-emerald-400" />
              R3F_DBASE: OK
            </span>
          </div>
        </div>
      </div>

      {/* MOBILE HEADER - Adaptive HUD */}
      <div className="fixed top-0 inset-x-0 h-16 z-50 flex lg:hidden items-center justify-between px-4 border-b border-cyan-500/20 bg-black/75 backdrop-blur-lg font-mono text-xs text-cyan-400 select-none">
        <div className="flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-[#00E5FF]" />
          <div>
            <span className="font-bold text-white tracking-widest text-[11px]">JARVIS.v9</span>
            <div className="text-[8px] text-[#00B0FF]">JODHPUR CORE // SCENE {activeScene}/9</div>
          </div>
        </div>

        {/* Audio Engine Hum and Quick Navigation Grid */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleMuteToggle}
            className={`p-2 rounded-lg border cursor-pointer ${!isMuted ? 'border-[#64FFDA] bg-[#64FFDA]/10 text-[#64FFDA]' : 'border-cyan-500/20 text-cyan-400'}`}
          >
            {!isMuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* Quick Scene Jump Dropdown/Buttons */}
          <div className="flex space-x-1 bg-black/40 border border-cyan-500/20 rounded-lg p-0.5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleSelectSector(num)}
                className={`w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold transition-all cursor-pointer ${
                  activeScene === num 
                    ? 'bg-[#00E5FF] text-black shadow-[0_0_8px_rgba(0,229,255,0.6)]' 
                    : 'text-cyan-400/65 hover:bg-cyan-500/10'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
