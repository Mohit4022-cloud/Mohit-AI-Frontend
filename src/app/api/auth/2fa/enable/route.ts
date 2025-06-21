import { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/jwt'
import { 
  withErrorHandler, 
  AppError, 
  ErrorTypes, 
  createApiResponse,
  simulateDelay 
} from '@/lib/errorHandler'
import { logger } from '@/lib/logger'
import { findUserById } from '@/lib/mockData'

// Mock function to generate QR code
function generateMockQRCode(email: string): string {
  return `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==`
}

// Mock function to generate backup codes
function generateBackupCodes(): string[] {
  const codes: string[] = []
  for (let i = 0; i < 8; i++) {
    codes.push(Math.random().toString(36).substring(2, 10).toUpperCase())
  }
  return codes
}

export const POST = withErrorHandler(async (request: Request) => {
  // Simulate network delay in development
  await simulateDelay(500);
  
  // Get token from Authorization header
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError(
      'Authorization header missing or invalid',
      ErrorTypes.UNAUTHORIZED
    );
  }

  const token = authHeader.substring(7);
  const payload = verifyToken(token);
  
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

  // Check if 2FA is already enabled
  if (user.twoFactorEnabled) {
    throw new AppError(
      '2FA is already enabled for this account',
      ErrorTypes.CONFLICT,
      { userId: user.id }
    );
  }

  // Generate QR code and backup codes
  const qrCode = generateMockQRCode(user.email);
  const backupCodes = generateBackupCodes();

  // In a real app, we would:
  // 1. Generate a real TOTP secret
  // 2. Save the secret and backup codes to the database
  // 3. Generate a real QR code
  
  logger.info(`[Auth] 2FA enable requested for user: ${user.email}`);

  return createApiResponse(
    {
      qrCode,
      backupCodes,
      secret: 'MOCK-SECRET-KEY', // In production, this would be a real TOTP secret
    },
    '2FA setup initiated. Please scan the QR code with your authenticator app.',
    { 
      userId: user.id,
      backupCodeCount: backupCodes.length 
    }
  );
});