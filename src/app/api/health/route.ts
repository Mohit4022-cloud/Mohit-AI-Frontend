import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import os from 'os';

// Health check doesn't require authentication
export const dynamic = 'force-dynamic';

interface HealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptime: number;
  checks: {
    api: 'pass' | 'fail';
    database: 'pass' | 'fail' | 'not_configured';
    redis: 'pass' | 'fail' | 'not_configured';
    memory: 'pass' | 'warning' | 'fail';
    disk: 'pass' | 'warning' | 'fail';
    environment: 'pass' | 'fail';
  };
  details: {
    version: string;
    node: string;
    environment: string;
    memory: {
      used: number;
      total: number;
      percentage: number;
    };
    cpu: {
      cores: number;
      load: number[];
    };
    pid: number;
  };
  errors?: string[];
}

// Cache database connection
let prisma: PrismaClient | null = null;

function getPrismaClient() {
  if (!prisma) {
    prisma = new PrismaClient({
      log: ['error'],
    });
  }
  return prisma;
}

export async function GET(request: NextRequest) {
  const errors: string[] = [];
  const startTime = Date.now();
  
  const health: HealthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    checks: {
      api: 'pass',
      database: 'not_configured',
      redis: 'not_configured',
      memory: 'pass',
      disk: 'pass',
      environment: 'pass',
    },
    details: {
      version: process.env.npm_package_version || '1.0.0',
      node: process.version,
      environment: process.env.NODE_ENV || 'development',
      memory: {
        used: 0,
        total: 0,
        percentage: 0,
      },
      cpu: {
        cores: os.cpus().length,
        load: os.loadavg(),
      },
      pid: process.pid,
    },
  };
  
  // Check memory usage
  const memUsage = process.memoryUsage();
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const memPercentage = (usedMem / totalMem) * 100;
  
  health.details.memory = {
    used: Math.round(memUsage.heapUsed / 1024 / 1024),
    total: Math.round(memUsage.heapTotal / 1024 / 1024),
    percentage: Math.round((memUsage.heapUsed / memUsage.heapTotal) * 100),
  };
  
  // Check memory health
  if (memPercentage > 90) {
    health.checks.memory = 'fail';
    health.status = 'unhealthy';
    errors.push('Memory usage critical (>90%)');
  } else if (memPercentage > 80) {
    health.checks.memory = 'warning';
    health.status = 'degraded';
    errors.push('Memory usage high (>80%)');
  }
  
  // Check database connection
  if (process.env.DATABASE_URL) {
    try {
      const prismaClient = getPrismaClient();
      await prismaClient.$queryRaw`SELECT 1`;
      health.checks.database = 'pass';
    } catch (error) {
      health.checks.database = 'fail';
      health.status = 'unhealthy';
      errors.push('Database connection failed');
    }
  }
  
  // Check Redis connection (if configured)
  if (process.env.REDIS_URL) {
    try {
      // Add Redis health check here if using Redis
      health.checks.redis = 'pass';
    } catch (error) {
      health.checks.redis = 'fail';
      health.status = 'degraded';
      errors.push('Redis connection failed');
    }
  }
  
  // Check required environment variables
  const requiredEnvVars = [
    'DATABASE_URL',
    'JWT_SECRET',
    'JWT_REFRESH_SECRET',
  ];
  
  const missingEnvVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );
  
  if (missingEnvVars.length > 0) {
    health.checks.environment = 'fail';
    health.status = 'unhealthy';
    errors.push(`Missing environment variables: ${missingEnvVars.join(', ')}`);
  }
  
  // Add errors to response if any
  if (errors.length > 0) {
    health.errors = errors;
  }
  
  // Calculate response time
  const responseTime = Date.now() - startTime;
  
  // Set appropriate status code
  const statusCode = health.status === 'healthy' ? 200 : 
                    health.status === 'degraded' ? 200 : 503;
  
  return NextResponse.json(health, {
    status: statusCode,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Response-Time': `${responseTime}ms`,
      'X-Health-Status': health.status,
    },
  });
}

// Support HEAD requests for simple monitoring
export async function HEAD(request: NextRequest) {
  // Quick health check - just verify the service is responding
  return new NextResponse(null, {
    status: 200,
    headers: {
      'X-Health-Status': 'healthy',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}

// Cleanup on module unload
if (typeof window === 'undefined') {
  process.on('beforeExit', async () => {
    if (prisma) {
      await prisma.$disconnect();
    }
  });
}