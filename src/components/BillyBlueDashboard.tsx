/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  FileText, 
  TrendingUp, 
  Briefcase, 
  Check, 
  FileCheck, 
  Download, 
  Printer, 
  CreditCard,
  Layers,
  Sparkles,
  Send,
  Sparkle
} from 'lucide-react';
import { Invoice, BusinessMetric, InvoiceItem } from '../types';
import { BLUE_INVOICES, BLUE_METRICS } from '../data';

interface BillyBlueDashboardProps {
  onBack: () => void;
}

export default function BillyBlueDashboard({ onBack }: BillyBlueDashboardProps) {
  // Local state for active business metrics
  const [metrics, setMetrics] = useState<BusinessMetric[]>(BLUE_METRICS);
  // Local state for Invoices
  const [invoices, setInvoices] = useState<Invoice[]>(BLUE_INVOICES);

  // New Invoice form state
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    { id: 'item-1', description: 'Consulting Services', quantity: 5, rate: 150 }
  ]);
  const [itemDesc, setItemDesc] = useState('');
  const [itemQty, setItemQty] = useState('1');
  const [itemRate, setItemRate] = useState('100');

  // Currently selected invoice for detailed preview
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>(invoices[0]?.id || '');
  const activePreviewInvoice = invoices.find(inv => inv.id === selectedInvoiceId) || invoices[0];

  // In-app premium toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Calculations
  const totalRevenue = invoices
    .filter(inv => inv.status === 'Paid')
    .reduce((sum, inv) => {
      const invTotal = inv.items.reduce((total, i) => total + (i.quantity * i.rate), 0);
      return sum + invTotal;
    }, 0);

  const pendingReceivables = invoices
    .filter(inv => inv.status === 'Sent')
    .reduce((sum, inv) => {
      const invTotal = inv.items.reduce((total, i) => total + (i.quantity * i.rate), 0);
      return sum + invTotal;
    }, 0);

  const overdueAmount = invoices
    .filter(inv => inv.status === 'Overdue')
    .reduce((sum, inv) => {
      const invTotal = inv.items.reduce((total, i) => total + (i.quantity * i.rate), 0);
      return sum + invTotal;
    }, 0);

  // Toast trigger
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Add temp item to invoice constructor
  const addConstructorItem = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseInt(itemQty);
    const rate = parseFloat(itemRate);
    if (!itemDesc.trim() || isNaN(qty) || qty <= 0 || isNaN(rate) || rate <= 0) return;

    const newItem: InvoiceItem = {
      id: `item-${Date.now()}`,
      description: itemDesc,
      quantity: qty,
      rate: rate
    };

    setInvoiceItems([...invoiceItems, newItem]);
    setItemDesc('');
    setItemQty('1');
    setItemRate('100');
  };

  // Remove temp item from constructor
  const removeConstructorItem = (id: string) => {
    setInvoiceItems(prev => prev.filter(i => i.id !== id));
  };

  // Finalize & Create Invoice
  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim() || invoiceItems.length === 0) return;

    const newInvoice: Invoice = {
      id: `INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      clientName,
      clientEmail,
      items: invoiceItems,
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Sent'
    };

    setInvoices([newInvoice, ...invoices]);
    setSelectedInvoiceId(newInvoice.id);

    // Reset Form
    setClientName('');
    setClientEmail('');
    setInvoiceItems([{ id: 'item-1', description: 'Consulting Services', quantity: 5, rate: 150 }]);
    triggerToast(`Published Invoice ${newInvoice.id} for ${clientName}`);
  };

  // Update Status of invoice
  const updateInvoiceStatus = (id: string, newStatus: Invoice['status']) => {
    setInvoices(prev => 
      prev.map(inv => {
        if (inv.id === id) {
          return { ...inv, status: newStatus };
        }
        return inv;
      })
    );
    triggerToast(`Status updated to [${newStatus}] for ${id}`);
  };

  // Delete invoice
  const handleDeleteInvoice = (id: string) => {
    const nextInvoices = invoices.filter(inv => inv.id !== id);
    setInvoices(nextInvoices);
    if (selectedInvoiceId === id && nextInvoices.length > 0) {
      setSelectedInvoiceId(nextInvoices[0].id);
    }
    triggerToast(`Archived Invoice record ${id}`);
  };

  // Custom SVG Chart points calculations
  const chartHeight = 120;
  const chartWidth = 500;
  const maxMetricVal = Math.max(...metrics.map(m => m.revenue));
  
  const generateChartPoints = (key: 'revenue' | 'expenses') => {
    return metrics.map((m, index) => {
      const x = (index / (metrics.length - 1)) * (chartWidth - 40) + 20;
      const val = m[key];
      const y = chartHeight - (val / maxMetricVal) * (chartHeight - 30) - 15;
      return `${x},${y}`;
    }).join(' ');
  };

  return (
    <div id="blue-app-viewport" className="min-h-screen bg-[#050a12] text-slate-100 font-sans p-4 md:p-8 relative overflow-hidden selection:bg-gold-500/20 selection:text-gold-400">
      
      {/* Sleek executive backdrops */}
      <div className="absolute top-[-25%] right-[-10%] w-[50%] h-[50%] rounded-full bg-sky-950/20 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-slate-900/40 blur-[130px] pointer-events-none" />

      {/* Elegant Platinum gold top header bar */}
      <div className="absolute top-0 left-0 w-full h-[5px] bg-gradient-to-r from-sky-900 via-gold-400 to-indigo-950" />

      {/* Header Container */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8 relative z-10 pt-4">
        <div className="flex items-center gap-5">
          <button 
            id="back-to-landing-blue"
            onClick={onBack}
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition-all duration-300 shadow-md cursor-pointer"
            title="Go Back to Split Screen"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-0.5 text-[9px] font-semibold font-mono tracking-widest bg-amber-400/10 text-gold-400 border border-gold-400/20 rounded-md">
                INSTITUTIONAL SUITE
              </span>
              <span className="flex items-center gap-1.5 text-xs text-sky-400 font-medium font-mono">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" /> LEDGER_ONLINE
              </span>
            </div>
            <h1 className="text-3xl font-serif tracking-tight text-white mt-1">
              Billy <span className="italic font-normal text-gold-400">Blue</span>
            </h1>
          </div>
        </div>

        {/* Corporate Header Info banner */}
        <div className="flex items-center gap-3 bg-slate-900/65 border border-slate-800 px-4 py-3 rounded-xl text-xs text-slate-300 shadow-md backdrop-blur-md max-w-sm">
          <Briefcase className="w-4 h-4 text-gold-400 shrink-0" />
          <span>Professional invoicing, accounts receivable tracking, and cash trend projections for independent consultancies.</span>
        </div>
      </div>

      {/* Corporate Summary Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 relative z-10">
        <div className="bg-[#0b1424]/90 border border-slate-800/80 p-5 rounded-2xl shadow-md">
          <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">Settled Revenue</span>
          <h3 className="text-2xl font-bold text-white mt-2 font-mono">${totalRevenue.toFixed(2)}</h3>
          <p className="text-[10px] text-emerald-400 mt-1 font-sans">Collected funds</p>
        </div>
        <div className="bg-[#0b1424]/90 border border-slate-800/80 p-5 rounded-2xl shadow-md">
          <span className="text-[10px] text-sky-400 uppercase font-mono tracking-wider">Receivables</span>
          <h3 className="text-2xl font-bold text-sky-300 mt-2 font-mono">${pendingReceivables.toFixed(2)}</h3>
          <p className="text-[10px] text-sky-400/70 mt-1 font-sans font-normal">Awaiting client clearing</p>
        </div>
        <div className="bg-[#0b1424]/90 border border-slate-800/80 p-5 rounded-2xl shadow-md">
          <span className="text-[10px] text-rose-400 uppercase font-mono tracking-wider">Overdue Accounts</span>
          <h3 className="text-2xl font-bold text-rose-400 mt-2 font-mono">${overdueAmount.toFixed(2)}</h3>
          <p className="text-[10px] text-rose-400/70 mt-1 font-sans font-normal">Requires follow-up action</p>
        </div>
        <div className="bg-[#0b1424]/90 border border-slate-800/80 p-5 rounded-2xl shadow-md">
          <span className="text-[10px] text-indigo-300 uppercase font-mono tracking-wider">Estimated Q3 Taxes</span>
          <h3 className="text-2xl font-bold text-indigo-300 mt-2 font-mono">${(totalRevenue * 0.22).toFixed(2)}</h3>
          <p className="text-[10px] text-slate-400 mt-1 font-sans font-normal">Calculated flat 22% levy</p>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* LEFT COLUMN: Performance Trend & Creator Form */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          
          {/* Performance Trend Chart */}
          <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-lg backdrop-blur-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-gold-400" />
                Capital Performance Ledger
              </h2>
              <div className="flex items-center gap-3.5 text-[9px] font-mono font-medium text-slate-400">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-sky-400" /> Inflows</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-500" /> Expenses</span>
              </div>
            </div>

            {/* HAND-CRAFTED SVG CHART */}
            <div className="relative w-full h-[140px] bg-[#030910] border border-slate-800/60 rounded-xl p-2 shadow-inner">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15"/>
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                
                {/* Horizontal gridlines */}
                <line x1="20" y1="20" x2="480" y2="20" stroke="#0f1d30" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="20" y1="65" x2="480" y2="65" stroke="#0f1d30" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="20" y1="110" x2="480" y2="110" stroke="#0f1d30" strokeWidth="1" strokeDasharray="3,3" />

                {/* Shaded Area under Revenue curve */}
                <path
                  d={`M 20,${chartHeight - 15} L ${generateChartPoints('revenue')} L 480,${chartHeight - 15} Z`}
                  fill="url(#revGrad)"
                />

                {/* Line curves */}
                <polyline
                  fill="none"
                  stroke="#dfb15b"
                  strokeWidth="2.5"
                  points={generateChartPoints('revenue')}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="1.5"
                  points={generateChartPoints('expenses')}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Data point markers */}
                {metrics.map((m, idx) => {
                  const x = (idx / (metrics.length - 1)) * (chartWidth - 40) + 20;
                  const revY = chartHeight - (m.revenue / maxMetricVal) * (chartHeight - 30) - 15;
                  return (
                    <g key={idx}>
                      <circle cx={x} cy={revY} r="3.5" fill="#050a12" stroke="#dfb15b" strokeWidth="2" />
                      <text x={x} y={chartHeight - 2} fill="#64748b" fontSize="8" textAnchor="middle" fontFamily="monospace">
                        {m.month}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-500 mt-2 font-mono">
              <span>* Projected from standard business growth trajectory.</span>
              <span className="text-gold-400">MoM Inflows: +12.4%</span>
            </div>
          </div>

          {/* Invoice Creator form */}
          <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-lg backdrop-blur-md">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3.5 flex items-center gap-2">
              <FileText className="w-4 h-4 text-gold-400" />
              Bespoke Billing Desk
            </h2>

            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-mono font-semibold mb-1">Client Business Name</label>
                  <input 
                    type="text"
                    required
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    className="w-full text-xs bg-[#0b1424] border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-slate-700"
                    placeholder="e.g. Apex Global Corp"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-mono font-semibold mb-1">Client Representative Email</label>
                  <input 
                    type="email"
                    required
                    value={clientEmail}
                    onChange={e => setClientEmail(e.target.value)}
                    className="w-full text-xs bg-[#0b1424] border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-slate-700"
                    placeholder="billing@apex.com"
                  />
                </div>
              </div>

              {/* Add invoice line items */}
              <div className="border border-slate-800 p-4 rounded-xl bg-[#030910]/50">
                <span className="block text-[10px] text-slate-300 uppercase font-mono font-semibold mb-2">Service Builder Ledger</span>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-2 mb-3">
                  <div className="md:col-span-6">
                    <input 
                      type="text"
                      value={itemDesc}
                      onChange={e => setItemDesc(e.target.value)}
                      placeholder="Line Item (e.g. Design Consulting)"
                      className="w-full text-xs bg-[#0b1424] border border-slate-800/80 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-slate-700"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <input 
                      type="number"
                      value={itemQty}
                      onChange={e => setItemQty(e.target.value)}
                      placeholder="Qty"
                      className="w-full text-xs bg-[#0b1424] border border-slate-800/80 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-slate-700 font-mono"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <input 
                      type="number"
                      value={itemRate}
                      onChange={e => setItemRate(e.target.value)}
                      placeholder="Hourly Rate"
                      className="w-full text-xs bg-[#0b1424] border border-slate-800/80 rounded-lg px-2.5 py-1.5 text-white focus:outline-none focus:border-slate-700 font-mono"
                    />
                  </div>
                  <div className="md:col-span-1 flex">
                    <button
                      type="button"
                      onClick={addConstructorItem}
                      className="w-full bg-slate-800 border border-slate-700 text-slate-300 hover:bg-gold-500 hover:text-slate-950 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                      title="Add line item"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Listed Constructor Items */}
                {invoiceItems.length === 0 ? (
                  <p className="text-[11px] text-slate-500 italic text-center py-1">Please build services line items.</p>
                ) : (
                  <div className="space-y-1.5 max-h-[110px] overflow-y-auto pr-1">
                    {invoiceItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-[11px] bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                        <span className="text-white truncate font-medium max-w-[200px]">{item.description}</span>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-gold-400 font-semibold">
                            {item.quantity} × ${item.rate.toFixed(2)}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeConstructorItem(item.id)}
                            className="text-slate-500 hover:text-rose-500 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">
                  Total Value:{' '}
                  <span className="font-mono font-bold text-white text-sm">
                    ${invoiceItems.reduce((acc, i) => acc + (i.quantity * i.rate), 0).toFixed(2)}
                  </span>
                </span>
                <button
                  type="submit"
                  disabled={invoiceItems.length === 0 || !clientName || !clientEmail}
                  className="bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" /> Transmit Secure Invoice
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* RIGHT COLUMN: Directory & Print preview */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          
          {/* Active Ledger Directory */}
          <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-lg backdrop-blur-md">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-gold-400" />
              Invoices Vault Directory
            </h2>

            <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
              {invoices.map(inv => {
                const total = inv.items.reduce((acc, i) => acc + (i.quantity * i.rate), 0);
                const isSelected = inv.id === selectedInvoiceId;
                return (
                  <div
                    key={inv.id}
                    onClick={() => setSelectedInvoiceId(inv.id)}
                    className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all duration-200 flex items-center justify-between ${
                      isSelected 
                        ? 'bg-[#0f1b2e] border-sky-500/50 shadow-[0_4px_16px_rgba(14,165,233,0.1)]' 
                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-white font-semibold">{inv.id}</span>
                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold ${
                          inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          inv.status === 'Sent' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' :
                          'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          {inv.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">{inv.clientName}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-white font-bold">${total.toFixed(2)}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteInvoice(inv.id);
                        }}
                        className="text-slate-500 hover:text-rose-500 p-1 rounded-md"
                        title="Delete Invoice"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dynamic Invoice Render preview sheet */}
          <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-lg backdrop-blur-md relative flex-1 flex flex-col justify-between">
            
            <div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-3.5 mb-4">
                <span className="text-[10px] text-slate-300 uppercase font-mono tracking-wider flex items-center gap-1.5 font-bold">
                  <FileCheck className="w-4 h-4 text-gold-400" />
                  Live Corporate Receipt Sheet
                </span>

                <div className="flex gap-1.5">
                  <button 
                    onClick={() => triggerToast('Generated certified PDF download link in production.')}
                    className="p-1.5 text-slate-400 hover:text-white bg-slate-800 border border-slate-700 rounded-lg cursor-pointer"
                    title="Export PDF"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => window.print()}
                    className="p-1.5 text-slate-400 hover:text-white bg-slate-800 border border-slate-700 rounded-lg cursor-pointer"
                    title="Print Document"
                  >
                    <Printer className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {activePreviewInvoice ? (
                <div className="p-5 bg-white text-slate-800 rounded-xl shadow-inner text-xs border border-slate-200">
                  <div className="flex justify-between items-start border-b border-slate-100 pb-3.5 mb-3.5">
                    <div>
                      <h4 className="font-bold text-slate-900 tracking-tight text-sm font-serif">BILLY ENTERPRISES</h4>
                      <p className="text-[9px] text-slate-400 mt-0.5">Automated Ledger System • Secure ID</p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-slate-900 font-bold block">{activePreviewInvoice.id}</span>
                      <span className="text-[9px] text-slate-400">Date Issued: {activePreviewInvoice.date}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-[9px] text-slate-400 uppercase font-bold block mb-0.5">Billed To:</span>
                      <h5 className="font-bold text-slate-800">{activePreviewInvoice.clientName}</h5>
                      <p className="text-[9px] text-slate-500">{activePreviewInvoice.clientEmail}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-slate-400 uppercase font-bold block mb-0.5">Term limits:</span>
                      <p className="text-[9px] text-slate-600">Net 30 Days</p>
                      <p className="text-[9px] text-slate-800 font-bold">Due: {activePreviewInvoice.dueDate}</p>
                    </div>
                  </div>

                  {/* Table of items */}
                  <div className="border border-slate-150 rounded-lg overflow-hidden mb-3.5">
                    <div className="grid grid-cols-12 bg-slate-50 border-b border-slate-150 px-2.5 py-1.5 text-[9px] font-bold text-slate-500 uppercase">
                      <div className="col-span-6">Service Description</div>
                      <div className="col-span-2 text-center">Qty</div>
                      <div className="col-span-2 text-right">Rate</div>
                      <div className="col-span-2 text-right font-bold">Total</div>
                    </div>
                    
                    {activePreviewInvoice.items.map((it, index) => (
                      <div key={index} className="grid grid-cols-12 px-2.5 py-2 text-[10px] text-slate-700 border-b border-slate-100 last:border-0">
                        <div className="col-span-6 font-semibold truncate">{it.description}</div>
                        <div className="col-span-2 text-center font-mono">{it.quantity}</div>
                        <div className="col-span-2 text-right font-mono">${it.rate.toFixed(2)}</div>
                        <div className="col-span-2 text-right font-mono font-bold">${(it.quantity * it.rate).toFixed(2)}</div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="flex justify-end pt-2 border-t border-slate-100">
                    <div className="text-right space-y-1 w-[150px]">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Subtotal:</span>
                        <span className="font-mono text-slate-700">${activePreviewInvoice.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>VAT (0%):</span>
                        <span className="font-mono text-slate-700">$0.00</span>
                      </div>
                      <div className="flex justify-between text-[11px] font-bold text-slate-900 pt-1 border-t border-slate-150">
                        <span>Total Due:</span>
                        <span className="font-mono text-slate-950">${activePreviewInvoice.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 text-slate-500 text-xs">
                  Select an active invoice to render premium preview sheet.
                </div>
              )}
            </div>

            {/* Quick status controller */}
            {activePreviewInvoice && (
              <div className="border-t border-slate-850 pt-4 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-gold-400" />
                  <span className="text-[11px] text-slate-300 font-semibold font-mono">SET STATE IN LEDGER:</span>
                </div>
                
                <div className="flex gap-1.5">
                  <button 
                    onClick={() => updateInvoiceStatus(activePreviewInvoice.id, 'Paid')}
                    className="text-[10px] bg-emerald-950/30 hover:bg-emerald-500 border border-emerald-800 text-emerald-400 hover:text-slate-950 px-2.5 py-1.5 rounded-lg transition-all font-semibold cursor-pointer"
                  >
                    Paid
                  </button>
                  <button 
                    onClick={() => updateInvoiceStatus(activePreviewInvoice.id, 'Sent')}
                    className="text-[10px] bg-sky-950/30 hover:bg-sky-500 border border-sky-800 text-sky-400 hover:text-slate-950 px-2.5 py-1.5 rounded-lg transition-all font-semibold cursor-pointer"
                  >
                    Sent
                  </button>
                  <button 
                    onClick={() => updateInvoiceStatus(activePreviewInvoice.id, 'Overdue')}
                    className="text-[10px] bg-rose-950/30 hover:bg-rose-500 border border-rose-850 text-rose-400 hover:text-slate-950 px-2.5 py-1.5 rounded-lg transition-all font-semibold cursor-pointer"
                  >
                    Overdue
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Luxury enterprise Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0c1626] text-white px-5 py-3 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2.5 text-xs font-semibold"
          >
            <Sparkle className="w-4 h-4 text-gold-400 shrink-0 animate-spin" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
