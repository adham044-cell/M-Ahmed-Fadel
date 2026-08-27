import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Phone, 
  Mail, 
  Lock, 
  ShieldCheck, 
  GraduationCap, 
  Save, 
  CheckCircle2, 
  KeyRound, 
  BookOpen, 
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { PageView } from '../types';
import { useAuth } from '../context/AuthContext';
import { UsersService } from '../services/users';
import { EnrollmentService } from '../services/enrollments';
import { ValidationService } from '../services/validation';
import { useToast } from '../context/ToastContext';

interface ProfilePageProps {
  onNavigate: (page: PageView) => void;
  onOpenCourse: (courseId: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate, onOpenCourse }) => {
  const { user, refreshSession } = useAuth();
  const toast = useToast();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [parentPhoneNumber, setParentPhoneNumber] = useState(user?.parentPhoneNumber || '');
  const [isUpdating, setIsUpdating] = useState(false);

  // Password Change state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <p className="text-base text-slate-600 dark:text-slate-400">يرجى تسجيل الدخول لعرض الملف الشخصي</p>
        <button
          onClick={() => onNavigate('login')}
          className="mt-4 px-6 py-2.5 rounded-xl bg-amber-500 text-white font-bold"
        >
          تسجيل الدخول
        </button>
      </div>
    );
  }

  const enrolledCourses = EnrollmentService.getStudentEnrolledCourses(user.id);

  const handleUpdateInfo = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate 4-part name
    const nameValid = ValidationService.validateFourPartName(fullName);
    if (!nameValid.isValid) {
      toast.error(nameValid.message || 'يرجى إدخال اسم رباعي صحيح');
      return;
    }

    // Validate phone
    const phoneValid = ValidationService.validateEgyptianPhone(phoneNumber);
    if (!phoneValid.isValid) {
      toast.error(phoneValid.message || 'يرجى إدخال رقم هاتف صحيح');
      return;
    }

    // Validate parent phone
    if (parentPhoneNumber) {
      const parentValid = ValidationService.validateEgyptianPhone(parentPhoneNumber);
      if (!parentValid.isValid) {
        toast.error('رقم هاتف ولي الأمر غير صحيح (يجب أن يكون 11 رقماً ويبدأ بـ 01)');
        return;
      }
    }

    setIsUpdating(true);
    const updated = UsersService.updateUser(user.id, {
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      parentPhoneNumber: parentPhoneNumber ? parentPhoneNumber.trim() : undefined,
    });

    setIsUpdating(false);
    if (updated) {
      refreshSession();
      toast.success('تم تحديث البيانات بنجاح');
    } else {
      toast.error('حدث خطأ أثناء تحديث البيانات');
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (user.password !== oldPassword) {
      setPasswordError('كلمة المرور الحالية غير صحيحة');
      return;
    }

    const passValid = ValidationService.validatePassword(newPassword);
    if (!passValid.isValid) {
      setPasswordError(passValid.message || 'كلمة المرور غير مطابقة للشروط');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('كلمة المرور الجديدة وتأكيدها غير متطابقين');
      return;
    }

    const updated = UsersService.updateUser(user.id, { password: newPassword });
    if (updated) {
      refreshSession();
      toast.success('تم تغيير كلمة المرور بنجاح');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      toast.error('حدث خطأ أثناء تغيير كلمة المرور');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 pb-16">
      
      {/* Header Banner */}
      <section className="py-12 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-right">
            
            <div className="w-20 h-20 rounded-3xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center font-bold text-2xl shadow-sm">
              <UserIcon className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {user.fullName}
                </h1>
                <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  {user.role === 'admin' ? 'مدير المنصة (Admin)' : 'طالب ثانوية عامة'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-latin">
                {user.email} • رقم الهاتف: {user.phoneNumber}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Main Forms Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Edit Info + Change Password */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Personal Details Form */}
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                  <UserIcon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  البيانات الشخصية
                </h3>
              </div>

              <form onSubmit={handleUpdateInfo} className="space-y-4">
                {/* 4-part name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    الاسم رباعي باللغة العربية
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    يجب أن يتكون الاسم من 4 كلمات على الأقل
                  </p>
                </div>

                {/* Email (Readonly for identification) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    البريد الإلكتروني (Email)
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-2.5 rounded-xl text-sm border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/40 text-slate-500 cursor-not-allowed font-latin"
                  />
                </div>

                {/* Phone number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      رقم هاتف الطالب (11 رقم)
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white font-latin"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      رقم هاتف ولي الأمر
                    </label>
                    <input
                      type="tel"
                      value={parentPhoneNumber}
                      onChange={e => setParentPhoneNumber(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white font-latin"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>حفظ التعديلات</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Change Password Form */}
            <div className="p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="p-2 rounded-xl bg-sky-500/10 text-sky-500">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  تغيير كلمة المرور
                </h3>
              </div>

              {passwordError && (
                <div className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs border border-rose-200 dark:border-rose-900">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    كلمة المرور الحالية
                  </label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      كلمة المرور الجديدة
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      تأكيد كلمة المرور الجديدة
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white transition-colors"
                  >
                    <Lock className="w-4 h-4" />
                    <span>تحديث كلمة المرور</span>
                  </button>
                </div>
              </form>
            </div>

          </div>

          {/* Right Column: Enrolled Courses Quick Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-5 h-5 text-amber-500" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    الكورسات المفعلة ({enrolledCourses.length})
                  </h3>
                </div>
                <button
                  onClick={() => onNavigate('my-courses')}
                  className="text-xs text-amber-500 font-bold hover:underline"
                >
                  عرض الكل
                </button>
              </div>

              {enrolledCourses.length > 0 ? (
                <div className="space-y-3">
                  {enrolledCourses.slice(0, 4).map(c => (
                    <div
                      key={c.id}
                      onClick={() => onOpenCourse(c.id)}
                      className="cursor-pointer p-3 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-amber-500/40 bg-slate-50/50 dark:bg-slate-950/40 flex items-center justify-between gap-3 group transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={c.image}
                          alt={c.title}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-amber-500 line-clamp-1">
                            {c.title}
                          </h4>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">
                            {c.gradeLabel}
                          </span>
                        </div>
                      </div>
                      <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 space-y-2">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    لم تشترك في أي كورسات حتى الآن
                  </p>
                  <button
                    onClick={() => onNavigate('courses')}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-white"
                  >
                    استكشف الكورسات
                  </button>
                </div>
              )}
            </div>

            {/* Support Info Box */}
            <div className="p-6 rounded-3xl border border-emerald-500/20 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-3">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>دعم منصة The Sniper</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                إذا واجهتك أي مشكلة في تفعيل كورس أو تشغيل المحاضرات، يمكنك التواصل فوراً مع فريق الدعم الفني لمستر أحمد فاضل عبر الواتساب على الرقم: 
                <span className="font-bold text-slate-900 dark:text-white font-latin block mt-1">01018432929</span>
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
