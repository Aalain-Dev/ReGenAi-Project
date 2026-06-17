import React from "react";

const Home = () => {
  return (
    <>
      <div className="bg-[#F7F9FB] px-8 py-5">
        <div className="box">
          <p className="text-2xl font-bold">
            Interview Intelligence
            
          </p>
          <p className="text-[15px] mt-2 capitalize">
            Benchmark your current skill levels against industry standards before your next major interview.
          </p>
        </div>
        <div className="flex flex-row  bg-slate-50 flex flex-col gap-6 font-sans">
      <div className="w-1/1">

     <div className=" mt-5  bg-[#f8fafc] ">
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
        
        {/* Left Side: Content */}
        <div className="flex flex-col flex-1 text-left">
          <h2 className="text-2xl font-bold text-[#0f172a] mb-3 tracking-tight">
            Scan Your Readiness
          </h2>
          <p className="text-[#475569] text-base leading-relaxed mb-6 max-w-xl">
            Our AI engine compares your profile against 10,000+ successful interview patterns for your target role.
          </p>
          <div>
            <button className="inline-flex items-center gap-2 bg-[#111827] hover:bg-[#1f2937] text-white font-medium text-sm px-5 py-3 rounded-md transition-colors duration-200 shadow-sm">
              {/* <PlusCircle size={16} className="stroke-[2.5]" /> */}
              <span>  New Readiness Scan</span>
            </button>
          </div>
        </div>

        {/* Right Side: AI Illustration Block */}
        <div className=" bg-[#f4fbf9] border border-[#e6f7f3] rounded-2xl flex items-center justify-center shrink-0">
          {/* Custom SVG replicating the gear-in-head icon from image_95b822.png */}
          <svg 
            className="w-24 h-24 text-[#a3d6cc]" 
            viewBox="0 0 100 100" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            {/* Outer Head Profile Contour */}
            <path d="M35 80 V68 C35 60 42 55 50 55 H54 C62 55 68 48 68 40 C68 28 58 18 45 18 C32 18 22 28 22 40 C22 48 26 55 32 59" />
            <path d="M54 55 H60 C64 55 64 62 60 62 H54 V80" />
            
            {/* Inner Gear Graphic */}
            <circle cx="45" cy="40" r="8" strokeWidth="4" />
            <path d="M45 28 V30 M45 50 V48 M33 40 H35 M57 40 H55 M36 32 L38 34 M54 48 L52 46 M36 48 L38 46 M54 32 L52 34" strokeWidth="4" />
          </svg>
        </div>

      </div>
      <div className="w-full mt-10 mx-auto bg-white border border-gray-100 rounded-lg shadow-sm font-sans">
      
      {/* Header Section */}
      <div className="flex justify-between items-center mt-5 px-6 py-4 border-b border-gray-100">
        <h2 className="text-xs font-bold tracking-widest text-gray-500 uppercase">
          Recent Reports
        </h2>
        <span className="text-xs font-medium text-gray-400">
          0 Reports
        </span>
      </div>

      {/* Main Empty State Content */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-16 sm:py-24">
        
        {/* Icon Container */}
        <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-xl mb-6">
          {/* Custom Search/Magnifying Glass with Chart SVG */}
          <svg 
            className="w-8 h-8 text-teal-700" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 11l2-2 2 3 2-2" />
          </svg>
        </div>

        {/* Heading */}
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
          No Analyses Yet
        </h3>

        {/* Description */}
        <p className="max-w-md text-sm sm:text-base text-gray-500 leading-relaxed mb-8">
          Start your journey by generating your first deep-dive report. 
          We'll analyze your competency gaps and provide a tailored growth plan.
        </p>

        {/* Action Button */}
      

      </div>
    </div>
    </div>
      </div>
    
     <div className="w-1/3 mt-5">
       <div className="bg-[#f0f2fa] border border-[#e2e6f4] rounded-lg p-6 flex flex-col gap-4 mb-10">
        <div className="flex items-center gap-2 text-[#6366f1] font-semibold tracking-wider text-xs uppercase">
          {/* <Lightbulb size={16} className="stroke-[2.5]" /> */}
          <span>Pro Tip</span>
        </div>
        <p className="text-[#374151] text-[15px] leading-relaxed font-medium">
          Complete your technical profile first. Reports are 40% more accurate when they can cross-reference your project history.
        </p>
      </div>

      {/* --- BENCHMARKING CARD --- */}
      <div className="bg-white border border-[#f3f4f6] rounded-lg p-6 shadow-sm flex flex-col gap-4">
        {/* Header Tag */}
        <div className="flex items-center gap-2 text-[#0d7c75] font-bold tracking-wider text-xs uppercase">
          {/* <TrendingUp size={16} className="stroke-[2.5]" /> */}
          <span>Benchmarking</span>
        </div>

        {/* Title & Description */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold text-[#0f172a] tracking-tight">
            Sector Standards
          </h3>
          <p className="text-[#4b5563] text-[15px] leading-relaxed">
            Compare your performance against median data from Top 100 Tech firms and Fortune 500 leadership requirements.
          </p>
        </div>

        {/* Progress Bars */}
        <div className="flex flex-col gap-4 mt-2">
          {/* Progress Item 1 */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-sm font-mono font-bold text-[#1f2937]">
              <span>Avg. Leadership</span>
              <span>82%</span>
            </div>
            <div className="w-full h-2 bg-[#f3f4f6] rounded-full overflow-hidden">
              <div className="h-full bg-[#0d7c75] rounded-full" style={{ width: '82%' }}></div>
            </div>
          </div>

          {/* Progress Item 2 */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-sm font-mono font-bold text-[#1f2937]">
              <span>System Design</span>
              <span>68%</span>
            </div>
            <div className="w-full h-2 bg-[#f3f4f6] rounded-full overflow-hidden">
              <div className="h-full bg-[#0d7c75] rounded-full" style={{ width: '68%' }}></div>
            </div>
          </div>
        </div>
      </div>
     </div>

    </div>
      </div>
    </>
  );
};

export default Home;
