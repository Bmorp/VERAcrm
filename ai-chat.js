/**
 * Vercel Serverless Function: /api/ai-chat
 * Proxies to Groq — GROQ_API_KEY lives in Vercel's encrypted env vars
 */
export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid payload: messages array required." });
  }

  const GROQ_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_KEY) {
    return res.status(500).json({ error: "Server misconfiguration." });
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
    return res.status(200).json({ reply });
  } catch (e) {
    console.error("[ai-chat error]", e.message);
    return res.status(500).json({ error: "AI uplink failed." });
  }
}
