import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, User, Briefcase, ChevronRight, Play, CheckCircle, ShieldAlert } from 'lucide-react';

export default function ProductExperienceSection() {
  const [dashboardType, setDashboardType] = useState<'consumer' | 'business'>('consumer');
  const [confirmedTasks, setConfirmedTasks] = useState<string[]>([]);

  const toggleTask = (taskName: string) => {
    if (confirmedTasks.includes(taskName)) {
      setConfirmedTasks((prev) => prev.filter((t) => t !== taskName));
    } else {
      setConfirmedTasks((prev) => [...prev, taskName]);
    }
  };

  return (
    <div
      id="productexperience-section"
      className="relative w-full min-h-screen flex flex-col justify-center items-center py-24 px-6 md:px-12 bg-bg-blu text-neutral-100 select-none overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto space-y-12 z-10">
        
        {/* Dynamic Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-neutral-800 pb-8">
          <div className="space-y-4 text-left max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest text-brand-blu bg-brand-blu/10 border border-brand-blu/20 uppercase">
              Ecosystem Interface
            </span>
            <h2 className="font-display text-4xl md:text-[68px] font-bold tracking-tighter text-white leading-[0.95] uppercase">
              Two Distinct <br />
              Interfaces.
            </h2>
            <p className="font-sans text-sm md:text-md text-neutral-400 font-light">
              Toggle between the two completely distinct system interfaces below: Suite A (the personal cash-flow engine) and Suite B (the multi-node corporate treasury operating system).
            </p>
          </div>

          {/* Premium Selector Slider */}
          <div className="flex bg-[#060c21] p-1.5 rounded-full border border-neutral-800 shrink-0 self-start md:self-auto shadow-xl">
            <button
              onClick={() => setDashboardType('consumer')}
              className={`px-5 py-2 rounded-full font-mono text-[10px] uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                dashboardType === 'consumer'
                  ? 'bg-brand-core text-neutral-950 font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <img
                src="/billy3.0.png"
                alt=""
                className="w-4 h-4 rounded-full object-cover bg-white"
                referrerPolicy="no-referrer"
              /> Suite A: Personal Ledger
            </button>
            <button
              onClick={() => setDashboardType('business')}
              className={`px-5 py-2 rounded-full font-mono text-[10px] uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                dashboardType === 'business'
                  ? 'bg-brand-blu text-neutral-950 font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <img
                src="/bblu3.0.png"
                alt=""
                className="w-4 h-4 rounded-full object-cover bg-white"
                referrerPolicy="no-referrer"
              /> Suite B: Billy BLU OS
            </button>
          </div>
        </div>

        {/* Dashboard Display Stage */}
        <div className="bg-[#060c21]/80 border border-neutral-800/80 rounded-3xl p-6 md:p-8 min-h-[480px] shadow-2xl relative overflow-hidden flex flex-col justify-between">
          
          <AnimatePresence mode="wait">
            {dashboardType === 'consumer' ? (
              // CONSUMER WEALTH DASHBOARD
              <motion.div
                key="consumer-dash"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                {/* Dashboard top row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-neutral-950/40 p-5 rounded-2xl border border-neutral-900 space-y-1">
                    <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest">
                      GLOBAL LIQUID PORTFOLIO
                    </span>
                    <p className="font-display text-2xl font-bold text-white">₹8,42,100</p>
                    <span className="block font-mono text-[8px] text-brand-core font-bold">+1.24% today</span>
                  </div>

                  <div className="bg-neutral-950/40 p-5 rounded-2xl border border-neutral-900 space-y-1">
                    <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest">
                      MONTHLY DISCRETIONARY CAP
                    </span>
                    <p className="font-display text-2xl font-bold text-white">₹38,000</p>
                    <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-2 relative overflow-hidden">
                      <div className="bg-brand-core h-full w-[65%]" />
                    </div>
                  </div>

                  <div className="bg-neutral-950/40 p-5 rounded-2xl border border-neutral-900 space-y-1">
                    <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest">
                      PROJECTED SAVINGS TAX CAP
                    </span>
                    <p className="font-display text-2xl font-bold text-white">₹22,400</p>
                    <span className="block font-mono text-[8px] text-brand-core font-bold">Target locked</span>
                  </div>
                </div>

                {/* Dashboard core center */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  
                  {/* Dynamic SVG Balance line chart */}
                  <div className="lg:col-span-7 bg-neutral-950/80 p-5 rounded-2xl border border-neutral-900 min-h-[200px] flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[9px] text-neutral-400">ASSET INTEGRATION INDEX</span>
                      <span className="font-mono text-[8px] text-brand-core font-bold animate-pulse">LIVE SYNCING</span>
                    </div>

                    {/* Smooth SVG spline path representing cash trajectory */}
                    <div className="h-32 w-full pt-4">
                      <svg className="w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="green-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        {/* Area Fill */}
                        <path
                          d="M0,100 Q60,70 120,85 T240,40 T400,15 L400,120 L0,120 Z"
                          fill="url(#green-grad)"
                        />
                        {/* Spline Stroke */}
                        <path
                          d="M0,100 Q60,70 120,85 T240,40 T400,15"
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="2"
                        />
                        {/* Floating coordinate point */}
                        <circle cx="400" cy="15" r="4" fill="#10B981" className="animate-ping" />
                      </svg>
                    </div>
                  </div>

                  {/* Right interactive actionable panel */}
                  <div className="lg:col-span-5 bg-neutral-950/40 p-5 rounded-2xl border border-neutral-900 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="font-mono text-[8px] text-brand-core font-bold uppercase tracking-widest block">
                        Pending Autonomous Actions
                      </span>
                      
                      {/* Active tasks checklists */}
                      <div className="space-y-2">
                        {[
                          { key: 'sweep1', label: 'Sweep ₹4,500 surplus into high-yield pool' },
                          { key: 'opt1', label: 'Optimize cloud subscription to avoid renewals' },
                        ].map((task) => {
                          const done = confirmedTasks.includes(task.key);
                          return (
                            <button
                              key={task.key}
                              onClick={() => toggleTask(task.key)}
                              className={`w-full text-left p-3 rounded-xl border text-xs transition-all duration-300 flex items-center justify-between cursor-pointer ${
                                done
                                  ? 'bg-brand-core/10 border-brand-core text-brand-core'
                                  : 'bg-[#0a0f26]/60 border-neutral-800 hover:border-neutral-700'
                              }`}
                            >
                              <span className="font-sans font-light">{task.label}</span>
                              <span className="font-mono text-[8px] uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">
                                {done ? 'EXECUTED' : 'APPROVE'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* AI Coach narrative bubble */}
                    <div className="bg-brand-core/5 border border-brand-core/15 p-3.5 rounded-xl text-xs flex gap-3 items-start">
                      <img
                        src="/billy3.0.png"
                        alt=""
                        className="w-8 h-8 rounded-full object-cover border border-brand-core/30 bg-white shadow-inner shrink-0 mt-0.5"
                        referrerPolicy="no-referrer"
                      />
                      <div className="space-y-1">
                        <div className="font-mono text-[8px] text-brand-core uppercase font-semibold">
                          Billy Advisor Summary
                        </div>
                        <p className="font-sans text-neutral-300 font-light leading-relaxed">
                          Surplus liquidity is optimized. Total compliance risk rating sits at 0%. Cash runways look stable.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            ) : (
              // ENTERPRISE TREASURY DASHBOARD
              <motion.div
                key="business-dash"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                {/* Enterprise top row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-neutral-950/40 p-5 rounded-2xl border border-neutral-900 space-y-1">
                    <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest">
                      ACCOUNTS RECEIVABLE (Q2)
                    </span>
                    <p className="font-display text-2xl font-bold text-white">₹14,50,000</p>
                    <span className="block font-mono text-[8px] text-brand-blu font-bold">98% collected</span>
                  </div>

                  <div className="bg-neutral-950/40 p-5 rounded-2xl border border-neutral-900 space-y-1">
                    <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest">
                      NET RUN RATE APY
                    </span>
                    <p className="font-display text-2xl font-bold text-white">14.8% APY</p>
                    <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-2 relative overflow-hidden">
                      <div className="bg-brand-blu h-full w-[82%]" />
                    </div>
                  </div>

                  <div className="bg-neutral-950/40 p-5 rounded-2xl border border-neutral-900 space-y-1">
                    <span className="font-mono text-[8px] text-neutral-500 uppercase tracking-widest">
                      ORGANIZATIONAL RUNWAY
                    </span>
                    <p className="font-display text-2xl font-bold text-white">18 Months</p>
                    <span className="block font-mono text-[8px] text-emerald-400">Safe threshold</span>
                  </div>
                </div>

                {/* Enterprise center core */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  
                  {/* Dynamic SVG Cash flow vector spline */}
                  <div className="lg:col-span-7 bg-neutral-950/80 p-5 rounded-2xl border border-neutral-900 min-h-[200px] flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[9px] text-neutral-400">TREASURY FLUIDITY SPLINE</span>
                      <span className="font-mono text-[8px] text-brand-blu font-bold">HARMONIZED CYCLES</span>
                    </div>

                    <div className="h-32 w-full pt-4">
                      <svg className="w-full h-full" viewBox="0 0 400 120" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="cyan-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#00F0FF" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        {/* Area Fill */}
                        <path
                          d="M0,85 Q80,50 160,95 T320,30 T400,10 L400,120 L0,120 Z"
                          fill="url(#cyan-grad)"
                        />
                        {/* Spline Stroke */}
                        <path
                          d="M0,85 Q80,50 160,95 T320,30 T400,10"
                          fill="none"
                          stroke="#00F0FF"
                          strokeWidth="2"
                        />
                        {/* Floating coordinates */}
                        <circle cx="400" cy="10" r="4" fill="#00F0FF" className="animate-ping" />
                      </svg>
                    </div>
                  </div>

                  {/* Corporate approvals panel */}
                  <div className="lg:col-span-5 bg-neutral-950/40 p-5 rounded-2xl border border-neutral-900 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="font-mono text-[8px] text-brand-blu font-bold uppercase tracking-widest block">
                        Pending Corporate Sweeps
                      </span>
                      
                      <div className="space-y-2">
                        {[
                          { key: 'payroll1', label: 'Release Q2 employee sales commissions' },
                          { key: 'tax1', label: 'Execute quarterly compliance tax sweep' },
                        ].map((task) => {
                          const done = confirmedTasks.includes(task.key);
                          return (
                            <button
                              key={task.key}
                              onClick={() => toggleTask(task.key)}
                              className={`w-full text-left p-3 rounded-xl border text-xs transition-all duration-300 flex items-center justify-between cursor-pointer ${
                                done
                                  ? 'bg-brand-blu/10 border-brand-blu text-brand-blu'
                                  : 'bg-[#0a0f26]/60 border-neutral-800 hover:border-neutral-700'
                              }`}
                            >
                              <span className="font-sans font-light">{task.label}</span>
                              <span className="font-mono text-[8px] uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800">
                                {done ? 'SWEPT' : 'SWEEP'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* AI Advisor summary */}
                    <div className="bg-[#0c2540]/30 border border-brand-blu/15 p-3.5 rounded-xl text-xs flex gap-3 items-start">
                      <img
                        src="/bblu3.0.png"
                        alt=""
                        className="w-8 h-8 rounded-full object-cover border border-brand-blu/30 bg-white shadow-inner shrink-0 mt-0.5"
                        referrerPolicy="no-referrer"
                      />
                      <div className="space-y-1">
                        <div className="font-mono text-[8px] text-brand-blu uppercase font-semibold">
                          Billy BLU Analytics Core
                        </div>
                        <p className="font-sans text-neutral-300 font-light leading-relaxed">
                          Accounts receivable cycles optimized to 2 days average. Auto invoicing has reduced processing friction by 94%.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
}
