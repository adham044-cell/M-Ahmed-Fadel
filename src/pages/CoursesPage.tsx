import React, { useState, useEffect } from 'react';
import { Search, Filter, BookOpen, Sparkles, Tag, ArrowLeft } from 'lucide-react';
import { PageView, GradeLevel, Course } from '../types';
import { CoursesService } from '../services/courses';
import { EnrollmentService } from '../services/enrollments';
import { useAuth } from '../context/AuthContext';
import { CourseCard } from '../components/CourseCard';
import { EmptyState } from '../components/EmptyState';

interface CoursesPageProps {
  onNavigate: (page: PageView) => void;
  onOpenCourse: (courseId: string) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({ onNavigate, onOpenCourse }) => {
  const { user, isAuthenticated } = useAuth();
  const [courses, setCourses] = useState<Course[]>(() => CoursesService.getCourses());
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const refreshCourses = () => {
    setCourses(CoursesService.getCourses());
  };

  useEffect(() => {
    refreshCourses();
    const handleUpdate = () => refreshCourses();
    window.addEventListener('the_sniper_storage_update', handleUpdate);
    return () => window.removeEventListener('the_sniper_storage_update', handleUpdate);
  }, []);

  const enrolledCourseIds = user 
    ? new Set(EnrollmentService.getStudentEnrollments(user.id).map(e => e.courseId))
    : new Set<string>();

  const filteredCourses = courses.filter(course => {
    const matchesGrade = selectedGrade === 'all' || course.grade === selectedGrade;
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.gradeLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGrade && matchesSearch;
  });

  const gradeOptions = [
    { id: 'all', label: 'جميع المراحل الدراسية' },
    { id: 'third', label: 'الصف الثالث الثانوي (3 ثانوى)' },
    { id: 'second', label: 'الصف الثاني الثانوي (2 ثانوى)' },
    { id: 'first', label: 'الصف الأول الثانوي (1 ثانوى)' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] dark:bg-[#0D0D0D] text-neutral-900 dark:text-[#F2F2F2] transition-colors duration-200 relative overflow-hidden">
      
      {/* Background Dot-Grid Texture */}
      <div className="absolute inset-0 bg-artistic-grid opacity-35 pointer-events-none"></div>

      {/* Header Banner */}
      <section className="py-12 lg:py-16 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white/60 dark:bg-[#0D0D0D]/70 backdrop-blur-md relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>كتالوج الكورسات والمناهج</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-900 dark:text-white">
            كورسات اللغة الإنجليزية مع <span className="font-serif-display font-bold italic text-amber-500">M/Ahmed Fadel</span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-xl mx-auto leading-relaxed">
            اختر كورس مرحلتك الدراسية، واشترك لتصل فوراً إلى المحاضرات ومذكرات الـ PDF وشيتات التدريب.
          </p>
        </div>
      </section>

      {/* Filters & Search Toolbar */}
      <section className="py-6 bg-[#F8F9FA]/90 dark:bg-[#0D0D0D]/90 border-b border-neutral-200/80 dark:border-neutral-800/80 sticky top-20 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Grade Tabs */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
              {gradeOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => setSelectedGrade(option.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                    selectedGrade === option.id
                      ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                      : 'bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-amber-500/40'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="ابحث عن كورس أو وحدة..."
                className="w-full pl-4 pr-10 py-2.5 rounded-xl text-xs sm:text-sm border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#121212] text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute right-3.5 top-3" />
            </div>

          </div>
        </div>
      </section>

      {/* Courses Catalog Grid */}
      <section className="py-12 lg:py-16 flex-1 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isEnrolled={enrolledCourseIds.has(course.id)}
                  onOpenCourse={onOpenCourse}
                  onRequireAuth={() => onNavigate('login')}
                  onEnroll={() => refreshCourses()}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Search className="w-8 h-8" />}
              title="لم يتم العثور على أي كورسات مطابقة"
              description="جرب البحث بكلمات مختلفة أو اختيار مرحلة دراسية أخرى من القائمة بالأعلى."
              actionText="عرض جميع الكورسات"
              onAction={() => {
                setSelectedGrade('all');
                setSearchQuery('');
              }}
            />
          )}

        </div>
      </section>

    </div>
  );
};
