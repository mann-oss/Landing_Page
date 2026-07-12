import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Network, HelpCircle, Lock, ArrowUpRight, Cpu, Plus, Sparkles, RefreshCw } from 'lucide-react';

export default function MoatSection() {
  const [synapseCount, setSynapseCount] = useState(148);
  const [activeConcept, setActiveConcept] = useState<string>('Learning');

  const concepts = [
    {
      name: 'Learning',
      desc: 'Siphons raw banking and operations data instantly to fine-tune organizational behavior indices.',
    },
    {
      name: 'Prediction',
      desc: 'Identifies cash flow patterns and warns departments of impending treasury challenges months out.',
    },
    {
      name: 'Automation',
      desc: 'Orchestrates sweeping tasks, ledger reconciliation, and contract billing without manual keystrokes.',
    },
    {
      name: 'Reasoning',
      desc: 'Evaluates capital efficiency parameters to recommend expansion or hiring timings.',
    },
    {
      name: 'Decision Making',
      desc: 'Fulfills payments and issues invoices autonomously as compliance guidelines are satisfied.',
    },
  ];

  const stimulateNetwork = () => {
    setSynapseCount((prev) => prev + Math.floor(Math.random() * 8) + 4);
  };

  return (
    <div
      id="moat-section"
      className="relative w-full min-h-screen flex flex-col justify-center items-center py-24 px-6 md:px-12 bg-bg-blu text-neutral-100 select-none overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto space-y-16">
        
        {/* Contrast Title Block */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest text-brand-blu bg-brand-blu/10 border border-brand-blu/20 uppercase">
            Our Core Moat
          </span>
          <h2 className="font-display text-4xl md:text-[68px] font-bold tracking-tighter text-white leading-[0.95] uppercase">
            Software Records. <br className="hidden md:inline"/>
            Billy Thinks.
          </h2>
          <p className="font-sans text-md md:text-lg text-neutral-400 font-light">
            Traditional software models act as passive databases. Billy BLU acts as an active, self-correcting neural system.
          </p>
        </div>

        {/* Parallel Architectural Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Traditional SaaS Isolated Block Box */}
          <div className="border border-neutral-800/60 bg-[#060c21]/20 rounded-3xl p-8 relative flex flex-col justify-between min-h-[400px]">
            <div>
              <span className="absolute -top-3 left-8 px-4 py-1 rounded-full bg-neutral-900 text-[10px] font-mono tracking-widest text-neutral-500 border border-neutral-800 uppercase">
                Traditional SaaS Framework
              </span>
              <p className="font-mono text-xs text-neutral-500 mt-4 uppercase tracking-widest mb-6">
                ISOLATED DATABASES
              </p>

              {/* Box grid representing legacy software */}
              <div className="grid grid-cols-2 gap-4">
                {['Salesforce', 'SAP', 'QuickBooks', 'Workday'].map((saas) => (
                  <div
                    key={saas}
                    className="p-5 rounded-2xl bg-neutral-950 border border-neutral-900 flex flex-col justify-between gap-4 h-28"
                  >
                    <span className="font-display font-medium text-neutral-400 text-sm">{saas}</span>
                    <span className="font-mono text-[9px] text-rose-500 bg-rose-950/30 px-2.5 py-1 rounded-lg border border-rose-900/40 w-fit">
                      Isolated State
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="font-sans text-xs text-neutral-500 mt-6 leading-relaxed font-light">
              Requires manual API maintenance, expensive CSV batch-reconciliations, and constant human oversight.
            </p>
          </div>

          {/* Billy Neural Network Active System */}
          <div className="border border-brand-blu/15 bg-[#060c21]/60 rounded-3xl p-8 relative flex flex-col justify-between min-h-[400px] shadow-2xl">
            <span className="absolute -top-3 left-8 px-4 py-1 rounded-full bg-cyan-950 text-[10px] font-mono tracking-widest text-brand-blu border border-brand-blu/20 uppercase">
              Billy BLU Framework
            </span>

            <div className="space-y-4">
              <div className="flex justify-between items-center mt-2">
                <p className="font-mono text-xs text-brand-blu uppercase tracking-widest">
                  Active Neural Lattice
                </p>
                <div className="font-mono text-[10px] text-neutral-400 bg-cyan-950 px-2.5 py-1 rounded-lg border border-cyan-800/30">
                  Synapses: <span className="text-brand-blu font-semibold">{synapseCount}</span>
                </div>
              </div>

              {/* Interactive Neural map selector tabs */}
              <div className="flex flex-wrap gap-2 pt-2">
                {concepts.map((concept) => (
                  <button
                    key={concept.name}
                    onClick={() => {
                      setActiveConcept(concept.name);
                      stimulateNetwork();
                    }}
                    className={`px-3 py-1.5 rounded-full font-mono text-[10px] uppercase border transition-all duration-300 cursor-pointer ${
                      activeConcept === concept.name
                        ? 'bg-brand-blu text-neutral-950 border-brand-blu font-bold'
                        : 'bg-[#080f2d] text-neutral-400 border-neutral-800 hover:text-white'
                    }`}
                  >
                    {concept.name}
                  </button>
                ))}
              </div>

              {/* Dynamic explanation block representing cognitive network action */}
              <div className="p-4 rounded-xl bg-[#091238] border border-brand-blu/15 min-h-[80px] flex items-center justify-between gap-4">
                <p className="font-sans text-xs text-brand-blu font-light leading-relaxed">
                  {concepts.find((c) => c.name === activeConcept)?.desc}
                </p>
                <div className="p-2 bg-brand-blu rounded-full text-neutral-950 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Stimulate synapse action panel */}
            <div className="pt-6 border-t border-neutral-800/80 mt-4 flex items-center justify-between">
              <span className="font-mono text-[9px] text-neutral-400">
                Every transaction expands connections
              </span>
              <button
                onClick={stimulateNetwork}
                className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-cyan-950 hover:bg-cyan-900 border border-brand-blu/30 text-brand-blu text-xs font-mono tracking-wider uppercase transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <Plus className="w-4.5 h-4.5 group-hover:rotate-90 transition-transform" /> Stimulate Synapse
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
