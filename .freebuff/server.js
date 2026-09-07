const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 55438;
const ROOT = path.resolve(__dirname, '..');

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const srv = http.createServer((req, res) => {
  let fp = path.join(ROOT, req.url === '/' ? '/index.html' : decodeURIComponent(req.url.split('?')[0]));
  const ext = path.extname(fp);
  fs.readFile(fp, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

srv.listen(PORT, () => {
  console.log('Server running on http://127.0.0.1:' + PORT);
});
