export default function TrustMeter({ score, size = "md" }) {
  const getColor = (s) => {
    if (s >= 70) return { bar: "bg-emerald-400", text: "text-emerald-400", label: "GREEN", ring: "#34d399" };
    if (s >= 50) return { bar: "bg-yellow-400",  text: "text-yellow-400",  label: "YELLOW", ring: "#facc15" };
    if (s >= 30) return { bar: "bg-orange-400",  text: "text-orange-400",  label: "ORANGE", ring: "#fb923c" };
    return           { bar: "bg-red-500",        text: "text-red-400",     label: "RED",    ring: "#ef4444" };
  };

  const c = getColor(score);
  const radius = size === "lg" ? 52 : 38;
  const stroke = size === "lg" ? 6 : 5;
  const svgSize = radius * 2 + stroke * 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: svgSize, height: svgSize }}>
        <svg width={svgSize} height={svgSize} className="-rotate-90">
          <circle
            cx={svgSize / 2} cy={svgSize / 2} r={radius}
            fill="none" stroke="rgba(139,92,246,0.15)" strokeWidth={stroke}
          />
          <circle
            cx={svgSize / 2} cy={svgSize / 2} r={radius}
            fill="none" stroke={c.ring} strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.8s ease", filter: `drop-shadow(0 0 6px ${c.ring})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-bold ${size === "lg" ? "text-2xl" : "text-lg"} dark:text-white text-purple-900`}>
            {score}
          </span>
          {size === "lg" && (
            <span className={`text-xs font-semibold ${c.text}`}>{c.label}</span>
          )}
        </div>
      </div>
      {size !== "lg" && (
        <span className={`text-xs font-semibold ${c.text}`}>{c.label}</span>
      )}
    </div>
  );
}
