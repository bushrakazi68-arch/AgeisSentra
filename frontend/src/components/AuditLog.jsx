export default function AuditLog({ entries }) {
  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="w-full text-sm">
        <thead>
          <tr className="dark:text-purple-400 text-purple-500 text-xs uppercase tracking-wider">
            <th className="text-left py-2 px-3">Time</th>
            <th className="text-left py-2 px-3">Agent</th>
            <th className="text-left py-2 px-3">Action</th>
            <th className="text-left py-2 px-3">Result</th>
            <th className="text-left py-2 px-3">Trust</th>
          </tr>
        </thead>
        <tbody className="divide-y dark:divide-purple-800/30 divide-purple-100">
          {entries.map((row, i) => (
            <tr key={i}
              className={`transition-colors
                ${row.result === "BLOCKED"
                  ? "dark:bg-red-900/10 bg-red-50/50"
                  : row.result === "FLAGGED"
                  ? "dark:bg-yellow-900/10 bg-yellow-50/50"
                  : ""
                }`}>
              <td className="py-2 px-3 font-mono text-xs dark:text-purple-400 text-purple-500">{row.time}</td>
              <td className="py-2 px-3 font-bold text-xs dark:text-white text-purple-900">{row.agent}</td>
              <td className="py-2 px-3">
                <code className="text-xs dark:bg-purple-800/60 bg-purple-100
                  dark:text-purple-200 text-purple-700 px-1.5 py-0.5 rounded font-mono">
                  {row.action}
                </code>
              </td>
              <td className="py-2 px-3">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full
                  ${row.result === "BLOCKED"
                    ? "bg-red-500/20 text-red-400"
                    : row.result === "FLAGGED"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-emerald-500/20 text-emerald-400"
                  }`}>
                  {row.result}
                </span>
              </td>
              <td className="py-2 px-3 font-mono text-xs dark:text-purple-400 text-purple-500">{row.trust}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
