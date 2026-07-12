import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, ArrowRight, DollarSign, Check, Activity, ShieldCheck } from 'lucide-react';

interface Stream {
  id: string;
  name: string;
  annualValue: number;
  desc: string;
  isEnabled: boolean;
}

export default function BusinessModelSection() {
  const [streams, setStreams] = useState<Stream[]>([
    { id: 'sub', name: 'Subscriptions', annualValue: 45000, desc: 'Base SaaS fees per node.', isEnabled: true },
    { id: 'mkt', name: 'Marketplace', annualValue: 35000, desc: 'Transactional clearing splits.', isEnabled: true },
    { id: 'ent', name: 'Enterprise API', annualValue: 60000, desc: 'Corporate high-frequency data hooks.', isEnabled: true },
    { id: 'agent', name: 'AI Agents', annualValue: 50000, desc: 'Success-fee share on autonomous actions.', isEnabled: true },
    { id: 'prem', name: 'Premium Tier', annualValue: 25000, desc: 'Advanced asset sweeps.', isEnabled: true },
    { id: 'license', name: 'Licensing', annualValue: 30000, desc: 'Core ledger engine licensing to banks.', isEnabled: true },
  ]);

  const [arr, setArr] = useState(0);

  // Calculate total projected ARR based on active streams
  const activeARR = streams
    .filter((s) => s.isEnabled)
    .reduce((sum, s) => sum + s.annualValue, 0);

  // Smooth count animation for ARR
  useEffect(() => {
    let start = arr;
    const end = activeARR;
    if (start === end) return;

    const range = end - start;
    let current = start;
    const increment = range > 0 ? Math.ceil(range / 10) : Math.floor(range / 10);

    const timer = setInterval(() => {
      current += increment;
      if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
        setArr(end);
        clearInterval(timer);
      } else {
        setArr(current);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [activeARR, arr]);

  const toggleStream = (id: string) => {
    setStreams((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isEnabled: !s.isEnabled } : s))
    );
  };

  return (
    <div
      id="businessmodel-section"
      className="relative w-full min-h-screen flex flex-col justify-center items-center py-24 px-6 md:px-12 bg-bg-blu text-neutral-100 select-none overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left narrative content */}
        <div className="lg:col-span-5 space-y-8 text-left">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest text-brand-blu bg-brand-blu/10 border border-brand-blu/20 uppercase">
            Monetization Engine
          </span>
          <h2 className="font-display text-4xl md:text-[68px] font-bold tracking-tighter text-white leading-[0.95] uppercase">
            High-Velocity <br />
            Revenue Streams.
          </h2>
          <p className="font-sans text-md md:text-lg text-neutral-400 font-light leading-relaxed">
            Billy extracts enterprise and consumer fee spreads across active software modules, processing cycles, and marketplace clearances, condensing them into a continuous ARR cascade.
          </p>

          {/* Interactive instruction indicator */}
          <div className="p-4 rounded-xl bg-brand-blu/10 border border-brand-blu/15 flex items-center gap-3">
            <Activity className="w-5 h-5 text-brand-blu shrink-0" />
            <p className="font-mono text-xs text-brand-blu/90">
              Toggle specific monetization streams on the right to simulate continuous ledger scaling values.
            </p>
          </div>
        </div>

        {/* Right active streams simulator board */}
        <div className="lg:col-span-7 bg-[#060c21]/80 border border-brand-blu/15 p-8 rounded-3xl space-y-8 shadow-2xl relative">
          
          <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
            <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider">
              Channel Stream Conduits
            </span>
            <span className="font-mono text-[9px] text-brand-blu uppercase tracking-widest animate-pulse font-bold">
              STREAM FLOWS: ACTIVE
            </span>
          </div>

          {/* Streams Toggle List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {streams.map((stream) => (
              <button
                key={stream.id}
                onClick={() => toggleStream(stream.id)}
                className={`text-left p-4 rounded-xl border transition-all duration-300 flex justify-between items-center cursor-pointer ${
                  stream.isEnabled
                    ? 'bg-brand-blu/10 border-brand-blu text-white'
                    : 'bg-neutral-900/40 border-neutral-800/60 text-neutral-500'
                }`}
              >
                <div>
                  <h4 className="font-display font-bold text-xs uppercase tracking-wide">
                    {stream.name}
                  </h4>
                  <p className="font-sans text-[10px] text-neutral-400 font-light mt-0.5">
                    {stream.desc}
                  </p>
                </div>
                <div className={`p-1.5 rounded-full ${stream.isEnabled ? 'bg-brand-blu text-neutral-950' : 'bg-neutral-800 text-neutral-500'}`}>
                  {stream.isEnabled ? <Check className="w-3.5 h-3.5" /> : <Layers className="w-3.5 h-3.5" />}
                </div>
              </button>
            ))}
          </div>

          {/* Combined pool display */}
          <div className="bg-neutral-950/80 border border-neutral-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 relative overflow-hidden">
            
            {/* Ambient pulse background for cumulative ARR */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-blu/5 to-transparent pointer-events-none" />

            <span className="font-mono text-[9px] text-neutral-400 tracking-widest uppercase">
              RECURRING REVENUE POOL
            </span>

            <div className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight flex items-baseline justify-center gap-1">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blu to-blue-400 font-bold">
                ₹{(arr * 1000).toLocaleString()}
              </span>
              <span className="font-mono text-xs text-neutral-500 font-light">
                / YEAR
              </span>
            </div>

            <span className="font-mono text-[8px] text-brand-blu uppercase tracking-widest flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> Core recurring model
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
