/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Sparkles, TrendingUp, Activity, Bell } from 'lucide-react';
import { motion } from 'motion/react';

const HOLOGRAM_LIGHT_LEFT_OFFSET = 88;
const HOLOGRAM_LOGO_LEFT_OFFSET = 36;
const HOLOGRAM_TEXT_LEFT_OFFSET = 36;

const BILLY_LOGO =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCQSLGAmoNs3wioZdRbZ3B97qEd-bKRXHFJBQNUBiAWBoEvsgussiSiRq737suVApl_ehqXSZfOtAkGiLjuLnWj6B2U08JAas4JzIJ_RB3O08vhxnTtVI015GgwEASTWDPVvBzI3dzbaiGKX6xnkgJy-4LhXvv9QVSUoeBoEZU21xzXQ7m1MM4EYb8iNXpLYhHhmhwNA65YXaUsjkw2BjY1XEntg9DmyThdVyja3AVQC6-OncSkzuUnverulvYAPH4lOe9LORtbnq1o';

const BRAIN_MATRIX_BG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBy9E0vfcgD1AUYrc3C75usDKZhRBM9ajRrtyMaZBbp1vnkzhfnsN9Ay4DGfEz7zUrlshC2CmReWDD1rpw4-PV25uw5_Y9bNk54syGfzA9yBngO1nOK5C18xcgnBHEMcpvYMm7nQXV6foAbwFY-coSpUfFvNXDMLmoNqDGucHYbO4EOZBNB4uhbVog4l5shW7TOzUTgs477_1kICgImKeTJlPEOChp290AqSqOj96MaI6bsf_4fswmVLGqLT1sBZJ-Yy1r0ZqN39C96';

