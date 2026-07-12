import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, TrendingUp, CheckCircle } from 'lucide-react';

export default function MarketSection() {
  const [isMerged, setIsMerged] = useState(false);

  return (
    <div
      id="market-section"
      className="relative w-full min-h-screen flex flex-col justify-center items-center py-24 px-6 md:px-12 bg-bg-blu text-neutral-100 select-none overflow-hidden"
    >
      <div className="w-full max-w-5xl mx-auto space-y-16 text-center z-10">
        
        {/* Simple Oversized Header */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest text-brand-blu bg-brand-blu/10 border border-brand-blu/20 uppercase">
            The Market Opportunity
          </span>
          <h2 className="font-display text-4xl md:text-[68px] font-bold tracking-tighter text-white leading-[0.95] uppercase">
            An Unprecedented <br />
            Addressable Scale.
          </h2>
        </div>

        {/* Dynamic Circles Display */}
        <div className="relative h-[340px] w-full flex items-center justify-center">
          
          {!isMerged ? (
            <div className="relative w-full max-w-lg h-full flex justify-around items-center gap-6">
              
              {/* Billy Consumer TAM Circle */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-48 h-48 rounded-full bg-gradient-to-tr from-brand-core/10 to-brand-core/30 border border-brand-core flex flex-col items-center justify-center shadow-lg shadow-black/40 relative group cursor-pointer"
                onClick={() => setIsMerged(true)}
              >
                <span className="font-mono text-[9px] text-brand-core uppercase tracking-widest mb-1 font-bold">
                  Billy Consumer
                </span>
                <span className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">
                  $180B
                </span>
                <span className="font-sans text-[10px] text-neutral-400 mt-1">
                  Global TAM
                </span>
                {/* Floating tooltip hover effect */}
                <span className="absolute bottom-4 text-[8px] font-mono text-brand-core opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to Merge
                </span>
              </motion.div>

              {/* Billy BLU Enterprise TAM Circle */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-56 h-56 rounded-full bg-gradient-to-tr from-brand-blu/10 to-brand-blu/30 border border-brand-blu flex flex-col items-center justify-center shadow-lg shadow-black/40 relative group cursor-pointer"
                onClick={() => setIsMerged(true)}
              >
                <span className="font-mono text-[9px] text-brand-blu uppercase tracking-widest mb-1 font-bold">
                  Billy BLU Enterprise
                </span>
                <span className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">
                  $320B
                </span>
                <span className="font-sans text-[10px] text-neutral-400 mt-1">
                  Global TAM
                </span>
                <span className="absolute bottom-4 text-[8px] font-mono text-brand-blu opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to Merge
                </span>
              </motion.div>

            </div>
          ) : (
            // Merged super-cluster Circle
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
              className="w-72 h-72 md:w-80 md:h-80 rounded-full bg-gradient-to-tr from-brand-blu/20 via-blue-500/20 to-brand-core/10 border-2 border-brand-blu flex flex-col items-center justify-center shadow-2xl shadow-brand-blu/20 relative cursor-pointer"
              onClick={() => setIsMerged(false)}
            >
              {/* Internal pulsing glow overlay */}
              <div className="absolute inset-2 rounded-full border border-dashed border-brand-blu/30 animate-spin" style={{ animationDuration: '15s' }} />
              
              <span className="font-mono text-[10px] text-brand-blu uppercase tracking-widest mb-2 font-bold">
                Unified Ecosystem Opportunity
              </span>
              <span className="font-display text-5xl md:text-6xl font-bold text-white tracking-tight">
                $500B+
              </span>
              <span className="font-mono text-[10px] text-brand-core tracking-wider uppercase mt-3 font-bold">
                100% ADDRESSABLE SYNERGY
              </span>
              <span className="absolute bottom-6 text-[8px] font-mono text-neutral-400 hover:text-white">
                Click to Split
              </span>
            </motion.div>
          )}

        </div>

        {/* Trigger Controls & Value Prop */}
        <div className="space-y-4">
          <button
            onClick={() => setIsMerged(!isMerged)}
            className="px-6 py-2.5 rounded-full border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-xs font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer"
          >
            {isMerged ? 'View Segments' : 'Consolidate Ecosystem'}
          </button>
          
          <p className="font-sans text-xs md:text-sm text-neutral-400 font-light max-w-xl mx-auto leading-relaxed">
            By unifying personal assets and corporate operational caches, Billy represents a singular platform that captures the double-market addressable TAM.
          </p>
        </div>

      </div>
    </div>
  );
}
