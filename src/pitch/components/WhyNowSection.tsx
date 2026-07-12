import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { Cloud, Smartphone, Brain, Zap, Sparkles } from 'lucide-react';

interface Era {
  id: string;
  name: string;
  year: string;
  icon: React.ComponentType<any>;
  description: string;
  accent: string;
  bg: string;
}

export default function WhyNowSection() {
  const [selectedEra, setSelectedEra] = useState<number>(4); // default to Billy!
  const [internetUsers, setInternetUsers] = useState(0);
  const [smes, setSmes] = useState(0);
  const [aiAdoption, setAiAdoption] = useState(0);

  const eras: Era[] = [
    {
      id: 'cloud',
      name: 'Cloud Computing',
      year: '2006',
      icon: Cloud,
      description: 'Distributed infrastructure shifts hardware costs to operational variables. The ledger enters the internet.',
      accent: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      id: 'mobile',
      name: 'Mobile Paradigm',
      year: '2010',
      icon: Smartphone,
      description: 'Instant continuous access. Computing fits in every pocket. Transactions become immediate.',
      accent: 'text-indigo-500',
      bg: 'bg-indigo-50',
    },
    {
      id: 'ai',
      name: 'Generative AI',
      year: '2022',
      icon: Brain,
      description: 'Unstructured data can now be processed and structured in human-like comprehension scales.',
      accent: 'text-violet-500',
      bg: 'bg-violet-50',
    },
    {
      id: 'agentic',
      name: 'Agentic Actions',
      year: '2024',
      icon: Zap,
      description: 'No longer just answering prompts. AI is empowered to execute transactions, retrieve APIs, and execute logic autonomously.',
      accent: 'text-amber-500',
      bg: 'bg-amber-50',
    },
    {
      id: 'billy',
      name: 'Billy',
      year: '2026',
      icon: Sparkles,
      description: 'The complete convergence. Every business operational flow and person’s financial engine merged into a single Living Ledger.',
      accent: 'text-lime-600',
      bg: 'bg-lime-50',
    },
  ];

  // Upward counting statistics
  useEffect(() => {
    // 806M+ Internet Users
    let count1 = 0;
    const interval1 = setInterval(() => {
      count1 += 13;
      if (count1 >= 806) {
        setInternetUsers(806);
        clearInterval(interval1);
      } else {
        setInternetUsers(count1);
      }
    }, 15);

    // 40M+ SME Platforms
    let count2 = 0;
    const interval2 = setInterval(() => {
      count2 += 1;
      if (count2 >= 42) {
        setSmes(42);
        clearInterval(interval2);
      } else {
        setSmes(count2);
      }
    }, 30);

    // 92% AI Adoption index
    let count3 = 0;
    const interval3 = setInterval(() => {
      count3 += 2;
      if (count3 >= 92) {
        setAiAdoption(92);
        clearInterval(interval3);
      } else {
        setAiAdoption(count3);
      }
    }, 25);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  }, []);

  return (
    <div
      id="whynow-section"
      className="relative w-full min-h-screen flex flex-col justify-center items-center py-20 px-6 md:px-12 select-none"
    >
      <div className="w-full max-w-6xl mx-auto space-y-16">
        
        {/* Header Block */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest text-neutral-800 bg-brand-core border border-neutral-900/10 uppercase">
            The Historical Shift
          </span>
          <h2 className="font-display text-4xl md:text-[68px] font-bold tracking-tighter text-neutral-950 leading-[0.95] uppercase">
            The Epoch of <br />
            Intelligence.
          </h2>
          <p className="font-sans text-md md:text-lg text-neutral-500 font-light max-w-2xl mx-auto">
            Each paradigm shift unlocked data capability. The current convergence enables a ledger that does more than count—it thinks.
          </p>
        </div>

        {/* Chronological Grid Slider */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            
            {/* Timeline connection connector bar */}
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-neutral-200 -translate-y-1/2 hidden md:block z-0" />

            {eras.map((era, index) => {
              const Icon = era.icon;
              const isActive = selectedEra === index;
              return (
                <button
                  key={era.id}
                  onClick={() => setSelectedEra(index)}
                  className={`z-10 text-left p-6 rounded-2xl transition-all duration-500 border ${
                    isActive
                      ? 'bg-white border-neutral-950 shadow-xl scale-105 ring-2 ring-brand-core'
                      : 'bg-white/40 hover:bg-white/80 border-neutral-200/50'
                  }`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-mono text-xs text-neutral-400 font-semibold">
                      {era.year}
                    </span>
                    <div className={`p-2 rounded-xl ${isActive ? 'bg-brand-core/30 text-neutral-950' : 'bg-neutral-100'}`}>
                      <Icon className={`w-5 h-5 ${isActive ? 'text-neutral-900' : 'text-neutral-500'}`} />
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-neutral-900 text-sm uppercase tracking-tight">
                    {era.name}
                  </h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-brand-core to-transparent mt-2 rounded-full" />
                </button>
              );
            })}
          </div>

          {/* Description of current selected era */}
          <div className="bg-white/50 backdrop-blur-sm border border-neutral-200/50 p-8 rounded-3xl max-w-3xl mx-auto text-center min-h-[140px] flex flex-col justify-center items-center">
            <h4 className="font-display font-semibold text-lg text-neutral-800 mb-2">
              {eras[selectedEra].name} ({eras[selectedEra].year})
            </h4>
            <p className="font-sans text-sm md:text-md text-neutral-500 leading-relaxed max-w-2xl font-light">
              {eras[selectedEra].description}
            </p>
          </div>
        </div>

        {/* Upward counting statistics block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          
          <div className="text-center p-8 bg-neutral-50/50 rounded-2xl border border-neutral-100 flex flex-col justify-center items-center">
            <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-2">
              Expanding Connectivity
            </span>
            <div className="font-display text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight flex items-baseline justify-center gap-1">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-800 to-neutral-950 font-semibold">
                {internetUsers}M+
              </span>
            </div>
            <p className="font-sans text-xs text-neutral-500 mt-2">
              Active Internet Users globally ready for ambient integrations.
            </p>
          </div>

          <div className="text-center p-8 bg-neutral-50/50 rounded-2xl border border-neutral-100 flex flex-col justify-center items-center">
            <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-2">
              SME Ecosystem Growth
            </span>
            <div className="font-display text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight flex items-baseline justify-center gap-1">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-800 to-neutral-950 font-semibold">
                {smes}M+
              </span>
            </div>
            <p className="font-sans text-xs text-neutral-500 mt-2">
              Small-to-medium enterprise portals requiring real-time ledger orchestration.
            </p>
          </div>

          <div className="text-center p-8 bg-neutral-50/50 rounded-2xl border border-neutral-100 flex flex-col justify-center items-center">
            <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-2">
              Enterprise Integration Rate
            </span>
            <div className="font-display text-4xl md:text-5xl font-bold text-neutral-900 tracking-tight flex items-baseline justify-center gap-1">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-800 to-neutral-950 font-semibold">
                {aiAdoption}%
              </span>
            </div>
            <p className="font-sans text-xs text-neutral-500 mt-2">
              Projected Agentic AI adoption in system-level operations.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
