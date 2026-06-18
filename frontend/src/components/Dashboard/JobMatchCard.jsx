import React from 'react';
import { NavLink } from "react-router-dom";

const JobMatchCard = () => {
  // Percentage for the progress circle
  const percentage = 62;
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center max-w-md bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative pl-5 pr-6 py-5">
      {/* Thick left accent border */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-800 rounded-l-xl" />

      {/* Progress Circle Container */}
      <div className="relative flex items-center justify-center flex-shrink-0 w-20 h-20 mr-4">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            className="text-gray-100"
            strokeWidth="5"
            stroke="currentColor"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            className="text-emerald-800"
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
          />
        </svg>
        {/* Percentage Text */}
        <span className="absolute text-sm font-semibold text-gray-900">
          {percentage}%
        </span>
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-center">
        <h3 className="text-xl font-bold text-gray-900 tracking-tight">
          Technical Lead
        </h3>
        

        {/* Tags */}
        <div className="flex items-start gap-2 mt-4">
          <span className="px-2.5 py-1 bg-gray-50 text-gray-700 text-xs font-bold font-mono rounded tracking-wider uppercase">
            Cloud Arch
          </span>
          <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold font-mono rounded tracking-wider uppercase">
            Critical Gap
          </span>
        </div>
        <NavLink className="text-ls mt-2 w-[60%] text-center  text-black underline pb-1 px-2 py-2 rounded-xl">
          View Report
        </NavLink>
      </div>
    </div>
  );
};

export default JobMatchCard;