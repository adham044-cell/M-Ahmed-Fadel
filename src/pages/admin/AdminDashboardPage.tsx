import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  Layers, 
  Activity, 
  PlusCircle, 
  TrendingUp, 
  ShieldCheck, 
  Video, 
  FileText, 
  Clock, 
  ArrowLeft,
  GraduationCap
} from 'lucide-react';
import { PageView, Course, User, ActivityLog } from '../../types';
import { CoursesService } from '../../services/courses';
import { UsersService } from '../../services/users';
import { EnrollmentService } from '../../services/enrollments';
import { ContentService } from '../../services/content';
import { LogsService } from '../../services/logs';
import { AddCourseModal } from '../../components/AddCourseModal';

interface AdminDashboardPageProps {
  onNavigate: (page: PageView) => void;
  onOpenCourse: (courseId: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  onNavigate,
  onOpenCourse,
}) => {
  const [courses, setCourses] = useState<Course[]>(() => CoursesService.getCourses());
  const [users, setUsers] = useState<User[]>(() => UsersService.getAllUsers());
  const [logs, setLogs] = useState<ActivityLog[]>(() => LogsService.getRecentLogs(6));
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);

  const refreshData = () => {
    setCourses(CoursesService.getCourses());
    setUsers(UsersService.getAllUsers());
    setLogs(LogsService.getRecentLogs(6));
  };

  useEffect(() => {
    refreshData();
    const handleUpdate = () => refreshData();
    window.addEventListener('the_sniper_storage_update', handleUpdate);
    return () => window.removeEventListener('the_sniper_storage_update', handleUpdate);
  }, []);

  const students = users.filter(u => u.role === 'student');
  const allContents = ContentService.getAllContents();
  const totalEnrollments = EnrollmentService.getAllEnrollments().length;

  const stats = [
    {
      title: 'إجمالي الطلاب المسجلين',
      value: students.length,
      icon: <Users className="w-6 h-6 text-amber-500" />,
      color: 'border-amber-500/30 bg-amber-500/5',
      action: () => onNavigate('admin-users'),
      actionLabel: 'إدارة الطلاب',
    },
    {
      title: 'الكورسات المتاحة',
      value: courses.length,
      icon: <BookOpen className="w-6 h-6 text-sky-500" />,
      color: 'border-sky-500/30 bg-sky-500/5',
      action: () => onNavigate('admin-courses'),
      actionLabel: 'إدارة الكورسات',
    },
    {
      title: 'المحاضرات والمذكرات',
      value: allContents.length,
      icon: <Layers className="w-6 h-6 text-emerald-500" />,
      color: 'border-emerald-500/30 bg-emerald-500/5',
      action: () => onNavigate('admin-courses'),
      actionLabel: 'استعراض المحتوى',
    },
    {
      title: 'اشتراكات الطلاب بالكورسات',
      value: totalEnrollments,
      icon: <TrendingUp className="w-6 h-6 text-indigo-500" />,
      color: 'border-indigo-500/30 bg-indigo-500/5',
      action: () => onNavigate('admin-logs'),
      actionLabel: 'سجل النشاطات',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 pb-16">
      
      {/* Header Banner */}
      <section className="py-10 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>لوحة التحكم الإدارية | Admin Panel</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              إدارة منصة <span className="font-latin text-amber-500">The Sniper</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              مرحباً بك مستر أحمد فاضل. يمكنك من هنا إضافة ومتابعة الكورسات، الطلاب، والمحتوى.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="admin-add-course-btn"
              onClick={() => setIsAddCourseModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20 transition-all hover:scale-105"
            >
              <PlusCircle className="w-4 h-4" />
              <span>إضافة كورس جديد</span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-3xl border ${stat.color} bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between space-y-4`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {stat.title}
                  </span>
                  <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800">
                    {stat.icon}
                  </div>
                </div>

                <div>
                  <p className="text-3xl font-black font-latin text-slate-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>

                <button
                  onClick={stat.action}
                  className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 pt-1"
                >
                  <span>{stat.actionLabel}</span>
                  <ArrowLeft className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Courses & Recent Activity Logs Grid */}
      <section className="py-6 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Courses Quick Overview */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-500" />
                <span>أحدث الكورسات المنشورة</span>
              </h2>
              <button
                onClick={() => onNavigate('admin-courses')}
                className="text-xs text-amber-500 font-bold hover:underline"
              >
                إدارة جميع الكورسات ({courses.length})
              </button>
            </div>

            <div className="space-y-3">
              {courses.slice(0, 4).map(c => {
                const count = ContentService.getCourseContents(c.id).length;
                return (
                  <div
                    key={c.id}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <img
                        src={c.image}
                        alt={c.title}
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          {c.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                          <span className="text-amber-600 dark:text-amber-400 font-bold">{c.gradeLabel}</span>
                          <span>•</span>
                          <span>{count} عناصر تعليمية</span>
                          <span>•</span>
                          <span className="font-latin">{c.price} ج.م</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenCourse(c.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-amber-500 hover:text-white transition-colors"
                      >
                        معاينة
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity Logs Feed */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-500" />
                <span>سجل النشاطات الحديثة</span>
              </h2>
              <button
                onClick={() => onNavigate('admin-logs')}
                className="text-xs text-amber-500 font-bold hover:underline"
              >
                عرض السجل الكامل
              </button>
            </div>

            <div className="p-4 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
              {logs.length > 0 ? (
                logs.map(log => (
                  <div
                    key={log.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-start gap-3 text-xs"
                  >
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                    <div className="space-y-0.5 flex-1">
                      <p className="font-bold text-slate-800 dark:text-slate-200">
                        {log.details}
                      </p>
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>بواسطة: {log.userName}</span>
                        <span className="font-latin">
                          {new Date(log.timestamp).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-xs text-slate-400 py-6">لا توجد نشاطات مسجلة بعد</p>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Add Course Modal */}
      <AddCourseModal
        isOpen={isAddCourseModalOpen}
        onClose={() => setIsAddCourseModalOpen(false)}
        onCourseAdded={() => refreshData()}
      />

    </div>
  );
};
