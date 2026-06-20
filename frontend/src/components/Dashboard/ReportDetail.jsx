import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const ReportDetail = () => {
  const { id } = useParams();
  const { GetSingleReporthook, report } = InterviewHook();
  console.log(report);
  const [activeSubTab, setActiveSubTab] = useState("Technical");
  const [selectedTechId, setSelectedTechId] = useState(1);
  const [selectedBehavioralId, setSelectedBehavioralId] = useState(1);
  const [selectedPlanId, setSelectedPlanId] = useState(1);

  useEffect(() => {
    const fetchReport = async () => {
      if (!id) return;
      try {
        const response = await GetSingleReporthook({ id });
      } catch (error) {
        console.error("Error fetching report:", error);
      }
    };
    fetchReport();
  }, []);

  // Match score -> drives both the number and the ring (kept in sync)
  const matchPercent = report?.matchScore ? Math.round(report.matchScore * 100) : 0;
  const strokeDashOffset = CIRCUMFERENCE - (matchPercent / 100) * CIRCUMFERENCE;

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

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen max-w-6xl mx-auto font-sans">
      {/* SECTION 0: Report Title */}
      {report?.title && (
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          {report.title}
        </h1>
      )}

      {/* SECTION 1: Metrics Dashboard Row */}
      <div className="flex flex-col md:flex-row gap-6 items-stretch w-full">
        {/* Left Card: Match Score */}
        <div className="flex flex-col items-center justify-between w-full md:w-80 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="w-full text-left text-2xl font-bold text-gray-900 tracking-tight">
            Match Score
          </h2>

          {/* SVG Radial Gauge */}
          <div className="relative flex items-center justify-center w-48 h-48 my-6">
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
                className="text-emerald-800"
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

         {/* <p className="text-gray-600 text-base font-medium">
  Decent match —{" "}
  
    href="#"
    className="text-emerald-800 underline decoration-1 underline-offset-4 hover:text-emerald-900 font-semibold"
  >
    close some gaps.
  </a>
</p> */}
        </div>

        {/* Right Card: Skill Gap Analysis */}
        <div className="flex-1 bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Skill Gap Analysis
            </h2>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold font-mono tracking-wider rounded-full border border-gray-200">
              {`${report?.skillGaps?.length ?? 0} Main Areas`}
            </span>
          </div>

          <div className="space-y-6">
            {report?.skillGaps?.map((skill, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-base font-bold text-gray-900 tracking-tight">
                      {skill.skill}
                    </h4>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold font-mono tracking-wider rounded border 
                  ${
                    skill.severity === "high"
                      ? "bg-red-600 text-white capitalize"
                      : skill.severity === "medium"
                        ? "bg-yellow-500 text-white capitalize"
                        : skill.severity === "low"
                          ? "bg-green-500 text-white capitalize"
                          : "bg-gray-500 text-white capitalize"
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
        </div>
      </div>

      {/* SECTION 2: Interview Prep Plan Box */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 w-full flex flex-col">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-4">
          Interview Prep Plan
        </h2>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-6 border-b border-gray-200 pb-2 mb-6">
          {SUB_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`text-sm font-semibold pb-2 transition-colors relative ${
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
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Left Column Stack */}
          <div className="w-full md:w-80 flex flex-col gap-3 flex-shrink-0">
            {currentQuestionsList.map((q) => {
              const isSelected = currentSelectedId === q.id;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentSelectedId(q.id)}
                  className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "bg-white border-emerald-800 ring-1 ring-emerald-800 shadow-sm"
                      : "bg-white border-gray-200 hover:border-gray-300"
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
            {activeQuestion ? (
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
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
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
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                    <h4 className="text-sm font-bold tracking-tight">
                      {activeSubTab === "Prep Plan" ? "Tasks" : "How to answer"}
                    </h4>
                  </div>
                  <div className="text-cyan-900/80 text-sm font-medium leading-relaxed space-y-4">
                    {activeQuestion.howToAnswer}
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-400 font-medium">Loading…</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;