/**
 * Centralized Storage Layer
 * Designed for easy migration to a real REST API / GraphQL backend in the future.
 */

const STORAGE_KEYS = {
  USERS: 'the_sniper_users',
  COURSES: 'the_sniper_courses',
  COURSE_CONTENT: 'the_sniper_course_content',
  ENROLLMENTS: 'the_sniper_enrollments',
  LOGS: 'the_sniper_logs',
  SESSION: 'the_sniper_session',
  THEME: 'the_sniper_theme',
  INITIALIZED: 'the_sniper_initialized_v2',
} as const;

export class StorageService {
  static get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error reading key ${key} from storage:`, error);
      return defaultValue;
    }
  }

  static set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      // Dispatch custom storage event for in-tab reactive listeners
      window.dispatchEvent(new CustomEvent('the_sniper_storage_update', { detail: { key } }));
    } catch (error) {
      console.error(`Error saving key ${key} to storage:`, error);
    }
  }

  static remove(key: string): void {
    try {
      localStorage.removeItem(key);
      window.dispatchEvent(new CustomEvent('the_sniper_storage_update', { detail: { key } }));
    } catch (error) {
      console.error(`Error removing key ${key} from storage:`, error);
    }
  }

  static clear(): void {
    try {
      localStorage.clear();
      window.dispatchEvent(new CustomEvent('the_sniper_storage_update', { detail: { key: 'all' } }));
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }

  static getKeys() {
    return STORAGE_KEYS;
  }
}
