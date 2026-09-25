import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import TrustMeter from "./TrustMeter";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const statusConfig = {
  RUNNING:    { dot: "bg-emerald-400", badge: "dark:bg-emerald-900/40 bg-emerald-100 text-emerald-500 dark:text-emerald-400" },
  SUSPICIOUS: { dot: "bg-orange-400",  badge: "dark:bg-orange-900/40 bg-orange-100 text-orange-500 dark:text-orange-400" },
  CAUTIOUS:   { dot: "bg-yellow-400",  badge: "dark:bg-yellow-900/40 bg-yellow-100 text-yellow-600 dark:text-yellow-400" },
  HALTED:     { dot: "bg-red-500",     badge: "dark:bg-red-900/40 bg-red-100 text-red-500 dark:text-red-400" },
};

export default function AgentCard({ agent }) {
  const navigate = useNavigate();
  const sc = statusConfig[agent.status] || statusConfig.RUNNING;
  const chartData = agent.history.map(v => ({ v }));

  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: "0 12px 40px rgba(139,92,246,0.18)" }}
      whileTap={{ scale: 0.99 }}
      onClick={() => navigate(`/agent/${agent.id}`)}
      className="rounded-2xl p-5 cursor-pointer transition-colors relative overflow-hidden
        dark:bg-purple-900/30 bg-white
        border dark:border-purple-700/40 border-purple-200
        hover:dark:border-purple-500/60 hover:border-purple-400"
    >
      {/* Scan line */}
      <div className="scan-line" />

      {/* Gradient left accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
        style={{ background: `linear-gradient(to bottom, ${agent.accent}, transparent)` }}
      />

      <div className="flex items-start justify-between gap-4 pl-2">

        {/* Left */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            {/* Agent avatar */}
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black text-white shrink-0"
              style={{ background: `linear-gradient(135deg, ${agent.accent}, #d946ef)` }}
            >
              {agent.name[0]}
            </div>
            <h3 className="text-base font-bold dark:text-white text-purple-900 tracking-wide">
              {agent.name}
            </h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1.5 ${sc.badge}`}>
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className={`agent-status-dot ${sc.dot}`}
              />
              {agent.status}
            </span>
          </div>

          <p className="text-sm dark:text-purple-300 text-purple-600 mb-3 ml-11">{agent.role}</p>

          <div className="flex flex-wrap gap-1.5 mb-4 ml-11">
            {agent.tags.map(tag => (
              <span key={tag}
                className="text-xs px-2 py-0.5 rounded-lg
                  dark:bg-purple-800/50 bg-purple-100
                  dark:text-purple-300 text-purple-700 font-medium">
                {tag}
              </span>
            ))}
          </div>

          {/* Sparkline */}
          <div className="h-10 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line type="monotone" dataKey="v" stroke={agent.accent} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right — trust meter */}
        <div className="flex flex-col items-center gap-2 shrink-0">
          <TrustMeter score={agent.trust} />
          <span className="text-xs dark:text-purple-500 text-purple-400">Trust</span>
          <motion.div
            animate={{ x: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowRight size={14} className="dark:text-purple-600 text-purple-400" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
