import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LogOut,
  Search,
  CheckCircle,
  HelpCircle,
  Terminal,
  Filter,
  RefreshCw,
  BookOpen,
  Code,
  ChevronLeft,
  ChevronRight,
  Flame,
  ExternalLink,
  ArrowLeft,
  Building2,
  Tag,
  User as UserIcon
} from "lucide-react";
import { User, Problem, DashboardStats } from "./types";
import LoginScreen from "./components/LoginScreen";
import StatsSection from "./components/StatsSection";
import ProblemCard from "./components/ProblemCard";
import CustomQuestionModal from "./components/CustomQuestionModal";
import CategoryNav from "./components/CategoryNav";

const LOCAL_STORAGE_KEY = "dsa_tracker_session";

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  
  // Filtering & Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");

  // App loader states
  const [authChecking, setAuthChecking] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Daily Quest state
  const [isQuestRevealed, setIsQuestRevealed] = useState(false);

  // Tab navigation state
  const [activeTab, setActiveTab] = useState<"roadmap" | "profile">("roadmap");

  // Problem Details View state
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [detailMetadata, setDetailMetadata] = useState<{ topics: string[]; companies: string[] } | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);
  
  // Client-side details cache
  const [detailsCache, setDetailsCache] = useState<Record<string, { topics: string[]; companies: string[] }>>({});

  // Reset page to 1 on filter/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedModule, selectedDifficulty]);

  // Fetch detailed metadata when problem is selected
  useEffect(() => {
    if (!selectedProblem) {
      setDetailMetadata(null);
      setDetailsError(null);
      return;
    }

    const fetchProblemDetails = async () => {
      // Check cache first
      if (detailsCache[selectedProblem.leetcode_number]) {
        setDetailMetadata(detailsCache[selectedProblem.leetcode_number]);
        return;
      }

      setDetailsLoading(true);
      setDetailsError(null);
      try {
        const res = await fetch(
          `/api/problems/details?leetcodeNumber=${encodeURIComponent(
            selectedProblem.leetcode_number
          )}&title=${encodeURIComponent(
            selectedProblem.title
          )}&category=${encodeURIComponent(
            selectedProblem.category
          )}&difficulty=${encodeURIComponent(
            selectedProblem.difficulty
          )}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch details");
        }
        const data = await res.json();
        setDetailMetadata(data);
        
        // Cache retrieved data
        setDetailsCache((prev) => ({
          ...prev,
          [selectedProblem.leetcode_number]: data,
        }));
      } catch (err: any) {
        console.error("Error loading problem details:", err);
        setDetailsError("Could not retrieve topic or company information.");
      } finally {
        setDetailsLoading(false);
      }
    };

    fetchProblemDetails();
  }, [selectedProblem, detailsCache]);

  // 1. Session restore bypass on refresh (if enabled)
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.id && parsed.accessCode) {
          setCurrentUser(parsed);
        }
      } catch (err) {
        console.error("Failed to parse saved session", err);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    }
    setAuthChecking(false);
  }, []);

  // 2. Load dashboard data for authenticated user
  const loadDashboardData = async (userId: number) => {
    setDataLoading(true);
    setError(null);
    try {
      // Parallel fetch for speed
      const [problemsRes, statsRes] = await Promise.all([
        fetch(`/api/problems?userId=${userId}`),
        fetch(`/api/stats?userId=${userId}`),
      ]);

      if (!problemsRes.ok || !statsRes.ok) {
        throw new Error("Failed to load roadmap data from Sandbox database");
      }

      const pData = await problemsRes.json();
      const sData = await statsRes.json();

      setProblems(pData.problems);
      setDashboardStats(sData);
    } catch (err: any) {
      console.error(err);
      setError("Unable to sync metadata with database sandbox. Let me force a baseline.");
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadDashboardData(currentUser.id);
    }
  }, [currentUser]);

  const handleLoginSuccess = (user: User, rememberMe: boolean) => {
    setCurrentUser(user);
    if (rememberMe) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setProblems([]);
    setDashboardStats(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    
    // Clear filters
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedModule(null);
    setSelectedDifficulty("All");
    setIsQuestRevealed(false);
    setSelectedProblem(null);
    setActiveTab("roadmap");
    setDetailsCache({});
  };

  // 3. OPTIMISTIC progress toggler
  const handleToggleProgress = async (leetcodeNum: string, isCompleted: boolean) => {
    if (!currentUser || !dashboardStats) return;

    // A. Keep fallback copy for reversion on fail
    const originalProblems = [...problems];
    const originalStats = { ...dashboardStats };

    // B. Immediate Optimistic UI mutation
    const updatedProblems = problems.map((p) => {
      if (p.leetcode_number === leetcodeNum) {
        return {
          ...p,
          is_completed: isCompleted,
          completed_at: isCompleted ? new Date().toISOString() : null,
        };
      }
      return p;
    });

    setProblems(updatedProblems);

    // C. Re-calibrate metrics dynamically in real-time
    const currentProblem = problems.find((p) => p.leetcode_number === leetcodeNum);
    if (currentProblem) {
      const diffKey = currentProblem.difficulty.toLowerCase() as "easy" | "medium" | "hard";
      const delta = isCompleted ? 1 : -1;

      const nextCompleted = dashboardStats.totalCompleted + delta;
      
      const nextBreakdown = {
        ...dashboardStats.difficultyBreakdown,
        [diffKey]: {
          ...dashboardStats.difficultyBreakdown[diffKey],
          completed: Math.max(0, dashboardStats.difficultyBreakdown[diffKey].completed + delta),
        },
      };

      // Regenerate recent log list elegantly
      let nextRecent = [...dashboardStats.recentCompletions];
      if (isCompleted) {
        // Add new log to start
        const newLogItem = {
          problem_id: leetcodeNum,
          title: currentProblem.title,
          difficulty: currentProblem.difficulty,
          category: currentProblem.category,
          completed_at: new Date().toISOString(),
        };
        nextRecent = [newLogItem, ...nextRecent.filter((l) => l.problem_id !== leetcodeNum)].slice(0, 5);
      } else {
        // Remove from list
        nextRecent = nextRecent.filter((l) => l.problem_id !== leetcodeNum);
      }

      // Calculate solving streak in-memory
      const completedDates = updatedProblems
        .filter((p) => p.is_completed && p.completed_at)
        .map((p) => (p.completed_at as string).split("T")[0]);

      const uniqueDates = Array.from(new Set<string>(completedDates)).sort((a, b) => b.localeCompare(a)) as string[];
      let nextStreak = 0;

      if (uniqueDates.length > 0) {
        const todayStr = new Date().toISOString().split("T")[0];
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];

        if (uniqueDates[0] === todayStr || uniqueDates[0] === yesterdayStr) {
          nextStreak = 1;
          let currentLoc = uniqueDates[0];
          for (let i = 1; i < uniqueDates.length; i++) {
            const prevDate = new Date(currentLoc);
            prevDate.setDate(prevDate.getDate() - 1);
            const expectedDateStr = prevDate.toISOString().split("T")[0];

            if (uniqueDates[i] === expectedDateStr) {
              nextStreak++;
              currentLoc = uniqueDates[i];
            } else {
              break;
            }
          }
        }
      }

      setDashboardStats({
        ...dashboardStats,
        totalCompleted: nextCompleted,
        difficultyBreakdown: nextBreakdown,
        recentCompletions: nextRecent,
        streak: nextStreak,
      });
    }

    // D. Fire PUT payload in background securely
    try {
      const res = await fetch("/api/progress/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: currentUser.id,
          problemId: leetcodeNum,
          isCompleted,
        }),
      });

      if (!res.ok) {
        throw new Error("HTTP failure saving completion timestamp");
      }
    } catch (err) {
      console.error("Optimistic write failed, reverting state:", err);
      // Revert states
      setProblems(originalProblems);
      setDashboardStats(originalStats);
      alert("Database error saving your checkmark. Restoring previous state.");
    }
  };

  const handleCustomQuestionAdded = (newQuestion: Problem) => {
    // Append to local problems
    setProblems((prev) => [newQuestion, ...prev]);

    // Recalculate stats counts
    if (dashboardStats) {
      const diffKey = newQuestion.difficulty.toLowerCase() as "easy" | "medium" | "hard";
      setDashboardStats({
        ...dashboardStats,
        totalQuestions: dashboardStats.totalQuestions + 1,
        difficultyBreakdown: {
          ...dashboardStats.difficultyBreakdown,
          [diffKey]: {
            ...dashboardStats.difficultyBreakdown[diffKey],
            total: dashboardStats.difficultyBreakdown[diffKey].total + 1,
          },
        },
      });
    }
  };

  // 4. Combined Filtering Process
  const filteredProblems = problems.filter((prob) => {
    // Search filter matches title, description, or id number
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      prob.title.toLowerCase().includes(query) ||
      prob.description.toLowerCase().includes(query) ||
      String(prob.leetcode_number).toLowerCase().includes(query);

    // Module filter
    const matchesModule = selectedModule ? prob.module === selectedModule : true;

    // Category filter
    const matchesCategory = selectedCategory ? prob.category === selectedCategory : true;

    // Difficulty filter
    const matchesDifficulty =
      selectedDifficulty === "All" ? true : prob.difficulty === selectedDifficulty;

    return matchesSearch && matchesModule && matchesCategory && matchesDifficulty;
  });

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.max(1, Math.ceil(filteredProblems.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProblems = filteredProblems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Find the active Daily Quest (first uncompleted roadmap problem, or the one solved today)
  const activeQuest = problems
    .filter((p) => !p.isCustom)
    .find((p) => {
      if (!p.is_completed) return true;
      if (p.completed_at) {
        const completedDate = p.completed_at.split("T")[0];
        const todayDate = new Date().toISOString().split("T")[0];
        return completedDate === todayDate;
      }
      return false;
    });

  const isQuestSolvedToday = activeQuest ? activeQuest.is_completed : false;

  // Find updated version of selectedProblem in the problems state to reflect real-time progress toggle changes.
  const activeProblem = selectedProblem
    ? problems.find((p) => p.leetcode_number === selectedProblem.leetcode_number) || selectedProblem
    : null;

  // Generate perfect LeetCode url slug for activeProblem
  const activeProblemSlug = activeProblem
    ? activeProblem.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "") // remove special chars
        .replace(/\s+/g, "-")         // replace spaces with hyphens
        .replace(/-+/g, "-")         // replace double hyphens
    : "";

  const activeProblemIsNumeric = activeProblem ? /^\d+$/.test(activeProblem.leetcode_number) : false;
  const activeProblemIsDefaultTitle = activeProblem
    ? activeProblem.title.toLowerCase().trim() === `leetcode #${activeProblem.leetcode_number}`.toLowerCase().trim() ||
      activeProblem.title.toLowerCase().trim() === `leetcode #${activeProblem.leetcode_number.trim()}`.toLowerCase().trim() ||
      activeProblem.title.toLowerCase().includes("leetcode #" + activeProblem.leetcode_number)
    : false;

  const activeProblemExternalLink = activeProblem
    ? activeProblemIsNumeric && !activeProblemIsDefaultTitle
      ? `https://leetcode.com/problems/${activeProblemSlug}/`
      : `https://www.google.com/search?q=LeetCode+${encodeURIComponent(activeProblem.leetcode_number)}${activeProblemIsDefaultTitle ? "" : `+${encodeURIComponent(activeProblem.title)}`}`
    : "";

  // Keep Daily Quest revealed if previously revealed for the same active quest
  useEffect(() => {
    if (!currentUser || !activeQuest) {
      setIsQuestRevealed(false);
      return;
    }
    const savedRevealed = localStorage.getItem(`dsa_revealed_quest_${currentUser.id}`);
    if (savedRevealed === activeQuest.leetcode_number) {
      setIsQuestRevealed(true);
    } else {
      setIsQuestRevealed(false);
    }
  }, [activeQuest, currentUser]);

  const getPageNumbers = () => {
    const range: number[] = [];
    const delta = 1;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    const pagesWithEllipsis: (number | string)[] = [];
    let l: number | null = null;

    for (const i of range) {
      if (l !== null) {
        if (i - l === 2) {
          pagesWithEllipsis.push(l + 1);
        } else if (i - l > 2) {
          pagesWithEllipsis.push("...");
        }
      }
      pagesWithEllipsis.push(i);
      l = i;
    }

    return pagesWithEllipsis;
  };

  if (authChecking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#0d0e11] text-neutral-400">
        <RefreshCw className="w-8 h-8 animate-spin text-emerald-400 mb-2" />
        <span className="text-sm font-semibold tracking-wider font-mono">RESTORING ACTIVE PROFILE...</span>
      </div>
    );
  }

  // Route wrapper login check
  if (!currentUser) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#07080a] text-neutral-100 flex flex-col font-sans pb-16">
      
      {/* Dynamic atmospheric subtle grid alignment lights */}
      <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-neutral-900/40 to-transparent pointer-events-none" />
      <div className="absolute top-12 left-1/3 w-[500px] h-32 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* HEADER SECTION */}
      <header className="relative border-b border-neutral-900/90 bg-[#0d0e11]/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo & metadata credit */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-850 flex items-center justify-center text-emerald-400 shadow-inner">
              <Code className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-md font-bold tracking-tight text-white font-sans">DSA Dashboard</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded-md border border-emerald-500/20 font-mono font-semibold uppercase leading-none">
                  Sandbox Active
                </span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1 bg-neutral-950 p-1.5 rounded-xl border border-neutral-850">
            <button
              onClick={() => {
                setActiveTab("roadmap");
                setSelectedProblem(null);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer select-none ${
                activeTab === "roadmap" && !selectedProblem
                  ? "bg-emerald-500 text-neutral-950 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              ROADMAP
            </button>
            <button
              onClick={() => {
                setActiveTab("profile");
                setSelectedProblem(null);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer select-none ${
                activeTab === "profile"
                  ? "bg-emerald-500 text-neutral-950 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              <UserIcon className="w-3.5 h-3.5" />
              PROFILE & STATS
            </button>
          </div>

          {/* Connected User HUD */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 justify-end">
            <div className="bg-neutral-900 border border-neutral-850 rounded-xl px-4 py-2 flex items-center gap-2 shadow-sm">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <div className="text-left leading-none">
                <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest font-mono block">Token Access Key</span>
                <span className="text-xs font-mono font-bold text-neutral-200 tracking-wider">
                  {currentUser.accessCode}
                </span>
              </div>
            </div>

            {dashboardStats && (
              <div className="bg-neutral-900 border border-neutral-850 rounded-xl px-4 py-2 flex items-center gap-2 shadow-sm">
                <Flame className={`w-3.5 h-3.5 ${dashboardStats.streak > 0 ? "text-orange-500 animate-pulse fill-orange-500/10" : "text-neutral-500"}`} />
                <div className="text-left leading-none">
                  <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest font-mono block">Daily Streak</span>
                  <span className="text-xs font-mono font-bold text-neutral-200 tracking-wider flex items-center gap-1">
                    {dashboardStats.streak} {dashboardStats.streak === 1 ? "day" : "days"}
                    {dashboardStats.streak >= 500 ? "🌟" :
                     dashboardStats.streak >= 200 ? "☄️" :
                     dashboardStats.streak >= 100 ? "💥" :
                     dashboardStats.streak >= 50 ? "🔥" :
                     dashboardStats.streak >= 10 ? "⚡" : ""}
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl border border-neutral-850 hover:bg-neutral-900/50 hover:border-red-900/30 text-neutral-400 hover:text-red-400 transition-all cursor-pointer shadow-sm shrink-0"
              title="Logout Session"
              id="logout-action-btn"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* MAIN CONTAINER CONTENT */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 mt-6 md:mt-8 w-full flex-grow">
        
        {/* Loading overlay panel */}
        {dataLoading && !dashboardStats ? (
          <div className="h-96 flex flex-col items-center justify-center text-neutral-500">
            <RefreshCw className="w-10 h-10 animate-spin text-emerald-400 mb-4" />
            <p className="text-sm font-mono tracking-widest uppercase">PULLING HISTORIC PROFILE CHIPS...</p>
          </div>
        ) : selectedProblem && activeProblem ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 max-w-5xl mx-auto"
          >
            {/* Navigation back and quick breadcrumbs */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedProblem(null)}
                className="group inline-flex items-center gap-2 text-xs font-mono font-bold text-neutral-400 hover:text-emerald-400 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                BACK TO ROADMAP
              </button>
              
              <span className="text-[10px] font-mono text-neutral-600 bg-[#0d0e11] px-2.5 py-1 rounded-md border border-neutral-900">
                MODULE: {activeProblem.module.toUpperCase()}
              </span>
            </div>

            {/* Problem Title & Header Row */}
            <div className="glow-card p-6 rounded-2xl border border-neutral-800 bg-[#0d0e12]/60 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] bg-emerald-500/5 pointer-events-none" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-mono text-neutral-500 font-bold">
                      PROBLEM #{activeProblem.leetcode_number}
                    </span>
                    {activeProblem.isCustom && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded border bg-violet-500/10 border-violet-500/30 text-violet-400 uppercase tracking-widest font-mono">
                        Custom
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-white">
                    {activeProblem.title}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-neutral-400 bg-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-850">
                    {activeProblem.category}
                  </span>
                  
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border tracking-wide font-mono ${
                    activeProblem.difficulty === "Easy" ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/5" :
                    activeProblem.difficulty === "Medium" ? "text-amber-400 border-amber-500/20 bg-amber-500/5" :
                    "text-rose-400 border-rose-500/20 bg-rose-500/5"
                  }`}>
                    {activeProblem.difficulty}
                  </span>
                </div>
              </div>
            </div>

            {/* Detailed Body Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Left Column - Description & Quick Actions */}
              <div className="md:col-span-2 space-y-6">
                
                {/* Description Card */}
                <div className="glow-card p-6 rounded-2xl border border-neutral-800 bg-[#0d0e12]/40 space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-neutral-900">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-bold text-neutral-300 font-mono uppercase tracking-wider">
                      Problem Description
                    </h3>
                  </div>
                  
                  <p className="text-sm text-neutral-300 leading-relaxed font-sans whitespace-pre-wrap">
                    {activeProblem.description}
                  </p>
                </div>

                {/* Actions Bar */}
                <div className="glow-card p-6 rounded-2xl border border-neutral-800 bg-[#0d0e12]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <a
                    href={activeProblemExternalLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-neutral-950 text-neutral-300 hover:text-emerald-400 border border-neutral-850 hover:border-neutral-700 transition-all text-xs font-bold font-mono shadow-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    SOLVE ON LEETCODE
                  </a>

                  <button
                    onClick={() => handleToggleProgress(activeProblem.leetcode_number, !activeProblem.is_completed)}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                      activeProblem.is_completed
                        ? "bg-emerald-500/10 border border-emerald-500 text-emerald-400 hover:bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                        : "bg-emerald-500 hover:bg-emerald-400 text-neutral-950 hover:shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                    }`}
                  >
                    <CheckCircle className="w-4 h-4" />
                    {activeProblem.is_completed ? "MARK INCOMPLETE" : "MARK AS SOLVED"}
                  </button>
                </div>

              </div>

              {/* Right Column - Gemini Metadata */}
              <div className="space-y-6">
                
                {/* DSA Topics */}
                <div className="glow-card p-6 rounded-2xl border border-neutral-800 bg-[#0d0e12]/40 space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-neutral-900">
                    <Tag className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-bold text-neutral-300 font-mono uppercase tracking-wider">
                      Topics Covered
                    </h3>
                  </div>

                  {detailsLoading ? (
                    <div className="space-y-2.5 py-1">
                      <div className="h-5 bg-neutral-900/60 rounded-lg animate-pulse w-3/4" />
                      <div className="h-5 bg-neutral-900/60 rounded-lg animate-pulse w-1/2" />
                      <div className="h-5 bg-neutral-900/60 rounded-lg animate-pulse w-2/3" />
                    </div>
                  ) : detailsError ? (
                    <p className="text-xs text-rose-400/80 italic font-mono">{detailsError}</p>
                  ) : detailMetadata && detailMetadata.topics && detailMetadata.topics.length > 0 ? (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {detailMetadata.topics.map((topic, i) => (
                        <span
                          key={i}
                          className="text-xs font-mono px-2.5 py-1 rounded-lg bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/10 hover:border-emerald-500/20 text-emerald-400/90 transition-all hover:scale-105"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-500 italic font-mono">No topic metadata available.</p>
                  )}
                </div>

                {/* Top Companies */}
                <div className="glow-card p-6 rounded-2xl border border-neutral-800 bg-[#0d0e12]/40 space-y-4">
                  <div className="flex items-center gap-2 pb-3 border-b border-neutral-900">
                    <Building2 className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-sm font-bold text-neutral-300 font-mono uppercase tracking-wider">
                      Asked By Companies
                    </h3>
                  </div>

                  {detailsLoading ? (
                    <div className="space-y-2.5 py-1">
                      <div className="h-5 bg-neutral-900/60 rounded-lg animate-pulse w-5/6" />
                      <div className="h-5 bg-neutral-900/60 rounded-lg animate-pulse w-2/3" />
                      <div className="h-5 bg-neutral-900/60 rounded-lg animate-pulse w-3/4" />
                    </div>
                  ) : detailsError ? (
                    <p className="text-xs text-rose-400/80 italic font-mono">{detailsError}</p>
                  ) : detailMetadata && detailMetadata.companies && detailMetadata.companies.length > 0 ? (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {detailMetadata.companies.map((company, i) => (
                        <span
                          key={i}
                          className="text-xs font-mono px-2.5 py-1 rounded-lg bg-neutral-950 border border-neutral-850 hover:border-neutral-700 text-neutral-300 transition-all hover:scale-105"
                        >
                          {company}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-500 italic font-mono">No company metadata available.</p>
                  )}
                </div>

              </div>

            </div>

          </motion.div>
        ) : activeTab === "profile" ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Dashboard Statistics graphs */}
            {dashboardStats && <StatsSection stats={dashboardStats} />}

            {/* Profile Detail Summary Card */}
            <div className="glow-card p-6 rounded-2xl border border-neutral-800 bg-[#0d0e12]/60 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] bg-emerald-500/5 pointer-events-none" />
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-850 flex items-center justify-center text-emerald-400 text-2xl font-mono font-bold shadow-inner select-none">
                  {currentUser.accessCode.substring(0, 2)}
                </div>
                <div className="text-center sm:text-left space-y-1">
                  <h3 className="text-md font-bold text-white font-sans">User Access Token: {currentUser.accessCode}</h3>
                  <p className="text-xs text-neutral-400">Unique user registration hash key: <span className="font-mono font-bold text-neutral-300">{currentUser.id}</span></p>
                  <p className="text-xs text-neutral-500">Sandbox Database Sync: Active and Authenticated via Firestore</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Custom Question form collapsible widget */}
            <CustomQuestionModal
              userId={currentUser.id}
              onQuestionAdded={handleCustomQuestionAdded}
              existingProblems={problems}
            />

            {/* INTERACTIVE NAVIGATION & GRID ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* SIDEBAR NAVIGATION PANE */}
              <div className="lg:col-span-1 space-y-6">
                <CategoryNav
                  problems={problems}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  selectedModule={selectedModule}
                  onSelectModule={setSelectedModule}
                />
              </div>

              {/* CENTRAL MAIN CONTENT ROADMAP LIST */}
              <div className="lg:col-span-3 space-y-6">

                {/* 1. Daily Mystery Quest Card */}
                {activeQuest && (
                  <div className={`glow-card p-5 rounded-2xl border transition-all duration-500 relative overflow-hidden ${
                    isQuestSolvedToday 
                      ? "border-emerald-500/35 bg-emerald-950/5 shadow-[0_0_25px_rgba(16,185,129,0.05)]"
                      : "border-neutral-800 bg-[#0d0e12]/60"
                  }`}>
                    {/* Background glows */}
                    <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] pointer-events-none ${
                      isQuestSolvedToday ? "bg-emerald-500/5" : "bg-orange-500/5"
                    }`} />

                    {isQuestSolvedToday ? (
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                          <CheckCircle className="w-6 h-6 animate-pulse" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">Daily Quest Secured</span>
                            <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20 font-mono">#{activeQuest.leetcode_number}</span>
                          </div>
                          <h4 className="text-sm font-bold text-white mt-1">
                            {activeQuest.title} Completed! 🎉
                          </h4>
                          <p className="text-xs text-neutral-400 mt-1">
                            Your consistency is locked in. Return tomorrow to decode your next challenge node.
                          </p>
                        </div>
                      </div>
                    ) : !isQuestRevealed ? (
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-2">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-[#1c1e24] border border-neutral-800 flex items-center justify-center text-orange-400 shrink-0 shadow-inner">
                            <span className="text-xl font-bold font-mono animate-bounce">?</span>
                          </div>
                          <div className="text-left">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-orange-500">Daily Mystery Quest</span>
                            <h4 className="text-sm font-bold text-white mt-0.5">Decrypt Challenge Node</h4>
                            <p className="text-xs text-neutral-400 mt-0.5 max-w-md font-sans">
                              Unlock today's hidden curriculum task. Follows the sequence roadmap from easy to hard.
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setIsQuestRevealed(true);
                            if (currentUser && activeQuest) {
                              localStorage.setItem(
                                `dsa_revealed_quest_${currentUser.id}`,
                                activeQuest.leetcode_number
                              );
                            }
                          }}
                          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-[#050608] font-bold rounded-xl text-xs transition-all hover:shadow-[0_0_15px_rgba(16,185,129,0.25)] cursor-pointer select-none shrink-0"
                        >
                          Reveal Mystery Quest
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4 pb-3 border-b border-neutral-900">
                          <div>
                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">Daily Challenge Unlocked</span>
                            <h4 className="text-md font-bold text-white mt-0.5 flex items-center gap-2">
                              #{activeQuest.leetcode_number} - {activeQuest.title}
                            </h4>
                          </div>
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                            activeQuest.difficulty === "Easy" ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/5" :
                            activeQuest.difficulty === "Medium" ? "text-amber-400 border-amber-500/20 bg-amber-500/5" :
                            "text-rose-400 border-rose-500/20 bg-rose-500/5"
                          }`}>
                            {activeQuest.difficulty}
                          </span>
                        </div>

                        <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                          {activeQuest.description}
                        </p>

                        <div className="flex items-center justify-between gap-4 pt-1">
                          <a
                            href={
                              /^\d+$/.test(activeQuest.leetcode_number)
                                ? `https://leetcode.com/problems/${activeQuest.title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")}/`
                                : `https://www.google.com/search?q=LeetCode+${activeQuest.leetcode_number}`
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-emerald-400 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Open on LeetCode
                          </a>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedProblem(activeQuest)}
                              className="inline-flex items-center gap-1.5 px-3 py-2 bg-neutral-900 border border-neutral-850 hover:border-neutral-700 text-neutral-400 hover:text-white font-bold rounded-xl text-xs transition-all cursor-pointer shadow-sm"
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              View Details
                            </button>

                            <button
                              type="button"
                              onClick={() => handleToggleProgress(activeQuest.leetcode_number, true)}
                              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500/10 border border-emerald-500 hover:bg-emerald-500 text-emerald-400 hover:text-[#050608] font-bold rounded-xl text-xs transition-all cursor-pointer"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              Mark Solved
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Search & Filter bar widget */}
                <div className="glow-card p-4 rounded-xl border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
                  
                  {/* Search field */}
                  <div className="relative w-full md:max-w-md shrink-0">
                    <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="text"
                      placeholder="Search title, description, or id..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-850 rounded-lg pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Difficulty Filters pill row */}
                  <div className="flex items-center gap-2.5 w-full md:w-auto justify-end overflow-x-auto select-none">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 flex items-center gap-1">
                      <Filter className="w-3 h-3" /> Filters:
                    </span>
                    {(["All", "Easy", "Medium", "Hard"] as const).map((diff) => (
                      <button
                        key={diff}
                        onClick={() => setSelectedDifficulty(diff)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg font-mono transition-all border cursor-pointer shrink-0 ${
                          selectedDifficulty === diff
                            ? diff === "All"
                              ? "bg-neutral-100 text-neutral-950 border-neutral-100"
                              : diff === "Easy"
                              ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                              : diff === "Medium"
                              ? "bg-amber-500/10 border-amber-500 text-amber-400"
                              : "bg-rose-500/10 border-rose-500 text-rose-400"
                            : "bg-neutral-950 hover:bg-neutral-900 text-neutral-400 border-neutral-850 hover:border-neutral-700"
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>

                </div>

                {/* Question items results container */}
                <div className="space-y-3" id="problems-scroll-viewport">
                  {filteredProblems.length === 0 ? (
                    <div className="glow-card p-12 rounded-xl border border-neutral-800 text-center text-neutral-500 flex flex-col items-center justify-center space-y-3">
                      <HelpCircle className="w-8 h-8 text-neutral-600" />
                      <div>
                        <h4 className="text-sm font-semibold text-neutral-300">No matching questions found</h4>
                        <p className="text-xs text-neutral-500 max-w-sm mt-1">
                          Try adjusting search keywords, clear category selections, or create a custom problem above.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <AnimatePresence mode="popLayout">
                      {paginatedProblems.map((prob) => (
                        <ProblemCard
                          key={prob.leetcode_number}
                          problem={prob}
                          onToggleProgress={handleToggleProgress}
                          onSelect={setSelectedProblem}
                        />
                      ))}
                    </AnimatePresence>
                  )}
                </div>

                {/* Pagination Controls */}
                {filteredProblems.length > 0 && totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-neutral-800 bg-[#0d0e11]/30 backdrop-blur-sm mt-4 select-none">
                    <span className="text-xs text-neutral-400 font-mono">
                      Showing <span className="text-emerald-400 font-bold">{startIndex + 1}</span> to{" "}
                      <span className="text-emerald-405 font-bold">
                        {Math.min(startIndex + ITEMS_PER_PAGE, filteredProblems.length)}
                      </span>{" "}
                      of <span className="text-white font-bold">{filteredProblems.length}</span> questions
                    </span>

                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg bg-neutral-950 hover:bg-neutral-900 border border-neutral-850 hover:border-neutral-700 text-neutral-400 disabled:opacity-30 disabled:hover:border-neutral-850 disabled:cursor-not-allowed transition-all cursor-pointer"
                        title="Previous Page"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {/* Numbered Page Buttons with Ellipses */}
                      {getPageNumbers().map((page, idx) => {
                        if (page === "...") {
                          return (
                            <span
                              key={`ellipsis-${idx}`}
                              className="px-2 text-xs font-mono text-neutral-600 select-none"
                            >
                              ...
                            </span>
                          );
                        }
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(Number(page))}
                            className={`w-8 h-8 rounded-lg text-xs font-semibold font-mono border transition-all cursor-pointer ${
                              currentPage === page
                                ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold"
                                : "bg-neutral-950 hover:bg-neutral-900 text-neutral-400 border-neutral-850 hover:border-neutral-700"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}

                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg bg-neutral-950 hover:bg-neutral-900 border border-neutral-850 hover:border-neutral-700 text-neutral-400 disabled:opacity-30 disabled:hover:border-neutral-850 disabled:cursor-not-allowed transition-all cursor-pointer"
                        title="Next Page"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </>
        )}
        
      </main>
    </div>
  );
}
