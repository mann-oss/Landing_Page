import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Coffee, GraduationCap, Building, ArrowRight, Orbit, Fingerprint, Activity, CheckCircle2, Zap } from 'lucide-react';

const personas = [
  {
    id: 'salaried',
    icon: Briefcase,
    label: 'Salaried Professional',
    tagline: 'Predictable Cycles',
    desc: 'You get a fixed paycheck on the 1st of every month.',
    billyAction: 'Billy automatically detects your payday, maps out your fixed commitments (rent, utilities), and instantly isolates what is safely spendable until the next cycle.',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-500',
    bars: [20, 20, 80, 20, 20, 80, 20]
  },
  {
    id: 'freelance',
    icon: Coffee,
    label: 'Freelancer',
    tagline: 'High Volatility',
    desc: 'Your income drops unpredictably from multiple clients.',
    billyAction: 'Billy smooths the cash flow by identifying baseline survival costs and locking away tax percentages the second an invoice is paid, ensuring you are never caught off guard.',
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-500/10',
    text: 'text-amber-500',
    bars: [10, 50, 15, 90, 10, 40, 20]
  },
  {
    id: 'student',
    icon: GraduationCap,
    label: 'Student',
    tagline: 'Strict Budgets',
    desc: 'You are juggling allowance, part-time jobs, and tuition.',
    billyAction: 'Billy helps you build micro-habits. It predicts when your allowance will run out based on late-night food deliveries, nudging you before you hit zero.',
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-500/10',
    text: 'text-blue-500',
    bars: [60, 10, 10, 10, 30, 10, 10]
  },
  {
    id: 'founder',
    icon: Building,
    label: 'Solopreneur',
    tagline: 'Runway Focused',
    desc: 'Mixing personal and business expenses is a chaotic reality.',
    billyAction: 'Billy visually segregates your entity cash from your personal runway, warning you if your startup burns into your personal six-month safety net.',
    color: 'from-purple-500 to-pink-600',
    bg: 'bg-purple-500/10',
    text: 'text-purple-500',
    bars: [40, 60, 20, 80, 10, 20, 50]
  }
];

export function Personas() {
  const [activeId, setActiveId] = useState(personas[0].id);

  return (
    <section className="py-32 bg-surface relative overflow-hidden border-y border-outline-variant/20" id="personas">
       {/* Background ambient lighting */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

       <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <span className="flex items-center justify-center gap-2 text-primary font-black tracking-widest text-xs uppercase mb-4">
              <Fingerprint size={16} /> Adaptive Intelligence
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-on-surface mb-6 font-headline">
              Wired for your <br />
              <span className="text-primary italic">financial reality.</span>
            </h2>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto font-medium leading-relaxed">
              Every income stream has a distinct DNA. Whether you are riding freelance waves or managing a fixed salary, Billy calibrates its engine to match your momentum.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
             
             {/* Left: Interactive Roster */}
             <div className="lg:col-span-5 flex flex-col gap-4">
                {personas.map(p => {
                  const isActive = activeId === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActiveId(p.id)}
                      className={`relative w-full text-left p-6 rounded-3xl transition-all duration-500 border overflow-hidden group ${
                        isActive 
                          ? 'bg-surface border-outline-variant/50 shadow-xl scale-[1.02]' 
                          : 'bg-surface-container-lowest border-transparent hover:bg-surface-container-lowest/50 hover:border-outline-variant/20'
                      }`}
                    >
                       {/* Active background glow */}
                       {isActive && (
                         <div className={`absolute right-0 top-0 w-32 h-32 blur-[60px] opacity-20 bg-gradient-to-br ${p.color}`} />
                       )}

                       <div className="relative z-10 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-500 ${
                              isActive ? p.bg : 'bg-surface-container'
                            }`}>
                              <p.icon size={24} className={isActive ? p.text : 'text-on-surface-variant'} />
                            </div>
                            <div>
                              <h3 className={`font-black text-xl mb-1 tracking-tight transition-colors ${
                                isActive ? 'text-on-surface' : 'text-on-surface-variant group-hover:text-on-surface'
                              }`}>
                                {p.label}
                              </h3>
                              <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                                isActive ? p.text : 'text-on-surface-variant/60'
                              }`}>
                                {p.tagline}
                              </span>
                            </div>
                          </div>
                          
                          {isActive && (
                            <motion.div 
                              initial={{ opacity: 0, x: -10 }} 
                              animate={{ opacity: 1, x: 0 }}
                              className={`w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-sm border border-outline-variant/20 ${p.text}`}
                            >
                              <ArrowRight size={14} strokeWidth={3} />
                            </motion.div>
                          )}
                       </div>
                    </button>
                  );
                })}
             </div>

             {/* Right: Dynamic Visualization Panel */}
             <div className="lg:col-span-7 lg:h-[600px]">
                <AnimatePresence mode="wait">
                  {personas.map(p => p.id === activeId && (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 20, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.98 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="bg-surface-container-lowest rounded-[2.5rem] p-8 md:p-12 border border-outline-variant/30 shadow-2xl relative overflow-hidden h-full flex flex-col"
                    >
                       {/* Background abstract shape */}
                       <div className="absolute -top-24 -right-24 w-96 h-96 opacity-[0.03] pointer-events-none">
                         <Orbit size={400} className={p.text} strokeWidth={1} />
                       </div>

                       <div className="relative z-10 flex-1 flex flex-col">
                          <h3 className="text-3xl lg:text-4xl font-headline font-black text-on-surface tracking-tight mb-4 leading-tight max-w-sm">
                            {p.desc}
                          </h3>
                          
                          {/* Mini simulated chart representing the cashflow */}
                          <div className="mt-6 mb-10 h-32 flex items-end gap-2 md:gap-4 w-full border-b border-outline-variant/20 pb-4">
                             {p.bars.map((height, i) => (
                               <motion.div 
                                 key={i}
                                 initial={{ height: 0 }}
                                 animate={{ height: `${height}%` }}
                                 transition={{ delay: 0.1 + (i * 0.05), type: "spring", stiffness: 100 }}
                                 className={`flex-1 rounded-t-lg bg-gradient-to-t ${p.color} opacity-80`}
                               />
                             ))}
                          </div>

                          <div className="flex items-start gap-4 bg-surface rounded-2xl p-6 md:p-8 border border-outline-variant/50 shadow-sm relative overflow-hidden mt-auto">
                             <div className={`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${p.color}`} />
                             
                             <div className={`shrink-0 p-2.5 rounded-xl ${p.bg} ${p.text}`}>
                                <Activity size={24} />
                             </div>
                             <div>
                               <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-2 block">
                                 The Billy Protocol
                               </span>
                               <p className="text-sm md:text-base font-semibold text-on-surface leading-relaxed">
                                 {p.billyAction}
                               </p>
                             </div>
                          </div>
                          
                          {/* Bottom metrics mockup */}
                          <div className="grid grid-cols-2 gap-4 mt-6">
                             <div className="bg-surface border border-outline-variant/30 p-4 rounded-2xl flex items-center gap-3">
                                <CheckCircle2 size={18} className={p.text} />
                                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Pattern Identified</span>
                             </div>
                             <div className="bg-surface border border-outline-variant/30 p-4 rounded-2xl flex items-center gap-3">
                                <Zap size={18} className={p.text} />
                                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Auto-Rules Engaged</span>
                             </div>
                          </div>
                          
                       </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
             </div>

          </div>
       </div>
    </section>
  );
}
