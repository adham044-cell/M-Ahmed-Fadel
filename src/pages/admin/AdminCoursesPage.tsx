import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Edit3, 
  Layers, 
  Search, 
  Video, 
  FileText, 
  ArrowLeft,
  DollarSign,
  Tag,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { PageView, Course, CourseContent, GradeLevel } from '../../types';
import { CoursesService } from '../../services/courses';
import { ContentService } from '../../services/content';
import { useToast } from '../../context/ToastContext';
import { AddCourseModal } from '../../components/AddCourseModal';
import { AddContentModal } from '../../components/AddContentModal';
import { ConfirmModal } from '../../components/ConfirmModal';
import { EmptyState } from '../../components/EmptyState';

interface AdminCoursesPageProps {
  onNavigate: (page: PageView) => void;
  onOpenCourse: (courseId: string) => void;
}

export const AdminCoursesPage: React.FC<AdminCoursesPageProps> = ({
  onNavigate,
  onOpenCourse,
}) => {
  const toast = useToast();
  const [courses, setCourses] = useState<Course[]>(() => CoursesService.getCourses());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');

  // Modals state
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [activeCourseForContent, setActiveCourseForContent] = useState<Course | null>(null);
  const [isAddContentOpen, setIsAddContentOpen] = useState(false);
  
  // Delete confirm modal
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [contentToDelete, setContentToDelete] = useState<CourseContent | null>(null);

  // Manage content drawer / expand
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);

  const refreshCourses = () => {
    setCourses(CoursesService.getCourses());
  };

  useEffect(() => {
    refreshCourses();
    const handleUpdate = () => refreshCourses();
    window.addEventListener('the_sniper_storage_update', handleUpdate);
    return () => window.removeEventListener('the_sniper_storage_update', handleUpdate);
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchGrade = selectedGrade === 'all' || course.grade === selectedGrade;
    const matchSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchGrade && matchSearch;
  });

  const handleDeleteCourseConfirm = () => {
    if (!courseToDelete) return;
    const success = CoursesService.deleteCourse(courseToDelete.id);
    if (success) {
      toast.success('تم حذف الكورس بنجاح');
      refreshCourses();
    } else {
      toast.error('حدث خطأ أثناء حذف الكورس');
    }
    setCourseToDelete(null);
  };

  const handleDeleteContentConfirm = () => {
    if (!contentToDelete) return;
    const success = ContentService.deleteContent(contentToDelete.id);
    if (success) {
      toast.success('تم حذف المحتوى بنجاح');
      refreshCourses();
    } else {
      toast.error('حدث خطأ أثناء حذف المحتوى');
    }
    setContentToDelete(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 pb-16">
      
      {/* Header Banner */}
      <section className="py-8 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-amber-500" />
              <span>إدارة الكورسات والمحتوى التعليمي</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              إضافة وتعديل الكورسات ورفع المحاضرات وملفات الـ PDF للطلاب
            </p>
          </div>

          <button
            onClick={() => setIsAddCourseOpen(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة كورس جديد</span>
          </button>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="py-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {[
              { id: 'all', label: 'الكل' },
              { id: 'third', label: '3 ثانوى' },
              { id: 'second', label: '2 ثانوى' },
              { id: 'first', label: '1 ثانوى' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedGrade(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedGrade === tab.id
                    ? 'bg-amber-500 text-white'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="بحث في الكورسات..."
              className="w-full pl-4 pr-10 py-2.5 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
          </div>

        </div>
      </section>

      {/* Courses List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {filteredCourses.length > 0 ? (
          <div className="space-y-6">
            {filteredCourses.map(course => {
              const courseContents = ContentService.getCourseContents(course.id);
              const isExpanded = expandedCourseId === course.id;

              return (
                <div
                  key={course.id}
                  className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden"
                >
                  {/* Course Header Bar */}
                  <div className="p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                            {course.gradeLabel}
                          </span>
                          <span className="text-xs font-bold text-slate-500 font-latin">
                            {course.price} ج.م
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                          {course.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 max-w-xl">
                          {course.description}
                        </p>
                      </div>
                    </div>

                    {/* Quick Course Actions */}
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                      <button
                        onClick={() => {
                          setActiveCourseForContent(course);
                          setIsAddContentOpen(true);
                        }}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-sm transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>إضافة محتوى</span>
                      </button>

                      <button
                        onClick={() => setExpandedCourseId(isExpanded ? null : course.id)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>المحتوى ({courseContents.length})</span>
                      </button>

                      <button
                        onClick={() => onOpenCourse(course.id)}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        معاينة كطالب
                      </button>

                      <button
                        onClick={() => setCourseToDelete(course)}
                        className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="حذف الكورس"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content Drawer */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 bg-slate-50/70 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 space-y-3">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          المحاضرات والمذكرات التابعة للكورس ({courseContents.length}):
                        </h4>
                        <button
                          onClick={() => {
                            setActiveCourseForContent(course);
                            setIsAddContentOpen(true);
                          }}
                          className="text-xs font-bold text-amber-500 hover:underline flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>إضافة درس جديد</span>
                        </button>
                      </div>

                      {courseContents.length > 0 ? (
                        <div className="space-y-2">
                          {courseContents.map((cnt, idx) => (
                            <div
                              key={cnt.id}
                              className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center font-bold">
                                  {idx + 1}
                                </span>
                                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
                                  {cnt.type === 'video' ? <Video className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                                </div>
                                <div>
                                  <p className="font-bold text-slate-900 dark:text-white">
                                    {cnt.title}
                                  </p>
                                  <p className="text-[11px] text-slate-400">
                                    {cnt.type === 'video' ? `فيديو • ${cnt.duration || '40 دقيقة'}` : `PDF • ${cnt.fileSize || '3 MB'}`}
                                  </p>
                                </div>
                              </div>

                              <button
                                onClick={() => setContentToDelete(cnt)}
                                className="text-rose-500 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40"
                                title="حذف هذا الدرس"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-xs text-slate-400 py-4">
                          لا يوجد محتوى في هذا الكورس بعد. اضغط "إضافة محتوى" للبدء.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon={<BookOpen className="w-8 h-8" />}
            title="لم يتم العثور على كورسات"
            description="يمكنك البدء بإضافة كورس جديد لطلاب المرحلة الثانوية الآن."
            actionText="إضافة كورس جديد"
            onAction={() => setIsAddCourseOpen(true)}
          />
        )}
      </section>

      {/* Modals */}
      <AddCourseModal
        isOpen={isAddCourseOpen}
        onClose={() => setIsAddCourseOpen(false)}
        onCourseAdded={() => refreshCourses()}
      />

      {activeCourseForContent && (
        <AddContentModal
          courseId={activeCourseForContent.id}
          courseTitle={activeCourseForContent.title}
          isOpen={isAddContentOpen}
          onClose={() => {
            setIsAddContentOpen(false);
            setActiveCourseForContent(null);
          }}
          onContentAdded={() => refreshCourses()}
        />
      )}

      {/* Delete Course Confirmation */}
      <ConfirmModal
        isOpen={!!courseToDelete}
        title="تأكيد حذف الكورس"
        message={`هل أنت متأكد من رغبتك في حذف كورس "${courseToDelete?.title}"؟ سيتم حذف جميع المحاضرات والمذكرات التابعة له نهائياً.`}
        confirmText="حذف الكورس"
        isDestructive={true}
        onConfirm={handleDeleteCourseConfirm}
        onCancel={() => setCourseToDelete(null)}
      />

      {/* Delete Content Item Confirmation */}
      <ConfirmModal
        isOpen={!!contentToDelete}
        title="تأكيد حذف المحتوى"
        message={`هل أنت متأكد من حذف "${contentToDelete?.title}"؟`}
        confirmText="حذف"
        isDestructive={true}
        onConfirm={handleDeleteContentConfirm}
        onCancel={() => setContentToDelete(null)}
      />

    </div>
  );
};
