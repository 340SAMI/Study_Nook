"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

const Regpage = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="bg-[#0A0B0F] relative overflow-hidden min-h-screen flex items-center justify-center p-6">

              <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#6C8EFF]/[0.06] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-2]  w-full h-[10%] bg-[#A78BFA]/[0.06]  blur-3xl " />

      <div className="relative w-full max-w-lg">

        {/* Top accent line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#6C8EFF]/60 to-transparent mb-2" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#0E1017] border border-white/[0.08] rounded-2xl px-8 py-10 shadow-2xl shadow-black/60 space-y-4"
        >
          {/* Logo */}
          <div className="flex justify-center mb-2">
            <Link href="/" className="font-bold text-[28px] tracking-tight text-[#F0F2FF]" style={{ fontFamily: "'Syne', sans-serif" }}>
              Study<span className="text-[#6C8EFF]">Nook</span>
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-2">
            <h1 className="text-[22px] font-semibold text-[#F0F2FF] tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              Create your account
            </h1>
            <p className="text-[13px] text-[#5A6080] mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Already have one?{" "}
              <Link href="/login" className="text-[#6C8EFF] hover:text-[#8AABFF] transition-colors">
                Sign in instead
              </Link>
            </p>
          </div>

          {/* Name */}
          <div className="grid gap-1.5">
            <label className="text-[11px] font-medium text-[#7A82A0] uppercase tracking-widest" htmlFor="name"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Full Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Your full name"
              className="bg-[#12141A] border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-[#F0F2FF] placeholder-[#3A4060] outline-none transition-all duration-150 focus:border-[#6C8EFF]/50 focus:bg-[#13152A]/60"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
            {errors.name && <p className="text-[12px] text-red-400">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="grid gap-1.5">
            <label className="text-[11px] font-medium text-[#7A82A0] uppercase tracking-widest" htmlFor="email"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="you@example.com"
              className="bg-[#12141A] border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-[#F0F2FF] placeholder-[#3A4060] outline-none transition-all duration-150 focus:border-[#6C8EFF]/50 focus:bg-[#13152A]/60"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
            {errors.email && <p className="text-[12px] text-red-400">{errors.email.message}</p>}
          </div>

          {/* Photo URL */}
          <div className="grid gap-1.5">
            <label className="text-[11px] font-medium text-[#7A82A0] uppercase tracking-widest" htmlFor="photoURL"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Photo URL
            </label>
            <input
              id="photoURL"
              type="url"
              {...register("photoURL")}
              placeholder="https://example.com/photo.jpg"
              className="bg-[#12141A] border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-[#F0F2FF] placeholder-[#3A4060] outline-none transition-all duration-150 focus:border-[#6C8EFF]/50 focus:bg-[#13152A]/60"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>

          {/* Password */}
          <div className="grid gap-1.5">
            <label className="text-[11px] font-medium text-[#7A82A0] uppercase tracking-widest" htmlFor="password"
              style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum 8 characters" },
              })}
              placeholder="Min. 8 characters"
              className="bg-[#12141A] border border-white/[0.08] rounded-xl px-4 py-3 text-[14px] text-[#F0F2FF] placeholder-[#3A4060] outline-none transition-all duration-150 focus:border-[#6C8EFF]/50 focus:bg-[#13152A]/60"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
            {errors.password && <p className="text-[12px] text-red-400">{errors.password.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 bg-[#6C8EFF] hover:bg-[#5B7EFF] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-[14px] py-3.5 rounded-xl transition-all duration-150 active:scale-[0.98]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {isSubmitting ? "Creating account…" : "Create account"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 py-1">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-[11px] text-[#3A4060] uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>or</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* Google */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-[#12141A] border border-white/[0.08] hover:border-white/[0.14] hover:bg-[#1A1D26] text-[#9AA0B8] text-[14px] font-medium py-3 rounded-xl transition-all duration-150"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </form>

        {/* Bottom */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent mt-8" />
        <p className="text-center text-[12px] text-[#2A3050] mt-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          By registering you agree to our{" "}
          <Link href="/terms" className="text-[#3A4A80] hover:text-[#6C8EFF] transition-colors">Terms</Link>
          {" & "}
          <Link href="/privacy" className="text-[#3A4A80] hover:text-[#6C8EFF] transition-colors">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
};

export default Regpage;