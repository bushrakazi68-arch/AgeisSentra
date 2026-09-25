import Sidebar from "../components/Sidebar";
import AgentCard from "../components/AgentCard";
import AlertFeed from "../components/AlertFeed";
import AuditLog from "../components/AuditLog";
import TrustMeter from "../components/TrustMeter";
import { agents, alerts, auditLog, trustHistory, systemStats } from "../data/mockData";
import { Shield, Activity, AlertTriangle, CheckCircle, Cpu, Ghost } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";

const statCards = [
  { label: "Active Agents",      value: `${systemStats.activeAgents}/${systemStats.totalAgents}`, icon: Cpu,           color: "text-purple-400",  bg: "dark:bg-purple-800/40 bg-purple-100" },
  { label: "System Integrity",   value: systemStats.systemIntegrity,   icon: Shield,        color: "text-emerald-400", bg: "dark:bg-emerald-900/30 bg-emerald-50" },
  { label: "Blocked Today",      value: systemStats.blockedToday,       icon: AlertTriangle, color: "text-red-400",     bg: "dark:bg-red-900/30 bg-red-50" },
  { label: "PHANTOM Repelled",   value: `${systemStats.phantomBlocked}/${systemStats.phantomAttacks}`, icon: Ghost, color: "text-fuchsia-400", bg: "dark:bg-fuchsia-900/30 bg-fuchsia-50" },
];

export default function AegisDashboard({ dark, setDark }) {
  return (
    <div className="min-h-screen dark:bg-[#0d0618] bg-purple-50 dark:text-white text-purple-950">
      <Sidebar dark={dark} setDark={setDark} />

      <main className="ml-16 p-6 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600
                flex items-center justify-center purple-glow-sm">
                <Shield size={16} className="text-white" />
              </div>
              <h1 className="text-2xl font-extrabold dark:text-white text-purple-950 tracking-tight">
                AEGIS
              </h1>
              <span className="text-xs px-2.5 py-1 rounded-full font-semibold
                bg-emerald-500/20 text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                MONITORING
              </span>
            </div>
            <p className="text-sm dark:text-purple-400 text-purple-500">
              Runtime Integrity Monitor · {new Date().toLocaleString()}
            </p>
          </div>
          <Activity size={20} className="dark:text-purple-500 text-purple-400" />
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statCards.map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label}
              className="rounded-2xl p-4 border dark:border-purple-800/30 border-purple-200
                dark:bg-purple-900/20 bg-white purple-glow-sm">
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                <Icon size={18} className={color} />
              </div>
              <p className="text-2xl font-bold dark:text-white text-purple-900">{value}</p>
              <p className="text-xs dark:text-purple-400 text-purple-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

          {/* Agent cards */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h2 className="text-sm font-semibold dark:text-purple-300 text-purple-600 uppercase tracking-wider">
              Agent Network
            </h2>
            {Object.values(agents).map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>

          {/* Alert feed */}
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold dark:text-purple-300 text-purple-600 uppercase tracking-wider">
              Live Alerts
            </h2>
            <div className="rounded-2xl p-4 border dark:border-purple-800/30 border-purple-200
              dark:bg-purple-900/20 bg-white">
              <AlertFeed alerts={alerts} />
            </div>
          </div>
        </div>

        {/* Trust Score History Graph */}
        <div className="rounded-2xl p-5 border dark:border-purple-800/30 border-purple-200
          dark:bg-purple-900/20 bg-white mb-6">
          <h2 className="text-sm font-semibold dark:text-purple-300 text-purple-600
            uppercase tracking-wider mb-5">
            Trust Score History
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trustHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,92,246,0.1)" />
              <XAxis dataKey="time" tick={{ fill: "#a78bfa", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: "#a78bfa", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: dark ? "#1e0a3c" : "#faf5ff",
                  border: "1px solid rgba(139,92,246,0.3)",
                  borderRadius: "12px",
                  color: dark ? "#e9d5ff" : "#4c1d95",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Line type="monotone" dataKey="RECON" stroke="#8B5CF6" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="SAGE"  stroke="#D946EF" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="ECHO"  stroke="#A855F7" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Audit Log */}
        <div className="rounded-2xl p-5 border dark:border-purple-800/30 border-purple-200
          dark:bg-purple-900/20 bg-white">
          <h2 className="text-sm font-semibold dark:text-purple-300 text-purple-600
            uppercase tracking-wider mb-4">
            Audit Log
          </h2>
          <AuditLog entries={auditLog} />
        </div>

      </main>
    </div>
  );
}
