/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { CheckCircle2, ShieldCheck, Sparkles, X, HeartHandshake } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
  };

  return (
    <section className="py-24 bg-surface-container-low" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 font-headline text-on-surface">
            Simple, transparent.
          </h2>
          <p className="text-on-surface-variant font-bold text-sm uppercase tracking-wider">
            Choose the brain that fits your lifestyle.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className={`text-xs font-bold ${billingCycle === 'monthly' ? 'text-primary' : 'text-stone-400'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(c => c === 'monthly' ? 'yearly' : 'monthly')}
              className="w-12 h-6 bg-stone-300 rounded-full p-1 transition-all relative flex items-center"
            >
              <div className={`w-4 h-4 rounded-full bg-primary transition-transform ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <span className={`text-xs font-bold ${billingCycle === 'yearly' ? 'text-primary' : 'text-stone-400'} flex items-center gap-1`}>
              Annual Saver <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-black">SAVE 20%</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-2">
          
          {/* Billy Free Card */}
          <div className="bg-surface-container-lowest p-10 rounded-3xl shadow-sm border border-outline-variant/10 flex flex-col justify-between hover:border-outline-variant/35 transition-all">
            <div>
              <h3 className="text-2xl font-black mb-2 tracking-tight text-on-surface">
                Billy Free
              </h3>
              <p className="text-xs text-on-surface-variant font-medium mb-6">
                Clean and fundamental single-ledger tracking.
              </p>
              
              <div className="text-4xl font-extrabold font-headline mb-6 text-on-surface">
                ₹0 <span className="text-sm font-bold text-on-surface-variant">/mo</span>
              </div>
              
              <ul className="space-y-4 mb-10 text-left border-t border-outline-variant/10 pt-6">
                <li className="flex items-center gap-2.5 text-xs font-bold text-on-surface-variant">
                  <CheckCircle2 size={16} className="text-tertiary" />
                  <span>Limited OCR Receipts</span>
                </li>
                <li className="flex items-center gap-2.5 text-xs font-bold text-on-surface-variant">
                  <CheckCircle2 size={16} className="text-tertiary" />
                  <span>Basic AI insights & recommendations</span>
                </li>
                <li className="flex items-center gap-2.5 text-xs font-bold text-on-surface-variant">
                  <CheckCircle2 size={16} className="text-tertiary" />
                  <span>3-day cash prediction window</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => handleSelectPlan('Billy Free')}
              className="w-full py-4 rounded-full border-2 border-surface-container-highest font-black text-xs uppercase tracking-widest hover:bg-surface-container-high transition-all text-on-surface cursor-pointer"
            >
              Get Started
            </button>
          </div>

          {/* Billy Pro Card (Highlighted Dark Theme) */}
          <div className="bg-[#051a05] text-stone-200 p-10 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col justify-between border-2 border-primary transform md:-translate-y-4 hover:scale-[1.02] transition-transform">
            
            {/* Absolute badge */}
            <div className="absolute top-0 right-0 bg-primary text-on-primary font-black uppercase text-[10px] tracking-widest px-4 py-1.5 rounded-bl-2xl">
              Most Selected
            </div>

            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Billy Pro
                </h3>
                <Sparkles size={16} className="text-[#59ee50] animate-bounce" />
              </div>
              <p className="text-xs text-stone-400 font-medium mb-6">
                Ultimate ML predictions and adaptive cash controllers.
              </p>
              
              <div className="text-4xl font-extrabold font-headline mb-6 text-[#59ee50]">
                {billingCycle === 'monthly' ? '₹50' : '₹40'}{' '}
                <span className="text-sm font-bold text-stone-400">/mo</span>
                {billingCycle === 'yearly' && (
                  <span className="block text-[11px] text-stone-400 font-medium mt-1">Billed annually (₹480)</span>
                )}
              </div>
              
              <ul className="space-y-4 mb-10 text-left border-t border-white/10 pt-6">
                <li className="flex items-start gap-2.5 text-xs font-bold text-stone-200">
                  <CheckCircle2 size={16} className="text-[#59ee50] shrink-0 mt-0.5" />
                  <span>Unlimited OCR Receipt parsing</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs font-bold text-stone-200">
                  <CheckCircle2 size={16} className="text-[#59ee50] shrink-0 mt-0.5" />
                  <span>AI Assistant Chat (Fully Integrated Beta)</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs font-bold text-stone-200">
                  <CheckCircle2 size={16} className="text-[#59ee50] shrink-0 mt-0.5" />
                  <span>Interactive behavior modification controllers</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs font-bold text-stone-200">
                  <CheckCircle2 size={16} className="text-[#59ee50] shrink-0 mt-0.5" />
                  <span>Early access to premium discuss hubs & custom notes</span>
                </li>
                <li className="flex items-start gap-2.5 text-xs font-bold text-stone-200">
                  <CheckCircle2 size={16} className="text-[#59ee50] shrink-0 mt-0.5" />
                  <span>Enhanced 90-day predictive engine modeling</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => handleSelectPlan('Billy Pro')}
              className="w-full py-4 rounded-full bg-primary text-on-primary font-black text-xs uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-primary/20"
            >
              Go Pro Now
            </button>
          </div>

        </div>

      </div>

      {/* Plan selection dialog container */}
      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative text-center border border-outline-variant/10"
            >
              <button 
                onClick={() => setSelectedPlan(null)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                <HeartHandshake size={24} />
              </div>

              <h4 className="text-xl font-black text-on-surface mb-2 font-headline">
                Welcome to {selectedPlan}!
              </h4>
              
              <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
                Thank you for selecting {selectedPlan} ({billingCycle === 'monthly' ? 'Monthly Plan' : 'Annual Saver'}). Your sandboxed account is synchronized and fully activated with 90-day ML predictive ledger access!
              </p>

              <button 
                onClick={() => setSelectedPlan(null)}
                className="bg-primary text-on-primary font-black text-xs uppercase tracking-widest px-8 py-3.5 rounded-full w-full hover:scale-105 active:scale-95 transition-transform"
              >
                Launch Live Dashboard
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
