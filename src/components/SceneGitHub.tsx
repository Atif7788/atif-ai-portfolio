import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Star, 
  GitFork, 
  RefreshCw, 
  Folder, 
  Activity, 
  ChevronRight, 
  Code, 
  AlertTriangle, 
  Users, 
  GitCommit, 
  Calendar,
  ExternalLink
} from 'lucide-react';
import { CardGlass } from './CardGlass';
import { getGitHubData } from '../lib/githubService';
import { GitHubProfile, GitHubRepo, GitHubCommit, GitHubActivity } from '../types';
import { audioEngine } from './AudioEngine';

export const SceneGitHub: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [activities, setActivities] = useState<GitHubActivity[]>([]);
  const [isCached, setIsCached] = useState(false);
  const [activeTab, setActiveTab] = useState<'repos' | 'activity'>('repos');
  const [selectedRepoId, setSelectedRepoId] = useState<number | null>(null);

  // Generate dynamic seed for the contribution grid
  const [contributionData, setContributionData] = useState<{ day: number; count: number; colorLevel: number }[]>([]);

  useEffect(() => {
    // Compile contribution heat points for 180 days (approximately 26 weeks)
    const mockHeatmap = Array.from({ length: 140 }, (_, idx) => {
      // Deterministic heat map with random-looking commit densities
      const dayFactor = (idx * 17) % 100;
      let count = 0;
      let colorLevel = 0; // 0: empty, 1: low, 2: mid, 3: high, 4: ultra

      if (dayFactor > 40 && dayFactor < 65) {
        count = Math.floor((dayFactor % 4) + 1);
        colorLevel = 1;
      } else if (dayFactor >= 65 && dayFactor < 85) {
        count = Math.floor((dayFactor % 5) + 3);
        colorLevel = 2;
      } else if (dayFactor >= 85 && dayFactor < 95) {
        count = Math.floor((dayFactor % 6) + 7);
        colorLevel = 3;
      } else if (dayFactor >= 95) {
        count = Math.floor((dayFactor % 8) + 11);
        colorLevel = 4;
      }

      return {
        day: idx,
        count,
        colorLevel
      };
    });
    setContributionData(mockHeatmap);
  }, []);

  const loadGitHubDetails = async (forceRefresh = false) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getGitHubData();
      setProfile(data.profile);
      setRepos(data.repos);
      setCommits(data.commits);
      setActivities(data.activities);
      setIsCached(data.fromCache);
    } catch (err: any) {
      setError(err.message || 'Failed to sync with GitHub nodes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGitHubDetails();
  }, []);

  // Set up SEO structured data (JSON-LD) dynamically
  useEffect(() => {
    if (!profile) return;

    const existingScript = document.getElementById('github-portfolio-seo-ld');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'github-portfolio-seo-ld';
    script.type = 'application/ld+json';
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "mainEntity": {
        "@type": "Person",
        "name": profile.name,
        "alternateName": profile.login,
        "description": profile.bio,
        "image": profile.avatar_url,
        "sameAs": [profile.html_url],
        "knowsAbout": profile.top_languages.map(l => l.language)
      }
    };

    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const sc = document.getElementById('github-portfolio-seo-ld');
      if (sc) sc.remove();
    };
  }, [profile]);

  const handleCellHover = (count: number) => {
    if (count > 0) {
      audioEngine.playBeep(2600 + count * 100, 0.01);
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-5xl px-4 lg:px-12 flex flex-col items-center justify-center h-[70vh] font-mono text-cyan-400 select-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="mb-6"
        >
          <RefreshCw className="w-12 h-12 text-[#00E5FF] filter drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]" />
        </motion.div>
        <div className="text-sm tracking-widest text-[#00E5FF] mb-1 animate-pulse uppercase">
          SYNCING PROFILE MATRIX...
        </div>
        <div className="text-[10px] text-gray-500 tracking-wider">
          Connecting to Jodhpur node gateway to fetch repository states
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="w-full max-w-4xl px-6 py-8">
        <CardGlass glowColor="orange" className="p-8 text-center flex flex-col items-center">
          <AlertTriangle className="w-14 h-14 text-amber-500 mb-4 animate-bounce" />
          <h3 className="text-lg font-mono font-bold text-amber-400 tracking-wider uppercase mb-2">
            TELEMETRY LINK INTERRUPTED
          </h3>
          <p className="text-xs text-gray-400 max-w-md mx-auto mb-6 leading-relaxed">
            GitHub API limit reached or offline. The interface has entered a degraded mode. Click manual override below to retry query.
          </p>
          <button
            onClick={() => loadGitHubDetails(true)}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono text-xs hover:bg-amber-500/20 hover:border-amber-500/50 cursor-pointer transition-all duration-300"
          >
            <RefreshCw className="w-4 h-4" />
            <span>MANUAL OVERRIDE RETRY</span>
          </button>
        </CardGlass>
      </div>
    );
  }

  // Choose colors based on heat density
  const getCellBg = (level: number) => {
    switch (level) {
      case 1: return 'bg-emerald-950/40 border border-emerald-500/10';
      case 2: return 'bg-emerald-900/60 border border-emerald-500/20';
      case 3: return 'bg-emerald-700/80 border border-[#64FFDA]/30 shadow-[0_0_4px_rgba(100,255,218,0.2)]';
      case 4: return 'bg-emerald-500 border border-[#64FFDA] shadow-[0_0_8px_rgba(100,255,218,0.4)]';
      case 0:
      default: return 'bg-slate-900/40 border border-cyan-950/20 hover:border-cyan-500/10';
    }
  };

  return (
    <div className="w-full max-w-6xl px-4 md:px-8 py-6 h-full flex flex-col justify-center overflow-y-auto">
      
      {/* Sector Header */}
      <div className="mb-4 text-left select-none">
        <div className="flex items-center space-x-2 text-[#00E5FF] font-mono text-[10px] tracking-widest uppercase">
          <Activity className="w-4 h-4 animate-pulse" />
          <span>Sector 06 // GITHUB COMMAND</span>
          {isCached && (
            <span className="bg-cyan-950/50 border border-cyan-500/20 text-[8px] px-1.5 py-0.5 rounded text-cyan-400 tracking-normal ml-2">
              CACHED MODE
            </span>
          )}
        </div>
        <h1 className="text-xl md:text-3xl font-bold tracking-tight text-white mt-1 uppercase font-display">
          Code Base <span className="text-[#00E5FF]">Command HUD</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Dynamic replication of active repositories, real-time contribution vectors, and compiler state logs synced directly to GitHub.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* LEFT COLUMN: Profile and languages */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          
          {/* Profile Card */}
          <CardGlass className="p-4" glowColor="cyan" hoverGlow={false}>
            <div className="flex items-center space-x-3.5 pb-4 border-b border-cyan-500/10">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 to-[#64FFDA] opacity-35 blur-sm group-hover:opacity-75 transition-opacity" />
                <img
                  src={profile.avatar_url}
                  alt={profile.name}
                  className="relative w-14 h-14 rounded-full border border-cyan-400 object-cover"
                />
                <div className="absolute -bottom-1 -right-1 bg-black border border-cyan-400/50 rounded-full p-1">
                  <Github className="w-3 h-3 text-[#00E5FF]" />
                </div>
              </div>

              <div className="min-w-0">
                <h2 className="text-base font-bold text-white tracking-wide truncate">{profile.name}</h2>
                <div className="text-[10px] font-mono text-[#00E5FF]">@{profile.login}</div>
                <div className="flex items-center space-x-1 text-[9px] text-slate-500 mt-0.5">
                  <Users className="w-2.5 h-2.5" />
                  <span>{profile.followers} followers · {profile.following} following</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 italic leading-relaxed py-3.5 border-b border-cyan-500/10">
              "{profile.bio}"
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-2 text-center pt-3 select-none">
              <div className="bg-cyan-950/15 border border-cyan-500/10 rounded-lg p-2">
                <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">REPOSITORIES</div>
                <div className="text-base font-bold text-[#00E5FF] font-mono mt-0.5">{profile.public_repos}</div>
              </div>
              <div className="bg-cyan-950/15 border border-cyan-500/10 rounded-lg p-2">
                <div className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">STARS EARNED</div>
                <div className="text-base font-bold text-[#64FFDA] font-mono mt-0.5">{profile.total_stars}</div>
              </div>
            </div>
          </CardGlass>

          {/* Languages Gauge Card */}
          <CardGlass className="p-4" glowColor="mint" hoverGlow={false}>
            <div className="flex items-center justify-between pb-2 border-b border-cyan-500/10 mb-3">
              <div className="flex items-center space-x-2 font-mono text-[10px] font-bold text-[#64FFDA] tracking-widest">
                <Code className="w-4 h-4" />
                <span>TOP LANGUAGE METRICS</span>
              </div>
            </div>

            <div className="space-y-3.5 select-none">
              {profile.top_languages.map((lang, idx) => {
                const colors = ['bg-[#00E5FF]', 'bg-[#64FFDA]', 'bg-amber-400', 'bg-pink-500'];
                const textColors = ['text-[#00E5FF]', 'text-[#64FFDA]', 'text-amber-400', 'text-pink-500'];
                return (
                  <div key={lang.language} className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="font-bold text-slate-200">{lang.language}</span>
                      <span className={textColors[idx % colors.length]}>{lang.percentage}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-cyan-950/30 rounded-full overflow-hidden border border-cyan-500/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                        className={`h-full ${colors[idx % colors.length]}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardGlass>

        </div>

        {/* RIGHT COLUMN: Tab content & Activities */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          
          {/* Main Workspace Navigation Tab */}
          <div className="flex items-center justify-between border-b border-cyan-500/15 pb-2">
            <div className="flex space-x-3">
              <button
                onClick={() => { audioEngine.playClick(); setActiveTab('repos'); }}
                className={`px-4 py-1.5 rounded-lg font-mono text-xs cursor-pointer border transition-all duration-300 ${
                  activeTab === 'repos' 
                    ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-[0_0_10px_rgba(0,229,255,0.15)]'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                FEATURED REPOSITORIES
              </button>
              <button
                onClick={() => { audioEngine.playClick(); setActiveTab('activity'); }}
                className={`px-4 py-1.5 rounded-lg font-mono text-xs cursor-pointer border transition-all duration-300 ${
                  activeTab === 'activity' 
                    ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-[0_0_10px_rgba(0,229,255,0.15)]'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                LIVE TERMINAL FEED
              </button>
            </div>

            <div className="hidden sm:flex items-center space-x-1 font-mono text-[9px] text-slate-500 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span>SYNCHRONIZED_WITH_NODE: OK</span>
            </div>
          </div>

          {/* Dynamic Window Area */}
          <div className="min-h-[290px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              
              {activeTab === 'repos' ? (
                <motion.div
                  key="repos"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full"
                >
                  {repos.slice(0, 4).map((repo, idx) => (
                    <CardGlass
                      key={repo.id}
                      glowColor={idx % 2 === 0 ? 'cyan' : 'mint'}
                      className="flex flex-col justify-between p-4 min-h-[135px]"
                      hoverGlow={true}
                      delay={idx * 0.05}
                      onClick={() => {
                        setSelectedRepoId(repo.id === selectedRepoId ? null : repo.id);
                      }}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1.5 font-bold text-xs font-mono text-white tracking-wide group-hover:text-[#00E5FF] transition-colors truncate max-w-[80%]">
                            <Folder className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                            <span className="truncate">{repo.name}</span>
                          </div>
                          
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              e.stopPropagation();
                              audioEngine.playClick();
                            }}
                            className="p-1.5 rounded bg-cyan-950/30 border border-cyan-500/10 hover:border-cyan-400 text-cyan-400 hover:text-white transition-all cursor-pointer"
                            title="View repository on GitHub"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>

                        <p className="text-[10px] text-slate-400 leading-relaxed line-clamp-2">
                          {repo.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 pt-3 border-t border-cyan-500/5 mt-2">
                        <div className="flex items-center space-x-2">
                          {repo.language && (
                            <div className="flex items-center space-x-1">
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                repo.language === 'TypeScript' ? 'bg-cyan-400' :
                                repo.language === 'Python' ? 'bg-amber-400' :
                                repo.language === 'C++' ? 'bg-pink-500' : 'bg-emerald-400'
                              }`} />
                              <span className="text-slate-300">{repo.language}</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-0.5">
                            <Star className="w-3 h-3 text-yellow-500/80" />
                            <span>{repo.stargazers_count}</span>
                          </div>
                          <div className="flex items-center space-x-0.5">
                            <GitFork className="w-3 h-3 text-cyan-500/70" />
                            <span>{repo.forks_count}</span>
                          </div>
                        </div>

                        <div>
                          <span>UPDATED: {new Date(repo.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                    </CardGlass>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="activity"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full"
                >
                  
                  {/* Commits List */}
                  <CardGlass className="p-4" hoverGlow={false} glowColor="cyan">
                    <div className="flex items-center space-x-2 font-mono text-[10px] font-bold text-[#00E5FF] tracking-widest pb-2 border-b border-cyan-500/10 mb-2.5 select-none">
                      <GitCommit className="w-4 h-4 text-cyan-400" />
                      <span>RECENT SYSTEM COMMITS</span>
                    </div>

                    <div className="space-y-2 h-[175px] overflow-y-auto pr-1">
                      {commits.map((c, i) => (
                        <div key={c.sha + i} className="flex flex-col p-2 bg-cyan-950/10 border border-cyan-500/5 rounded hover:border-cyan-500/20 transition-all text-left">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="font-mono text-[9px] text-[#00E5FF] font-bold">REPC: {c.repo_name}</span>
                            <span className="font-mono text-[8px] text-gray-500 bg-black/40 px-1 rounded border border-cyan-500/5">{c.sha}</span>
                          </div>
                          <p className="text-[10px] text-slate-300 leading-snug line-clamp-1">{c.message}</p>
                          <span className="text-[8px] text-gray-600 font-mono self-end mt-1">
                            {new Date(c.created_at).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardGlass>

                  {/* Actions log */}
                  <CardGlass className="p-4" hoverGlow={false} glowColor="mint">
                    <div className="flex items-center space-x-2 font-mono text-[10px] font-bold text-[#64FFDA] tracking-widest pb-2 border-b border-cyan-500/10 mb-2.5 select-none">
                      <Activity className="w-4 h-4 text-emerald-400" />
                      <span>GATEWAY ENGINE FEED</span>
                    </div>

                    <div className="space-y-2 h-[175px] overflow-y-auto pr-1">
                      {activities.map((act) => (
                        <div key={act.id} className="flex items-start space-x-2 p-2 bg-emerald-950/5 border border-emerald-500/5 rounded hover:border-emerald-500/15 transition-all text-left">
                          <span className={`w-1.5 h-1.5 rounded-full mt-1.5 ${
                            act.type === 'PushEvent' ? 'bg-emerald-400' :
                            act.type === 'CreateEvent' ? 'bg-blue-400' :
                            act.type === 'WatchEvent' ? 'bg-yellow-400' : 'bg-pink-400'
                          }`} />
                          <div className="min-w-0 flex-1">
                            <div className="flex justify-between items-center text-[9px] font-mono">
                              <span className="text-[#64FFDA] font-bold truncate pr-2">{act.repo_name}</span>
                              <span className="text-[8px] text-gray-600 flex-shrink-0">
                                {new Date(act.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-0.5">{act.details}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardGlass>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Heat Calendar Row */}
          <CardGlass className="p-4" hoverGlow={false} glowColor="cyan">
            <div className="flex items-center justify-between pb-2 border-b border-cyan-500/10 mb-2.5">
              <div className="flex items-center space-x-2 font-mono text-[10px] font-bold text-cyan-400 tracking-widest select-none">
                <Calendar className="w-4 h-4" />
                <span>ACTIVE DEV_CYCLE CONTRIBUTIONS (20 WEEKS)</span>
              </div>
              <div className="flex items-center space-x-1.5 text-[8px] font-mono text-gray-500 select-none">
                <span>Less</span>
                <span className="w-2 h-2 rounded bg-slate-900 border border-cyan-950/20"></span>
                <span className="w-2 h-2 rounded bg-emerald-950 border border-emerald-500/10"></span>
                <span className="w-2 h-2 rounded bg-emerald-900 border border-emerald-500/20"></span>
                <span className="w-2 h-2 rounded bg-emerald-700 border border-[#64FFDA]/20"></span>
                <span className="w-2 h-2 rounded bg-emerald-500 border border-[#64FFDA]"></span>
                <span>More</span>
              </div>
            </div>

            {/* Grid display */}
            <div className="flex flex-col justify-center items-center">
              <div className="grid grid-flow-col grid-rows-7 gap-1 max-w-full overflow-x-auto p-1 bg-black/20 rounded-md border border-cyan-500/5 select-none self-stretch">
                {contributionData.map((cell) => (
                  <div
                    key={cell.day}
                    onMouseEnter={() => handleCellHover(cell.count)}
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-sm transition-all duration-300 hover:scale-125 cursor-pointer ${getCellBg(cell.colorLevel)}`}
                    title={`${cell.count} contribution(s) logged on system timeline`}
                  />
                ))}
              </div>
              <div className="flex justify-between w-full text-[8px] font-mono text-gray-600 mt-2 select-none px-2">
                <span>JANUARY 2026</span>
                <span>FEBRUARY</span>
                <span>MARCH</span>
                <span>APRIL</span>
                <span>MAY</span>
                <span>JUNE 2026</span>
              </div>
            </div>
          </CardGlass>

        </div>

      </div>

    </div>
  );
};
