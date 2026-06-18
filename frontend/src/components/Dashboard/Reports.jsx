import React, { useState } from "react";
import GenerateReportModal from "./GenerateReportModal";
import JobMatchCard from "./JobMatchCard";
import ReportDetail from "./ReportDetail";

const Reports = () => {
    const [open, setOpen] = useState(false);

  return (
    <>
      <div className=" bg-[#F7F9FB] px-8 py-5 justify-between">
       <div className="flex justify-between">
         <h2 className="text-2xl font-semibold">Generated Reports </h2>
        <button className="bg-black px-3 text-white py-2 hover:bg-[#302f2f] transition-all duration-300 ease-in-out rounded-3xl cursor-pointer font-semibold"
                onClick={() => setOpen(true)}
          >
          Generate Report
        </button>
         <GenerateReportModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />
       </div>

      </div>
     <div className="grid grid-cols-3 gap-10 px-8 py-5">
       <JobMatchCard />
       <JobMatchCard />
       <JobMatchCard />
       <JobMatchCard />
       <JobMatchCard />
     </div>
<ReportDetail/>
    </>
  );
};

export default Reports;
