const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = false;
const hostname = '0.0.0.0';
const port = parseInt(process.env.PORT || '8080', 10);

console.log(`Starting Next.js server on port ${port}...`);

const app = next({ 
  dev,
  dir: __dirname,
  conf: {
    distDir: '.next'
  }
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  console.log('Next.js app prepared successfully');
  
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, hostname, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
}).catch((err) => {
  console.error('Failed to start Next.js:', err);
  process.exit(1);
});