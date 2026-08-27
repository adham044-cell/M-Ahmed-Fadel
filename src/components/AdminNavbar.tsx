import React, { useState } from 'react';
import { Menu, X, LayoutDashboard, PlusCircle, Users, History, LogOut, ShieldCheck } from 'lucide-react';
import { PageView } from '../types';
import { useAuth } from '../context/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import { ASSETS } from '../assets';

interface AdminNavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useAuth();

  const navLinks = [
    { label: 'الرئيسية', page: 'admin-dashboard' as PageView, icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'إضافة كورسات', page: 'admin-courses' as PageView, icon: <PlusCircle className="w-4 h-4" /> },
    { label: 'المستخدمين', page: 'admin-users' as PageView, icon: <Users className="w-4 h-4" /> },
    { label: 'سجل التعديلات', page: 'admin-logs' as PageView, icon: <History className="w-4 h-4" /> },
  ];

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-[#0D0D0D] text-[#F2F2F2] shadow-lg transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Teacher Branding with Admin Badge */}
          <div 
            id="admin-logo-brand"
            onClick={() => handleNavClick('admin-dashboard')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative">
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-amber-400 shadow-md">
                <img 
                  src={ASSETS.teacher} 
                  alt="M/Ahmed Fadel" 
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 bg-rose-500 text-white p-0.5 rounded-full ring-2 ring-[#0D0D0D]">
                <ShieldCheck className="w-3 h-3" />
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-serif-display text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  The Sniper
                </span>
                <span className="px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  الإدارة
                </span>
              </div>
              <span className="text-[11px] font-medium text-neutral-400 font-latin italic">
                M/Ahmed Fadel
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map(link => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  id={`admin-nav-${link.page}`}
                  onClick={() => handleNavClick(link.page)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/30'
                      : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Admin Tools & Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle id="admin-theme-toggle" />

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-xs font-bold text-neutral-300">مسؤول النظام</span>
            </div>

            <button
              id="admin-logout-btn"
              onClick={handleLogout}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-300 hover:text-white bg-rose-500/20 hover:bg-rose-600/40 border border-rose-500/30 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>خروج</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle id="admin-mobile-theme-toggle" />
            <button
              id="admin-mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-neutral-200 hover:bg-neutral-900"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-800 bg-[#0D0D0D] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2">
          {navLinks.map(link => (
            <button
              key={link.page}
              onClick={() => handleNavClick(link.page)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold ${
                currentPage === link.page
                  ? 'bg-amber-500 text-neutral-950'
                  : 'text-neutral-200 hover:bg-neutral-900'
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </button>
          ))}

          <div className="pt-3 border-t border-neutral-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-rose-300 bg-rose-500/20 hover:bg-rose-600/30"
            >
              <LogOut className="w-4 h-4" />
              <span>تسجيل الخروج من الإدارة</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
