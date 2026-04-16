export default async function handler(req, res) {
  // Enhanced Strategic Proxy: Bridging VERA to Google Sheets
  const SHEETS_URL = process.env.SHEETS_URL || "https://script.google.com/macros/s/AKfycbw-0pTjfs4ppQ65a-_D57C32AjbGbdMAS52_K9ax4qfF5XqvxgqPWIj8T_9_KLAAqTeWw/exec";
  
  try {
    const data = req.method === 'POST' ? req.body : req.query;
    const params = new URLSearchParams(data);
    
    // Perform the heavy lift to Google Sheets
    const response = await fetch(`${SHEETS_URL}?${params.toString()}`, {
      method: 'GET'
    });

    res.status(200).json({ success: true, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error("Uplink Fault:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
