import Link from "next/link";
import StatsBar from "./StatsBar";

export default function HeroBanner() {
  return (
    <div className="">    
      <section className="relative overflow-hidden bg-[#0A0B0F] pt-40 pb-28">

      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#6C8EFF]/10 blur-[140px]" />

      <div className="relative z-10 w-[90%] max-w-6xl mx-auto text-center">

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-[#F0F2FF]">

          Find your perfect{" "}
          <span className="text-[#6C8EFF]">
            study<br />space
          </span>
          {" "}instantly
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl mx-auto text-lg text-[#9AA0B8] leading-8">
          Reserve modern study rooms, collaborative spaces, and quiet
          environments designed for focused learning and productivity.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

          <Link
            href="/rooms"
            className="px-8 py-3 rounded-xl bg-[#6C8EFF] hover:bg-[#5B7EFF] text-white font-medium transition-all duration-200"
          >
            Browse rooms
          </Link>

          <Link
            href="/authentication/register"
            className="px-8 py-3 rounded-xl border border-white/[0.08] bg-[#12141A] hover:bg-[#1A1D26] text-[#F0F2FF] font-medium transition-all duration-200"
          >
            Join now
          </Link>
        </div>
      </div>
    </section>
         <div>
        <StatsBar></StatsBar>
      </div>
    </div>

  );
}