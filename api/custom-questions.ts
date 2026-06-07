import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createCustomQuestion } from "../server/db.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    let { userId, leetcodeNumber, title, description, difficulty, category } = req.body;

    if (!userId || !leetcodeNumber) {
      return res.status(400).json({ error: "userId and leetcodeNumber are required" });
    }

    const finalTitle =
      title && typeof title === "string" && title.trim()
        ? title.trim()
        : `LeetCode #${leetcodeNumber.trim()}`;
    const finalDescription =
      description && typeof description === "string" && description.trim()
        ? description.trim()
        : `Solve LeetCode problem #${leetcodeNumber.trim()} to reinforce your standard DSA patterns.`;
    const finalDifficulty = ["Easy", "Medium", "Hard"].includes(difficulty)
      ? difficulty
      : "Medium";
    const finalCategory =
      category && typeof category === "string" && category.trim()
        ? category.trim()
        : "Arrays";

    const uId = Number(userId);

    const createdQuestion = await createCustomQuestion(
      uId,
      String(leetcodeNumber).trim(),
      finalTitle,
      finalDescription,
      finalDifficulty as "Easy" | "Medium" | "Hard",
      finalCategory
    );

    return res.json({ success: true, question: createdQuestion });
  } catch (err: any) {
    console.error("Error creating custom question:", err);
    if (err.message && err.message.includes("already registered")) {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
}
