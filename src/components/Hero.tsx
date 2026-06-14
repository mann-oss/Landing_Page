/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Zap, Sparkles, TrendingUp, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative pt-12 pb-24 overflow-hidden bg-surface">
      
      {/* Decorative Blur Background Element */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-container/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute -top-12 left-1/4 w-80 h-80 bg-tertiary-container/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Copy block */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10"
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary-container text-on-primary-container rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-primary/10">
            <Sparkles size={11} className="text-primary animate-pulse" />
            The Living Ledger
          </span>

          {/* Heading */}
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.95] text-on-surface mb-8 font-headline">
            This isn't tracking. This is <span className="text-primary italic font-black">control.</span>
          </h1>

          {/* Paragraph explanation */}
          <p className="text-lg md:text-xl text-on-surface-variant max-w-lg mb-10 leading-relaxed font-semibold">
            Meet Billy, your AI financial brain. We don't just log historic transactions—we map your 90-day cash trajectory, predict market impacts, and help you decide your next financial move.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#beta" 
              className="bg-primary text-on-primary px-10 py-5 rounded-full font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/25 text-center flex items-center justify-center gap-2"
            >
              Join Free Beta 
            </a>
            <a 
              href="#brain-section"
              className="bg-surface-container-highest text-on-surface px-10 py-5 rounded-full font-black text-lg hover:bg-surface-container-high transition-all text-center flex items-center justify-center border border-outline-variant/15"
            >
              Analyze the Brain
            </a>
          </div>
        </motion.div>

        {/* Right Preview Card block with 3D layers and Mascot */}
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="relative lg:pl-6"
        >
          {/* Main Card Backdrop and Image */}
          <div className="relative bg-white rounded-3xl p-4 shadow-2xl transition-all duration-500 hover:rotate-3 hover:scale-102 border border-outline-variant/10">
            
            {/* The Floating Mascot Billy */}
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 2, -2, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-16 -right-10 w-28 h-28 z-30 filter drop-shadow-2xl cursor-pointer"
            >
              <img 
                alt="Billy Mascot" 
                className="w-full h-full object-contain" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8D7Z0rAuOPgRap-D6sFkaeNBwBnO6BCJvRyakBzKtDTTDakW1k9iXBn3GHYvtozWdlGoRom07E3iqI1LDTInrLTrgm6b3UJxO9UQff59pSQWGUTYfw2Lero5XLMgBFWJSTTXSkewbvQ_s99Z_IpxxLYI-x_URfDQTtkfFTVrVs5gNy0FbaLX2zn3CdgdPj9f7Syp9_tWe9UXk-m5SJkHkNaWlJjC1cba8rbv9hBKuTwtRu0wqleHdTEu5ZNGsmtZCugz4b4Pt9xuX" 
              />
            </motion.div>

            {/* Dashboard Demo Picture Block */}
            <div className="overflow-hidden rounded-2xl border border-outline-variant/10 shadow-sm bg-stone-50">
              <img 
                alt="Billy Dashboard Interface Preview" 
                className="w-full h-auto object-cover" 
                src="https://lh3.googleusercontent.com/aida/ADBb0ujuvUN43hhxa3BIeesUt60S47yjt7W98KE5zsHAK5wt6gtdIIMgaQfoWvY7-ZEFb5Vtvf8u2dIzM-cC4r4kl-ZbRk4QqJX1wyf3mfk_rH2ycalFqzUxVUfCEmHSOpJOJk6EmtSNBajHpzgCQg-TJ9CVGIE6NajWBnQYWmmvODy4vRNeNNtx0G_cwz8mr4m0Zo-792hYxBW7wS3FfmL2XeJhBePvO7dDIkjrmjxyFOoCVw9gfH9vgxg1TNOxK2aU0ocTu3c5xi2m6A" 
              />
            </div>

            {/* Dynamic floating AI Insight card inside standard Hero */}
            <motion.div 
              style={{ x: -15, y: 15 }}
              animate={{ 
                y: [15, 10, 15] 
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="absolute -bottom-6 -left-6 bg-tertiary-container/95 text-on-tertiary-container backdrop-blur-md p-5 rounded-2xl shadow-xl max-w-[260px] border border-tertiary/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#003e03] text-primary-fixed p-1 rounded-lg">
                  <Zap size={14} className="fill-current text-[#59ee50]" />
                </span>
                <span className="font-extrabold text-xs uppercase tracking-widest text-[#003f44]">
                  AI Ledger Insight
                </span>
              </div>
              
              <p className="text-xs leading-relaxed font-bold text-on-tertiary-container">
                "Hey! Based on subscription outflows, you can claim back ₹37,000 more this quarter by toggling Billy Pro's Auto-Pruning."
              </p>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
