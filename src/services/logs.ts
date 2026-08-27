import { ActivityLog, ActionType, Role } from '../types';
import { StorageService } from './storage';

export class LogsService {
  private static getStorageKey() {
    return StorageService.getKeys().LOGS;
  }

  static getLogs(): ActivityLog[] {
    const raw = StorageService.get<ActivityLog[]>(this.getStorageKey(), []);
    return raw
      .map(log => ({
        ...log,
        details: log.details || log.description || log.actionTitle || '',
        timestamp: log.timestamp || log.createdAt,
      }))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  static getAllLogs(): ActivityLog[] {
    return this.getLogs();
  }

  static getRecentLogs(limit: number = 5): ActivityLog[] {
    return this.getLogs().slice(0, limit);
  }

  static createLog(
    action: ActionType,
    actionTitle: string,
    description: string,
    userId: string = 'admin-1',
    userName: string = 'M/Ahmed Fadel (الإدارة)',
    userRole: Role = 'admin'
  ): ActivityLog {
    const newLog: ActivityLog = {
      id: 'log-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      action,
      actionTitle,
      description,
      details: description,
      userId,
      userName,
      userRole,
      timestamp: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    const logs = StorageService.get<ActivityLog[]>(this.getStorageKey(), []);
    logs.unshift(newLog);
    StorageService.set(this.getStorageKey(), logs);

    return newLog;
  }

  static clearLogs(): void {
    StorageService.set(this.getStorageKey(), []);
  }

  static getActionBadge(action: ActionType): { text: string; color: string; bg: string } {
    switch (action) {
      case 'ADD_COURSE':
        return { text: 'إضافة كورس', color: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-100 dark:bg-emerald-950/60' };
      case 'EDIT_COURSE':
        return { text: 'تعديل كورس', color: 'text-blue-700 dark:text-blue-300', bg: 'bg-blue-100 dark:bg-blue-950/60' };
      case 'DELETE_COURSE':
        return { text: 'حذف كورس', color: 'text-rose-700 dark:text-rose-300', bg: 'bg-rose-100 dark:bg-rose-950/60' };
      case 'ADD_CONTENT':
        return { text: 'إضافة محتوى', color: 'text-indigo-700 dark:text-indigo-300', bg: 'bg-indigo-100 dark:bg-indigo-950/60' };
      case 'DELETE_CONTENT':
        return { text: 'حذف محتوى', color: 'text-orange-700 dark:text-orange-300', bg: 'bg-orange-100 dark:bg-orange-950/60' };
      case 'ADD_USER':
        return { text: 'إضافة مستخدم', color: 'text-teal-700 dark:text-teal-300', bg: 'bg-teal-100 dark:bg-teal-950/60' };
      case 'EDIT_USER':
        return { text: 'تعديل مستخدم', color: 'text-cyan-700 dark:text-cyan-300', bg: 'bg-cyan-100 dark:bg-cyan-950/60' };
      case 'DELETE_USER':
        return { text: 'حذف مستخدم', color: 'text-red-700 dark:text-red-300', bg: 'bg-red-100 dark:bg-red-950/60' };
      case 'TOGGLE_USER_STATUS':
        return { text: 'تغيير حالة الحساب', color: 'text-amber-700 dark:text-amber-300', bg: 'bg-amber-100 dark:bg-amber-950/60' };
      case 'STUDENT_ENROLLMENT':
        return { text: 'اشتراك طالب', color: 'text-purple-700 dark:text-purple-300', bg: 'bg-purple-100 dark:bg-purple-950/60' };
      case 'STUDENT_REGISTRATION':
        return { text: 'تسجيل حساب جديد', color: 'text-sky-700 dark:text-sky-300', bg: 'bg-sky-100 dark:bg-sky-950/60' };
      case 'ADMIN_LOGIN':
        return { text: 'دخول لوحة التحكم', color: 'text-slate-700 dark:text-slate-300', bg: 'bg-slate-200 dark:bg-slate-800' };
      default:
        return { text: 'إجراء إداري', color: 'text-gray-700 dark:text-gray-300', bg: 'bg-gray-100 dark:bg-gray-800' };
    }
  }
}
