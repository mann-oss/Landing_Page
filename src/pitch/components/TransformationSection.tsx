import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Sun, Moon } from 'lucide-react';

interface TransformationProps {
  onEvolutionComplete: (isBlu: boolean) => void;
}

export default function TransformationSection({ onEvolutionComplete }: TransformationProps) {
  const [evolutionStep, setEvolutionStep] = useState<number>(0); // 0: Consumer, 1: Multi-Node, 2: Cityscape, 3: BLU Era
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto transition steps to engage user or trigger on action
  const triggerEvolution = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Step 1: Dispersing to multiple nodes
    setTimeout(() => {
      setEvolutionStep(1);
    }, 800);

    // Step 2: Cityscape expansion
    setTimeout(() => {
      setEvolutionStep(2);
    }, 1800);

    // Step 3: Global Midnight Blue Transformation
    setTimeout(() => {
      setEvolutionStep(3);
      onEvolutionComplete(true); // notify parent layout to transition global state/colors
      setIsAnimating(false);
    }, 3200);
  };

  const resetEvolution = () => {
    setEvolutionStep(0);
    onEvolutionComplete(false);
  };

  return (
    <div
      id="transformation-section"
      className={`relative w-full min-h-screen flex flex-col justify-center items-center py-24 px-6 md:px-12 select-none transition-all duration-[2000ms] ease-in-out ${
        evolutionStep === 3
          ? 'bg-bg-blu text-white'
          : 'bg-bg-core text-neutral-900'
      }`}
    >
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left: Narrative explanation */}
        <div className="lg:col-span-5 space-y-8 text-left">
          <span className="font-mono text-xs tracking-widest font-bold uppercase">
            {evolutionStep === 3 ? (
              <span className="inline-block px-3 py-1 rounded-full text-[10px] text-brand-blu bg-brand-blu/10 border border-brand-blu/20 uppercase">
                Phase II: Billy BLU Active
              </span>
            ) : (
              <span className="inline-block px-3 py-1 rounded-full text-[10px] text-neutral-800 bg-brand-core border border-neutral-900/10 uppercase">
                Phase I: Single Intelligence
              </span>
            )}
          </span>

          <h2 className="font-display text-4xl md:text-[68px] font-bold tracking-tighter uppercase leading-[0.95]">
            Two Product<br />
            Suites.
          </h2>

          <p className="font-sans text-md md:text-lg text-neutral-500 font-light leading-relaxed min-h-[120px]">
            {evolutionStep === 0 && 'Suite A unifies your individual financial world. The Living Ledger aggregates personal assets, sweeps savings, and acts as your private financial companion.'}
            {evolutionStep === 1 && 'Scaling up. While the consumer ledger remains strictly private and separate, we replicate its zero-latency sync architecture across wider networks.'}
            {evolutionStep === 2 && 'Pivoting to the enterprise. Businesses require a completely different, highly compliant framework to orchestrate corporate capital flows.'}
            {evolutionStep === 3 && 'Presenting Suite B: Billy BLU. A separate, high-capacity corporate operating system engineered from the ground up for business compliance, ledger cycles, and team accounts.'}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            {evolutionStep < 3 ? (
              <button
                onClick={triggerEvolution}
                className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-neutral-950 text-white font-medium hover:bg-neutral-900 transition-all shadow-md hover:shadow-brand-core/30 duration-300 text-sm"
              >
                Initiate Zoom Out
                <ArrowRight className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
            ) : (
              <button
                onClick={resetEvolution}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-blu text-neutral-950 font-bold hover:bg-opacity-90 transition-all shadow-md duration-300 text-sm"
              >
                Reset Evolution
                <Sun className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Immersive zooming out particles simulator */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[450px] relative border border-neutral-200/30 bg-white/10 backdrop-blur-sm rounded-3xl p-8 overflow-hidden">
          
          {/* Pulsing Grid Mesh */}
          <div className="absolute inset-0 grid grid-cols-12 gap-2 opacity-10 pointer-events-none">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border-r border-b border-neutral-500/30 w-full h-12" />
            ))}
          </div>

          <div className="w-full max-w-md h-[300px] flex items-center justify-center relative">
            
            {/* Step 0: Single node */}
            {evolutionStep === 0 && (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="relative flex items-center justify-center"
              >
                <div className="w-24 h-24 rounded-full bg-emerald-500/10 border-2 border-emerald-400 flex items-center justify-center animate-pulse p-1.5 bg-white shadow-lg">
                  <img
                    src="/billy3.0.png"
                    alt="Billy Suite A Logo"
                    className="w-full h-full rounded-full object-cover shadow-md"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Orbital dots */}
                <div className="absolute w-36 h-36 rounded-full border border-dashed border-emerald-400/30 animate-spin" style={{ animationDuration: '8s' }} />
              </motion.div>
            )}

            {/* Step 1: Dispersing to multiple peer nodes */}
            {evolutionStep === 1 && (
              <div className="grid grid-cols-3 gap-8">
                {Array.from({ length: 9 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-3 rounded-xl bg-white border border-emerald-300 flex items-center justify-center relative"
                  >
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-pulse" />
                    <div className="absolute inset-0 rounded-xl border border-dashed border-emerald-500/20 animate-ping" style={{ animationDelay: `${i * 0.2}s`, animationDuration: '3s' }} />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Step 2: Cityscape expansion */}
            {evolutionStep === 2 && (
              <div className="w-full h-full relative flex items-center justify-center">
                {/* Concentric rings scaling up */}
                <div className="absolute w-24 h-24 rounded-full border border-emerald-500/20 animate-ping" />
                <div className="absolute w-44 h-44 rounded-full border border-emerald-500/15" />
                <div className="absolute w-64 h-64 rounded-full border border-emerald-500/10" />

                <div className="flex flex-wrap justify-center gap-2 max-w-sm">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="w-3 h-3 rounded-full bg-emerald-400"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Midnight BLU Active */}
            {evolutionStep === 3 && (
              <div className="w-full h-full flex flex-col justify-center items-center relative">
                {/* Glowing cyan portal/neural structure */}
                 <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  className="relative flex items-center justify-center"
                >
                  <div className="w-32 h-32 rounded-full bg-cyan-500/10 border-2 border-cyan-400 flex items-center justify-center shadow-2xl shadow-cyan-400/40 p-1.5 bg-neutral-900">
                    <img
                      src="/bblu3.0.png"
                      alt="Billy BLU Suite B Logo"
                      className="w-full h-full rounded-full object-cover shadow-xl"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {/* Holographic orbital lines */}
                  <div className="absolute w-48 h-48 rounded-full border-2 border-dashed border-cyan-400/30 animate-spin" style={{ animationDuration: '12s' }} />
                  <div className="absolute w-60 h-60 rounded-full border border-dashed border-cyan-400/20 animate-reverse-spin" style={{ animationDuration: '20s' }} />
                </motion.div>
                <div className="mt-6 font-mono text-xs text-cyan-400 tracking-widest uppercase animate-pulse">
                  Ledger Harmonization Complete
                </div>
              </div>
            )}

          </div>

          {/* Indicator of Current Visual state */}
          <div className="absolute bottom-4 left-6 flex items-center gap-1.5 font-mono text-[9px] text-neutral-400 tracking-wider">
            <span>ZOOM COORDINATE:</span>
            <span className="font-semibold text-neutral-600 uppercase">
              {evolutionStep === 0 && 'Localhost node (1:1)'}
              {evolutionStep === 1 && 'Peer network grid (1:100)'}
              {evolutionStep === 2 && 'Metropolitan system (1:10,000)'}
              {evolutionStep === 3 && 'Global economic lattice (1:1,000,000)'}
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
