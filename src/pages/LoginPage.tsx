import React, { useState } from 'react';
import { Lock, Mail, ArrowLeft, LogIn, AlertCircle, Sparkles, Shield, User } from 'lucide-react';
import { PageView } from '../types';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ASSETS } from '../assets';

interface LoginPageProps {
  onNavigate: (page: PageView) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login } = useAuth();
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    const result = login(email.trim(), password);
    setIsLoading(false);

    if (result.success) {
      toast.success(result.message);
      if (result.role === 'admin') {
        onNavigate('admin-dashboard');
      } else {
        onNavigate('student-home');
      }
    } else {
      // Must display "يوجد خطأ في البيانات المدخلة" as per specs
      setErrorMessage(result.message || 'يوجد خطأ في البيانات المدخلة');
    }
  };

  const handleQuickDemoLogin = (role: 'student' | 'admin') => {
    setErrorMessage('');
    const targetEmail = role === 'admin' ? 'admin808@thesniper.com' : 'student@thesniper.com';
    const targetPassword = role === 'admin' ? 'M.ahmed0fadel' : 'Student2026!';

    setEmail(targetEmail);
    setPassword(targetPassword);

    const result = login(targetEmail, targetPassword);
    if (result.success) {
      toast.success(role === 'admin' ? 'تم تسجيل الدخول كمسؤول (Admin) بنجاح' : 'تم تسجيل الدخول كطالب تجريبي بنجاح');
      if (result.role === 'admin') {
        onNavigate('admin-dashboard');
      } else {
        onNavigate('student-home');
      }
    } else {
      // Try alias credentials if first attempt fails
      const aliasEmail = role === 'admin' ? 'admin@thesniper.com' : 'ziad.ahmed@example.com';
      const aliasPass = role === 'admin' ? 'admin1234' : 'student123';
      const fallbackResult = login(aliasEmail, aliasPass);
      if (fallbackResult.success) {
        toast.success('تم تسجيل الدخول بنجاح');
        if (fallbackResult.role === 'admin') {
          onNavigate('admin-dashboard');
        } else {
          onNavigate('student-home');
        }
      } else {
        setErrorMessage(result.message || 'يوجد خطأ في البيانات المدخلة');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center space-y-3">
        {/* Logo / Badge */}
        <div 
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-3 cursor-pointer group mb-2"
        >
          <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-amber-500 shadow-md">
            <img src={ASSETS.logo} alt="The Sniper" className="w-full h-full object-cover" />
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-black font-latin text-slate-900 dark:text-white">
              The Sniper
            </h2>
            <p className="text-[11px] font-bold text-amber-500">M/Ahmed Fadel</p>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          تسجيل الدخول إلى المنصة
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          أدخل بريدك الإلكتروني وكلمة المرور للمتابعة
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white dark:bg-slate-900 py-8 px-6 sm:px-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          
          {/* Error Banner */}
          {errorMessage && (
            <div 
              id="login-error-banner"
              className="flex items-center gap-3 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 text-xs sm:text-sm animate-in fade-in"
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span className="font-semibold">{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                البريد الإلكتروني (Email) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="login-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full pl-4 pr-10 py-3 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 font-latin"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  كلمة المرور <span className="text-rose-500">*</span>
                </label>
              </div>
              <div className="relative">
                <input
                  id="login-password-input"
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-4 pr-10 py-3 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                id="login-submit-btn"
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] disabled:opacity-50"
              >
                <LogIn className="w-4 h-4" />
                <span>تسجيل الدخول</span>
              </button>
            </div>
          </form>

          {/* Quick Demo Test Logins */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
            <p className="text-[11px] font-bold text-center text-slate-500 dark:text-slate-400">
              حسابات تجريبية للاختبار السريع (Demo Accounts):
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('student')}
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-amber-500/10 hover:border-amber-500 text-slate-700 dark:text-slate-200 transition-colors"
              >
                <User className="w-3.5 h-3.5 text-amber-500" />
                <span>حساب طالب تجريبي</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin')}
                className="flex items-center justify-center gap-1.5 p-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-indigo-500/10 hover:border-indigo-500 text-slate-700 dark:text-slate-200 transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-indigo-500" />
                <span>حساب مدير (Admin)</span>
              </button>
            </div>
          </div>

          {/* Switch to Register */}
          <div className="text-center pt-2">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              ليس لديك حساب بعد؟{' '}
              <button
                id="goto-register-btn"
                onClick={() => onNavigate('register')}
                className="font-bold text-amber-600 dark:text-amber-400 hover:underline"
              >
                إنشاء حساب طالب جديد
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
