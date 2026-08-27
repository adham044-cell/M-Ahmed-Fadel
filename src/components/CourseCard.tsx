import React from 'react';
import { BookOpen, CheckCircle, ArrowLeft, Clock, FileText, Video, Sparkles, Tag } from 'lucide-react';
import { Course } from '../types';
import { useAuth } from '../context/AuthContext';
import { EnrollmentService } from '../services/enrollments';
import { useToast } from '../context/ToastContext';

interface CourseCardProps {
  course: Course;
  isEnrolled?: boolean;
  onEnroll?: (courseId: string) => void;
  onOpenCourse: (courseId: string) => void;
  onRequireAuth?: () => void;
  isAdminView?: boolean;
  onEditCourse?: (course: Course) => void;
  onDeleteCourse?: (courseId: string) => void;
  onManageContent?: (courseId: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isEnrolled = false,
  onEnroll,
  onOpenCourse,
  onRequireAuth,
  isAdminView = false,
  onEditCourse,
  onDeleteCourse,
  onManageContent,
}) => {
  const { isAuthenticated, user, isStudent } = useAuth();
  const toast = useToast();

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isEnrolled) {
      onOpenCourse(course.id);
      return;
    }

    if (!isAuthenticated) {
      if (onRequireAuth) {
        onRequireAuth();
      } else {
        toast.info('يرجى تسجيل الدخول أو إنشاء حساب للاشتراك في الكورس');
      }
      return;
    }

    if (isStudent && user) {
      const res = EnrollmentService.enroll(user.id, course.id, user.fullName);
      if (res.success) {
        toast.success(res.message);
        if (onEnroll) onEnroll(course.id);
      } else {
        toast.error(res.message);
      }
    }
  };

  return (
    <div 
      id={`course-card-${course.id}`}
      className="group flex flex-col rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#121212] overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-500/40 dark:hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 relative"
    >
      {/* Cover Image & Badges */}
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/90 via-transparent to-transparent"></div>

        {/* Grade Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0D0D0D]/85 text-amber-400 border border-amber-500/30 backdrop-blur-md">
          <Tag className="w-3 h-3" />
          <span>{course.gradeLabel}</span>
        </div>

        {/* Enrolled Status Ribbon */}
        {isEnrolled && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-md shadow-emerald-500/20 backdrop-blur-md">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>مشترك</span>
          </div>
        )}

        {/* Price Tag in Image */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-white">
          <span className="text-xl font-bold font-serif-display">{course.price === 0 ? 'مجاناً' : `${course.price} ج.م`}</span>
        </div>
      </div>

      {/* Body Content */}
      <div className="flex flex-col flex-1 p-5 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 line-clamp-2 group-hover:text-amber-500 transition-colors leading-snug">
            {course.title}
          </h3>
          <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Features Chips */}
        <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5 text-amber-500" />
            <span>فيديوهات HD</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-sky-500" />
            <span>مذكرات PDF</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>تدريبات</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 mt-auto">
          {!isAdminView ? (
            <button
              id={`course-btn-${course.id}`}
              onClick={handleActionClick}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 ${
                isEnrolled
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-amber-500 hover:bg-amber-600 text-neutral-950 shadow-md shadow-amber-500/20 hover:shadow-lg'
              }`}
            >
              <span>{isEnrolled ? 'الدخول للكورس' : 'الاشتراك'}</span>
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onManageContent && onManageContent(course.id)}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
              >
                إدارة المحتوى
              </button>
              <button
                onClick={() => onDeleteCourse && onDeleteCourse(course.id)}
                className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-rose-600/10 hover:bg-rose-600 text-rose-600 hover:text-white border border-rose-600/20 transition-colors"
              >
                حذف الكورس
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
