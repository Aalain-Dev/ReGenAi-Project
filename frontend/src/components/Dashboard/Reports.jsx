import React, { useEffect, useState } from "react";
import GenerateReportModal from "./GenerateReportModal";
import JobMatchCard from "./JobMatchCard";
import ReportDetail from "./ReportDetail";
import InterviewHook from "../../../features/interview/hooks/interview.hooks";

const Reports = () => {
  const [open, setOpen] = useState(false);

  const { GetallReporthook, reports } = InterviewHook();

  useEffect(() => {
    GetallReporthook();
  }, []);

  return (
    <>
      <div className="bg-[#F7F9FB] px-8 py-5">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">
            Generated Reports
          </h2>

          <button
            className="bg-black px-3 py-2 text-white rounded-3xl font-semibold cursor-pointer hover:bg-[#302f2f] transition-all duration-300 ease-in-out"
            onClick={() => setOpen(true)}
          >
            Generate Report
          </button>
        </div>

        <GenerateReportModal
          isOpen={open}
          onClose={() => setOpen(false)}
        />
      </div>

      <div className="grid grid-cols-3 gap-10 px-8 py-5">
        {reports?.length > 0 ? (
          reports?.map((report) => (
            <JobMatchCard
              key={report._id}
              title={report.title}
              report={report}
            />
          ))
        ) : (
          <p>No reports found.</p>
        )}
      </div>

      {/* <ReportDetail /> */}
    </>
  );
};

export default Reports;