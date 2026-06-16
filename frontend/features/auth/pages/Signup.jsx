import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/auth.hooks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signup = () => {
  const { handleRegister } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const { username, email, password } = data;

      const response = await handleRegister({
        username,
        email,
        password,
      });

      toast.success(response?.message || "Registration successful!");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    }
  };

  return (
    <form className="mt-8 w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md shadow-sm">
        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-white mb-2"
          >
            Username
          </label>

          <input
            id="username"
            type="text"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
            })}
            className={`block w-full rounded-md border px-3 py-2 text-white mb-2 focus:outline-none focus:ring-2 sm:text-sm ${
              errors.username
                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
            }`}
            placeholder="johndoe"
          />

          {errors.username && (
            <p className="mt-1 text-xs text-red-500 mb-2">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white mb-2"
          >
            Email address
          </label>

          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z0-9]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className={`block w-full rounded-md border px-3 py-2 mb-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 sm:text-sm ${
              errors.email
                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
            }`}
            placeholder="you@example.com"
          />

          {errors.email && (
            <p className="mt-1 text-xs text-red-500 mb-2">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-white mb-2"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className={`block w-full rounded-md mb-2 border px-3 py-2 text-white focus:outline-none focus:ring-2 sm:text-sm ${
              errors.password
                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-200"
            }`}
            placeholder="••••••••"
          />

          {errors.password && (
            <p className="mt-1 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="group relative flex  w-full justify-center rounded-md bg-[#C0C1FF] px-3 py-2 text-sm font-semibold text-black hover:text-white hover:bg-[#353434] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200"
        >
          Sign up
        </button>
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
    </form>
  );
};

export default Signup;
