/**
 * VERA CRM — Secure Proxy Backend (server.js)
 * ─────────────────────────────────────────────
 * Holds all API secrets in .env
 * Browser never sees a key — it only talks to THIS server
 * Run: node server.js  (or: npm start)
 */

import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3001;

// ── Allowed origins ────────────────────────────────────────────────────────────
// Add your local dev URL and any production domain here
const ALLOWED_ORIGINS = [
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://localhost:3001",
  "http://127.0.0.1:3001",
  // Add your production domain below:
  // "https://your-domain.com",
];

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow requests with no origin (mobile apps, curl, Postman in dev)
      if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
      cb(new Error(`CORS blocked: ${origin}`));
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json({ limit: "20kb" })); // Prevent oversized payloads

// ── Rate Limiting ──────────────────────────────────────────────────────────────
const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // max 20 AI requests per minute per IP
  message: { error: "Too many requests. Slow down." },
});

const sheetsLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60, // max 60 sheet syncs per minute
  message: { error: "Too many sync requests." },
});

// ── Health check ───────────────────────────────────────────────────────────────
app.get("/api/ping", (_req, res) => {
  res.json({ status: "VERA Secure Proxy Online ✅", ts: Date.now() });
});

// ── AI Chat Proxy ──────────────────────────────────────────────────────────────
app.post("/api/ai-chat", aiLimiter, async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid payload: messages array required." });
  }

  const GROQ_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_KEY) {
    return res.status(500).json({ error: "Server misconfiguration: AI key missing." });
  }

  try {
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages,
        temperature: 0.1,
      }),
    });

    if (!groqRes.ok) {
      const err = await groqRes.json().catch(() => ({}));
      return res.status(groqRes.status).json({ error: err.error?.message || "Groq API error" });
    }

    const data = await groqRes.json();
    const reply = data.choices?.[0]?.message?.content || "No response from AI.";
    res.json({ reply });
  } catch (e) {
    console.error("[AI Proxy Error]", e.message);
    res.status(500).json({ error: "AI uplink failed. Check server logs." });
  }
});

// ── Google Sheets Sync Proxy ───────────────────────────────────────────────────
app.post("/api/sync-sheet", sheetsLimiter, async (req, res) => {
  const entry = req.body;

  if (!entry || typeof entry !== "object") {
    return res.status(400).json({ error: "Invalid payload." });
  }

  const SHEETS_URL = process.env.SHEETS_URL;
  if (!SHEETS_URL) {
    return res.status(500).json({ error: "Server misconfiguration: Sheets URL missing." });
  }

  const params = new URLSearchParams();
  Object.keys(entry).forEach((key) => {
    if (key === "history") return;
    let val = entry[key];
    if (key === "phone" && val) val = val.toString().replace(/\D/g, "").slice(-10);
    params.set(key, Array.isArray(val) ? val.join(", ") : val);
  });
  params.set("transactionId", (entry.phone || "WALK") + "-" + Date.now());

  try {
    const sheetsRes = await fetch(`${SHEETS_URL}?${params.toString()}`, {
      method: "GET",
      redirect: "follow",
    });

    if (!sheetsRes.ok) {
      return res.status(sheetsRes.status).json({ error: "Sheets sync failed." });
    }

    res.json({ ok: true, transactionId: params.get("transactionId") });
  } catch (e) {
    console.error("[Sheets Proxy Error]", e.message);
    res.status(500).json({ error: "Sheet uplink failed." });
  }
});

// ── Start ──────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✅  VERA Secure Proxy running → http://localhost:${PORT}`);
  console.log(`   /api/ping      — Health check`);
  console.log(`   /api/ai-chat   — Groq AI (key hidden)`);
  console.log(`   /api/sync-sheet — Google Sheets (URL hidden)\n`);
});
