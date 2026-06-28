import { useEffect, useState } from "react";
import { Plus, FileSearch } from "lucide-react";
import GenerateReportModal from "./GenerateReportModal";
import JobMatchCard from "./JobMatchCard";
import InterviewHook from "../../../features/interview/hooks/interview.hooks";

const Reports = () => {
  const [open, setOpen] = useState(false);
  const { GetallReporthook, reports, loading } = InterviewHook();

  useEffect(() => {
    GetallReporthook();
  }, []);

  const list = Array.isArray(reports) ? reports : [];

  return (
    <>
      <div className="min-h-screen bg-[#F7F9FB] px-4 sm:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Generated Reports
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {list.length} {list.length === 1 ? "report" : "reports"} generated
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-2.5 font-semibold text-white transition-all duration-300 ease-in-out hover:bg-[#302f2f] cursor-pointer"
          >
            <Plus size={18} className="stroke-[2.5]" />
            Generate Report
          </button>
        </div>

        {/* Content */}
        <div className="mt-8">
          {loading && list.length === 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-44 animate-pulse rounded-2xl border border-gray-100 bg-white shadow-sm"
                />
              ))}
            </div>
          ) : list.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((report) => (
                <JobMatchCard
                  key={report._id}
                  title={report.title}
                  report={report}
                />
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-20 text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
                <FileSearch className="h-8 w-8 text-teal-700" strokeWidth={2} />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                No reports yet
              </h3>
              <p className="mb-8 max-w-md text-sm leading-relaxed text-gray-500">
                Generate your first report to see your match score, skill gaps,
                likely interview questions, and a tailored prep plan.
              </p>
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 font-semibold text-white transition hover:bg-[#302f2f] cursor-pointer"
              >
                <Plus size={18} className="stroke-[2.5]" />
                Generate Report
              </button>
            </div>
          )}
        </div>

        <GenerateReportModal isOpen={open} onClose={() => setOpen(false)} />
      </div>
    </>
  );
};

export default Reports;
