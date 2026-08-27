import { CourseContent, ContentType } from '../types';
import { StorageService } from './storage';
import { LogsService } from './logs';
import { CoursesService } from './courses';

export class ContentService {
  private static getStorageKey() {
    return StorageService.getKeys().COURSE_CONTENT;
  }

  static getAllContent(): CourseContent[] {
    return StorageService.get<CourseContent[]>(this.getStorageKey(), []);
  }

  static getAllContents(): CourseContent[] {
    return this.getAllContent();
  }

  static getCourseContents(courseId: string): CourseContent[] {
    const all = this.getAllContent();
    return all.filter(item => item.courseId === courseId);
  }

  static getContentById(id: string): CourseContent | undefined {
    const all = this.getAllContent();
    return all.find(item => item.id === id);
  }

  static addCourseContent(data: {
    courseId: string;
    title: string;
    type: ContentType;
    url: string;
    description?: string;
    duration?: string;
    fileSize?: string;
    pageCount?: number;
  }, adminName: string = 'M/Ahmed Fadel'): CourseContent {
    const newContent: CourseContent = {
      id: 'content-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      courseId: data.courseId,
      title: data.title.trim(),
      type: data.type,
      url: data.url.trim(),
      description: data.description?.trim() || '',
      duration: data.duration || (data.type === 'video' ? '40 دقيقة' : undefined),
      fileSize: data.fileSize || (data.type === 'pdf' ? '2.5 MB' : undefined),
      pageCount: data.pageCount || (data.type === 'pdf' ? 12 : undefined),
      createdAt: new Date().toISOString(),
    };

    const all = this.getAllContent();
    all.push(newContent);
    StorageService.set(this.getStorageKey(), all);

    const course = CoursesService.getCourseById(data.courseId);
    const typeLabel = data.type === 'video' ? 'فيديو' : 'ملف PDF';

    // Record activity log
    LogsService.createLog(
      'ADD_CONTENT',
      'إضافة محتوى لكورس',
      `تمت إضافة ${typeLabel} جديد بعنوان: "${newContent.title}" لكورس "${course?.title || 'كورس'}"`,
      'admin-1',
      adminName,
      'admin'
    );

    return newContent;
  }

  static deleteCourseContent(id: string, adminName: string = 'M/Ahmed Fadel'): boolean {
    const all = this.getAllContent();
    const itemToDelete = all.find(item => item.id === id);
    if (!itemToDelete) return false;

    const filtered = all.filter(item => item.id !== id);
    StorageService.set(this.getStorageKey(), filtered);

    const course = CoursesService.getCourseById(itemToDelete.courseId);
    const typeLabel = itemToDelete.type === 'video' ? 'فيديو' : 'ملف PDF';

    // Record activity log
    LogsService.createLog(
      'DELETE_CONTENT',
      'حذف محتوى تعليمي',
      `تم حذف الـ ${typeLabel}: "${itemToDelete.title}" من كورس "${course?.title || 'كورس'}"`,
      'admin-1',
      adminName,
      'admin'
    );

    return true;
  }

  static deleteContent(id: string, adminName: string = 'M/Ahmed Fadel'): boolean {
    return this.deleteCourseContent(id, adminName);
  }
}
