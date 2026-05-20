"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";

const LoginPage =  () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const onSubmit = async (data) => {
    const {email, password} = data;

    const { data:authdata, error } = await authClient.signIn.email({
    email: email, // required
    password: password, // required
});


if(authdata){
  router.push("/");
}else if (error) {
  alert(error.message);
}
  }

    const GoogleSign = async () => {
      const data = await authClient.signIn.social({
        provider: "google",
    
      })};
      


  return (
    <div className="bg-[#0A0B0F] relative overflow-hidden min-h-screen flex items-center justify-center p-6">
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-150 h-100 bg-[#6C8EFF]/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-[#A78BFA]/6 blur-3xl" />

      <div className="relative w-full max-w-lg">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#6C8EFF]/60 to-transparent mb-4" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#0E1017] border border-white/[0.08] rounded-[32px] px-8 py-10 shadow-2xl shadow-black/60 space-y-6"
        >
          {/* Logo */}
          <div className="flex justify-center mb-2">
            <Link href="/" className="font-bold text-[28px] tracking-tight text-[#F0F2FF]" style={{ fontFamily: "'Syne', sans-serif" }}>
              Study<span className="text-[#6C8EFF]">Nook</span>
            </Link>
          </div>

          {/* Heading */}
          <div className="text-center mb-3">
            <h1 className="text-[26px] font-semibold text-[#F0F2FF] tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              Welcome back
            </h1>
            <p className="text-[14px] text-[#7C87AB] mt-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Sign in to access your StudyNook dashboard.
            </p>
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

          {/* Password */}
          <div className="grid gap-1.5">
            <label className="text-[12px] font-semibold text-[#8B93B3] uppercase tracking-[0.24em]" htmlFor="password" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              placeholder="Enter your password"
              className="bg-[#12141A] border border-white/[0.08] rounded-2xl px-4 py-3 text-[14px] text-[#F0F2FF] placeholder-[#3A4060] outline-none transition-all duration-150 focus:border-[#6C8EFF]/50 focus:bg-[#13152A]/60"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
            {errors.password && <p className="text-[12px] text-red-400">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between text-[13px] text-[#7C87AB]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 rounded border-white/[0.12] bg-[#12141A] text-[#6C8EFF] focus:ring-amber-400/50" />
              Remember me
            </label>
            <Link href="/forgot-password" className="text-[#6C8EFF] hover:text-[#8AABFF] transition-colors">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 bg-[#6C8EFF] hover:bg-[#5B7EFF] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-[14px] py-3.5 rounded-2xl transition-all duration-150 active:scale-[0.98]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {isSubmitting ? "Signing in…" : "Sign in"}
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
            onClick={GoogleSign}
          >
            <FcGoogle size={16} />
            Continue with Google
          </button>
        </form>

        {/* Bottom */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent mt-8" />
        <p className="text-center text-[13px] text-[#7C87AB] mt-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Don&apos;t have an account? {" "}
          <Link href="/authentication/register" className="text-[#6C8EFF] hover:text-[#8AABFF] transition-colors">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;