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
    if (key === "phone" && val) val = val.toString().replace(/\D/g, "").slice(-10);
    params.set(key, Array.isArray(val) ? val.join(", ") : val);
  });
  const transactionId = (entry.phone || "WALK") + "-" + Date.now();
  params.set("transactionId", transactionId);

  try {
    const sheetsRes = await fetch(`${SHEETS_URL}?${params.toString()}`, {
      method: "GET",
      redirect: "follow",
    });

    if (!sheetsRes.ok) {
      return res.status(sheetsRes.status).json({ error: "Sheets sync failed." });
    }

    return res.status(200).json({ ok: true, transactionId });
  } catch (e) {
    console.error("[sync-sheet error]", e.message);
    return res.status(500).json({ error: "Sheet uplink failed." });
  }
}
