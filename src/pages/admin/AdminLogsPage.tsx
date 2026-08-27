import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Search, 
  Trash2, 
  Filter, 
  Calendar, 
  User as UserIcon, 
  CheckCircle2,
  Layers,
  BookOpen,
  LogIn
} from 'lucide-react';
import { PageView, ActivityLog } from '../../types';
import { LogsService } from '../../services/logs';
import { useToast } from '../../context/ToastContext';
import { ConfirmModal } from '../../components/ConfirmModal';
import { EmptyState } from '../../components/EmptyState';

interface AdminLogsPageProps {
  onNavigate: (page: PageView) => void;
}

export const AdminLogsPage: React.FC<AdminLogsPageProps> = ({ onNavigate }) => {
  const toast = useToast();
  const [logs, setLogs] = useState<ActivityLog[]>(() => LogsService.getAllLogs());
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  const refreshLogs = () => {
    setLogs(LogsService.getAllLogs());
  };

  useEffect(() => {
    refreshLogs();
    const handleUpdate = () => refreshLogs();
    window.addEventListener('the_sniper_storage_update', handleUpdate);
    return () => window.removeEventListener('the_sniper_storage_update', handleUpdate);
  }, []);

  const filteredLogs = logs.filter(log => {
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    const matchesSearch = 
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesAction && matchesSearch;
  });

  const handleClearLogsConfirm = () => {
    LogsService.clearLogs();
    toast.success('تم مسح سجل النشاطات بنجاح');
    refreshLogs();
    setIsClearModalOpen(false);
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'user_registered':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">تسجيل حساب</span>;
      case 'user_login':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300">تسجيل دخول</span>;
      case 'course_enrolled':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">اشتراك بكورس</span>;
      case 'course_created':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">إنشاء كورس</span>;
      case 'content_added':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">إضافة محتوى</span>;
      case 'course_deleted':
      case 'user_deleted':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">حذف</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">{action}</span>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 pb-16">
      
      {/* Header */}
      <section className="py-8 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <Activity className="w-8 h-8 text-amber-500" />
              <span>سجل النشاطات والأحداث | Activity Logs</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              سجل تفصيلي لجميع العمليات والاشتراكات والتسجيلات على منصة The Sniper
            </p>
          </div>

          {logs.length > 0 && (
            <button
              onClick={() => setIsClearModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>مسح السجل</span>
            </button>
          )}
        </div>
      </section>

      {/* Filter & Search */}
      <section className="py-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {[
              { id: 'all', label: 'جميع النشاطات' },
              { id: 'course_enrolled', label: 'الاشتراكات' },
              { id: 'user_registered', label: 'التسجيل' },
              { id: 'course_created', label: 'الكورسات' },
              { id: 'content_added', label: 'المحتوى' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActionFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  actionFilter === tab.id
                    ? 'bg-amber-500 text-white'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="بحث في تفاصيل النشاط..."
              className="w-full pl-4 pr-10 py-2.5 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
          </div>

        </div>
      </section>

      {/* Logs Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {filteredLogs.length > 0 ? (
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-4">نوع الإجراء</th>
                    <th className="p-4">تفاصيل النشاط</th>
                    <th className="p-4">المستخدم المعني</th>
                    <th className="p-4 font-latin">التاريخ والوقت</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredLogs.map(log => {
                    const dateObj = new Date(log.timestamp);
                    const formattedDate = dateObj.toLocaleDateString('ar-EG', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    });

                    return (
                      <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="p-4">
                          {getActionBadge(log.action)}
                        </td>

                        <td className="p-4 font-bold text-slate-800 dark:text-slate-200 max-w-md">
                          {log.details}
                        </td>

                        <td className="p-4 text-slate-600 dark:text-slate-300">
                          {log.userName}
                        </td>

                        <td className="p-4 font-latin text-slate-400 text-[11px] whitespace-nowrap">
                          {formattedDate}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <EmptyState
            icon={<Activity className="w-8 h-8" />}
            title="لا توجد نشاطات مسجلة"
            description="ستظهر أي حركة اشتراك، تسجيل، أو إضافة محتوى في هذا السجل تلقائياً."
          />
        )}
      </section>

      {/* Clear Logs Confirm */}
      <ConfirmModal
        isOpen={isClearModalOpen}
        title="مسح سجل النشاطات"
        message="هل أنت متأكد من رغبتك في تفريغ سجل النشاطات بالكامل؟"
        confirmText="تفريغ السجل"
        isDestructive={true}
        onConfirm={handleClearLogsConfirm}
        onCancel={() => setIsClearModalOpen(false)}
      />

    </div>
  );
};
