import { NextRequest } from 'next/server'
import { z } from 'zod'
import { verifyToken } from '@/lib/jwt'
import { 
  withErrorHandler, 
  AppError, 
  ErrorTypes, 
  createApiResponse,
  simulateDelay 
} from '@/lib/errorHandler'
import { logger } from '@/lib/logger'
import { findUserById, updateUser } from '@/lib/mockData'

// Validation schema
const verifySchema = z.object({
  token: z.string().length(6, 'Token must be 6 digits'),
})

// Mock function to verify TOTP token
function verifyTOTPToken(token: string, secret: string): boolean {
  // In production, use a real TOTP library
  // For mock, accept any 6-digit number
  return /^\d{6}$/.test(token)
}

export const POST = withErrorHandler(async (request: Request) => {
  // Simulate network delay in development
  await simulateDelay(300);
  
  const body = await request.json();
  
  // Validate input
  const validationResult = verifySchema.safeParse(body);
  if (!validationResult.success) {
    throw new AppError(
      'Invalid token format',
      ErrorTypes.VALIDATION_ERROR,
      { 
        errors: validationResult.error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      }
    );
  }

  // Get auth token from Authorization header
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError(
      'Authorization header missing or invalid',
      ErrorTypes.UNAUTHORIZED
    );
  }

  const authToken = authHeader.substring(7);
  const payload = verifyToken(authToken);
  
  if (!payload) {
    throw new AppError(
      'Invalid or expired token',
      ErrorTypes.UNAUTHORIZED
    );
  }

  // Find user
  const user = findUserById(payload.userId);
  if (!user) {
    throw new AppError(
      'User not found',
      ErrorTypes.NOT_FOUND
    );
  }

  const { token } = validationResult.data;

  // Verify the TOTP token
  const isValid = verifyTOTPToken(token, 'MOCK-SECRET-KEY');
  
  if (!isValid) {
    throw new AppError(
      'Invalid verification code',
      ErrorTypes.VALIDATION_ERROR,
      { field: 'token' }
    );
  }

  // Enable 2FA for the user
  updateUser(user.id, { twoFactorEnabled: true });
  
  logger.info(`[Auth] 2FA enabled for user: ${user.email}`);

  return createApiResponse(
    { 
      success: true,
      twoFactorEnabled: true 
    },
    '2FA has been successfully enabled',
    { 
      userId: user.id,
      method: 'totp' 
    }
  );
});