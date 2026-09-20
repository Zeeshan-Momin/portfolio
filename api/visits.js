import fs from 'fs';
import path from 'path';
import process from 'process';

let kv = null;
const kvApiUrl = process.env.KV_REST_API_URL;
const kvApiToken = process.env.KV_REST_API_TOKEN;

if (kvApiUrl && kvApiToken) {
  try {
    const kvModule = await import('@vercel/kv');
    kv = kvModule.kv;
  } catch (err) {
    console.error('[API] Vercel KV import failed, falling back to local files:', err);
    kv = null;
  }
}

const DATA_PATH = path.join(process.cwd(), 'data');
const UNIQUE_IPS_FILE = path.join(DATA_PATH, 'unique_ips.txt');
const TOTAL_HITS_FILE = path.join(DATA_PATH, 'total_hits.txt');

// Mutex lock to prevent race conditions during concurrent local file writes
let localLock = Promise.resolve();
function runWithLock(fn) {
  const result = localLock.then(fn, fn);
  localLock = result.catch(() => {});
  return result;
}

function ensureDataFiles() {
  if (!fs.existsSync(DATA_PATH)) {
    fs.mkdirSync(DATA_PATH, { recursive: true });
  }

  if (!fs.existsSync(UNIQUE_IPS_FILE)) {
    fs.writeFileSync(UNIQUE_IPS_FILE, '', 'utf8');
  }

  if (!fs.existsSync(TOTAL_HITS_FILE)) {
    fs.writeFileSync(TOTAL_HITS_FILE, '0', 'utf8');
  }
}

function getClientIP(req) {
  // 1. x-forwarded-for
  const forwarded = req.headers?.['x-forwarded-for'] || req.headers?.['X-Forwarded-For'];
  if (forwarded) {
    const firstIP = String(forwarded).split(',')[0].trim();
    if (firstIP) {
      return firstIP;
    }
  }

  // 2. x-real-ip
  const realIP = req.headers?.['x-real-ip'] || req.headers?.['X-Real-IP'];
  if (realIP) {
    const trimmed = String(realIP).trim();
    if (trimmed) {
      return trimmed;
    }
  }

  // 3. req.socket.remoteAddress
  const socketIP = req.socket?.remoteAddress || req.connection?.remoteAddress;
  if (socketIP) {
    return String(socketIP).trim();
  }

  return 'unknown';
}

function processLocalVisit(ip) {
  ensureDataFiles();

  const content = fs.readFileSync(UNIQUE_IPS_FILE, 'utf8');
  const ips = content
    .split(/\r?\n/)
    .map(entry => entry.trim())
    .filter(Boolean);

  const isNewVisitor = !ips.includes(ip);

  if (isNewVisitor) {
    ips.push(ip);
    fs.appendFileSync(UNIQUE_IPS_FILE, `${ip}\n`, 'utf8');
  }

  const rawTotal = fs.readFileSync(TOTAL_HITS_FILE, 'utf8').trim();
  const currentTotal = Number.parseInt(rawTotal, 10);
  const totalHits = (Number.isFinite(currentTotal) ? currentTotal : 0) + 1;

  fs.writeFileSync(TOTAL_HITS_FILE, String(totalHits), 'utf8');

  const uniqueVisitors = ips.length;

  return {
    unique: uniqueVisitors,
    total: totalHits,
    ip,
    newVisitor: isNewVisitor,
  };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
    });
  }

  try {
    const ip = getClientIP(req);

    let result;

    if (kv) {
      // Vercel KV production handling
      const added = await kv.sadd('unique_visitors', ip);
      const isNewVisitor = added === 1;
      const totalHits = await kv.incr('total_hits');
      const uniqueVisitors = await kv.scard('unique_visitors');

      result = {
        unique: typeof uniqueVisitors === 'number' ? uniqueVisitors : 0,
        total: typeof totalHits === 'number' ? totalHits : 0,
        ip,
        newVisitor: isNewVisitor,
      };
    } else {
      // Local file fallback handling with lock for safety
      result = await runWithLock(() => processLocalVisit(ip));
    }

    console.log(
      `[API] ${result.ip} | ${result.newVisitor ? 'NEW' : 'EXISTING'} | Unique: ${result.unique} | Total: ${result.total}`
    );

    return res.status(200).json(result);
  } catch (error) {
    console.error('[API] Visitor tracking error:', error);
    return res.status(500).json({
      error: 'Failed to track visitors',
      unique: 0,
      total: 0,
    });
  }
}