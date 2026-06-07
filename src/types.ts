export interface User {
  id: number;
  accessCode: string;
}

export type DifficultyLevel = "Easy" | "Medium" | "Hard";
export type ModelTier = "Beginner" | "Intermediate" | "Advanced";

export interface Problem {
  leetcode_number: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  category: string;
  module: ModelTier;
  isCustom: boolean;
  is_completed: boolean;
  completed_at: string | null;
}

export interface DifficultyStats {
  completed: number;
  total: number;
}

export interface RecentCompletion {
  problem_id: string;
  title: string;
  difficulty: string;
  category: string;
  completed_at: string;
}

export interface DashboardStats {
  totalQuestions: number;
  totalCompleted: number;
  streak: number;
  difficultyBreakdown: {
    easy: DifficultyStats;
    medium: DifficultyStats;
    hard: DifficultyStats;
  };
  recentCompletions: RecentCompletion[];
}
