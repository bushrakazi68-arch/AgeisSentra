import { useNavigate } from "react-router-dom";
import { Shield, ArrowRight, Eye, Zap, Lock, Moon, Sun } from "lucide-react";

export default function Landing({ dark, setDark }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen dark:bg-purple-950 bg-purple-50 flex flex-col overflow-hidden relative">

      {/* Background blobs */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full
        dark:bg-purple-700/20 bg-purple-300/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full
        dark:bg-fuchsia-700/20 bg-fuchsia-300/30 blur-3xl pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600
            flex items-center justify-center purple-glow-sm">
            <span className="text-white font-bold">Æ</span>
          </div>
          <span className="text-xl font-bold dark:text-white text-purple-900 tracking-tight">
            Aegis<span className="text-purple-500">Sentra</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setDark(!dark)}
            className="dark:text-purple-400 text-purple-600 hover:text-purple-500 transition-colors">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 rounded-xl text-sm font-medium
              dark:bg-purple-800/50 bg-purple-100
              dark:text-purple-200 text-purple-700
              dark:hover:bg-purple-700 hover:bg-purple-200 transition-all">
            Dashboard
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8
          dark:bg-purple-800/50 bg-purple-100
          dark:text-purple-300 text-purple-700
          border dark:border-purple-700/50 border-purple-200">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Runtime Integrity System — Active
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight
          dark:text-white text-purple-950">
          The Shield for<br />
          <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            Autonomous Agents
          </span>
        </h1>

        <p className="text-lg dark:text-purple-300 text-purple-600 max-w-xl mb-10 leading-relaxed">
          AegisSentra monitors every action your AI agents take in real time —
          verifying, blocking, and tracing threats before damage is done.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-7 py-3.5 rounded-2xl text-base font-semibold
              bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white
              hover:from-purple-500 hover:to-fuchsia-500
              transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50
              hover:scale-105 active:scale-95">
            Enter AEGIS <ArrowRight size={18} />
          </button>
          <button
            onClick={() => navigate("/agent/recon")}
            className="px-7 py-3.5 rounded-2xl text-base font-semibold
              dark:border border-purple-600 dark:text-purple-300 text-purple-700
              dark:hover:bg-purple-800/40 hover:bg-purple-100
              transition-all">
            View Agents
          </button>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-16">
          {[
            { icon: Eye,    label: "Real-time Monitoring" },
            { icon: Shield, label: "Dynamic Trust Score" },
            { icon: Zap,    label: "Contamination Tracing" },
            { icon: Lock,   label: "Prompt Injection Defense" },
          ].map(({ icon: Icon, label }) => (
            <div key={label}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm
                dark:bg-purple-900/50 bg-white
                dark:text-purple-300 text-purple-700
                border dark:border-purple-700/40 border-purple-200
                dark:shadow-none shadow-sm">
              <Icon size={15} className="text-purple-500" />
              {label}
            </div>
          ))}
        </div>
      </main>

      {/* Bottom */}
      <footer className="relative z-10 text-center py-6
        text-xs dark:text-purple-600 text-purple-400">
        RepoForge 2026 · PS002 · AegisSentra
      </footer>
    </div>
  );
}
