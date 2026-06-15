import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ScanLine, Users, Activity, Receipt, MapPin, Utensils, Zap, AlertTriangle, ArrowRight, CheckCircle } from 'lucide-react';

export function CombinedStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeStage, setActiveStage] = useState(0);
  const [currentDisplay, setCurrentDisplay] = useState(12400);

  // Map scroll progress to 5 stages (0 to 4)
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (v < 0.2) setActiveStage(0); // Messy Spending
      else if (v < 0.4) setActiveStage(1); // Captured
      else if (v < 0.6) setActiveStage(2); // Shared
      else if (v < 0.8) setActiveStage(3); // Pattern
      else setActiveStage(4); // Decision Ready
    });
  }, [scrollYProgress]);

  // Animated Numbers Engine
  // Starting balance: 12400
  // Stage 1 to 2 -> subtract total Cab & Restaurant (2860) -> 9540
  // Stage 2 to 3 -> Identify Riya's share (+1080) -> 10620
  // Stage 3 to 4 -> Identify weekend food (-2220) -> 8400
  const rawBalance = 12400;
  
  const expenseDrop = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);
  const splitReturn = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);
  const patternDrop = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);

  useEffect(() => {
    const unsub1 = expenseDrop.on("change", v => setCurrentDisplay(rawBalance - (2860 * v)));
    const unsub2 = splitReturn.on("change", v => setCurrentDisplay(rawBalance - 2860 + (1080 * v)));
    const unsub3 = patternDrop.on("change", v => setCurrentDisplay(rawBalance - 2860 + 1080 - (2220 * v)));

    return () => { unsub1(); unsub2(); unsub3(); };
  }, [expenseDrop, splitReturn, patternDrop]);

  const STAGES = [
    { label: "Messy Spending", desc: "Your money leaves clues." },
    { label: "Captured automatically", desc: "Scan a receipt, add an expense." },
    { label: "Shared fairly", desc: "Shared the moment? Billy remembers." },
    { label: "Pattern identified", desc: "One payment means little. The pattern means everything." },
    { label: "Decision ready", desc: "Billy explains what it means." }
  ];

  return (
    <section className="bg-surface relative border-y border-outline-variant/20" ref={containerRef}>
      
      {/* Intro Copy */}
      <div className="pt-32 pb-16 px-6 max-w-4xl mx-auto text-center relative z-20">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-on-surface mb-6 font-headline leading-tight">
          Your money leaves clues.<br/>
          <span className="text-primary italic">Billy connects them.</span>
        </h2>
        <p className="text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed max-w-2xl mx-auto">
          From scanned receipts and shared expenses to everyday UPI payments, Billy understands the small decisions shaping your financial life.
        </p>
      </div>

      {/* The Scroll Container Space */}
      <div className="h-[400vh] relative w-full">
        
        {/* Sticky viewport content */}
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-surface">
          
          {/* Active Balance Display */}
          <div className="absolute top-[10%] md:top-[15%] text-center z-30 transition-all duration-700 w-full px-6">
             <motion.div 
               className={`font-mono font-black text-5xl md:text-7xl tracking-tighter ${activeStage === 4 ? 'text-primary scale-110 drop-shadow-md' : 'text-on-surface'}`}
               transition={{ duration: 0.5 }}
             >
               ₹{Math.round(currentDisplay).toLocaleString('en-IN')}
             </motion.div>
             <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mt-3">
               {activeStage === 4 ? 'Safely Available' : 'Current Calculation'}
             </div>
          </div>
          
          {/* Visual Interaction Arena */}
          <div className="relative w-full max-w-5xl aspect-[4/5] md:aspect-[21/9] flex items-center justify-center -mt-10 md:mt-12 px-4 md:px-6 z-10 pointer-events-none">
             
             {/* STAGE 0 */}
             <AnimatePresence>
               {activeStage === 0 && (
                 <motion.div 
                   initial={{ opacity: 0 }} 
                   animate={{ opacity: 1 }} 
                   exit={{ opacity: 0, scale: 1.1, filter: "blur(4px)" }}
                   className="absolute inset-0 flex items-center justify-center"
                 >
                   {/* Elements floating cluster */}
                   <motion.div animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute left-[5%] md:left-[10%] top-[15%] bg-surface-container p-4 rounded-xl shadow-lg border border-outline-variant/30 transform -rotate-12 z-10">
                     <Receipt className="text-on-surface-variant mb-2" />
                     <div className="w-20 h-2 bg-on-surface-variant/20 rounded mb-1" />
                     <div className="w-12 h-2 bg-on-surface-variant/20 rounded" />
                   </motion.div>
                   
                   <motion.div animate={{ y: [0, 15, 0], x: [0, -5, 0], rotate: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute right-[5%] md:right-[15%] top-[10%] bg-error/10 text-error px-4 py-2 rounded-xl border border-error/20 shadow-md font-mono font-bold text-sm transform rotate-6 z-20">
                     -₹780 UPI
                   </motion.div>

                   <motion.div animate={{ y: [0, 5, 0], rotate: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3.5 }} className="absolute left-[20%] md:left-[30%] top-[5%] bg-surface-container-high p-3 rounded-xl border border-outline-variant/30 shadow-lg flex items-center gap-2 transform rotate-12 z-0">
                     <Utensils size={16} className="text-error" />
                     <span className="text-xs font-bold text-on-surface text-center">Weekend Food<br/><span className="text-error">-₹1,450</span></span>
                   </motion.div>

                   <motion.div animate={{ y: [0, -15, 0], x: [0, 10, 0], rotate: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 6 }} className="absolute right-[25%] md:right-[35%] top-[25%] bg-amber-500/10 text-amber-600 px-4 py-2 rounded-xl border border-amber-500/20 shadow-md font-mono font-bold text-xs transform -rotate-6 z-10">
                     Spotify Premium
                   </motion.div>
                   
                   <motion.div animate={{ y: [0, -8, 0], rotate: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="absolute right-[5%] md:right-[20%] bottom-[30%] bg-surface-container-high p-3 rounded-xl border border-outline-variant/30 shadow-lg flex items-center gap-2 z-20">
                     <MapPin size={16} className="text-amber-500" />
                     <span className="text-xs font-bold text-on-surface">Shared Cab</span>
                   </motion.div>
                   
                   <motion.div animate={{ y: [0, 10, 0], rotate: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 4.5 }} className="absolute left-[10%] md:left-[20%] bottom-[25%] bg-blue-500/10 text-blue-600 px-4 py-3 rounded-xl border border-blue-500/20 shadow font-mono font-bold text-sm transform -rotate-3 z-30 flex flex-col gap-1">
                     <span>Netflix Renewed</span>
                     <span className="text-xs text-blue-500">-₹649</span>
                   </motion.div>

                   <motion.div animate={{ y: [0, -12, 0], x: [0, 5, 0], rotate: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 5.5 }} className="absolute left-[35%] md:left-[45%] bottom-[10%] bg-surface-container-highest p-4 rounded-xl shadow-xl border border-outline-variant/40 transform rotate-12 z-20">
                     <Receipt className="text-on-surface-variant mb-2" size={20} />
                     <span className="text-[10px] font-bold text-on-surface uppercase block mb-1">Grocery Store</span>
                     <div className="w-16 h-1.5 bg-on-surface-variant/30 rounded mb-1" />
                     <div className="w-24 h-1.5 bg-on-surface-variant/30 rounded mb-1" />
                     <div className="w-10 h-1.5 bg-on-surface-variant/30 rounded" />
                   </motion.div>

                   <motion.div animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }} transition={{ repeat: Infinity, duration: 2.5 }} className="absolute right-[25%] md:right-[40%] bottom-[15%] bg-emerald-500/10 text-emerald-600 px-3 py-1.5 rounded-lg border border-emerald-500/20 shadow-sm font-mono font-bold text-[10px] transform rotate-6 z-0">
                     Salary Credited +₹82k
                   </motion.div>
                   
                   <motion.div animate={{ y: [0, 10, 0], rotate: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 4.2 }} className="absolute right-[15%] md:right-[25%] bottom-[5%] bg-error/10 text-error px-4 py-2 rounded-xl border border-error/20 shadow-md font-mono font-bold text-sm transform -rotate-12 z-20">
                     -₹320 Zomato
                   </motion.div>
                   
                   <p className="text-on-surface-variant font-bold uppercase tracking-widest text-sm text-center">Unorganized Events</p>
                 </motion.div>
               )}
             </AnimatePresence>

             {/* STAGE 1 */}
             <AnimatePresence>
               {activeStage === 1 && (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }} 
                   animate={{ opacity: 1, scale: 1 }} 
                   exit={{ opacity: 0, y: -20 }}
                   className="absolute inset-0 flex flex-col items-center justify-center z-10"
                 >
                   <div className="bg-surface p-6 rounded-2xl shadow-2xl relative overflow-hidden border border-outline-variant/30 w-72">
                     {/* OCR Scanning Laser Line */}
                     <motion.div 
                        initial={{ top: '0%' }}
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-0.5 bg-primary shadow-[0_0_12px_3px_rgba(16,185,129,0.5)] z-20 opacity-80"
                      />

                     {/* OCR Parsing Tags */}
                     <motion.div 
                        animate={{ opacity: [0, 1, 0, 0] }}
                        transition={{ duration: 3.5, repeat: Infinity, delay: 0.5, ease: "linear" }}
                        className="absolute right-4 top-[3.7rem] bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded uppercase tracking-widest z-10"
                      >
                        Itemized
                      </motion.div>

                     <div className="flex justify-between items-center mb-4 border-b border-outline-variant/20 pb-2">
                       <span className="font-bold text-on-surface flex items-center gap-2"><Utensils size={14} className="text-amber-500"/> Trattoria Dinner</span>
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
                   
                   <div className="mt-8 flex flex-col items-center gap-3">
                     <motion.div 
                       initial={{ opacity: 0, y: 5 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.3 }}
                       className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-on-surface-variant border border-outline-variant/40 px-3 py-1 rounded-full bg-surface shadow-sm"
                     >
                       <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Advanced Neural OCR
                     </motion.div>
                     <div className="flex items-center gap-2 text-primary font-bold bg-primary/5 border border-primary/20 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider shadow-sm backdrop-blur-md">
                       <ScanLine size={16} /> Receipt understood in seconds.
                     </div>
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>

             {/* STAGE 2 */}
             <AnimatePresence>
               {activeStage === 2 && (
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }} 
                   animate={{ opacity: 1, y: 0 }} 
                   exit={{ opacity: 0, scale: 0.9 }}
                   className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 w-full z-10 px-4"
                 >
                   {/* Left Side: You */}
                   <div className="bg-surface-container-low p-6 md:p-8 rounded-3xl border border-outline-variant/30 w-full md:w-[320px] shadow-sm relative overflow-hidden">
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
                   
                   {/* Separator / Arrow */}
                   <div className="w-10 h-10 hidden md:flex bg-surface border border-outline-variant/30 rounded-full items-center justify-center shrink-0 shadow-sm z-20">
                     <Users size={16} className="text-on-surface-variant" />
                   </div>

                   {/* Right Side: Riya */}
                   <div className="bg-surface p-6 md:p-8 rounded-3xl border border-secondary/30 shadow-lg w-full md:w-[320px] relative overflow-hidden">
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
             <AnimatePresence>
               {activeStage === 3 && (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }} 
                   animate={{ opacity: 1, scale: 1 }} 
                   exit={{ opacity: 0, x: -20 }}
                   className="absolute inset-0 flex items-center justify-center w-full z-10 px-4"
                 >
                   <div className="w-full max-w-2xl bg-surface-container-lowest border border-outline-variant/50 p-6 md:p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-[60px]" />
                      
                      <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest mb-8">
                        <Activity size={16} /> 7-Day Spending Pulse
                      </div>
                      
                      {/* Bar graph & Trend Line Overlay */}
                      <div className="relative h-40 md:h-48 mb-6 mt-4">
                        {/* Background Grid Lines */}
                        <div className="absolute inset-x-0 inset-y-0 pb-6 flex flex-col justify-between pointer-events-none">
                          <div className="border-b border-outline-variant/10 w-full h-0"></div>
                          <div className="border-b border-outline-variant/10 w-full h-0"></div>
                          <div className="border-b border-outline-variant/10 w-full h-0"></div>
                          <div className="border-b border-outline-variant/30 w-full h-0"></div>
                        </div>

                        {/* Chart Line connecting peaks */}
                        <svg className="absolute inset-x-0 inset-y-0 h-full w-full pointer-events-none z-0" viewBox="0 0 700 100" preserveAspectRatio="none">
                           <motion.path 
                             initial={{ pathLength: 0, opacity: 0 }}
                             animate={{ pathLength: 1, opacity: 1 }}
                             transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                             d="M 50 70 L 150 55 L 250 75 L 350 50 L 450 60 L 550 5 L 650 25"
                             fill="none"
                             stroke="rgba(16, 185, 129, 0.4)"
                             strokeWidth="4"
                             strokeLinecap="round"
                             strokeLinejoin="round"
                           />
                           <motion.path 
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             transition={{ duration: 1, delay: 1 }}
                             d="M 50 70 L 150 55 L 250 75 L 350 50 L 450 60 L 550 5 L 650 25 L 650 100 L 50 100 Z"
                             fill="url(#gradientPulse)"
                             stroke="none"
                           />
                           <defs>
                             <linearGradient id="gradientPulse" x1="0" y1="0" x2="0" y2="1">
                               <stop offset="0%" stopColor="rgba(16, 185, 129, 0.15)" />
                               <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
                             </linearGradient>
                           </defs>
                        </svg>

                        <div className="absolute inset-0 flex items-end gap-2 md:gap-4 pb-6 z-10 px-2 md:px-0">
                          {[
                            {day: 'Mon', h: '30%', val: '₹420', norm: true}, 
                            {day: 'Tue', h: '45%', val: '₹680', norm: true}, 
                            {day: 'Wed', h: '25%', val: '₹310', norm: true}, 
                            {day: 'Thu', h: '50%', val: '₹750', norm: true}, 
                            {day: 'Fri', h: '40%', val: '₹550', norm: true}, 
                            {day: 'Sat', h: '95%', val: '₹2,140', norm: false, alert: true}, 
                            {day: 'Sun', h: '75%', val: '₹1,450', norm: false, alert: true}
                          ].map((b, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full relative group">
                               <motion.div 
                                 initial={{ opacity: 0, y: 10 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ delay: 0.3 + (i * 0.1) }}
                                 className={`absolute pb-1 text-[9px] md:text-[10px] font-bold font-mono whitespace-nowrap transition-all duration-300 ${b.alert ? 'text-amber-600' : 'text-on-surface-variant/0 group-hover:text-on-surface-variant'}`}
                                 style={{ bottom: b.h }}
                               >
                                 {b.val}
                               </motion.div>
                               
                               <motion.div 
                                 initial={{ height: 0 }} 
                                 animate={{ height: b.h }} 
                                 transition={{ duration: 0.5, delay: i * 0.1, type: 'spring' }}
                                 className={`w-[70%] max-w-[40px] rounded-t-lg mx-auto transition-colors duration-300 ${b.alert ? 'bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)] hover:bg-amber-300' : 'bg-primary/20 hover:bg-primary/40'}`}
                               />
                            </div>
                          ))}
                        </div>
                        
                        {/* X-axis labels */}
                        <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-2 pt-2 border-t border-outline-variant/20">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                            <div key={i} className={`flex-1 text-center text-[10px] uppercase font-bold tracking-wider ${(i === 5 || i === 6) ? 'text-amber-600' : 'text-on-surface-variant/60'}`}>
                              {day}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Insight Panel */}
                      <div className="bg-amber-500/10 border border-amber-500/30 p-4 md:p-5 rounded-2xl flex items-start gap-3">
                        <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
                        <p className="text-sm text-on-surface leading-loose font-medium">
                          You spent <strong className="text-amber-500">₹2,140 more</strong> than usual this week, mainly from food delivery and unplanned weekend purchases. This is unusual, but it does not currently put your Goa goal at risk.
                        </p>
                      </div>
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>

             {/* STAGE 4 */}
             <AnimatePresence>
               {activeStage === 4 && (
                 <motion.div 
                   initial={{ opacity: 0, y: 30 }} 
                   animate={{ opacity: 1, y: 0 }}
                   className="absolute inset-0 flex items-center justify-center w-full z-10 px-4"
                 >
                   <div className="w-full max-w-3xl bg-surface-container-highest p-6 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-outline-variant/20">
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 relative z-10">
                        {/* Left Info */}
                        <div className="flex flex-col justify-center">
                          <div className="flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest mb-6 md:mb-8">
                            <Zap size={14} /> Meaningful Context
                          </div>
                          
                          <div className="space-y-5 md:space-y-6">
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

                        {/* Right Action */}
                        <div className="bg-surface p-6 md:p-8 rounded-3xl flex flex-col justify-center border border-outline-variant/30 shadow-sm relative overflow-hidden">
                           <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-[40px] pointer-events-none" />
                           
                           <h4 className="text-on-surface font-black text-xl md:text-2xl mb-3 md:mb-4 tracking-tight">
                             Recommended Action
                           </h4>
                           <p className="text-on-surface-variant text-sm font-medium mb-6 md:mb-8 leading-relaxed">
                             Keep next weekend's flexible spending below ₹3,200 to remain on schedule. You can safely spend <strong className="text-on-surface font-black highlight">₹8,400</strong> until payday.
                           </p>
                           <button className="w-full bg-on-surface text-surface text-sm font-black py-3 md:py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-on-surface/90 transition-colors z-10 pointer-events-auto">
                             Set ₹3,200 Limit <ArrowRight size={16} />
                           </button>
                        </div>
                      </div>
                   </div>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>

          {/* Bottom Progress Bar */}
          <div className="absolute bottom-[2%] md:bottom-[8%] w-full max-w-4xl px-4 md:px-6 z-20">
             <div className="h-1.5 w-full bg-outline-variant/30 rounded-full overflow-hidden flex relative">
               {/* Tick marks */}
               {[0.2, 0.4, 0.6, 0.8].map(pos => (
                 <div key={pos} className="absolute top-0 bottom-0 w-px bg-surface z-10" style={{ left: `${pos * 100}%` }} />
               ))}
               <motion.div 
                 className="h-full bg-primary origin-left z-0"
                 style={{ scaleX: scrollYProgress }}
               />
             </div>
             
             {/* Stage markers texts */}
             <div className="flex justify-between w-full mt-3 md:mt-4">
               {STAGES.map((s, i) => (
                 <div key={i} className="text-center flex-1">
                   <div className={`text-[9px] md:text-[10px] uppercase font-bold tracking-widest transition-colors ${activeStage >= i ? 'text-primary' : 'text-on-surface-variant/40'}`}>
                     <span className="hidden md:inline">{activeStage === i ? s.label : `Stage ${i + 1}`}</span>
                     <span className="md:hidden">{activeStage === i ? `Stage ${i + 1}` : ''}</span>
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
          Less tracking.<br className="md:hidden" />  <span className="text-primary italic">More understanding.</span>
        </h3>
        <p className="text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed max-w-2xl mx-auto">
          Billy captures what you spend, understands what belongs to you, identifies changing habits, and shows what those choices mean for your future.
        </p>
      </div>

    </section>
  );
}
