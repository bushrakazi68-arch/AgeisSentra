import { motion } from "framer-motion";
import { ShieldX, ShieldAlert, AlertTriangle } from "lucide-react";

const severityConfig = {
  high:   { icon: ShieldX,       color: "text-red-400",    bg: "dark:bg-red-900/20 bg-red-50",       border: "border-red-500/30" },
  medium: { icon: ShieldAlert,   color: "text-orange-400", bg: "dark:bg-orange-900/20 bg-orange-50", border: "border-orange-500/30" },
  low:    { icon: AlertTriangle, color: "text-yellow-400", bg: "dark:bg-yellow-900/20 bg-yellow-50", border: "border-yellow-500/30" },
};

export default function AlertFeed({ alerts }) {
  return (
    <div className="flex flex-col gap-2">
      {alerts.map((alert, i) => {
        const cfg = severityConfig[alert.severity];
        const Icon = cfg.icon;
        return (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.35 }}
            whileHover={{ x: 2 }}
            className={`flex items-start gap-3 p-3 rounded-xl border ${cfg.bg} ${cfg.border}`}
          >
            <motion.div
              animate={alert.severity === "high"
                ? { scale: [1, 1.2, 1] }
                : {}}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Icon size={15} className={`${cfg.color} mt-0.5 shrink-0`} />
            </motion.div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold dark:text-white text-purple-900">{alert.agent}</span>
                <span className="text-xs dark:text-purple-400 text-purple-500">tried</span>
                <code className="text-xs dark:bg-purple-800/60 bg-purple-100
                  dark:text-purple-200 text-purple-700 px-1.5 py-0.5 rounded font-mono">
                  {alert.action}
                </code>
                <span className={`text-xs font-bold
                  ${alert.result === "BLOCKED" ? "text-red-400" : "text-yellow-400"}`}>
                  → {alert.result}
                </span>
              </div>
              <p className="text-xs dark:text-purple-400 text-purple-500 mt-0.5">{alert.detail}</p>
            </div>
            <span className="text-xs dark:text-purple-600 text-purple-400 shrink-0 font-mono">{alert.time}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
