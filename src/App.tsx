import React, { useState, useRef, useEffect } from 'react';
import { ThreeBackground } from './components/ThreeBackground';
import { SidebarConsole } from './components/SidebarConsole';
import { SceneArrival } from './components/SceneArrival';
import { SceneAbout } from './components/SceneAbout';
import { SceneSkills } from './components/SceneSkills';
import { SceneEducation } from './components/SceneEducation';
import { SceneProjects } from './components/SceneProjects';
import { SceneGitHub } from './components/SceneGitHub';
import { SceneEntrepreneur } from './components/SceneEntrepreneur';
import { SceneAchievements } from './components/SceneAchievements';
import { SceneContact } from './components/SceneContact';
import { audioEngine } from './components/AudioEngine';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Synchronize scrolling with DOM client heights to extract active scene and interpolation progress
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, clientHeight } = containerRef.current;
    
    if (clientHeight === 0) return;

    const currentFloat = scrollTop / clientHeight;
    const activeIdx = Math.floor(currentFloat);
    const progress = currentFloat - activeIdx;

    const sceneNum = Math.min(Math.max(activeIdx + 1, 1), 9);

    setActiveScene(sceneNum);
    setScrollProgress(progress);
  };

  const handleSceneSelect = (sceneNum: number) => {
    if (!containerRef.current) return;
    const { clientHeight } = containerRef.current;
    
    containerRef.current.scrollTo({
      top: (sceneNum - 1) * clientHeight,
      behavior: 'smooth'
    });
  };

  const handleNextScene = () => {
    if (activeScene < 9) {
      handleSceneSelect(activeScene + 1);
    }
  };

  // Add passive listener to scroll container
  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      if (el) {
        el.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden font-sans text-slate-100">
      
      {/* 3D Cinematic Background Canvas */}
      <ThreeBackground activeScene={activeScene} scrollProgress={scrollProgress} />

      {/* Cyber Grid Subtle Overlay (Cinema Screen Matrix) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.45)_100%)] pointer-events-none z-10" />

      {/* Sidebar Console Control HUD */}
      <SidebarConsole activeScene={activeScene} onSceneSelect={handleSceneSelect} />

      {/* Cinematic Scrolling Canvas Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 h-full w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth z-20"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        
        {/* Scene 1: Arrival */}
        <section className="w-full h-screen snap-start shrink-0 flex items-center justify-center lg:pl-84">
          <SceneArrival onNext={handleNextScene} />
        </section>

        {/* Scene 2: About Me */}
        <section className="w-full h-screen snap-start shrink-0 flex items-center justify-center lg:pl-84">
          <SceneAbout onNext={handleNextScene} />
        </section>

        {/* Scene 3: Skills Galaxy */}
        <section className="w-full h-screen snap-start shrink-0 flex items-center justify-center lg:pl-84">
          <SceneSkills onNext={handleNextScene} />
        </section>

        {/* Scene 4: Education Journey Tunnel */}
        <section className="w-full h-screen snap-start shrink-0 flex items-center justify-center lg:pl-84">
          <SceneEducation onNext={handleNextScene} />
        </section>

        {/* Scene 5: Projects Command Center */}
        <section className="w-full h-screen snap-start shrink-0 flex items-center justify-center lg:pl-84">
          <SceneProjects onNext={handleNextScene} />
        </section>

        {/* Scene 6: GitHub Command Center */}
        <section className="w-full h-screen snap-start shrink-0 flex items-center justify-center lg:pl-84">
          <SceneGitHub />
        </section>

        {/* Scene 7: Entrepreneur Business District */}
        <section className="w-full h-screen snap-start shrink-0 flex items-center justify-center lg:pl-84">
          <SceneEntrepreneur onNext={handleNextScene} />
        </section>

        {/* Scene 7: Achievements Hall */}
        <section className="w-full h-screen snap-start shrink-0 flex items-center justify-center lg:pl-84">
          <SceneAchievements onNext={handleNextScene} />
        </section>

        {/* Scene 8: Contact Station */}
        <section className="w-full h-screen snap-start shrink-0 flex items-center justify-center lg:pl-84">
          <SceneContact />
        </section>

      </div>
    </div>
  );
}
