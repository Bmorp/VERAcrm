export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });
  
  const { messages } = req.body;
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) return res.status(500).json({ error: 'AI Uplink Missing: GROQ_API_KEY not configured' });

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "You are VERA, a professional and proactive AI CRM assistant for a high-end jewelry brand. Your goal is to help staff manage leads, prioritize hot prospects, and provide tactical sales advice based on lead history." },
          ...messages
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'AI Protocol Fault: ' + error.message });
  }
}
