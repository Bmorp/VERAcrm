export default function handler(req, res) {
  res.status(200).json({ status: "VERA Tactical UPlink ACTIVE", timestamp: new Date().toISOString() });
}
