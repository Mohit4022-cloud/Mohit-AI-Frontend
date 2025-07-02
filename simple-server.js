const http = require('http');
const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <body>
          <h1>Mohit AI Frontend - Deployment Test</h1>
          <p>Server is running on port ${port}</p>
          <p>Environment: ${process.env.NODE_ENV || 'development'}</p>
          <p>Node version: ${process.version}</p>
          <p>Time: ${new Date().toISOString()}</p>
          <hr>
          <p>Next step: Deploy the actual Next.js application</p>
        </body>
      </html>
    `);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Simple test server running on http://0.0.0.0:${port}`);
});