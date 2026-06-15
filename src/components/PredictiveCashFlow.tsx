/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { 
  TrendingUp, 
  Globe, 
  Percent, 
  LineChart, 
  Sparkles, 
  ShieldAlert, 
  ArrowUpRight, 
  Activity, 
  CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalInputVars } from '../types';

interface PredictiveCashFlowProps {
  inputs: ExternalInputVars;
  setInputs: React.Dispatch<React.SetStateAction<ExternalInputVars>>;
  onTriggerAlert: (title: string, desc: string, type: 'warning' | 'info' | 'success') => void;
}

export default function PredictiveCashFlow({ 
  inputs, 
  setInputs, 
  onTriggerAlert 
}: PredictiveCashFlowProps) {
  
  // Calculations for graph cash flow based on input variables
  const graphData = useMemo(() => {
    // Generate 10 data points for the 90 day period
    const startBalance = 142000;
    
    // Impact multipliers
    const marketMult = 1 + (inputs.marketTrend / 100);
    const inflationMinus = (inputs.inflationValue - 4) * 600; // negative drag
    
    let politicalMult = 1;
    if (inputs.politicalEvent === 'tense') politicalMult = 0.93;
    if (inputs.politicalEvent === 'election') politicalMult = 1.05;

    let globalMult = 1.0;
    if (inputs.globalIndices === 'bear') globalMult = 0.88;
    if (inputs.globalIndices === 'bull') globalMult = 1.15;

    const points = [];
    let current = startBalance;

    for (let i = 0; i <= 9; i++) {
      const day = i * 10;
      // organic daily growth + variables impact
      const drift = i * 8500 * marketMult * politicalMult * globalMult - (i * inflationMinus);
      const noise = Math.sin(i) * 3000; // wave effect
      current = Math.max(80000, startBalance + drift + noise);
      points.push({
        day,
        value: Math.round(current),
        label: i === 0 ? "Now" : `Day ${day}`
      });
    }
    return points;
  }, [inputs]);

  // Projected 90-day savings metric
  const projectedSavings = useMemo(() => {
    if (graphData.length === 0) return 0;
    const finalVal = graphData[graphData.length - 1].value;
    const initialVal = graphData[0].value;
    return finalVal - initialVal;
  }, [graphData]);

  const percentageGain = useMemo(() => {
    const finalVal = graphData[graphData.length - 1].value;
    const initialVal = graphData[0].value;
    return Math.round(((finalVal - initialVal) / initialVal) * 100);
  }, [graphData]);

  // Behavior potential calculation
  const behaviorScore = useMemo(() => {
    let base = 75;
    // Positive factors
    if (inputs.marketTrend > 20) base += 5;
    if (inputs.inflationValue < 5) base += 6;
    if (inputs.globalIndices === 'bull') base += 8;
    // Negatives
    if (inputs.politicalEvent === 'tense') base -= 8;
    if (inputs.inflationValue > 10) base -= 7;
    return Math.max(50, Math.min(98, base));
  }, [inputs]);

  // SVG Chart path calculation
  const svgPath = useMemo(() => {
    if (graphData.length === 0) return '';
    const width = 600;
    const height = 180;
    const padding = 20;
    
    const minVal = Math.min(...graphData.map(d => d.value)) * 0.95;
    const maxVal = Math.max(...graphData.map(d => d.value)) * 1.05;
    const range = maxVal - minVal;

    const coords = graphData.map((d, index) => {
      const x = padding + (index / (graphData.length - 1)) * (width - padding * 2);
      const y = height - padding - ((d.value - minVal) / range) * (height - padding * 2);
      return { x, y };
    });

    // Create cubic bezier curve for smoothness
    let path = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const curr = coords[i];
      const next = coords[i + 1];
      const cpX1 = curr.x + (next.x - curr.x) / 3;
      const cpY1 = curr.y;
      const cpX2 = curr.x + 2 * (next.x - curr.x) / 3;
      const cpY2 = next.y;
      path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${next.x} ${next.y}`;
    }
    return { path, coords, minVal, maxVal, width, height, padding };
  }, [graphData]);

  return (
    <section className="py-24 bg-surface" id="brain-section">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title / Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest text-xs uppercase mb-3 block">
            THE BRAIN
          </span>
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface leading-none font-black">
            Your AI Financial Brain.
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* External Inputs (col-span-4) */}
          <div id="external-inputs-card" className="md:col-span-4 bg-surface-container-high rounded-3xl p-8 flex flex-col justify-between border border-outline-variant/10 shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="inline-block px-3 py-1 bg-primary text-on-primary rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Context Engine
                </span>
                <span className="text-xs text-on-surface-variant font-semibold flex items-center gap-1">
                  <Activity size={12} className="text-primary animate-pulse" /> Live Feed
                </span>
              </div>
              
              <h3 className="text-2xl font-black text-on-surface mb-6 tracking-tight">
                External Inputs
              </h3>
              
              {/* Slider 1: Market Trends */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-on-surface-variant flex items-center gap-1.5">
                    <TrendingUp size={14} className="text-primary" /> Market Trends
                  </label>
                  <span className="text-xs font-black px-2 py-0.5 bg-primary/10 text-primary rounded">
                    {inputs.marketTrend > 0 ? `+${inputs.marketTrend}%` : `${inputs.marketTrend}%`}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="-40" 
                  max="40" 
                  value={inputs.marketTrend}
                  onChange={(e) => setInputs(prev => ({ ...prev, marketTrend: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-white/50 rounded-full appearance-none cursor-pointer accent-primary border border-outline-variant/10"
                />
                <div className="flex justify-between text-[10px] text-on-surface-variant/70 mt-1">
                  <span>Bear (-40)</span>
                  <span>Neutral</span>
                  <span>Bull (+40)</span>
                </div>
              </div>

              {/* Selector 2: Political Events */}
              <div className="mb-6">
                <label className="block text-xs font-bold text-on-surface-variant mb-2">
                  <Globe size={14} className="text-secondary inline mr-1.5" /> Political Event Horizon
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'stable', label: 'Stable', icon: CheckCircle },
                    { id: 'tense', label: 'Tense Gas', icon: ShieldAlert },
                    { id: 'election', label: 'Stimulus', icon: Sparkles }
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => setInputs(prev => ({ ...prev, politicalEvent: item.id }))}
                      className={`py-2 px-1 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all border ${
                        inputs.politicalEvent === item.id 
                          ? 'bg-secondary text-white border-transparent shadow-sm'
                          : 'bg-white/60 text-on-surface-variant border-outline-variant/20 hover:bg-white/95'
                      }`}
                    >
                      <item.icon size={14} />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider 3: Inflation */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-on-surface-variant flex items-center gap-1.5">
                    <Percent size={14} className="text-error" /> Simulated Inflation
                  </label>
                  <span className="text-xs font-black px-2 py-0.5 bg-error/10 text-error rounded">
                    {inputs.inflationValue}%
                  </span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="15" 
                  step="0.5"
                  value={inputs.inflationValue}
                  onChange={(e) => setInputs(prev => ({ ...prev, inflationValue: parseFloat(e.target.value) }))}
                  className="w-full h-2 bg-white/50 rounded-full appearance-none cursor-pointer accent-error border border-outline-variant/10"
                />
                <div className="flex justify-between text-[10px] text-on-surface-variant/70 mt-1">
                  <span>Deflationary (2%)</span>
                  <span>High (15%)</span>
                </div>
              </div>

              {/* Selector 4: Global Indices */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-on-surface-variant mb-2">
                  <LineChart size={14} className="text-tertiary inline mr-1.5" /> Global Indices Strength
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'bear', label: 'Bear Wave' },
                    { id: 'flat', label: 'Consolidating' },
                    { id: 'bull', label: 'Hyper Growth' }
                  ].map(val => (
                    <button
                      key={val.id}
                      onClick={() => setInputs(prev => ({ ...prev, globalIndices: val.id as any }))}
                      className={`py-2 px-1 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${
                        inputs.globalIndices === val.id 
                          ? 'bg-tertiary text-white border-transparent'
                          : 'bg-white/60 text-on-surface-variant border-outline-variant/20 hover:bg-white/95'
                      }`}
                    >
                      {val.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant/10">
              <span className="text-[11px] leading-relaxed text-on-surface-variant/80 italic block">
                ⭐ Billy ingests 10k+ daily macro signals to continuously adjust and optimize your personalized 90-day cash forecast.
              </span>
            </div>
          </div>

          {/* Predictive Cash Flow (col-span-8) */}
          <div id="predictive-cashflow-card" className="md:col-span-8 bg-[#041a05] rounded-3xl p-8 text-on-primary relative overflow-hidden flex flex-col justify-between shadow-xl min-h-[500px]">
            {/* Embedded matrix grid background */}
            <div 
              className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none"
              style={{ 
                backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBy9E0vfcgD1AUYrc3C75usDKZhRBM9ajRrtyMaZBbp1vnkzhfnsN9Ay4DGfEz7zUrlshC2CmReWDD1rpw4-PV25uw5_Y9bNk54syGfzA9yBngO1nOK5C18xcgnBHEMcpvYMm7nQXV6foAbwFY-coSpUfFvNXDMLmoNqDGucHYbO4EOZBNB4uhbVog4l5shW7TOzUTgs477_1kICgImKeTJlPEOChp290AqSqOj96MaI6bsf_4fswmVLGqLT1sBZJ-Yy1r0ZqN39C96")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />

            <div className="absolute top-0 right-0 p-8 text-right z-10">
              <span className="text-[10px] font-bold text-[#59ee50] uppercase tracking-wider bg-[#59ee50]/10 px-2.5 py-1 rounded-full">
                Predicted Engine Active
              </span>
            </div>

            <div className="relative z-10 mb-6">
              <span className="text-stone-300 text-xs font-black tracking-widest uppercase block mb-1">
                90-Day Simulation Model
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2 leading-none">
                Predictive Cash Flow
              </h2>
              <div className="flex flex-wrap items-end gap-x-6 gap-y-2 mt-4 text-white">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Initial Balance</span>
                  <span className="text-xl font-bold font-mono">₹1,42,000</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Projected Balance (90d)</span>
                  <span className="text-2xl font-black font-mono text-[#59ee50] flex items-center gap-1">
                    ₹{graphData[graphData.length - 1].value.toLocaleString()}
                    <ArrowUpRight size={20} />
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Projected Growth</span>
                  <span className={`text-sm font-bold font-mono px-2 py-0.5 rounded ${percentageGain >= 0 ? 'bg-[#59ee50]/15 text-[#59ee50]' : 'bg-red-500/15 text-red-400'}`}>
                    {percentageGain >= 0 ? `+${percentageGain}%` : `${percentageGain}%`} (₹{projectedSavings.toLocaleString()})
                  </span>
                </div>
              </div>
            </div>

            {/* SVG Visualizer Chart */}
            <div className="relative h-48 md:h-56 my-4 w-full bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col justify-end z-10">
              {/* Horizontal Reference Lines */}
              <div className="absolute inset-x-0 top-1/4 border-t border-white/[0.03] pointer-events-none" />
              <div className="absolute inset-x-0 top-2/4 border-t border-white/[0.03] pointer-events-none" />
              <div className="absolute inset-x-0 top-3/4 border-t border-white/[0.03] pointer-events-none" />

              <svg 
                viewBox={`0 0 ${svgPath.width} ${svgPath.height}`} 
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                {/* Gradient Fill under Path */}
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#59ee50" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#59ee50" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d={`${svgPath.path} L ${svgPath.width - svgPath.padding} ${svgPath.height - svgPath.padding} L ${svgPath.padding} ${svgPath.height - svgPath.padding} Z`}
                  fill="url(#chartGradient)"
                  className="transition-all duration-700 ease-out"
                />

                {/* Main Curve Line */}
                <path
                  d={svgPath.path}
                  fill="none"
                  stroke="#59ee50"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />

                {/* Point nodes and tooltips */}
                {svgPath.coords.map((coord, i) => {
                  const isLast = i === svgPath.coords.length - 1;
                  return (
                    <g key={i} className="group cursor-pointer">
                      <circle
                        cx={coord.x}
                        cy={coord.y}
                        r={isLast ? "6" : "4"}
                        fill={isLast ? "#59ee50" : "#ffffff"}
                        stroke="#041a05"
                        strokeWidth="2"
                        className="transition-all duration-500 ease-out hover:r-7"
                      />
                      {/* Interactive Tooltip shown on hover or permanently for final node */}
                      <g className={`${isLast ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-300`}>
                        <rect
                          x={coord.x - 45}
                          y={coord.y - 32}
                          width="90"
                          height="22"
                          rx="4"
                          fill="#ffffff"
                          className="shadow-md"
                        />
                        <text
                          x={coord.x}
                          y={coord.y - 17}
                          fill="#041a05"
                          fontSize="9.5"
                          fontWeight="bold"
                          textAnchor="middle"
                          fontFamily="monospace"
                        >
                          ₹{graphData[i].value.toLocaleString()}
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>

              {/* X-Axis labels */}
              <div className="flex justify-between text-[10px] text-stone-400 font-mono mt-1 pt-1 z-10">
                <span>Start (Today)</span>
                <span>Day 30</span>
                <span>Day 60</span>
                <span>Day 90 (Predicted)</span>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/10 text-xs md:text-sm text-stone-300">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span>
                  🤖 <span className="font-bold text-white">Algorithm Accuracy Guarantee:</span> 87% predictive confidence based on your unique spending fingerprint.
                </span>
                <span className="text-[11px] text-[#59ee50] whitespace-nowrap bg-[#59ee50]/10 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                  ML-CashFlow ENGINE v4.2
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
