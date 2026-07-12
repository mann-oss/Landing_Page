/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, ArrowRight, MessageSquare, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

const QUESTIONS = [
  'Can I afford a Goa trip next month?',
  'Will I run short before payday?',
  'How can I save ₹10,000 faster?',
  'Which subscriptions should I cancel?',
  'Can I increase my SIP safely?',
];

const RESPONSES: Record<string, string> = {
  'Can I afford a Goa trip next month?':
    'Yes. Based on your current run-rate, you will have ₹32,000 surplus before payday. Isolating ₹15,000 for Goa keeps you safely above your 20% savings goal.',
  'Will I run short before payday?':
    'You might. You have an upcoming annual insurance premium of ₹12,000 in 6 days. I suggest delaying non-essential purchases this weekend to maintain your buffer.',
  'How can I save ₹10,000 faster?':
    'If you reduce weekend dining to your previous 30-day average, you will hit this goal 14 days earlier without altering your SIPs.',
  'Which subscriptions should I cancel?':
    "You haven't used Spotify or Netflix on TV in 5 weeks, but you are still paying ₹998/mo. Canceling these adds ₹11,976 to your annual cash flow.",
  'Can I increase my SIP safely?':
    'Yes. Your income has consistently exceeded expenses by 35% for 4 months. Bumping your SIP by ₹5,000 is safe and leaves a comfortable emergency buffer.',
};

const EASE = [0.22, 1, 0.36, 1] as const;

const LOGO_SRC =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCQSLGAmoNs3wioZdRbZ3B97qEd-bKRXHFJBQNUBiAWBoEvsgussiSiRq737suVApl_ehqXSZfOtAkGiLjuLnWj6B2U08JAas4JzIJ_RB3O08vhxnTtVI015GgwEASTWDPVvBzI3dzbaiGKX6xnkgJy-4LhXvv9QVSUoeBoEZU21xzXQ7m1MM4EYb8iNXpLYhHhmhwNA65YXaUsjkw2BjY1XEntg9DmyThdVyja3AVQC6-OncSkzuUnverulvYAPH4lOe9LORtbnq1o';

interface HeroProps {
  /** Split view: logo + headline only; rest reveals on open */
  peek?: boolean;
}

