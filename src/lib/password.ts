import bcrypt from "bcryptjs";
import { z } from "zod";

// Password validation schema
export const PasswordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(100, "Password must be less than 100 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character",
  );

// Bcrypt configuration
const SALT_ROUNDS = 12;

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  // Validate password strength
  PasswordSchema.parse(password);

  // Generate salt and hash
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Check if a password needs rehashing (e.g., if salt rounds changed)
 */
export function needsRehash(hash: string): boolean {
  try {
    const rounds = bcrypt.getRounds(hash);
    return rounds < SALT_ROUNDS;
  } catch {
    return true;
  }
}

/**
 * Generate a secure random password
 */
export function generateSecurePassword(length: number = 16): string {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const special = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  const all = lowercase + uppercase + numbers + special;

  let password = "";

  // Ensure at least one character from each category
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];

  // Fill the rest randomly
  for (let i = password.length; i < length; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }

  // Shuffle the password
  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

/**
 * Check password strength
 */
export function getPasswordStrength(password: string): {
  score: number;
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 0;

  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;

  // Character variety
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  // Common patterns to avoid
  if (/(.)\1{2,}/.test(password)) {
    feedback.push("Avoid repeating characters");
    score -= 1;
  }

  if (/^[0-9]+$/.test(password)) {
    feedback.push("Don't use only numbers");
    score -= 2;
  }

  if (/^[a-zA-Z]+$/.test(password)) {
    feedback.push("Include numbers and special characters");
    score -= 1;
  }

  // Common passwords check (simplified)
  const commonPasswords = ["password", "12345678", "qwerty", "abc123"];
  if (
    commonPasswords.some((common) => password.toLowerCase().includes(common))
  ) {
    feedback.push("Avoid common passwords");
    score = 0;
  }

  // Provide feedback based on score
  if (score < 3) feedback.push("Very weak password");
  else if (score < 5) feedback.push("Weak password");
  else if (score < 7) feedback.push("Moderate password");
  else feedback.push("Strong password");

  return {
    score: Math.max(0, Math.min(10, score)),
    feedback,
  };
}
