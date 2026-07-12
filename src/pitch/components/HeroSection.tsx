import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onBegin: () => void;
}

export default function HeroSection({ onBegin }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle class representing floating financial & operational data points
    class DataPoint {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
      isLogoPart: boolean;

      constructor(isLogoPart = false, targetX = 0, targetY = 0) {
        this.isLogoPart = isLogoPart;
        this.targetX = targetX;
        this.targetY = targetY;
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.size = isLogoPart ? Math.random() * 2.5 + 1.5 : Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.5 + 0.3;
        // High impact chartreuse particles
        this.color = isLogoPart ? '#D0FF00' : '#D0FF00';
      }

      update(mouseX: number, mouseY: number, progress: number) {
        if (this.isLogoPart) {
          // Gravitate towards logo coordinate over time/scroll
          const dx = this.targetX - this.x;
          const dy = this.targetY - this.y;
          this.x += dx * 0.03;
          this.y += dy * 0.03;
          this.alpha = 0.4 + 0.5 * Math.sin(Date.now() * 0.002 + this.x * 0.01);
        } else {
          // Ambient floating motion
          this.x += this.vx;
          this.y += this.vy;

          // React slightly to mouse
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 150;
            this.x -= (dx / dist) * force * 1.5;
            this.y -= (dy / dist) * force * 1.5;
          }

          // Bound checking
          if (this.x < 0 || this.x > width) this.vx *= -1;
          if (this.y < 0 || this.y > height) this.vy *= -1;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.globalAlpha = this.alpha;
        c.shadowBlur = this.isLogoPart ? 8 : 2;
        c.shadowColor = '#D0FF00';
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    const particles: DataPoint[] = [];
    const particleCount = 60;
    let mouseX = -1000;
    let mouseY = -1000;

    // Standard floating points
    for (let i = 0; i < particleCount; i++) {
      particles.push(new DataPoint());
    }

    // Logo points: We'll layout an elegant geometric representation of "B" or the symbol "∞" (infinity)
    // to symbolise the infinite living ledger
    const logoPointsCount = 70;
    const centerX = width / 2;
    const centerY = height / 2 - 80;

    // Create coordinates for a custom "B" & "∞" ledger loop
    for (let i = 0; i < logoPointsCount; i++) {
      const angle = (i / logoPointsCount) * Math.PI * 2;
      // Lemniscate of Bernoulli (infinity symbol)
      const scale = 140;
      const t = angle;
      const x = (scale * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
      const y = (scale * Math.sin(t) * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
      particles.push(new DataPoint(true, centerX + x, centerY + y));
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect particles that are close
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.strokeStyle = `rgba(208, 255, 0, ${0.15 * (1 - dist / 100)})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update(mouseX, mouseY, 0);
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      id="hero-section"
      className="relative w-full min-h-screen flex flex-col justify-between items-center px-6 py-12 md:py-16 text-center select-none overflow-hidden"
    >
      {/* Background Interactive Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

      {/* Radial Blend Overlay in background */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
        style={{ background: 'radial-gradient(circle at 50% 50%, #D0FF00 0%, transparent 70%)' }}
      />

      {/* Top Bar Logo (Premium Subtle) */}
      <div className="z-20 w-full max-w-6xl flex justify-between items-center py-4">
        <div className="flex items-center gap-2">
          <img
            src="/billy3.0.png"
            alt="Billy Logo"
            className="w-8 h-8 rounded-full object-cover border border-emerald-500/20 bg-white"
            referrerPolicy="no-referrer"
          />
          <span className="font-display font-bold tracking-tighter text-2xl text-neutral-900">
            BILLY
          </span>
        </div>
        <button
          onClick={onBegin}
          className="px-6 py-2 rounded-full border border-black/10 bg-white/50 backdrop-blur-md text-xs font-semibold hover:bg-white text-neutral-900 transition-all duration-300"
        >
          Begin Experience
        </button>
      </div>

      {/* Main Hero Content */}
      <div className="z-20 max-w-5xl mx-auto flex flex-col items-center justify-center flex-1 space-y-8 px-4 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6 flex flex-col items-center"
        >
          <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full bg-emerald-500/5 border border-emerald-500/15 p-1 flex items-center justify-center shadow-xl mb-2 bg-white">
            <img
              src="/billy3.0.png"
              alt="Billy Living Ledger Logo"
              className="w-full h-full rounded-full object-cover shadow-inner"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 rounded-full border border-dashed border-emerald-500/20 animate-spin" style={{ animationDuration: '15s' }} />
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest text-neutral-800 bg-brand-core border border-neutral-900/10 uppercase">
            The Living Ledger
          </span>
          <h1 className="font-display text-5xl md:text-[104px] font-bold tracking-tighter text-neutral-950 leading-[0.9] uppercase">
            The Living<br />
            Ledger.
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="font-sans text-lg md:text-2xl text-neutral-600 max-w-2xl font-light leading-relaxed"
        >
          Building the AI operating system for every person and every business. The future doesn’t record data. <strong className="font-medium text-neutral-900">It understands it.</strong>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="pt-4"
        >
          <button
            onClick={onBegin}
            id="begin-btn"
            className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-neutral-950 text-white font-medium hover:bg-neutral-900 transition-all shadow-md hover:shadow-brand-core/30 duration-300 text-sm"
          >
            Begin Journey
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300 text-brand-core" />
          </button>
        </motion.div>
      </div>

      {/* Hero Bottom Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="z-20 font-mono text-xs text-neutral-500 tracking-widest flex flex-col items-center gap-1"
      >
        <span>SCROLL OR TAP BEGIN TO REVEAL</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-neutral-400 to-transparent mt-2" />
      </motion.div>
    </div>
  );
}
