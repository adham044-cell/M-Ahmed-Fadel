import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  ArrowLeft, 
  Play, 
  FileText, 
  CheckCircle2, 
  Target, 
  Award,
  Layers,
  TrendingUp,
  Clock,
  MessageCircle
} from 'lucide-react';
import { PageView, Course } from '../types';
import { useAuth } from '../context/AuthContext';
import { EnrollmentService } from '../services/enrollments';
import { CoursesService } from '../services/courses';
import { CourseCard } from '../components/CourseCard';
import { ASSETS } from '../assets';

interface StudentHomePageProps {
  onNavigate: (page: PageView) => void;
  onOpenCourse: (courseId: string) => void;
}

export const StudentHomePage: React.FC<StudentHomePageProps> = ({ onNavigate, onOpenCourse }) => {
  const { user } = useAuth();
  const enrolledCourses = user ? EnrollmentService.getStudentEnrolledCourses(user.id) : [];
  const allCourses = CoursesService.getCourses();
  const enrolledIds = new Set(enrolledCourses.map(c => c.id));
  const availableCourses = allCourses.filter(c => !enrolledIds.has(c.id));

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+201018432929', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Student Welcome Hero Banner */}
      <section className="relative overflow-hidden pt-8 pb-12 lg:pt-12 lg:pb-16 border-b border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Student Welcome Text */}
            <div className="lg:col-span-8 space-y-4 text-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>لوحة متابعة الطالب</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight">
                مرحباً بك يا <span className="text-amber-500">{user?.fullName.split(' ')[0] || 'طالبنا العزيز'}</span> في منصة <span className="font-latin">The Sniper</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                أنت الآن جاهز لمتابعة دروس اللغة الإنجليزية للمرحلة الثانوية مع مستر أحمد فاضل. تابع محاضراتك، حمل المذكرات والشيتات، وتأكد من حل كافة تدريبات الواجب.
              </p>

              {/* Quick Action Navigation Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  id="student-my-courses-btn"
                  onClick={() => onNavigate('my-courses')}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20 transition-all hover:scale-105"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>كورساتي المشترك بها ({enrolledCourses.length})</span>
                </button>

                <button
                  id="student-explore-courses-btn"
                  onClick={() => onNavigate('courses')}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>استكشاف كافة الكورسات</span>
                </button>

                <button
                  onClick={handleWhatsAppClick}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>الدعم الفني والواتساب</span>
                </button>
              </div>
            </div>

            {/* Quick Student Stats Badge & Teacher Avatar */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl w-full max-w-sm text-center space-y-4">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-500 mx-auto shadow-md">
                  <img 
                    src={ASSETS.teacher} 
                    alt="M/Ahmed Fadel" 
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-latin">
                    M/Ahmed Fadel
                  </h3>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                    معلم أول اللغة الإنجليزية
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <p className="text-lg font-bold text-amber-500 font-latin">{enrolledCourses.length}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">كورساتي المفعلة</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <p className="text-lg font-bold text-emerald-500 font-latin">100%</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">حالة الحساب: نشط</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* MY ENROLLED COURSES (RESUME LEARNING)             */}
      {/* ================================================== */}
      <section className="py-12 bg-white dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-500">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  كورساتي المشترك بها
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  اضغط على أي كورس للدخول للمحاضرات وتحميل المذكرات
                </p>
              </div>
            </div>

            {enrolledCourses.length > 0 && (
              <button
                onClick={() => onNavigate('my-courses')}
                className="text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>عرض الكل</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isEnrolled={true}
                  onOpenCourse={onOpenCourse}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 text-center space-y-3 bg-slate-50/50 dark:bg-slate-950/40">
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                لم تشترك في أي كورسات حتى الآن
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                استكشف قائمة الكورسات والمناهج المتاحة للمرحلة الثانوية واشترك فوراً
              </p>
              <button
                onClick={() => onNavigate('courses')}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-amber-500 text-white hover:bg-amber-600 shadow-md transition-all"
              >
                استكشف الكورسات
              </button>
            </div>
          )}

        </div>
      </section>

      {/* ================================================== */}
      {/* OTHER AVAILABLE COURSES                            */}
      {/* ================================================== */}
      {availableCourses.length > 0 && (
        <section className="py-12 bg-slate-50 dark:bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  كورسات أخرى متاحة للاشتراك
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  طور مستواك في كافة جوانب اللغة الإنجليزية
                </p>
              </div>
              <button
                onClick={() => onNavigate('courses')}
                className="text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>جميع الكورسات</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableCourses.slice(0, 3).map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isEnrolled={false}
                  onOpenCourse={onOpenCourse}
                />
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
};
