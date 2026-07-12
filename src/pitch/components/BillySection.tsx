import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Wallet,
  Compass,
  TrendingDown,
  ShieldAlert,
  Target,
  Sparkles,
  MessageSquare,
  RefreshCw,
  Search,
  CheckCircle,
  PiggyBank,
} from 'lucide-react';

interface Feature {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  tagline: string;
  chartType: 'predictive' | 'coaching' | 'budget' | 'accounts' | 'goals';
  aiMessage: string;
  stats: string;
}

export default function BillySection() {
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [savingsCount, setSavingsCount] = useState<number>(45240);

  const features: Feature[] = [
    {
      id: 'connect',
      name: 'Connect Every Account',
      icon: Wallet,
      tagline: 'Aggregate Plaid, bank accounts, credit portfolios, and digital wallets instantly.',
      chartType: 'accounts',
      aiMessage: 'Harmonized 4 bank feeds and 2 wallets. Global asset index unified.',
      stats: 'Global Net Worth: ₹8,42,000',
    },
    {
      id: 'predict',
      name: 'Predict Spending',
      icon: Compass,
      tagline: 'Proprietary models forecast future liabilities and cash outflows 12 months ahead.',
      chartType: 'predictive',
      aiMessage: 'Projected ₹14,200 reduction in discretionary bills for next quarter.',
      stats: 'Predicted Outflows: -12.4%',
    },
    {
      id: 'budget',
      name: 'AI Budgeting',
      icon: TrendingDown,
      tagline: 'Dynamic autonomous guardrails adjust spending caps in response to behavior.',
      chartType: 'budget',
      aiMessage: 'Safety sweep executed. ₹8,000 auto-transferred to long-term index.',
      stats: 'Safety Buffer: Stable',
    },
    {
      id: 'tax',
      name: 'Tax Optimisation',
      icon: ShieldAlert,
      tagline: 'Real-time capital gains and deductions auditing sweeps to avoid compliance leakage.',
      chartType: 'accounts',
      aiMessage: 'Flagged ₹3,200 eligible business deduction on software licensing fees.',
      stats: 'Deductions Saved: ₹22,400',
    },
    {
      id: 'goals',
      name: 'Goal Planning',
      icon: Target,
      tagline: 'Set dynamic targets. Watch Billy balance savings buffers to trigger target milestones.',
      chartType: 'goals',
      aiMessage: 'Goal "Quantum Investment Capital" is pacing 8 days ahead of schedule.',
      stats: 'Goal Pacing: 94%',
    },
    {
      id: 'invest',
      name: 'Investment Intelligence',
      icon: Sparkles,
      tagline: 'Deep analytical index sweeps balance portfolios automatically with smart hedges.',
      chartType: 'predictive',
      aiMessage: 'Identified arbitrage path in sovereign yield bonds. Sweep prepared.',
      stats: 'Index APY: 12.8%',
    },
    {
      id: 'coaching',
      name: 'Financial Coaching',
      icon: MessageSquare,
      tagline: 'An on-demand financial expert that answers complex strategy queries instantly.',
      chartType: 'coaching',
      aiMessage: '"Based on cash cycles, you can afford a ₹1,50,000 hardware refresh today."',
      stats: 'Expert Status: Active',
    },
    {
      id: 'automation',
      name: 'Bill Automation',
      icon: RefreshCw,
      tagline: 'Autonomous invoicing, recurring sweep routing, and subscription checks.',
      chartType: 'budget',
      aiMessage: 'Optimized cloud subscription rates, reducing recurring costs by 15%.',
      stats: 'Automations: 12 Active',
    },
    {
      id: 'search',
      name: 'Natural Language Search',
      icon: Search,
      tagline: 'Query your entire transaction timeline like typing a prompt to a teammate.',
      chartType: 'coaching',
      aiMessage: '"Show me all infrastructure tooling investments from Q2." Loading...',
      stats: 'Results Ready: 14 Nodes',
    },
  ];

  // Upward counting savings ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setSavingsCount((prev) => {
        const next = prev + Math.floor(Math.random() * 4) + 1;
        return next > 46800 ? 45240 : next;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="billy-section"
      className="relative w-full min-h-screen flex flex-col justify-center items-center py-24 px-6 md:px-12 bg-[#F9F9F7] text-neutral-900 select-none overflow-hidden"
    >
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-brand-core/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-core/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto space-y-16 z-10">
        
        {/* Apple Style Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto flex flex-col items-center">
          <img
            src="/billy3.0.png"
            alt="Billy Personal Logo"
            className="w-16 h-16 rounded-2xl object-cover border border-emerald-500/20 bg-white shadow-md mb-2"
            referrerPolicy="no-referrer"
          />
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest text-neutral-800 bg-brand-core border border-neutral-900/10 uppercase">
            PRODUCT SUITE A // THE LIVING LEDGER (CONSUMER ONLY)
          </span>
          <h2 className="font-display text-4xl md:text-[68px] font-bold tracking-tighter text-neutral-950 leading-[0.95] uppercase">
            The Personal <br className="hidden md:inline"/>
            Financial Brain.
          </h2>
          <p className="font-sans text-md md:text-lg text-neutral-500 font-light max-w-2xl mx-auto">
            Billy operates strictly within your personal balance sheets, executing micro-sweeps, tax cap tracking, and portfolio optimizations. It is structurally isolated from Billy BLU's corporate capabilities.
          </p>
        </div>

        {/* Master Feature Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Feature Menu (Apple Style Slider) */}
          <div className="lg:col-span-6 space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-none">
            {features.map((feat, index) => {
              const Icon = feat.icon;
              const isActive = activeFeature === index;
              return (
                <button
                  key={feat.id}
                  onClick={() => setActiveFeature(index)}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 border flex gap-4 items-start ${
                    isActive
                      ? 'bg-white border-neutral-950 shadow-lg scale-[1.02] ring-2 ring-brand-core'
                      : 'bg-white/30 hover:bg-white/60 border-transparent'
                  }`}
                >
                  <div className={`p-2 rounded-xl shrink-0 ${isActive ? 'bg-neutral-950 text-brand-core' : 'bg-neutral-200/50 text-neutral-600'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-neutral-900 text-xs uppercase tracking-wider">
                      {feat.name}
                    </h3>
                    {isActive && (
                      <p className="font-sans text-xs text-neutral-500 font-light leading-relaxed">
                        {feat.tagline}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Premium Phone Mockup Showcase */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-[300px] h-[600px] rounded-[42px] border-8 border-neutral-900 bg-neutral-950 p-3 shadow-2xl overflow-hidden flex flex-col justify-between">
              
              {/* Speaker Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-neutral-900 rounded-b-2xl z-20 flex items-center justify-center">
                <div className="w-12 h-1 bg-neutral-800 rounded-full" />
              </div>

              {/* Status Bar */}
              <div className="z-10 flex justify-between items-center px-4 pt-1 text-white font-mono text-[9px] tracking-tight">
                <span>09:41</span>
                <span className="text-emerald-400 font-medium">● ACTIVE</span>
              </div>

              {/* Mobile Live Screen Content */}
              <div className="flex-1 bg-neutral-900 rounded-[32px] p-4 flex flex-col justify-between mt-2 overflow-hidden text-neutral-200">
                
                {/* Screen Header */}
                <div className="space-y-1 pt-2">
                  <span className="font-mono text-[8px] text-neutral-500 tracking-widest uppercase">
                    BILLY LEDGER CORE
                  </span>
                  <div className="flex justify-between items-center">
                    <span className="font-display text-lg font-semibold text-white">My Ledger</span>
                    <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      Syncing
                    </span>
                  </div>
                </div>

                {/* Animated Chart Segment */}
                <div className="my-3 bg-neutral-950/60 p-3 rounded-2xl border border-neutral-800/40 min-h-[160px] flex flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[9px] text-neutral-400">LIQUID APY INDEX</span>
                    <span className="font-sans text-xs font-medium text-emerald-400">8.42% APY</span>
                  </div>

                  <div className="h-24 w-full flex items-end justify-between pt-4 gap-1.5">
                    {/* SVG/Div Chart bars dynamically reacting */}
                    {features[activeFeature].chartType === 'predictive' ? (
                      // Predictive dashed rising lines
                      <div className="w-full flex flex-col gap-1 items-stretch">
                        <div className="h-10 w-full flex items-end gap-1.5">
                          <div className="bg-neutral-800 h-[20%] w-full rounded-t-sm" />
                          <div className="bg-neutral-800 h-[30%] w-full rounded-t-sm" />
                          <div className="bg-neutral-800 h-[45%] w-full rounded-t-sm" />
                          <div className="bg-emerald-500 h-[65%] w-full rounded-t-sm animate-pulse" />
                          <div className="bg-emerald-400 h-[85%] w-full rounded-t-sm border-t-2 border-dashed border-white" />
                        </div>
                        <span className="font-mono text-[8px] text-emerald-400 text-center uppercase">Projected Savings</span>
                      </div>
                    ) : features[activeFeature].chartType === 'coaching' ? (
                      // Coaching prompt visualization
                      <div className="w-full h-full flex flex-col justify-center text-[9px] font-mono space-y-2">
                        <div className="bg-neutral-800/40 p-2 rounded-xl text-neutral-300">
                          How much taxes can I save on office expenses?
                        </div>
                        <div className="bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-xl text-emerald-400">
                          Billy found ₹24,000 eligible deductions. Sweep pending approval.
                        </div>
                      </div>
                    ) : features[activeFeature].chartType === 'budget' ? (
                      // Budget ring
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="relative w-16 h-16 rounded-full border-4 border-neutral-800 flex items-center justify-center">
                          <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
                          <span className="font-mono text-[8px] text-white">74% CAP</span>
                        </div>
                      </div>
                    ) : features[activeFeature].chartType === 'goals' ? (
                      // Goals line chart
                      <div className="w-full h-full flex flex-col justify-between">
                        <div className="w-full h-12 flex items-end gap-1">
                          {[30, 42, 45, 60, 75, 88, 94].map((h, i) => (
                            <div
                                key={i}
                                style={{ height: `${h}%` }}
                                className="bg-emerald-500 w-full rounded-t-sm transition-all duration-1000"
                            />
                          ))}
                        </div>
                        <span className="font-mono text-[8px] text-center text-neutral-400">₹452,400 of ₹500,000 Goal</span>
                      </div>
                    ) : (
                      // General account state
                      <div className="w-full h-full flex items-end justify-between">
                        {[20, 35, 45, 30, 50, 68, 72, 85].map((h, i) => (
                          <div
                            key={i}
                            style={{ height: `${h}%` }}
                            className="bg-neutral-700 hover:bg-emerald-500 w-full rounded-t-sm transition-all duration-300 cursor-pointer"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Savings Counter Live */}
                <div className="bg-neutral-950/60 p-3 rounded-2xl border border-neutral-800/40 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <PiggyBank className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-mono text-[8px] text-neutral-400 tracking-wider">SECURE SAVINGS POOL</span>
                  </div>
                  <div className="font-mono text-xl font-bold text-white tracking-tight">
                    ₹{savingsCount.toLocaleString()}
                  </div>
                  <span className="block font-mono text-[8px] text-emerald-400">
                    +₹12.00 saved every 1.5s via micro-sweep
                  </span>
                </div>

                {/* AI Notification Bubble */}
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-2xl text-[10px] space-y-1.5 mt-3 relative">
                  <div className="flex items-center gap-1.5 font-mono text-[8px] text-emerald-400 uppercase font-semibold">
                    <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" /> Billy recommendation
                  </div>
                  <p className="font-sans text-[11px] text-neutral-200 leading-tight">
                    {features[activeFeature].aiMessage}
                  </p>
                  <div className="font-mono text-[8px] text-neutral-400">
                    {features[activeFeature].stats}
                  </div>
                </div>

              </div>

              {/* iPhone Home Bar */}
              <div className="w-24 h-1 bg-neutral-700 mx-auto rounded-full mt-2 mb-1" />

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
