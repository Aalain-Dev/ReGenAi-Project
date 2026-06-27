import React, { useState } from "react";
import SignIn from "./SignIn";
import Signup from "./Signup";

const AuthMain = () => {
  const [value, setvalue] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side */}
       <div className="w-full lg:w-1/2 p-4 md:p-6 lg:p-8 flex items-center justify-center bg-white">
        <div className="shadow-lg px-6 md:px-8 lg:px-10 py-8 w-full max-w-md rounded-xl">
          <p className="text-black text-2xl md:text-3xl font-semibold">
            Welcome Back
          </p>

          <p className="text-black mt-4 text-sm md:text-base">
            Access your growth dashboard and competency matrix.
          </p>

          {/* Tabs */}
          <div className="flex gap-3 mt-8 w-full">
            <button
              className={`px-4 py-3 rounded-xl w-full cursor-pointer font-semibold text-sm md:text-base transition-all ${
                !value ? "text-white bg-black" : "bg-gray-100 text-black"
              }`}
              onClick={() => setvalue(false)}
            >
              Sign In
            </button>

            <button
              className={`px-4 py-3 rounded-xl w-full cursor-pointer font-semibold text-sm md:text-base transition-all ${
                value ? "text-white bg-black" : "bg-gray-100 text-black"
              }`}
              onClick={() => setvalue(true)}
            >
              Sign Up
            </button>
          </div>

          <div className="mt-6">
            {value ? <Signup /> : <SignIn />}
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 bg-[#0D0D15] p-6 md:p-8 lg:p-10">
      
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            SkillGrowth
          </h1>

          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl mt-8 md:mt-10 font-bold leading-tight">
            Transform Your Resume Into Interview Success
          </h1>

          <p className="text-[#fff] mt-6 md:mt-8 text-sm md:text-base leading-relaxed">
            Leverage AI to analyze your experience against real job
            requirements. Discover missing skills, practice targeted interview
            questions, and follow a customized preparation plan designed to help
            you stand out.
          </p>

          {/* Cards */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-[#0000] border-2 border-[#ffffff88] px-5 py-5 rounded-xl">
              <p className="text-white uppercase text-sm md:text-base">
                Resume Score
              </p>

              <p className="text-white mt-5">
                <span className="text-4xl md:text-5xl font-bold">92</span>
                <span className="text-lg md:text-xl"> /100</span>
              </p>

              <p className="inline-block bg-[#34343b] text-white mt-5 py-2 px-4 border border-white rounded-xl text-xs md:text-sm">
                ATS Compatible
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#0000] border-2 border-[#ffffff88] px-5 py-5 rounded-xl">
              <p className="text-white uppercase text-sm md:text-base">
                Top Skills Match
              </p>

              <div className="flex flex-wrap gap-3 mt-4">
                <span className="bg-[#292930] px-3 py-2 text-xs md:text-sm rounded-xl text-white border border-white">
                  Product Strategy
                </span>

                <span className="bg-[#292930] px-3 py-2 text-xs md:text-sm rounded-xl text-white border border-white">
                  Neural Networks
                </span>

                <span className="bg-[#292930] px-3 py-2 text-xs md:text-sm rounded-xl text-white border border-white">
                  System Design
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
     
    </div>
  );
};

export default AuthMain;