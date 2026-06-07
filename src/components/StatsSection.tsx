import { motion } from "motion/react";
import { CheckCircle2, Award, Zap, Code2, Clock, Flame } from "lucide-react";
import { DashboardStats } from "../types";

interface StatsSectionProps {
  stats: DashboardStats;
}

const STREAK_BADGES = [
  { days: 10, icon: "⚡", title: "Spark" },
  { days: 50, icon: "🔥", title: "Ignite" },
  { days: 100, icon: "💥", title: "Blaze" },
  { days: 200, icon: "☄️", title: "Inferno" },
  { days: 500, icon: "🌟", title: "Nova" },
];

export default function StatsSection({ stats }: StatsSectionProps) {
  const { totalQuestions, totalCompleted, difficultyBreakdown, recentCompletions } = stats;

  const percentage = totalQuestions > 0 ? Math.round((totalCompleted / totalQuestions) * 100) : 0;

  // Calculates fractional progress for each type
  const easyPct = difficultyBreakdown.easy.total > 0
    ? Math.round((difficultyBreakdown.easy.completed / difficultyBreakdown.easy.total) * 100)
    : 0;

  const mediumPct = difficultyBreakdown.medium.total > 0
    ? Math.round((difficultyBreakdown.medium.completed / difficultyBreakdown.medium.total) * 100)
    : 0;

  const hardPct = difficultyBreakdown.hard.total > 0
    ? Math.round((difficultyBreakdown.hard.completed / difficultyBreakdown.hard.total) * 100)
    : 0;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" id="stats-container">
      {/* 1. Main Progress Ring and Metrics */}
      <div className="glow-card p-6 rounded-2xl flex flex-col justify-between border border-neutral-800">
        <div>
          <span className="text-xs font-semibold tracking-widest text-neutral-400 uppercase font-mono block mb-1">
            Global Progress
          </span>
          <h3 className="text-sm text-neutral-500 font-sans">
            Standard Curated + Custom Problems
          </h3>
        </div>

        {/* Circular Ring and Percentage */}
        <div className="flex items-center gap-6 my-4">
          <div className="relative shrink-0 flex items-center justify-center">
            {/* SVG circle meter */}
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="#1c1d24"
                strokeWidth="7"
                fill="transparent"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="#10b981"
                strokeWidth="7"
                fill="transparent"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 - (251.2 * percentage) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold font-mono tracking-tight text-white leading-none">
                {percentage}%
              </span>
              <span className="text-[10px] text-neutral-500 font-semibold uppercase tracking-widest mt-1">
                Completed
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-3xl font-extrabold font-mono tracking-tighter text-white">
              {totalCompleted}
            </span>
            <span className="text-neutral-500 text-sm font-mono block">
              / {totalQuestions} Questions
            </span>
            <div className="inline-flex items-center gap-1 text-xs text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800 mt-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Optimized State</span>
            </div>
          </div>
        </div>

        {/* Motivation Indicator */}
        <div className="pt-3 border-t border-neutral-900 text-xs text-neutral-400 flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-500" />
          <span>
            {percentage === 100
              ? "Ultimate Champion level achieved! Godspeed."
              : percentage >= 75
              ? "Amazing milestones! Interview ready."
              : percentage >= 50
              ? "Phenomenal focus. Keep pushing!"
              : percentage >= 25
              ? "Solid start. Algorithmic thinking grows!"
              : "Welcome to the sandbox. Solve your first checkmark!"}
          </span>
        </div>
      </div>

      {/* 2. Daily Solving Streak Card */}
      <div className="glow-card p-6 rounded-2xl flex flex-col justify-between border border-neutral-800">
        <div>
          <span className="text-xs font-semibold tracking-widest text-neutral-400 uppercase font-mono block mb-1">
            Consistency
          </span>
          <h3 className="text-sm text-neutral-500 font-sans">
            Daily Solving Streak
          </h3>
        </div>

        <div className="flex items-center gap-5 my-4">
          <div className="relative flex items-center justify-center p-4 rounded-2xl bg-neutral-900 border border-neutral-850 shadow-inner">
            <Flame className={`w-10 h-10 ${stats.streak > 0 ? "text-orange-500 fill-orange-500/10 animate-pulse" : "text-neutral-600"}`} />
          </div>
          <div className="space-y-0.5">
            <span className="text-3xl font-extrabold font-mono tracking-tighter text-white block">
              {stats.streak} {stats.streak === 1 ? "Day" : "Days"}
            </span>
            <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider block">
              {stats.streak > 0 ? "Active Streak!" : "No Active Streak"}
            </span>
          </div>
        </div>



        <div className="pt-3 border-t border-neutral-900 text-xs text-neutral-400 flex items-center gap-2">
          <span>
            {stats.streak > 0
              ? "Keep the flame burning! Solve 1 question daily."
              : "Solve a question today to start a new streak!"}
          </span>
        </div>
      </div>

      {/* 3. Difficulty Breakdown Panel */}
      <div className="glow-card p-6 rounded-2xl flex flex-col justify-between border border-neutral-800">
        <div>
          <span className="text-xs font-semibold tracking-widest text-neutral-400 uppercase font-mono block mb-1">
            Complexity Metrics
          </span>
          <h3 className="text-sm text-neutral-400">Survival rate per category tier</h3>
        </div>

        <div className="space-y-4 my-3">
          {/* Easy Progress bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-emerald-400 font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Easy
              </span>
              <span className="text-neutral-400 font-mono font-medium">
                {difficultyBreakdown.easy.completed} / {difficultyBreakdown.easy.total}
              </span>
            </div>
            <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-950">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${easyPct}%` }}
              />
            </div>
          </div>

          {/* Medium Progress bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-amber-400 font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Medium
              </span>
              <span className="text-neutral-400 font-mono font-medium">
                {difficultyBreakdown.medium.completed} / {difficultyBreakdown.medium.total}
              </span>
            </div>
            <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-950">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${mediumPct}%` }}
              />
            </div>
          </div>

          {/* Hard Progress bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-rose-500 font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Hard
              </span>
              <span className="text-neutral-400 font-mono font-medium">
                {difficultyBreakdown.hard.completed} / {difficultyBreakdown.hard.total}
              </span>
            </div>
            <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-950">
              <div
                className="h-full bg-rose-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${hardPct}%` }}
              />
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-neutral-900 text-xs text-neutral-400 flex items-center gap-2 font-mono">
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          <span>Balanced progression minimizes skill gap.</span>
        </div>
      </div>

      {/* 3. Recent Milestones Accomplishment feed */}
      <div className="glow-card p-6 rounded-2xl flex flex-col justify-between border border-neutral-800">
        <div>
          <span className="text-xs font-semibold tracking-widest text-neutral-400 uppercase font-mono block mb-1 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Recent Success Logs
          </span>
          <h3 className="text-xs text-neutral-500 font-sans">Latest 5 completed topics</h3>
        </div>

        <div className="my-3 flex-grow overflow-y-auto max-h-[110px] space-y-2 pr-1">
          {recentCompletions.length === 0 ? (
            <div className="h-full flex items-center justify-center text-neutral-600 text-xs py-4 text-center">
              No recent solutions. Toggle questions in the dashboard to populate logs.
            </div>
          ) : (
            recentCompletions.map((log) => (
              <div
                key={log.problem_id}
                className="flex items-center justify-between text-xs py-1.5 border-b border-neutral-900 last:border-0"
              >
                <div className="flex items-center gap-2 truncate">
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      log.difficulty === "Easy"
                        ? "bg-emerald-500"
                        : log.difficulty === "Medium"
                        ? "bg-amber-500"
                        : "bg-rose-500"
                    }`}
                  />
                  <span className="text-neutral-500 font-mono text-[10px] uppercase">
                    #{log.problem_id}
                  </span>
                  <span className="font-medium text-neutral-200 truncate pr-2">
                    {log.title}
                  </span>
                </div>
                <span className="text-[9px] text-neutral-500 font-mono">
                  {new Date(log.completed_at).toLocaleDateString([], {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="pt-3 border-t border-neutral-900 text-[11px] text-neutral-500 flex items-center gap-1.5">
          <Code2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Tracking active on Cloud Firestore.</span>
        </div>
      </div>
    </div>
  );
}
