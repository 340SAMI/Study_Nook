import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function BookNavigation() {
    const buttonClass = "w-full sm:w-auto inline-flex justify-center items-center gap-2 text-[14px] font-semibold px-5 py-3 rounded-xl transition-all duration-300 border border-[#d6d6d6]/50 bg-transparent text-[#6C8EFF] hover:bg-[#6C8EFF] hover:text-white hover:border-[#6C8EFF] active:scale-[0.97]";
  return (
    <div className="px-6 py-8 border-2 border-yellow-400 sm:px-12">
      <div className="w-full sm:w-[75%] mx-auto relative overflow-hidden rounded-2xl border border-[#6C8EFF]/20 bg-[#0E1017] px-6  sm:px-10 py-6 sm:py-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#6C8EFF]/50 to-transparent" />

        {/* Glow blobs (hidden on small screens) */}
        <div className="hidden sm:block absolute -top-16 -left-10 w-[300px] h-[200px] bg-[#6C8EFF]/12 rounded-full blur-[50px] pointer-events-none" />
        <div className="hidden sm:block absolute -bottom-16 right-14 w-[200px] h-[180px] bg-[#A78BFA]/8 rounded-full blur-[40px] pointer-events-none" />

        {/* Dot grid (subtle on desktop, hidden on small) */}
        <div
          className="hidden sm:block absolute inset-0 pointer-events-none opacity-[0.10]"
          style={{
            backgroundImage: `radial-gradient(circle, #4B5280 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Left content */}
        <div className="relative z-10  max-w-full sm:max-w-xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-1.5 bg-[#6C8EFF]/12 border border-[#6C8EFF]/20 rounded-full px-3 py-1 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#6C8EFF]" />
            <span
              className="text-[11px] font-medium text-[#6C8EFF] uppercase tracking-wider"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              For room owners
            </span>
          </div>

          <h2
            className="text-[20px] sm:text-[22px] font-bold text-[#F0F2FF] leading-7 tracking-tight mb-2"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Own a quiet space? Turn it into <span className="text-[#6C8EFF]">income.</span>
          </h2>

          <p
            className="text-[14px] sm:text-[13px] text-[#5A6080] leading-relaxed max-w-lg"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            List your private library room in minutes. Set your hourly rate,
            choose amenities, and we&#39;ll handle the booking schedule.
          </p>
        </div>

        {/* Button */}
        <div className="mr-7 relative z-10 w-full sm:w-auto">
          <Link
            href="/add-room"
            className={buttonClass}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            List a room
            <FaLongArrowAltRight />
          </Link>
        </div>

      </div>
    </div>
  );
}