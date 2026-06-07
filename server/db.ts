import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  limit,
  getDocFromServer
} from "firebase/firestore";
import { GoogleGenAI } from "@google/genai";
import { DEFAULT_PROBLEMS } from "./defaultProblems.js";

// Load environment variables
dotenv.config({ path: path.join(process.cwd(), ".env.local") });
dotenv.config();

// Load configuration safely from the root file
const configPath = path.join(process.cwd(), "firebase-applet-config.json");
const firebaseConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Deterministic hash function to map access codes to standard positive integer IDs
export function getHashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

// Map a numeric ID back to the corresponding accessCode doc ID
export async function getAccessCodeFromUid(userId: number): Promise<string | null> {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("id", "==", userId), limit(1));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return null;
  }
  return querySnapshot.docs[0].id; // Document ID is the uppercase access code
}

// 1. Initialize and Validate Cloud Firestore
export async function initDatabase() {
  console.log("Validating connection to Cloud Firestore...");
  try {
    // Critical validation constraint: check connectivity to test DB
    await getDocFromServer(doc(db, "test", "connection"));
    console.log("Cloud Firestore verified successfully.");
  } catch (error: any) {
    if (error instanceof Error && error.message.includes("offline")) {
      console.error("Please check your Firebase configuration or network.");
    } else {
      console.log("Firestore ready (standard access test).");
    }
  }
}

// 2. Auth Access Code login adapter
export async function getOrCreateUser(accessCode: string) {
  const cleanedCode = accessCode.trim().toUpperCase();
  const userDocRef = doc(db, "users", cleanedCode);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    const data = userSnapshot.data();
    return {
      id: Number(data.id),
      accessCode: cleanedCode,
    };
  } else {
    const id = getHashCode(cleanedCode);
    const newUser = {
      id,
      accessCode: cleanedCode,
      createdAt: new Date().toISOString(),
    };
    await setDoc(userDocRef, newUser);
    return {
      id,
      accessCode: cleanedCode,
    };
  }
}

// 3. Problems and completion merged roadmap adapter
export async function getProblems(userId: number) {
  const accessCode = await getAccessCodeFromUid(userId);
  if (!accessCode) {
    throw new Error("User profile not found");
  }

  // A. Load static core roadmap
  const standardProblems = DEFAULT_PROBLEMS.map((p) => ({
    leetcode_number: String(p.leetcode_number),
    title: String(p.title),
    description: String(p.description),
    difficulty: String(p.difficulty),
    category: String(p.category),
    module: String(p.module),
    isCustom: false,
  }));

  // B. Load user custom questions
  const customQuestionsRef = collection(db, "users", accessCode, "custom_questions");
  const cqSnapshot = await getDocs(customQuestionsRef);
  const customProblems = cqSnapshot.docs.map((d) => {
    const data = d.data();
    return {
      leetcode_number: String(data.leetcodeNumber),
      title: String(data.title),
      description: String(data.description),
      difficulty: String(data.difficulty),
      category: String(data.category),
      module: "Advanced" as const,
      isCustom: true,
    };
  });

  // Sort custom questions sequentially
  customProblems.sort((a, b) => {
    const numA = parseInt(a.leetcode_number, 10);
    const numB = parseInt(b.leetcode_number, 10);
    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB;
    }
    return a.leetcode_number.localeCompare(b.leetcode_number);
  });

  // C. Load checkmark progress
  const progressRef = collection(db, "users", accessCode, "progress");
  const progressSnapshot = await getDocs(progressRef);
  const completionMap = new Map<string, string>();
  for (const d of progressSnapshot.docs) {
    const data = d.data();
    if (data.isCompleted) {
      completionMap.set(d.id, String(data.completedAt));
    }
  }

  // Merge datasets
  const allProblems = [...standardProblems, ...customProblems].map((p) => {
    const completedAt = completionMap.get(p.leetcode_number);
    return {
      ...p,
      is_completed: completionMap.has(p.leetcode_number),
      completed_at: completedAt || null,
    };
  });

  return allProblems;
}

// 4. Progress Toggle checkbox adapter
export async function toggleProgress(userId: number, problemId: string, isCompleted: boolean) {
  const accessCode = await getAccessCodeFromUid(userId);
  if (!accessCode) {
    throw new Error("User profile not found");
  }

  const progressDocRef = doc(db, "users", accessCode, "progress", problemId);

  if (isCompleted) {
    await setDoc(progressDocRef, {
      isCompleted: true,
      completedAt: new Date().toISOString(),
    });
  } else {
    await deleteDoc(progressDocRef);
  }

  return { success: true, problemId, isCompleted };
}