export default function Hero() {
  return (
    <section className="relative pt-12 pb-24 overflow-x-hidden bg-surface">
      
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

        {/* Holographic Phone with Billy AI projection */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          className="relative w-full h-[640px] flex items-center justify-center perspective-[1200px] overflow-visible"
        >
          <div className="absolute inset-0 bg-primary-container/10 blur-[100px] rounded-full" />

          <motion.div
            initial={{ rotateX: 60, rotateY: 0, rotateZ: -35 }}
            animate={{
              rotateX: [60, 58, 60],
              rotateZ: [-35, -34, -35],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative w-[280px] h-[580px] z-10"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div
              className="absolute inset-0 bg-stone-900 rounded-[3rem] shadow-[20px_20px_60px_rgba(0,0,0,0.15),-20px_-20px_60px_rgba(255,255,255,0.5)] border-[8px] border-stone-800 flex items-center justify-center overflow-visible"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-stone-950 rounded-[2.5rem] overflow-hidden border border-stone-700">
                <div className="p-4 h-full flex flex-col relative">
                  <div className="w-14 h-1 bg-stone-800 mx-auto rounded-full mb-4 shrink-0" />

                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage:
                        'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                      backgroundSize: '16px 16px',
                    }}
                  />

                  {/* Mini app header */}
                  <div className="flex items-center gap-1.5 mb-3 relative z-10 shrink-0">
                    <img alt="" src={BILLY_LOGO} className="w-5 h-5 object-contain" />
                    <span className="text-[10px] font-black text-stone-200">Billy</span>
                    <span className="ml-auto flex items-center gap-1 text-[7px] font-bold uppercase tracking-wider text-primary-container bg-primary-container/10 px-1.5 py-0.5 rounded-full">
                      <Activity size={8} className="animate-pulse" />
                      Brain Active
                    </span>
                  </div>

                  {/* Pseudo bento tiles — brain section mini */}
                  <div className="grid grid-cols-2 gap-1.5 relative z-10 flex-1 min-h-0">
                    <div className="col-span-2 bg-[#041a05] rounded-xl p-2 border border-white/5 relative overflow-hidden">
                      <div
                        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
                        style={{
                          backgroundImage: `url("${BRAIN_MATRIX_BG}")`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                      <div className="relative">
                        <span className="text-[7px] font-bold uppercase tracking-wider text-stone-400 block">
                          90-Day Simulation
                        </span>
                        <span className="text-[9px] font-black text-white leading-tight block">
                          Predictive Cash Flow
                        </span>
                        <div className="mt-1.5 h-8 w-full bg-white/[0.03] border border-white/5 rounded-lg p-1 flex items-end">
                          <svg viewBox="0 0 80 24" className="w-full h-full" preserveAspectRatio="none">
                            <path
                              d="M0 18 C10 16, 15 8, 25 10 S45 4, 55 6 S70 2, 80 4"
                              fill="none"
                              stroke="#59ee50"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M0 18 C10 16, 15 8, 25 10 S45 4, 55 6 S70 2, 80 4 L80 24 L0 24 Z"
                              fill="url(#heroChartFill)"
                              opacity="0.35"
                            />
                            <defs>
                              <linearGradient id="heroChartFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#59ee50" />
                                <stop offset="100%" stopColor="#59ee50" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                        <span className="text-[8px] font-mono font-bold text-[#59ee50] mt-1 block">
                          ₹2,18,400 projected
                        </span>
                      </div>
                    </div>

                    <div className="bg-stone-800/70 rounded-xl p-2 border border-stone-700/50">
                      <span className="text-[7px] font-bold uppercase tracking-wider text-primary-container bg-primary/30 px-1 py-0.5 rounded-full inline-block mb-1">
                        Context
                      </span>
                      <span className="text-[8px] font-black text-stone-200 block leading-tight">
                        External Inputs
                      </span>
                      <div className="mt-1.5 space-y-1">
                        <div className="h-1 bg-stone-700 rounded-full overflow-hidden">
                          <div className="h-full w-[68%] bg-primary-container rounded-full" />
                        </div>
                        <div className="h-1 bg-stone-700 rounded-full overflow-hidden">
                          <div className="h-full w-[42%] bg-tertiary-container rounded-full" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-stone-800/70 rounded-xl p-2 border border-stone-700/50 flex flex-col">
                      <div className="flex items-center gap-1 mb-1">
                        <Sparkles size={8} className="text-primary-container" />
                        <span className="text-[8px] font-black text-stone-200">AI Chat</span>
                      </div>
                      <div className="bg-white/10 rounded-lg px-1.5 py-1 text-[6px] text-stone-300 leading-snug flex-1">
                        Can I afford Goa next month?
                      </div>
                    </div>

                    <div className="col-span-2 bg-amber-950/50 rounded-xl px-2 py-1.5 border border-amber-500/25 flex items-center gap-1.5">
                      <Bell size={9} className="text-amber-400 shrink-0" />
                      <div className="min-w-0">
                        <span className="text-[7px] font-black text-amber-200 block leading-tight">
                          Smart Alert
                        </span>
                        <span className="text-[6px] text-amber-300/80 truncate block">
                          Deficit threat — review subscriptions
                        </span>
                      </div>
                      <TrendingUp size={9} className="text-emerald-400 ml-auto shrink-0" />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="absolute top-[40%] left-1/2 z-20"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: 'translateX(-50%) translateY(-50%) rotateX(-90deg) translateZ(24px)',
                }}
              >
                {/* Hologram light beam — offset left to align with phone screen */}
                <div
                  className="absolute bottom-0 left-1/2"
                  style={{ transform: `translateX(calc(-50% - ${HOLOGRAM_LIGHT_LEFT_OFFSET}px))` }}
                >
                  <motion.div
                    initial={{ opacity: 0.5, scaleY: 0.8 }}
                    animate={{ opacity: [0.4, 0.7, 0.4], scaleY: [0.9, 1.1, 0.9] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute bottom-0 left-1/2 w-48 h-80 origin-bottom"
                    style={{
                      transform: 'translateX(-50%)',
                      background:
                        'linear-gradient(to top, rgba(89, 238, 80, 0.8) 0%, rgba(89, 238, 80, 0.1) 40%, transparent 100%)',
                      clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
                      filter: 'blur(8px)',
                    }}
                  />

                  <motion.div
                    animate={{ scale: [1, 1.5, 2], opacity: [0.8, 0, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                    className="absolute bottom-0 left-1/2 w-24 h-24 rounded-full border-2 border-primary-container"
                    style={{ transform: 'translateX(-50%) rotateX(75deg)' }}
                  />
                  <motion.div
                    animate={{ scale: [1, 1.5, 2], opacity: [0.8, 0, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
                    className="absolute bottom-0 left-1/2 w-24 h-24 rounded-full border-2 border-primary-container"
                    style={{ transform: 'translateX(-50%) rotateX(75deg)' }}
                  />
                </div>

                {/* Transparent holographic Billy logo — aligned to beam angle */}
                <motion.div
                  animate={{
                    y: [-40, -58, -40],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-[10.5rem] left-1/2 flex items-center justify-center pointer-events-none"
                  style={{
                    transformStyle: 'preserve-3d',
                    x: `calc(-50% - ${HOLOGRAM_LOGO_LEFT_OFFSET}px)`,
                    z: 72,
                  }}
                >
                  <div className="relative w-28 h-28">
                    <motion.div
                      className="absolute inset-0 bg-primary-container/35 blur-2xl rounded-full scale-125"
                      animate={{ scale: [1.15, 1.35, 1.15], opacity: [0.3, 0.55, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <img
                      alt=""
                      aria-hidden
                      src={BILLY_LOGO}
                      className="absolute inset-0 w-full h-full object-contain opacity-35 blur-[2px] scale-110"
                    />
                    <img
                      alt="Billy Logo"
                      src={BILLY_LOGO}
                      className="relative w-full h-full object-contain opacity-[0.82]"
                      style={{
                        filter:
                          'drop-shadow(0 0 16px rgba(89,238,80,0.95)) drop-shadow(0 0 32px rgba(89,238,80,0.45)) saturate(1.2)',
                      }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [-20, -30, -20], opacity: [0.55, 0.95, 0.55] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute bottom-20 left-1/2 whitespace-nowrap text-primary-container font-mono font-bold tracking-widest text-lg"
                  style={{
                    x: `calc(-50% - ${HOLOGRAM_TEXT_LEFT_OFFSET}px)`,
                    z: 56,
                    textShadow: '0 0 10px #59ee50, 0 0 22px #59ee50',
                  }}
                >
                  BILLY. AI
                </motion.div>
              </div>
            </div>

            <div className="absolute -bottom-10 -left-10 w-[300px] h-[300px] bg-black/10 blur-3xl transform -translate-z-20 rounded-full" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
