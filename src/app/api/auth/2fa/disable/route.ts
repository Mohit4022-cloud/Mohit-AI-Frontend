import { NextRequest } from "next/server";
import { z } from "zod";
import { verifyToken } from "@/lib/jwt";
import {
  withErrorHandler,
  AppError,
  ErrorTypes,
  createApiResponse,
  simulateDelay,
} from "@/lib/errorHandler";
import { logger } from "@/lib/logger";
import { findUserById, updateUser, validatePassword } from "@/lib/mockData";

// Validation schema
const disableSchema = z.object({
  token: z.string().length(6, "Token must be 6 digits"),
  password: z.string().optional(), // Alternative to token
});

// Mock function to verify TOTP token
function verifyTOTPToken(token: string, secret: string): boolean {
  // In production, use a real TOTP library
  // For mock, accept any 6-digit number
  return /^\d{6}$/.test(token);
}

export const POST = withErrorHandler(async (request: Request) => {
  // Simulate network delay in development
  await simulateDelay(300);

  const body = await request.json();

  // Validate input
  const validationResult = disableSchema.safeParse(body);
  if (!validationResult.success) {
    throw new AppError("Invalid request data", ErrorTypes.VALIDATION_ERROR, {
      errors: validationResult.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })),
    });
  }

  // Get auth token from Authorization header
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError(
      "Authorization header missing or invalid",
      ErrorTypes.UNAUTHORIZED,
    );
  }

  const authToken = authHeader.substring(7);
  const payload = verifyToken(authToken);

  if (!payload) {
    throw new AppError("Invalid or expired token", ErrorTypes.UNAUTHORIZED);
  }

  // Find user
  const user = findUserById(payload.userId);
  if (!user) {
    throw new AppError("User not found", ErrorTypes.NOT_FOUND);
  }

  // Check if 2FA is enabled
  if (!user.twoFactorEnabled) {
    throw new AppError(
      "2FA is not enabled for this account",
      ErrorTypes.CONFLICT,
      { userId: user.id },
    );
  }

  const { token, password } = validationResult.data;

  // Verify either TOTP token or password
  let isAuthorized = false;

  if (token) {
    isAuthorized = verifyTOTPToken(token, "MOCK-SECRET-KEY");
    if (!isAuthorized) {
      throw new AppError(
        "Invalid verification code",
        ErrorTypes.VALIDATION_ERROR,
        { field: "token" },
      );
    }
  } else if (password) {
    isAuthorized = validatePassword(user.email, password);
    if (!isAuthorized) {
      throw new AppError("Invalid password", ErrorTypes.VALIDATION_ERROR, {
        field: "password",
      });
    }
  } else {
    throw new AppError(
      "Either token or password is required",
      ErrorTypes.VALIDATION_ERROR,
    );
  }

  // Disable 2FA for the user
  updateUser(user.id, { twoFactorEnabled: false });

  logger.info(`[Auth] 2FA disabled for user: ${user.email}`);

  return createApiResponse(
    {
      success: true,
      twoFactorEnabled: false,
    },
    "2FA has been successfully disabled",
    {
      userId: user.id,
      method: token ? "totp" : "password",
    },
  );
});
