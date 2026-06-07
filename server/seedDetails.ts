import dotenv from "dotenv";
import path from "path";
import { getProblemDetails } from "./db.js";
import { DEFAULT_PROBLEMS } from "./defaultProblems.js";

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), ".env.local") });
dotenv.config();

async function seed() {
  console.log(`Starting to seed problem details for ${DEFAULT_PROBLEMS.length} roadmap questions...`);
  
  for (let i = 0; i < DEFAULT_PROBLEMS.length; i++) {
    const prob = DEFAULT_PROBLEMS[i];
    const percentage = (((i + 1) / DEFAULT_PROBLEMS.length) * 100).toFixed(1);
    console.log(`[${percentage}%] [${i + 1}/${DEFAULT_PROBLEMS.length}] Seeding LeetCode #${prob.leetcode_number}: ${prob.title}...`);
    
    try {
      // getProblemDetails automatically reads cache, falls back to Gemini API, and updates Firestore
      await getProblemDetails(prob.leetcode_number, prob.title);
      
      // Delay slightly to respect Gemini rate limits
      await new Promise((resolve) => setTimeout(resolve, 600));
    } catch (err) {
      console.error(`Failed to seed details for #${prob.leetcode_number} (${prob.title}):`, err);
    }
  }
  
  console.log("Database seeding completed successfully.");
  process.exit(0);
}

seed();
