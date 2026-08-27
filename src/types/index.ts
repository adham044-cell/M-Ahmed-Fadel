export type Role = 'student' | 'admin';

export type ContentType = 'video' | 'pdf';

export type GradeLevel = 'first' | 'second' | 'third';

export interface User {
  id: string;
  fullName: string;
  phone: string;
  phoneNumber?: string;
  parentPhone: string;
  parentPhoneNumber?: string;
  email: string;
  password?: string;
  grade?: GradeLevel;
  role: Role;
  status: 'active' | 'inactive';
  isActive?: boolean;
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  grade: GradeLevel;
  gradeLabel: string;
  isPopular?: boolean;
  createdAt: string;
}

export interface CourseContent {
  id: string;
  courseId: string;
  title: string;
  type: ContentType;
  url: string;
  description?: string;
  duration?: string; // e.g., "45 دقيقة" for video
  fileSize?: string; // e.g., "3.4 MB" for PDF
  pageCount?: number;
  createdAt: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
}

export type ActionType = 
  | 'ADD_COURSE'
  | 'EDIT_COURSE'
  | 'DELETE_COURSE'
  | 'ADD_CONTENT'
  | 'DELETE_CONTENT'
  | 'ADD_USER'
  | 'EDIT_USER'
  | 'DELETE_USER'
  | 'TOGGLE_USER_STATUS'
  | 'STUDENT_ENROLLMENT'
  | 'STUDENT_REGISTRATION'
  | 'ADMIN_LOGIN'
  | string;

export interface ActivityLog {
  id: string;
  action: ActionType;
  actionTitle?: string;
  details?: string;
  description?: string;
  userId: string;
  userName: string;
  userRole?: Role;
  timestamp?: string;
  createdAt: string;
}

export interface AuthSession {
  userId: string;
  role: Role;
  email: string;
  fullName: string;
  loginAt: string;
}

export type ThemeMode = 'light' | 'dark';

export type PageView = 
  | 'home'
  | 'student-home'
  | 'about'
  | 'courses'
  | 'my-courses'
  | 'course-details'
  | 'profile'
  | 'login'
  | 'register'
  | 'admin-dashboard'
  | 'admin-courses'
  | 'admin-users'
  | 'admin-logs';
