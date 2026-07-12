/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import PredictiveCashFlow from './PredictiveCashFlow';
import DailyMissions from './DailyMissions';
import Pricing from './Pricing';
import {
  GoatMode,
  EarlyAccess,
  Footer,
} from './OtherSections';
import { ExternalInputVars } from '../types';
import { BellRing, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CombinedStory } from './BalanceStory';
import { Personas } from './Decisions';

interface BillyGreenLandingProps {
  onBack: () => void;
  /** Split: logo + headline only */
  peek?: boolean;
  showBack?: boolean;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export default function BillyGreenLanding({
  onBack,
  peek = false,
  showBack = true,
}: BillyGreenLandingProps) {
  const [inputs, setInputs] = useState<ExternalInputVars>({
    marketTrend: 22,
    politicalEvent: 'stable',
    inflationValue: 4.5,
    globalIndices: 'bull',
  });

  const [activeNotification, setActiveNotification] = useState<{
    id: string;
    title: string;
    desc: string;
    type: 'warning' | 'info' | 'success';
  } | null>(null);

  const triggerNotification = (
    title: string,
    desc: string,
    type: 'warning' | 'info' | 'success',
  ) => {
    const id = Date.now().toString();
    setActiveNotification({ id, title, desc, type });
    setTimeout(() => {
      setActiveNotification((prev) => (prev?.id === id ? null : prev));
    }, 4500);
  };

  const handleScorePoints = (pts: number) => {
    triggerNotification(
      'Points Earned! ⭐',
      `You completed a daily mission ledger and claimed +${pts} pts! Keep your streak burning.`,
      'success',
    );
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background selection:bg-primary selection:text-on-primary antialiased text-on-background">
      <AnimatePresence>
        {!peek && (
          <motion.div
            key="header"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <Header onBack={showBack ? onBack : undefined} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeNotification && !peek && (
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

      <main className="relative">
        <Hero peek={peek} />

        <AnimatePresence>
          {!peek && (
            <motion.div
              key="rest"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
            >
              <Personas />
              <CombinedStory />
              <PredictiveCashFlow
                inputs={inputs}
                setInputs={setInputs}
                onTriggerAlert={triggerNotification}
              />
              <DailyMissions onScoreIncrement={handleScorePoints} />
              <Pricing />
              <GoatMode />
              <EarlyAccess />
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
