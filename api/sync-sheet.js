/**
 * Vercel Serverless Function: /api/sync-sheet
 * Proxies to Google Apps Script — SHEETS_URL lives in Vercel's encrypted env vars
 */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const entry = req.body;
  if (!entry || typeof entry !== "object") {
    return res.status(400).json({ error: "Invalid payload." });
  }

  const SHEETS_URL = process.env.SHEETS_URL;
  if (!SHEETS_URL) {
    return res.status(500).json({ error: "Server misconfiguration." });
  }

  const params = new URLSearchParams();
  Object.keys(entry).forEach((key) => {
    if (key === "history") return;
    let val = entry[key];
    
    // Formatting: Checklist Array -> Comma String
    if (key === "checklist" && Array.isArray(val)) val = val.join(", ");
    
    // Formatting: Standardize phone for server-side lookup
    if (key === "phone" && val) val = val.toString().replace(/\D/g, "").slice(-10);
    
    params.set(key, val);
  });
  
  // Explicitly ensure critical fields are present
  const id = entry.id || entry.transactionId || ((entry.phone || "WALK") + "-" + Date.now());
  params.set("transactionId", id);

  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("GATEWAY_TIMEOUT")), 8500)
  );

  try {
    const fullUrl = `${SHEETS_URL}?${params.toString()}`;
    
    // ── TIMEOUT RACE ──
    // If Google takes >8.5s, we treat it as 'Pushed' to avoid Vercel 10s crash
    const sheetsRes = await Promise.race([
      fetch(fullUrl, {
        method: "GET",
        headers: { 'Accept': 'text/plain' },
        redirect: 'follow'
      }),
      timeout
    ]);

    if (!sheetsRes.ok) {
      console.error(`Sheets Sync Error: HTTP ${sheetsRes.status}`);
      return res.status(sheetsRes.status).json({ error: "Sheets uplink failed." });
    }

    const responseText = await sheetsRes.text();
    if (responseText.includes("SUCCESS")) {
      return res.status(200).json({ ok: true, transactionId: id });
    } else {
      console.error(`Sheets Sync Fault: ${responseText}`);
      return res.status(500).json({ error: responseText || "Unknown sync error" });
    }
  } catch (e) {
    if (e.message === "GATEWAY_TIMEOUT") {
      console.warn("[sync-sheet] Handshake latency detected. Sync Pushed.");
      return res.status(200).json({ 
        ok: true, 
        pushed: true, 
        message: "Entry Pushed (Google latency detected)" 
      });
    }
    console.error("[sync-sheet error]", e.message);
    return res.status(500).json({ error: "Critical sheet uplink failure." });
  }
}
