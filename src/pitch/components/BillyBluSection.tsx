import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileCode,
  Users2,
  TrendingUp,
  Briefcase,
  Layers,
  Megaphone,
  LifeBuoy,
  FileSpreadsheet,
  Cpu,
  ArrowRightLeft,
  ChevronRight,
} from 'lucide-react';

interface Module {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  desc: string;
  actionMsg: string;
  color: string;
  bg: string;
}

export default function BillyBluSection() {
  const [selectedModule, setSelectedModule] = useState<number>(3); // Accounting default
  const [activePackets, setActivePackets] = useState<Array<{ id: number; from: string; to: string; text: string }>>([]);

  const modules: Module[] = [
    {
      id: 'crm',
      name: 'Sales CRM',
      icon: Users2,
      desc: 'Closes leads and records client pipelines.',
      actionMsg: 'Syncs customer contract values into invoice pipelines automatically.',
      color: 'text-cyan-400 border-cyan-500/20',
      bg: 'bg-cyan-500/5',
    },
    {
      id: 'hr',
      name: 'HR & Payroll',
      icon: Briefcase,
      desc: 'Controls global hiring, payroll and benefits.',
      actionMsg: 'Coordinates live employee commissions from sales deals to payroll tax sheets.',
      color: 'text-blue-400 border-blue-500/20',
      bg: 'bg-blue-500/5',
    },
    {
      id: 'inventory',
      name: 'Inventory',
      icon: Layers,
      desc: 'Manages warehouses and raw stocks.',
      actionMsg: 'Signals automatic purchase sweeps as stock levels cross safety parameters.',
      color: 'text-violet-400 border-violet-500/20',
      bg: 'bg-violet-500/5',
    },
    {
      id: 'accounting',
      name: 'Accounting',
      icon: FileSpreadsheet,
      desc: 'The centralized ledger of business cash.',
      actionMsg: 'Collects and reconciles invoices, expenses, and ledger lines without manual bookkeeping.',
      color: 'text-brand-blu border-brand-blu/20',
      bg: 'bg-brand-blu/5',
    },
    {
      id: 'marketing',
      name: 'Marketing',
      icon: Megaphone,
      desc: 'Deploys campaigns and tracks metrics.',
      actionMsg: 'Varies ad bids automatically based on inventory turnover rates and client metrics.',
      color: 'text-amber-400 border-amber-500/20',
      bg: 'bg-amber-500/5',
    },
    {
      id: 'support',
      name: 'Support',
      icon: LifeBuoy,
      desc: 'Resolves client tickets and requests.',
      actionMsg: 'Surfaces recurring payment errors directly into accounts payable queues.',
      color: 'text-rose-400 border-rose-500/20',
      bg: 'bg-rose-500/5',
    },
  ];

  // Simulation of ongoing background data streams
  useEffect(() => {
    const streamScenarios = [
      { from: 'Sales CRM', to: 'Accounting', text: '₹2,50,000 contract converted to Invoice' },
      { from: 'Inventory', to: 'Accounting', text: 'Stock deficit detected. Placed replenishment' },
      { from: 'HR & Payroll', to: 'Accounting', text: '₹4,20,000 global payroll sweep initiated' },
      { from: 'Sales CRM', to: 'HR & Payroll', text: 'Commission bonus calculated for lead closure' },
      { from: 'Support', to: 'Sales CRM', text: 'Upgrade ticket logged. Added account details' },
    ];

    const interval = setInterval(() => {
      const scenario = streamScenarios[Math.floor(Math.random() * streamScenarios.length)];
      const newPacket = {
        id: Date.now(),
        from: scenario.from,
        to: scenario.to,
        text: scenario.text,
      };

      // Add to packet stream, keep last 3
      setActivePackets((prev) => [newPacket, ...prev.slice(0, 2)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="billyblu-section"
      className="relative w-full min-h-screen flex flex-col justify-center items-center py-24 px-6 md:px-12 bg-bg-blu text-neutral-100 select-none overflow-hidden"
    >
      {/* Immersive Holographic Grid Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c1530_1px,transparent_1px),linear-gradient(to_bottom,#0c1530_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="absolute top-1/3 left-1/3 w-[450px] h-[450px] bg-brand-blu/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-brand-blu/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto space-y-16 z-10">
        
        {/* Enterprise Level Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto flex flex-col items-center">
          <img
            src="/bblu3.0.png"
            alt="Billy BLU Enterprise Logo"
            className="w-16 h-16 rounded-2xl object-cover border border-brand-blu/20 bg-neutral-900 shadow-xl mb-2"
            referrerPolicy="no-referrer"
          />
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest text-brand-blu bg-brand-blu/10 border border-brand-blu/20 uppercase">
            PRODUCT SUITE B // BILLY BLU (ENTERPRISE ONLY)
          </span>
          <h2 className="font-display text-4xl md:text-[68px] font-bold tracking-tighter text-white leading-[0.95] uppercase">
            The Enterprise <br />
            Business OS.
          </h2>
          <p className="font-sans text-md md:text-lg text-neutral-400 font-light max-w-2xl mx-auto">
            A separate, high-capacity commercial operating system. Billy BLU unifies sales, accounting, payroll, and stock into an automated company core—isolated from personal consumer files.
          </p>
        </div>

        {/* Cognitive Map Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Department Cards Layout */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((mod, index) => {
              const Icon = mod.icon;
              const isSelected = selectedModule === index;
              return (
                <button
                  key={mod.id}
                  onClick={() => setSelectedModule(index)}
                  className={`text-left p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between min-h-[140px] relative overflow-hidden group ${
                    isSelected
                      ? 'bg-brand-blu/10 border-brand-blu shadow-lg shadow-brand-blu/20 ring-2 ring-brand-blu/40'
                      : 'bg-[#060c21]/80 border-neutral-800/50 hover:bg-[#091233]/50'
                  }`}
                >
                  <div className="flex justify-between items-start w-full">
                    <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-brand-blu/15 text-brand-blu' : 'bg-neutral-800/30 text-neutral-400'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    {isSelected && (
                      <span className="font-mono text-[8px] text-brand-blu font-bold bg-neutral-950 border border-brand-blu/20 px-2 py-0.5 rounded-full uppercase tracking-widest">
                        Selected Node
                      </span>
                    )}
                  </div>

                  <div className="mt-4 space-y-1">
                    <h3 className="font-display font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                      {mod.name}
                      <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all text-brand-blu" />
                    </h3>
                    <p className="font-sans text-xs text-neutral-400 font-light leading-relaxed">
                      {mod.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Synapse stream router console */}
          <div className="lg:col-span-5 bg-[#060c21]/90 border border-brand-blu/15 rounded-3xl p-6 flex flex-col justify-between min-h-[440px] shadow-2xl relative overflow-hidden">
            
            {/* Top router indicator */}
            <div className="space-y-2">
              <div className="flex justify-between items-center border-b border-neutral-800 pb-4">
                <span className="font-mono text-[9px] text-brand-blu tracking-wider uppercase flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-brand-blu animate-pulse" /> AI Synapse Router
                </span>
                <span className="font-mono text-[9px] text-neutral-500">
                  SYSTEM READY
                </span>
              </div>

              {/* Display of selected module integration */}
              <div className="pt-2 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-xs text-neutral-400">Department:</span>
                  <span className="font-display text-sm font-semibold text-white">
                    {modules[selectedModule].name}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-brand-blu/10 border border-brand-blu/15 text-xs leading-relaxed text-brand-blu font-light font-mono">
                  {modules[selectedModule].actionMsg}
                </div>
              </div>
            </div>

            {/* Active streaming packets list */}
            <div className="space-y-3 pt-6 border-t border-neutral-800">
              <span className="font-mono text-[8px] text-neutral-500 tracking-wider uppercase block">
                Live Inter-department Streams
              </span>
              <div className="space-y-2 min-h-[140px] flex flex-col justify-end">
                <AnimatePresence mode="popLayout">
                  {activePackets.map((packet) => (
                    <motion.div
                      key={packet.id}
                      initial={{ opacity: 0, x: -10, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 10, scale: 0.95 }}
                      className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 text-[10px] flex justify-between items-center"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 font-mono text-[8px]">
                          <span className="text-brand-blu">{packet.from}</span>
                          <span className="text-neutral-500">➔</span>
                          <span className="text-blue-400">{packet.to}</span>
                        </div>
                        <p className="font-sans text-neutral-300 font-light">{packet.text}</p>
                      </div>
                      <span className="font-mono text-[8px] text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded">
                        SECURE
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {activePackets.length === 0 && (
                  <div className="text-neutral-500 font-mono text-[10px] text-center pb-8">
                    Awaiting active department signals...
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
