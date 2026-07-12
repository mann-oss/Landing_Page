/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Menu, X, ArrowLeft, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onBack?: () => void;
}

export default function Header({ onBack }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'The Brain', href: '#brain-section' },
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'Missions', href: '#missions-section' },
    { label: 'Pricing', href: '#pricing' }
  ];

  return (
    <header className="bg-stone-50/80 backdrop-blur-xl sticky top-0 z-50 border-b border-outline-variant/10 shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-1.5 text-xs font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}

          {/* Brand Logo */}
          <a href="#" className="text-2xl font-black tracking-tighter text-on-surface flex items-center group">
            <img
              alt="Billy Logo"
              className="h-9 w-auto inline-block mr-2 group-hover:rotate-12 transition-transform duration-300"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQSLGAmoNs3wioZdRbZ3B97qEd-bKRXHFJBQNUBiAWBoEvsgussiSiRq737suVApl_ehqXSZfOtAkGiLjuLnWj6B2U08JAas4JzIJ_RB3O08vhxnTtVI015GgwEASTWDPVvBzI3dzbaiGKX6xnkgJy-4LhXvv9QVSUoeBoEZU21xzXQ7m1MM4EYb8iNXpLYhHhmhwNA65YXaUsjkw2BjY1XEntg9DmyThdVyja3AVQC6-OncSkzuUnverulvYAPH4lOe9LORtbnq1o"
            />
            <span className="font-headline font-black text-stone-900 group-hover:text-primary transition-colors">
              Billy{' '}
              <span className="text-primary font-semibold text-[0.92em]">
                Living Ledger
              </span>
            </span>
          </a>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link, idx) => (
            <a 
              key={idx} 
              href={link.href}
              className="font-body text-sm font-bold text-on-surface-variant hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Top Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a 
            href="#pricing" 
            className="text-xs font-black bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-all flex items-center gap-1"
          >
            <Sparkles size={12} /> Go Pro Pro
          </a>
          <a 
            href="#beta" 
            className="bg-primary text-on-primary font-body text-sm font-bold px-5 py-2.5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-md"
          >
            Get Beta Access
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-on-surface hover:text-primary transition-colors focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-outline-variant/10 px-6 py-4 flex flex-col gap-4 animate-fadeIn">
          {navLinks.map((link, idx) => (
            <a 
              key={idx} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-body text-base font-bold text-on-surface-variant hover:text-primary transition-colors block py-1 border-b border-stone-100"
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-3 pt-2">
            <a 
              href="#pricing"
              onClick={() => setIsOpen(false)}
              className="bg-primary/10 text-primary text-center font-bold text-sm py-3 rounded-full flex items-center justify-center gap-1"
            >
              <Sparkles size={14} /> Billy Pro - ₹50/mo
            </a>
            <a 
              href="#beta"
              onClick={() => setIsOpen(false)}
              className="bg-primary text-on-primary text-center font-bold text-sm py-3 rounded-full"
            >
              Join Beta Trial
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
