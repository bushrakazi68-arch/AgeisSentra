import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Shield, Users, ScrollText, Bell, Settings, Moon, Sun, Zap } from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Shield,          label: "RECON",     path: "/agent/recon" },
  { icon: Users,           label: "SAGE",      path: "/agent/sage" },
  { icon: Zap,             label: "ECHO",      path: "/agent/echo" },
  { icon: ScrollText,      label: "Audit Log", path: "/dashboard#audit" },
  { icon: Bell,            label: "Alerts",    path: "/dashboard#alerts" },
  { icon: Settings,        label: "Settings",  path: "/dashboard#settings" },
];

export default function Sidebar({ dark, setDark }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-16 flex flex-col items-center py-6 gap-3 z-50
      dark:bg-purple-950/90 bg-purple-100/90 backdrop-blur-xl border-r
      dark:border-purple-800/40 border-purple-200">

      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600
          flex items-center justify-center cursor-pointer mb-4 purple-glow-sm"
      >
        <span className="text-white font-bold text-sm">Æ</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path.split("#")[0];
          return (
            <button
              key={label}
              onClick={() => navigate(path.split("#")[0])}
              title={label}
              className={`sidebar-icon group relative transition-all duration-200
                ${active
                  ? "dark:bg-purple-600 bg-purple-500 text-white purple-glow-sm"
                  : "dark:text-purple-400 text-purple-600 dark:hover:bg-purple-800/50 hover:bg-purple-200"
                }`}
            >
              <Icon size={18} />
              <span className="absolute left-14 px-2 py-1 rounded-lg text-xs font-medium
                dark:bg-purple-800 bg-purple-600 text-white whitespace-nowrap
                opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                {label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Dark mode toggle */}
      <button
        onClick={() => setDark(!dark)}
        className="sidebar-icon dark:text-purple-400 text-purple-600
          dark:hover:bg-purple-800/50 hover:bg-purple-200 mt-auto"
        title={dark ? "Light Mode" : "Dark Mode"}
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </aside>
  );
}
