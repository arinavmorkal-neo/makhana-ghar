/**
 * ══════════════════════════════════════════════════════════════
 *  Input Validation — shared between platforms
 * ══════════════════════════════════════════════════════════════
 */

/**
 * Validate an Indian phone number (10 digits, optionally with +91).
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-().+]/g, '');
  // Indian: 10 digits starting with 6-9
  if (/^[6-9]\d{9}$/.test(cleaned)) return true;
  // With country code: 91 + 10 digits
  if (/^91[6-9]\d{9}$/.test(cleaned)) return true;
  // International: at least 7 digits
  if (/^\d{7,15}$/.test(cleaned)) return true;
  return false;
}

/**
 * Validate an email address.
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Sanitize a string — trim whitespace and escape HTML entities.
 */
export function sanitize(input: string): string {
  return input
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Validate a name — must be 2+ characters, letters and spaces only.
 */
export function isValidName(name: string): boolean {
  const trimmed = name.trim();
  if (trimmed.length < 2 || trimmed.length > 100) return false;
  return /^[\p{L}\p{M}\s'.,-]+$/u.test(trimmed);
}

/**
 * Validate the enquiry form data.
 * Returns an object of field → error message, empty if valid.
 */
export function validateEnquiryForm(data: {
  name: string;
  contact: string;
  email?: string;
  message?: string;
}): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.name || !isValidName(data.name)) {
    errors['name'] = 'Please enter your full name (at least 2 characters)';
  }

  if (!data.contact || !isValidPhone(data.contact)) {
    errors['contact'] = 'Please enter a valid phone number';
  }

  if (data.email && !isValidEmail(data.email)) {
    errors['email'] = 'Please enter a valid email address';
  }

  if (data.message && data.message.length > 1000) {
    errors['message'] = 'Message must be under 1000 characters';
  }

  return errors;
}
