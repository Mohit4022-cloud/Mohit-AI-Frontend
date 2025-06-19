// Shared validation schemas
import { z } from 'zod';

// Email validation
export const EmailSchema = z.string().email().max(255);

// Password validation
export const PasswordSchema = z.string().min(8).max(128).regex(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
);

// Username validation
export const UsernameSchema = z.string().min(3).max(30).regex(/^[a-zA-Z0-9_-]+$/);

// Phone validation
export const PhoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/);

// URL validation
export const URLSchema = z.string().url().max(2048);