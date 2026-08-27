import React from 'react';
import { X, FileText, Download, ExternalLink, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { CourseContent } from '../types';

interface PdfViewerModalProps {
  content: CourseContent | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  content,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !content) return null;

  const handleOpenInNewTab = () => {
    window.open(content.url, '_blank', 'noopener,noreferrer');
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = content.url;
    link.download = `${content.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="pdf-viewer-modal-box"
        className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-rose-500/10 text-rose-500 border border-rose-500/20">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {content.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                <span>الحجم: {content.fileSize || '3.2 MB'}</span>
                <span>•</span>
                <span>{content.pageCount ? `${content.pageCount} صفحة` : 'ملف PDF ملون'}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body / Document Preview Graphic */}
        <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center bg-slate-50/50 dark:bg-slate-950/30 border-y border-slate-100 dark:border-slate-800">
          <div className="w-24 h-32 rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-950/40 dark:to-rose-900/20 border-2 border-rose-200 dark:border-rose-800 flex flex-col items-center justify-center shadow-lg mb-6 relative">
            <FileText className="w-12 h-12 text-rose-500 mb-2" />
            <span className="text-[10px] font-black uppercase tracking-wider bg-rose-500 text-white px-2 py-0.5 rounded">
              PDF
            </span>
          </div>

          <h4 className="text-base font-bold text-slate-900 dark:text-white max-w-md">
            {content.title}
          </h4>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mt-2 leading-relaxed">
            {content.description || 'مذكرة دراسية وشيت تدريبات معتمدة من مستر أحمد فاضل The Sniper لمتابعة المنهج والمذاكرة بتركيز.'}
          </p>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <button
              id="pdf-open-btn"
              onClick={handleOpenInNewTab}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20 transition-all hover:scale-105"
            >
              <ExternalLink className="w-4 h-4" />
              <span>فتح الملف في المتصفح</span>
            </button>

            <button
              id="pdf-download-btn"
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-sm transition-all"
            >
              <Download className="w-4 h-4 text-emerald-500" />
              <span>تحميل المذكرة (Download)</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>محتوى حصري لطلاب منصة The Sniper</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-600 dark:text-slate-300 font-semibold hover:underline"
          >
            إغلاق النافذة
          </button>
        </div>

      </div>
    </div>
  );
};
