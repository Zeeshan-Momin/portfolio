import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.join(__dirname, 'data');
const VISITORS_FILE = path.join(DATA_PATH, 'unique_visitors.json');

function getClientIP(req) {
  return req.headers['x-forwarded-for']?.split(',')[0].trim() || 
         req.socket.remoteAddress || 
         '127.0.0.1';
}

function readLocalData() {
  try {
    if (!fs.existsSync(DATA_PATH)) {
      fs.mkdirSync(DATA_PATH, { recursive: true });
    }
    if (!fs.existsSync(VISITORS_FILE)) {
      fs.writeFileSync(VISITORS_FILE, JSON.stringify({ ips: [], total: 0 }));
    }
    const raw = fs.readFileSync(VISITORS_FILE, 'utf-8');
    const data = JSON.parse(raw || '{}');
    return {
      ips: new Set(Array.isArray(data.ips) ? data.ips : []),
      total: typeof data.total === 'number' ? data.total : 0,
    };
  } catch (error) {
    console.error('Failed to read local visitor data:', error);
    return { ips: new Set(), total: 0 };
  }
}

function writeLocalData(ipsSet, total) {
  try {
    fs.writeFileSync(VISITORS_FILE, JSON.stringify({ ips: Array.from(ipsSet), total }, null, 2));
  } catch (error) {
    console.error('Failed to write local visitor data:', error);
  }
}

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === '/api/visits') {
    try {
      const clientIP = getClientIP(req);
      const data = readLocalData();
      
      data.ips.add(clientIP);
      const totalCount = data.total + 1;
      
      writeLocalData(data.ips, totalCount);

      const response = {
        unique: data.ips.size,
        total: totalCount,
        ip: clientIP,
        backend: 'local-file',
      };

      res.writeHead(200);
      res.end(JSON.stringify(response));
      console.log(`[API] ${clientIP} | Unique: ${response.unique} | Total: ${totalCount}`);
    } catch (error) {
      console.error('Error tracking visitors:', error);
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'Failed to track visitors', value: 0 }));
    }
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`API dev server running on http://localhost:${PORT}`);
});
