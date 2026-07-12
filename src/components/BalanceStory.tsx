import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
  AnimatePresence,
} from 'motion/react';
import { ScanLine, Users, Activity, Receipt, MapPin, Utensils, Zap, AlertTriangle, ArrowRight, CheckCircle } from 'lucide-react';

type TickerItem = {
  label: string;
  tone: 'neutral' | 'debit' | 'credit' | 'warn' | 'sub';
  icon?: 'receipt' | 'food' | 'pin';
};

const MESSY_TICKER_A: TickerItem[] = [
  { label: '-₹780 UPI', tone: 'debit' },
  { label: 'Weekend Food · -₹1,450', tone: 'debit', icon: 'food' },
  { label: 'Spotify Premium', tone: 'warn' },
  { label: 'Shared Cab', tone: 'neutral', icon: 'pin' },
  { label: 'Netflix Renewed · -₹649', tone: 'sub' },
];

const MESSY_TICKER_B: TickerItem[] = [
  { label: 'Grocery Store', tone: 'neutral', icon: 'receipt' },
  { label: 'Salary Credited +₹82k', tone: 'credit' },
  { label: '-₹320 Zomato', tone: 'debit' },
  { label: 'Current Calculation', tone: 'neutral' },
  { label: 'Unorganized Events', tone: 'warn' },
];

const MESSY_TICKER_C: TickerItem[] = [
  { label: '-₹1,450 Weekend Food', tone: 'debit', icon: 'food' },
  { label: 'Shared Cab', tone: 'neutral', icon: 'pin' },
  { label: '-₹780 UPI', tone: 'debit' },
  { label: 'Netflix Renewed · -₹649', tone: 'sub' },
  { label: 'Salary Credited +₹82k', tone: 'credit' },
];

