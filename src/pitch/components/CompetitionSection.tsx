import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowUpRight, HelpCircle } from 'lucide-react';

export default function CompetitionSection() {
  const competitorIslands = [
    { name: 'Mint / YNAB', x: '18%', y: '82%', desc: 'Isolated Consumer trackers.' },
    { name: 'Salesforce', x: '25%', y: '40%', desc: 'Enterprise isolated CRM record.' },
    { name: 'SAP / Oracle', x: '35%', y: '25%', desc: 'Static database records.' },
    { name: 'Zoho', x: '42%', y: '50%', desc: 'Standard business suite.' },
  ];

  return (
    <div
      id="competition-section"
      className="relative w-full min-h-screen flex flex-col justify-center items-center py-24 px-6 md:px-12 bg-bg-blu text-neutral-100 select-none overflow-hidden"
    >
      <div className="w-full max-w-5xl mx-auto space-y-16">
        
        {/* Positioning Map Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest text-brand-blu bg-brand-blu/10 border border-brand-blu/20 uppercase">
            The Positioning Map
          </span>
          <h2 className="font-display text-4xl md:text-[68px] font-bold tracking-tighter text-white leading-[0.95] uppercase">
            Software Records. <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blu via-blue-500 to-brand-core font-bold">
              Billy Thinks.
            </span>
          </h2>
          <p className="font-sans text-md md:text-lg text-neutral-400 font-light">
            Every other piece of software was built to register data. Billy was built to understand it and act.
          </p>
        </div>

        {/* Minimalist 2D Cartesian positioning plot */}
        <div className="relative border border-brand-blu/15 bg-[#060c21]/40 rounded-3xl p-8 md:p-12 min-h-[480px] flex flex-col justify-between shadow-2xl overflow-hidden">
          
          {/* Axis Grid Lines */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            {/* X-Axis */}
            <div className="w-full h-[1px] bg-neutral-800/50 relative">
              <span className="absolute right-4 -top-6 font-mono text-[9px] text-neutral-500 uppercase tracking-widest">
                Cognitive Active Engine ➔
              </span>
              <span className="absolute left-4 -top-6 font-mono text-[9px] text-neutral-500 uppercase tracking-widest">
                l— Passive Logging Sinks
              </span>
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            {/* Y-Axis */}
            <div className="h-full w-[1px] bg-neutral-800/50 relative">
              <span className="absolute top-4 left-4 font-mono text-[9px] text-neutral-500 uppercase tracking-widest block whitespace-nowrap">
                ▲ Fully Harmonized (Unified System)
              </span>
              <span className="absolute bottom-4 left-4 font-mono text-[9px] text-neutral-500 uppercase tracking-widest block whitespace-nowrap">
                ▼ Isolated Sinks (Silos)
              </span>
            </div>
          </div>

          {/* Interactive Plot Coordinates */}
          <div className="relative w-full h-[320px] z-10">
            
            {/* Competitor Nodes */}
            {competitorIslands.map((comp) => (
              <motion.div
                key={comp.name}
                style={{ left: comp.x, top: comp.y }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 bg-neutral-900 border border-neutral-800 p-3 rounded-xl flex flex-col items-center hover:border-neutral-700 transition-colors cursor-help max-w-[140px] text-center"
              >
                <span className="font-display font-medium text-xs text-neutral-400">
                  {comp.name}
                </span>
                <span className="font-sans text-[9px] text-neutral-500 font-light mt-1 leading-tight">
                  {comp.desc}
                </span>
              </motion.div>
            ))}

            {/* BILLY Dominant Apex Node (Fully Harmonized, Cognitive Active) */}
            <motion.div
              style={{ left: '78%', top: '22%' }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: 1,
              }}
              transition={{
                scale: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
                opacity: { duration: 0.8 },
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-cyan-950 via-blue-950 to-[#0c2a26] border-2 border-brand-blu p-5 rounded-2xl flex flex-col items-center shadow-2xl shadow-brand-blu/20 max-w-[180px] text-center"
            >
              <div className="flex items-center gap-1 mb-1.5">
                <Sparkles className="w-4 h-4 text-brand-blu animate-pulse" />
                <span className="font-mono text-[9px] text-brand-blu font-bold uppercase tracking-widest">
                  Cognitive Apex
                </span>
              </div>
              <span className="font-display font-bold text-white text-md">
                BILLY (The Ledger)
              </span>
              <p className="font-sans text-[10px] text-neutral-300 font-light mt-1.5 leading-snug">
                One intelligence layer managing transactions, compliance & operational cycles autonomously.
              </p>
              {/* Pulsing glow indicator rings */}
              <div className="absolute inset-0 rounded-2xl border border-dashed border-brand-blu/20 animate-ping pointer-events-none" style={{ animationDuration: '4s' }} />
            </motion.div>

          </div>

          {/* Positioning Summary Statement */}
          <div className="z-10 w-full flex justify-between items-center text-[10px] font-mono text-neutral-500 border-t border-neutral-800 pt-4">
            <span>MODEL: COGNITIVE LEDGER LANDSCAPE</span>
            <span>DATA SOURCE: INTERNAL AUDITING 2026</span>
          </div>

        </div>

      </div>
    </div>
  );
}
