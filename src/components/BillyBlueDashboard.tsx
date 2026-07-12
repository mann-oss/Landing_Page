/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowLeft } from 'lucide-react';

interface BillyBlueDashboardProps {
  onBack: () => void;
}

/** Billy Blu — coming soon placeholder with faded product art */
export default function BillyBlueDashboard({ onBack }: BillyBlueDashboardProps) {
  return (
    <div
      id="blue-app-viewport"
      className="relative min-h-screen w-full overflow-hidden bg-[#050a12] text-slate-100 flex flex-col"
    >
      <img
        src="/bblu3.0.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-[0.18] scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050a12]/75 via-[#050a12]/55 to-[#050a12]/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(56,189,248,0.12),transparent_55%)]" />

      <div className="relative z-10 flex items-center gap-3 p-5 md:p-8">
        <button
          type="button"
          id="back-to-landing-blue"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-200/70 hover:text-sky-200 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-24 text-center">
        <p className="mb-4 font-body text-[11px] font-semibold tracking-[0.28em] text-sky-400 uppercase">
          Institutional Cashflow Suite
        </p>
        <h1 className="font-headline text-5xl md:text-7xl font-black tracking-tight text-white mb-4">
          Billy <span className="italic font-normal text-sky-400">Blu</span>
        </h1>
        <p className="max-w-md text-sm md:text-base text-sky-100/55 font-body leading-relaxed mb-10">
          Professional invoicing, client ledgers, and cash projections — landing soon.
        </p>
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/25 bg-sky-500/10 px-5 py-2.5 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-sky-200">
            Coming soon
          </span>
        </div>
      </div>
    </div>
  );
}
