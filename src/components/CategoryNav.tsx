import { useState } from "react";
import { motion } from "motion/react";
import { Layers, ChevronRight, GraduationCap, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Problem } from "../types";

interface CategoryNavProps {
  problems: Problem[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  selectedModule: string | null;
  onSelectModule: (module: string | null) => void;
}

export const MODULES_MAP = {
  Beginner: ["Arrays", "Strings", "Two Pointers", "Stacks & Queues"],
  Intermediate: ["Sliding Window", "Linked Lists", "Trees & BST", "Graphs"],
  Advanced: ["Heaps / Priority Queues", "Recursion & Backtracking", "Dynamic Programming", "Tries"],
};

export default function CategoryNav({
  problems,
  selectedCategory,
  onSelectCategory,
  selectedModule,
  onSelectModule,
}: CategoryNavProps) {
  
  // Calculate completion counts per category in real-time
  const getCategoryStats = (cat: string) => {
    const subset = problems.filter((p) => p.category === cat);
    const total = subset.length;
    const completed = subset.filter((p) => p.is_completed).length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, pct };
  };

  const getModuleStats = (mod: keyof typeof MODULES_MAP) => {
    const subset = problems.filter((p) => p.module === mod);
    const total = subset.length;
    const completed = subset.filter((p) => p.is_completed).length;
    return { completed, total };
  };

  const [isOpenMobile, setIsOpenMobile] = useState(false);

  return (
    <div className="space-y-4" id="category-navigation-panel">
      {/* Mobile Filter Toggle Header Button */}
      <button
        type="button"
        onClick={() => setIsOpenMobile(!isOpenMobile)}
        className="w-full lg:hidden flex items-center justify-between p-3.5 rounded-xl border border-neutral-800 bg-[#0d0e11]/90 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-neutral-400 font-mono shadow-sm cursor-pointer select-none"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-400" />
          Syllabus & Filters
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-sans normal-case">
            {selectedCategory
              ? selectedCategory
              : selectedModule
              ? `${selectedModule} Tier`
              : "Full Syllabus"}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 text-neutral-500 transition-transform duration-200 ${isOpenMobile ? "rotate-180" : ""}`} />
        </div>
      </button>

      {/* Collapsible Content wrapper */}
      <div className={`${isOpenMobile ? "block" : "hidden"} lg:block space-y-6`}>
        {/* Module Overview selectors */}
        <div className="space-y-2">
          <span className="text-xs font-semibold tracking-widest text-neutral-400 uppercase font-mono block mb-1">
            Syllabus Milestones
          </span>
          
          <div className="grid grid-cols-1 gap-2.5">
            {/* "Show All" toggle */}
            <button
              onClick={() => {
                onSelectModule(null);
                onSelectCategory(null);
                setIsOpenMobile(false);
              }}
              className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                selectedModule === null && selectedCategory === null
                  ? "bg-emerald-500/10 border-emerald-500 text-white font-medium"
                  : "bg-neutral-900/30 border-neutral-800 hover:border-neutral-700 text-neutral-400"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 shrink-0 text-emerald-400" />
                <span className="text-sm">Complete Syllabus Road</span>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-neutral-950 border border-neutral-850">
                {problems.length} Nodes
              </span>
            </button>

            {/* Module specific items */}
            {(Object.keys(MODULES_MAP) as Array<keyof typeof MODULES_MAP>).map((mod) => {
              const stats = getModuleStats(mod);
              const isSelected = selectedModule === mod;

              return (
                <div
                  key={mod}
                  className={`rounded-xl border transition-all ${
                    isSelected
                      ? "bg-[#111317] border-neutral-700/80 p-3.5"
                      : "bg-neutral-900/30 border-neutral-850 p-3"
                  }`}
                >
                  {/* Module Header click */}
                  <button
                    onClick={() => {
                      const nextVal = isSelected ? null : mod;
                      onSelectModule(nextVal);
                      onSelectCategory(null); // Reset category filter
                    }}
                    className="w-full flex items-center justify-between transition-colors focus:outline-none text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <GraduationCap
                        className={`w-4 h-4 shrink-0 ${
                          isSelected ? "text-emerald-400 animate-pulse" : "text-neutral-500"
                        }`}
                      />
                      <span className={`text-sm font-semibold text-white ${isSelected ? "text-emerald-400" : ""}`}>
                        {mod} Tier
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-neutral-400 font-bold px-2 py-0.5 bg-neutral-950 rounded border border-neutral-850">
                        {stats.completed}/{stats.total} Done
                      </span>
                      <ChevronRight
                        className={`w-3.5 h-3.5 text-neutral-500 transition-transform ${
                          isSelected ? "rotate-90 text-emerald-400" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {/* Categories belonging to this module */}
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 pt-2 border-t border-neutral-900/80 space-y-1"
                    >
                      {MODULES_MAP[mod].map((cat) => {
                        const catStats = getCategoryStats(cat);
                        const isCatSelected = selectedCategory === cat;

                        return (
                          <button
                            key={cat}
                            onClick={() => {
                              onSelectCategory(isCatSelected ? null : cat);
                              setIsOpenMobile(false); // Close mobile drawer when category selected
                            }}
                            className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-all flex flex-col gap-1.5 cursor-pointer ${
                              isCatSelected
                                ? "bg-neutral-950 border border-emerald-500/45 text-white"
                                : "hover:bg-neutral-900 text-neutral-400 border border-transparent"
                            }`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className={isCatSelected ? "font-bold text-emerald-400" : ""}>
                                {cat}
                              </span>
                              <span className="text-[10px] text-neutral-500 font-mono">
                                {catStats.completed}/{catStats.total}
                              </span>
                            </div>

                            {/* Progress bar under individual category */}
                            <div className="w-full h-1 bg-neutral-950 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-emerald-500 transition-all duration-300"
                                style={{ width: `${catStats.pct}%` }}
                              />
                            </div>
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
