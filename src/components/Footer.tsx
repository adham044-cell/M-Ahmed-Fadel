import React from 'react';
import { MessageCircle, BookOpen, Shield, Phone, Mail, Award, Sparkles } from 'lucide-react';
import { PageView } from '../types';
import { ASSETS } from '../assets';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+201018432929', '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800/80 bg-white dark:bg-[#0D0D0D] text-neutral-700 dark:text-neutral-300 transition-colors duration-200 relative overflow-hidden">
      {/* Subtle background flair */}
      <div className="absolute inset-0 bg-artistic-grid opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Platform & Teacher Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500/80 shadow-md">
                <img 
                  src={ASSETS.teacher} 
                  alt="M/Ahmed Fadel" 
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="font-serif-display text-2xl font-bold tracking-tight text-neutral-900 dark:text-[#F2F2F2]">
                  The Sniper
                </h3>
                <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 font-latin italic">
                  M/Ahmed Fadel
                </p>
              </div>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              المنصة التعليمية الأولى المتخصصة في تدريس اللغة الإنجليزية لطلاب المرحلة الثانوية العامة. نهج تدريسي احترافي يضمن الفهم والدرجة النهائية.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-600 dark:text-neutral-400">
              <Award className="w-4 h-4 text-amber-500" />
              <span>خبرة أكثر من 15 عاماً في تدريس الثانوية العامة</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white tracking-wider">
                روابط المنصة
              </h4>
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('home')} 
                  className="hover:text-amber-500 transition-colors text-right"
                >
                  الرئيسية
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('courses')} 
                  className="hover:text-amber-500 transition-colors text-right"
                >
                  الكورسات والمناهج
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="hover:text-amber-500 transition-colors text-right"
                >
                  من نحن - مستر أحمد فاضل
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('login')} 
                  className="hover:text-amber-500 transition-colors text-right"
                >
                  تسجيل الدخول للطلاب
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('register')} 
                  className="hover:text-amber-500 transition-colors text-right"
                >
                  إنشاء حساب طالب جديد
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Secondary Grades */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white tracking-wider">
                المراحل التعليمية
              </h4>
            </div>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-amber-500/80"></span>
                <span>الصف الثالث الثانوي (الثانوية العامة)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-amber-500/80"></span>
                <span>الصف الثاني الثانوي</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-amber-500/80"></span>
                <span>الصف الأول الثانوي</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-amber-500/80"></span>
                <span>معسكرات المراجعة وليالي الامتحانات</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contact & Support */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white tracking-wider">
                الدعم والتواصل المباشر
              </h4>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              لأي استفسارات حول الحجز والاشتراكات ومواعيد المحاضرات، يمكنك التواصل معنا مباشرة:
            </p>

            <button
              id="footer-whatsapp-btn"
              onClick={handleWhatsAppClick}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
            >
              <MessageCircle className="w-5 h-5" />
              <span>واتساب: 01018432929</span>
            </button>

            <div className="text-xs text-neutral-500 dark:text-neutral-400 space-y-1">
              <p>متاح يومياً للرد على استفسارات الطلاب وأولياء الأمور</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <p>
            جميع الحقوق محفوظة © {new Date().getFullYear()} لمنصة <span className="font-serif-display font-bold text-neutral-800 dark:text-[#F2F2F2]">The Sniper</span> | مستر أحمد فاضل (<span className="font-latin italic">M/Ahmed Fadel</span>)
          </p>
          <div className="flex items-center gap-4">
            <span className="font-serif-display italic">Artistic Academic Excellence</span>
            <span>•</span>
            <span>تصميم بمعايير احترافية</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
