import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import {
  initDatabase,
  getOrCreateUser,
  getProblems,
  toggleProgress,
  createCustomQuestion,
  getStats,
  getProblemDetails
} from "./server/db.js";

const PORT = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize and validate Firestore connection
  try {
    await initDatabase();
  } catch (error) {
    console.error("Database connection validation failed:", error);
  }

  // --- API ROUTES ---

  // 1. Auth: Unique Access Code Login/Register via Firestore
  app.post("/api/auth", async (req: Request, res: Response) => {
    try {
      const { accessCode } = req.body;
      if (!accessCode || typeof accessCode !== "string") {
        return res.status(400).json({ error: "Access code is required" });
      }

      // Sanitize access code: trim
      const cleanedCode = accessCode.trim();
      if (!/^\d{4}$/.test(cleanedCode)) {
        return res.status(400).json({
          error: "Access code must be exactly a 4-digit number (e.g., 5821)",
        });
      }

      const user = await getOrCreateUser(cleanedCode);
      console.log(`User mapped via firestore with code: ${user.accessCode}, Deterministic ID: ${user.id}`);
      return res.json({ id: user.id, accessCode: user.accessCode });
    } catch (err: any) {
      console.error("Error in /api/auth:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // 2. Fetch all problems (Standard + User's Custom Questions + Completion Status from Firestore)
  app.get("/api/problems", async (req: Request, res: Response) => {
    try {
      const { userId } = req.query;
      if (!userId) {
        return res.status(400).json({ error: "userId query parameter is required" });
      }
      const uId = Number(userId);

      const allProblems = await getProblems(uId);
      return res.json({ problems: allProblems });
    } catch (err: any) {
      console.error("Error in /api/problems:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // 3. Toggle Problem Progress (Save checkmark state to Firestore)
  app.post("/api/progress/toggle", async (req: Request, res: Response) => {
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
  });

  // 4. Create a Custom Question in Firestore
  app.post("/api/custom-questions", async (req: Request, res: Response) => {
    try {
      let { userId, leetcodeNumber, title, description, difficulty, category } = req.body;

      if (!userId || !leetcodeNumber) {
        return res.status(400).json({ error: "userId and leetcodeNumber are required" });
      }

      // Default optional fields
      const finalTitle = (title && typeof title === "string" && title.trim()) ? title.trim() : `LeetCode #${leetcodeNumber.trim()}`;
      const finalDescription = (description && typeof description === "string" && description.trim()) ? description.trim() : `Solve LeetCode problem #${leetcodeNumber.trim()} to reinforce your standard DSA patterns.`;
      const finalDifficulty = ["Easy", "Medium", "Hard"].includes(difficulty) ? difficulty : "Medium";
      const finalCategory = (category && typeof category === "string" && category.trim()) ? category.trim() : "Arrays";

      const uId = Number(userId);

      const createdQuestion = await createCustomQuestion(
        uId,
        String(leetcodeNumber).trim(),
        finalTitle,
        finalDescription,
        finalDifficulty as "Easy" | "Medium" | "Hard",
        finalCategory
      );

      return res.json({
        success: true,
        question: createdQuestion,
      });
    } catch (err: any) {
      console.error("Error creating custom question:", err);
      if (err.message && err.message.includes("already registered")) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // 5. Fetch Detailed Dashboard Statistics from Firestore
  app.get("/api/stats", async (req: Request, res: Response) => {
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
  });

  // 6. Fetch detailed problem metadata (topics & companies) with AI-generation and Firestore caching
  app.get("/api/problems/details", async (req: Request, res: Response) => {
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
  });

  // --- VITE MIDDLEWARE CONFIGURATION ---

  if (process.env.NODE_ENV !== "production") {
    // In development mode, load Vite server
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production mode, serve compiled index.html and assets
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`DSA Tracker Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
