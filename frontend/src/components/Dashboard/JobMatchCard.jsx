import { useNavigate } from "react-router-dom";
import { ArrowUpRight, AlertTriangle, Layers } from "lucide-react";

const RADIUS = 34;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// matchScore is already a 0–100 percentage; clamp and round for display.
const toPercent = (score) =>
  Math.min(100, Math.max(0, Math.round(Number(score) || 0)));

const severityStyles = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-emerald-100 text-emerald-700",
};

const JobMatchCard = ({ report, title }) => {
  const navigate = useNavigate();

  const pct = toPercent(report?.matchScore);
  const offset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE;

  // Ring color reflects how strong the match is.
  const ringColor =
    pct >= 75 ? "text-emerald-600" : pct >= 50 ? "text-amber-500" : "text-red-500";

  const gaps = report?.skillGaps ?? [];
  const worstSeverity = gaps.some((g) => g.severity === "high")
    ? "high"
    : gaps.some((g) => g.severity === "medium")
      ? "medium"
      : gaps.length
        ? "low"
        : null;

  const created = report?.createdAt
    ? new Date(report.createdAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <button
      type="button"
      onClick={() => navigate(`/dashboard/reports/${report._id}`)}
      className="group flex w-full flex-col rounded-2xl border border-gray-100 bg-white p-5 text-left shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-gray-200 hover:shadow-xl active:scale-[0.99] cursor-pointer"
    >
      {/* Top: ring + title */}
      <div className="flex items-center gap-4">
        <div className="relative flex h-20 w-20 flex-shrink-0 items-center justify-center">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r={RADIUS}
              className="text-gray-100"
              strokeWidth="6"
              stroke="currentColor"
              fill="transparent"
            />
            <circle
              cx="40"
              cy="40"
              r={RADIUS}
              className={`${ringColor} transition-all duration-700`}
              strokeWidth="6"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={offset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>
          <div className="absolute flex flex-col items-center leading-none">
            <span className="text-base font-bold text-gray-900">{pct}%</span>
            <span className="text-[9px] font-semibold uppercase tracking-wider text-gray-400">
              Match
            </span>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-bold tracking-tight text-gray-900">
            {title || report?.title || "Untitled report"}
          </h3>
          {created && (
            <p className="mt-1 text-xs font-medium text-gray-400">{created}</p>
          )}
        </div>
      </div>

      {/* Badges */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-2.5 py-1 text-xs font-semibold text-gray-700">
          <Layers size={13} />
          {gaps.length} skill gap{gaps.length === 1 ? "" : "s"}
        </span>

        {worstSeverity && (
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${severityStyles[worstSeverity]}`}
          >
            <AlertTriangle size={13} />
            {worstSeverity} severity
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center gap-1 border-t border-gray-100 pt-3 text-sm font-semibold text-emerald-700">
        <span>View report</span>
        <ArrowUpRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
    </button>
  );
};

export default JobMatchCard;
