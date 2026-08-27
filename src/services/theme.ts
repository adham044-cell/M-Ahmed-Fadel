import { ThemeMode } from '../types';
import { StorageService } from './storage';

export class ThemeService {
  private static getStorageKey() {
    return StorageService.getKeys().THEME;
  }

  static getTheme(): ThemeMode {
    const saved = StorageService.get<ThemeMode | null>(this.getStorageKey(), null);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    // Default to dark or light (let's default to light with sleek contrast)
    return 'light';
  }

  static setTheme(theme: ThemeMode): void {
    StorageService.set(this.getStorageKey(), theme);
    this.applyTheme(theme);
  }

  static toggleTheme(): ThemeMode {
    const current = this.getTheme();
    const next: ThemeMode = current === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
    return next;
  }

  static applyTheme(theme?: ThemeMode): void {
    const current = theme || this.getTheme();
    const root = document.documentElement;
    if (current === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }
}
