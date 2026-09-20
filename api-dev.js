import http from 'http';
import handler from './api/visits.js';

const server = http.createServer(async (req, res) => {
  res.status = (statusCode) => {
    res.statusCode = statusCode;
    return res;
  };

  res.json = (data) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
    return res;
  };

  const url = req.url || '';
  if (url === '/api/visits' || url.startsWith('/api/visits?')) {
    try {
      await handler(req, res);
    } catch (error) {
      console.error('[API Dev Server] Handler error:', error);
      if (!res.writableEnded) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`API dev server running on http://localhost:${PORT}`);
});
