import React from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Target, 
  Award, 
  ShieldCheck, 
  PlayCircle, 
  FileText, 
  CheckCircle2, 
  Users, 
  ArrowLeft, 
  ArrowRight,
  TrendingUp, 
  Zap, 
  MessageCircle,
  Clock,
  Layers,
  GraduationCap
} from 'lucide-react';
import { PageView, Course } from '../types';
import { ASSETS } from '../assets';
import { CoursesService } from '../services/courses';
import { CourseCard } from '../components/CourseCard';

interface HomePageProps {
  onNavigate: (page: PageView) => void;
  onOpenCourse: (courseId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenCourse }) => {
  const featuredCourses = CoursesService.getCourses().slice(0, 3);

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+201018432929', '_blank', 'noopener,noreferrer');
  };

  // Feature cards explicitly required by spec
  const features = [
    {
      icon: <Layers className="w-6 h-6 text-amber-500" />,
      title: 'كورسات منظمة',
      description: 'مناهج مقسمة بدقة واحترافية حسب كل صف دراسي (أولى، ثانية، وثالثة ثانوي) لتغطية كل جوانب المنهج دون تشتت.',
    },
    {
      icon: <Target className="w-6 h-6 text-sky-500" />,
      title: 'محتوى تعليمي متكامل',
      description: 'شرح متعمق للقواعد (Grammar)، المفردات (Vocab)، القصة، وحيل حل قطع الفهم المعقدة وكتابة المقال.',
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-emerald-500" />,
      title: 'متابعة الكورسات والتقدم',
      description: 'لوحة تحكم خاصة لكل طالب لمتابعة المحاضرات المكتملة، شيتات الواجبات المحلولة، ونسب التقدم الدراسي.',
    },
    {
      icon: <PlayCircle className="w-6 h-6 text-rose-500" />,
      title: 'فيديوهات وملفات PDF',
      description: 'محاضرات مصورة بأعلى جودة Full HD ومذكرات دراسية وشيتات تدريبات جاهزة للتحميل والطباعة الفورية.',
    },
    {
      icon: <Zap className="w-6 h-6 text-indigo-500" />,
      title: 'تجربة تعليمية سهلة',
      description: 'واجهة عصرية تفاعلية وسلسة تركز على سهولة الوصول إلى الدروس والاختبارات دون أي تعقيد.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-purple-500" />,
      title: 'الوصول إلى المحتوى من أي جهاز',
      description: 'المنصة متوافقة تماماً مع الهاتف المحمول والتابلت والكمبيوتر لتذاكر في أي وقت ومن أي مكان.',
    },
  ];

  const secondaryGrades = [
    {
      title: 'الصف الثالث الثانوي',
      sub: 'شهادة إتمام الثانوية العامة',
      desc: 'كبسولات الجرامر الكاملة، 12 وحدة مفصلة، معسكرات ليلة الامتحان وتريكات بنك الأسئلة الوزارية.',
      badge: 'الشهادة العامة',
      color: 'border-amber-500/40 bg-amber-500/5',
    },
    {
      title: 'الصف الثاني الثانوي',
      sub: 'المرحلة الانتقالية والمهارات',
      desc: 'الترجمة المتقدمة، بناء المعجم اللغوي القوي، وقواعد التراكيب المعقدة والقصة.',
      badge: 'مستوى متقدم',
      color: 'border-sky-500/40 bg-sky-500/5',
    },
    {
      title: 'الصف الأول الثانوي',
      sub: 'التأسيس للثانوية العامة',
      desc: 'الانتقال السلس للنظام الحديث، ضبط الأساسيات، وتدريبات على نظام الاختيار من متعدد الإلكتروني.',
      badge: 'تأسيس شامل',
      color: 'border-emerald-500/40 bg-emerald-500/5',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] dark:bg-[#0D0D0D] text-neutral-900 dark:text-[#F2F2F2] transition-colors duration-200 relative overflow-hidden">
      
      {/* Background Dot-Grid Texture */}
      <div className="absolute inset-0 bg-artistic-grid opacity-40 pointer-events-none"></div>

      {/* ================================================== */}
      {/* HERO SECTION                                      */}
      {/* ================================================== */}
      <section className="relative overflow-hidden pt-10 pb-16 lg:pt-20 lg:pb-28 border-b border-neutral-200/80 dark:border-neutral-800/80">
        {/* Ambient artistic subtle glows */}
        <div className="absolute top-1/4 right-5 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content (Text & CTAs) */}
            <div className="lg:col-span-7 space-y-6 text-right">
              
              {/* Artistic Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs sm:text-sm font-bold shadow-sm">
                <Target className="w-4 h-4 text-amber-500" />
                <span className="tracking-wide">المنصة الرسمية لمعلم اللغة الإنجليزية للمرحلة الثانوية</span>
              </div>

              {/* Title & Teacher Subtitle */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 dark:text-white leading-[1.2]">
                  صوّب نحو الدرجة النهائية مع <span className="font-serif-display font-bold italic text-amber-500 block sm:inline">The Sniper</span>
                </h1>
                <div className="flex items-center gap-3">
                  <div className="h-[2px] w-10 bg-amber-500/60"></div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-neutral-700 dark:text-neutral-200 font-latin italic">
                    M/Ahmed Fadel
                  </p>
                </div>
              </div>

              {/* Arabic Description */}
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
                كبسولة التفوق الشاملة في منهج اللغة الإنجليزية لطلاب المرحلة الثانوية العامة. تبسيط القواعد الأكثر تعقيداً، حفظ الكلمات بأسلوب ذكي، واحتراف أسئلة المهارات والترجمة بنظام الامتحانات الجديد.
              </p>

              {/* Hero Key Points */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>شرح مبسط وتريكات الامتحانات</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-700 dark:text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>مذكرات PDF ملونة شاملة</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-700 dark:text-neutral-300 col-span-2 sm:col-span-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>متابعة دورية واختبارات</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  id="hero-register-btn"
                  onClick={() => onNavigate('register')}
                  className="flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold bg-amber-500 hover:bg-amber-600 text-neutral-950 shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span>إنشاء حساب والبدء الآن</span>
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <button
                  id="hero-login-btn"
                  onClick={() => onNavigate('login')}
                  className="flex items-center gap-2.5 px-7 py-4 rounded-2xl text-base font-bold border-2 border-neutral-300 dark:border-neutral-700 hover:border-amber-500 bg-white dark:bg-[#121212] text-neutral-800 dark:text-neutral-200 transition-all duration-200"
                >
                  <span>تسجيل الدخول</span>
                </button>

                <button
                  onClick={handleWhatsAppClick}
                  className="flex items-center gap-2 px-5 py-4 rounded-2xl text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>تواصل عبر واتساب</span>
                </button>
              </div>

            </div>

            {/* Right Hero Image (Teacher Presentation & Composition) */}
            <div className="lg:col-span-5 flex justify-center relative">
              
              {/* Outer Decorative Rings */}
              <div className="relative w-72 sm:w-80 md:w-96 aspect-square">
                
                {/* Glowing Background Radial */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/20 via-amber-400/10 to-indigo-500/20 animate-pulse"></div>
                
                {/* Border Frame with Artistic Flair */}
                <div className="w-full h-full rounded-3xl overflow-hidden border-2 border-neutral-200 dark:border-neutral-700 shadow-2xl bg-gradient-to-b from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-[#0D0D0D] relative">
                  <img
                    src={ASSETS.teacher}
                    alt="مستر أحمد فاضل - The Sniper"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Overlay Gradient on bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0D0D0D]/95 via-[#0D0D0D]/50 to-transparent flex flex-col justify-end p-4 text-center">
                    <span className="text-amber-400 font-serif-display text-xl font-bold tracking-wide italic">
                      M/Ahmed Fadel
                    </span>
                    <span className="text-xs font-semibold text-neutral-300">
                      The Sniper in English
                    </span>
                  </div>
                </div>

                {/* Floating Experience Badge */}
                <div className="absolute -bottom-5 -right-5 sm:-right-6 bg-white dark:bg-[#121212] p-3.5 sm:p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500 text-neutral-950 font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-neutral-900 dark:text-white">+15 سنة</p>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400">خبرة بالثانوية العامة</p>
                  </div>
                </div>

                {/* Floating Sniper Reticle Badge */}
                <div className="absolute -top-4 -left-4 sm:-left-6 bg-[#0D0D0D] text-white p-3 rounded-2xl border border-amber-500/40 shadow-xl flex items-center gap-2.5">
                  <Target className="w-5 h-5 text-amber-400 animate-spin" />
                  <span className="text-xs font-bold font-serif-display italic">100% Final Mark</span>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* QUICK STATS STRIP                                  */}
      {/* ================================================== */}
      <section className="py-8 bg-white dark:bg-[#121212]/80 border-b border-neutral-200/80 dark:border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="space-y-1">
              <p className="text-2xl sm:text-4xl font-bold font-serif-display text-amber-500">+10,000</p>
              <p className="text-xs sm:text-sm font-semibold text-neutral-600 dark:text-neutral-400">طالب متفوق في الثانوية</p>
            </div>

            <div className="space-y-1">
              <p className="text-2xl sm:text-4xl font-bold font-serif-display text-sky-500">+150</p>
              <p className="text-xs sm:text-sm font-semibold text-neutral-600 dark:text-neutral-400">محاضرة تفاعلية كاملة</p>
            </div>

            <div className="space-y-1">
              <p className="text-2xl sm:text-4xl font-bold font-serif-display text-emerald-500">+50</p>
              <p className="text-xs sm:text-sm font-semibold text-neutral-600 dark:text-neutral-400">مذكرة وشيت تدريبات PDF</p>
            </div>

            <div className="space-y-1">
              <p className="text-2xl sm:text-4xl font-bold font-serif-display text-indigo-500">100%</p>
              <p className="text-xs sm:text-sm font-semibold text-neutral-600 dark:text-neutral-400">متابعة وإجابة استفسارات</p>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* PLATFORM FEATURES SECTION                          */}
      {/* ================================================== */}
      <section className="py-16 lg:py-24 bg-[#F8F9FA] dark:bg-[#0D0D0D] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              مميزات منصة The Sniper
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white">
              كل ما تحتاجه للدرجة النهائية في مكان واحد
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              صممت المنصة خصيصاً لتوفير بيئة تعليمية ذكية تسهل استيعاب اللغة وتوفر أعلى درجات التركيز.
            </p>
          </div>

          {/* Features Grid with Artistic Numbering */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                id={`feature-card-${idx}`}
                className="group p-8 rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#121212] hover:border-amber-500/40 dark:hover:border-amber-500/40 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-right relative overflow-hidden"
              >
                {/* Watermark Editorial Number */}
                <div className="absolute top-4 left-5 text-4xl font-serif-display font-bold italic text-neutral-200 dark:text-neutral-800 select-none group-hover:text-amber-500/20 transition-colors">
                  0{idx + 1}
                </div>

                <div className="p-4 rounded-2xl bg-neutral-100 dark:bg-neutral-800 w-fit mb-6 group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-amber-500 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* SECONDARY GRADES ROADMAP                           */}
      {/* ================================================== */}
      <section className="py-16 bg-white dark:bg-[#121212]/60 border-y border-neutral-200/80 dark:border-neutral-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
              المراحل التعليمية المتاحة
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              مناهج متكاملة ومخصصة لكل صف دراسي من الصف الأول إلى الثالث الثانوي
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {secondaryGrades.map((grade, idx) => (
              <div
                key={idx}
                className={`p-7 rounded-3xl border ${grade.color} flex flex-col justify-between space-y-5 hover:shadow-md transition-shadow relative overflow-hidden`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                      {grade.badge}
                    </span>
                    <span className="font-serif-display text-sm font-bold text-amber-500">Grade 0{idx + 1}</span>
                  </div>

                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                    {grade.title}
                  </h3>
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                    {grade.sub}
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {grade.desc}
                  </p>
                </div>

                <button
                  onClick={() => onNavigate('courses')}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-bold bg-neutral-900 dark:bg-neutral-800 text-white hover:bg-amber-500 hover:text-neutral-950 dark:hover:bg-amber-500 dark:hover:text-neutral-950 transition-colors"
                >
                  <span>استعراض كورسات المرحلة</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* FEATURED COURSES SECTION                           */}
      {/* ================================================== */}
      <section className="py-16 lg:py-24 bg-[#F8F9FA] dark:bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
                الكورسات الأكثر طلباً
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mt-1">
                ابدأ رحلتك التعليمية مع أقوى الكورسات
              </h2>
            </div>

            <button
              onClick={() => onNavigate('courses')}
              className="flex items-center gap-2 text-sm font-bold text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors"
            >
              <span>عرض جميع الكورسات</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map(course => (
              <CourseCard
                key={course.id}
                course={course}
                isEnrolled={false}
                onOpenCourse={onOpenCourse}
                onRequireAuth={() => onNavigate('login')}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* FINAL CALL TO ACTION (BANNER)                     */}
      {/* ================================================== */}
      <section className="py-16 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-neutral-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight max-w-2xl mx-auto leading-tight">
            هل أنت جاهز لتكون أحد أوائل الجمهورية في اللغة الإنجليزية؟
          </h2>
          <p className="text-base sm:text-lg text-neutral-900 max-w-xl mx-auto font-medium">
            انضم الآن إلى عائلة The Sniper مع مستر أحمد فاضل وابدأ المذاكرة بأعلى كفاءة.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              id="cta-register-btn"
              onClick={() => onNavigate('register')}
              className="px-8 py-4 rounded-2xl text-base font-bold bg-[#0D0D0D] text-white hover:bg-neutral-900 shadow-xl transition-all hover:scale-105"
            >
              إنشاء حساب طالب الآن
            </button>
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center gap-2 px-6 py-4 rounded-2xl text-base font-bold bg-white/30 hover:bg-white/40 backdrop-blur-md text-neutral-950 border border-black/10 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>استفسر عبر واتساب</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
