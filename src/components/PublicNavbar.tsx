import React, { useState } from 'react';
import { Menu, X, LogIn, UserPlus, MessageCircle, BookOpen, Sparkles, Shield } from 'lucide-react';
import { PageView } from '../types';
import { ThemeToggle } from './ThemeToggle';
import { ASSETS } from '../assets';

interface PublicNavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'الرئيسية', page: 'home' as PageView },
    { label: 'الكورسات', page: 'courses' as PageView },
    { label: 'من نحن', page: 'about' as PageView },
  ];

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+201018432929', '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white/90 dark:bg-[#0D0D0D]/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Teacher Info */}
          <div 
            id="public-logo-brand"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500/80 shadow-md shadow-amber-500/10 group-hover:scale-105 transition-transform duration-200 bg-neutral-100 dark:bg-neutral-900">
                <img 
                  src={ASSETS.teacher} 
                  alt="M/Ahmed Fadel" 
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 border-2 border-white dark:border-[#0D0D0D]"></span>
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-serif-display text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-[#F2F2F2] group-hover:text-amber-500 transition-colors">
                  The Sniper
                </span>
                <span className="px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  English
                </span>
              </div>
              <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 font-latin italic">
                M/Ahmed Fadel
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map(link => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  id={`nav-link-${link.page}`}
                  onClick={() => handleNavClick(link.page)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm shadow-amber-500/30'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* WhatsApp Contact Link */}
            <button
              id="nav-whatsapp-btn"
              onClick={handleWhatsAppClick}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>تواصل معنا</span>
            </button>
          </nav>

          {/* Right Action Controls: Theme + Login + Register */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle id="public-theme-toggle" />

            <button
              id="public-login-btn"
              onClick={() => handleNavClick('login')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 hover:border-amber-500/50 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>تسجيل الدخول</span>
            </button>

            <button
              id="public-register-btn"
              onClick={() => handleNavClick('register')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-600 text-neutral-950 shadow-md shadow-amber-500/20 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>إنشاء حساب</span>
            </button>
          </div>

          {/* Mobile Menu & Theme Toggle Trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <ThemeToggle id="mobile-theme-toggle" />
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0D0D0D] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
          <div className="space-y-1">
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`w-full text-right px-4 py-2.5 rounded-xl text-base font-semibold ${
                  currentPage === link.page
                    ? 'bg-amber-500 text-neutral-950 font-bold'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                }`}
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={handleWhatsAppClick}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-base font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span>تواصل معنا (واتساب)</span>
              </div>
              <span className="text-xs text-neutral-400 font-latin">01018432929</span>
            </button>
          </div>

          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNavClick('login')}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200"
            >
              <LogIn className="w-4 h-4" />
              <span>تسجيل الدخول</span>
            </button>
            <button
              onClick={() => handleNavClick('register')}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold bg-amber-500 text-neutral-950"
            >
              <UserPlus className="w-4 h-4" />
              <span>إنشاء حساب</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