function TickerChip({ item }: { item: TickerItem }) {
  const toneClass =
    item.tone === 'debit'
      ? 'bg-error/10 text-error border-error/20'
      : item.tone === 'credit'
        ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
        : item.tone === 'warn'
          ? 'bg-amber-500/10 text-amber-600 border-amber-500/20'
          : item.tone === 'sub'
            ? 'bg-blue-500/10 text-blue-600 border-blue-500/20'
            : 'bg-surface-container text-on-surface border-outline-variant/30';

  return (
    <div
      className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border shadow-sm font-mono font-bold text-xs md:text-sm whitespace-nowrap ${toneClass}`}
    >
      {item.icon === 'receipt' && <Receipt size={14} className="opacity-70" />}
      {item.icon === 'food' && <Utensils size={14} className="opacity-70" />}
      {item.icon === 'pin' && <MapPin size={14} className="opacity-70" />}
      {item.label}
    </div>
  );
}

function TickerRow({
  items,
  direction,
}: {
  items: TickerItem[];
  direction: 'rtl' | 'ltr' | 'rtl-slow';
}) {
  const anim =
    direction === 'ltr'
      ? 'animate-marquee-ltr'
      : direction === 'rtl-slow'
        ? 'animate-marquee-rtl-slow'
        : 'animate-marquee-rtl';

  return (
    <div className="ticker-track mask-fade-x w-full">
      <div className={`ticker-rail ${anim}`}>
        {[...items, ...items].map((item, i) => (
          <TickerChip key={`${direction}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

const BALANCE_START = 12400;
const BALANCE_AFTER_EXPENSE = BALANCE_START - 2860; // 9,540
const BALANCE_AFTER_SPLIT = BALANCE_AFTER_EXPENSE + 1080; // 10,620
const BALANCE_AFTER_PATTERN = BALANCE_AFTER_SPLIT - 2220; // 8,400

function lerp(a: number, b: number, t: number) {
  const clamped = Math.min(1, Math.max(0, t));
  return a + (b - a) * clamped;
}

function balanceFromProgress(v: number): number {
  if (v < 0.2) return BALANCE_START;
  if (v < 0.32) return lerp(BALANCE_START, BALANCE_AFTER_EXPENSE, (v - 0.2) / 0.12);
  if (v < 0.4) return BALANCE_AFTER_EXPENSE;
  if (v < 0.52) return lerp(BALANCE_AFTER_EXPENSE, BALANCE_AFTER_SPLIT, (v - 0.4) / 0.12);
  if (v < 0.6) return BALANCE_AFTER_SPLIT;
  if (v < 0.72) return lerp(BALANCE_AFTER_SPLIT, BALANCE_AFTER_PATTERN, (v - 0.6) / 0.12);
  return BALANCE_AFTER_PATTERN;
}

function stageFromProgress(v: number): number {
  if (v < 0.18) return 0;
  if (v < 0.38) return 1;
  if (v < 0.58) return 2;
  if (v < 0.78) return 3;
  return 4;
}

const STAGE_ENTER = { opacity: 0, y: 16 };
const STAGE_SHOW = { opacity: 1, y: 0 };
const STAGE_EXIT = { opacity: 0, y: -12 };

export function CombinedStory() {
  // Scroll progress only for the sticky scrub track — not intro/outro
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  const [activeStage, setActiveStage] = useState(0);
  const [currentDisplay, setCurrentDisplay] = useState(BALANCE_START);

  const balanceTarget = useMotionValue(BALANCE_START);
  const smoothBalance = useSpring(balanceTarget, {
    stiffness: 140,
    damping: 28,
    mass: 0.6,
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActiveStage(stageFromProgress(v));
    balanceTarget.set(balanceFromProgress(v));
  });

  useMotionValueEvent(smoothBalance, 'change', (v) => {
    setCurrentDisplay(v);
  });

  useEffect(() => {
    const v = scrollYProgress.get();
    setActiveStage(stageFromProgress(v));
    balanceTarget.set(balanceFromProgress(v));
    setCurrentDisplay(balanceFromProgress(v));
  }, [scrollYProgress, balanceTarget]);

  const STAGES = [
    { label: 'Messy Spending', desc: 'Your money leaves clues.' },
    { label: 'Captured automatically', desc: 'Scan a receipt, add an expense.' },
    { label: 'Shared fairly', desc: 'Shared the moment? Billy remembers.' },
    { label: 'Pattern identified', desc: 'One payment means little. The pattern means everything.' },
    { label: 'Decision ready', desc: 'Billy explains what it means.' },
  ];

  return (
    <section className="bg-surface relative border-y border-outline-variant/20 overflow-x-clip">
      {/* Intro Copy */}
      <div className="pt-32 pb-16 px-6 max-w-4xl mx-auto text-center relative z-20">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-on-surface mb-6 font-headline leading-tight">
          Your money leaves clues.<br />
          <span className="text-primary italic">Billy connects them.</span>
        </h2>
        <p className="text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed max-w-2xl mx-auto">
          From scanned receipts and shared expenses to everyday UPI payments, Billy understands the small decisions shaping your financial life.
        </p>
      </div>

      {/* Sticky scrub track only — page scrolls vertically; frame stays locked */}
      <div ref={trackRef} className="relative h-[280vh] w-full overflow-x-clip">
        <div className="sticky top-0 left-0 right-0 h-[100dvh] w-full max-w-full flex flex-col items-center justify-center overflow-hidden bg-surface overscroll-none">
          {/* Balance — pinned, spring-smoothed so it feels alive not jumpy */}
          <div className="absolute top-[8%] md:top-[12%] text-center z-30 w-full max-w-full px-6 pointer-events-none">
            <div
              className={`font-mono font-black text-5xl md:text-7xl tracking-tighter tabular-nums transition-colors duration-500 ${
                activeStage === 4 ? 'text-primary' : 'text-on-surface'
              }`}
            >
              ₹{Math.round(currentDisplay).toLocaleString('en-IN')}
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mt-3">
              {activeStage === 4 ? 'Safely Available' : 'Current Calculation'}
            </div>
          </div>

          {/* Visual arena — clipped so nothing can shove the page sideways */}
          <div className="relative w-full max-w-5xl h-[52vh] md:h-[48vh] mt-8 md:mt-16 px-4 md:px-6 z-10 pointer-events-none overflow-hidden">
            {/* STAGE 0 */}
            <AnimatePresence mode="wait">
              {activeStage === 0 && (
                <motion.div
                  key="stage-0"
                  initial={STAGE_ENTER}
                  animate={STAGE_SHOW}
                  exit={STAGE_EXIT}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4 overflow-hidden"
                >
                  <p className="text-on-surface-variant font-bold uppercase tracking-widest text-sm text-center mb-1 z-20">
                    Unorganized Events
                  </p>
                  <TickerRow items={MESSY_TICKER_A} direction="rtl" />
                  <TickerRow items={MESSY_TICKER_B} direction="ltr" />
                  <TickerRow items={MESSY_TICKER_C} direction="rtl-slow" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* STAGE 1 */}
            <AnimatePresence mode="wait">
              {activeStage === 1 && (
                <motion.div
                  key="stage-1"
                  initial={STAGE_ENTER}
                  animate={STAGE_SHOW}
                  exit={STAGE_EXIT}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 flex flex-col items-center justify-center z-10 overflow-hidden"
                >
                  <div className="bg-surface p-6 rounded-2xl shadow-2xl relative overflow-hidden border border-outline-variant/30 w-72 max-w-full">
                    <motion.div
                      initial={{ top: '0%' }}
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                      className="absolute left-0 right-0 h-0.5 bg-primary shadow-[0_0_12px_3px_rgba(16,185,129,0.5)] z-20 opacity-80"
                    />
                    <motion.div
                      animate={{ opacity: [0, 1, 0, 0] }}
                      transition={{ duration: 3.5, repeat: Infinity, delay: 0.5, ease: 'linear' }}
                      className="absolute right-4 top-[3.7rem] bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded uppercase tracking-widest z-10"
                    >
                      Itemized
                    </motion.div>
                    <div className="flex justify-between items-center mb-4 border-b border-outline-variant/20 pb-2">
                      <span className="font-bold text-on-surface flex items-center gap-2">
                        <Utensils size={14} className="text-amber-500" /> Trattoria Dinner
                      </span>
                      <span className="text-[10px] uppercase font-bold text-on-surface-variant">Today</span>
                    </div>
                    <div className="space-y-2 text-sm font-mono text-on-surface-variant mb-4 relative">
                      <div className="flex justify-between relative">
                        <span>Pasta + Drink</span><span>₹1,080</span>
                        <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 0.8 }} className="absolute -inset-x-2 -inset-y-0.5 border border-primary/30 bg-primary/5 rounded -z-10" />
                      </div>
                      <div className="flex justify-between relative">
                        <span>Truffle Pizza</span><span>₹980</span>
                        <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 1.1 }} className="absolute -inset-x-2 -inset-y-0.5 border border-primary/30 bg-primary/5 rounded -z-10" />
                      </div>
                      <div className="flex justify-between"><span>Deserts & Tx</span><span>₹400</span></div>
                    </div>
                    <div className="flex justify-between mt-2 pt-2 border-t border-outline-variant/20 font-bold font-mono text-on-surface text-lg">
                      <span>TOTAL</span><span>₹2,460</span>
                    </div>
                    <div className="absolute left-0 right-0 h-2 bg-gradient-to-r from-transparent via-primary to-transparent bottom-0" />
                  </div>
                  <div className="mt-6 flex flex-col items-center gap-3">
                    <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-on-surface-variant border border-outline-variant/40 px-3 py-1 rounded-full bg-surface shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Advanced Neural OCR
                    </div>
                    <div className="flex items-center gap-2 text-primary font-bold bg-primary/5 border border-primary/20 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider shadow-sm">
                      <ScanLine size={16} /> Receipt understood in seconds.
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* STAGE 2 */}
            <AnimatePresence mode="wait">
              {activeStage === 2 && (
                <motion.div
                  key="stage-2"
                  initial={STAGE_ENTER}
                  animate={STAGE_SHOW}
                  exit={STAGE_EXIT}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 w-full z-10 px-2 overflow-hidden"
                >
                  <div className="bg-surface-container-low p-5 md:p-8 rounded-3xl border border-outline-variant/30 w-full md:w-[300px] max-w-[320px] shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-2 h-full bg-error" />
                    <div className="flex flex-col mb-4">
                      <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-1">You Paid</span>
                      <span className="text-2xl font-mono text-error font-black">-₹2,460</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-outline-variant/20">
                      <p className="text-[10px] text-on-surface-variant mb-1 uppercase font-bold">Your Actual Expense</p>
                      <p className="font-mono text-on-surface font-black text-xl">₹1,380</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 hidden md:flex bg-surface border border-outline-variant/30 rounded-full items-center justify-center shrink-0 shadow-sm z-20">
                    <Users size={16} className="text-on-surface-variant" />
                  </div>
                  <div className="bg-surface p-5 md:p-8 rounded-3xl border border-secondary/30 shadow-lg w-full md:w-[300px] max-w-[320px] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-secondary" />
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-secondary/20 text-secondary text-sm font-bold flex items-center justify-center shrink-0">R</div>
                      <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Riya owes you</span>
                    </div>
                    <p className="text-2xl font-mono text-secondary font-black mb-4">+₹1,080</p>
                    <div className="bg-secondary/10 px-3 py-2 border border-secondary/20 rounded-xl text-[10px] font-bold text-secondary uppercase tracking-wider inline-flex items-center gap-1.5">
                      <CheckCircle size={12} /> Automatically Calculated
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* STAGE 3 */}
            <AnimatePresence mode="wait">
              {activeStage === 3 && (
                <motion.div
                  key="stage-3"
                  initial={STAGE_ENTER}
                  animate={STAGE_SHOW}
                  exit={STAGE_EXIT}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 flex items-center justify-center w-full z-10 px-2 overflow-hidden"
                >
                  <div className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant/50 p-5 md:p-8 rounded-[2rem] shadow-xl relative overflow-hidden max-h-full">
                    <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest mb-5">
                      <Activity size={16} /> 7-Day Spending Pulse
                    </div>
                    <div className="relative h-32 md:h-40 mb-4">
                      <div className="absolute inset-0 flex items-end gap-2 md:gap-4 pb-6 z-10 px-1">
                        {[
                          { day: 'Mon', h: '30%', alert: false },
                          { day: 'Tue', h: '45%', alert: false },
                          { day: 'Wed', h: '25%', alert: false },
                          { day: 'Thu', h: '50%', alert: false },
                          { day: 'Fri', h: '40%', alert: false },
                          { day: 'Sat', h: '95%', alert: true },
                          { day: 'Sun', h: '75%', alert: true },
                        ].map((b, i) => (
                          <div key={b.day} className="flex-1 flex flex-col items-center justify-end h-full relative">
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: b.h }}
                              transition={{ duration: 0.45, delay: i * 0.06, type: 'spring' }}
                              className={`w-[70%] max-w-[36px] rounded-t-lg mx-auto ${
                                b.alert
                                  ? 'bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                                  : 'bg-primary/20'
                              }`}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-1 pt-2 border-t border-outline-variant/20">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                          <div
                            key={day}
                            className={`flex-1 text-center text-[10px] uppercase font-bold tracking-wider ${
                              i >= 5 ? 'text-amber-600' : 'text-on-surface-variant/60'
                            }`}
                          >
                            {day}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/30 p-3 md:p-4 rounded-2xl flex items-start gap-3">
                      <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={18} />
                      <p className="text-sm text-on-surface leading-relaxed font-medium">
                        You spent <strong className="text-amber-500">₹2,140 more</strong> than usual this week, mainly from food delivery and unplanned weekend purchases.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* STAGE 4 */}
            <AnimatePresence mode="wait">
              {activeStage === 4 && (
                <motion.div
                  key="stage-4"
                  initial={STAGE_ENTER}
                  animate={STAGE_SHOW}
                  exit={STAGE_EXIT}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 flex items-center justify-center w-full z-10 px-2 overflow-hidden"
                >
                  <div className="w-full max-w-3xl bg-surface-container-highest p-5 md:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden border border-outline-variant/20 max-h-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 relative z-10">
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest mb-5">
                          <Zap size={14} /> Meaningful Context
                        </div>
                        <div className="space-y-4">
                          <div>
                            <span className="text-[10px] font-black uppercase text-on-surface-variant tracking-widest block mb-1">What Happened</span>
                            <p className="text-on-surface font-medium text-sm md:text-base">Weekend spending increased by 24%.</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-black uppercase text-on-surface-variant tracking-widest block mb-1">Why It Happened</span>
                            <p className="text-on-surface font-medium text-sm md:text-base">Two shared dinners and three additional food-delivery orders.</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-black uppercase text-on-surface-variant tracking-widest block mb-1">What It Changes</span>
                            <p className="text-amber-600 font-bold text-sm md:text-base">Continuing this pattern could delay your Goa goal by nine days.</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-surface p-5 md:p-7 rounded-3xl flex flex-col justify-center border border-outline-variant/30 shadow-sm relative overflow-hidden">
                        <h4 className="text-on-surface font-black text-xl md:text-2xl mb-3 tracking-tight">
                          Recommended Action
                        </h4>
                        <p className="text-on-surface-variant text-sm font-medium mb-5 leading-relaxed">
                          Keep next weekend&apos;s flexible spending below ₹3,200 to remain on schedule. You can safely spend{' '}
                          <strong className="text-on-surface font-black">₹8,400</strong> until payday.
                        </p>
                        <button className="w-full bg-on-surface text-surface text-sm font-black py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-on-surface/90 transition-colors z-10 pointer-events-auto">
                          Set ₹3,200 Limit <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Progress */}
          <div className="absolute bottom-[3%] md:bottom-[6%] w-full max-w-4xl px-4 md:px-6 z-20">
            <div className="h-1.5 w-full bg-outline-variant/30 rounded-full overflow-hidden relative">
              {[0.2, 0.4, 0.6, 0.8].map((pos) => (
                <div key={pos} className="absolute top-0 bottom-0 w-px bg-surface z-10" style={{ left: `${pos * 100}%` }} />
              ))}
              <motion.div className="h-full bg-primary origin-left z-0" style={{ scaleX: scrollYProgress }} />
            </div>
            <div className="flex justify-between w-full mt-3 gap-1">
              {STAGES.map((s, i) => (
                <div key={s.label} className="text-center flex-1 min-w-0">
                  <div
                    className={`text-[9px] md:text-[10px] uppercase font-bold tracking-widest truncate transition-colors ${
                      activeStage >= i ? 'text-primary' : 'text-on-surface-variant/40'
                    }`}
                  >
                    <span className="hidden md:inline">{activeStage === i ? s.label : `Stage ${i + 1}`}</span>
                    <span className="md:hidden">{activeStage === i ? `S${i + 1}` : ''}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Outro Copy */}
      <div className="py-24 md:py-32 px-6 max-w-4xl mx-auto text-center relative z-20">
        <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-on-surface mb-6 font-headline">
          Less tracking.<br className="md:hidden" /> <span className="text-primary italic">More understanding.</span>
        </h3>
        <p className="text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed max-w-2xl mx-auto">
          Billy captures what you spend, understands what belongs to you, identifies changing habits, and shows what those choices mean for your future.
        </p>
      </div>
    </section>
  );
}
