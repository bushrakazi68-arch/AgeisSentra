import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Bell, Moon, Sun, ChevronRight, Shield } from "lucide-react";
import { alerts } from "../data/mockData";

const breadcrumbMap = {
  "/":            ["Home"],
  "/dashboard":   ["AEGIS", "Dashboard"],
  "/agent/recon": ["AEGIS", "Agents", "RECON"],
  "/agent/sage":  ["AEGIS", "Agents", "SAGE"],
  "/agent/echo":  ["AEGIS", "Agents", "ECHO"],
};

export default function Navbar({ dark, setDark }) {
  const location = useLocation();
  const navigate = useNavigate();
  const crumbs = breadcrumbMap[location.pathname] || ["AEGIS"];
  const unread = alerts.filter(a => a.severity === "high").length;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-40 ml-16 flex items-center justify-between px-6 py-3
        dark:bg-[#0d0618]/80 bg-purple-50/80 backdrop-blur-xl
        border-b dark:border-purple-800/30 border-purple-200"
    >
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm">
        {crumbs.map((crumb, i) => (
          <span key={crumb} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={13} className="dark:text-purple-600 text-purple-300" />}
            <span className={
              i === crumbs.length - 1
                ? "font-semibold dark:text-white text-purple-900"
                : "dark:text-purple-500 text-purple-400 hover:dark:text-purple-300 cursor-pointer"
            }>
              {crumb}
            </span>
          </span>
        ))}
      </nav>

      {/* Right controls */}
      <div className="flex items-center gap-2">

        {/* Live indicator */}
        <motion.div
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="hidden sm:flex items-center gap-1.5 text-xs font-medium
            dark:text-emerald-400 text-emerald-600 mr-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          LIVE
        </motion.div>

        {/* Notification bell */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/dashboard")}
          className="relative w-9 h-9 flex items-center justify-center rounded-xl
            dark:bg-purple-800/40 bg-purple-100
            dark:text-purple-300 text-purple-600
            dark:hover:bg-purple-700/50 hover:bg-purple-200 transition-colors"
        >
          <Bell size={16} />
          {unread > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500
                text-white text-[9px] font-bold flex items-center justify-center"
            >
              {unread}
            </motion.span>
          )}
        </motion.button>

        {/* Dark/light toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setDark(!dark)}
          className="w-9 h-9 flex items-center justify-center rounded-xl
            dark:bg-purple-800/40 bg-purple-100
            dark:text-purple-300 text-purple-600
            dark:hover:bg-purple-700/50 hover:bg-purple-200 transition-colors"
        >
          <motion.div
            key={dark ? "moon" : "sun"}
            initial={{ rotate: -30, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </motion.div>
        </motion.button>

        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600
            flex items-center justify-center cursor-pointer ml-1 purple-glow-sm"
        >
          <span className="text-white text-xs font-bold">AD</span>
        </motion.div>
      </div>
    </motion.header>
  );
}
