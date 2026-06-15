/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PredictiveCashFlow from './components/PredictiveCashFlow';
import DailyMissions from './components/DailyMissions';
import Pricing from './components/Pricing';
import { 
  ProblemSection, 
  GoatMode, 
  EarlyAccess, 
  Footer 
} from './components/OtherSections';
import { ExternalInputVars } from './types';
import { BellRing, ShieldCheck, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CombinedStory } from './components/BalanceStory';
import { Personas } from './components/Decisions';

export default function App() {
  // Centralized state so changing inputs dynamically affects elements across components!
  const [inputs, setInputs] = useState<ExternalInputVars>({
    marketTrend: 22, // defaults matches mockup
    politicalEvent: 'stable',
    inflationValue: 4.5,
    globalIndices: 'bull'
  });

  // Top level floating notifications
  const [activeNotification, setActiveNotification] = useState<{
    id: string;
    title: string;
    desc: string;
    type: 'warning' | 'info' | 'success';
  } | null>(null);

  const triggerNotification = (title: string, desc: string, type: 'warning' | 'info' | 'success') => {
    const id = Date.now().toString();
    setActiveNotification({ id, title, desc, type });
    // Autohide after 4.5 seconds
    setTimeout(() => {
      setActiveNotification(prev => prev?.id === id ? null : prev);
    }, 4500);
  };

  const handleScorePoints = (pts: number) => {
    triggerNotification(
      "Points Earned! ⭐", 
      `You completed a daily mission ledger and claimed +${pts} pts! Keep your streak burning.`,
      "success"
    );
  };

  return (
    <div className="relative min-h-screen bg-surface selection:bg-primary selection:text-on-primary antialiased">
      
      {/* Top sticky bar and navigation */}
      <Header />

      {/* Floating dynamic toast panel */}
      <AnimatePresence>
        {activeNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-20 right-6 z-[150] p-4 rounded-2xl shadow-xl max-w-sm w-full border flex items-start gap-3 backdrop-blur-md ${
              activeNotification.type === 'success' 
                ? 'bg-emerald-950/95 border-emerald-500/30 text-emerald-100'
                : activeNotification.type === 'warning'
                ? 'bg-amber-950/95 border-amber-500/30 text-amber-100'
                : 'bg-stone-950/95 border-stone-800 text-stone-100'
            }`}
          >
            <div className="bg-white/10 p-2 rounded-xl text-inherit shrink-0">
              <BellRing size={16} />
            </div>
            
            <div className="flex-1">
              <h5 className="text-xs font-black uppercase tracking-wider mb-0.5 font-headline">
                {activeNotification.title}
              </h5>
              <p className="text-[11px] leading-relaxed text-inherit/80 font-medium">
                {activeNotification.desc}
              </p>
            </div>

            <button 
              onClick={() => setActiveNotification(null)}
              className="text-inherit/50 hover:text-inherit transition-all"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Layout Grid Sections inside complete landing page */}
      <main className="relative">
        
        {/* Hero Banner with mascot and previews */}
        <Hero />

        {/* Personas section */}
        <Personas />

        {/* Keeping CombinedStory here as requested - till the balance section */}
        <CombinedStory />

        {/* Predictive Simulator cash flow grid */}
        <PredictiveCashFlow 
          inputs={inputs} 
          setInputs={setInputs} 
          onTriggerAlert={triggerNotification} 
        />

        {/* Gamified Missions & Streaks Tracker */}
        <DailyMissions onScoreIncrement={handleScorePoints} />

        {/* Packages pricing models and activations */}
        <Pricing />

        {/* Absolute premium dark section */}
        <GoatMode />

        {/* Register email for early beta */}
        <EarlyAccess />

      </main>

      {/* Professional Footer */}
      <Footer />

    </div>
  );
}
