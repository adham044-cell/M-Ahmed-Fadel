import React, { useState } from 'react';
import { X, Play, Volume2, Maximize, CheckCircle, Clock, BookOpen } from 'lucide-react';
import { CourseContent } from '../types';

interface VideoPlayerModalProps {
  content: CourseContent | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  content,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !content) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="video-player-modal-box"
        className="w-full max-w-4xl bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Play className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white line-clamp-1">
                {content.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>{content.duration || '45 دقيقة'}</span>
                </span>
                <span>•</span>
                <span className="text-emerald-400">جودة عالية HD 1080p</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="إغلاق مشغل الفيديو"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Box */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          <video
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
            src={content.url}
          >
            عذراً، متصفحك لا يدعم تشغيل الفيديو المباشر.
          </video>
        </div>

        {/* Video Info & Notes */}
        <div className="p-6 bg-slate-900 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-200">
              تفاصيل المحاضرة والشرح:
            </h4>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              The Sniper Platform
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {content.description || 'احرص على تدوين الملاحظات والتريكات المهمة التي يذكرها مستر أحمد فاضل أثناء الشرح ومراجعة الشيت الخاص بالمحاضرة.'}
          </p>
        </div>

      </div>
    </div>
  );
};
