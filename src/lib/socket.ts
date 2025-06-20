import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { authenticateWebSocket } from '@/middleware/auth';
import { logSecurityEvent } from '@/lib/security';

let io: SocketIOServer | null = null;

export function initializeSocketServer(httpServer: HTTPServer) {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      credentials: true,
    },
    path: '/socket.io/',
  });

  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      const user = await authenticateWebSocket(token);
      
      // Attach user to socket
      socket.data.user = user;
      
      logSecurityEvent({
        ip: socket.handshake.address,
        method: 'WEBSOCKET',
        path: '/socket.io/',
        userAgent: socket.handshake.headers['user-agent'] || 'unknown',
        userId: user.userId,
        action: 'websocket_connected',
        result: 'success',
      });
      
      next();
    } catch (error) {
      logSecurityEvent({
        ip: socket.handshake.address,
        method: 'WEBSOCKET',
        path: '/socket.io/',
        userAgent: socket.handshake.headers['user-agent'] || 'unknown',
        action: 'websocket_auth_failed',
        result: 'failure',
      });
      
      next(new Error('Authentication failed'));
    }
  });

  // Connection handler
  io.on('connection', (socket) => {
    const user = socket.data.user;
    console.log(`User ${user.userId} connected via WebSocket`);

    // Join user-specific room
    socket.join(`user:${user.userId}`);
    
    // Join organization room if applicable
    if (user.organizationId) {
      socket.join(`org:${user.organizationId}`);
    }

    // Handle joining call-specific rooms
    socket.on('call:join', (callId: string) => {
      // Verify user has access to this call
      const call = global.aiCallsDb?.[callId];
      if (call && (call.userId === user.userId || call.organizationId === user.organizationId)) {
        socket.join(`call:${callId}`);
        socket.emit('call:joined', { callId, success: true });
      } else {
        socket.emit('call:joined', { callId, success: false, error: 'Access denied' });
      }
    });

    // Handle leaving call rooms
    socket.on('call:leave', (callId: string) => {
      socket.leave(`call:${callId}`);
      socket.emit('call:left', { callId });
    });

    // Handle real-time transcript subscriptions
    socket.on('transcript:subscribe', (callId: string) => {
      const call = global.aiCallsDb?.[callId];
      if (call && (call.userId === user.userId || call.organizationId === user.organizationId)) {
        socket.join(`transcript:${callId}`);
        
        // Send current transcript
        const transcript = global.transcriptsDb?.[callId] || [];
        socket.emit('transcript:initial', { callId, transcript });
      }
    });

    // Handle AI control commands
    socket.on('ai:pause', async (data: { callId: string; duration?: number }) => {
      const call = global.aiCallsDb?.[data.callId];
      if (call && call.userId === user.userId && io) {
        // Emit to call participants
        io.to(`call:${data.callId}`).emit('ai:paused', {
          callId: data.callId,
          pausedBy: user.userId,
          duration: data.duration,
        });
      }
    });

    socket.on('ai:resume', async (data: { callId: string }) => {
      const call = global.aiCallsDb?.[data.callId];
      if (call && call.userId === user.userId && io) {
        // Emit to call participants
        io.to(`call:${data.callId}`).emit('ai:resumed', {
          callId: data.callId,
          resumedBy: user.userId,
        });
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`User ${user.userId} disconnected from WebSocket`);
      
      logSecurityEvent({
        ip: socket.handshake.address,
        method: 'WEBSOCKET',
        path: '/socket.io/',
        userAgent: socket.handshake.headers['user-agent'] || 'unknown',
        userId: user.userId,
        action: 'websocket_disconnected',
        result: 'success',
      });
    });
  });

  // Store io instance globally for use in API routes
  global.io = io;

  return io;
}

export function getSocketServer(): SocketIOServer | null {
  return io;
}

// Helper functions for emitting events from API routes
export function emitToUser(userId: string, event: string, data: any) {
  if (io) {
    io.to(`user:${userId}`).emit(event, data);
  }
}

export function emitToOrganization(orgId: string, event: string, data: any) {
  if (io) {
    io.to(`org:${orgId}`).emit(event, data);
  }
}

export function emitToCall(callId: string, event: string, data: any) {
  if (io) {
    io.to(`call:${callId}`).emit(event, data);
  }
}

export function broadcastEvent(event: string, data: any) {
  if (io) {
    io.emit(event, data);
  }
}

