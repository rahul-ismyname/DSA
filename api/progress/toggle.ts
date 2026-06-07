import type { VercelRequest, VercelResponse } from "@vercel/node";
import { toggleProgress } from "../../server/db.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userId, problemId, isCompleted } = req.body;
    if (userId == null || !problemId) {
      return res.status(400).json({ error: "userId and problemId are required" });
    }
    const uId = Number(userId);

    const result = await toggleProgress(uId, String(problemId), Boolean(isCompleted));
    return res.json(result);
  } catch (err: any) {
    console.error("Error toggling progress:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
