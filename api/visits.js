import fs from 'fs';
import path from 'path';

let kv = null;
const kvApiUrl = process.env.KV_REST_API_URL;
const kvApiToken = process.env.KV_REST_API_TOKEN;

if (kvApiUrl && kvApiToken) {
  try {
    const kvModule = await import('@vercel/kv');
    kv = kvModule.kv;
  } catch (err) {
    console.error('Vercel KV import failed:', err);
    kv = null;
  }
} else {
  console.info('Vercel KV is not configured, using local file fallback for visitor counting.');
}

const DATA_PATH = path.join(process.cwd(), 'data');
const VISITORS_FILE = path.join(DATA_PATH, 'unique_visitors.json');

function getClientIP(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    const first = forwarded.split(',')[0].trim();
    if (first) return first;
  }

  const ip = req.headers['x-real-ip'] || req.socket?.remoteAddress;
  if (ip) return ip;

  return 'unknown';
}

function readLocalSet() {
  try {
    if (!fs.existsSync(DATA_PATH)) {
      fs.mkdirSync(DATA_PATH, { recursive: true });
    }
    if (!fs.existsSync(VISITORS_FILE)) {
      fs.writeFileSync(VISITORS_FILE, JSON.stringify({ ips: [] }));
    }
    const raw = fs.readFileSync(VISITORS_FILE, 'utf-8');
    const data = JSON.parse(raw || '{}');
    return new Set(Array.isArray(data.ips) ? data.ips : []);
  } catch (error) {
    console.error('Failed to read local visitors:', error);
    return new Set();
  }
}

function writeLocalSet(set) {
  try {
    fs.writeFileSync(VISITORS_FILE, JSON.stringify({ ips: Array.from(set) }));
  } catch (error) {
    console.error('Failed to write local visitors:', error);
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const clientIP = getClientIP(req);
    const id = clientIP || 'unknown';

    let uniqueCount = 0;

    if (kv) {
      await kv.sadd('unique_visitors', id);
      uniqueCount = await kv.scard('unique_visitors');
    } else {
      const set = readLocalSet();
      set.add(id);
      writeLocalSet(set);
      uniqueCount = set.size;
    }

    res.status(200).json({
      value: uniqueCount,
      ip: id,
      backend: kv ? 'vercel-kv' : 'local-file',
    });
  } catch (error) {
    console.error('Error tracking visitors:', error);
    res.status(500).json({ error: 'Failed to track visitors', value: 0 });
  }
}

