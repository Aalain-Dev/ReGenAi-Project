import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Lightbulb,
  ListChecks,
  CheckCircle2,
  Target,
  AlertCircle,
  RotateCw,
} from "lucide-react";
import InterviewHook from "../../../features/interview/hooks/interview.hooks";

// --- STATIC CONFIGURATIONS ---
const RADIUS = 70;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const SUB_TABS = ["Technical", "Behavioral", "Prep Plan"];

// API gives severity only (no number) -> derive bar width + color from it
const severityranks = {
  low: 30,
  medium: 60,
  high: 90,
};
const severityBarColor = {
  low: "bg-green-500",
  medium: "bg-yellow-500",
  high: "bg-red-600",
};
const severityBadge = {
  low: "bg-green-500 text-white",
  medium: "bg-yellow-500 text-white",
  high: "bg-red-600 text-white",
};

// Match-score tiers — same thresholds the rest of the app uses (see JobMatchCard)
const scoreMeta = (p) =>
  p >= 75
    ? { ring: "text-emerald-600", text: "text-emerald-700", label: "Strong match" }
    : p >= 50
      ? { ring: "text-amber-500", text: "text-amber-600", label: "Good match" }
      : { ring: "text-red-500", text: "text-red-600", label: "Needs work" };

// --- LOADING SKELETON ---
const ReportSkeleton = () => (
  <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen max-w-6xl mx-auto animate-pulse">
    <div className="h-8 w-72 bg-gray-200 rounded-lg" />
    <div className="flex flex-col md:flex-row gap-6 items-stretch w-full">
      <div className="w-full md:w-80 h-72 bg-white border border-gray-200 rounded-xl shadow-sm" />
      <div className="flex-1 h-72 bg-white border border-gray-200 rounded-xl shadow-sm" />
    </div>
    <div className="h-96 bg-white border border-gray-200 rounded-xl shadow-sm" />
  </div>
);

const ReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { GetSingleReporthook, report, loading, error } = InterviewHook();

  const [activeSubTab, setActiveSubTab] = useState("Technical");
  const [selectedTechId, setSelectedTechId] = useState(1);
  const [selectedBehavioralId, setSelectedBehavioralId] = useState(1);
  const [selectedPlanId, setSelectedPlanId] = useState(1);

  const fetchReport = async () => {
    if (!id) return;
    try {
      await GetSingleReporthook({ id });
    } catch (err) {
      // ignore fetch error
    }
  };

  useEffect(() => {
    fetchReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Only treat the data as ready once the fetched report matches the URL id.
  // Prevents a stale report (or 0% gauge) from flashing while we load.
  const isReady = report && report._id === id;

  // Match score (already a 0–100 percentage) -> drives both the number and the ring
  const matchPercent = Math.min(
    100,
    Math.max(0, Math.round(Number(report?.matchScore) || 0)),
  );
  const strokeDashOffset = CIRCUMFERENCE - (matchPercent / 100) * CIRCUMFERENCE;
  const score = scoreMeta(matchPercent);

  // Map API arrays into the shape the existing UI expects
  const technicalList = (report?.technicalQuestions ?? []).map((q, i) => ({
    id: i + 1,
    num: String(i + 1),
    sidebarTitle: q.question,
    fullQuestion: q.question,
    whyAsking: q.intention,
    howToAnswer: <p>{q.answer}</p>,
  }));

  const behavioralList = (report?.behavioralQuestions ?? []).map((q, i) => ({
    id: i + 1,
    num: String(i + 1),
    sidebarTitle: q.question,
    fullQuestion: q.question,
    whyAsking: q.intention,
    howToAnswer: <p>{q.answer}</p>,
  }));

  // Prep plan has a different shape: day / focus / tasks[]
  const planList = (report?.preparationPlan ?? []).map((p, i) => ({
    id: i + 1,
    num: String(p.day ?? i + 1),
    sidebarTitle: p.focus,
    fullQuestion: p.focus,
    whyAsking: null, // no "intention" for plan days -> box hidden below
    howToAnswer: (
      <ul className="space-y-2 list-disc pl-4">
        {(p.tasks ?? []).map((task, t) => (
          <li key={t}>{task}</li>
        ))}
      </ul>
    ),
  }));

  // Map state hooks and data arrays dynamically based on selected tab
  const tabConfig = {
    Technical: {
      list: technicalList,
      currentId: selectedTechId,
      setId: setSelectedTechId,
    },
    Behavioral: {
      list: behavioralList,
      currentId: selectedBehavioralId,
      setId: setSelectedBehavioralId,
    },
    "Prep Plan": {
      list: planList,
      currentId: selectedPlanId,
      setId: setSelectedPlanId,
    },
  };

  const {
    list: currentQuestionsList,
    currentId: currentSelectedId,
    setId: setCurrentSelectedId,
  } = tabConfig[activeSubTab] || tabConfig["Technical"];
  const activeQuestion =
    currentQuestionsList.find((q) => q.id === currentSelectedId) ||
    currentQuestionsList[0];

  // --- ERROR STATE ---
  if (!isReady && error && !loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-6 bg-gray-50 min-h-screen text-center">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50 text-red-500">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Couldn’t load this report</h2>
        <p className="max-w-md text-sm text-gray-500">{error}</p>
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => navigate("/dashboard/reports")}
            className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to reports
          </button>
          <button
            onClick={fetchReport}
            className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <RotateCw size={16} /> Try again
          </button>
        </div>
      </div>
    );
  }

  // --- LOADING STATE ---
  if (!isReady) {
    return <ReportSkeleton />;
  }

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen  mx-auto font-sans">
      {/* SECTION 0: Back link + Report Title */}
      <div className="flex flex-col gap-3">
        <button
          onClick={() => navigate("/dashboard/reports")}
          className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to reports
        </button>
        {report?.title && (
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            {report.title}
          </h1>
        )}
      </div>

      {/* SECTION 1: Metrics Dashboard Row */}
      <div className="flex flex-col md:flex-row gap-6 items-stretch w-full">
        {/* Left Card: Match Score */}
        <div className="flex flex-col items-center justify-between w-full md:w-80 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="w-full text-left text-2xl font-bold text-gray-900 tracking-tight">
            Match Score
          </h2>

          {/* SVG Radial Gauge */}
          <div
            className="relative flex items-center justify-center w-48 h-48 my-6"
            role="img"
            aria-label={`Match score ${matchPercent} out of 100`}
          >
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r={RADIUS}
                className="text-gray-100"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="96"
                cy="96"
                r={RADIUS}
                className={`${score.ring} transition-[stroke-dashoffset] duration-700 ease-out`}
                strokeWidth="10"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={strokeDashOffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-5xl font-bold text-gray-900 leading-none">
                {matchPercent}%
              </span>
              <span className="text-[10px] font-bold text-gray-500 font-mono tracking-widest mt-2 uppercase">
                Out of 100
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-sm font-semibold">
            <Target size={15} className={score.text} />
            <span className={score.text}>{score.label}</span>
          </div>
        </div>

        {/* Right Card: Skill Gap Analysis */}
        <div className="flex-1 bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Skill Gap Analysis
            </h2>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold font-mono tracking-wider rounded-full border border-gray-200">
              {`${report?.skillGaps?.length ?? 0} Main Areas`}
            </span>
          </div>

          {report?.skillGaps?.length ? (
            <div className="flex-1 flex flex-col justify-between gap-6">
              {report.skillGaps.map((skill, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-base font-bold text-gray-900 tracking-tight">
                      {skill.skill}
                    </h4>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold font-mono tracking-wider rounded border-0 capitalize shrink-0 ${
                        severityBadge[skill.severity] || "bg-gray-500 text-white"
                      }`}
                    >
                      {skill.severity}
                    </span>
                  </div>

                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden mt-1">
                    <div
                      className={`${severityBarColor[skill.severity] || "bg-gray-500"} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${severityranks[skill.severity] || 50}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center text-center py-10">
              <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-3" />
              <p className="text-sm font-semibold text-gray-700">
                No major skill gaps found
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Your profile aligns well with this role.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: Interview Prep Plan Box */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 w-full flex flex-col">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-4">
          Interview Prep Plan
        </h2>

        {/* Navigation Tabs */}
        <div
          role="tablist"
          className="flex items-center gap-6 border-b border-gray-200 pb-2 mb-6"
        >
          {SUB_TABS.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeSubTab === tab}
              onClick={() => setActiveSubTab(tab)}
              className={`text-sm font-semibold pb-2 transition-colors relative cursor-pointer ${
                activeSubTab === tab
                  ? "text-emerald-800 border-b-2 border-emerald-800"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Workspace Columns */}
        {currentQuestionsList.length ? (
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left Column Stack */}
            <div className="w-full md:w-80 flex flex-col gap-3 flex-shrink-0">
              {currentQuestionsList.map((q) => {
                const isSelected = currentSelectedId === q.id;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentSelectedId(q.id)}
                    className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white border-emerald-800 ring-1 ring-emerald-800 shadow-sm"
                        : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center w-6 h-6 text-xs font-bold font-mono rounded flex-shrink-0 mt-0.5 ${
                        isSelected
                          ? "bg-emerald-800 text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {q.num}
                    </span>
                    <p
                      className={`text-xs leading-relaxed font-medium ${isSelected ? "text-gray-900 font-bold" : "text-gray-600"}`}
                    >
                      {q.sidebarTitle}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right Column Content Panel */}
            <div className="flex-1 flex flex-col w-full">
              {activeQuestion && (
                <>
                  <div className="mb-3">
                    <span className="px-2 py-1 bg-cyan-50 border border-cyan-100 text-cyan-600 text-[10px] font-bold font-mono rounded tracking-wider uppercase">
                      {activeSubTab} •{" "}
                      {activeSubTab === "Prep Plan"
                        ? `Day ${activeQuestion.num}`
                        : `Question ${activeQuestion.num}`}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 tracking-tight leading-snug mb-6">
                    {activeQuestion.fullQuestion}
                  </h3>

                  {/* Context Box 1: Why they're asking (hidden for Prep Plan) */}
                  {activeQuestion.whyAsking && (
                    <div className="bg-amber-50/50 border border-amber-100/70 rounded-xl p-5 mb-6">
                      <div className="flex items-center gap-2 mb-2 text-amber-800">
                        <Lightbulb size={16} />
                        <h4 className="text-sm font-bold tracking-tight">
                          Why they're asking
                        </h4>
                      </div>
                      <p className="text-amber-900/80 text-sm font-medium leading-relaxed">
                        {activeQuestion.whyAsking}
                      </p>
                    </div>
                  )}

                  {/* Context Box 2: How to answer / Tasks */}
                  <div className="bg-cyan-50/40 border border-cyan-100/60 rounded-xl p-5 mb-6">
                    <div className="flex items-center gap-2 mb-3 text-cyan-800">
                      {activeSubTab === "Prep Plan" ? (
                        <ListChecks size={16} />
                      ) : (
                        <CheckCircle2 size={16} />
                      )}
                      <h4 className="text-sm font-bold tracking-tight">
                        {activeSubTab === "Prep Plan" ? "Tasks" : "How to answer"}
                      </h4>
                    </div>
                    <div className="text-cyan-900/80 text-sm font-medium leading-relaxed space-y-4">
                      {activeQuestion.howToAnswer}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-12">
            <p className="text-sm font-semibold text-gray-700">
              Nothing here yet
            </p>
            <p className="text-xs text-gray-400 mt-1">
              This section has no {activeSubTab.toLowerCase()} content for this report.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportDetail;
