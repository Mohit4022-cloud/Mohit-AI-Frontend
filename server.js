const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0'; // Listen on all interfaces for production
const port = parseInt(process.env.PORT || '3000', 10);

console.log(`Starting server in ${dev ? 'development' : 'production'} mode`);
console.log(`Port: ${port}, Hostname: ${hostname}`);

// Create Next.js app
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  console.log('Next.js app prepared successfully');
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  // Initialize Socket.io
  const io = new Server(server, {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      credentials: true,
    },
  });

  // Store io instance globally
  global.io = io;

  // Socket.io handlers will be initialized separately
  // Comment out for now to ensure server starts
  // if (!dev) {
  //   const { initializeSocketServer } = require('./.next/server/chunks/socket.js');
  //   initializeSocketServer(server);
  // }

  server.listen(port, hostname, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log(`> Server is listening on port ${port}`);
  });
}).catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});