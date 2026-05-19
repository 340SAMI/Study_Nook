import Link from "next/link";

export default function CTABanner() {
  return (
    <div className="px-6 py-8">
      <div className="relative overflow-hidden rounded-2xl border border-[#6C8EFF]/20 bg-[#0E1017] px-10 py-9 flex items-center justify-between gap-6">

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6C8EFF]/50 to-transparent" />

        {/* Glow blobs */}
        <div className="absolute top-[-60px] left-[-40px] w-[300px] h-[200px] bg-[#6C8EFF]/[0.12] rounded-full blur-[50px] pointer-events-none" />
        <div className="absolute bottom-[-60px] right-[60px] w-[200px] h-[180px] bg-[#A78BFA]/[0.08] rounded-full blur-[40px] pointer-events-none" />

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.12]"
          style={{
            backgroundImage: `radial-gradient(circle, #4B5280 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Left content */}
        <div className="relative z-10 max-w-xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-1.5 bg-[#6C8EFF]/[0.12] border border-[#6C8EFF]/20 rounded-full px-3 py-1 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#6C8EFF]" />
            <span
              className="text-[11px] font-medium text-[#6C8EFF] uppercase tracking-wider"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              For room owners
            </span>
          </div>

          <h2
            className="text-[22px] font-bold text-[#F0F2FF] leading-snug tracking-tight mb-2"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Own a quiet space? Turn it into{" "}
            <span className="text-[#6C8EFF]">income.</span>
          </h2>

          <p
            className="text-[13px] text-[#5A6080] leading-relaxed max-w-lg"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            List your private library room in minutes. Set your hourly rate,
            choose amenities, and we&#39ll handle the booking schedule.
          </p>
        </div>

        {/* Button */}
        <div className="relative z-10 flex-shrink-0">
          <Link
            href="/add-room"
            className="inline-flex items-center gap-2 bg-[#6C8EFF] hover:bg-[#5B7EFF] active:scale-[0.97] text-white text-[14px] font-semibold px-5 py-3 rounded-xl transition-all duration-150 whitespace-nowrap"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            List a room
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>
    </div>
  );
}