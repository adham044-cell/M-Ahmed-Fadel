import React, { useState } from 'react';
import { X, Plus, Video, FileText, Upload, Link2, Clock, CheckCircle } from 'lucide-react';
import { ContentType, CourseContent } from '../types';
import { ContentService } from '../services/content';
import { useToast } from '../context/ToastContext';

interface AddContentModalProps {
  courseId: string;
  courseTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onContentAdded: (content: CourseContent) => void;
}

export const AddContentModal: React.FC<AddContentModalProps> = ({
  courseId,
  courseTitle,
  isOpen,
  onClose,
  onContentAdded,
}) => {
  const toast = useToast();

  const [type, setType] = useState<ContentType>('video');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('45 دقيقة');
  const [fileSize, setFileSize] = useState('3.5 MB');
  const [errors, setErrors] = useState<{ title?: string; url?: string }>({});

  if (!isOpen) return null;

  const defaultVideoUrls = [
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  ];

  const defaultPdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

  const handlePresetUrl = () => {
    if (type === 'video') {
      setUrl(defaultVideoUrls[Math.floor(Math.random() * defaultVideoUrls.length)]);
    } else {
      setUrl(defaultPdfUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { title?: string; url?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'يرجى إدخال عنوان المحتوى';
    }

    const finalUrl = url.trim() || (type === 'video' ? defaultVideoUrls[0] : defaultPdfUrl);

    if (!finalUrl) {
      newErrors.url = 'يرجى إدخال رابط أو اختيار ملف المحتوى';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const createdContent = ContentService.addCourseContent({
      courseId,
      title: title.trim(),
      type,
      url: finalUrl,
      description: description.trim(),
      duration: type === 'video' ? duration.trim() : undefined,
      fileSize: type === 'pdf' ? fileSize.trim() : undefined,
    });

    toast.success('تمت إضافة المحتوى بنجاح');
    onContentAdded(createdContent);
    onClose();

    // Reset
    setTitle('');
    setUrl('');
    setDescription('');
    setErrors({});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="add-content-modal-box"
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Plus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                إضافة محتوى تعليمي
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                كورس: {courseTitle}
              </p>
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

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Type Selector (Video or PDF) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              نوع المحتوى <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType('video')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-bold transition-all ${
                  type === 'video'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-2 ring-amber-500/20'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>فيديو (محاضرة)</span>
              </button>

              <button
                type="button"
                onClick={() => setType('pdf')}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-bold transition-all ${
                  type === 'pdf'
                    ? 'border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-2 ring-rose-500/20'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>ملف PDF (مذكرة / شيت)</span>
              </button>
            </div>
          </div>

          {/* Content Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              عنوان المحتوى / اسم الدرس <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={e => {
                setTitle(e.target.value);
                if (errors.title) setErrors(prev => ({ ...prev, title: undefined }));
              }}
              placeholder={type === 'video' ? 'مثال: المحاضرة الثالثة: قاعدة If الشرطية وحالاتها' : 'مثال: ملزمة كبسولة الترجمة والشيت التطبيقي'}
              className={`w-full px-4 py-2.5 rounded-xl text-sm border bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                errors.title
                  ? 'border-rose-500 focus:ring-rose-500/30'
                  : 'border-slate-300 dark:border-slate-700 focus:ring-amber-500/30 focus:border-amber-500'
              }`}
            />
            {errors.title && (
              <p className="text-xs text-rose-500 mt-1">{errors.title}</p>
            )}
          </div>

          {/* URL / File Link */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                رابط الملف أو الفيديو (URL) <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                onClick={handlePresetUrl}
                className="text-[11px] text-amber-500 hover:underline font-semibold"
              >
                تعبئة برابط تجريبي جاهز
              </button>
            </div>
            <div className="relative">
              <input
                type="url"
                value={url}
                onChange={e => {
                  setUrl(e.target.value);
                  if (errors.url) setErrors(prev => ({ ...prev, url: undefined }));
                }}
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
              />
              <Link2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Meta Info (Duration or File size) */}
          <div className="grid grid-cols-2 gap-3">
            {type === 'video' ? (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  مدة المحاضرة
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={e => setDuration(e.target.value)}
                  placeholder="مثال: 50 دقيقة"
                  className="w-full px-4 py-2.5 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  حجم ملف الـ PDF
                </label>
                <input
                  type="text"
                  value={fileSize}
                  onChange={e => setFileSize(e.target.value)}
                  placeholder="مثال: 4.5 MB"
                  className="w-full px-4 py-2.5 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                ملاحظات إضافية
              </label>
              <input
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="مثال: متوفر للمشاهدة الفورية"
                className="w-full px-4 py-2.5 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              إلغاء
            </button>
            <button
              id="submit-add-content-btn"
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/25 transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة المحتوى</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
