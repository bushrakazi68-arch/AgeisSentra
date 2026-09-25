import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, ArrowRight, Eye, Zap, Lock, Ghost, Activity, Sun, Moon } from "lucide-react";

const features = [
  { icon: Eye,      label: "Real-time Monitoring" },
  { icon: Shield,   label: "Dynamic Trust Score" },
  { icon: Zap,      label: "Contamination Tracing" },
  { icon: Lock,     label: "Prompt Injection Defense" },
  { icon: Ghost,    label: "Red Agent Simulation" },
  { icon: Activity, label: "Behavioral Fingerprinting" },
];

const agentPreviews = [
  { name: "RECON",   role: "Data Fetcher",  trust: 95, status: "RUNNING",    color: "#8B5CF6" },
  { name: "SAGE",    role: "Summarizer",    trust: 45, status: "SUSPICIOUS", color: "#D946EF" },
  { name: "ECHO",    role: "Reporter",      trust: 78, status: "CAUTIOUS",   color: "#A855F7" },
];

const statusColor = { RUNNING: "#34d399", SUSPICIOUS: "#fb923c", CAUTIOUS: "#facc15" };

export default function Landing({ dark, setDark }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen dark:bg-[#0d0618] bg-purple-50 overflow-x-hidden">

      {/* Dot grid bg */}
      <div className="fixed inset-0 dot-grid opacity-40 pointer-events-none" />

      {/* Animated blobs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="fixed top-[-200px] left-[-200px] w-[700px] h-[700px] rounded-full
          dark:bg-purple-700/20 bg-purple-300/40 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="fixed bottom-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full
          dark:bg-fuchsia-700/20 bg-fuchsia-300/30 blur-3xl pointer-events-none"
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-50 flex items-center justify-between px-8 py-5
          dark:bg-[#0d0618]/60 bg-purple-50/60 backdrop-blur-xl
          border-b dark:border-purple-800/30 border-purple-200"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600
              flex items-center justify-center purple-glow-sm cursor-pointer"
          >
            <span className="text-white font-bold">Æ</span>
          </motion.div>
          <span className="text-xl font-bold dark:text-white text-purple-950 tracking-tight">
            Aegis<span className="text-purple-500">Sentra</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-emerald-500"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            System Active
          </motion.div>

          {/* Dark / Light toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setDark(!dark)}
            className="w-9 h-9 flex items-center justify-center rounded-xl
              dark:bg-purple-800/40 bg-purple-100
              dark:text-purple-300 text-purple-600
              dark:hover:bg-purple-700/50 hover:bg-purple-200 transition-colors"
          >
            <motion.div
              key={dark ? "sun" : "moon"}
              initial={{ rotate: -30, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </motion.div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 rounded-xl text-sm font-semibold
              bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white
              hover:from-purple-500 hover:to-fuchsia-500
              shadow-lg shadow-purple-500/20 transition-all"
          >
            Dashboard →
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero */}
      <main className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-16">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-8
            dark:bg-purple-800/50 bg-purple-100
            dark:text-purple-300 text-purple-700
            border dark:border-purple-700/50 border-purple-300"
        >
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
          />
          Runtime Integrity System — Active
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-serif-display font-bold mb-6 leading-tight
            dark:text-white text-purple-950"
          style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
        >
          The Shield for<br />
          <span className="gradient-text font-serif-display font-bold">Autonomous Agents</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="font-handwriting text-2xl dark:text-purple-300 text-purple-600 max-w-xl mb-10 leading-relaxed"
        >
          AegisSentra monitors every action your AI agents take in real time —
          verifying, blocking, and tracing threats before damage is done.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 items-center mb-20"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(147,51,234,0.5)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold
              bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white
              shadow-lg shadow-purple-500/30 transition-all"
          >
            Enter AEGIS <ArrowRight size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/agent/recon")}
            className="px-8 py-4 rounded-2xl text-base font-semibold
              dark:border border-purple-600/50 dark:text-purple-300 text-purple-700
              dark:hover:bg-purple-800/30 hover:bg-purple-100 transition-all"
          >
            View Agents
          </motion.button>
        </motion.div>

        {/* Agent preview cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 mb-20 w-full max-w-2xl"
        >
          {agentPreviews.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              whileHover={{ y: -6, boxShadow: "0 12px 40px rgba(139,92,246,0.2)" }}
              onClick={() => navigate(`/agent/${agent.name.toLowerCase()}`)}
              className="flex-1 rounded-2xl p-4 cursor-pointer transition-all
                dark:bg-purple-900/40 bg-white
                border dark:border-purple-700/40 border-purple-200 relative overflow-hidden"
            >
              <div className="scan-line" />
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold dark:text-white text-purple-900">{agent.name}</span>
                <span className="flex items-center gap-1.5 text-xs font-medium"
                  style={{ color: statusColor[agent.status] }}>
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: statusColor[agent.status] }}
                  />
                  {agent.status}
                </span>
              </div>
              <p className="text-xs dark:text-purple-400 text-purple-500 mb-3">{agent.role}</p>
              {/* Mini trust bar */}
              <div className="h-1.5 rounded-full dark:bg-purple-800/50 bg-purple-100 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${agent.trust}%` }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: agent.color }}
                />
              </div>
              <p className="text-right text-xs mt-1 font-semibold" style={{ color: agent.color }}>
                {agent.trust}/100
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {features.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.07 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm
                dark:bg-purple-900/50 bg-white
                dark:text-purple-300 text-purple-700
                border dark:border-purple-700/40 border-purple-200
                shadow-sm cursor-default"
            >
              <Icon size={15} className="text-purple-500" />
              {label}
            </motion.div>
          ))}
        </motion.div>
      </main>

      <footer className="relative z-10 text-center py-6 text-xs dark:text-purple-700 text-purple-400">
        AegisSentra · Runtime Integrity for Autonomous Agents
      </footer>
    </div>
  );
}
