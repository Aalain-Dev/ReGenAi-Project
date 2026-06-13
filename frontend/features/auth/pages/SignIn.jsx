import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/auth.hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { handleRegister } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });
  const onSubmit = async (data) => {
    try {
      const response = await handleRegister(data);
      if (response.token) {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" bg-slate-950 flex items-center justify-center p-4 md:p-6 antialiased selection:bg-indigo-500 selection:text-white">
        <div className="w-full max-w-5xl grid lg:grid-cols-12 overflow-hidden rounded-3xl shadow-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-md">
          {/* Left Side */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-12 text-white relative bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border-r border-slate-800">
            <div>
              <span className="text-indigo-400 font-bold tracking-wider text-xs uppercase">
                Authentication System
              </span>
              <h1 className="mt-6 text-5xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Welcome
                <br />
                Back.
              </h1>
              <p className="mt-6 text-slate-400 text-sm leading-relaxed font-medium">
                Access your dashboard, manage projects, track KPIs, monitor
                performance and collaborate with your team.
              </p>
            </div>

            <div className="flex gap-2">
              <div className="h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></div>
              <div className="h-2 w-2 rounded-full bg-indigo-500/60"></div>
              <div className="h-2 w-2 rounded-full bg-indigo-500/30"></div>
            </div>
          </div>

          {/* Right Side */}
          <div className="bg-white lg:col-span-7 p-8 sm:p-12 lg:p-16 flex items-center">
            <div className="w-full max-w-md mx-auto">
              <div className="text-center mb-8">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-indigo-600/20">
                  A
                </div>
                <h2 className="mt-6 text-3xl font-extrabold text-slate-900 tracking-tight">
                  Sign In
                </h2>
                <p className="mt-2 text-sm font-medium text-slate-500">
                  Enter your credentials below
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
                noValidate
              >
                {/* Username */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold tracking-wide uppercase text-slate-700">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="johndoe"
                    {...register("username", {
                      required: "Username is required",
                    })}
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm font-medium outline-none transition-all focus:bg-white focus:ring-4 ${
                      errors.username
                        ? "border-red-300 bg-red-50/10 focus:ring-red-500/10 focus:border-red-500"
                        : "border-slate-200 bg-slate-50/50 focus:ring-indigo-600/10 focus:border-indigo-600"
                    }`}
                  />
                  {errors.username && (
                    <p className="text-red-600 text-xs font-semibold mt-1 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-red-600 inline-block" />
                      {errors.username.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold tracking-wide uppercase text-slate-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    {...register("email", {
                      required: "Email is required",
                    })}
                    className={`w-full rounded-xl border px-4 py-2.5 text-sm font-medium outline-none transition-all focus:bg-white focus:ring-4 ${
                      errors.email
                        ? "border-red-300 bg-red-50/10 focus:ring-red-500/10 focus:border-red-500"
                        : "border-slate-200 bg-slate-50/50 focus:ring-indigo-600/10 focus:border-indigo-600"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-xs font-semibold mt-1 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-red-600 inline-block" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold tracking-wide uppercase text-slate-700">
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...register("password", {
                        required: "Password is required",
                      })}
                      className={`w-full pl-4 pr-11 py-2.5 rounded-xl border text-sm font-medium outline-none transition-all focus:bg-white focus:ring-4 ${
                        errors.password
                          ? "border-red-300 bg-red-50/10 focus:ring-red-500/10 focus:border-red-500"
                          : "border-slate-200 bg-slate-50/50 focus:ring-indigo-600/10 focus:border-indigo-600"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition"
                      tabIndex={-1}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-600 text-xs font-semibold mt-1 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-red-600 inline-block" />
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all shadow-md shadow-indigo-600/10 hover:shadow-lg hover:shadow-indigo-600/20 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="w-4 h-4 animate-spin text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 text-center text-sm text-slate-500 font-medium border-t border-slate-100">
                Don't have an account?{" "}
                <button className="font-bold text-indigo-600 hover:text-indigo-700 transition">
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </>
  );
};

export default SignIn;
