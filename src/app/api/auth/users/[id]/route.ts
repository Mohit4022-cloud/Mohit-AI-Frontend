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
import { findUserById, updateUser } from "@/lib/mockData";

// Validation schema for user update
const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  avatar: z.string().url().optional(),
  role: z.enum(["admin", "manager", "sdr", "member"]).optional(),
  isActive: z.boolean().optional(),
});

export const GET = withErrorHandler(
  async (request: Request, { params }: { params: { id: string } }) => {
    // Simulate network delay in development
    await simulateDelay(200);

    // Get token from Authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(
        "Authorization header missing or invalid",
        ErrorTypes.UNAUTHORIZED,
      );
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);

    if (!payload) {
      throw new AppError("Invalid or expired token", ErrorTypes.UNAUTHORIZED);
    }

    const userId = params.id;

    // Check if user is accessing their own profile or is an admin
    if (payload.userId !== userId && payload.role !== "admin") {
      throw new AppError("Insufficient permissions", ErrorTypes.FORBIDDEN);
    }

    // Find user
    const user = findUserById(userId);
    if (!user) {
      throw new AppError("User not found", ErrorTypes.NOT_FOUND, { userId });
    }

    logger.info(`[Auth] User profile fetched: ${user.email}`);

    return createApiResponse(user, "User profile fetched successfully");
  },
);

export const PUT = withErrorHandler(
  async (request: Request, { params }: { params: { id: string } }) => {
    // Simulate network delay in development
    await simulateDelay(300);

    const body = await request.json();

    // Validate input
    const validationResult = updateUserSchema.safeParse(body);
    if (!validationResult.success) {
      throw new AppError("Validation failed", ErrorTypes.VALIDATION_ERROR, {
        errors: validationResult.error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    // Get token from Authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(
        "Authorization header missing or invalid",
        ErrorTypes.UNAUTHORIZED,
      );
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);

    if (!payload) {
      throw new AppError("Invalid or expired token", ErrorTypes.UNAUTHORIZED);
    }

    const userId = params.id;

    // Check if user is updating their own profile or is an admin
    if (payload.userId !== userId && payload.role !== "admin") {
      throw new AppError("Insufficient permissions", ErrorTypes.FORBIDDEN);
    }

    // Find user
    const user = findUserById(userId);
    if (!user) {
      throw new AppError("User not found", ErrorTypes.NOT_FOUND, { userId });
    }

    const updateData = validationResult.data;

    // Only admins can change roles
    if (updateData.role && payload.role !== "admin") {
      throw new AppError(
        "Only admins can change user roles",
        ErrorTypes.FORBIDDEN,
      );
    }

    // Update user
    const updatedUser = updateUser(userId, {
      ...updateData,
      updatedAt: new Date(),
    });

    logger.info(`[Auth] User profile updated: ${updatedUser.email}`, {
      updatedFields: Object.keys(updateData),
    });

    return createApiResponse(updatedUser, "User profile updated successfully", {
      updatedFields: Object.keys(updateData).length,
    });
  },
);

export const DELETE = withErrorHandler(
  async (request: Request, { params }: { params: { id: string } }) => {
    // Simulate network delay in development
    await simulateDelay(300);

    // Get token from Authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(
        "Authorization header missing or invalid",
        ErrorTypes.UNAUTHORIZED,
      );
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);

    if (!payload) {
      throw new AppError("Invalid or expired token", ErrorTypes.UNAUTHORIZED);
    }

    const userId = params.id;

    // Only admins can delete users (or users can delete their own account)
    if (payload.userId !== userId && payload.role !== "admin") {
      throw new AppError("Insufficient permissions", ErrorTypes.FORBIDDEN);
    }

    // Find user
    const user = findUserById(userId);
    if (!user) {
      throw new AppError("User not found", ErrorTypes.NOT_FOUND, { userId });
    }

    // In a real app, we would delete the user from the database
    // For now, we'll just deactivate them
    updateUser(userId, {
      isActive: false,
      updatedAt: new Date(),
    });

    logger.info(`[Auth] User account deactivated: ${user.email}`);

    return createApiResponse(
      { success: true },
      "User account has been deactivated",
      {
        userId,
        email: user.email,
      },
    );
  },
);
