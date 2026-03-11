import { kv } from '@vercel/kv';

// Get visitor IP from request headers
function getClientIP(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown';
}

export default async function handler(req, res) {
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
    const clientIP = getClientIP(req);

    // Add IP to KV set (automatically prevents duplicates)
    await kv.sadd('unique_visitors', clientIP);

    // Get total count of unique IPs
    const uniqueCount = await kv.scard('unique_visitors');

    // Return unique visitor count
    res.status(200).json({
      value: uniqueCount,
      ip: clientIP,
    });
  } catch (error) {
    console.error('Error tracking visitors:', error);
    res.status(500).json({ error: 'Failed to track visitors', value: 0 });
  }
}
