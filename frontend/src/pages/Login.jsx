import React, { useState } from "react";
import { Eye, EyeOff, User, Shield, AlertCircle } from "lucide-react";
import { NavLink } from "react-router"; 
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import AnimatedBackground from "../animation";
import { FcGoogle } from "react-icons/fc";

/* ---------------- ZOD SCHEMA ---------------- */
const loginSchema = z.object({
  identifier: z.string().min(3, "Username or Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["user", "admin"]),
});

/* ---------------- ANIMATION VARIANTS ---------------- */
const container = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.12 },
  },
};

const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const errorAnim = {
  hidden: { x: 0 },
  visible: { x: [0, -8, 8, -6, 6, 0], transition: { duration: 0.4 } },
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { role: "user" },
  });

  const role = watch("role");

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    alert(`Logged in as ${data.role}`);
  };

  return (
   <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-purple-950">
  {/* Animated Background */}
  <AnimatedBackground />

  {/* Wrapper for heading + form */}
  <motion.div
    className="relative z-10 w-full max-w-md text-white"
    variants={container}
    initial="hidden"
    animate="visible"
  >
    {/* Heading */}
    <div className="mb-6 text-center">
      <h1 className="text-3xl font-bold mb-2">Sign in to CodeClan</h1>
      <p className="text-gray-300">Enter your details to access your account</p>
    </div>

    {/* Form */}
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/10"
    >
      {/* Errors */}
      {(errors.identifier || errors.password) && (
        <motion.div
          variants={errorAnim}
          initial="hidden"
          animate="visible"
          className="mb-4 text-red-400 flex flex-col gap-1"
        >
          {errors.identifier && (
            <div className="flex items-center gap-2">
              <AlertCircle size={16} /> {errors.identifier.message}
            </div>
          )}
          {errors.password && (
            <div className="flex items-center gap-2">
              <AlertCircle size={16} /> {errors.password.message}
            </div>
          )}
        </motion.div>
      )}

      {/* Username / Email */}
      <motion.div variants={item}>
        <label htmlFor="identifier" className="sr-only">
          Username or Email
        </label>
        <input
          id="identifier"
          {...register("identifier", { required: "Username or Email is required" })}
          placeholder="Enter your username or email"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-black/40 border border-white/20 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
        />
      </motion.div>

      {/* Role Selection */}
      <motion.div variants={item}>
        <label className="text-sm mb-2 block">Login as</label>
        <div className="flex gap-3 mb-4">
          {["user", "admin"].map((r) => (
            <motion.button
              key={r}
              type="button"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setValue("role", r)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border transition ${
                role === r
                  ? "bg-green-950 border-green-700"
                  : "bg-black/30 border-white/20"
              }`}
              aria-label={`Login as ${r}`}
            >
              {r === "user" ? <User size={16} /> : <Shield size={16} />}
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Password */}
      <motion.div variants={item}>
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <div className="relative mb-4">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password is required" })}
            placeholder="Enter your password"
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/20 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-300 transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 top-3 text-gray-300"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </motion.div>

      {/* Sign In */}
      <motion.button
        variants={item}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        type="submit"
        className="w-full py-3 bg-green-950 hover:bg-green-900 rounded-xl font-semibold transition"
      >
        Sign in
      </motion.button>

      {/* Google Sign In */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        className="w-full mt-3 py-3 border border-white/20 rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition"
      >
        <FcGoogle className="text-xl" />
        Sign in with Google
      </motion.button>

      {/* Register Link */}
      <motion.p variants={item} className="text-center text-sm mt-4 text-gray-300">
        New to CodeClan?{" "}
        <NavLink to="/signup" className="text-green-500">
          Create your account
        </NavLink>
      </motion.p>
    </motion.form>
  </motion.div>
</div>

  );
};

export default Login;
