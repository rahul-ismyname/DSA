import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Code, Key, Sparkles, RefreshCw, AlertCircle } from "lucide-react";
import { User } from "../types";

interface LoginProps {
  onLoginSuccess: (user: User, rememberMe: boolean) => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginProps) {
  const [accessCode, setAccessCode] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateRandomCode = () => {
    let result = "";
    for (let i = 0; i < 4; i++) {
      result += Math.floor(Math.random() * 10).toString();
    }
    setAccessCode(result);
    setError(null);
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!accessCode.trim()) {
      setError("Please enter or generate an Access Code");
      return;
    }

    const cleaned = accessCode.trim();
    if (!/^\d{4}$/.test(cleaned)) {
      setError("Access code must be exactly 4 digits (e.g., 5821)");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessCode: cleaned }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      onLoginSuccess(data, rememberMe);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#050608] text-neutral-100 overflow-hidden relative select-none">
      
      {/* Decorative Radial Grid / Ambient Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0e12_1px,transparent_1px),linear-gradient(to_bottom,#0c0e12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-violet-500/5 blur-[150px] rounded-full pointer-events-none" />

      {/* LEFT SIDE: Atmospheric Brand Section */}
      <div className="hidden lg:flex lg:col-span-7 flex-col justify-between p-16 relative z-10 border-r border-neutral-900/60 bg-gradient-to-br from-[#07090d]/80 via-[#050608]/40 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-center text-emerald-400 shadow-lg">
            <Code className="w-5 h-5 stroke-[2]" />
          </div>
          <span className="text-sm font-bold tracking-wider font-mono text-neutral-400 uppercase">DSA Roadmap</span>
        </div>

        <div className="space-y-6 max-w-lg my-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-extrabold tracking-tight text-white leading-tight font-sans"
          >
            Master the core patterns.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-neutral-400 leading-relaxed font-sans"
          >
            Track your progress across curated topics, document custom problems, and visualize stats in an interactive workspace.
          </motion.p>
        </div>

        <div className="text-xs text-neutral-600 font-mono tracking-widest uppercase">
          SECURE SANDBOX ENVIRONMENT v1.0
        </div>
      </div>

      {/* RIGHT SIDE: Authentication Form Section */}
      <div className="lg:col-span-5 flex items-center justify-center p-8 lg:p-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Logo/Branding on Mobile */}
          <div className="lg:hidden flex flex-col items-center text-center space-y-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-emerald-400 shadow-md">
              <Code className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white font-sans">DSA Roadmap</h1>
              <p className="text-sm text-neutral-400 mt-1">Master the core patterns.</p>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight text-white font-sans hidden lg:block">Welcome</h2>
            <p className="text-sm text-neutral-400">Enter access key to boot your progression dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="access-code" className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 font-mono flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-neutral-500" /> Access Key
                </label>
                <button
                  type="button"
                  onClick={generateRandomCode}
                  className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 font-mono hover:underline cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Auto Generate
                </button>
              </div>

              <input
                id="access-code"
                type="text"
                placeholder="E.G. 5821"
                value={accessCode}
                onChange={(e) => {
                  setAccessCode(e.target.value);
                  setError(null);
                }}
                className="w-full bg-[#0d0e12]/80 border border-neutral-800 rounded-xl px-4 py-3.5 text-white placeholder-neutral-700 focus:outline-none focus:border-emerald-500 font-mono tracking-widest text-center text-lg shadow-inner focus:ring-1 focus:ring-emerald-500/20"
                autoComplete="off"
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-800 bg-[#0d0e12] focus:ring-opacity-0 text-emerald-500 accent-emerald-500 cursor-pointer"
                />
                <span className="text-xs text-neutral-400 font-sans">Remember this session</span>
              </label>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2.5 p-3.5 bg-red-950/20 border border-red-900/40 text-red-400 rounded-xl text-xs"
              >
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span className="leading-relaxed">{error}</span>
              </motion.div>
            )}

            <button
              id="login-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] disabled:bg-neutral-900 disabled:text-neutral-600 disabled:shadow-none text-[#050608] font-bold rounded-xl transition-all font-sans cursor-pointer text-sm tracking-wide"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Booting Dashboard...
                </>
              ) : (
                "Access Dashboard"
              )}
            </button>
          </form>
        </motion.div>
      </div>

    </div>
  );
}
