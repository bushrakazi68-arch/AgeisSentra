import { useNavigate } from "react-router-dom";
import { ArrowRight, Activity } from "lucide-react";
import TrustMeter from "./TrustMeter";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const statusColors = {
  RUNNING:    { dot: "bg-emerald-400", badge: "dark:bg-emerald-900/40 bg-emerald-100 text-emerald-500 dark:text-emerald-400" },
  SUSPICIOUS: { dot: "bg-orange-400",  badge: "dark:bg-orange-900/40 bg-orange-100 text-orange-500 dark:text-orange-400" },
  CAUTIOUS:   { dot: "bg-yellow-400",  badge: "dark:bg-yellow-900/40 bg-yellow-100 text-yellow-600 dark:text-yellow-400" },
  HALTED:     { dot: "bg-red-500",     badge: "dark:bg-red-900/40 bg-red-100 text-red-500 dark:text-red-400" },
};

export default function AgentCard({ agent }) {
  const navigate = useNavigate();
  const sc = statusColors[agent.status] || statusColors.RUNNING;
  const chartData = agent.history.map((v, i) => ({ v }));

  return (
    <div
      onClick={() => navigate(`/agent/${agent.id}`)}
      className="rounded-2xl p-5 cursor-pointer group transition-all duration-300
        dark:bg-purple-900/30 bg-white border dark:border-purple-700/40 border-purple-200
        hover:dark:border-purple-500 hover:border-purple-400
        hover:dark:bg-purple-900/50 hover:bg-purple-50
        hover:shadow-lg hover:shadow-purple-500/10 animate-fade-in"
    >
      <div className="flex items-start justify-between gap-4">

        {/* Left info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-lg font-bold dark:text-white text-purple-900 tracking-wide">
              {agent.name}
            </h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1.5 ${sc.badge}`}>
              <span className={`agent-status-dot ${sc.dot} animate-pulse-slow`} />
              {agent.status}
            </span>
          </div>

          <p className="text-sm dark:text-purple-300 text-purple-600 mb-3">{agent.role}</p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {agent.tags.map(tag => (
              <span key={tag}
                className="text-xs px-2 py-0.5 rounded-lg
                  dark:bg-purple-800/50 bg-purple-100
                  dark:text-purple-300 text-purple-700 font-medium">
                {tag}
              </span>
            ))}
          </div>

          {/* Mini sparkline */}
          <div className="h-10 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line
                  type="monotone" dataKey="v"
                  stroke={agent.accent} strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right — Trust meter */}
        <div className="flex flex-col items-center gap-3 shrink-0">
          <TrustMeter score={agent.trust} />
          <span className="text-xs dark:text-purple-400 text-purple-500">Performance</span>
          <ArrowRight
            size={16}
            className="dark:text-purple-500 text-purple-400
              group-hover:text-purple-400 group-hover:translate-x-1 transition-all"
          />
        </div>
      </div>
    </div>
  );
}
