import React, { useState } from 'react';
import { Menu, X, BookOpen, GraduationCap, User, MessageCircle, LogOut, Sparkles } from 'lucide-react';
import { PageView } from '../types';
import { useAuth } from '../context/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import { ASSETS } from '../assets';

interface StudentNavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

export const StudentNavbar: React.FC<StudentNavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const navLinks = [
    { label: 'الرئيسية', page: 'student-home' as PageView, icon: <Sparkles className="w-4 h-4" /> },
    { label: 'الكورسات', page: 'courses' as PageView, icon: <BookOpen className="w-4 h-4" /> },
    { label: 'كورساتي', page: 'my-courses' as PageView, icon: <GraduationCap className="w-4 h-4" /> },
    { label: 'حسابي', page: 'profile' as PageView, icon: <User className="w-4 h-4" /> },
  ];

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+201018432929', '_blank', 'noopener,noreferrer');
  };

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  // Extract first two names for short badge
  const studentShortName = user?.fullName 
    ? user.fullName.split(' ').slice(0, 2).join(' ')
    : 'طالب';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white/90 dark:bg-[#0D0D0D]/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Teacher Branding */}
          <div 
            id="student-logo-brand"
            onClick={() => handleNavClick('student-home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative">
              <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-amber-500/80 shadow-sm group-hover:scale-105 transition-transform duration-200 bg-neutral-100 dark:bg-neutral-900">
                <img 
                  src={ASSETS.teacher} 
                  alt="M/Ahmed Fadel" 
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-serif-display text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-[#F2F2F2] group-hover:text-amber-500 transition-colors">
                  The Sniper
                </span>
                <span className="px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  بوابة الطالب
                </span>
              </div>
              <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 font-latin italic">
                M/Ahmed Fadel
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  id={`student-nav-${link.page}`}
                  onClick={() => handleNavClick(link.page)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-500 text-neutral-950 font-bold shadow-sm shadow-amber-500/30'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </button>
              );
            })}

            {/* WhatsApp Contact */}
            <button
              id="student-nav-whatsapp"
              onClick={handleWhatsAppClick}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>تواصل معنا</span>
            </button>
          </nav>

          {/* User Profile Info + Theme + Logout */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle id="student-theme-toggle" />

            <div 
              id="student-profile-chip"
              onClick={() => handleNavClick('profile')}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-900/80 cursor-pointer hover:border-amber-500/50 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center font-bold text-xs">
                {studentShortName[0]}
              </div>
              <div className="flex flex-col text-right">
                <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 line-clamp-1 max-w-[130px]">
                  {studentShortName}
                </span>
                <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
                  طالب
                </span>
              </div>
            </div>

            <button
              id="student-logout-btn"
              onClick={handleLogout}
              className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              title="تسجيل الخروج"
              aria-label="تسجيل الخروج"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle id="student-mobile-theme-toggle" />
            <button
              id="student-mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0D0D0D] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center font-bold text-base">
              {studentShortName[0]}
            </div>
            <div>
              <p className="text-sm font-bold text-neutral-900 dark:text-white">{user?.fullName}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">{user?.email}</p>
            </div>
          </div>

          <div className="space-y-1">
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  currentPage === link.page
                    ? 'bg-amber-500 text-neutral-950 font-bold'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            ))}

            <button
              onClick={handleWhatsAppClick}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
            >
              <MessageCircle className="w-4 h-4" />
              <span>تواصل معنا (واتساب)</span>
            </button>
          </div>

          <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
            >
              <LogOut className="w-4 h-4" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
