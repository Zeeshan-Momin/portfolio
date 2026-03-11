import fs from 'fs';
import path from 'path';

// For local development, store in /tmp; for Vercel, use /tmp
const dataDir = '/tmp';
const dataFile = path.join(dataDir, 'visitors.json');

// Ensure directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize visitors file if it doesn't exist
function initializeVisitorsFile() {
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify({ uniqueIPs: new Set() }));
  }
}

// Get visitor IP from request headers
function getClientIP(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown';
}

// Read unique IPs from file
function readVisitors() {
  try {
    const data = fs.readFileSync(dataFile, 'utf-8');
    const parsed = JSON.parse(data);
    return new Set(parsed.uniqueIPs || []);
  } catch {
    return new Set();
  }
}

// Write unique IPs to file
function writeVisitors(ips) {
  fs.writeFileSync(dataFile, JSON.stringify({ uniqueIPs: Array.from(ips) }));
}

export default function handler(req, res) {
  // Enable CORS
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
    initializeVisitorsFile();
    const clientIP = getClientIP(req);
    const visitors = readVisitors();

    // Add current IP to set (Set automatically prevents duplicates)
    visitors.add(clientIP);

    // Write updated visitors back to file
    writeVisitors(visitors);

    // Return unique visitor count
    res.status(200).json({
      value: visitors.size,
      ip: clientIP,
    });
  } catch (error) {
    console.error('Error tracking visitors:', error);
    res.status(500).json({ error: 'Failed to track visitors', value: 0 });
  }
}
