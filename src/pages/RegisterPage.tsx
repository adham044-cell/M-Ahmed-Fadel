import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  Lock, 
  GraduationCap, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  Sparkles,
  Users
} from 'lucide-react';
import { PageView, GradeLevel } from '../types';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { ValidationService } from '../services/validation';
import { ASSETS } from '../assets';

interface RegisterPageProps {
  onNavigate: (page: PageView) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const { register } = useAuth();
  const toast = useToast();

  const [fullName, setFullName] = useState('');
  const [grade, setGrade] = useState<GradeLevel>('third');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [parentPhoneNumber, setParentPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    // 1. Validate 4-part name
    const nameCheck = ValidationService.validateFourPartName(fullName);
    if (!nameCheck.isValid) {
      newErrors.fullName = nameCheck.message || 'يرجى إدخال اسم رباعي صحيح باللغة العربية';
    }

    // 2. Validate Student Phone
    const phoneCheck = ValidationService.validateEgyptianPhone(phoneNumber);
    if (!phoneCheck.isValid) {
      newErrors.phoneNumber = phoneCheck.message || 'رقم هاتف الطالب غير صحيح';
    }

    // 3. Validate Parent Phone
    const parentPhoneCheck = ValidationService.validateEgyptianPhone(parentPhoneNumber);
    if (!parentPhoneCheck.isValid) {
      newErrors.parentPhoneNumber = 'يجب أن يكون رقم ولي الأمر 11 رقماً ويبدأ بـ (010, 011, 012, 015)';
    }

    // 4. Validate Email
    const emailCheck = ValidationService.validateEmail(email);
    if (!emailCheck.isValid) {
      newErrors.email = emailCheck.message || 'البريد الإلكتروني غير صحيح';
    }

    // 5. Validate Password
    const passCheck = ValidationService.validatePassword(password);
    if (!passCheck.isValid) {
      newErrors.password = passCheck.message || 'كلمة المرور غير مطابقة للشروط';
    }

    // 6. Match confirm password
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'كلمة المرور وتأكيدها غير متطابقين';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    const result = register({
      fullName: fullName.trim(),
      grade,
      phoneNumber: phoneNumber.trim(),
      parentPhoneNumber: parentPhoneNumber.trim(),
      email: email.trim(),
      password,
    });
    setIsLoading(false);

    if (result.success) {
      toast.success(result.message);
      onNavigate('student-home');
    } else {
      setErrors({ global: result.message });
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-xl relative z-10 text-center space-y-3">
        {/* Logo */}
        <div 
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-3 cursor-pointer group mb-1"
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
          إنشاء حساب طالب جديد
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          انضم إلى أقوى منصة لغة إنجليزية للمرحلة الثانوية
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-xl relative z-10">
        <div className="bg-white dark:bg-slate-900 py-8 px-6 sm:px-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
          
          {errors.global && (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs sm:text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span className="font-semibold">{errors.global}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 1. Full 4-part Arabic Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                الاسم رباعي باللغة العربية <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="register-fullname-input"
                  type="text"
                  required
                  value={fullName}
                  onChange={e => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
                  }}
                  placeholder="مثال: زياد أحمد محمد علي"
                  className={`w-full pl-4 pr-10 py-3 rounded-xl text-sm border bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                    errors.fullName
                      ? 'border-rose-500 focus:ring-rose-500/30'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-amber-500/30 focus:border-amber-500'
                  }`}
                />
                <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              </div>
              {errors.fullName && (
                <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* 2. Grade Level */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                الصف الدراسي <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="register-grade-select"
                  value={grade}
                  onChange={e => setGrade(e.target.value as GradeLevel)}
                  className="w-full pl-4 pr-10 py-3 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                >
                  <option value="third">الصف الثالث الثانوي (3 ثانوى - شهادة إتمام الثانوية العامة)</option>
                  <option value="second">الصف الثاني الثانوي (2 ثانوى)</option>
                  <option value="first">الصف الأول الثانوي (1 ثانوى)</option>
                </select>
                <GraduationCap className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              </div>
            </div>

            {/* 3 & 4. Phone Numbers (Student & Parent) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  رقم هاتف الطالب (11 رقم) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="register-phone-input"
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={e => {
                      setPhoneNumber(e.target.value);
                      if (errors.phoneNumber) setErrors(prev => ({ ...prev, phoneNumber: '' }));
                    }}
                    placeholder="01012345678"
                    className={`w-full pl-4 pr-10 py-3 rounded-xl text-sm border bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white font-latin focus:outline-none focus:ring-2 ${
                      errors.phoneNumber
                        ? 'border-rose-500 focus:ring-rose-500/30'
                        : 'border-slate-300 dark:border-slate-700 focus:ring-amber-500/30 focus:border-amber-500'
                    }`}
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                </div>
                {errors.phoneNumber && (
                  <p className="text-xs text-rose-500 mt-1">{errors.phoneNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  رقم هاتف ولي الأمر (11 رقم) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="register-parent-phone-input"
                    type="tel"
                    required
                    value={parentPhoneNumber}
                    onChange={e => {
                      setParentPhoneNumber(e.target.value);
                      if (errors.parentPhoneNumber) setErrors(prev => ({ ...prev, parentPhoneNumber: '' }));
                    }}
                    placeholder="01198765432"
                    className={`w-full pl-4 pr-10 py-3 rounded-xl text-sm border bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white font-latin focus:outline-none focus:ring-2 ${
                      errors.parentPhoneNumber
                        ? 'border-rose-500 focus:ring-rose-500/30'
                        : 'border-slate-300 dark:border-slate-700 focus:ring-amber-500/30 focus:border-amber-500'
                    }`}
                  />
                  <Users className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                </div>
                {errors.parentPhoneNumber && (
                  <p className="text-xs text-rose-500 mt-1">{errors.parentPhoneNumber}</p>
                )}
              </div>
            </div>

            {/* 5. Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                البريد الإلكتروني (Email) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="register-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                  }}
                  placeholder="student@example.com"
                  className={`w-full pl-4 pr-10 py-3 rounded-xl text-sm border bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white font-latin focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'border-rose-500 focus:ring-rose-500/30'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-amber-500/30 focus:border-amber-500'
                  }`}
                />
                <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              </div>
              {errors.email && (
                <p className="text-xs text-rose-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* 6. Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  كلمة المرور (6 أحرف على الأقل) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="register-password-input"
                    type="password"
                    required
                    value={password}
                    onChange={e => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                    }}
                    placeholder="••••••••"
                    className={`w-full pl-4 pr-10 py-3 rounded-xl text-sm border bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                      errors.password
                        ? 'border-rose-500 focus:ring-rose-500/30'
                        : 'border-slate-300 dark:border-slate-700 focus:ring-amber-500/30 focus:border-amber-500'
                    }`}
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                </div>
                {errors.password && (
                  <p className="text-xs text-rose-500 mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  تأكيد كلمة المرور <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="register-confirm-password-input"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={e => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }));
                    }}
                    placeholder="••••••••"
                    className={`w-full pl-4 pr-10 py-3 rounded-xl text-sm border bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                      errors.confirmPassword
                        ? 'border-rose-500 focus:ring-rose-500/30'
                        : 'border-slate-300 dark:border-slate-700 focus:ring-amber-500/30 focus:border-amber-500'
                    }`}
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-rose-500 mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-3">
              <button
                id="register-submit-btn"
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>إنشاء الحساب والبدء فوراً</span>
              </button>
            </div>
          </form>

          {/* Switch to Login */}
          <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              لديك حساب بالفعل؟{' '}
              <button
                id="goto-login-btn"
                onClick={() => onNavigate('login')}
                className="font-bold text-amber-600 dark:text-amber-400 hover:underline"
              >
                تسجيل الدخول
              </button>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
