export default async function handler(req, res) {
  const SHEETS_URL = process.env.SHEETS_URL || "https://script.google.com/macros/s/AKfycbw-0pTjfs4ppQ65a-_D57C32AjbGbdMAS52_K9ax4qfF5XqvxgqPWIj8T_9_KLAAqTeWw/exec";
  
  try {
    if (typeof fetch === 'undefined') {
       return res.status(500).json({ error: "Runtime Fault: 'fetch' is not defined. Please ensure Node.js 18+ is active on Vercel." });
    }

    const data = req.method === 'POST' ? req.body : req.query;
    const params = new URLSearchParams(data);
    const finalUrl = `${SHEETS_URL}?${params.toString()}`;
    
    const response = await fetch(finalUrl, { method: 'GET' });
    
    res.status(200).json({ success: true, url_synced: !!SHEETS_URL });
  } catch (error) {
    res.status(500).json({ error: "Uplink Fault: " + error.message });
  }
}
