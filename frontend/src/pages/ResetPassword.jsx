import React, { useState, useEffect } from "react";
import { useParams, NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import AnimatedBackground from "../animation";
import { useDispatch, useSelector } from "react-redux";
import axiosClient from "../utils/axiosClient";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

/* ---------------- ZOD SCHEMA ---------------- */
const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/* ---------------- ANIMATION VARIANTS ---------------- */
const container = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, staggerChildren: 0.12 } },
};
const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const errorAnim = { hidden: { x: 0 }, visible: { x: [0, -8, 8, -6, 6, 0], transition: { duration: 0.4 } } };

const ResetPassword = () => {
  const { token } = useParams(); // token from URL
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError(null);
      setMessage(null);

      const response = await axiosClient.post(`/user/reset-password/${token}`, {
        password: data.password,
      });

      setMessage(response.data.message || "Password reset successfully");
      setLoading(false);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message || "Reset failed");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-purple-950">
      <AnimatedBackground />

      <motion.div
        className="relative z-10 w-full max-w-md text-white"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
          <p className="text-gray-300">Enter your new password below</p>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10"
        >
          {/* Display errors / success */}
          {(errors.password || errors.confirmPassword || error || message) && (
            <motion.div
              variants={errorAnim}
              initial="hidden"
              animate="visible"
              className="mb-4 flex flex-col gap-1"
            >
              {errors.password && (
                <div className="flex items-center gap-2 text-red-400">
                  <AlertCircle size={16} /> {errors.password.message}
                </div>
              )}
              {errors.confirmPassword && (
                <div className="flex items-center gap-2 text-red-400">
                  <AlertCircle size={16} /> {errors.confirmPassword.message}
                </div>
              )}
              {error && (
                <div className="flex items-center gap-2 text-red-400">
                  <AlertCircle size={16} /> {error}
                </div>
              )}
              {message && (
                <div className="flex items-center gap-2 text-green-400">
                  <span>✅</span> {message}
                </div>
              )}
            </motion.div>
          )}

          {/* Password input */}
          <motion.div variants={item} className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              {...register("password")}
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/20 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-300"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </motion.div>

          {/* Confirm password input */}
          <motion.div variants={item} className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/20 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
            />
          </motion.div>

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-950 hover:bg-green-900 rounded-xl font-semibold transition flex justify-center items-center gap-2"
          >
            {loading && <span className="loading loading-spinner loading-sm"></span>}
            {loading ? "Resetting..." : "Reset Password"}
          </motion.button>

          {/* Back to login */}
          <motion.p variants={item} className="text-center text-sm mt-4 text-gray-300">
            Remembered your password?{" "}
            <NavLink to="/login" className="text-green-500">
              Sign in
            </NavLink>
          </motion.p>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
