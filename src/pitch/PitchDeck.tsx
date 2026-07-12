import React, { useState, useEffect, useMemo } from 'react';
import { Activity, X } from 'lucide-react';

import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import WhyNowSection from './components/WhyNowSection';
import LivingLedgerSection from './components/LivingLedgerSection';
import BillySection from './components/BillySection';
import TransformationSection from './components/TransformationSection';
import BillyBluSection from './components/BillyBluSection';
import MoatSection from './components/MoatSection';
import MarketSection from './components/MarketSection';
import BusinessModelSection from './components/BusinessModelSection';
import ProductExperienceSection from './components/ProductExperienceSection';
import CompetitionSection from './components/CompetitionSection';
import VisionSection from './components/VisionSection';
import AskSection from './components/AskSection';
import LoginGate from './components/LoginGate';

interface Section {
  id: string;
  name: string;
  component: React.ComponentType<any>;
}

interface PitchDeckProps {
  onClose?: () => void;
}

const AUTH_KEY = 'billy_pitch_auth';

export default function PitchDeck({ onClose }: PitchDeckProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
  });
  const [activeSection, setActiveSection] = useState<number>(0);
  const [isGlobalBlu, setIsGlobalBlu] = useState<boolean>(false);

  const sections: Section[] = useMemo(
    () => [
      { id: 'hero-section', name: '01 / HERO', component: HeroSection },
      { id: 'problem-section', name: '02 / THE PROBLEM', component: ProblemSection },
      { id: 'whynow-section', name: '03 / WHY NOW', component: WhyNowSection },
      { id: 'livingledger-section', name: '04 / THE LEDGER', component: LivingLedgerSection },
      { id: 'billy-section', name: '05 / BILLY', component: BillySection },
      { id: 'transformation-section', name: '06 / THE EVOLUTION', component: TransformationSection },
      { id: 'billyblu-section', name: '07 / BILLY BLU', component: BillyBluSection },
      { id: 'moat-section', name: '08 / THE MOAT', component: MoatSection },
      { id: 'market-section', name: '09 / THE MARKET', component: MarketSection },
      { id: 'businessmodel-section', name: '10 / MONETIZATION', component: BusinessModelSection },
      { id: 'productexperience-section', name: '11 / INTERFACES', component: ProductExperienceSection },
      { id: 'competition-section', name: '12 / LANDSCAPE', component: CompetitionSection },
      { id: 'vision-section', name: '13 / THE VISION', component: VisionSection },
      { id: 'ask-section', name: '14 / THE OFFER', component: AskSection },
    ],
    [],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Intersection Observer to track scroll coordinates
  useEffect(() => {
    if (!isAuthenticated) return;

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const index = sections.findIndex((s) => s.id === id);
          if (index !== -1) {
            setActiveSection(index);
            setIsGlobalBlu(index >= 6);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections, isAuthenticated]);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBegin = () => {
    scrollToSection('problem-section');
  };

  if (!isAuthenticated) {
    return (
      <div className="relative min-h-screen">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="fixed top-4 right-4 z-[10000] font-mono text-[9px] uppercase tracking-widest text-neutral-500 hover:text-white px-2.5 py-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-sm cursor-pointer"
          >
            Exit
          </button>
        )}
        <LoginGate
          onUnlock={() => {
            setIsAuthenticated(true);
            sessionStorage.setItem(AUTH_KEY, 'true');
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen relative transition-colors duration-[1500ms] ease-in-out ${
        isGlobalBlu ? 'bg-bg-blu text-neutral-100' : 'bg-bg-core text-neutral-900'
      }`}
    >
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="fixed top-4 left-4 z-50 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-neutral-500 hover:text-neutral-900 dark:hover:text-white px-2.5 py-1.5 rounded-full border border-neutral-300/40 bg-white/70 backdrop-blur-md cursor-pointer"
          style={{
            color: isGlobalBlu ? '#94a3b8' : '#64748b',
            background: isGlobalBlu ? 'rgba(5,10,26,0.75)' : 'rgba(255,255,255,0.75)',
            borderColor: isGlobalBlu ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
          }}
        >
          <X className="w-3 h-3" /> Site
        </button>
      )}
      {/* Floating Global Progress Sidebar */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3 hidden md:flex">
        <span className="font-mono text-[8px] text-neutral-400 rotate-90 mb-4 tracking-widest">
          PROGRESS
        </span>
        <div className="w-[1px] h-32 bg-neutral-300/40 relative">
          {/* Active coordinate line indicator */}
          <div
            className="absolute top-0 w-[1px] transition-all duration-500"
            style={{
              height: `${(activeSection / (sections.length - 1)) * 100}%`,
              backgroundColor: isGlobalBlu ? '#00F0FF' : '#10B981',
            }}
          />
        </div>

        {/* 14 Dot Indicators */}
        <div className="flex flex-col gap-2 mt-4">
          {sections.map((sec, idx) => {
            const isActive = activeSection === idx;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className="group relative flex items-center justify-center p-1"
                aria-label={sec.name}
              >
                {/* Glow Ring */}
                <div
                  className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 ${
                    isActive
                      ? isGlobalBlu
                        ? 'bg-brand-blu border-brand-blu scale-125 shadow-lg shadow-brand-blu/50'
                        : 'bg-neutral-900 border-neutral-900 scale-125 shadow-lg shadow-brand-core/80 ring-2 ring-brand-core/60'
                      : 'bg-transparent border-neutral-400/40 hover:border-neutral-400'
                  }`}
                />
                
                {/* Floating slide name tooltip on hover */}
                <span className="absolute right-6 scale-0 group-hover:scale-100 transition-all duration-200 origin-right font-mono text-[9px] bg-neutral-900 text-white px-2.5 py-1 rounded-md border border-neutral-800 whitespace-nowrap">
                  {sec.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary Keynote Sections Stack */}
      <main className="w-full">
        {sections.map((sec) => {
          const Component = sec.component;
          return (
            <section key={sec.id} id={sec.id} className="min-h-screen w-full">
              {sec.id === 'hero-section' ? (
                <Component onBegin={handleBegin} />
              ) : sec.id === 'transformation-section' ? (
                <Component onEvolutionComplete={setIsGlobalBlu} />
              ) : (
                <Component />
              )}
            </section>
          );
        })}
      </main>

      {/* Floating Status Indicator */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3 bg-[#050A1A]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-neutral-800 shadow-xl select-none">
        <Activity className={`w-3.5 h-3.5 animate-pulse ${isGlobalBlu ? 'text-brand-blu' : 'text-brand-core'}`} />
        <span className="font-mono text-[9px] text-neutral-300 tracking-wider">
          BILLY SECURE CONNECTION // <span className="text-white font-medium">{isGlobalBlu ? 'BLU MODE' : 'CORE MODE'}</span>
        </span>
        <div className="w-[1px] h-3 bg-neutral-800" />
        <button
          onClick={() => {
            setIsAuthenticated(false);
            sessionStorage.removeItem(AUTH_KEY);
          }}
          className="font-mono text-[8px] text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest cursor-pointer px-1"
          title="Securely Lock Ledger Deck"
        >
          LOCK
        </button>
      </div>
    </div>
  );
}
