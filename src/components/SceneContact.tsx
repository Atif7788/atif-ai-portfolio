import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Linkedin, MapPin, Send, Cpu, CheckCircle2, ShieldAlert, Loader2 } from 'lucide-react';
import { CardGlass } from './CardGlass';
import { audioEngine } from './AudioEngine';

export const SceneContact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'sent' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      audioEngine.playBeep(1200, 0.4);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2500);
      return;
    }

    audioEngine.playTransition();
    setStatus('transmitting');

    // Simulate futuristic quantum transmission uplink delay
    setTimeout(() => {
      audioEngine.playBeep(2800, 0.35);
      setStatus('sent');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2200);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-16 relative z-10 select-none">
      <div className="max-w-5xl w-full space-y-10">
        
        {/* Title */}
        <div className="text-center md:text-left">
          <span className="font-mono text-xs text-[#00E5FF] tracking-widest font-bold uppercase">SECTOR_08 // QUANTUM BROADCAST NETWORKS</span>
          <h2 className="text-4xl font-sans font-extrabold text-white tracking-tight mt-1">COMMUNICATION RADAR</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Coordinates & Contact Details */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-mono text-[9px] font-bold text-gray-500 tracking-wider block uppercase">COMMUNICATION CHANNELS</span>
            
            <CardGlass glowColor="cyan" hoverGlow={false}>
              <div className="space-y-6">
                
                {/* Profile Header */}
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Atif Ali</h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">B.Tech Student Entrepreneur // Jodhpur Node</p>
                </div>

                {/* Direct Contact Metrics */}
                <div className="space-y-4 font-mono text-xs text-slate-300">
                  
                  <div className="flex items-center space-x-3.5 group">
                    <div className="p-2 border border-cyan-500/20 bg-cyan-950/20 rounded-lg text-[#00E5FF] transition-all group-hover:bg-[#00E5FF]/10 group-hover:border-[#00E5FF]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[8px] text-slate-500 block uppercase font-bold">DIRECT MAILBOX_</span>
                      <a 
                        href="mailto:atifaly59@gmail.com" 
                        onClick={() => audioEngine.playClick()}
                        className="text-white hover:text-[#00E5FF] transition-colors font-medium break-all"
                      >
                        atifaly59@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3.5 group">
                    <div className="p-2 border border-blue-500/20 bg-blue-950/20 rounded-lg text-[#00B0FF] transition-all group-hover:bg-[#00B0FF]/10 group-hover:border-[#00B0FF]">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[8px] text-slate-500 block uppercase font-bold">LINKEDIN COMM_</span>
                      <a 
                        href="https://www.linkedin.com/in/atif-ali-61050732b" 
                        target="_blank" 
                        rel="noreferrer"
                        onClick={() => audioEngine.playClick()}
                        className="text-white hover:text-[#00B0FF] transition-colors font-medium break-all"
                      >
                        linkedin.com/in/atif-ali-61050732b
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3.5">
                    <div className="p-2 border border-emerald-400/20 bg-emerald-950/20 rounded-lg text-[#64FFDA]">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[8px] text-slate-500 block uppercase font-bold">SECTOR LOCK_</span>
                      <span className="text-white font-medium">
                        Jodhpur, Rajasthan, India
                      </span>
                    </div>
                  </div>

                </div>

                <div className="pt-4 border-t border-cyan-500/10 text-[9px] text-slate-500 font-mono leading-relaxed">
                  Notice: Transmission links are completely secure. Secure shell certificates are authenticated on the fly.
                </div>

              </div>
            </CardGlass>
          </div>

          {/* Right Column: Interactive Science Form */}
          <div className="md:col-span-7">
            <CardGlass glowColor="cyan">
              <div className="space-y-6">
                
                <div className="pb-4 border-b border-cyan-500/10">
                  <span className="font-mono text-[9px] font-bold text-[#64FFDA] tracking-widest uppercase">TRANSMITTER FORM</span>
                  <h3 className="text-xl font-bold text-white tracking-tight mt-0.5">BROADCAST SIGNAL UPLINK</h3>
                </div>

                <AnimatePresence mode="wait">
                  {status === 'sent' ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="py-12 flex flex-col items-center justify-center text-center space-y-4 font-mono"
                    >
                      <div className="w-16 h-16 rounded-full border-2 border-emerald-400 bg-emerald-400/15 flex items-center justify-center text-emerald-400 animate-pulse">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-white uppercase tracking-wider">UPLINK SYNCHRONIZED</h4>
                        <p className="text-xs text-emerald-400 font-semibold uppercase">MESSAGE SUCCESSFULLY TRANSMITTED</p>
                        <p className="text-[10px] text-slate-400 max-w-sm mx-auto pt-2 leading-relaxed">
                          Your signal has been compiled and routed directly to Atif's communications deck in Jodhpur. Preparing response.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          audioEngine.playClick();
                          setStatus('idle');
                        }}
                        className="mt-6 px-4 py-2 border border-emerald-400/30 bg-emerald-400/5 text-emerald-400 text-[10px] font-bold tracking-widest uppercase rounded-lg hover:bg-emerald-400/10 transition-colors cursor-pointer"
                      >
                        BROADCAST NEW SIGNAL
                      </button>
                    </motion.div>
                  ) : status === 'transmitting' ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-16 flex flex-col items-center justify-center text-center space-y-4 font-mono"
                    >
                      <Loader2 className="w-12 h-12 text-[#00E5FF] animate-spin" />
                      <div className="space-y-1">
                        <p className="text-xs text-white uppercase tracking-widest font-bold">COMPILING CORE DATA PACKETS...</p>
                        <p className="text-[9px] text-[#00E5FF] animate-pulse">TRANSMITTING OVER SECURE SATELLITE CHANNELS</p>
                      </div>
                      {/* Interactive visual progress meter */}
                      <div className="w-48 h-1.5 bg-cyan-950 rounded-full overflow-hidden border border-cyan-500/20">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-[#00E5FF] to-[#00B0FF]"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 2.0, ease: "linear" }}
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      onSubmit={handleSubmit}
                      className="space-y-4 font-mono text-xs text-cyan-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-gray-500 tracking-wider uppercase">SENDER_NAME_</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-black/45 border border-cyan-500/25 rounded-lg px-3 py-2.5 text-white outline-none focus:border-[#00E5FF] focus:shadow-[0_0_8px_rgba(0,229,255,0.2)] transition-all font-sans text-xs"
                            placeholder="Captain America"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-bold text-gray-500 tracking-wider uppercase">SENDER_EMAIL_</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-black/45 border border-cyan-500/25 rounded-lg px-3 py-2.5 text-white outline-none focus:border-[#00E5FF] focus:shadow-[0_0_8px_rgba(0,229,255,0.2)] transition-all font-sans text-xs"
                            placeholder="tony@starkindustries.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-gray-500 tracking-wider uppercase">TRANSMISSION_SUBJECT_</label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full bg-black/45 border border-cyan-500/25 rounded-lg px-3 py-2.5 text-white outline-none focus:border-[#00E5FF] focus:shadow-[0_0_8px_rgba(0,229,255,0.2)] transition-all font-sans text-xs"
                          placeholder="JARVIS Lab Integration"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-gray-500 tracking-wider uppercase">MESSAGE_CONTENT_</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          className="w-full bg-black/45 border border-cyan-500/25 rounded-lg px-3 py-2.5 text-white outline-none focus:border-[#00E5FF] focus:shadow-[0_0_8px_rgba(0,229,255,0.2)] transition-all font-sans text-xs resize-none"
                          placeholder="Initialize project sync with Atif Ali..."
                        />
                      </div>

                      {status === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center space-x-2 p-3 bg-red-950/20 border border-red-500/35 rounded-lg text-red-400 text-[10px] font-semibold uppercase font-mono"
                        >
                          <ShieldAlert className="w-4 h-4 shrink-0" />
                          <span>MANDATORY PACKETS MISSING. VERIFY SENDER FIELDS NOT EMPTY.</span>
                        </motion.div>
                      )}

                      <div className="pt-2 flex justify-between items-center">
                        <div className="flex items-center space-x-1.5 text-[8px] text-slate-500">
                          <Cpu className="w-3.5 h-3.5" />
                          <span>ENCRYPTED DIRECT CHANNEL</span>
                        </div>
                        <button
                          type="submit"
                          className="px-6 py-3 bg-gradient-to-r from-[#00E5FF] to-[#00B0FF] text-black font-bold text-[10px] tracking-widest rounded-lg flex items-center space-x-2 hover:brightness-115 hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] cursor-pointer transition-all duration-300 uppercase"
                        >
                          <span>TRANSMIT SIGNAL</span>
                          <Send className="w-3 h-3 text-black" />
                        </button>
                      </div>

                    </motion.form>
                  )}
                </AnimatePresence>

              </div>
            </CardGlass>
          </div>

        </div>

        {/* Footer legalities */}
        <div className="border-t border-cyan-500/10 pt-6 text-center font-mono text-[9px] text-slate-500 space-y-1">
          <p>© {new Date().getFullYear()} ATIF ALI. ALL CORES REGISTERED AND BINDED.</p>
          <p>BUILT WITH ADVANCED FULL-STACK DESIGNS // HOSTED AT PORT 3000</p>
        </div>

      </div>
    </div>
  );
};
