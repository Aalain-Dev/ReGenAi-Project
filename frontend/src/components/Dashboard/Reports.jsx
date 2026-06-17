import React from "react";

const Reports = () => {
  return (
    <>
      <div className="flex bg-[#F7F9FB] px-8 py-5 justify-between">
        <h2 className="text-2xl font-semibold">Reports Generated</h2>
        <button className="bg-black px-3 text-white py-2 hover:bg-[#302f2f] transition-all duration-300 ease-in-out rounded-3xl cursor-pointer font-semibold">
          Generate Report
        </button>
      </div>
    </>
  );
};

export default Reports;
