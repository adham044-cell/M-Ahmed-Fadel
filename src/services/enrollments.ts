import { Enrollment, Course } from '../types';
import { StorageService } from './storage';
import { CoursesService } from './courses';
import { LogsService } from './logs';

export class EnrollmentService {
  private static getStorageKey() {
    return StorageService.getKeys().ENROLLMENTS;
  }

  static getEnrollments(): Enrollment[] {
    return StorageService.get<Enrollment[]>(this.getStorageKey(), []);
  }

  static getAllEnrollments(): Enrollment[] {
    return this.getEnrollments();
  }

  static isEnrolled(userId: string, courseId: string): boolean {
    if (!userId || !courseId) return false;
    const enrollments = this.getEnrollments();
    return enrollments.some(e => e.userId === userId && e.courseId === courseId);
  }

  static getStudentEnrollments(userId: string): Enrollment[] {
    const enrollments = this.getEnrollments();
    return enrollments.filter(e => e.userId === userId);
  }

  static getStudentEnrolledCourses(userId: string): Course[] {
    const enrollments = this.getStudentEnrollments(userId);
    const enrolledCourseIds = new Set(enrollments.map(e => e.courseId));
    const allCourses = CoursesService.getCourses();
    return allCourses.filter(course => enrolledCourseIds.has(course.id));
  }

  static enroll(userId: string, courseId: string, studentName: string = 'طالب'): { success: boolean; message: string } {
    if (!userId) {
      return { success: false, message: 'يرجى تسجيل الدخول أولاً للاشتراك في الكورس' };
    }

    if (this.isEnrolled(userId, courseId)) {
      return { success: true, message: 'أنت مشترك بالفعل في هذا الكورس' };
    }

    const course = CoursesService.getCourseById(courseId);
    if (!course) {
      return { success: false, message: 'الكورس غير موجود' };
    }

    const newEnrollment: Enrollment = {
      id: 'enr-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      userId,
      courseId,
      enrolledAt: new Date().toISOString(),
    };

    const enrollments = this.getEnrollments();
    enrollments.push(newEnrollment);
    StorageService.set(this.getStorageKey(), enrollments);

    // Record activity log
    LogsService.createLog(
      'STUDENT_ENROLLMENT',
      'اشتراك طالب في كورس',
      `قام الطالب "${studentName}" بالاشتراك في كورس: "${course.title}"`,
      userId,
      studentName,
      'student'
    );

    return { success: true, message: 'تم الاشتراك في الكورس بنجاح' };
  }

  static unenroll(userId: string, courseId: string): boolean {
    const enrollments = this.getEnrollments();
    const filtered = enrollments.filter(e => !(e.userId === userId && e.courseId === courseId));
    StorageService.set(this.getStorageKey(), filtered);
    return true;
  }

  static getTotalEnrollments(): number {
    return this.getEnrollments().length;
  }

  static getCourseEnrollmentCount(courseId: string): number {
    const enrollments = this.getEnrollments();
    return enrollments.filter(e => e.courseId === courseId).length;
  }
}