export default function Hero({ peek = false }: HeroProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const handleQuestionClick = (q: string) => {
    setSelectedQuestion(q);
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1500);
  };

  return (
    <section
      className={`relative overflow-hidden ${
        peek ? 'h-screen flex items-center bg-transparent' : 'pt-20 pb-40 bg-transparent'
      }`}
    >
      <AnimatePresence>
        {!peek && (
          <motion.div
            key="marquee"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.03 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 pointer-events-none select-none flex flex-col justify-around text-4xl md:text-7xl font-mono font-black tracking-tighter overflow-hidden"
          >
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
              className="whitespace-nowrap w-[200%] flex gap-16 text-primary"
            >
              <span>+₹85,000 SALARY IN</span>
              <span>+₹85,000 SALARY IN</span>
              <span>+₹85,000 SALARY IN</span>
            </motion.div>
            <motion.div
              animate={{ x: [-1000, 0] }}
              transition={{ repeat: Infinity, duration: 35, ease: 'linear' }}
              className="whitespace-nowrap w-[200%] flex gap-16 text-on-surface"
            >
              <span>-₹24,000 RENT OUT</span>
              <span>-₹10,000 SIP LOCKED</span>
              <span>-₹24,000 RENT OUT</span>
            </motion.div>
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, duration: 45, ease: 'linear' }}
              className="whitespace-nowrap w-[200%] flex gap-16 text-secondary"
            >
              <span>-₹14,000 GOA PLANNED</span>
              <span>-₹6,100 BILLS DUE</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-1/4 left-[18%] w-[420px] h-[320px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

      <div
        className={`relative z-10 w-full ${
          peek
            ? 'pl-[8%] md:pl-[12%] pr-8'
            : 'max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center mt-12'
        }`}
      >
        <div className={`flex flex-col items-start text-left ${peek ? 'max-w-xl' : ''}`}>
          {/* Logo — always on split */}
          <motion.div
            layout
            className="flex items-center gap-3 mb-8"
            transition={{ duration: 0.5, ease: EASE }}
          >
            <img alt="Billy Logo" className="h-11 md:h-12 w-auto" src={LOGO_SRC} />
            <span className="font-headline font-black text-2xl md:text-3xl tracking-tighter text-stone-900">
              Billy{' '}
              <span className="text-primary font-semibold text-[0.9em]">
                Living Ledger
              </span>
            </span>
          </motion.div>

          <AnimatePresence>
            {!peek && (
              <motion.span
                key="badge"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-surface border border-outline-variant/60 shadow-sm text-on-surface-variant font-bold rounded-full text-xs uppercase tracking-widest mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.45, delay: 0.05, ease: EASE }}
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Built around your money life
              </motion.span>
            )}
          </AnimatePresence>

          {/* Headline — always visible */}
          <motion.h1
            layout
            className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.05] text-on-surface font-headline mb-6"
            transition={{ duration: 0.5, ease: EASE }}
          >
            Your AI Financial
            <br />
            <span className="text-primary italic">Brain.</span>
          </motion.h1>

          <AnimatePresence>
            {!peek && (
              <motion.div
                key="copy"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.55, delay: 0.12, ease: EASE }}
              >
                <p className="text-lg md:text-xl text-on-surface-variant max-w-lg mb-12 leading-relaxed font-medium">
                  Billy learns how you earn, spend, save, and live, then helps you
                  make your next money decision confidently.
                </p>

                <div className="flex flex-col items-start gap-4">
                  <a
                    href="#build"
                    className="bg-on-surface text-surface px-10 py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all text-center flex items-center justify-center shadow-lg hover:shadow-on-surface/20"
                  >
                    Build My Billy
                  </a>
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mt-2">
                    Free beta · Read-only access · Disconnect anytime
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {!peek && (
            <motion.div
              key="phone"
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.7, delay: 0.22, ease: EASE }}
              className="relative w-full h-[650px] flex items-center justify-center perspective-[1200px]"
            >
              <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

              <motion.div
                initial={{ rotateX: 12, rotateY: -16, rotateZ: 2 }}
                animate={{
                  rotateX: [12, 14, 12],
                  rotateY: [-16, -14, -16],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative w-[320px] h-[640px] z-10"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className="absolute inset-0 bg-stone-900 rounded-[3rem] shadow-[-20px_20px_40px_rgba(0,0,0,0.4),20px_-20px_40px_rgba(255,255,255,0.05)] border-[8px] border-stone-800 flex flex-col overflow-hidden"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="absolute inset-0 bg-surface-container-lowest flex flex-col relative p-5 pt-10 overflow-y-auto no-scrollbar scroll-smooth border border-stone-700 rounded-[2.5rem]">
                    <div className="absolute top-0 inset-x-0 h-6 flex justify-center items-end pb-1 pointer-events-none z-20">
                      <div className="w-24 h-5 bg-stone-900 rounded-b-3xl" />
                    </div>

                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-outline-variant/30 mt-2">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20 shrink-0">
                        <MessageSquare size={16} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-on-surface text-[15px] leading-tight">
                          What are you trying to figure out?
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {QUESTIONS.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuestionClick(q)}
                          className={`w-full text-left p-3.5 rounded-xl border transition-all duration-300 text-[13px] font-medium flex items-center gap-2 group ${
                            selectedQuestion === q
                              ? 'bg-primary border-primary text-on-primary shadow-md'
                              : 'bg-surface-container border-outline-variant/50 hover:border-primary/50 text-on-surface'
                          }`}
                        >
                          <span className="flex-1 leading-snug">{q}</span>
                          <ArrowRight
                            size={14}
                            className={`shrink-0 transition-transform duration-300 ${
                              selectedQuestion === q
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary'
                            }`}
                          />
                        </button>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      {selectedQuestion && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-surface-container-highest border border-primary/30 rounded-xl p-4 relative overflow-hidden shrink-0 shadow-[0_0_20px_rgba(89,238,80,0.15)] mt-auto"
                        >
                          {isTyping ? (
                            <div className="flex items-center gap-2 text-primary font-mono text-[11px] py-2">
                              <Loader2
                                size={14}
                                className="animate-spin shrink-0"
                              />
                              Recalculating timeline...
                            </div>
                          ) : (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.4 }}
                            >
                              <div className="flex items-center gap-1.5 mb-2 text-[10px] font-bold text-primary uppercase tracking-wider">
                                <Sparkles size={10} /> Billy AI
                              </div>
                              <p className="text-on-surface text-[13px] leading-relaxed">
                                {RESPONSES[selectedQuestion]}
                              </p>
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
