import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Phone, 
  Mail, 
  GraduationCap, 
  ShieldCheck, 
  ShieldAlert,
  UserCheck
} from 'lucide-react';
import { PageView, User } from '../../types';
import { UsersService } from '../../services/users';
import { EnrollmentService } from '../../services/enrollments';
import { useToast } from '../../context/ToastContext';
import { ConfirmModal } from '../../components/ConfirmModal';
import { EmptyState } from '../../components/EmptyState';

interface AdminUsersPageProps {
  onNavigate: (page: PageView) => void;
}

export const AdminUsersPage: React.FC<AdminUsersPageProps> = ({ onNavigate }) => {
  const toast = useToast();
  const [users, setUsers] = useState<User[]>(() => UsersService.getAllUsers());
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'admin'>('all');
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const refreshUsers = () => {
    setUsers(UsersService.getAllUsers());
  };

  useEffect(() => {
    refreshUsers();
    const handleUpdate = () => refreshUsers();
    window.addEventListener('the_sniper_storage_update', handleUpdate);
    return () => window.removeEventListener('the_sniper_storage_update', handleUpdate);
  }, []);

  const filteredUsers = users.filter(u => {
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesSearch = 
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.phoneNumber.includes(searchQuery) ||
      (u.parentPhoneNumber && u.parentPhoneNumber.includes(searchQuery));
    return matchesRole && matchesSearch;
  });

  const handleToggleStatus = (u: User) => {
    const updated = UsersService.toggleUserStatus(u.id);
    if (updated) {
      toast.success(updated.isActive ? 'تم تفعيل حساب الطالب' : 'تم تعطيل حساب الطالب');
      refreshUsers();
    }
  };

  const handleDeleteConfirm = () => {
    if (!userToDelete) return;
    if (userToDelete.role === 'admin' && users.filter(u => u.role === 'admin').length <= 1) {
      toast.error('لا يمكن حذف المسؤول الوحيد للمنصة');
      setUserToDelete(null);
      return;
    }

    const success = UsersService.deleteUser(userToDelete.id);
    if (success) {
      toast.success('تم حذف المستخدم بنجاح');
      refreshUsers();
    } else {
      toast.error('حدث خطأ أثناء حذف المستخدم');
    }
    setUserToDelete(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 pb-16">
      
      {/* Header */}
      <section className="py-8 border-b border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
              <Users className="w-8 h-8 text-amber-500" />
              <span>إدارة الطلاب والمستخدمين</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              متابعة حسابات الطلاب المسجلين، الاشتراكات، وحالة الحسابات
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              إجمالي المستخدمين: <span className="font-latin">{users.length}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="py-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: 'جميع الحسابات' },
              { id: 'student', label: 'الطلاب فقط' },
              { id: 'admin', label: 'المسؤولين' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setRoleFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  roleFilter === tab.id
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
              placeholder="بحث بالاسم، الإيميل، أو رقم الهاتف..."
              className="w-full pl-4 pr-10 py-2.5 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
          </div>

        </div>
      </section>

      {/* Users Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {filteredUsers.length > 0 ? (
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-4">الطالب / المستخدم</th>
                    <th className="p-4">البريد الإلكتروني</th>
                    <th className="p-4">الهاتف / ولي الأمر</th>
                    <th className="p-4">الصف الدراسي</th>
                    <th className="p-4">الكورسات المشترك بها</th>
                    <th className="p-4">الحالة</th>
                    <th className="p-4 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredUsers.map(u => {
                    const enrolledCount = EnrollmentService.getStudentEnrollments(u.id).length;

                    return (
                      <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                        {/* Name & Role */}
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold font-latin">
                              {u.fullName.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white">
                                {u.fullName}
                              </p>
                              <span className="text-[10px] text-slate-400">
                                {u.role === 'admin' ? 'مدير المنصة' : 'طالب'}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="p-4 font-latin text-slate-600 dark:text-slate-300">
                          {u.email}
                        </td>

                        {/* Phone & Parent Phone */}
                        <td className="p-4 font-latin space-y-0.5">
                          <div className="text-slate-800 dark:text-slate-200 font-medium">
                            {u.phoneNumber}
                          </div>
                          {u.parentPhoneNumber && (
                            <div className="text-[10px] text-slate-400">
                              ولي الأمر: {u.parentPhoneNumber}
                            </div>
                          )}
                        </td>

                        {/* Grade */}
                        <td className="p-4">
                          {u.grade ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              {u.grade === 'third' ? '3 ثانوى' : u.grade === 'second' ? '2 ثانوى' : '1 ثانوى'}
                            </span>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>

                        {/* Enrolled Courses Count */}
                        <td className="p-4 font-latin font-bold text-amber-500">
                          {u.role === 'student' ? `${enrolledCount} كورسات` : 'جميع الكورسات'}
                        </td>

                        {/* Status */}
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            u.isActive
                              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                              : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                          }`}>
                            {u.isActive ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                            <span>{u.isActive ? 'نشط' : 'معطل'}</span>
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleToggleStatus(u)}
                              className={`p-1.5 rounded-lg text-xs font-bold transition-colors ${
                                u.isActive
                                  ? 'text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40'
                                  : 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                              }`}
                              title={u.isActive ? 'تعطيل الحساب' : 'تفعيل الحساب'}
                            >
                              {u.isActive ? 'تعطيل' : 'تفعيل'}
                            </button>

                            <button
                              onClick={() => setUserToDelete(u)}
                              className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                              title="حذف الحساب"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
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
            icon={<Users className="w-8 h-8" />}
            title="لم يتم العثور على أي مستخدمين"
            description="جرب البحث بكلمات مختلفة أو تغيير التبويب."
          />
        )}
      </section>

      {/* Delete User Confirmation */}
      <ConfirmModal
        isOpen={!!userToDelete}
        title="تأكيد حذف الحساب"
        message={`هل أنت متأكد من رغبتك في حذف حساب "${userToDelete?.fullName}" (${userToDelete?.email})؟ سيتم حذف جميع اشتراكاته وبياناته نهائياً.`}
        confirmText="حذف المستخدم"
        isDestructive={true}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setUserToDelete(null)}
      />

    </div>
  );
};
