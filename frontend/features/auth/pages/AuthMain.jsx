import React, { useState } from "react";
import ai_advice from "../../../src/assets/auth/ai_advice.png";
import roadmap from "../../../src/assets/auth/roadmap.png";
import skill_gap from "../../../src/assets/auth/skill_gap.png";
import ats_score from "../../../src/assets/auth/ats_score.png";
import SignIn from "./SignIn";
import Signup from "./Signup";
const AuthMain = () => {
  const [value, setvalue] = useState(false);
  return (
    <>
      <div className=" flex bg h-fit">
        {/* Left Side */}
        <div className="w-1/2 bg-[#0D0D15] h-fit  p-4">
          <div className="bar">
            <p className="font-color text-2xl font-bold">CareerAI</p>

            <h1 className="text-white text-5xl mt-10 font-bold">
              Unlock Your <span className="font-color">Career Potential</span>{" "}
              with AI
            </h1>
            <p className="text-[#C7C4D7] mt-10 capitalize">
              The precision of neural networks meets professional growth.
              Navigate your career path with data-driven confidence.
            </p>
            <div className="cards-section flex justify-center gap-10 items-center ">
              <div className="card bg-[#1a1a1a] w-[45%] border-2 border-[#ffffff88] px-5 py-5 flex flex-col items-start rounded-2xl">
                <p className="text-white uppercase">Resume Score</p>
                <p className="text-white mt-5 ">
                  <span className="font-color text-4xl font-bold">92 </span>/100
                </p>
                <p className="bg-[#34343b] text-white mt-5 py-1.5 px-2 border-white border-[1.2px] text-center rounded-3xl text-[13px] ">
                  ATS Compatible{" "}
                </p>
              </div>
              <div className="card bg-[#1a1a1a] w-[45%]  border-2 border-[#ffffff88] px-5 py-5 flex flex-col items-start rounded-2xl">
                <p className="text-white">TOP SKILLS MATCH</p>
                <p className="bg-[#292930] py-1.2 px-2 py-1 text-[13px] mt-3 rounded-2xl text-white">
                  Product Strategy
                </p>
                <p className="bg-[#292930] py-1.2 px-2 py-1 text-[13px] mt-3 rounded-2xl text-white">
                  Neural Networks{" "}
                </p>
                <p className="bg-[#292930] py-1.2 px-2 py-1 text-[13px] mt-3 rounded-2xl text-white">
                  System Design{" "}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/2 bg-[#1f1f27] p-4">
          <div className="flex items-center justify-center">
            <div className="form mt-10 bg-[#0D0D15] px-10 w-[80%] flex items-center justify-center flex-col rounded-2xl pt-10 pb-10">
              <p className="text-white text-2xl">Welcome Back</p>
              <div className="flex gap-10 mt-10 flex-row w-full items-center ">
                <p
                  className={`px-2 py-2 rounded-[10px] w-full cursor-pointer font-semibold text-[15px] text-center transition-all ${
                    value ? "text-white" : "bg-white text-black"
                  }`}
                  onClick={() => {
                    setvalue(!value);
                  }}
                >
                  Sign In
                </p>
                <p
                  className={`px-2 py-2 rounded-[10px] w-full cursor-pointer font-semibold text-[15px] text-center transition-all ${
                    value
                      ? "bg-white text-black" // Classes applied when isActive is true
                      : "text-white" // Classes applied when isActive is false
                  }`}
                  onClick={() => {
                    setvalue(!value);
                  }}
                >
                  Sign Up
                </p>
              </div>
              {value ? <Signup/> : <SignIn />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthMain;

// Lekha
// - otp study for forgot password 
// - sign and signup proper Ui
// -                        


// Aalain