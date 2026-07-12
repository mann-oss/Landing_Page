/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  Briefcase,
  ArrowUpRight,
} from 'lucide-react';
import { AppFlavor } from '../types';
import BillyGreenLanding from './BillyGreenLanding';
import BillyBlueDashboard from './BillyBlueDashboard';

export type FlavorMode = 'split' | 'green' | 'blue';

interface SplitLandingProps {
  mode: FlavorMode;
  onModeChange: (mode: FlavorMode) => void;
  onOpenPitch?: () => void;
}

const FULL = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
const EMPTY_LEFT = 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)';
const EMPTY_RIGHT = 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)';

const GREEN_REST = 'polygon(0% 0%, 50% 0%, 36% 100%, 0% 100%)';
const GREEN_HOVER = 'polygon(0% 0%, 72% 0%, 58% 100%, 0% 100%)';
const GREEN_SHRUNK = 'polygon(0% 0%, 28% 0%, 14% 100%, 0% 100%)';

const BLUE_REST = 'polygon(50% 0%, 100% 0%, 100% 100%, 36% 100%)';
const BLUE_HOVER = 'polygon(28% 0%, 100% 0%, 100% 100%, 14% 100%)';
const BLUE_SHRUNK = 'polygon(72% 0%, 100% 0%, 100% 100%, 58% 100%)';

const WIPE_EASE = [0.32, 0.72, 0, 1] as const;
const OPEN_S = 1.05;

