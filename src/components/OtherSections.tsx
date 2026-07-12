/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Workflow, 
  EyeOff, 
  Hourglass, 
  ShieldAlert, 
  Send, 
  ClipboardCheck, 
  ThumbsUp,
  Share2,
  Globe2,
  Lock,
  BadgeCheck,
  CheckCircle,
  HelpCircle,
  Mail,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function ProblemSection() {
  const cards = [
    {
      icon: Workflow,
      title: "Too many apps",
      desc: "Your wealth flow is spread across 5 disparate banks, 3 credit card cards, and 10 investment apps. No wonder you are constantly confused."
    },
    {
      icon: EyeOff,
      title: "Zero clarity",
      desc: "A raw table list of past digital expenditures is just unorganized data, not intelligence. You need to immediately understand the underlying 'why'."
    },
    {
      icon: Hourglass,
      title: "Static & Dead",
      desc: "Traditional historic logs only reflect where your funds went yesterday. Billy is live in the present, projecting your next 90 days."
    }
  ];

  return (
    <section className="py-24 bg-surface-container-low rounded-t-[3.5rem] border-t border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-error font-black tracking-widest text-xs uppercase mb-3 block">THE CONFLATION</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none font-headline text-on-surface">
              Tracking is <br />
              <span className="text-stone-400 font-extrabold italic">not control.</span>
            </h2>
          </div>
          <p className="text-on-surface-variant max-w-md text-base md:text-lg leading-relaxed font-semibold">
            Traditional AI personal finance platforms are just glorified, glorified color-coded spreadsheets. They tell you exactly what you <span className="italic text-on-surface underline">already spent</span>, but fail on what you need to <span className="font-black text-primary">do next</span>.
          </p>
        </div>

        {/* 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <div 
              key={idx} 
              className="p-8 bg-surface-container-lowest rounded-3xl border border-outline-variant/5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-outline-variant/20 hover:-translate-y-1 relative overflow-hidden group"
            >
              <div className="bg-red-500/10 text-error p-3.5 rounded-2xl w-fit mb-6 transition-colors group-hover:bg-error group-hover:text-white">
                <card.icon size={22} />
              </div>
              <h3 className="text-xl font-black mb-3 tracking-tight text-on-surface">
                {card.title}
              </h3>
              <p className="text-on-surface-variant text-xs leading-relaxed font-semibold">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Connect",
      desc: "Securely link your accounts in 30 seconds with read-only access. We enforce bank-level 256-bit encryption with zero storage of login details."
    },
    {
      num: "02",
      title: "Analyze",
      desc: "Our financial brain analyzes your historic transaction curves, detecting subscription loops and underlying velocity profiles."
    },
    {
      num: "03",
      title: "Act",
      desc: "Get an interactive predictive dashboard for your money. Billy recommends targeted saving adjustments, letting you decide with high clarity."
    }
  ];

  return (
    <section className="py-28 bg-stone-900 border-b border-stone-800 text-stone-100 rounded-b-[4rem] relative overflow-hidden" id="how-it-works">
      
      {/* Decorative vectors */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/20 blur-[130px] rounded-full pointers-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-20 text-center font-headline text-stone-100">
          Simple. Smart. <span className="text-primary italic">Billy.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-2">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="text-8xl font-black text-[#59ee50]/10 absolute -top-14 -left-4 font-headline select-none group-hover:text-[#59ee50]/15 transition-colors">
                {step.num}
              </div>
              
              <div className="relative pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 bg-[#59ee50] rounded-full" />
                  <h3 className="text-2xl font-black text-stone-100 tracking-tight font-headline">
                    {step.title}
                  </h3>
                </div>
                <p className="text-stone-400 text-sm leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export function GoatMode() {
  return (
    <section className="py-32 overflow-hidden bg-black border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        {/* Animated Trophy badge */}
        <motion.div
          animate={{ rotateY: [0, 180, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] p-4 rounded-full mb-6 border border-[#D4AF37]/20 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
        >
          <ThrottledTrophy />
        </motion.div>

        <h2 className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-4 font-black font-headline text-[#D4AF37] select-none leading-none">
          GOAT MODE
        </h2>
        <p className="text-[#D4AF37] tracking-[0.3em] font-mono text-sm md:text-base font-black mb-12 uppercase">
          ✦ Coming Soon ✦
        </p>

        {/* Feature Teasers */}
        <div className="max-w-2xl mx-auto grid grid-cols-3 gap-4 text-left font-mono">
          <div className="p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl text-center">
            <span className="block text-[10px] text-stone-500 uppercase tracking-widest font-black">Feature</span>
            <span className="text-xs font-bold text-stone-300">Auto-Sweep Hedge</span>
          </div>
          <div className="p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl text-center">
            <span className="block text-[10px] text-stone-500 uppercase tracking-widest font-black">AI Trigger</span>
            <span className="text-xs font-bold text-stone-300">Macro Arbitrage</span>
          </div>
          <div className="p-4 bg-white/[0.02] border border-white/[0.04] rounded-xl text-center">
            <span className="block text-[10px] text-stone-500 uppercase tracking-widest font-black">Accuracy</span>
            <span className="text-xs font-bold text-stone-300">99.2% Predictive</span>
          </div>
        </div>

      </div>
    </section>
  );
}

// Auxiliary Subcomponent to avoid any issues
function ThrottledTrophy() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trophy">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
      <path d="M12 2a6 6 0 0 0-6 6v3.5c0 1.63 1.25 2.97 2.83 3.14a4.99 4.99 0 0 0 6.34 0c1.58-.17 2.83-1.51 2.83-3.14V8a6 6 0 0 0-6-6z" stroke="#D4AF37" />
    </svg>
  );
}


export function EarlyAccess() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [phase, setPhase] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMsg(null);
    setPhase('sending');

    try {
      const { submitEarlyAccessEmail } = await import('../lib/supabase');

      await submitEarlyAccessEmail(email);

      setPhase('sent');
      await new Promise((r) => setTimeout(r, 650));
      setSuccess(true);
      setEmail('');
    } catch (err: unknown) {
      const code =
        err &&
        typeof err === 'object' &&
        'code' in err &&
        typeof (err as { code: unknown }).code === 'string'
          ? (err as { code: string }).code
          : null;

      if (code === 'duplicate' || code === 'unavailable' || code === 'invalid') {
        const { earlyAccessUserMessage } = await import('../lib/supabase');
        setErrorMsg(earlyAccessUserMessage(code));
      } else {
        console.error('[early-access] unexpected error', err);
        setErrorMsg('Something went wrong. Please try again in a moment.');
      }
      setPhase('idle');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 max-w-7xl mx-auto px-6" id="beta">
      <div className="bg-primary-container rounded-3xl p-12 md:p-24 text-center relative overflow-hidden shadow-xl border border-[#006b0a]/10">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-tertiary-container/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 leading-[0.85] font-headline text-on-primary-container">
            Take control of your money{' '}
            <span className="italic text-primary">today.</span>
          </h2>

          <p className="text-lg md:text-xl text-on-primary-container/85 font-semibold mb-12 leading-relaxed">
            Join 25,000+ forward-thinking individuals who have upgraded their
            personal financial brains. Zero setup friction, full 90-day sandbox
            trial inside.
          </p>

          <AnimatePresence mode="wait">
            {!success ? (
              <motion.div
                key="form-wrap"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
              >
                <motion.form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto relative"
                >
                  <input
                    required
                    type="email"
                    value={email}
                    disabled={isSubmitting}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-6 py-5 rounded-full border-0 bg-white focus:ring-3 focus:ring-primary text-on-surface placeholder-stone-400 font-bold text-sm shadow-sm disabled:opacity-70"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative overflow-hidden bg-primary text-on-primary px-10 py-5 rounded-full font-black text-sm uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/35 flex items-center justify-center gap-2 cursor-pointer shrink-0 disabled:opacity-80 disabled:hover:scale-100"
                  >
                    <AnimatePresence mode="wait">
                      {phase === 'sending' || phase === 'sent' ? (
                        <motion.span
                          key="plane"
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, x: -8 }}
                          animate={
                            phase === 'sent'
                              ? { opacity: 0, x: 48, y: -28, rotate: 18 }
                              : { opacity: 1, x: 0, y: 0, rotate: 0 }
                          }
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <Send size={16} />
                          Sending
                        </motion.span>
                      ) : (
                        <motion.span
                          key="label"
                          className="flex items-center gap-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, x: 12 }}
                        >
                          Get Early Access <Send size={14} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.form>

                {/* Mail trail while sending */}
                <AnimatePresence>
                  {phase === 'sending' && (
                    <motion.div
                      className="mt-6 flex justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        className="flex items-center gap-2 text-on-primary-container/70 text-xs font-bold uppercase tracking-widest"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      >
                        <Mail size={14} />
                        Delivering to Billy HQ
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {errorMsg && (
                  <p className="mt-4 text-sm font-bold text-red-700">{errorMsg}</p>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 24, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', duration: 0.55, bounce: 0.3 }}
                className="bg-white/95 rounded-3xl p-8 max-w-md mx-auto shadow-xl border border-primary/20"
              >
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', delay: 0.1, bounce: 0.45 }}
                  className="bg-primary/10 text-primary w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle size={28} />
                </motion.div>
                <h4 className="text-xl font-black text-[#005406] mb-2 font-headline">
                  Mail received!
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed font-semibold mb-4">
                  You are on the Billy Priority List. We saved your email and will
                  send beta access details to your inbox soon.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSuccess(false);
                    setPhase('idle');
                  }}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  Register another email
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 opacity-70">
            <span className="text-xs font-black uppercase tracking-widest text-[#003e03] flex items-center gap-1.5">
              <Lock size={12} /> Bank-level Security
            </span>
            <span className="text-xs font-black uppercase tracking-widest text-[#003e03] flex items-center gap-1.5">
              <BadgeCheck size={12} /> SOC2 Compliant
            </span>
            <span className="text-xs font-black uppercase tracking-widest text-[#003e03] flex items-center gap-1.5">
              <ClipboardCheck size={12} /> 256-bit Encryption
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const links = ['Privacy', 'Terms', 'Security', 'Contact'];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Billy | AI Financial Brain',
        text: 'I am taking control of my money with Billy, the AI financial brain.',
        url: window.location.href
      }).catch(err => console.log(err));
    } else {
      alert("Billing shared! Link copied: " + window.location.href);
    }
  };

  return (
    <footer className="bg-stone-50 border-t border-outline-variant/10 rounded-t-[3rem] mt-20">
      <div className="w-full px-8 py-14 flex flex-col md:flex-row justify-between items-center gap-8 max-w-7xl mx-auto">
        
        {/* Brand info */}
        <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
          <div className="text-xl font-black text-stone-900 tracking-tighter flex items-center">
            <img 
              alt="Billy" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQSLGAmoNs3wioZdRbZ3B97qEd-bKRXHFJBQNUBiAWBoEvsgussiSiRq737suVApl_ehqXSZfOtAkGiLjuLnWj6B2U08JAas4JzIJ_RB3O08vhxnTtVI015GgwEASTWDPVvBzI3dzbaiGKX6xnkgJy-4LhXvv9QVSUoeBoEZU21xzXQ7m1MM4EYb8iNXpLYhHhmhwNA65YXaUsjkw2BjY1XEntg9DmyThdVyja3AVQC6-OncSkzuUnverulvYAPH4lOe9LORtbnq1o" 
              className="h-6 w-6 mr-1.5 inline-block"
            />
            Billy
          </div>
          <p className="font-body text-[10px] uppercase font-bold tracking-widest text-stone-400">
            © 2026 Billy AI. Built for the Living Ledger.
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap gap-x-8 gap-y-2 justify-center md:justify-end">
          {links.map((link, idx) => (
            <a 
              key={idx} 
              href="#"
              onClick={(e) => e.preventDefault()}
              className="font-body text-xs font-black uppercase tracking-widest text-stone-500 hover:text-primary transition-all hover:opacity-80"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Buttons */}
        <div className="flex gap-4">
          <button 
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary/10 hover:text-primary transition-all cursor-pointer"
            title="Share App"
          >
            <Share2 size={16} />
          </button>
          
          <button 
            onClick={() => alert("System is calibrated with global UTC database indices.")}
            className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-[#19edfd]/15 hover:text-tertiary transition-all cursor-pointer"
            title="Calibrate System Settings"
          >
            <Globe2 size={16} />
          </button>
        </div>

      </div>
    </footer>
  );
}
