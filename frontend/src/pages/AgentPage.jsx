import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TrustMeter from "../components/TrustMeter";
import AuditLog from "../components/AuditLog";
import { agents, auditLog } from "../data/mockData";
import { ArrowLeft, Activity, XCircle, Clock, Zap, Shield } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";

const statusConfig = {
  RUNNING:    { dot: "bg-emerald-400", badge: "bg-emerald-500/20 text-emerald-400" },
  SUSPICIOUS: { dot: "bg-orange-400",  badge: "bg-orange-500/20 text-orange-400" },
  CAUTIOUS:   { dot: "bg-yellow-400",  badge: "bg-yellow-500/20 text-yellow-400" },
  HALTED:     { dot: "bg-red-500",     badge: "bg-red-500/20 text-red-400" },
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: "easeOut" },
});

export default function AgentPage({ dark, setDark }) {
  const { name } = useParams();
  const navigate = useNavigate();
  const agent = agents[name];

  if (!agent) return (
    <div className="min-h-screen dark:bg-[#0d0618] bg-purple-50 flex items-center justify-center">
      <div className="text-center">
        <p className="dark:text-purple-300 text-purple-600">Agent not found</p>
        <button onClick={() => navigate("/dashboard")}
          className="mt-4 text-purple-500 hover:text-purple-400 text-sm">← Back</button>
      </div>
    </div>
  );

  const sc = statusConfig[agent.status] || statusConfig.RUNNING;
  const chartData = agent.history.map((v, i) => ({ time: `T-${6 - i}`, score: v }));
  const agentLog = auditLog.filter(e => e.agent === agent.name);

  const infoCards = [
    { label: "Actions Today", value: agent.actionsToday, icon: Activity, color: "text-purple-400",  bg: "dark:bg-purple-800/50 bg-purple-100" },
    { label: "Blocked Today", value: agent.blockedToday, icon: XCircle,  color: "text-red-400",     bg: "dark:bg-red-900/40 bg-red-50" },
    { label: "Uptime",        value: agent.uptime,       icon: Clock,    color: "text-emerald-400", bg: "dark:bg-emerald-900/40 bg-emerald-50" },
    { label: "Trust Score",   value: agent.trust,        icon: Zap,      color: "text-fuchsia-400", bg: "dark:bg-fuchsia-900/40 bg-fuchsia-50" },
  ];

  return (
    <div className="min-h-screen dark:bg-[#0d0618] bg-purple-50 dark:text-white text-purple-950">
      <div className="fixed inset-0 dot-grid opacity-30 pointer-events-none" />
      <Sidebar dark={dark} setDark={setDark} />

      <div className="ml-16 flex flex-col min-h-screen">
        <Navbar dark={dark} setDark={setDark} />

        <main className="flex-1 p-6 max-w-5xl mx-auto w-full">

          {/* Back */}
          <motion.button
            {...fadeUp(0)}
            whileHover={{ x: -3 }}
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-sm dark:text-purple-400 text-purple-500
              hover:text-purple-400 mb-6 transition-colors"
          >
            <ArrowLeft size={15} /> Back to AEGIS
          </motion.button>

          {/* Agent hero card */}
          <motion.div
            {...fadeUp(0.1)}
            className="rounded-2xl p-6 mb-6 border dark:border-purple-700/40 border-purple-200
              dark:bg-purple-900/30 bg-white relative overflow-hidden"
          >
            {/* Decorative glow blob */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute top-[-80px] right-[-80px] w-64 h-64 rounded-full blur-3xl pointer-events-none"
              style={{ background: agent.accent }}
            />

            {/* Scan line */}
            <div className="scan-line" />

            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
              style={{ background: `linear-gradient(to bottom, ${agent.accent}, transparent)` }} />

            <div className="flex items-start justify-between gap-6 relative z-10 pl-3">
              <div className="flex-1">
                {/* Avatar */}
                <motion.div
                  animate={{ boxShadow: [`0 0 15px ${agent.accent}40`, `0 0 35px ${agent.accent}70`, `0 0 15px ${agent.accent}40`] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center text-2xl font-black text-white"
                  style={{ background: `linear-gradient(135deg, ${agent.accent}, #d946ef)` }}
                >
                  {agent.name[0]}
                </motion.div>

                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <h1 className="text-3xl font-extrabold dark:text-white text-purple-950 tracking-tight">
                    {agent.name}
                  </h1>
                  <motion.span
                    animate={{ opacity: [1, 0.7, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1.5 ${sc.badge}`}
                  >
                    <span className={`agent-status-dot ${sc.dot}`} />
                    {agent.status}
                  </motion.span>
                </div>

                <p className="dark:text-purple-300 text-purple-600 mb-2 font-medium">{agent.role}</p>
                <p className="text-sm dark:text-purple-400 text-purple-500 max-w-md leading-relaxed">
                  {agent.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {agent.tags.map(tag => (
                    <motion.span
                      key={tag}
                      whileHover={{ scale: 1.05 }}
                      className="text-xs px-3 py-1 rounded-xl cursor-default
                        dark:bg-purple-800/50 bg-purple-100
                        dark:text-purple-300 text-purple-700 font-medium"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Trust meter */}
              <div className="flex flex-col items-center gap-2 shrink-0">
                <TrustMeter score={agent.trust} size="lg" />
                <span className="text-xs dark:text-purple-500 text-purple-400">Trust Score</span>
              </div>
            </div>

            {/* Last action */}
            <div className="mt-5 pt-4 border-t dark:border-purple-800/30 border-purple-100 relative z-10 pl-3">
              <span className="text-xs dark:text-purple-500 text-purple-400 mr-2">Last action:</span>
              <code className="text-xs dark:bg-purple-800/60 bg-purple-100
                dark:text-purple-200 text-purple-700 px-2 py-1 rounded-lg font-mono">
                {agent.lastAction}
              </code>
            </div>
          </motion.div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {infoCards.map(({ label, value, icon: Icon, color, bg }, i) => (
              <motion.div
                key={label}
                {...fadeUp(0.2 + i * 0.07)}
                whileHover={{ y: -3, boxShadow: "0 8px 30px rgba(139,92,246,0.15)" }}
                className="rounded-2xl p-4 border dark:border-purple-800/30 border-purple-200
                  dark:bg-purple-900/30 bg-white text-center relative overflow-hidden"
              >
                <div className="scan-line" />
                <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mx-auto mb-2`}>
                  <Icon size={18} className={color} />
                </div>
                <p className="text-2xl font-bold dark:text-white text-purple-900">{value}</p>
                <p className="text-xs dark:text-purple-400 text-purple-500 mt-0.5">{label}</p>
              </motion.div>
            ))}
          </div>

          {/* Trust chart */}
          <motion.div
            {...fadeUp(0.4)}
            whileHover={{ boxShadow: "0 4px 40px rgba(139,92,246,0.12)" }}
            className="rounded-2xl p-6 border dark:border-purple-800/30 border-purple-200
              dark:bg-purple-900/30 bg-white mb-6 relative overflow-hidden"
          >
            <div className="scan-line" />
            <h2 className="text-xs font-semibold dark:text-purple-400 text-purple-500
              uppercase tracking-widest mb-5">
              Trust Score Timeline
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={agent.accent} stopOpacity={0.35} />
                    <stop offset="95%" stopColor={agent.accent} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,92,246,0.08)" />
                <XAxis dataKey="time" tick={{ fill: "#a78bfa", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: "#a78bfa", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{
                  background: dark ? "#1e0a3c" : "#faf5ff",
                  border: "1px solid rgba(139,92,246,0.3)",
                  borderRadius: "12px",
                  color: dark ? "#e9d5ff" : "#4c1d95",
                  fontSize: "12px",
                }} />
                <Area type="monotone" dataKey="score"
                  stroke={agent.accent} strokeWidth={2.5} fill="url(#areaGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Activity log */}
          <motion.div
            {...fadeUp(0.5)}
            className="rounded-2xl p-6 border dark:border-purple-800/30 border-purple-200
              dark:bg-purple-900/30 bg-white relative overflow-hidden"
          >
            <div className="scan-line" />
            <h2 className="text-xs font-semibold dark:text-purple-400 text-purple-500
              uppercase tracking-widest mb-4">
              {agent.name} Activity Log
            </h2>
            {agentLog.length > 0
              ? <AuditLog entries={agentLog} />
              : <p className="text-sm dark:text-purple-500 text-purple-400 text-center py-6">
                  No activity recorded yet
                </p>
            }
          </motion.div>

        </main>
      </div>
    </div>
  );
}
