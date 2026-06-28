import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, FileText, Lightbulb, TrendingUp, Plus } from "lucide-react";
import InterviewHook from "../../../features/interview/hooks/interview.hooks";
import GenerateReportModal from "./GenerateReportModal";

// matchScore is already a 0–100 percentage; clamp and round for display.
const toPercent = (score) =>
  Math.min(100, Math.max(0, Math.round(Number(score) || 0)));

const Home = () => {
  const navigate = useNavigate();
  const { GetallReporthook, reports, loading } = InterviewHook();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    GetallReporthook();
  }, []);

  const list = Array.isArray(reports) ? reports : [];
  const total = list.length;
  const recent = list.slice(0, 3);
  const latest = list[0];
  const avgScore = total
    ? Math.round(list.reduce((sum, r) => sum + toPercent(r.matchScore), 0) / total)
    : 0;

  return (
    <>
      <div className="bg-[#F7F9FB] px-4 sm:px-8 py-5 min-h-screen">
        {/* Page heading */}
        <div>
          <p className="text-2xl font-bold">Interview Intelligence</p>
          <p className="text-[15px] mt-2 text-gray-600">
            Upload your resume and a target job description to get a tailored
            interview prep report — match score, skill gaps, likely questions,
            and a day-by-day plan.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mt-5">
          {/* Main column */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Hero / primary action */}
            <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
              <div className="flex flex-col flex-1 text-left">
                <h2 className="text-2xl font-bold text-[#0f172a] mb-3 tracking-tight">
                  Generate a Report
                </h2>
                <p className="text-[#475569] text-base leading-relaxed mb-6 max-w-xl">
                  Upload your resume and paste the job description for a role you
                  want. Our AI returns a match score, your skill gaps, likely
                  technical &amp; behavioral questions, and a prep plan.
                </p>
                <div>
                  <button
                    onClick={() => setOpen(true)}
                    className="inline-flex items-center gap-2 bg-[#111827] hover:bg-[#1f2937] text-white font-medium text-sm px-5 py-3 rounded-md transition-colors duration-200 shadow-sm cursor-pointer"
                  >
                    <Plus size={16} className="stroke-[2.5]" />
                    <span>Generate Report</span>
                  </button>
                </div>
              </div>

              <div className="bg-[#f4fbf9] border border-[#e6f7f3] rounded-2xl p-6 flex items-center justify-center shrink-0 self-center">
                <Sparkles className="w-16 h-16 sm:w-20 sm:h-20 text-[#a3d6cc]" strokeWidth={1.5} />
              </div>
            </div>

            {/* Recent reports */}
            <div className="w-full bg-white border border-gray-100 rounded-lg shadow-sm">
              <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                <h2 className="text-xs font-bold tracking-widest text-gray-500 uppercase">
                  Recent Reports
                </h2>
                <span className="text-xs font-medium text-gray-400">
                  {total} {total === 1 ? "Report" : "Reports"}
                </span>
              </div>

              {loading && total === 0 ? (
                <div className="px-6 py-16 text-center text-sm text-gray-400">
                  Loading your reports…
                </div>
              ) : total === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center text-center px-6 py-16 sm:py-20">
                  <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-xl mb-6">
                    <FileText className="w-8 h-8 text-teal-700" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    No reports yet
                  </h3>
                  <p className="max-w-md text-sm sm:text-base text-gray-500 leading-relaxed mb-8">
                    Generate your first report to see your competency gaps and a
                    tailored prep plan for your target role.
                  </p>
                  <button
                    onClick={() => setOpen(true)}
                    className="inline-flex items-center gap-2 bg-[#111827] hover:bg-[#1f2937] text-white font-medium text-sm px-5 py-3 rounded-md transition-colors duration-200 shadow-sm cursor-pointer"
                  >
                    <Plus size={16} className="stroke-[2.5]" />
                    <span>Generate Report</span>
                  </button>
                </div>
              ) : (
                /* Real recent reports */
                <div className="divide-y divide-gray-100">
                  {recent.map((report) => (
                    <button
                      key={report._id}
                      onClick={() => navigate(`/dashboard/reports/${report._id}`)}
                      className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-emerald-50 text-emerald-800 font-bold text-sm shrink-0">
                        {toPercent(report.matchScore)}%
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-gray-900 truncate">
                          {report.title || "Untitled report"}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {report?.skillGaps?.length ?? 0} skill gap
                          {(report?.skillGaps?.length ?? 0) === 1 ? "" : "s"} identified
                        </p>
                      </div>
                      <span className="text-xs font-medium text-emerald-800 shrink-0">
                        View →
                      </span>
                    </button>
                  ))}

                  {total > recent.length && (
                    <button
                      onClick={() => navigate("/dashboard/reports")}
                      className="w-full px-6 py-3 text-center text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      View all {total} reports →
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 flex flex-col gap-6">
            {/* Honest tip */}
            <div className="bg-[#f0f2fa] border border-[#e2e6f4] rounded-lg p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[#6366f1] font-semibold tracking-wider text-xs uppercase">
                <Lightbulb size={16} className="stroke-[2.5]" />
                <span>Quick Tip</span>
              </div>
              <p className="text-[#374151] text-[15px] leading-relaxed font-medium">
                Paste the full job description — the more detail you give, the
                sharper your match score, skill-gap analysis, and interview
                questions will be.
              </p>
            </div>

            {/* Real progress card */}
            <div className="bg-white border border-[#f3f4f6] rounded-lg p-6 shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[#0d7c75] font-bold tracking-wider text-xs uppercase">
                <TrendingUp size={16} className="stroke-[2.5]" />
                <span>Your Progress</span>
              </div>

              {total === 0 ? (
                <p className="text-[#4b5563] text-[15px] leading-relaxed">
                  Your stats will appear here once you generate your first
                  report.
                </p>
              ) : (
                <>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-bold text-[#0f172a] tracking-tight">
                      {total} {total === 1 ? "report" : "reports"} generated
                    </h3>
                    {latest?.title && (
                      <p className="text-[#4b5563] text-sm leading-relaxed truncate">
                        Latest: {latest.title}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-4 mt-2">
                    {/* Latest match score */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center text-sm font-mono font-bold text-[#1f2937]">
                        <span>Latest Match</span>
                        <span>{toPercent(latest?.matchScore)}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#f3f4f6] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#0d7c75] rounded-full"
                          style={{ width: `${toPercent(latest?.matchScore)}%` }}
                        />
                      </div>
                    </div>

                    {/* Average match score */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center text-sm font-mono font-bold text-[#1f2937]">
                        <span>Average Match</span>
                        <span>{avgScore}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#f3f4f6] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#0d7c75] rounded-full"
                          style={{ width: `${avgScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Shared generate-report flow */}
      <GenerateReportModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Home;
