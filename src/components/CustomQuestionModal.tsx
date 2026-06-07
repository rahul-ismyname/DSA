import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, X, Tag, FileText, Bookmark, Info, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Problem, DifficultyLevel } from "../types";

interface CustomQuestionProps {
  userId: number;
  onQuestionAdded: (question: Problem) => void;
  existingProblems?: Problem[];
}

export const CATEGORIES = [
  "Arrays",
  "Strings",
  "Two Pointers",
  "Sliding Window",
  "Stacks & Queues",
  "Linked Lists",
  "Trees & BST",
  "Graphs",
  "Heaps / Priority Queues",
  "Recursion & Backtracking",
  "Dynamic Programming",
  "Tries",
];

export default function CustomQuestionModal({ userId, onQuestionAdded, existingProblems }: CustomQuestionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [leetcodeNumber, setLeetcodeNumber] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("Medium");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Live duplicate detector
  const trimmedNum = leetcodeNumber.trim();
  const matchedDuplicate = trimmedNum
    ? existingProblems?.find((p) => p.leetcode_number.toLowerCase() === trimmedNum.toLowerCase())
    : null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!leetcodeNumber.trim()) {
      setError("Please specify a LeetCode problem ID or Number.");
      return;
    }

    if (matchedDuplicate) {
      setError(`LeetCode Number #${trimmedNum} already exists in your roadmap ("${matchedDuplicate.title}").`);
      return;
    }

    setSaving(true);
    setError(null);

    // Auto-fill defaults if fields left empty
    const finalTitle = title.trim() || `LeetCode #${leetcodeNumber.trim()}`;
    const finalDescription = description.trim() || `Solve LeetCode problem #${leetcodeNumber.trim()} to reinforce your standard DSA patterns.`;

    try {
      const res = await fetch("/api/custom-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          leetcodeNumber: leetcodeNumber.trim(),
          title: finalTitle,
          description: finalDescription,
          difficulty,
          category,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create custom question");
      }

      onQuestionAdded(data.question);
      
      // Reset form
      setLeetcodeNumber("");
      setTitle("");
      setDescription("");
      setDifficulty("Medium");
      setCategory(CATEGORIES[0]);
      setIsOpen(false);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred saving custom question");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`mb-6 font-sans border rounded-2xl transition-all duration-300 bg-[#0d0e12]/40 ${
      isOpen ? "border-neutral-800 p-5" : "border-neutral-900/60 hover:border-neutral-800/60 p-4"
    }`}>
      {/* Accordion header row */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-neutral-950/60 border border-neutral-850 flex items-center justify-center text-emerald-400">
            <Bookmark className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
              Curriculum Navigator
              {!isOpen && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded border bg-neutral-950 border-neutral-850 text-neutral-500 font-sans tracking-normal capitalize font-normal">
                  Click to add custom problem
                </span>
              )}
            </h4>
            {isOpen && (
              <p className="text-xs text-neutral-400 mt-1 font-sans leading-none">
                Crystallize your progress by checking off tasks or scaling topics.
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          className="p-1 rounded-lg bg-neutral-950 text-neutral-500 border border-neutral-900 transition-colors"
        >
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden mt-4 pt-4 border-t border-neutral-900/80"
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-4 text-left"
              id="custom-problem-form"
            >
              {/* Duplicate alert banner */}
              {matchedDuplicate && (
                <div className="flex items-center gap-2.5 p-3.5 bg-amber-950/20 border border-amber-900/50 text-amber-300 rounded-xl text-xs leading-normal">
                  <Info className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold">⚠️ Already in Roadmap: </span>
                    <span>Problem #{trimmedNum} exists as <strong className="text-white">"{matchedDuplicate.title}"</strong> under category <strong className="text-white">"{matchedDuplicate.category}"</strong>. Adding duplicates is disabled.</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* ID or Number */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-400 font-mono uppercase tracking-wider flex items-center gap-1">
                    <HelpCircle className="w-3 h-3" /> Question ID / Number
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. 500 or C1"
                    value={leetcodeNumber}
                    onChange={(e) => setLeetcodeNumber(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 font-mono text-sm"
                  />
                </div>

                {/* Title */}
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-neutral-400 font-mono uppercase tracking-wider flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3 h-3" /> Problem Title
                    </span>
                    <span className="text-[10px] text-neutral-500 font-sans italic lowercase">Optional: defaults to LeetCode #{leetcodeNumber || "Num"}</span>
                  </label>
                  <input
                    type="text"
                    placeholder="E.g. Find Max Subarray K"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 text-sm"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-400 font-mono uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3 h-3" /> Description
                  </span>
                  <span className="text-[10px] text-neutral-500 font-sans italic lowercase">Optional: defaults to generic problem prompt</span>
                </label>
                <input
                  type="text"
                  placeholder="E.g. Leverage a sliding window sliding pointers left and right to compute maximal value."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-white placeholder-neutral-600 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category dropdown */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-400 font-mono uppercase tracking-wider">
                    Target Category taxonomy
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2.5 text-neutral-300 focus:outline-none focus:border-emerald-500 text-xs"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty selectors */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-400 font-mono uppercase tracking-wider block mb-1">
                    Difficulty level
                  </label>
                  <div className="flex gap-2">
                    {(["Easy", "Medium", "Hard"] as const).map((diff) => (
                      <button
                        key={diff}
                        type="button"
                        onClick={() => setDifficulty(diff)}
                        className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                          difficulty === diff
                            ? diff === "Easy"
                              ? "bg-emerald-500/15 border-emerald-500 text-emerald-400"
                              : diff === "Medium"
                              ? "bg-amber-500/15 border-amber-500 text-amber-400"
                              : "bg-rose-500/15 border-rose-500 text-rose-400"
                            : "bg-neutral-950 border-neutral-850 hover:border-neutral-700 text-neutral-400"
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Feedback validation */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-950/20 border border-red-900/50 text-red-400 rounded-xl text-xs">
                  <Info className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-900">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg bg-neutral-950 hover:bg-neutral-900 text-neutral-400 border border-neutral-900 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  id="submit-custom-quest-btn"
                  type="submit"
                  disabled={saving || !!matchedDuplicate}
                  className={`px-5 py-2 rounded-lg text-neutral-950 text-xs font-bold tracking-wide transition-all cursor-pointer ${
                    saving || !!matchedDuplicate
                      ? "bg-neutral-800 text-neutral-600 border border-neutral-800 cursor-not-allowed"
                      : "bg-emerald-500 hover:bg-emerald-400"
                  }`}
                >
                  {saving ? "Saving question..." : !title.trim() && !description.trim() ? "⚡ Quick Add Node" : "Insert into My Roadmap"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
