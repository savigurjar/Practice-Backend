// src/pages/ForgotPassword.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import AnimatedBackground from "../animation";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";
import { AlertCircle, Mail } from "lucide-react";
import { forgotPassword, clearError } from "../features/authSlice";

const forgotPasswordSchema = z.object({
  emailId: z.string().email("Invalid email address"),
});

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { loading, error, forgotPasswordMessage } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  const onSubmit = (data) => {
    dispatch(forgotPassword(data)); // calls backend
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-purple-950">
      <AnimatedBackground />

      <motion.div className="relative z-10 w-full max-w-md text-white">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold mb-2">Forgot Password</h1>
          <p className="text-gray-300">Enter your email to reset your password</p>
        </div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10"
        >
          {(errors.emailId || error || forgotPasswordMessage) && (
            <motion.div className="mb-4 flex flex-col gap-1 text-center">
              {errors.emailId && (
                <div className="flex items-center gap-2 text-red-400">
                  <AlertCircle size={16} /> {errors.emailId.message}
                </div>
              )}
              {error && (
                <div className="flex items-center gap-2 text-red-400">
                  <AlertCircle size={16} /> {error}
                </div>
              )}
              {forgotPasswordMessage && (
                <div className="flex items-center gap-2 text-green-400">
                  <Mail size={16} /> {forgotPasswordMessage}
                </div>
              )}
            </motion.div>
          )}

          <motion.div className="relative mb-4">
            <input
              type="email"
              placeholder="Email"
              {...register("emailId")}
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/20 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
            />
          </motion.div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-950 hover:bg-green-900 rounded-xl font-semibold transition flex justify-center items-center gap-2"
          >
            {loading && <span className="loading loading-spinner loading-sm"></span>}
            {loading ? "Sending..." : "Send Reset Link"}
          </motion.button>

          <motion.p className="text-center text-sm mt-4 text-gray-300">
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

export default ForgotPassword;