// 5. Custom question creation adapter
export async function createCustomQuestion(
  userId: number,
  leetcodeNumber: string,
  title: string,
  description: string,
  difficulty: "Easy" | "Medium" | "Hard",
  category: string
) {
  const accessCode = await getAccessCodeFromUid(userId);
  if (!accessCode) {
    throw new Error("User profile not found");
  }

  const cleanLeetcodeNum = String(leetcodeNumber).trim();
  const customDocRef = doc(db, "users", accessCode, "custom_questions", cleanLeetcodeNum);

  const customSnapshot = await getDoc(customDocRef);
  if (customSnapshot.exists()) {
    throw new Error("This LeetCode problem number is already registered under your custom questions list");
  }

  const newQuestion = {
    leetcodeNumber: cleanLeetcodeNum,
    title: title.trim(),
    description: description.trim(),
    difficulty,
    category: category.trim(),
    createdAt: new Date().toISOString(),
  };

  await setDoc(customDocRef, newQuestion);

  return {
    leetcode_number: cleanLeetcodeNum,
    title: title.trim(),
    description: description.trim(),
    difficulty,
    category: category.trim(),
    module: "Advanced" as const,
    isCustom: true,
    is_completed: false,
    completed_at: null,
  };
}

// 6. Aggregate stats loader adapter
export async function getStats(userId: number) {
  const accessCode = await getAccessCodeFromUid(userId);
  if (!accessCode) {
    throw new Error("User profile not found");
  }

  // Fetch counts and datasets
  const totalStandard = DEFAULT_PROBLEMS.length;

  const customQuestionsRef = collection(db, "users", accessCode, "custom_questions");
  const cqSnapshot = await getDocs(customQuestionsRef);
  const totalCustom = cqSnapshot.size;

  const totalQuestions = totalStandard + totalCustom;

  const progressRef = collection(db, "users", accessCode, "progress");
  const progressSnapshot = await getDocs(progressRef);
  const totalCompleted = progressSnapshot.size;

  // Calculate solving streak
  const completionDates = progressSnapshot.docs
    .map((d) => d.data().completedAt)
    .filter(Boolean)
    .map((isoStr: any) => String(isoStr).split("T")[0]);

  const uniqueDates = Array.from(new Set(completionDates)).sort((a, b) => b.localeCompare(a));
  let streak = 0;

  if (uniqueDates.length > 0) {
    const todayStr = new Date().toISOString().split("T")[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    if (uniqueDates[0] === todayStr || uniqueDates[0] === yesterdayStr) {
      streak = 1;
      let currentLoc = uniqueDates[0];
      for (let i = 1; i < uniqueDates.length; i++) {
        const prevDate = new Date(currentLoc);
        prevDate.setDate(prevDate.getDate() - 1);
        const expectedDateStr = prevDate.toISOString().split("T")[0];

        if (uniqueDates[i] === expectedDateStr) {
          streak++;
          currentLoc = uniqueDates[i];
        } else {
          break;
        }
      }
    }
  }

  const customQuestionsMap = new Map<string, any>();
  for (const doc of cqSnapshot.docs) {
    customQuestionsMap.set(doc.id, doc.data());
  }

  const standardProblemsMap = new Map<string, any>();
  for (const p of DEFAULT_PROBLEMS) {
    standardProblemsMap.set(p.leetcode_number, p);
  }

  const diffCompleted = { easy: 0, medium: 0, hard: 0 };
  const recentCompletionsList: any[] = [];

  for (const pDoc of progressSnapshot.docs) {
    const problemId = pDoc.id;
    const progressData = pDoc.data();

    let problemDetails = standardProblemsMap.get(problemId);
    if (!problemDetails) {
      const cq = customQuestionsMap.get(problemId);
      if (cq) {
        problemDetails = {
          leetcode_number: cq.leetcodeNumber,
          title: cq.title,
          difficulty: cq.difficulty,
          category: cq.category,
        };
      }
    }

    if (problemDetails) {
      const diffKey = problemDetails.difficulty.toLowerCase() as "easy" | "medium" | "hard";
      if (diffCompleted[diffKey] !== undefined) {
        diffCompleted[diffKey]++;
      }

      recentCompletionsList.push({
        problem_id: problemId,
        title: problemDetails.title,
        difficulty: problemDetails.difficulty,
        category: problemDetails.category,
        completed_at: progressData.completedAt || new Date().toISOString(),
      });
    }
  }

  recentCompletionsList.sort((a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime());
  const recent = recentCompletionsList.slice(0, 5);

  const diffTotals = { easy: 0, medium: 0, hard: 0 };
  for (const p of DEFAULT_PROBLEMS) {
    const dk = p.difficulty.toLowerCase() as "easy" | "medium" | "hard";
    diffTotals[dk]++;
  }
  for (const cq of customQuestionsMap.values()) {
    const dk = cq.difficulty.toLowerCase() as "easy" | "medium" | "hard";
    if (diffTotals[dk] !== undefined) {
      diffTotals[dk]++;
    }
  }

  return {
    totalQuestions,
    totalCompleted,
    streak,
    difficultyBreakdown: {
      easy: { completed: diffCompleted.easy, total: diffTotals.easy },
      medium: { completed: diffCompleted.medium, total: diffTotals.medium },
      hard: { completed: diffCompleted.hard, total: diffTotals.hard },
    },
    recentCompletions: recent,
  };
}

const ai = process.env.GEMINI_API_KEY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

export async function getProblemDetails(
  leetcodeNumber: string,
  title: string,
  categoryParam?: string,
  difficultyParam?: string
) {
  const docRef = doc(db, "problem_details", leetcodeNumber);
  
  try {
    const cachedDoc = await getDoc(docRef);
    if (cachedDoc.exists()) {
      return cachedDoc.data();
    }
  } catch (error) {
    console.error("Error reading cached problem details:", error);
  }

  // Find problem in standard list to generate smart default tags if Gemini is not available or fails
  const standardProb = DEFAULT_PROBLEMS.find((p) => String(p.leetcode_number) === String(leetcodeNumber));
  const category = categoryParam || (standardProb ? standardProb.category : "Algorithms");
  const difficulty = difficultyParam || (standardProb ? standardProb.difficulty : "Medium");

  const topicsMap: Record<string, string[]> = {
    "Arrays": ["Arrays", "Hash Table", "Prefix Sum", "Sorting"],
    "Two Pointers": ["Two Pointers", "Arrays", "Sorting"],
    "Sliding Window": ["Sliding Window", "Two Pointers", "Arrays", "Hash Table"],
    "Stack": ["Stack", "Monotonic Stack", "Design"],
    "Binary Search": ["Binary Search", "Arrays", "Divide and Conquer"],
    "Linked List": ["Linked List", "Two Pointers", "Recursion"],
    "Trees": ["Trees", "Binary Tree", "Depth-First Search", "Breadth-First Search"],
    "Tries": ["Tries", "Prefix Tree", "String", "Design"],
    "Heap / Priority Queue": ["Heap (Priority Queue)", "Sorting", "Greedy"],
    "Backtracking": ["Backtracking", "Recursion", "Depth-First Search"],
    "Graphs": ["Graphs", "Depth-First Search", "Breadth-First Search", "Union Find"],
    "Advanced Graphs": ["Graphs", "Shortest Path", "Dijkstra's Algorithm"],
    "1-D DP": ["Dynamic Programming", "Memoization", "Tabulation"],
    "2-D DP": ["Dynamic Programming", "Memoization", "Matrix DP"],
    "Greedy": ["Greedy", "Sorting", "Greedy Choice"],
    "Intervals": ["Intervals", "Sorting", "Arrays"],
    "Math & Geometry": ["Math", "Geometry", "Algorithms"],
    "Bit Manipulation": ["Bit Manipulation", "Binary Arithmetic"],
  };

  let topics = topicsMap[category] || ["Data Structures", "Algorithms", category];

  const allCompanies = [
    "Google", "Amazon", "Meta", "Microsoft", "Netflix", 
    "Apple", "Uber", "Bloomberg", "Adobe", "Oracle", 
    "Salesforce", "Airbnb", "Lyft", "ByteDance", "Atlassian"
  ];
  
  // Deterministic seed generation using title hash to keep it consistent
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = (hash << 5) - hash + title.charCodeAt(i);
  }
  hash = Math.abs(hash);

  const companyCount = 3 + (hash % 3); // 3 to 5 companies
  const selectedCompanies: string[] = [];
  for (let i = 0; i < companyCount; i++) {
    const index = (hash + i * 13) % allCompanies.length;
    const company = allCompanies[index];
    if (!selectedCompanies.includes(company)) {
      selectedCompanies.push(company);
    }
  }

  if (difficulty === "Hard" && !selectedCompanies.includes("Google")) {
    selectedCompanies.push("Google");
  }
  if (difficulty === "Medium" && !selectedCompanies.includes("Meta") && !selectedCompanies.includes("Amazon")) {
    selectedCompanies.push("Meta");
  }

  let companies = selectedCompanies.slice(0, 5);

  if (ai) {
    try {
      console.log(`Querying Gemini for details on LeetCode #${leetcodeNumber} (${title})...`);
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Provide a list of specific DSA sub-topics and top tech companies that ask the LeetCode problem #${leetcodeNumber} (${title}). Return the response strictly as a JSON object with two fields: "topics" (string array) and "companies" (string array). Do not include any markdown formatting or surrounding text.`,
      });

      const text = response.text || "";
      const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleanJson);
      
      if (Array.isArray(parsed.topics) && Array.isArray(parsed.companies)) {
        topics = parsed.topics;
        companies = parsed.companies;
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
    }
  }

  const detailsPayload = {
    leetcodeNumber,
    title,
    topics,
    companies,
    generatedAt: new Date().toISOString(),
  };

  try {
    await setDoc(docRef, detailsPayload);
  } catch (error) {
    console.error("Error caching problem details to Firestore:", error);
  }

  return detailsPayload;
}
