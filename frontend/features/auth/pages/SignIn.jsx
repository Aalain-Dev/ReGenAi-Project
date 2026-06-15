import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/auth.hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { handlelogin } = useAuth();
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
      await handlelogin(data); // throws if the credentials are wrong
      toast.success("Login successful");
      navigate("/home");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Invalid email or password",
      );
    }
  };

  return (
    <>
     

          {/* Right Side */}
          {/* <div className="mt-10 flex items-center"> */}
            <div className="w-full ">
            
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full"
                noValidate
              >
                {/* Email */}
                <div className="space-y-1.5 ">
                  <label className="text-xs    font-bold tracking-wide uppercase text-white">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="john@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                    className={`w-full rounded-xl border px-4 mt-4 py-2.5 text-sm font-medium outline-none transition-all focus:bg-white focus:ring-4 ${
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
                    <label className="text-xs mt-5 font-bold tracking-wide uppercase text-white">
                      Password
                    </label>

                  
                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      className={`w-full pl-4 pr-11 py-2.5 mb-4 rounded-xl border text-sm font-medium outline-none transition-all focus:bg-white focus:ring-4 ${
                        errors.password
                          ? "border-red-300 bg-red-50/10 focus:ring-red-500/10 focus:border-red-500"
                          : "border-slate-200 bg-slate-50/50 focus:ring-indigo-600/10 focus:border-indigo-600"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
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
                  className="w-full mt-2 cursor-pointer py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all shadow-md shadow-indigo-600/10 hover:shadow-lg hover:shadow-indigo-600/20 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
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
                      <span >Signing In...</span>
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

            </div>
          {/* </div> */}
       

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
