import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getOrCreateUser } from "../server/db.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { accessCode } = req.body;
    if (!accessCode || typeof accessCode !== "string") {
      return res.status(400).json({ error: "Access code is required" });
    }

    const cleanedCode = accessCode.trim();
    if (!/^\d{4}$/.test(cleanedCode)) {
      return res.status(400).json({
        error: "Access code must be exactly a 4-digit number (e.g., 5821)",
      });
    }

    const user = await getOrCreateUser(cleanedCode);
    console.log(
      `User mapped via firestore with code: ${user.accessCode}, Deterministic ID: ${user.id}`
    );
    return res.json({ id: user.id, accessCode: user.accessCode });
  } catch (err: any) {
    console.error("Error in /api/auth:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
