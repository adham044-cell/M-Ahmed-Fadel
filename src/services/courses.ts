import { Course, GradeLevel } from '../types';
import { StorageService } from './storage';
import { LogsService } from './logs';

export class CoursesService {
  private static getStorageKey() {
    return StorageService.getKeys().COURSES;
  }

  static getCourses(): Course[] {
    return StorageService.get<Course[]>(this.getStorageKey(), []);
  }

  static getCourseById(id: string): Course | undefined {
    const courses = this.getCourses();
    return courses.find(c => c.id === id);
  }

  static getCoursesByGrade(grade?: GradeLevel): Course[] {
    const courses = this.getCourses();
    if (!grade) return courses;
    return courses.filter(c => c.grade === grade);
  }

  static createCourse(data: {
    title: string;
    description: string;
    image: string;
    price: number;
    grade: GradeLevel;
    isPopular?: boolean;
  }, adminName: string = 'M/Ahmed Fadel'): Course {
    const gradeLabels: Record<GradeLevel, string> = {
      first: 'الصف الأول الثانوي',
      second: 'الصف الثاني الثانوي',
      third: 'الصف الثالث الثانوي',
    };

    const newCourse: Course = {
      id: 'course-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      title: data.title.trim(),
      description: data.description.trim(),
      image: data.image || '/src/assets/images/course_grammar_1787793063861.jpg',
      price: Number(data.price) || 0,
      grade: data.grade,
      gradeLabel: gradeLabels[data.grade] || 'المرحلة الثانوية',
      isPopular: !!data.isPopular,
      createdAt: new Date().toISOString(),
    };

    const courses = this.getCourses();
    courses.unshift(newCourse);
    StorageService.set(this.getStorageKey(), courses);

    // Record activity log
    LogsService.createLog(
      'ADD_COURSE',
      'إضافة كورس جديد',
      `تم إنشاء كورس جديد بعنوان: "${newCourse.title}" لـ (${newCourse.gradeLabel}) بسعر ${newCourse.price} ج.م`,
      'admin-1',
      adminName,
      'admin'
    );

    return newCourse;
  }

  static updateCourse(id: string, updates: Partial<Omit<Course, 'id' | 'createdAt'>>, adminName: string = 'M/Ahmed Fadel'): Course | null {
    const courses = this.getCourses();
    const index = courses.findIndex(c => c.id === id);
    if (index === -1) return null;

    const existing = courses[index];
    const updated: Course = {
      ...existing,
      ...updates,
    };

    courses[index] = updated;
    StorageService.set(this.getStorageKey(), courses);

    // Record activity log
    LogsService.createLog(
      'EDIT_COURSE',
      'تعديل بيانات كورس',
      `تم تحديث بيانات الكورس: "${updated.title}"`,
      'admin-1',
      adminName,
      'admin'
    );

    return updated;
  }

  static deleteCourse(id: string, adminName: string = 'M/Ahmed Fadel'): boolean {
    const courses = this.getCourses();
    const courseToDelete = courses.find(c => c.id === id);
    if (!courseToDelete) return false;

    const filtered = courses.filter(c => c.id !== id);
    StorageService.set(this.getStorageKey(), filtered);

    // Cascade delete course content
    const contentKey = StorageService.getKeys().COURSE_CONTENT;
    const contents = StorageService.get<any[]>(contentKey, []);
    const remainingContents = contents.filter(item => item.courseId !== id);
    StorageService.set(contentKey, remainingContents);

    // Cascade delete enrollments for this course
    const enrollmentsKey = StorageService.getKeys().ENROLLMENTS;
    const enrollments = StorageService.get<any[]>(enrollmentsKey, []);
    const remainingEnrollments = enrollments.filter(e => e.courseId !== id);
    StorageService.set(enrollmentsKey, remainingEnrollments);

    // Record activity log
    LogsService.createLog(
      'DELETE_COURSE',
      'حذف كورس',
      `تم حذف الكورس: "${courseToDelete.title}" ومحتوياته واشتراكاته المرتبطة`,
      'admin-1',
      adminName,
      'admin'
    );

    return true;
  }
}
