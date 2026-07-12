import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function VisionSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = 400);

    const centerX = w / 2;
    const centerY = h / 2;

    interface Node {
      x: number;
      y: number;
      z: number;
      px: number;
      py: number;
      color: string;
      label: string;
    }

    // 3D Globe Projection Nodes (Constellations)
    const nodes: Node[] = [];
    const labels = ['Banks', 'Governments', 'Developers', 'AI Agents', 'Consumers', 'Enterprises', 'SMEs'];
    const totalNodes = 35;

    for (let i = 0; i < totalNodes; i++) {
      const theta = Math.acos(Math.random() * 2 - 1);
      const phi = Math.random() * Math.PI * 2;
      const radius = 140;

      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);

      nodes.push({
        x,
        y,
        z,
        px: 0,
        py: 0,
        color: i % 2 === 0 ? '#00F0FF' : '#D0FF00',
        label: i < labels.length ? labels[i] : '',
      });
    }

    let angleX = 0.003;
    let angleY = 0.003;

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = 400;
    };

    window.addEventListener('resize', handleResize);

    const animateGlobe = () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;

      // Rotate nodes in 3D
      nodes.forEach((n) => {
        // Rotate Y
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const x1 = n.x * cosY - n.z * sinY;
        const z1 = n.z * cosY + n.x * sinY;

        // Rotate X
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const y2 = n.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + n.y * sinX;

        n.x = x1;
        n.y = y2;
        n.z = z2;

        // Projection
        const fov = 250;
        const scale = fov / (fov + n.z);
        n.px = cx + n.x * scale;
        n.py = cy + n.y * scale;
      });

      // Draw constellation links
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n1.px - n2.px;
          const dy = n1.py - n2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 85) {
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - dist / 85)})`;
            ctx.beginPath();
            ctx.moveTo(n1.px, n1.py);
            ctx.lineTo(n2.px, n2.py);
            ctx.stroke();
          }
        }
      }

      // Draw nodes & labels
      nodes.forEach((n) => {
        if (n.z > 0) return; // Hide nodes on the back side for cleaner depth realism

        const fov = 250;
        const scale = fov / (fov + n.z);
        const size = (Math.max(1, 4 * scale));

        ctx.save();
        ctx.globalAlpha = 0.3 + 0.7 * (1 - n.z / 140);
        ctx.fillStyle = n.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = n.color;
        ctx.beginPath();
        ctx.arc(n.px, n.py, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (n.label) {
          ctx.fillStyle = 'rgba(255,255,255,0.45)';
          ctx.font = '8px var(--font-mono)';
          ctx.textAlign = 'center';
          ctx.fillText(n.label, n.px, n.py - 10);
        }
      });

      animFrame = requestAnimationFrame(animateGlobe);
    };

    animateGlobe();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      id="vision-section"
      className="relative w-full min-h-screen flex flex-col justify-between items-center py-20 px-6 md:px-12 bg-bg-blu text-neutral-100 select-none overflow-hidden"
    >
      <div className="w-full" /> {/* Spacer */}

      {/* Main Vision Content */}
      <div className="z-10 max-w-4xl mx-auto text-center space-y-6 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest text-brand-blu bg-brand-blu/10 border border-brand-blu/20 uppercase">
            <Sparkles className="w-3.5 h-3.5" /> The Infinite Horizon
          </span>
        </motion.div>

        <h2 className="font-display text-4xl md:text-[68px] font-bold tracking-tighter text-white leading-[0.95] uppercase">
          The Intelligence Layer <br className="hidden md:block" />
          of the Global Economy.
        </h2>

        <p className="font-sans text-md md:text-xl text-neutral-400 max-w-xl mx-auto font-light leading-relaxed">
          The ledger is alive. Money is no longer static. It observes, understands, predicts, and acts.
        </p>
      </div>

      {/* Globe constellation stage */}
      <div className="w-full flex justify-center items-center h-[340px] relative">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      </div>

      <div className="w-full" /> {/* Spacer */}
    </div>
  );
}