export default function SplitLanding({ mode, onModeChange, onOpenPitch }: SplitLandingProps) {
  const [hovered, setHovered] = useState<AppFlavor>(null);
  const [opening, setOpening] = useState<'green' | 'blue' | null>(null);
  const [closingFrom, setClosingFrom] = useState<'green' | 'blue' | null>(null);
  const [greenRevealed, setGreenRevealed] = useState(false);
  const locked = useRef(false);

  const closing = closingFrom !== null;
  const busy = opening !== null || closing;
  const isSplit = mode === 'split' && !busy;
  const greenLive = mode === 'green' && !busy;
  const blueLive = mode === 'blue' && !busy;
  // Split shows logo + headline; reveal kicks in mid-open
  const greenPeek = !greenRevealed && (isSplit || opening === 'green' || closingFrom === 'green');

  const greenClip = (() => {
    // Once fully open, drop clip so the page scrolls normally
    if (greenLive) return FULL;
    if (opening === 'green') return FULL;
    if (opening === 'blue') return EMPTY_LEFT;
    if (closingFrom === 'green') return GREEN_REST;
    if (closingFrom === 'blue') return EMPTY_LEFT;
    if (mode === 'green') return FULL;
    if (mode === 'blue') return EMPTY_LEFT;
    if (hovered === 'green') return GREEN_HOVER;
    if (hovered === 'blue') return GREEN_SHRUNK;
    return GREEN_REST;
  })();

  const blueClip = (() => {
    if (opening === 'blue') return FULL;
    if (opening === 'green') return EMPTY_RIGHT;
    if (closingFrom === 'blue') return BLUE_REST;
    if (closingFrom === 'green') return BLUE_REST;
    if (mode === 'blue') return FULL;
    if (mode === 'green') return EMPTY_RIGHT;
    if (hovered === 'blue') return BLUE_HOVER;
    if (hovered === 'green') return BLUE_SHRUNK;
    return BLUE_REST;
  })();

  const clipTransition = busy
    ? { duration: OPEN_S, ease: WIPE_EASE }
    : { type: 'spring' as const, stiffness: 80, damping: 20, mass: 0.85 };

  const openFlavor = (flavor: 'green' | 'blue') => {
    if (locked.current || !isSplit) return;
    locked.current = true;
    setHovered(null);
    setOpening(flavor);
    if (flavor === 'green') {
      // Let the wipe start, then bring the page in smoothly
      window.setTimeout(() => setGreenRevealed(true), 380);
    }
  };

  const finishOpen = (flavor: 'green' | 'blue') => {
    if (opening !== flavor) return;
    onModeChange(flavor);
    setOpening(null);
    if (flavor === 'green') setGreenRevealed(true);
    locked.current = false;
  };

  const finishClose = () => {
    if (!closing) return;
    setClosingFrom(null);
    setGreenRevealed(false);
    locked.current = false;
  };

  const handleBack = () => {
    if (locked.current || mode === 'split') return;
    locked.current = true;
    setHovered(null);
    setGreenRevealed(false);
    setClosingFrom(mode);
    onModeChange('split');
  };

  const showGreen =
    mode === 'split' ||
    mode === 'green' ||
    opening === 'green' ||
    closingFrom === 'green';

  const showBlue =
    mode === 'split' ||
    mode === 'blue' ||
    opening === 'blue' ||
    closingFrom !== null;

  const dividerLeft = (() => {
    if (opening === 'green' || (mode === 'green' && !closing)) return '100%';
    if (opening === 'blue' || (mode === 'blue' && !closing)) return '0%';
    if (closing) return '43%';
    if (hovered === 'green') return '65%';
    if (hovered === 'blue') return '21%';
    return '43%';
  })();

  return (
    <div
      className={`relative w-full bg-[#06090e] ${
        greenLive || blueLive ? 'min-h-screen' : 'h-screen overflow-hidden'
      }`}
    >
      <motion.div
        className="fixed top-8 left-1/2 -translate-x-1/2 z-[60] pointer-events-none flex flex-col items-center"
        animate={{ opacity: isSplit ? 1 : 0, y: isSplit ? 0 : -10 }}
        transition={{ duration: 0.35, ease: WIPE_EASE }}
      >
        <div className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-slate-950/90 border border-white/10 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
          <span className="font-headline text-sm font-black tracking-tight text-white">
            Billy
          </span>
          <div className="w-[1px] h-3.5 bg-white/10" />
          <span className="text-[10px] font-body font-bold tracking-[0.2em] text-zinc-400 uppercase">
            Select
          </span>
        </div>
      </motion.div>

      {showGreen && (
        <motion.div
          initial={false}
          animate={{
            clipPath: greenLive ? 'inset(0% 0% 0% 0%)' : greenClip,
          }}
          transition={clipTransition}
          onAnimationComplete={() => {
            if (opening === 'green') finishOpen('green');
            if (closingFrom === 'green') finishClose();
          }}
          onMouseEnter={() => isSplit && setHovered('green')}
          onMouseLeave={() => setHovered(null)}
          onClick={() => {
            if (isSplit) openFlavor('green');
          }}
          className={`w-full z-10 bg-transparent ${
            greenLive
              ? 'relative min-h-screen'
              : 'absolute inset-0 h-screen overflow-hidden will-change-[clip-path]'
          } ${isSplit ? 'cursor-pointer' : ''}`}
          style={{
            filter:
              hovered === 'blue' && isSplit ? 'brightness(0.82)' : 'brightness(1)',
            transition: busy ? 'none' : 'filter 0.45s ease',
            pointerEvents: greenLive || isSplit ? 'auto' : 'none',
          }}
        >
          <div
            className={greenPeek ? 'pointer-events-none' : 'min-h-screen'}
            style={{ width: '100%' }}
          >
            <BillyGreenLanding
              onBack={handleBack}
              peek={greenPeek}
              showBack={greenLive}
              onOpenPitch={onOpenPitch}
            />
          </div>

          {isSplit && (
            <div className="absolute bottom-8 left-8 z-20 font-headline text-xs font-bold text-on-surface-variant/45 pointer-events-none">
              Open Billy Green
            </div>
          )}
        </motion.div>
      )}

      {showBlue && (
        <motion.div
          initial={closingFrom === 'green' ? { clipPath: EMPTY_RIGHT } : false}
          animate={{ clipPath: blueClip }}
          transition={clipTransition}
          onAnimationComplete={() => {
            if (opening === 'blue') finishOpen('blue');
            if (closingFrom === 'blue') finishClose();
          }}
          onMouseEnter={() => isSplit && setHovered('blue')}
          onMouseLeave={() => setHovered(null)}
          onClick={() => {
            if (isSplit) openFlavor('blue');
          }}
          className={`w-full z-10 will-change-[clip-path] bg-[#050a12] ${
            blueLive
              ? 'relative min-h-screen'
              : 'absolute inset-0 h-screen overflow-hidden'
          } ${isSplit ? 'cursor-pointer' : ''}`}
          style={{
            filter:
              hovered === 'green' && isSplit ? 'brightness(0.55)' : 'brightness(1)',
            transition: busy ? 'none' : 'filter 0.45s ease',
            pointerEvents: blueLive || isSplit ? 'auto' : 'none',
          }}
        >
          {blueLive ? (
            <BillyBlueDashboard onBack={handleBack} />
          ) : (
            <BlueSplitPreview
              onEnter={() => openFlavor('blue')}
              hidden={opening === 'green' || (mode === 'green' && !closing)}
            />
          )}
        </motion.div>
      )}

      <div
        className="fixed top-0 bottom-0 z-30 pointer-events-none hidden md:block"
        style={{
          left: dividerLeft,
          opacity: isSplit ? 1 : 0,
          transform: 'translateX(-50%) skewX(-14deg)',
          transition: `left ${OPEN_S}s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.3s ease`,
        }}
      >
        <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-zinc-400/25 to-transparent relative">
          <motion.div
            animate={{ y: ['0%', '100%'] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
            className={`absolute left-[-3px] w-[7px] h-[7px] rounded-full blur-[0.5px] ${
              hovered === 'green'
                ? 'bg-primary shadow-[0_0_8px_#10B981]'
                : hovered === 'blue'
                  ? 'bg-sky-400 shadow-[0_0_8px_#38bdf8]'
                  : 'bg-amber-300 shadow-[0_0_8px_#dfb15b]'
            }`}
          />
        </div>
      </div>

      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-8 pointer-events-none text-[10px] text-zinc-500 font-mono tracking-wider"
        animate={{ opacity: isSplit ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className={hovered === 'green' ? 'text-primary font-bold' : ''}>
          [ I / GREEN / AI BRAIN ]
        </span>
        <span className="text-zinc-500/10">•</span>
        <span className={hovered === 'blue' ? 'text-sky-300 font-bold' : ''}>
          [ II / BLU / AGENCY SUITE ]
        </span>
      </motion.div>
    </div>
  );
}

function BlueSplitPreview({
  onEnter,
  hidden,
}: {
  onEnter: () => void;
  hidden: boolean;
}) {
  return (
    <motion.div
      className="absolute inset-0"
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.35, ease: WIPE_EASE }}
    >
      <img
        src="/bblu3.0.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-[0.22] scale-110"
      />
      <div className="absolute inset-0 bg-[#050a12]/70" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.015)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-sky-950/30 blur-[130px] pointer-events-none" />

      <div className="absolute top-[18%] right-[6%] md:right-[10%] w-[88%] md:w-[36%] z-20 text-right flex flex-col items-end pointer-events-none">
        <div className="flex items-center gap-1.5 mb-4 justify-end">
          <span className="font-body text-[11px] font-semibold tracking-wider text-sky-400 uppercase">
            Institutional Cashflow Suite
          </span>
          <Briefcase className="w-4 h-4 text-sky-400" />
        </div>

        <h2 className="text-4xl md:text-6xl font-headline font-black tracking-tight text-white mb-5">
          Billy <span className="italic font-normal text-sky-400">Blu</span>
        </h2>

        <p className="text-sm text-sky-100/60 leading-relaxed mb-6 max-w-sm font-body">
          Professional invoicing, client ledgers, and cash projections built for
          modern consultancies.
        </p>

        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-500/10 px-4 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-sky-200">
            Coming soon
          </span>
        </div>

        <div className="pointer-events-auto">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEnter();
            }}
            className="group flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-sky-950 font-bold text-xs px-6 py-3.5 rounded-xl cursor-pointer"
          >
            Open Billy Blu
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
