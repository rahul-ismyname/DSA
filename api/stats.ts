import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getStats } from "../server/db.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ error: "userId query parameter is required" });
    }

    const uId = Number(userId);
    const stats = await getStats(uId);
    return res.json(stats);
  } catch (err: any) {
    console.error("Error fetching stats:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
