import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AgentCard from "../components/AgentCard";
import AlertFeed from "../components/AlertFeed";
import AuditLog from "../components/AuditLog";
import { agents, alerts, auditLog, trustHistory, systemStats } from "../data/mockData";
import { Shield, Activity, AlertTriangle, Cpu, Ghost, Zap } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";

const statCards = [
  { label: "Active Agents",    value: `${systemStats.activeAgents}/${systemStats.totalAgents}`, icon: Cpu,           color: "text-purple-400",  bg: "dark:bg-purple-800/50 bg-purple-100",  glow: "rgba(139,92,246,0.2)" },
  { label: "System Integrity", value: systemStats.systemIntegrity,                               icon: Shield,        color: "text-emerald-400", bg: "dark:bg-emerald-900/40 bg-emerald-50", glow: "rgba(52,211,153,0.2)" },
  { label: "Blocked Today",    value: systemStats.blockedToday,                                  icon: AlertTriangle, color: "text-red-400",     bg: "dark:bg-red-900/40 bg-red-50",         glow: "rgba(239,68,68,0.2)" },
  { label: "PHANTOM Repelled", value: `${systemStats.phantomBlocked}/${systemStats.phantomAttacks}`, icon: Ghost,    color: "text-fuchsia-400", bg: "dark:bg-fuchsia-900/40 bg-fuchsia-50", glow: "rgba(217,70,239,0.2)" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5, ease: "easeOut" },
});

export default function AegisDashboard({ dark, setDark }) {
  return (
    <div className="min-h-screen dark:bg-[#0d0618] bg-purple-50 dark:text-white text-purple-950">
      <div className="fixed inset-0 dot-grid opacity-30 pointer-events-none" />
      <Sidebar dark={dark} setDark={setDark} />

      <div className="ml-16 flex flex-col min-h-screen">
        <Navbar dark={dark} setDark={setDark} />

        <main className="flex-1 p-6 max-w-7xl mx-auto w-full">

          {/* Header */}
          <motion.div {...fadeUp(0)} className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <motion.div
                  animate={{ boxShadow: ["0 0 10px rgba(147,51,234,0.3)", "0 0 25px rgba(147,51,234,0.6)", "0 0 10px rgba(147,51,234,0.3)"] }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600
                    flex items-center justify-center"
                >
                  <Shield size={18} className="text-white" />
                </motion.div>
                <h1 className="text-2xl font-extrabold dark:text-white text-purple-950 tracking-tight">AEGIS</h1>
                <motion.span
                  animate={{ opacity: [1, 0.6, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-xs px-2.5 py-1 rounded-full font-semibold
                    bg-emerald-500/20 text-emerald-400 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  MONITORING
                </motion.span>
              </div>
              <p className="text-sm dark:text-purple-400 text-purple-500">
                Runtime Integrity Monitor · {new Date().toLocaleString()}
              </p>
            </div>
            <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
              <Activity size={22} className="dark:text-purple-500 text-purple-400" />
            </motion.div>
          </motion.div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {statCards.map(({ label, value, icon: Icon, color, bg, glow }, i) => (
              <motion.div
                key={label}
                {...fadeUp(0.1 + i * 0.08)}
                whileHover={{ y: -4, boxShadow: `0 8px 32px ${glow}` }}
                className="rounded-2xl p-5 border dark:border-purple-800/30 border-purple-200
                  dark:bg-purple-900/30 bg-white relative overflow-hidden cursor-default"
              >
                <div className="scan-line" />
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                  <Icon size={18} className={color} />
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="text-2xl font-bold dark:text-white text-purple-900"
                >
                  {value}
                </motion.p>
                <p className="text-xs dark:text-purple-400 text-purple-500 mt-0.5">{label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

            {/* Agent cards */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <motion.h2 {...fadeUp(0.35)}
                className="text-xs font-semibold dark:text-purple-400 text-purple-500 uppercase tracking-widest">
                Agent Network
              </motion.h2>
              {Object.values(agents).map((agent, i) => (
                <motion.div key={agent.id} {...fadeUp(0.4 + i * 0.1)}>
                  <AgentCard agent={agent} />
                </motion.div>
              ))}
            </div>

            {/* Alert feed */}
            <motion.div {...fadeUp(0.5)} className="flex flex-col gap-4">
              <h2 className="text-xs font-semibold dark:text-purple-400 text-purple-500 uppercase tracking-widest">
                Live Alerts
              </h2>
              <div className="rounded-2xl p-4 border dark:border-purple-800/30 border-purple-200
                dark:bg-purple-900/30 bg-white flex-1 relative overflow-hidden">
                <div className="scan-line" />
                <AlertFeed alerts={alerts} />
              </div>
            </motion.div>
          </div>

          {/* Trust Score History */}
          <motion.div
            {...fadeUp(0.6)}
            whileHover={{ boxShadow: "0 4px 40px rgba(139,92,246,0.12)" }}
            className="rounded-2xl p-6 border dark:border-purple-800/30 border-purple-200
              dark:bg-purple-900/30 bg-white mb-6 relative overflow-hidden"
          >
            <div className="scan-line" />
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xs font-semibold dark:text-purple-400 text-purple-500 uppercase tracking-widest">
                Trust Score History
              </h2>
              <div className="flex items-center gap-4 text-xs">
                {[["RECON","#8B5CF6"],["SAGE","#D946EF"],["ECHO","#A855F7"]].map(([name, color]) => (
                  <span key={name} className="flex items-center gap-1.5 dark:text-purple-400 text-purple-500">
                    <span className="w-3 h-0.5 rounded-full" style={{ background: color }} />
                    {name}
                  </span>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={trustHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,92,246,0.08)" />
                <XAxis dataKey="time" tick={{ fill: "#a78bfa", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: "#a78bfa", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: dark ? "#1e0a3c" : "#faf5ff",
                    border: "1px solid rgba(139,92,246,0.3)",
                    borderRadius: "12px",
                    color: dark ? "#e9d5ff" : "#4c1d95",
                    fontSize: "12px",
                  }}
                />
                <Line type="monotone" dataKey="RECON" stroke="#8B5CF6" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="SAGE"  stroke="#D946EF" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="ECHO"  stroke="#A855F7" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Audit Log */}
          <motion.div
            {...fadeUp(0.7)}
            className="rounded-2xl p-6 border dark:border-purple-800/30 border-purple-200
              dark:bg-purple-900/30 bg-white relative overflow-hidden"
          >
            <div className="scan-line" />
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-semibold dark:text-purple-400 text-purple-500 uppercase tracking-widest">
                Audit Log
              </h2>
              <span className="text-xs dark:text-purple-500 text-purple-400">{auditLog.length} entries</span>
            </div>
            <AuditLog entries={auditLog} />
          </motion.div>

        </main>
      </div>
    </div>
  );
}
