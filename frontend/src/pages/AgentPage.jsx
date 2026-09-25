import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TrustMeter from "../components/TrustMeter";
import AuditLog from "../components/AuditLog";
import { agents, auditLog } from "../data/mockData";
import { ArrowLeft, Activity, CheckCircle, XCircle, Clock, Zap } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from "recharts";

const statusColors = {
  RUNNING:    { dot: "bg-emerald-400", badge: "bg-emerald-500/20 text-emerald-400" },
  SUSPICIOUS: { dot: "bg-orange-400",  badge: "bg-orange-500/20 text-orange-400" },
  CAUTIOUS:   { dot: "bg-yellow-400",  badge: "bg-yellow-500/20 text-yellow-400" },
  HALTED:     { dot: "bg-red-500",     badge: "bg-red-500/20 text-red-400" },
};

export default function AgentPage({ dark, setDark }) {
  const { name } = useParams();
  const navigate = useNavigate();
  const agent = agents[name];

  if (!agent) return (
    <div className="min-h-screen dark:bg-[#0d0618] bg-purple-50 flex items-center justify-center">
      <div className="text-center">
        <p className="dark:text-purple-300 text-purple-600 text-lg">Agent not found</p>
        <button onClick={() => navigate("/dashboard")}
          className="mt-4 text-purple-500 hover:text-purple-400 text-sm">
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );

  const sc = statusColors[agent.status] || statusColors.RUNNING;
  const chartData = agent.history.map((v, i) => ({ time: `T-${6 - i}`, score: v }));
  const agentLog = auditLog.filter(e => e.agent === agent.name);

  const infoCards = [
    { label: "Actions Today",   value: agent.actionsToday,  icon: Activity,     color: "text-purple-400" },
    { label: "Blocked Today",   value: agent.blockedToday,  icon: XCircle,      color: "text-red-400" },
    { label: "Uptime",          value: agent.uptime,         icon: Clock,        color: "text-emerald-400" },
    { label: "Trust Score",     value: agent.trust,          icon: Zap,          color: "text-fuchsia-400" },
  ];

  return (
    <div className="min-h-screen dark:bg-[#0d0618] bg-purple-50 dark:text-white text-purple-950">
      <Sidebar dark={dark} setDark={setDark} />

      <main className="ml-16 p-6 max-w-5xl mx-auto">

        {/* Back */}
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-sm dark:text-purple-400 text-purple-500
            hover:text-purple-400 mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to AEGIS
        </button>

        {/* Agent header */}
        <div className="rounded-2xl p-6 mb-6 border dark:border-purple-700/40 border-purple-200
          dark:bg-purple-900/30 bg-white relative overflow-hidden">

          {/* Decorative blob */}
          <div className="absolute top-[-60px] right-[-60px] w-48 h-48 rounded-full
            dark:bg-purple-600/10 bg-purple-200/40 blur-3xl pointer-events-none" />

          <div className="flex items-start justify-between gap-6 relative z-10">
            <div>
              {/* Avatar circle */}
              <div className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center text-2xl font-black text-white
                bg-gradient-to-br from-purple-500 to-fuchsia-600 purple-glow">
                {agent.name[0]}
              </div>

              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-extrabold dark:text-white text-purple-950 tracking-tight">
                  {agent.name}
                </h1>
                <span className={`text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1.5 ${sc.badge}`}>
                  <span className={`agent-status-dot ${sc.dot} animate-pulse-slow`} />
                  {agent.status}
                </span>
              </div>
              <p className="dark:text-purple-300 text-purple-600 mb-3">{agent.role}</p>
              <p className="text-sm dark:text-purple-400 text-purple-500 max-w-md">{agent.description}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                {agent.tags.map(tag => (
                  <span key={tag}
                    className="text-xs px-3 py-1 rounded-xl
                      dark:bg-purple-800/50 bg-purple-100
                      dark:text-purple-300 text-purple-700 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Large trust meter */}
            <div className="flex flex-col items-center gap-2 shrink-0">
              <TrustMeter score={agent.trust} size="lg" />
              <span className="text-xs dark:text-purple-400 text-purple-500">Trust Score</span>
            </div>
          </div>

          {/* Last action */}
          <div className="mt-5 pt-4 border-t dark:border-purple-800/30 border-purple-100 relative z-10">
            <span className="text-xs dark:text-purple-500 text-purple-400 mr-2">Last action:</span>
            <code className="text-xs dark:bg-purple-800/60 bg-purple-100
              dark:text-purple-200 text-purple-700 px-2 py-1 rounded-lg font-mono">
              {agent.lastAction}
            </code>
          </div>
        </div>

        {/* Info stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {infoCards.map(({ label, value, icon: Icon, color }) => (
            <div key={label}
              className="rounded-2xl p-4 border dark:border-purple-800/30 border-purple-200
                dark:bg-purple-900/20 bg-white text-center">
              <Icon size={20} className={`${color} mx-auto mb-2`} />
              <p className="text-2xl font-bold dark:text-white text-purple-900">{value}</p>
              <p className="text-xs dark:text-purple-400 text-purple-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Trust score area chart */}
        <div className="rounded-2xl p-5 border dark:border-purple-800/30 border-purple-200
          dark:bg-purple-900/20 bg-white mb-6">
          <h2 className="text-sm font-semibold dark:text-purple-300 text-purple-600
            uppercase tracking-wider mb-4">
            Trust Score Timeline
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="trustGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={agent.accent} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={agent.accent} stopOpacity={0.0} />
                </linearGradient>
              </defs>
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
              <Area
                type="monotone" dataKey="score"
                stroke={agent.accent} strokeWidth={2.5}
                fill="url(#trustGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Agent audit log */}
        <div className="rounded-2xl p-5 border dark:border-purple-800/30 border-purple-200
          dark:bg-purple-900/20 bg-white">
          <h2 className="text-sm font-semibold dark:text-purple-300 text-purple-600
            uppercase tracking-wider mb-4">
            {agent.name} Activity Log
          </h2>
          {agentLog.length > 0
            ? <AuditLog entries={agentLog} />
            : <p className="text-sm dark:text-purple-500 text-purple-400 text-center py-4">
                No activity recorded yet
              </p>
          }
        </div>

      </main>
    </div>
  );
}
