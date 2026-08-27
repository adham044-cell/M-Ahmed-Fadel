/**
 * Arabic Form Validation Service
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  message?: string;
}

export class ValidationService {
  /**
   * Validates a 4-part full name (must contain at least 4 name tokens)
   */
  static validateFourPartName(name: string): ValidationResult {
    if (!name || name.trim() === '') {
      return { isValid: false, error: 'يرجى إدخال الاسم بالكامل', message: 'يرجى إدخال الاسم بالكامل' };
    }

    // Split by whitespace and remove empty strings
    const parts = name.trim().split(/\s+/).filter(part => part.length > 0);

    if (parts.length < 4) {
      return { isValid: false, error: 'يرجى إدخال الاسم رباعي باللغة العربية (4 كلمات على الأقل)', message: 'يرجى إدخال الاسم رباعي باللغة العربية (4 كلمات على الأقل)' };
    }

    return { isValid: true };
  }

  /**
   * Validates Egyptian 11-digit phone number
   */
  static validatePhoneNumber(phone: string, fieldName: 'student' | 'parent' = 'student'): ValidationResult {
    if (!phone || phone.trim() === '') {
      const msg = fieldName === 'student' ? 'يرجى إدخال رقم هاتف الطالب' : 'يرجى إدخال رقم هاتف ولي الأمر';
      return { isValid: false, error: msg, message: msg };
    }

    // Clean any whitespace or dashes
    const cleaned = phone.replace(/[\s-]/g, '');

    // Normalize Arabic numerals to English if entered in Arabic
    const normalized = cleaned.replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d).toString());

    // Must be exactly 11 numeric digits and start with 01
    const phoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;

    if (!phoneRegex.test(normalized)) {
      const msg = fieldName === 'student' 
        ? 'رقم هاتف الطالب يجب أن يتكون من 11 رقماً ويبدأ بـ (010, 011, 012, 015)' 
        : 'رقم هاتف ولي الأمر يجب أن يتكون من 11 رقماً ويبدأ بـ (010, 011, 012, 015)';
      return { isValid: false, error: msg, message: msg };
    }

    return { isValid: true };
  }

  static validateEgyptianPhone(phone: string): ValidationResult {
    return this.validatePhoneNumber(phone, 'student');
  }

  /**
   * Validates email format
   */
  static validateEmail(email: string): ValidationResult {
    if (!email || email.trim() === '') {
      return { isValid: false, error: 'يرجى إدخال البريد الإلكتروني', message: 'يرجى إدخال البريد الإلكتروني' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return { isValid: false, error: 'البريد الإلكتروني غير صالح', message: 'البريد الإلكتروني غير صالح' };
    }

    return { isValid: true };
  }

  /**
   * Validates strong password:
   * - At least 6 characters
   */
  static validatePassword(password: string): ValidationResult {
    if (!password) {
      return { isValid: false, error: 'يرجى إدخال كلمة المرور', message: 'يرجى إدخال كلمة المرور' };
    }

    if (password.length < 6) {
      return { isValid: false, error: 'كلمة المرور يجب أن تحتوي على 6 أحرف أو أرقام على الأقل', message: 'كلمة المرور يجب أن تحتوي على 6 أحرف أو أرقام على الأقل' };
    }

    return { isValid: true };
  }

  /**
   * Validates password confirmation
   */
  static validatePasswordMatch(password: string, confirm: string): ValidationResult {
    if (!confirm) {
      return { isValid: false, error: 'يرجى تأكيد كلمة المرور', message: 'يرجى تأكيد كلمة المرور' };
    }

    if (password !== confirm) {
      return { isValid: false, error: 'كلمة المرور وتأكيد كلمة المرور غير متطابقتين', message: 'كلمة المرور وتأكيد كلمة المرور غير متطابقتين' };
    }

    return { isValid: true };
  }
}
