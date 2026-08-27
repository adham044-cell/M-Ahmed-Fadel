import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Play, 
  FileText, 
  Download, 
  ExternalLink, 
  Clock, 
  CheckCircle, 
  Sparkles, 
  Layers, 
  Video, 
  BookOpen, 
  ShieldAlert,
  Tag,
  Plus
} from 'lucide-react';
import { PageView, Course, CourseContent, ContentType } from '../types';
import { CoursesService } from '../services/courses';
import { ContentService } from '../services/content';
import { EnrollmentService } from '../services/enrollments';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { VideoPlayerModal } from '../components/VideoPlayerModal';
import { PdfViewerModal } from '../components/PdfViewerModal';
import { AddContentModal } from '../components/AddContentModal';
import { EmptyState } from '../components/EmptyState';

interface CourseDetailsPageProps {
  courseId: string;
  onNavigate: (page: PageView) => void;
}

export const CourseDetailsPage: React.FC<CourseDetailsPageProps> = ({ courseId, onNavigate }) => {
  const { user, isAuthenticated, isAdmin, isStudent } = useAuth();
  const toast = useToast();

  const [course, setCourse] = useState<Course | undefined>(() => CoursesService.getCourseById(courseId));
  const [contents, setContents] = useState<CourseContent[]>(() => ContentService.getCourseContents(courseId));
  const [activeFilter, setActiveFilter] = useState<'all' | 'video' | 'pdf'>('all');
  
  // Modals
  const [selectedVideo, setSelectedVideo] = useState<CourseContent | null>(null);
  const [selectedPdf, setSelectedPdf] = useState<CourseContent | null>(null);
  const [isAddContentOpen, setIsAddContentOpen] = useState(false);

  const isEnrolled = user ? EnrollmentService.isEnrolled(user.id, courseId) : false;
  const canAccess = isAdmin || isEnrolled;

  const refreshData = () => {
    setCourse(CoursesService.getCourseById(courseId));
    setContents(ContentService.getCourseContents(courseId));
  };

  useEffect(() => {
    refreshData();
    const handleUpdate = () => refreshData();
    window.addEventListener('the_sniper_storage_update', handleUpdate);
    return () => window.removeEventListener('the_sniper_storage_update', handleUpdate);
  }, [courseId]);

  if (!course) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">الكورس غير موجود</h2>
        <button
          onClick={() => onNavigate('courses')}
          className="px-6 py-2.5 rounded-xl text-sm font-bold bg-amber-500 text-white"
        >
          العودة للكورسات
        </button>
      </div>
    );
  }

  const filteredContents = contents.filter(item => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  const videoCount = contents.filter(c => c.type === 'video').length;
  const pdfCount = contents.filter(c => c.type === 'pdf').length;

  const handleEnrollFromHere = () => {
    if (!isAuthenticated) {
      toast.info('يرجى تسجيل الدخول أولاً للاشتراك في هذا الكورس');
      onNavigate('login');
      return;
    }
    if (user && isStudent) {
      const res = EnrollmentService.enroll(user.id, course.id, user.fullName);
      if (res.success) {
        toast.success(res.message);
        refreshData();
      } else {
        toast.error(res.message);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 pb-16">
      
      {/* Course Hero Banner */}
      <section className="relative py-10 lg:py-14 bg-white dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back button */}
          <button
            onClick={() => onNavigate(isStudent ? 'my-courses' : 'courses')}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-amber-500 mb-6 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة إلى {isStudent ? 'كورساتي' : 'قائمة الكورسات'}</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Course Cover */}
            <div className="lg:col-span-4">
              <div className="aspect-video w-full rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 shadow-xl relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-slate-950/80 text-amber-400 border border-amber-500/30 backdrop-blur-md">
                  {course.gradeLabel}
                </div>
              </div>
            </div>

            {/* Course Information */}
            <div className="lg:col-span-8 space-y-4 text-right">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  {course.gradeLabel}
                </span>
                {canAccess && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-sm">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>متاح لك بالكامل</span>
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                {course.description}
              </p>

              {/* Stats badges */}
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-amber-500" />
                  <span>{videoCount} فيديوهات ومحاضرات</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-sky-500" />
                  <span>{pdfCount} مذكرات وشيتات PDF</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5 font-latin font-bold text-amber-600 dark:text-amber-400">
                  <span>M/Ahmed Fadel</span>
                </div>
              </div>

              {/* Action Buttons if not enrolled */}
              {!canAccess && (
                <div className="pt-4 flex items-center gap-4">
                  <button
                    onClick={handleEnrollFromHere}
                    className="px-8 py-3.5 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/25 transition-all"
                  >
                    الاشتراك في هذا الكورس الآن ({course.price} ج.م)
                  </button>
                </div>
              )}

              {/* Admin Quick Add Content Button */}
              {isAdmin && (
                <div className="pt-4">
                  <button
                    onClick={() => setIsAddContentOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة درس أو مذكرة جديدة (للمسؤول)</span>
                  </button>
                </div>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* Content Protection Check */}
      {!canAccess ? (
        <section className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="p-8 sm:p-12 rounded-3xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              محتوى هذا الكورس متاح فقط للمشتركين
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              اشترك في الكورس لتتمكن من مشاهدة كافة المحاضرات المسجلة بدقة عالية وتحميل المذكرات وشيتات الواجب بصيغة PDF.
            </p>
            <button
              onClick={handleEnrollFromHere}
              className="px-8 py-3.5 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/25 transition-all"
            >
              الاشتراك الآن ({course.price} ج.م)
            </button>
          </div>
        </section>
      ) : (
        /* Enrolled Student Content View */
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          {/* Content Type Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeFilter === 'all'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                الكل ({contents.length})
              </button>

              <button
                onClick={() => setActiveFilter('video')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeFilter === 'video'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>فيديوهات ({videoCount})</span>
              </button>

              <button
                onClick={() => setActiveFilter('pdf')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeFilter === 'pdf'
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>مذكرات PDF ({pdfCount})</span>
              </button>
            </div>

            {isAdmin && (
              <button
                onClick={() => setIsAddContentOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-white hover:bg-amber-600 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة محتوى جديد</span>
              </button>
            )}
          </div>

          {/* Content List Items */}
          {filteredContents.length > 0 ? (
            <div className="space-y-4">
              {filteredContents.map((item, index) => {
                const isVideo = item.type === 'video';

                return (
                  <div
                    key={item.id}
                    id={`content-item-${item.id}`}
                    className="p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-amber-500/40 dark:hover:border-amber-500/40 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      {/* Number Badge */}
                      <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-xs font-latin shrink-0">
                        {index + 1}
                      </div>

                      {/* Icon */}
                      <div className={`p-3 rounded-2xl shrink-0 ${
                        isVideo
                          ? 'bg-amber-500/10 text-amber-500 dark:text-amber-400'
                          : 'bg-rose-500/10 text-rose-500 dark:text-rose-400'
                      }`}>
                        {isVideo ? <Video className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                      </div>

                      {/* Details */}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-slate-900 dark:text-white">
                            {item.title}
                          </h4>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isVideo 
                              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                              : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                          }`}>
                            {isVideo ? 'محاضرة فيديو' : 'ملف PDF'}
                          </span>
                        </div>

                        {item.description && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
                            {item.description}
                          </p>
                        )}

                        <div className="flex items-center gap-3 text-xs text-slate-400 mt-1.5">
                          {isVideo ? (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-amber-500" />
                              <span>{item.duration || '40 دقيقة'}</span>
                            </span>
                          ) : (
                            <span>{item.fileSize || '3.2 MB'} • {item.pageCount ? `${item.pageCount} صفحة` : 'ملف جاهز للطباعة'}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="w-full sm:w-auto flex items-center gap-2 shrink-0">
                      {isVideo ? (
                        <button
                          id={`watch-video-btn-${item.id}`}
                          onClick={() => setSelectedVideo(item)}
                          className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-sm shadow-amber-500/20 transition-all hover:scale-105"
                        >
                          <Play className="w-4 h-4 fill-white" />
                          <span>مشاهدة المحاضرة</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button
                            id={`view-pdf-btn-${item.id}`}
                            onClick={() => setSelectedPdf(item)}
                            className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition-all"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>عرض المذكرة</span>
                          </button>
                          <button
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = item.url;
                              link.download = `${item.title}.pdf`;
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            }}
                            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="تحميل مباشر"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState
              icon={<BookOpen className="w-8 h-8" />}
              title="لا يوجد محتوى متاح حاليًا"
              description="لم يتم رفع محاضرات أو مذكرات في هذا القسم بعد. سيتم تحديث المحتوى قريباً."
            />
          )}

        </section>
      )}

      {/* Video Player Modal */}
      <VideoPlayerModal
        content={selectedVideo}
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />

      {/* PDF Viewer Modal */}
      <PdfViewerModal
        content={selectedPdf}
        isOpen={!!selectedPdf}
        onClose={() => setSelectedPdf(null)}
      />

      {/* Admin Add Content Modal */}
      {isAdmin && (
        <AddContentModal
          courseId={course.id}
          courseTitle={course.title}
          isOpen={isAddContentOpen}
          onClose={() => setIsAddContentOpen(false)}
          onContentAdded={() => refreshData()}
        />
      )}

    </div>
  );
};
