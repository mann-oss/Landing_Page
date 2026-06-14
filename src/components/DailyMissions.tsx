/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  Award, 
  Flame, 
  Target, 
  Sparkles, 
  CheckSquare, 
  Square,
  Trophy,
  Undo2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DayMission } from '../types';

interface DailyMissionsProps {
  onScoreIncrement: (pts: number) => void;
}

export default function DailyMissions({ onScoreIncrement }: DailyMissionsProps) {
  // Initial list of daily interactive missions
  const [missions, setMissions] = useState<DayMission[]>([
    { id: 'm1', title: 'Connect Secondary Bank Wallet', description: 'Import standard external account ledger files securely.', points: 15, completed: false },
    { id: 'm2', title: 'Trigger predicted cashflow test', description: 'Adjust market trends scale positive on cash flow engine.', points: 10, completed: false },
    { id: 'm3', title: 'Ask AI Chat a custom Goa budget question', description: 'Query whether Goa vacation complies with cash limit.', points: 12, completed: false },
    { id: 'm4', title: 'Audit monthly premium subscription scrapers', description: 'Identify and scrap redundant recurring outflows.', points: 8, completed: false }
  ]);

  const [pointsEarned, setPointsEarned] = useState(1320);
  const [streakCount, setStreakCount] = useState(14);
  const [showCelebration, setShowCelebration] = useState(false);
  const [justEarnedPoints, setJustEarnedPoints] = useState<number | null>(null);

  // Compute stats
  const completedMissionsCount = useMemo(() => {
    return missions.filter(m => m.completed).length;
  }, [missions]);

  const totalPossibleMissions = missions.length;
  
  // Progress bar percentage calculation
  const progressPercentage = useMemo(() => {
    const base = 45; // starts partially complete to match design
    const perMissionVal = 55 / totalPossibleMissions;
    return Math.round(base + (completedMissionsCount * perMissionVal));
  }, [completedMissionsCount, totalPossibleMissions]);

  // Current tier calculation
  const rankTier = useMemo(() => {
    if (progressPercentage >= 95) return "Titan";
    if (progressPercentage >= 78) return "Gold";
    if (progressPercentage >= 55) return "Silver";
    return "Bronze";
  }, [progressPercentage]);

  const toggleMission = (id: string, currentlyCompleted: boolean, points: number) => {
    setMissions(prev => prev.map(m => {
      if (m.id === id) {
        return { ...m, completed: !m.completed };
      }
      return m;
    }));

    if (!currentlyCompleted) {
      // Adding points
      setPointsEarned(p => p + points);
      setJustEarnedPoints(points);
      onScoreIncrement(points);
      
      // If completed all missions
      const wouldBeCompletedCount = completedMissionsCount + 1;
      if (wouldBeCompletedCount === totalPossibleMissions) {
        setShowCelebration(true);
        setStreakCount(s => s + 1);
        setTimeout(() => setShowCelebration(false), 4500);
      }

      setTimeout(() => setJustEarnedPoints(null), 1500);
    } else {
      // Subtracting points
      setPointsEarned(p => Math.max(0, p - points));
    }
  };

  const handleResetAllMissions = () => {
    setMissions(prev => prev.map(m => ({ ...m, completed: false })));
    setPointsEarned(1320);
    setStreakCount(14);
  };

  return (
    <section className="py-32 relative overflow-hidden" id="missions-section">
      
      {/* Background radial soft indicator */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#59ee50]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Side: Dynamic Gamified Scorecard Widget */}
        <div className="order-2 lg:order-1">
          <div className="p-8 bg-surface-container-lowest rounded-3xl shadow-2xl relative border border-outline-variant/10 overflow-hidden">
            
            {/* Ambient glows inside scorecard */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-xl rounded-full" />
            
            {/* Top Bar inside card */}
            <div className="flex justify-between items-center mb-8 relative z-10">
              <div>
                <h4 className="font-extrabold text-xl font-headline text-on-surface">
                  Daily Score
                </h4>
                <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
                  Total Gained: <span className="font-mono font-black">{pointsEarned} pts</span>
                </p>
              </div>
              
              <div className="relative">
                <AnimatePresence mode="wait">
                  {justEarnedPoints && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: -25, scale: 1.1 }}
                      exit={{ opacity: 0, y: -40 }}
                      className="absolute right-0 -top-4 bg-primary text-white font-mono text-xs font-black px-2 py-0.5 rounded-full shadow-lg pointer-events-none z-50 whitespace-nowrap"
                    >
                      +{justEarnedPoints} Points!
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black tracking-widest flex items-center gap-1">
                  <Sparkles size={12} />
                  +{missions.filter(m => !m.completed).reduce((acc, m) => acc + m.points, 0)} Points Available
                </div>
              </div>
            </div>

            {/* Custom thick animated green progress bar with neon shadow */}
            <div className="relative mb-8 z-10">
              <div className="flex justify-between items-center text-xs text-on-surface-variant font-bold mb-2">
                <span>Mission Outlines Completed</span>
                <span className="font-mono font-black text-primary">{progressPercentage}%</span>
              </div>
              <div className="h-6 bg-surface-container rounded-full overflow-hidden p-1 border border-outline-variant/15">
                <div 
                  className="h-full bg-primary rounded-full shadow-[0_0_15px_rgba(0,107,10,0.6)] transition-all duration-700 ease-out flex items-center justify-end pr-2"
                  style={{ width: `${progressPercentage}%` }}
                >
                  <span className="text-[9px] text-white font-black font-mono">
                    {progressPercentage >= 48 ? 'MATCHING TARGETS' : ''}
                  </span>
                </div>
              </div>
            </div>

            {/* Three key stats from mockup */}
            <div className="grid grid-cols-3 gap-4 mb-8 relative z-10">
              <div className="p-4 bg-surface-container-low rounded-2xl text-center border border-outline-variant/5">
                <span className="block text-2xl font-black text-on-surface font-headline flex items-center justify-center gap-1.5">
                  <Flame size={20} className="text-orange-500 animate-pulse" />
                  {streakCount}
                </span>
                <span className="text-[10px] uppercase font-extrabold text-on-surface-variant/80 tracking-wider">
                  Day Streak
                </span>
              </div>
              
              <div className="p-4 bg-surface-container-low rounded-2xl text-center border border-outline-variant/5">
                <span className="block text-2xl font-black text-on-surface font-headline flex items-center justify-center gap-1.5">
                  <Trophy size={18} className="text-[#D4AF37]" />
                  {rankTier}
                </span>
                <span className="text-[10px] uppercase font-extrabold text-on-surface-variant/80 tracking-wider">
                  Tier Group
                </span>
              </div>
              
              <div className="p-4 bg-surface-container-low rounded-2xl text-center border border-outline-variant/5">
                <span className="block text-2xl font-black text-on-surface font-headline flex items-center justify-center gap-1.5">
                  <Target size={18} className="text-primary" />
                  {completedMissionsCount}/{totalPossibleMissions}
                </span>
                <span className="text-[10px] uppercase font-extrabold text-on-surface-variant/80 tracking-wider">
                  Missions
                </span>
              </div>
            </div>

            {/* Simulated Interactive Missions List Wrapper */}
            <div className="relative z-10 border-t border-outline-variant/10 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h5 className="text-xs font-black uppercase tracking-widest text-[#006630]">
                  🎯 Real-time Active Missions
                </h5>
                {completedMissionsCount > 0 && (
                  <button 
                    onClick={handleResetAllMissions}
                    className="text-[10px] font-bold text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <Undo2 size={12} /> Reset System
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {missions.map(mission => (
                  <button
                    key={mission.id}
                    onClick={() => toggleMission(mission.id, mission.completed, mission.points)}
                    className={`w-full p-3.5 rounded-2xl text-left border transition-all duration-300 flex items-start gap-3.5 hover:scale-[1.01] ${
                      mission.completed
                        ? 'bg-primary/5 border-primary/20 text-on-surface/75'
                        : 'bg-white border-outline-variant/20 hover:border-primary/30'
                    }`}
                  >
                    <div className="mt-0.5 flex-shrink-0 text-primary">
                      {mission.completed ? (
                        <CheckSquare size={18} className="text-primary" />
                      ) : (
                        <Square size={18} className="text-stone-400" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start gap-2">
                        <span className={`text-xs font-black ${mission.completed ? 'line-through text-stone-400' : 'text-on-surface'}`}>
                          {mission.title}
                        </span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full font-mono shrink-0 ${
                          mission.completed ? 'bg-stone-100 text-stone-400' : 'bg-primary/10 text-primary'
                        }`}>
                          +{mission.points} Pts
                        </span>
                      </div>
                      <p className="text-[10px] text-on-surface-variant mt-1">
                        {mission.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Full Completion Celebration Message */}
            <AnimatePresence>
              {showCelebration && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 bg-[#041a05]/95 rounded-3xl p-8 flex flex-col justify-center items-center text-center z-30"
                >
                  <Trophy size={60} className="text-[#59ee50] mb-4 animate-bounce" />
                  <h3 className="text-2xl font-black text-white mb-2 font-headline">
                    Mission Clear!
                  </h3>
                  <p className="text-xs text-stone-300 max-w-sm mb-6 leading-relaxed">
                    You have flawlessly swept all daily ledger tasks! Your daily streak has jumped to <span className="text-[#59ee50] font-bold">{streakCount} Days</span>.
                  </p>
                  <button 
                    onClick={() => setShowCelebration(false)}
                    className="bg-primary text-on-primary font-bold text-xs px-6 py-2.5 rounded-full hover:scale-105 active:scale-95 transition-transform"
                  >
                    Return to Scorecard
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* Right Side: Copy & Features */}
        <div className="order-1 lg:order-2">
          <span className="text-secondary font-black tracking-widest text-[#006630] text-xs uppercase mb-4 block">
            GAMIFICATION ENGINE
          </span>
          <h2 className="text-5xl font-extrabold tracking-tighter mb-8 leading-[1.1] font-black text-on-surface">
            Level up your <br />
            <span className="text-primary italic">money game.</span>
          </h2>
          
          <p className="text-xl text-on-surface-variant mb-10 leading-relaxed font-medium">
            Finance shouldn't be a chore. Billy turns wealth-building into a rewarding game with daily targeted missions, streak multipliers, and verified financial efficiency quotients.
          </p>

          <ul className="space-y-4 font-bold text-on-surface">
            <li className="flex items-center gap-3">
              <span className="bg-[#19edfd]/15 text-tertiary p-1.5 rounded-full">
                <CheckCircle2 size={18} />
              </span>
              <span>Personalized Daily Missions Tailored to Your Ledger</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-[#19edfd]/15 text-tertiary p-1.5 rounded-full">
                <CheckCircle2 size={18} />
              </span>
              <span>Streak Protection Safeguards Your Wealth Routine</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-[#19edfd]/15 text-tertiary p-1.5 rounded-full">
                <CheckCircle2 size={18} />
              </span>
              <span>Tier Rewards Unlocks Advanced Predictive Scrapers</span>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
}
