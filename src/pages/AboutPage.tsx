import React from 'react';
import { 
  Award, 
  Target, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Users, 
  GraduationCap, 
  Compass, 
  HeartHandshake, 
  MessageCircle, 
  ArrowLeft 
} from 'lucide-react';
import { PageView } from '../types';
import { ASSETS } from '../assets';

interface AboutPageProps {
  onNavigate: (page: PageView) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+201018432929', '_blank', 'noopener,noreferrer');
  };

  const pillars = [
    {
      icon: <Target className="w-6 h-6 text-amber-500" />,
      title: 'فلسفة The Sniper',
      description: 'التدريس بأسلوب القناص: التركيز المباشر على النقاط الجوهرية وتريكات واضعي الامتحانات دون إضاعة وقت الطالب في حشو لا طائل منه.',
    },
    {
      icon: <Award className="w-6 h-6 text-sky-500" />,
      title: 'خبرة أكاديمية عريقة',
      description: 'أكثر من 15 عاماً من التدريس المتخصص لصفوف الثانوية العامة وتخريج الآلاف من أوائل الجمهورية والجامعات المرموقة.',
    },
    {
      icon: <BookOpen className="w-6 h-6 text-emerald-500" />,
      title: 'مناهج مطابقة للنظام الحديث',
      description: 'مواكبة دقيقة لأحدث تعديلات وزارة التربية والتعليم والتركيز على نواتج التعلم ومهارات التفكير العليا والتحليل اللغوي.',
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-rose-500" />,
      title: 'متابعة شخصية ودعم متواصل',
      description: 'فريق عمل متكامل ومستر أحمد فاضل شخصياً للإجابة على استفسارات الطلاب ومتابعة الواجبات والاختبارات الدورية.',
    },
  ];

  const targetStudents = [
    {
      grade: 'طلاب الصف الثالث الثانوي',
      focus: 'الإعداد الشامل للثانوية العامة، التمكن من القواعد الـ 12 وحدة، حل أسئلة الترجمة والمقال والقصة، واجتياز الامتحانات بدرجة 100%.',
    },
    {
      grade: 'طلاب الصف الثاني الثانوي',
      focus: 'توسيع الثروة اللغوية والمفردات المتقدمة، التدريب على أسئلة الفهم غير المألوفة، والتمكن من صياغة الجمل الإنجليزية الدقيقة.',
    },
    {
      grade: 'طلاب الصف الأول الثانوي',
      focus: 'التأسيس القوي بعد الشهادة الإعدادية، فهم نظام التابلت والامتحانات الإلكترونية الحديثة، واكتساب ثقة التحدث والكتابة بالإنجليزية.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] dark:bg-[#0D0D0D] text-neutral-900 dark:text-[#F2F2F2] transition-colors duration-200 relative overflow-hidden">
      
      {/* Background Dot-Grid Texture */}
      <div className="absolute inset-0 bg-artistic-grid opacity-35 pointer-events-none"></div>

      {/* Header Banner */}
      <section className="relative py-16 lg:py-24 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white/60 dark:bg-[#0D0D0D]/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>من نحن | About Us</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 dark:text-white">
            رحلة التميز مع <span className="font-serif-display font-bold italic text-amber-500">The Sniper</span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            المنصة الرائدة في تعليم اللغة الإنجليزية للمرحلة الثانوية تحت إشراف <span className="font-serif-display font-bold italic text-neutral-900 dark:text-white">M/Ahmed Fadel</span>
          </p>
        </div>
      </section>

      {/* Teacher Profile Section */}
      <section className="py-16 lg:py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Teacher Image Presentation */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 sm:w-80 md:w-96 aspect-square">
                <div className="w-full h-full rounded-3xl overflow-hidden border-2 border-neutral-200 dark:border-neutral-700 shadow-2xl bg-neutral-100 dark:bg-neutral-900">
                  <img
                    src={ASSETS.teacher}
                    alt="M/Ahmed Fadel"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="absolute -bottom-4 -left-4 bg-[#0D0D0D] text-white p-4 rounded-2xl border border-amber-500/40 shadow-xl text-center">
                  <p className="text-xs font-bold text-amber-400 font-serif-display italic">M/Ahmed Fadel</p>
                  <p className="text-[11px] text-neutral-300 tracking-wider">The Sniper Founder</p>
                </div>
              </div>
            </div>

            {/* Teacher Bio & Identity */}
            <div className="lg:col-span-7 space-y-6 text-right">
              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
                  عن المعلم
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white">
                  مستر أحمد فاضل | <span className="font-serif-display italic text-amber-500 font-bold">M/Ahmed Fadel</span>
                </h2>
                <p className="text-sm font-bold text-neutral-500 dark:text-neutral-400">
                  معلم أول وخبير تدريس اللغة الإنجليزية للثانوية العامة
                </p>
              </div>

              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                يعتبر مستر أحمد فاضل من أبرز معلمي اللغة الإنجليزية للمرحلة الثانوية في جمهورية مصر العربية، حيث اشتهر بأسلوبه التدريسي المبتكر "The Sniper" الذي يجمع بين التبسيط الشديد للقواعد اللغوية الأكثر تعقيداً وبين التدريب المكثف على تريكات الامتحانات ونواتج التعلم الحديثة.
              </p>

              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                على مدار أكثر من عقد ونصف، تخرج على يديه عشرات الآلاف من الطلاب الذين حققوا الدرجات النهائية والتحقوا بكليات القمة (الطب، الهندسة، الألسن، واللغات والترجمة).
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 text-center">
                  <p className="text-2xl font-bold text-amber-500 font-serif-display">+15</p>
                  <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 mt-1">سنة خبرة تعليمية</p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 text-center">
                  <p className="text-2xl font-bold text-sky-500 font-serif-display">+10,000</p>
                  <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 mt-1">طالب متفوق</p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 text-center col-span-2 sm:col-span-1">
                  <p className="text-2xl font-bold text-emerald-500 font-serif-display">100%</p>
                  <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 mt-1">مطابقة للنظام الجديد</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Platform Vision & Pillars */}
      <section className="py-16 bg-white dark:bg-[#121212]/60 border-y border-neutral-200/80 dark:border-neutral-800/80 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
              رؤية المنصة
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
              لماذا أنشئت منصة The Sniper؟
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              هدفنا الأساسي هو كسر حاجز الخوف من امتحان اللغة الإنجليزية وتحويل المادة من مصدر قلق إلى أعلى مادة تحصيلية تضمن لك الترتيب بين أوائل الجمهورية.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0D0D0D] text-right space-y-3 relative overflow-hidden"
              >
                <div className="absolute top-4 left-5 text-3xl font-serif-display font-bold italic text-neutral-200 dark:text-neutral-800 select-none">
                  0{idx + 1}
                </div>

                <div className="p-3.5 rounded-2xl bg-neutral-100 dark:bg-neutral-800 w-fit border border-neutral-200 dark:border-neutral-700 shadow-sm">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Target Students Breakdown */}
      <section className="py-16 lg:py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
              الطلاب المستهدفون والمحتوى التعليمي
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              برامج تعليمية مخصصة ومصممة لكل مرحلة لضمان التدرج المعرفي الكامل
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {targetStudents.map((item, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212] text-right space-y-3 shadow-sm hover:border-amber-500/40 transition-colors relative overflow-hidden"
              >
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold font-serif-display">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  {item.grade}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {item.focus}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom Action */}
          <div className="mt-14 p-8 rounded-3xl bg-[#0D0D0D] text-white text-center space-y-4 max-w-3xl mx-auto border border-amber-500/30">
            <h3 className="text-xl sm:text-2xl font-black">
              ابدأ الآن مع مستر أحمد فاضل The Sniper
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto">
              تصفح الكورسات والمحاضرات وسجل حسابك الآن لتنضم إلى رحلة التفوق
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('courses')}
                className="px-6 py-3 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-600 text-neutral-950 shadow-md transition-all"
              >
                استعراض الكورسات
              </button>
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>تواصل معنا (واتساب)</span>
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
