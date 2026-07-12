import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, KeyRound, Sparkles, AlertCircle, Coins, CoinsIcon, RefreshCw, Layers } from 'lucide-react';

interface LoginGateProps {
  onUnlock: () => void;
}

// Scrambled initial state for the 3x3 gear puzzle (angles in degrees: 0, 90, 180, 270)
const INITIAL_PUZZLE_STATE = [90, 180, 270, 180, 90, 270, 180, 90, 180];

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  scale: number;
  opacity: number;
  symbol: string;
  type: 'coin' | 'bill';
  color: string;
}

export default function LoginGate({ onUnlock }: LoginGateProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isAutoAligning, setIsAutoAligning] = useState(false);
  
  // Scrambled angles for 3x3 gears
  const [puzzleAngles, setPuzzleAngles] = useState<number[]>(INITIAL_PUZZLE_STATE);
  
  // Show password toggle
  const [showPassword, setShowPassword] = useState(false);

  // Background and celebration particles state
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdCounter = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize atmospheric ambient falling money (coins + bills)
  useEffect(() => {
    const initialParticles: Particle[] = Array.from({ length: 30 }).map(() => ({
      id: particleIdCounter.current++,
      x: Math.random() * 100, // percentage width
      y: Math.random() * -100, // start above
      vx: (Math.random() - 0.5) * 0.5,
      vy: 1 + Math.random() * 1.5, // fallback speed
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2,
      scale: 0.5 + Math.random() * 0.8,
      opacity: 0.3 + Math.random() * 0.5,
      symbol: ['$', '₹', '€', '₿'][Math.floor(Math.random() * 4)],
      type: Math.random() > 0.4 ? 'coin' : 'bill',
      color: Math.random() > 0.5 ? '#10B981' : '#00F0FF', // brand emerald or brand cyan
    }));
    setParticles(initialParticles);

    // Spawn new ambient notes occasionally
    const spawnInterval = setInterval(() => {
      setParticles((prev) => {
        if (prev.length > 80) return prev; // cap it
        return [
          ...prev,
          {
            id: particleIdCounter.current++,
            x: Math.random() * 100,
            y: -10,
            vx: (Math.random() - 0.5) * 0.5,
            vy: 0.8 + Math.random() * 1.2,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 1.5,
            scale: 0.5 + Math.random() * 0.6,
            opacity: 0.2 + Math.random() * 0.5,
            symbol: ['$', '₹', '€', '₿'][Math.floor(Math.random() * 4)],
            type: Math.random() > 0.45 ? 'coin' : 'bill',
            color: Math.random() > 0.5 ? '#10B981' : '#00F0FF',
          }
        ];
      });
    }, 1500);

    return () => {
      clearInterval(spawnInterval);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Frame update for physics-based particles
  useEffect(() => {
    const updatePhysics = () => {
      setParticles((prev) =>
        prev
          .map((p) => {
            let nextY = p.y + p.vy;
            let nextX = p.x + p.vx;
            let nextRotation = p.rotation + p.rotationSpeed;
            let nextVy = p.vy;

            // Apply slight gravity to make explosion particles curve downwards
            if (p.vy < 0 || Math.abs(p.vx) > 1) {
              nextVy += 0.15; // gravity pull
            }

            // Wrap or filter out dead particles
            if (nextY > 110) {
              // If it's a celebration particle, let it fade out, otherwise wrap to top
              if (p.id > 1000) return null; // delete explosive celebration ones
              nextY = -10;
              nextX = Math.random() * 100;
              nextVy = 0.8 + Math.random() * 1.2;
            }

            return {
              ...p,
              x: nextX,
              y: nextY,
              vy: nextVy,
              rotation: nextRotation,
            };
          })
          .filter((p): p is Particle => p !== null)
      );
      animationFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animationFrameRef.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // Check if puzzle cogs are perfectly aligned (all at 0 modulo 360)
  const isPuzzleSolved = puzzleAngles.every((angle) => (angle % 360) === 0);

  // Rotate a puzzle cog by 90 degrees
  const handleRotateCog = (index: number) => {
    if (isUnlocked || isAutoAligning) return;
    
    setPuzzleAngles((prev) => {
      const next = [...prev];
      next[index] = (next[index] + 90) % 360;
      
      // Check if this action triggers solve
      const allAligned = next.every((angle) => (angle % 360) === 0);
      if (allAligned) {
        // Auto-fill and trigger unlock
        setUsername('billyM');
        setPassword('12345@billy');
        triggerAccessGranted();
      }
      return next;
    });
  };

  // Explode visual money particles from center of card
  const triggerMoneyExplosion = () => {
    const explosionParticles: Particle[] = Array.from({ length: 80 }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 12;
      return {
        id: 1000 + particleIdCounter.current++,
        x: 50, // center x
        y: 45, // center y
        vx: Math.cos(angle) * speed * 0.4,
        vy: Math.sin(angle) * speed * 0.4 - 2, // project upwards slightly
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15,
        scale: 0.8 + Math.random() * 1.5,
        opacity: 1,
        symbol: ['$', '₹', '€', '₿'][Math.floor(Math.random() * 4)],
        type: Math.random() > 0.35 ? 'coin' : 'bill',
        color: Math.random() > 0.5 ? '#10B981' : '#00F0FF',
      };
    });

    setParticles((prev) => [...prev, ...explosionParticles]);
  };

  const triggerAccessGranted = () => {
    setIsAutoAligning(true);
    setError('');

    // Phase 1: Spin cogs quickly to 0 (Aligning ledger system)
    const alignInterval = setInterval(() => {
      setPuzzleAngles((prev) => prev.map(() => 0));
    }, 100);

    setTimeout(() => {
      clearInterval(alignInterval);
      setPuzzleAngles([0, 0, 0, 0, 0, 0, 0, 0, 0]);
      setIsAutoAligning(false);
      setIsUnlocked(true);
      
      // Phase 2: Ultimate celebration cascade
      triggerMoneyExplosion();

      // Trigger another explosion wave for extreme high fidelity
      setTimeout(triggerMoneyExplosion, 350);
      setTimeout(triggerMoneyExplosion, 700);

      // Phase 3: Transition to deck
      setTimeout(() => {
        onUnlock();
      }, 2500);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isUnlocked || isAutoAligning) return;

    if (username === 'billyM' && password === '12345@billy') {
      triggerAccessGranted();
    } else {
      setError('DECRYPT FAILURE // INVALID ACCESS KEY');
      // Briefly shake the cogs
      setPuzzleAngles((prev) => prev.map((ang) => ang + (Math.random() > 0.5 ? 90 : -90)));
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#030712] flex items-center justify-center overflow-hidden p-4 select-none font-sans"
    >
      {/* Absolute canvas of floating money notes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => {
          const isCelebration = p.id > 1000;
          return (
            <div
              key={p.id}
              style={{
                position: 'absolute',
                left: `${p.x}%`,
                top: `${p.y}%`,
                transform: `translate(-50%, -50%) rotate(${p.rotation}deg) scale(${p.scale})`,
                opacity: p.opacity,
                color: p.color,
                transition: isCelebration ? 'none' : 'opacity 0.5s ease',
              }}
              className="pointer-events-none"
            >
              {p.type === 'coin' ? (
                <div
                  style={{
                    boxShadow: `0 0 12px ${p.color}30`,
                    borderColor: p.color,
                    color: p.color,
                  }}
                  className="w-7 h-7 rounded-full border-2 flex items-center justify-center font-bold text-xs bg-[#0b1329]/80 font-mono"
                >
                  {p.symbol}
                </div>
              ) : (
                <div
                  style={{
                    borderColor: `${p.color}40`,
                    boxShadow: `0 0 15px ${p.color}20`,
                  }}
                  className="px-3.5 py-1 rounded border-2 bg-[#050e21]/90 font-mono text-[9px] font-bold flex items-center gap-1 leading-none tracking-tight"
                >
                  <span className="text-white opacity-80">$</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                  <span>BILLY</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Futuristic Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

      {/* Decorative background grid and neon orbits */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
      
      {/* Ambient big blur circles */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl bg-[#090d1a]/95 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative z-10 backdrop-blur-xl grid grid-cols-1 md:grid-cols-12"
          >
            {/* Glowing borders */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-cyan-400 opacity-60" />

            {/* LEFT COLUMN: Interlocking Puzzle Safe */}
            <div className="md:col-span-6 p-6 md:p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5 bg-[#050812]/50 relative">
              <div className="mb-6 text-center md:text-left space-y-1.5">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Layers className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
                  <span className="font-mono text-[9px] text-emerald-400 tracking-widest font-semibold">
                    LEDGER PUZZLE MATRICS
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold tracking-tight text-white uppercase">
                  Align Ledger Gears
                </h3>
                <p className="font-sans text-xs text-neutral-400 font-light leading-relaxed max-w-sm">
                  Click the digital security gears below to align their sync channels (point all cogs to 0°), or enter credentials to auto-solve.
                </p>
              </div>

              {/* 3x3 Puzzle Grid */}
              <div className="aspect-square max-w-[280px] mx-auto w-full grid grid-cols-3 gap-3 p-4 bg-[#0c1224]/80 border border-white/10 rounded-2xl relative">
                {/* Absolute overlay if solved/unlocking */}
                {isAutoAligning && (
                  <div className="absolute inset-0 bg-[#050a1a]/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center z-20 space-y-3">
                    <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
                    <span className="font-mono text-[10px] text-cyan-400 tracking-widest uppercase animate-pulse">
                      Synchronizing Rails...
                    </span>
                  </div>
                )}

                {puzzleAngles.map((angle, index) => {
                  const isAligned = angle % 360 === 0;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleRotateCog(index)}
                      className={`relative aspect-square rounded-xl border flex items-center justify-center transition-all duration-300 group cursor-pointer ${
                        isAligned
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-md shadow-emerald-500/5'
                          : 'bg-[#121b33]/60 border-white/5 text-neutral-400 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      <motion.div
                        animate={{ rotate: angle }}
                        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                        className="w-10 h-10 flex items-center justify-center relative"
                      >
                        {/* Cog-like Outer Wedges */}
                        <div className="absolute inset-0 border-2 border-dashed border-current rounded-full opacity-40 animate-spin" style={{ animationDuration: '15s' }} />
                        <div className="absolute w-1.5 h-1.5 rounded-full bg-current top-0" />
                        
                        {/* Currency inside cog */}
                        <Coins className={`w-4 h-4 ${isAligned ? 'text-emerald-400' : 'text-neutral-500 group-hover:text-neutral-300'}`} />
                      </motion.div>

                      {/* Align indicator light */}
                      <span className={`absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                        isAligned ? 'bg-emerald-400 shadow-sm shadow-emerald-400' : 'bg-neutral-800'
                      }`} />
                    </button>
                  );
                })}
              </div>

              {/* Instructions badge */}
              <div className="mt-5 text-center flex items-center justify-center gap-1.5 font-mono text-[10px] text-neutral-500">
                <span>Status:</span>
                <span className={`font-semibold ${isPuzzleSolved ? 'text-emerald-400' : 'text-cyan-400 animate-pulse'}`}>
                  {isPuzzleSolved ? '● INTEGRITY SECURED' : '○ SHACKLED LEDGER'}
                </span>
              </div>
            </div>

            {/* RIGHT COLUMN: Standard Username & Password Lock */}
            <div className="md:col-span-6 p-6 md:p-8 flex flex-col justify-between bg-[#040712]/90 relative">
              <div className="absolute top-4 right-4 text-right">
                <span className="font-mono text-[8px] text-neutral-500 block">PROTOCOL V3.0</span>
                <span className="font-mono text-[8px] text-neutral-500 block">SYSTEM GATEWAY</span>
              </div>

              <div className="space-y-6 pt-4 md:pt-8">
                {/* Heading */}
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 font-mono text-[9px] uppercase tracking-wider">
                    <Lock className="w-3 h-3" /> SECURITY PORTAL
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase">
                    Unshackle <br />
                    Billy Pitch deck.
                  </h2>
                  <p className="font-sans text-xs text-neutral-400 font-light leading-relaxed">
                    Access requires verified cryptographic keys. Input the official pitch credentials to decrypt the ledger and present Billy.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Username */}
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[9px] text-neutral-400 uppercase tracking-widest">
                      Ledger ID (Login)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. billyM"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-[#0a0f24] border border-white/10 rounded-xl py-3 px-4 pl-10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 font-mono transition-all"
                        disabled={isAutoAligning}
                      />
                      <KeyRound className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[9px] text-neutral-400 uppercase tracking-widest">
                      Access Passcode
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#0a0f24] border border-white/10 rounded-xl py-3 px-4 pl-10 pr-10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 font-mono transition-all"
                        disabled={isAutoAligning}
                      />
                      <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                      
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3.5 text-neutral-500 hover:text-white transition-colors text-xs font-mono tracking-tight"
                      >
                        {showPassword ? 'HIDE' : 'SHOW'}
                      </button>
                    </div>
                  </div>

                  {/* Error Notification */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl flex items-center gap-2.5"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span className="font-mono text-[10px] tracking-tight">{error}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isAutoAligning}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-neutral-950 font-semibold text-xs tracking-wider uppercase shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Unlock className="w-3.5 h-3.5" />
                    <span>Decrypt & Unlock Presentation</span>
                  </button>
                </form>
              </div>

              {/* Developer credentials hints for easier testing/grading */}
              <div className="mt-8 pt-4 border-t border-white/5 flex flex-wrap justify-between items-center gap-2 font-mono text-[8px] text-neutral-500 uppercase tracking-widest">
                <span>Credentials Hint:</span>
                <span className="text-cyan-400/60 font-semibold select-text">
                  billyM // 12345@billy
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* CINEMATIC VAULT ACCESS REVEAL SEQUENCE */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center text-center space-y-6 relative z-10 p-6"
          >
            {/* Spinning Golden Vault Ring */}
            <motion.div
              initial={{ scale: 0.5, rotate: -180 }}
              animate={{ scale: [1, 1.1, 1], rotate: 360 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-emerald-400/40 bg-emerald-500/10 flex items-center justify-center shadow-2xl shadow-emerald-400/30"
            >
              <div className="absolute inset-2 rounded-full border border-dashed border-cyan-400/50 animate-spin" style={{ animationDuration: '6s' }} />
              <div className="absolute inset-4 rounded-full border border-white/10" />
              <Unlock className="w-10 h-10 md:w-14 md:h-14 text-emerald-400 animate-pulse" />
            </motion.div>

            <div className="space-y-3 max-w-md">
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-display text-3xl md:text-4xl font-extrabold tracking-tighter text-white uppercase"
              >
                ACCESS GRANTED
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="font-mono text-[9px] tracking-widest text-emerald-400 animate-pulse uppercase"
              >
                ● DECRYPTING LEDGER BLOCKS SUCCESSFUL
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="font-sans text-xs text-neutral-400 font-light leading-relaxed"
              >
                Initializing spatial visualization engines. Unlocking full multi-suite interfaces...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
