import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Building2,
  CreditCard,
  TrendingUp,
  Receipt,
  FileText,
  ShieldCheck,
  Users,
  Package,
  DollarSign,
  Megaphone,
  Briefcase,
  HelpCircle,
  Unplug,
  AlertTriangle,
} from 'lucide-react';

export default function ProblemSection() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const consumerNodes = [
    { name: 'Bank Accounts', icon: Building2, color: 'text-rose-500', bg: 'bg-rose-50' },
    { name: 'Credit Cards', icon: CreditCard, color: 'text-amber-500', bg: 'bg-amber-50' },
    { name: 'Investments', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { name: 'Bills & Utilities', icon: Receipt, color: 'text-blue-500', bg: 'bg-blue-50' },
    { name: 'Student Loans', icon: FileText, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { name: 'Insurance policies', icon: ShieldCheck, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  const businessNodes = [
    { name: 'CRM (Sales)', icon: Users, color: 'text-violet-500', bg: 'bg-violet-50' },
    { name: 'HR & Payroll', icon: Briefcase, color: 'text-sky-500', bg: 'bg-sky-50' },
    { name: 'Inventory Management', icon: Package, color: 'text-pink-500', bg: 'bg-pink-50' },
    { name: 'Corporate Billing', icon: DollarSign, color: 'text-teal-500', bg: 'bg-teal-50' },
    { name: 'Marketing Ads', icon: Megaphone, color: 'text-orange-500', bg: 'bg-orange-50' },
    { name: 'Customer Support', icon: HelpCircle, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  ];

  return (
    <div
      id="problem-section"
      className="relative w-full min-h-screen flex flex-col justify-center items-center py-20 px-6 md:px-12 select-none overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto space-y-16">
        {/* Header Block */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest text-neutral-800 bg-brand-core border border-neutral-900/10 uppercase">
            The Structural Crisis
          </span>
          <h2 className="font-display text-4xl md:text-[68px] font-bold tracking-tighter text-neutral-950 leading-[0.95] uppercase">
            Siloed Work <br className="hidden md:inline" />
            and Finance.
          </h2>
          <p className="font-sans text-md md:text-lg text-neutral-500 font-light max-w-2xl mx-auto">
            Modern platforms record static states, but nothing communicates. Information is frozen. Systems operate in complete isolation.
          </p>
        </div>

        {/* Cinematic Split Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
          
          {/* Centered Isolated Overlay Warning */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-neutral-200/50 flex items-center gap-3 shadow-xl"
            >
              <Unplug className="w-5 h-5 text-rose-500 animate-pulse" />
              <span className="font-mono text-xs text-neutral-800 tracking-wider uppercase font-medium">
                ZERO COMMUNICATION CHANNEL
              </span>
            </motion.div>
          </div>

          {/* Consumer Side Silo */}
          <div className="border border-neutral-200/50 bg-white/40 backdrop-blur-sm rounded-3xl p-8 relative flex flex-col items-center">
            <span className="absolute -top-3 left-8 px-4 py-1 rounded-full bg-neutral-100 text-[10px] font-mono tracking-widest text-neutral-500 border border-neutral-200/50 uppercase">
              Consumer Accounts Silo
            </span>
            <div className="grid grid-cols-2 gap-4 w-full mt-4">
              {consumerNodes.map((node, i) => {
                const Icon = node.icon;
                return (
                  <motion.div
                    key={node.name}
                    animate={{
                      y: [0, Math.sin(i + 1) * 8, 0],
                      x: [0, Math.cos(i + 1) * 6, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 4 + (i % 3),
                      ease: 'easeInOut',
                    }}
                    onHoverStart={() => setHoveredNode(node.name)}
                    onHoverEnd={() => setHoveredNode(null)}
                    className="p-4 rounded-2xl bg-white border border-neutral-100 shadow-sm flex flex-col items-start gap-3 hover:shadow-md transition-shadow cursor-help"
                  >
                    <div className={`p-2.5 rounded-xl ${node.bg}`}>
                      <Icon className={`w-5 h-5 ${node.color}`} />
                    </div>
                    <span className="font-sans text-xs font-medium text-neutral-700">
                      {node.name}
                    </span>
                    <span className="font-mono text-[9px] text-rose-400 tracking-tight flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Disconnected
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Business Side Silo */}
          <div className="border border-neutral-200/50 bg-white/40 backdrop-blur-sm rounded-3xl p-8 relative flex flex-col items-center">
            <span className="absolute -top-3 left-8 px-4 py-1 rounded-full bg-neutral-100 text-[10px] font-mono tracking-widest text-neutral-500 border border-neutral-200/50 uppercase">
              Business Operations Silo
            </span>
            <div className="grid grid-cols-2 gap-4 w-full mt-4">
              {businessNodes.map((node, i) => {
                const Icon = node.icon;
                return (
                  <motion.div
                    key={node.name}
                    animate={{
                      y: [0, Math.cos(i + 2) * 8, 0],
                      x: [0, Math.sin(i + 2) * 6, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 5 - (i % 2),
                      ease: 'easeInOut',
                    }}
                    onHoverStart={() => setHoveredNode(node.name)}
                    onHoverEnd={() => setHoveredNode(null)}
                    className="p-4 rounded-2xl bg-white border border-neutral-100 shadow-sm flex flex-col items-start gap-3 hover:shadow-md transition-shadow cursor-help"
                  >
                    <div className={`p-2.5 rounded-xl ${node.bg}`}>
                      <Icon className={`w-5 h-5 ${node.color}`} />
                    </div>
                    <span className="font-sans text-xs font-medium text-neutral-700">
                      {node.name}
                    </span>
                    <span className="font-mono text-[9px] text-rose-400 tracking-tight flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Disconnected
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Inter-silo failed communication status bar */}
        <div className="w-full flex justify-center pt-4">
          <AnimatePresence mode="wait">
            {hoveredNode ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="font-mono text-xs text-rose-500 bg-rose-50 border border-rose-100 px-4 py-2 rounded-lg"
              >
                No integration path available for <span className="font-semibold">{hoveredNode}</span>. Require human sync loop.
              </motion.div>
            ) : (
              <div className="font-mono text-xs text-neutral-400">
                Hover over isolated modules to inspect integration blocks
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
