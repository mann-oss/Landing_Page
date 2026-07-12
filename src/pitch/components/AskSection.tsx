import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Trophy, CheckSquare, ShieldCheck, Target } from 'lucide-react';

export default function AskSection() {
  const [activeAlloc, setActiveAlloc] = useState<number | null>(null);
  const [visibleMilestones, setVisibleMilestones] = useState<number[]>([]);

  const allocations = [
    { name: 'AI & Cognitive Models', percentage: 35, color: '#00F0FF', offset: 0 },
    { name: 'Core Infrastructure & Eng', percentage: 30, color: '#3b82f6', offset: 35 },
    { name: 'Go-To-Market & Growth', percentage: 20, color: '#10B981', offset: 65 },
    { name: 'Global Compliance & Ops', percentage: 15, color: '#E1E7EC', offset: 85 },
  ];

  const milestones = [
    { title: '100K Active Users', desc: 'Accelerating individual peer ledger networks.' },
    { title: '1,000 Synced Entities', desc: 'Corporate treasury operations automated.' },
    { title: 'AI Agent Marketplace', desc: 'Dynamic financial developer plugins live.' },
    { title: 'Global Enterprise Launch', desc: 'Syncing multi-entity cross-border ledgers.' },
  ];

  // Sequence load milestones
  useEffect(() => {
    milestones.forEach((_, idx) => {
      setTimeout(() => {
        setVisibleMilestones((prev) => [...prev, idx]);
      }, 500 + idx * 400);
    });
  }, []);

  return (
    <div
      id="ask-section"
      className="relative w-full min-h-screen flex flex-col justify-center items-center py-24 px-6 md:px-12 bg-bg-blu text-neutral-100 select-none overflow-hidden"
    >
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Capital & Milestones */}
        <div className="lg:col-span-6 space-y-10 text-left">
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest text-brand-blu bg-brand-blu/10 border border-brand-blu/20 uppercase">
              Investment Offering
            </span>
            <h2 className="font-display text-4xl md:text-[68px] font-bold tracking-tighter text-white leading-[0.95] uppercase">
              Raising <br />
              ₹8 Crore Seed.
            </h2>
            <p className="font-sans text-md text-neutral-400 font-light mt-4">
              We are seeking strategic capital partners to scale the intelligence model, secure compliance licensing, and accelerate market penetration.
            </p>
          </div>

          {/* Sequential Milestones */}
          <div className="space-y-4">
            <span className="font-mono text-[9px] text-neutral-500 tracking-wider uppercase block">
              POST-SEED GROWTH MILESTONES
            </span>
            <div className="space-y-3">
              {milestones.map((ms, idx) => {
                const isVisible = visibleMilestones.includes(idx);
                return (
                  <div
                    key={ms.title}
                    className={`p-4 rounded-xl border border-neutral-900 bg-neutral-950/40 flex items-start gap-3.5 transition-all duration-700 ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                  >
                    <div className="p-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-brand-blu shrink-0 mt-0.5">
                      <Target className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-display font-bold text-xs text-white">{ms.title}</h4>
                      <p className="font-sans text-[11px] text-neutral-400 font-light">{ms.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Allocation Wheel */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 bg-neutral-950/40 border border-brand-blu/15 rounded-3xl relative min-h-[400px]">
          <span className="absolute top-4 left-6 px-4 py-1 rounded-full bg-cyan-950 text-[10px] font-mono tracking-widest text-brand-blu border border-brand-blu/20 uppercase">
            Allocations
          </span>

          {/* High Fidelity SVG Donut Chart */}
          <div className="relative w-56 h-56 flex items-center justify-center mt-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 42 42">
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#171717" strokeWidth="4.2" />
              
              {allocations.map((alloc, idx) => {
                const circumference = 100;
                const dashArray = `${alloc.percentage} ${circumference - alloc.percentage}`;
                const dashOffset = 100 - alloc.offset;
                const isHovered = activeAlloc === idx;
                return (
                  <circle
                    key={alloc.name}
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke={alloc.color}
                    strokeWidth={isHovered ? '5.2' : '4.2'}
                    strokeDasharray={dashArray}
                    strokeDashoffset={dashOffset}
                    className="transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setActiveAlloc(idx)}
                    onMouseLeave={() => setActiveAlloc(null)}
                  />
                );
              })}
            </svg>

            {/* Inner text values */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
              {activeAlloc !== null ? (
                <>
                  <span className="font-display text-2xl font-bold text-white">
                    {allocations[activeAlloc].percentage}%
                  </span>
                  <span className="font-mono text-[8px] text-neutral-400 uppercase tracking-wider max-w-[100px] mt-1 leading-tight font-bold">
                    {allocations[activeAlloc].name}
                  </span>
                </>
              ) : (
                <>
                  <span className="font-display text-lg font-bold text-white">₹8 Crore</span>
                  <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest mt-1">
                    USE OF FUNDS
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Allocation Legends */}
          <div className="w-full grid grid-cols-2 gap-3 mt-8">
            {allocations.map((alloc, idx) => (
              <div
                key={alloc.name}
                onMouseEnter={() => setActiveAlloc(idx)}
                onMouseLeave={() => setActiveAlloc(null)}
                className={`p-2 rounded-xl transition-all border flex items-center gap-2 cursor-help ${
                  activeAlloc === idx ? 'bg-neutral-900 border-neutral-700' : 'border-transparent'
                }`}
              >
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: alloc.color }} />
                <span className="font-sans text-[10px] text-neutral-300 font-light truncate">
                  {alloc.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Grand Ending Core Statement */}
      <div className="w-full max-w-3xl mx-auto text-center pt-24 space-y-12 border-t border-neutral-900 mt-20">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="font-display text-lg md:text-2xl text-neutral-300 font-light leading-relaxed px-4 italic"
        >
          "We're not building another app. <br />
          We're building the intelligence layer for the future of work and finance."
        </motion.p>

        {/* Closing Logo Monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="pt-4 flex flex-col items-center gap-3"
        >
          <span className="font-display font-bold tracking-wider text-2xl text-white">
            BILLY<span className="text-brand-blu">.</span>
          </span>
          <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest font-bold">
            THE LIVING LEDGER
          </span>
        </motion.div>
      </div>
    </div>
  );
}
