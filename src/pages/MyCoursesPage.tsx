import React, { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, Sparkles, ArrowLeft } from 'lucide-react';
import { PageView, Course } from '../types';
import { useAuth } from '../context/AuthContext';
import { EnrollmentService } from '../services/enrollments';
import { CourseCard } from '../components/CourseCard';
import { EmptyState } from '../components/EmptyState';

interface MyCoursesPageProps {
  onNavigate: (page: PageView) => void;
  onOpenCourse: (courseId: string) => void;
}

export const MyCoursesPage: React.FC<MyCoursesPageProps> = ({ onNavigate, onOpenCourse }) => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>(() => 
    user ? EnrollmentService.getStudentEnrolledCourses(user.id) : []
  );

  const refreshEnrolled = () => {
    if (user) {
      setEnrolledCourses(EnrollmentService.getStudentEnrolledCourses(user.id));
    } else {
      setEnrolledCourses([]);
    }
  };

  useEffect(() => {
    refreshEnrolled();
    const handleUpdate = () => refreshEnrolled();
    window.addEventListener('the_sniper_storage_update', handleUpdate);
    return () => window.removeEventListener('the_sniper_storage_update', handleUpdate);
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Header Banner */}
      <section className="py-12 lg:py-16 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold">
            <GraduationCap className="w-4 h-4 text-amber-500" />
            <span>كورساتي المشترك بها</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white">
            مكتبة دوراتك التعليمية
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            هنا تجد جميع الكورسات التي قمت بالاشتراك فيها لمتابعة المحاضرات وتحميل المذكرات والواجبات.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 lg:py-16 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {enrolledCourses.length > 0 ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  إجمالي الكورسات المشترك بها: <span className="font-latin text-amber-500">{enrolledCourses.length}</span>
                </p>
                <button
                  onClick={() => onNavigate('courses')}
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400 hover:underline"
                >
                  <span>استكشاف المزيد من الكورسات</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {enrolledCourses.map(course => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isEnrolled={true}
                    onOpenCourse={onOpenCourse}
                  />
                ))}
              </div>
            </div>
          ) : (
            <EmptyState
              icon={<GraduationCap className="w-8 h-8" />}
              title="لم تشترك في أي كورسات حتى الآن"
              description="تصفح قائمة الكورسات والمناهج المتاحة للمرحلة الثانوية واشترك لتبدأ المذاكرة فوراً."
              actionText="استكشف الكورسات"
              onAction={() => onNavigate('courses')}
            />
          )}

        </div>
      </section>

    </div>
  );
};
