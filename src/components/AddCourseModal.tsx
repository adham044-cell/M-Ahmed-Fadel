import React, { useState } from 'react';
import { X, Plus, BookPlus, Image as ImageIcon, DollarSign, Tag, FileText } from 'lucide-react';
import { GradeLevel, Course } from '../types';
import { CoursesService } from '../services/courses';
import { useToast } from '../context/ToastContext';
import { ASSETS } from '../assets';

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCourseAdded: (course: Course) => void;
}

export const AddCourseModal: React.FC<AddCourseModalProps> = ({
  isOpen,
  onClose,
  onCourseAdded,
}) => {
  const toast = useToast();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('180');
  const [grade, setGrade] = useState<GradeLevel>('third');
  const [selectedImage, setSelectedImage] = useState<string>(ASSETS.courseGrammar);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [errors, setErrors] = useState<{ title?: string; description?: string; price?: string }>({});

  if (!isOpen) return null;

  const imagePresets = [
    { label: 'كورس الجرامر الشامل', img: ASSETS.courseGrammar },
    { label: 'كورس المراجعة النهائية', img: ASSETS.courseExam },
    { label: 'بورتريه المستر', img: ASSETS.teacher },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { title?: string; description?: string; price?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'يرجى إدخال اسم الكورس';
    }

    if (!description.trim()) {
      newErrors.description = 'يرجى إدخال وصف مختصر للكورس';
    }

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice < 0) {
      newErrors.price = 'يرجى إدخال سعر صحيح للكورس';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const finalImage = customImageUrl.trim() || selectedImage;

    const createdCourse = CoursesService.createCourse({
      title: title.trim(),
      description: description.trim(),
      image: finalImage,
      price: numericPrice,
      grade,
      isPopular: true,
    });

    toast.success('تم إضافة الكورس بنجاح');
    onCourseAdded(createdCourse);
    onClose();

    // Reset form
    setTitle('');
    setDescription('');
    setPrice('180');
    setCustomImageUrl('');
    setErrors({});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="add-course-modal-box"
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <BookPlus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                إضافة كورس جديد
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                سيظهر الكورس مباشرة في قائمة الكورسات للطلاب
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
          {/* Course Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              اسم الكورس <span className="text-rose-500">*</span>
            </label>
            <input
              id="course-title-input"
              type="text"
              value={title}
              onChange={e => {
                setTitle(e.target.value);
                if (errors.title) setErrors(prev => ({ ...prev, title: undefined }));
              }}
              placeholder="مثال: كبسولة القواعد والترجمة للثانوية العامة"
              className={`w-full px-4 py-3 rounded-xl text-sm border bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                errors.title
                  ? 'border-rose-500 focus:ring-rose-500/30'
                  : 'border-slate-300 dark:border-slate-700 focus:ring-amber-500/30 focus:border-amber-500'
              }`}
            />
            {errors.title && (
              <p className="text-xs text-rose-500 mt-1">{errors.title}</p>
            )}
          </div>

          {/* Grade Level & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                المرحلة الدراسية <span className="text-rose-500">*</span>
              </label>
              <select
                id="course-grade-select"
                value={grade}
                onChange={e => setGrade(e.target.value as GradeLevel)}
                className="w-full px-4 py-3 rounded-xl text-sm border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
              >
                <option value="third">الصف الثالث الثانوي (3 ثانوى)</option>
                <option value="second">الصف الثاني الثانوي (2 ثانوى)</option>
                <option value="first">الصف الأول الثانوي (1 ثانوى)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                سعر الكورس (ج.م) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="course-price-input"
                  type="number"
                  min="0"
                  value={price}
                  onChange={e => {
                    setPrice(e.target.value);
                    if (errors.price) setErrors(prev => ({ ...prev, price: undefined }));
                  }}
                  placeholder="180"
                  className={`w-full px-4 py-3 rounded-xl text-sm border bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                    errors.price
                      ? 'border-rose-500 focus:ring-rose-500/30'
                      : 'border-slate-300 dark:border-slate-700 focus:ring-amber-500/30 focus:border-amber-500'
                  }`}
                />
                <span className="absolute left-3 top-3 text-xs font-bold text-slate-400">
                  ج.م
                </span>
              </div>
              {errors.price && (
                <p className="text-xs text-rose-500 mt-1">{errors.price}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              وصف الكورس ومحتوياته <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="course-desc-input"
              rows={3}
              value={description}
              onChange={e => {
                setDescription(e.target.value);
                if (errors.description) setErrors(prev => ({ ...prev, description: undefined }));
              }}
              placeholder="اكتب نبذة عن الدروس والوحدات وشيتات الواجب والمذكرات المتضمنة..."
              className={`w-full px-4 py-3 rounded-xl text-sm border bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                errors.description
                  ? 'border-rose-500 focus:ring-rose-500/30'
                  : 'border-slate-300 dark:border-slate-700 focus:ring-amber-500/30 focus:border-amber-500'
              }`}
            />
            {errors.description && (
              <p className="text-xs text-rose-500 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Cover Image Preset Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              غلاف الكورس (Cover Image)
            </label>
            <div className="grid grid-cols-3 gap-3 mb-3">
              {imagePresets.map((preset, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedImage(preset.img);
                    setCustomImageUrl('');
                  }}
                  className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all p-1 ${
                    selectedImage === preset.img && !customImageUrl
                      ? 'border-amber-500 ring-2 ring-amber-500/30'
                      : 'border-slate-200 dark:border-slate-700 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="aspect-video w-full rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img src={preset.img} alt={preset.label} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[10px] font-bold text-center mt-1 text-slate-700 dark:text-slate-300 truncate">
                    {preset.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Custom URL Option */}
            <input
              type="url"
              value={customImageUrl}
              onChange={e => setCustomImageUrl(e.target.value)}
              placeholder="أو ضع رابط صورة مخصص (URL)..."
              className="w-full px-4 py-2.5 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              إلغاء
            </button>
            <button
              id="submit-add-course-btn"
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/25 transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة الكورس</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
