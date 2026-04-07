/**
 * Vercel Serverless Function: /api/ping
 * Health check endpoint
 */
export default function handler(req, res) {
  res.status(200).json({ status: "VERA Secure Proxy Online ✅", ts: Date.now() });
}
