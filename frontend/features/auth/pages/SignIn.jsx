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
      <div className="w-full mt-10">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full" noValidate>
          {/* Email */}
          <div className="space-y-1.5 ">
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
              className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 ${
              errors.email
                ? "border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-200"
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
              <label className="block text-sm font-medium text-gray-700 mb-2 mt-2">
                Password
              </label>
            </div>

            <div className="relative mb-4">
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
               className={`w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 ${
              errors.password
                ? "border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-200"
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
              <p className="text-red-600 text-xs font-semibold  mb-3 flex items-center gap-1 ">
                <span className="w-1 h-1 rounded-full bg-red-600 inline-block" />
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative flex  w-full justify-center rounded-md bg-black text-white px-3 py-2 text-sm font-semibold text-black hover:text-white hover:bg-[#353434] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200"
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
