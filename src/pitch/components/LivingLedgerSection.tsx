import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Activity, Cpu } from 'lucide-react';

export default function LivingLedgerSection() {
  const [activeOrbit, setActiveOrbit] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Secondary canvas animation for continuous flowing neural pathways
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let h = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const centerX = w / 2;
    const centerY = h / 2;

    // Nodes representing orbiting operational and asset points
    const outerNodes = [
      { name: 'Accounts', angle: 0, radius: 160, size: 6, label: 'Bank Feeds' },
      { name: 'Cards', angle: Math.PI / 3, radius: 160, size: 6, label: 'Credit Cards' },
      { name: 'Invest', angle: (2 * Math.PI) / 3, radius: 160, size: 6, label: 'Stocks & Bonds' },
      { name: 'Wallets', angle: Math.PI, radius: 160, size: 6, label: 'Digital Wallets' },
      { name: 'Property', angle: (4 * Math.PI) / 3, radius: 160, size: 6, label: 'Real Estate' },
      { name: 'PF', angle: (5 * Math.PI) / 3, radius: 160, size: 6, label: 'Retirement PF' },
    ];

    class Pulse {
      nodeIndex: number;
      pct: number; // 0 to 1
      speed: number;
      color: string;

      constructor(nodeIndex: number) {
        this.nodeIndex = nodeIndex;
        this.pct = 0;
        this.speed = Math.random() * 0.01 + 0.008;
        this.color = '#10B981';
      }

      update() {
        this.pct += this.speed;
        if (this.pct > 1) {
          this.pct = 0;
          this.speed = Math.random() * 0.01 + 0.008;
        }
      }
    }

    const pulses: Pulse[] = outerNodes.map((_, i) => new Pulse(i));

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        w = canvas.width = canvas.parentElement.clientWidth || 600;
        h = canvas.height = canvas.parentElement.clientHeight || 450;
      }
    };

    window.addEventListener('resize', handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;

      // Draw outer orbits lines
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 160, 0, Math.PI * 2);
      ctx.stroke();

      // Draw Billy Brain Core glowing pulse
      const pulseRadius = 35 + 5 * Math.sin(Date.now() * 0.003);
      const grad = ctx.createRadialGradient(cx, cy, 5, cx, cy, pulseRadius + 15);
      grad.addColorStop(0, 'rgba(16, 185, 129, 0.4)');
      grad.addColorStop(0.5, 'rgba(16, 185, 129, 0.15)');
      grad.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, pulseRadius + 15, 0, Math.PI * 2);
      ctx.fill();

      // Draw Billy Brain Core
      ctx.fillStyle = '#10B981';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#10B981';
      ctx.beginPath();
      ctx.arc(cx, cy, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0; // reset

      // Draw connector lines & moving pulses
      outerNodes.forEach((node, idx) => {
        // Slow rotation
        node.angle += 0.0015;
        const nx = cx + Math.cos(node.angle) * node.radius;
        const ny = cy + Math.sin(node.angle) * node.radius;

        // Draw connecting link line
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        // Update & Draw Pulse
        const p = pulses[idx];
        p.update();
        const px = nx + (cx - nx) * p.pct;
        const py = ny + (cy - ny) * p.pct;

        ctx.fillStyle = '#10B981';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#10B981';
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw Outer orbiting nodes
        ctx.fillStyle = '#171717';
        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(nx, ny, node.size + 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Write name label
        ctx.fillStyle = '#737373';
        ctx.font = '9px var(--font-mono)';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, nx, ny - 14);
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      id="livingledger-section"
      className="relative w-full min-h-screen flex flex-col justify-center items-center py-24 px-6 md:px-12 select-none overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Typography Side */}
        <div className="lg:col-span-5 space-y-8 text-left">
          <div className="flex items-center gap-3">
            <img
              src="/billy3.0.png"
              alt="The Living Ledger Logo"
              className="w-12 h-12 rounded-xl object-cover border border-emerald-500/20 bg-white shadow-sm shrink-0"
              referrerPolicy="no-referrer"
            />
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest text-neutral-800 bg-brand-core border border-neutral-900/10 uppercase">
              PRODUCT SUITE A // THE LIVING LEDGER
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-[64px] font-bold tracking-tighter text-neutral-950 leading-[0.95] uppercase">
            The Living <br />
            Ledger.
          </h2>
          <p className="font-sans text-md md:text-lg text-neutral-500 font-light leading-relaxed">
            A standalone, self-regulating personal financial intelligence engine built for builders, operators, and consumers. It automatically unifies disparate bank feeds, card portfolios, and asset wallets to execute micro-savings, tax cap alerts, and interest rate optimizations—fully insulated from any commercial business cycles.
          </p>

          <div className="space-y-4 pt-4 border-t border-neutral-200/50">
            <div className="flex items-center gap-3">
              <div className="p-1 bg-emerald-100 rounded-full text-emerald-600">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-sans text-sm font-medium text-neutral-800">
                Continuous personal asset optimization
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-1 bg-emerald-100 rounded-full text-emerald-600">
                <Activity className="w-4 h-4" />
              </div>
              <span className="font-sans text-sm font-medium text-neutral-800">
                Autonomous ledger sweeps with zero-latency
              </span>
            </div>
          </div>
        </div>

        {/* Right Active Visualization Core */}
        <div className="lg:col-span-7 flex flex-col justify-center items-center relative min-h-[450px] border border-neutral-200/50 bg-white/40 backdrop-blur-md rounded-3xl p-6">
          <span className="absolute top-4 left-6 px-4 py-1 rounded-full bg-neutral-100 text-[10px] font-mono tracking-widest text-neutral-500 border border-neutral-200/50 uppercase flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-emerald-600 animate-spin" /> Live Living Ledger Brain Core
          </span>
          <canvas ref={canvasRef} className="w-full h-[380px]" />
          
          <div className="absolute bottom-4 right-6 text-right">
            <span className="font-mono text-[9px] text-emerald-600 font-bold tracking-widest uppercase">
              LEDGER SUITE: PERSONAL INDEPENDENT STATE
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
