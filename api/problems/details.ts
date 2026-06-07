import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getProblemDetails } from "../../server/db.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { leetcodeNumber, title, category, difficulty } = req.query;
    if (!leetcodeNumber || typeof leetcodeNumber !== "string") {
      return res.status(400).json({ error: "leetcodeNumber query parameter is required" });
    }

    const details = await getProblemDetails(
      leetcodeNumber,
      typeof title === "string" ? title : "",
      typeof category === "string" ? category : undefined,
      typeof difficulty === "string" ? difficulty : undefined
    );
    return res.json(details);
  } catch (err: any) {
    console.error("Error in /api/problems/details:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
