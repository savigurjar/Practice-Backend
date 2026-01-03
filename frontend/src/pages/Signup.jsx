import React, { useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { NavLink } from "react-router"; // Fixed import
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import AnimatedBackground from "../animation";

/* ---------------- ZOD SCHEMA ---------------- */
const signupSchema = z
  .object({
    firstName: z.string().min(3, "Username must be at least 3 characters"),
    emailId: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must include uppercase, lowercase, number & symbol"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/* ---------------- ANIMATION ---------------- */
const container = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Signup = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data) => {
    console.log("Signup Data:", data);
    setSuccess(true);
  };

  return (
   <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-purple-950 overflow-hidden">
  {/* 🌌 Background */}
  <AnimatedBackground />

  <motion.form
    onSubmit={handleSubmit(onSubmit)}
    variants={container}
    initial="hidden"
    animate="visible"
    className="relative z-10 bg-white/10 backdrop-blur-xl p-8 rounded-2xl w-full max-w-md text-white border border-white/10"
  >
    {/* Title */}
    <h1 className="text-2xl font-bold mb-1">Become a Part of CodeClan</h1>
    <p className="mb-6 text-gray-300">Sign up today and begin your coding journey!</p>

    {/* Success Message */}
    {success && (
      <div className="mb-4 text-green-400 flex items-center gap-2">
        <AlertCircle size={16} /> Account created successfully 🚀
      </div>
    )}

    {/* Errors */}
    {Object.keys(errors).length > 0 && (
      <div className="mb-4 text-red-400 flex flex-col gap-1">
        {Object.values(errors).map((err, i) => (
          <div key={i} className="flex items-center gap-2">
            <AlertCircle size={16} /> {err.message}
          </div>
        ))}
      </div>
    )}

    {/* Username */}
    <motion.div variants={item}>
      <label htmlFor="firstName" className="sr-only">Username</label>
      <input
        id="firstName"
        {...register("firstName", { required: "Username is required" })}
        placeholder="Username"
        className="w-full mb-3 px-4 py-3 rounded-lg bg-black/40 border border-white/20 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
      />
      {errors.firstName && <p>{errors.firstName.message}</p>}
    </motion.div>

    {/* Email */}
    <motion.div variants={item}>
      <label htmlFor="emailId" className="sr-only">Email</label>
      <input
        id="emailId"
        type="email"
        {...register("emailId", { required: "Email is required" })}
        placeholder="Email"
        className="w-full mb-3 px-4 py-3 rounded-lg bg-black/40 border border-white/20 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
      />
      {errors.emailId && <p>{errors.emailId.message}</p>}
    </motion.div>

    {/* Password */}
    <motion.div variants={item} className="relative mb-3">
      <label htmlFor="password" className="sr-only">Password</label>
      <input
        id="password"
        type={showPass ? "text" : "password"}
        {...register("password", { required: "Password is required" })}
        placeholder="Password"
        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/20 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
      />
      <button
        type="button"
        onClick={() => setShowPass(!showPass)}
        aria-label={showPass ? "Hide password" : "Show password"}
        className="absolute right-3 top-3 text-gray-300"
      >
        {showPass ? <EyeOff /> : <Eye />}
      </button>
      {errors.password && <p>{errors.password.message}</p>}
    </motion.div>

    {/* Confirm Password */}
    <motion.div variants={item} className="relative mb-4">
      <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
      <input
        id="confirmPassword"
        type={showConfirm ? "text" : "password"}
        {...register("confirmPassword", { required: "Confirm Password is required" })}
        placeholder="Confirm Password"
        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/20 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
      />
      <button
        type="button"
        onClick={() => setShowConfirm(!showConfirm)}
        aria-label={showConfirm ? "Hide password" : "Show password"}
        className="absolute right-3 top-3 text-gray-300"
      >
        {showConfirm ? <EyeOff /> : <Eye />}
      </button>
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
    </motion.div>

    {/* Submit */}
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      type="submit"
      className="w-full py-3 bg-green-950 hover:bg-green-900 transition-colors rounded-xl font-semibold"
    >
      Create Account
    </motion.button>

    {/* Login Link */}
    <p className="text-center text-sm mt-4 text-gray-300">
      Already have an account?{" "}
      <NavLink to="/login" className="text-green-500">
        Login
      </NavLink>
    </p>
  </motion.form>
</div>

  );
};

export default Signup;
