// Auth helpers that work in both Edge and Node.js environments
import { NextRequest } from 'next/server';

// Re-export the Edge-compatible authenticateRequest for API routes
export { authenticateRequest, AuthError } from './auth-edge';
export { getUserFromRequest } from '@/middleware/auth';

// Helper function to verify user permissions
export async function verifyUserPermission(
  userId: string,
  resource: string,
  action: string
): Promise<boolean> {
  // In a real implementation, this would check against a permissions database
  // For now, we'll return true for all authenticated users
  return true;
}

// Helper to extract bearer token from request
export function extractBearerToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}