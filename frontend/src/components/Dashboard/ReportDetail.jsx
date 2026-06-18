import React, { useState } from 'react'

const ReportDetail = () => {
  // Score config
  const score = 85;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Skills config
  const skills = [
    {
      title: 'Backend Frameworks',
      subtitle: 'Node.js/Express, Python/Django/Flask',
      gapType: 'HIGH GAP',
      progress: 60,
      color: 'bg-red-700',
      badgeBg: 'bg-red-50 text-red-600 border-red-100',
    },
    {
      title: 'Database Design & Management',
      subtitle: 'SQL/NoSQL schemas, complex queries, ORMs',
      gapType: 'HIGH GAP',
      progress: 40,
      color: 'bg-red-700',
      badgeBg: 'bg-red-50 text-red-600 border-red-100',
    },
    {
      title: 'API Design & Implementation',
      subtitle: 'Scalable APIs, RESTful principles, Security',
      gapType: 'MEDIUM GAP',
      progress: 80,
      color: 'bg-emerald-800',
      badgeBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
  ];

  // Interview Prep Main Tabs Navigation
  const subTabs = ['Technical', 'Behavioral', 'Prep Plan'];
  const [activeSubTab, setActiveSubTab] = useState('Technical');

  // Track selected question IDs for each tab individually to preserve state
  const [selectedTechId, setSelectedTechId] = useState(1);
  const [selectedBehavioralId, setSelectedBehavioralId] = useState(1);
  const [selectedPlanId, setSelectedPlanId] = useState(1);

  // --- TECHNICAL DATA STORE ---
  const techQuestions = [
    {
      id: 1,
      num: '1',
      sidebarTitle: 'Explain data fetching and rendering strategies in Next.js (SSR, SSG, ISR, CSR)...',
      fullQuestion: 'Explain the different data fetching and rendering strategies available in Next.js (SSR, SSG, ISR, CSR). When would you choose one over the other?',
      whyAsking: "To assess the candidate's understanding of Next.js performance optimizations, SEO implications, and ability to make informed architectural decisions based on project requirements.",
      howToAnswer: (
        <>
          <p>Discuss <strong className="text-gray-900">Server-Side Rendering (SSR)</strong> for dynamic, frequently updated data and SEO; <strong className="text-gray-900">Static Site Generation (SSG)</strong> for static content with high performance and security.</p>
          <p><strong className="text-gray-900">Incremental Static Regeneration (ISR)</strong> acts as a hybrid for frequently updated static content, while <strong className="text-gray-900">Client-Side Rendering (CSR)</strong> is ideal for highly interactive, user-specific content behind authentication.</p>
          <p className="text-cyan-800/70 font-normal">Provide specific use cases for each and how they impact user experience and load times (LCP, CLS metrics).</p>
        </>
      )
    },
    {
      id: 2,
      num: '2',
      sidebarTitle: 'Redux vs TanStack Query: Scenarios for choosing one over the other...',
      fullQuestion: 'Redux vs TanStack Query: What are the optimal architectural scenarios for choosing one over the other in large-scale applications?',
      whyAsking: 'To evaluate your understanding of global client state vs server cache synchronization management, minimizing unnecessary boilerplate re-renders.',
      howToAnswer: (
        <>
          <p>Differentiate between <strong className="text-gray-900">Server State</strong> (caching, fetching, loading states) managed perfectly by TanStack Query, and <strong className="text-gray-900">Global Client State</strong> (UI themes, complex multi-step forms, authentication workflows) managed by Redux.</p>
          <p>Emphasize that most modern apps can replace Redux entirely with TanStack Query combined with React Context if data is primarily driven by asynchronous backend API endpoints.</p>
        </>
      )
    },
    {
      id: 3,
      num: '3',
      sidebarTitle: 'Testing React components with Jest and React Testing Library...',
      fullQuestion: 'What is your best practice checklist for testing React components reliably using Jest and React Testing Library?',
      whyAsking: 'To gauge your approach toward reliable deployment safeguards and your philosophy on testing behavior rather than raw implementation details.',
      howToAnswer: (
        <>
          <p>Explain the importance of prioritizing <strong className="text-gray-900">RTL queries accessible to everyone</strong> (like `getByRole` or `getByLabelText`) over implementation tags like test IDs.</p>
          <p>Mention strategies for safely mocking network requests via tools like MSW (Mock Service Worker) instead of polluting components with manual Jest function spy overwrites.</p>
        </>
      )
    },
    {
      id: 4,
      num: '4',
      sidebarTitle: 'Integrating Strapi and Hygraph: Fundamental differences and use cases...',
      fullQuestion: 'When integrating Strapi vs Hygraph, what are the fundamental architectural differences and infrastructure trade-offs?',
      whyAsking: 'To test content delivery systems engineering knowledge and evaluate choices between self-hosted monolithic headless codebases and cloud-managed SaaS infrastructures.',
      howToAnswer: (
        <>
          <p>Contrast <strong className="text-gray-900">Strapi</strong> (an open-source, customizable, self-hosted Node.js framework giving full database ownership) with <strong className="text-gray-900">Hygraph</strong> (a native GraphQL federated SaaS platform offering instant global CDN distributions).</p>
          <p>Frame decisions around pricing predictability, data residency compliance laws, and deep API graph schema mesh synchronization complexities.</p>
        </>
      )
    }
  ];

  // --- BEHAVIORAL DATA STORE ---
  const behavioralQuestions = [
    {
      id: 1,
      num: '1',
      sidebarTitle: 'Tell me about a time you had to deal with a difficult stakeholder conflict...',
      fullQuestion: 'Describe a significant cross-functional project where you faced intense stakeholder conflict. How did you realign objectives?',
      whyAsking: 'To understand your emotional intelligence, collaborative communication style, and structural negotiation tactics under high-pressure scenarios.',
      howToAnswer: (
        <>
          <p>Utilize the <strong className="text-gray-900">STAR method</strong> (Situation, Task, Action, Result). Explicitly outline the divergent priorities of engineers vs product owners without sounding critical or dismissive.</p>
          <p>Focus your action on bringing <strong className="text-gray-900">data-backed trade-off analysis panels</strong> to the discussion table, demonstrating how you built empathy to align conflicting metrics into unified milestones.</p>
        </>
      )
    },
    {
      id: 2,
      num: '2',
      sidebarTitle: 'Describe a situation where you missed a critical milestone deployment...',
      fullQuestion: 'Walk me through a situation where your team missed an essential deployment deadline. What steps did you take to manage the fallout?',
      whyAsking: 'To evaluate accountability transparency, crisis management capabilities, and post-mortem operational improvements.',
      howToAnswer: (
        <>
          <p>Own the setback immediately. Explain the unforeseen bottleneck clearly while mapping out how you proactively communicated expectations with cross-team partners before the deadline lapsed.</p>
          <p>Conclude with your <strong className="text-gray-900">Root Cause Analysis (RCA)</strong> implementations, detailing how sprint sizing systems were upgraded to avoid repeating the mistake.</p>
        </>
      )
    },
    {
      id: 3,
      num: '3',
      sidebarTitle: 'How do you prioritize tech debt versus shipping new consumer features...',
      fullQuestion: 'How do you approach negotiation with Product Management when dealing with critical technical debt architectural refactoring?',
      whyAsking: 'To check your business acumen and see if you can tie engineering health directly to product velocity and company revenue metrics.',
      howToAnswer: (
        <>
          <p>Avoid technical jargon. Frame tech debt in terms of <strong className="text-gray-900">risk mitigation</strong> and <strong className="text-gray-900">velocity loss multipliers</strong> (e.g., "Feature X will take 3 weeks instead of 3 days unless we refactor this module first").</p>
          <p>Advocate for structural percentage buffers (like assigning 20% of every sprint capacity to engineering health chores) to establish consistent baselines.</p>
        </>
      )
    },
    {
      id: 4,
      num: '4',
      sidebarTitle: 'Tell me about a time you mentored a junior engineer who was struggling...',
      fullQuestion: 'Describe a scenario where you noticed a reporting or junior team member struggling. How did you tailor your mentorship approach?',
      whyAsking: 'To assess your leadership maturity, pedagogical patience, and investment in building resilient team cultures.',
      howToAnswer: (
        <>
          <p>Emphasize creating safe feedback loops. Explain how you broken down broad abstract assignments into digestible mini-tasks to boost early confidence patterns.</p>
          <p>Discuss transitioning from direct instruction loops to collaborative peer programming pairing workshops, tracking actionable growth objectives over a clean multi-week horizon.</p>
        </>
      )
    }
  ];

  // --- PREP PLAN DATA STORE ---
  const planQuestions = [
    {
      id: 1,
      num: '1',
      sidebarTitle: 'Core Architecture Review Checklist (System Scaling, CDNs)...',
      fullQuestion: 'What is your core system architecture validation checklist prior to kicking off tier-1 high availability product rounds?',
      whyAsking: 'To map your absolute technical scope limitations and determine if your foundational standards align with hyper-scale infrastructure roles.',
      howToAnswer: (
        <>
          <p>Structure answers cleanly into layers: Edge routing distribution (CDNs, DNS Anycast), Application scalability (State abstraction, connection pooling), and Data guarantees (replication lag configurations).</p>
          <p>Mention setting explicit Service Level Objectives (SLOs) alongside aggressive stress tests to isolate failure surfaces under synthetic spike simulations.</p>
        </>
      )
    },
    {
      id: 2,
      num: '2',
      sidebarTitle: '30-60-90 Day Execution Roadmap Planning Matrix...',
      fullQuestion: 'What does your strategic 30-60-90 day engineering execution roadmap look like for this specific leadership tier?',
      whyAsking: 'To gauge your proactive autonomy, onboarding execution speeds, and systematic understanding of target infrastructure health.',
      howToAnswer: (
        <>
          <p><strong className="text-gray-900">Days 1-30:</strong> Heavy absorption, deep component discovery, code shipping, and deep listening workflows across engineering peers.</p>
          <p><strong className="text-gray-900">Days 31-60:</strong> Identifying immediate execution low-hanging fruit, leading core code deployments, and eliminating localized development velocity blockages.</p>
          <p><strong className="text-gray-900">Days 61-90:</strong> Owning broad delivery roadmaps, executing cross-functional initiatives, and setting up future engineering structural benchmarks.</p>
        </>
      )
    },
    {
      id: 3,
      num: '3',
      sidebarTitle: 'Security Baseline Auditing: IAM roles, OWASP Top 10...',
      fullQuestion: 'How do you enforce security baseline compliance checking within modern rapid continuous deployment application layers?',
      whyAsking: 'To evaluate your security posture awareness and check if you treat code security as an integrated pipeline phase rather than an isolated audit afterthought.',
      howToAnswer: (
        <>
          <p>Advocate for shifting security left. Mention automated Static Application Security Testing (SAST) engines running checks within early pull request validation layers.</p>
          <p>Detail zero-trust configurations utilizing tightly scoped IAM task assignments, secrets management servers, and continuous tracking protocols matching current OWASP top risks.</p>
        </>
      )
    },
    {
      id: 4,
      num: '4',
      sidebarTitle: 'Operational Monitoring Matrix: SLIs, Error Budgets...',
      fullQuestion: 'How do you design, establish, and communicate operational monitoring frameworks and team error budget boundaries?',
      whyAsking: 'To understand your perspective regarding application resilience guarantees, site reliability management, and live outage response loops.',
      howToAnswer: (
        <>
          <p>Define clear tracking loops using Service Level Indicators (SLIs) like request latency boundaries and precise error rate tracking parameters.</p>
          <p>Explain using error budgets as direct product feature release gatekeepers—if the reliability budget is exhausted by outages, sprints pivot strictly toward stability refactoring goals.</p>
        </>
      )
    }
  ];

  // Determine current active question collection and selection state handlers matching current active subtab selection
  let currentQuestionsList = techQuestions;
  let currentSelectedId = selectedTechId;
  let setCurrentSelectedId = setSelectedTechId;

  if (activeSubTab === 'Behavioral') {
    currentQuestionsList = behavioralQuestions;
    currentSelectedId = selectedBehavioralId;
    setCurrentSelectedId = setSelectedBehavioralId;
  } else if (activeSubTab === 'Prep Plan') {
    currentQuestionsList = planQuestions;
    currentSelectedId = selectedPlanId;
    setCurrentSelectedId = setSelectedPlanId;
  }

  const activeQuestion = currentQuestionsList.find(q => q.id === currentSelectedId) || currentQuestionsList[0];

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen max-w-6xl mx-auto font-sans">
      
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
                r={radius}
                className="text-gray-100"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="96"
                cy="96"
                r={radius}
                className="text-emerald-800"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-5xl font-bold text-gray-900 leading-none">
                {score}
              </span>
              <span className="text-[10px] font-bold text-gray-500 font-mono tracking-widest mt-2 uppercase">
                Out of 100
              </span>
            </div>
          </div>

          <p className="text-gray-600 text-base font-medium">
            Decent match —{' '}
            <a href="#" className="text-emerald-800 underline decoration-1 underline-offset-4 hover:text-emerald-900 font-semibold">
              close some gaps.
            </a>
          </p>
        </div>

        {/* Right Card: Skill Gap Analysis */}
        <div className="flex-1 bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Skill Gap Analysis
            </h2>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold font-mono tracking-wider rounded-full border border-gray-200">
              3 Active Areas
            </span>
          </div>

          {/* Skill Rows */}
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-base font-bold text-gray-900 tracking-tight">
                      {skill.title}
                    </h4>
                    <p className="text-sm text-gray-500 font-medium">
                      {skill.subtitle}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] font-bold font-mono tracking-wider rounded border ${skill.badgeBg}`}>
                    {skill.gapType}
                  </span>
                </div>

                {/* Custom Horizontal Progress Bar */}
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden mt-1">
                  <div
                    className={`${skill.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${skill.progress}%` }}
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
          {subTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`text-sm font-semibold pb-2 transition-colors relative ${
                activeSubTab === tab 
                  ? 'text-emerald-800 border-b-2 border-emerald-800' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dual Column Core Workspace */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Left Column Stack: Dynamic selection cards based on Active Tab */}
          <div className="w-full md:w-80 flex flex-col gap-3 flex-shrink-0">
            {currentQuestionsList.map((q) => {
              const isSelected = currentSelectedId === q.id;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentSelectedId(q.id)}
                  className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-white border-emerald-800 ring-1 ring-emerald-800 shadow-sm'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className={`flex items-center justify-center w-6 h-6 text-xs font-bold font-mono rounded flex-shrink-0 mt-0.5 ${
                    isSelected ? 'bg-emerald-800 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {q.num}
                  </span>
                  <p className={`text-xs leading-relaxed font-medium ${
                    isSelected ? 'text-gray-900 font-bold' : 'text-gray-600'
                  }`}>
                    {q.sidebarTitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column Layout: Display Card content matching Selection */}
          <div className="flex-1 flex flex-col w-full">
            
            {/* Tag Badge */}
            <div className="mb-3">
              <span className="px-2 py-1 bg-cyan-50 border border-cyan-100 text-cyan-600 text-[10px] font-bold font-mono rounded tracking-wider uppercase">
                {activeSubTab} • Question {activeQuestion.num}
              </span>
            </div>

            {/* Display Dynamic Question Header */}
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight leading-snug mb-6">
              {activeQuestion.fullQuestion}
            </h3>

            {/* Context Box 1: Why they're asking */}
            <div className="bg-amber-50/50 border border-amber-100/70 rounded-xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-2 text-amber-800">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h4 className="text-sm font-bold tracking-tight">Why they're asking</h4>
              </div>
              <p className="text-amber-900/80 text-sm font-medium leading-relaxed">
                {activeQuestion.whyAsking}
              </p>
            </div>

            {/* Context Box 2: How to answer */}
            <div className="bg-cyan-50/40 border border-cyan-100/60 rounded-xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-3 text-cyan-800">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h4 className="text-sm font-bold tracking-tight">How to answer</h4>
              </div>
              <div className="text-cyan-900/80 text-sm font-medium leading-relaxed space-y-4">
                {activeQuestion.howToAnswer}
              </div>
            </div>

            {/* Bottom Action Footer Control Panel */}
           

          </div>
        </div>
      </div>

    </div>
  )
}

export default ReportDetail