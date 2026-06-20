import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const JobMatchCard = ({
  report,
  title,
  radius,
  circumference,
  strokeDashoffset,
}) => {
  const navigate = useNavigate();

  return (
    <NavLink
      to={navigate(`/dashboard/reports/${report._id}`)}
      className="
    block
    transform
    transition-all
    duration-300
    ease-out
    hover:scale-[1.03]
    hover:-translate-y-1
    hover:shadow-xl
    active:scale-[0.99]
    cursor-pointer
  "
    >
      <div className="flex items-center bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative pl-5 pr-6 py-5">
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
            {Math.round(report.matchScore * 100)}%
          </span>
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">
            {title}
          </h3>

          <div className="flex items-start gap-2 mt-4">
            <span className="px-2.5 py-1 bg-gray-50 text-gray-700 text-xs font-bold font-mono rounded tracking-wider capitalize">
              Skills Gap : {report?.skillGaps?.length}
            </span>

            <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold font-mono rounded tracking-wider capitalize">
              Severity : {report?.skillGaps?.[0]?.severity}
            </span>
          </div>

          {/* No NavLink here */}
          <p className="text-sm mt-3 text-black underline font-medium">
            View Report →
          </p>
        </div>
      </div>
    </NavLink>
  );
};

export default JobMatchCard;
