import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { ThemeService } from '../services/theme';
import { ThemeMode } from '../types';

export const ThemeToggle: React.FC<{ id?: string }> = ({ id = 'theme-toggle-btn' }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => ThemeService.getTheme());

  useEffect(() => {
    ThemeService.applyTheme(theme);
  }, [theme]);

  const handleToggle = () => {
    const next = ThemeService.toggleTheme();
    setThemeState(next);
  };

  return (
    <button
      id={id}
      onClick={handleToggle}
      className="relative p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
      aria-label="تبديل المظهر"
      title={theme === 'dark' ? 'التحويل إلى المظهر الفاتح' : 'التحويل إلى المظهر الليلي'}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-amber-400 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-5 h-5 text-indigo-600 transition-transform hover:-rotate-12" />
      )}
    </button>
  );
};
