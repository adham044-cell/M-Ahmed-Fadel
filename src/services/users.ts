import { User } from '../types';
import { StorageService } from './storage';
import { LogsService } from './logs';

export class UsersService {
  private static getStorageKey() {
    return StorageService.getKeys().USERS;
  }

  static getUsers(): User[] {
    const raw = StorageService.get<User[]>(this.getStorageKey(), []);
    return raw.map(u => ({
      ...u,
      phoneNumber: u.phoneNumber || u.phone,
      phone: u.phone || u.phoneNumber || '',
      parentPhoneNumber: u.parentPhoneNumber || u.parentPhone,
      parentPhone: u.parentPhone || u.parentPhoneNumber || '',
      isActive: u.isActive !== undefined ? u.isActive : u.status === 'active',
      status: u.status || (u.isActive ? 'active' : 'inactive'),
    }));
  }

  static getAllUsers(): User[] {
    return this.getUsers();
  }

  static getUserById(id: string): User | undefined {
    return this.getUsers().find(u => u.id === id);
  }

  static getUserByEmail(email: string): User | undefined {
    const cleanEmail = email.trim().toLowerCase();
    return this.getUsers().find(u => u.email.toLowerCase() === cleanEmail);
  }

  static createUser(userData: Partial<User> & { fullName: string; email: string }): User {
    const phone = userData.phone || userData.phoneNumber || '';
    const parentPhone = userData.parentPhone || userData.parentPhoneNumber || '';
    const isActive = userData.isActive !== undefined ? userData.isActive : true;

    const newUser: User = {
      id: 'user-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      fullName: userData.fullName,
      phone,
      phoneNumber: phone,
      parentPhone,
      parentPhoneNumber: parentPhone,
      email: userData.email.toLowerCase(),
      password: userData.password,
      grade: userData.grade || 'third',
      role: userData.role || 'student',
      status: isActive ? 'active' : 'inactive',
      isActive,
      createdAt: new Date().toISOString(),
    };

    const users = this.getUsers();
    users.unshift(newUser);
    StorageService.set(this.getStorageKey(), users);

    return newUser;
  }

  static updateUser(id: string, updates: Partial<User>, performerName: string = 'الإدارة'): User | null {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;

    const existing = users[index];
    const phone = updates.phone || updates.phoneNumber || existing.phone;
    const parentPhone = updates.parentPhone || updates.parentPhoneNumber || existing.parentPhone;
    const isActive = updates.isActive !== undefined ? updates.isActive : (updates.status ? updates.status === 'active' : existing.isActive);

    const updated: User = {
      ...existing,
      ...updates,
      phone,
      phoneNumber: phone,
      parentPhone,
      parentPhoneNumber: parentPhone,
      isActive,
      status: isActive ? 'active' : 'inactive',
    };

    users[index] = updated;
    StorageService.set(this.getStorageKey(), users);

    LogsService.createLog(
      'EDIT_USER',
      'تعديل بيانات مستخدم',
      `تم تحديث بيانات المستخدم: "${updated.fullName}" (${updated.email})`,
      id,
      performerName,
      'admin'
    );

    return updated;
  }

  static toggleUserStatus(id: string, adminName: string = 'M/Ahmed Fadel'): User | null {
    const user = this.getUserById(id);
    if (!user) return null;

    const newActive = !user.isActive;
    const updated = this.updateUser(id, { isActive: newActive, status: newActive ? 'active' : 'inactive' }, adminName);

    if (updated) {
      const statusText = newActive ? 'تنشيط' : 'تعطيل';
      LogsService.createLog(
        'TOGGLE_USER_STATUS',
        'تغيير حالة الحساب',
        `تم ${statusText} حساب المستخدم "${user.fullName}" (${user.email})`,
        'admin-1',
        adminName,
        'admin'
      );
    }

    return updated;
  }

  static deleteUser(id: string, adminName: string = 'M/Ahmed Fadel'): boolean {
    const users = this.getUsers();
    const userToDelete = users.find(u => u.id === id);
    if (!userToDelete) return false;

    // Prevent deleting main admin account
    if (userToDelete.role === 'admin' && (userToDelete.email === 'admin808@thesniper.com' || userToDelete.email === 'admin@thesniper.com')) {
      return false;
    }

    const filtered = users.filter(u => u.id !== id);
    StorageService.set(this.getStorageKey(), filtered);

    // Cascade delete enrollments
    const enrollmentsKey = StorageService.getKeys().ENROLLMENTS;
    const enrollments = StorageService.get<any[]>(enrollmentsKey, []);
    const remainingEnrollments = enrollments.filter(e => e.userId !== id);
    StorageService.set(enrollmentsKey, remainingEnrollments);

    // Record activity log
    LogsService.createLog(
      'DELETE_USER',
      'حذف مستخدم',
      `تم حذف المستخدم: "${userToDelete.fullName}" (${userToDelete.email}) وسجل اشتراكاته`,
      'admin-1',
      adminName,
      'admin'
    );

    return true;
  }

  static getTotalStudents(): number {
    return this.getUsers().filter(u => u.role === 'student').length;
  }
}
