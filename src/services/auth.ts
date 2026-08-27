import { User, AuthSession, Role } from '../types';
import { StorageService } from './storage';
import { UsersService } from './users';
import { LogsService } from './logs';
import { ValidationService } from './validation';

export class AuthService {
  private static getSessionKey() {
    return StorageService.getKeys().SESSION;
  }

  static getSession(): AuthSession | null {
    return StorageService.get<AuthSession | null>(this.getSessionKey(), null);
  }

  static getCurrentUser(): User | null {
    const session = this.getSession();
    if (!session) return null;
    return UsersService.getUserById(session.userId) || null;
  }

  static login(email: string, password: string): { success: boolean; session?: AuthSession; message?: string } {
    const cleanEmail = email.trim().toLowerCase();

    // Check against stored users
    const user = UsersService.getUserByEmail(cleanEmail);

    if (!user || user.password !== password) {
      return {
        success: false,
        message: 'يوجد خطأ في البيانات المدخلة',
      };
    }

    if (user.status === 'inactive') {
      return {
        success: false,
        message: 'هذا الحساب معطل حالياً، يرجى التواصل مع الإدارة',
      };
    }

    const session: AuthSession = {
      userId: user.id,
      role: user.role,
      email: user.email,
      fullName: user.fullName,
      loginAt: new Date().toISOString(),
    };

    StorageService.set(this.getSessionKey(), session);

    if (user.role === 'admin') {
      LogsService.createLog(
        'ADMIN_LOGIN',
        'تسجيل دخول الإدارة',
        `قام المسؤول "${user.fullName}" بتسجيل الدخول إلى لوحة التحكم`,
        user.id,
        user.fullName,
        'admin'
      );
    }

    return {
      success: true,
      session,
    };
  }

  static register(data: {
    fullName: string;
    phone: string;
    parentPhone: string;
    email: string;
    password: string;
    confirmPassword?: string;
  }): { success: boolean; session?: AuthSession; errors?: Record<string, string>; message?: string } {
    const errors: Record<string, string> = {};

    // 1. Name validation (4-part)
    const nameCheck = ValidationService.validateFourPartName(data.fullName);
    if (!nameCheck.isValid) {
      errors.fullName = nameCheck.error!;
    }

    // 2. Student Phone (11 digits)
    const phoneCheck = ValidationService.validatePhoneNumber(data.phone, 'student');
    if (!phoneCheck.isValid) {
      errors.phone = phoneCheck.error!;
    }

    // 3. Parent Phone (11 digits)
    const parentPhoneCheck = ValidationService.validatePhoneNumber(data.parentPhone, 'parent');
    if (!parentPhoneCheck.isValid) {
      errors.parentPhone = parentPhoneCheck.error!;
    }

    // 4. Email validation
    const emailCheck = ValidationService.validateEmail(data.email);
    if (!emailCheck.isValid) {
      errors.email = emailCheck.error!;
    } else {
      // Check if email already registered
      const existing = UsersService.getUserByEmail(data.email);
      if (existing) {
        errors.email = 'هذا البريد الإلكتروني مسجل بالفعل';
      }
    }

    // 5. Password validation
    const passwordCheck = ValidationService.validatePassword(data.password);
    if (!passwordCheck.isValid) {
      errors.password = passwordCheck.error!;
    }

    // 6. Confirm password
    if (data.confirmPassword !== undefined) {
      const matchCheck = ValidationService.validatePasswordMatch(data.password, data.confirmPassword);
      if (!matchCheck.isValid) {
        errors.confirmPassword = matchCheck.error!;
      }
    }

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    // Create student user
    const newUser = UsersService.createUser({
      fullName: data.fullName.trim(),
      phone: data.phone.trim(),
      parentPhone: data.parentPhone.trim(),
      email: data.email.trim().toLowerCase(),
      password: data.password,
      role: 'student',
      status: 'active',
    });

    // Auto-create session
    const session: AuthSession = {
      userId: newUser.id,
      role: 'student',
      email: newUser.email,
      fullName: newUser.fullName,
      loginAt: new Date().toISOString(),
    };

    StorageService.set(this.getSessionKey(), session);

    // Record activity log
    LogsService.createLog(
      'STUDENT_REGISTRATION',
      'تسجيل طالب جديد',
      `سجل الطالب "${newUser.fullName}" حساباً جديداً بالبريد "${newUser.email}"`,
      newUser.id,
      newUser.fullName,
      'student'
    );

    return {
      success: true,
      session,
      message: 'تم إنشاء الحساب بنجاح',
    };
  }

  static logout(): void {
    StorageService.remove(this.getSessionKey());
  }

  static changePassword(userId: string, oldPass: string, newPass: string): { success: boolean; message: string } {
    const user = UsersService.getUserById(userId);
    if (!user) {
      return { success: false, message: 'المستخدم غير موجود' };
    }

    if (user.password !== oldPass) {
      return { success: false, message: 'كلمة المرور الحالية غير صحيحة' };
    }

    const check = ValidationService.validatePassword(newPass);
    if (!check.isValid) {
      return { success: false, message: check.error! };
    }

    UsersService.updateUser(userId, { password: newPass }, user.fullName);
    return { success: true, message: 'تم تغيير كلمة المرور بنجاح' };
  }
}
