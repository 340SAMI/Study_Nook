import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#12141A] mt-24">
      <div className="w-[90%] mx-auto py-14">

        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <h1 className="text-3xl font-bold text-[#F0F2FF]">
              Study<span className="text-[#6C8EFF]">Nook</span>
            </h1>

            <p className="mt-4 text-sm leading-6 text-[#9AA0B8] max-w-sm">
              Find peaceful study rooms, collaborative spaces, and productive
              environments designed for focused learning.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="text-sm font-semibold text-[#F0F2FF] mb-4">
              Navigation
            </h3>

            <div className="space-y-3">
              <Link
                href="/"
                className="block text-sm text-[#9AA0B8] hover:text-white transition"
              >
                Home
              </Link>

              <Link
                href="/rooms"
                className="block text-sm text-[#9AA0B8] hover:text-white transition"
              >
                Rooms
              </Link>

              <Link
                href="/add-room"
                className="block text-sm text-[#9AA0B8] hover:text-white transition"
              >
                Add Room
              </Link>
            </div>
          </div>

          {/* ACCOUNT */}
          <div>
            <h3 className="text-sm font-semibold text-[#F0F2FF] mb-4">
              Account
            </h3>

            <div className="space-y-3">
              <Link
                href="/login"
                className="block text-sm text-[#9AA0B8] hover:text-white transition"
              >
                Login
              </Link>

              <Link
                href="/authentication/register"
                className="block text-sm text-[#9AA0B8] hover:text-white transition"
              >
                Register
              </Link>

              <Link
                href="/my-bookings"
                className="block text-sm text-[#9AA0B8] hover:text-white transition"
              >
                My Bookings
              </Link>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-sm font-semibold text-[#F0F2FF] mb-4">
              Connect
            </h3>

            <div className="flex items-center gap-3">

              <button className="w-10 h-10 rounded-full bg-[#12141A] border border-white/[0.06] flex items-center justify-center text-[#9AA0B8] hover:text-white hover:border-white/[0.12] transition">
                F
              </button>

              <button className="w-10 h-10 rounded-full bg-[#12141A] border border-white/[0.06] flex items-center justify-center text-[#9AA0B8] hover:text-white hover:border-white/[0.12] transition">
                X
              </button>

              <button className="w-10 h-10 rounded-full bg-[#12141A] border border-white/[0.06] flex items-center justify-center text-[#9AA0B8] hover:text-white hover:border-white/[0.12] transition">
                I
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-14 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-[#5A6080]">
            © 2026 StudyNook. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-[#5A6080] hover:text-white transition"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="text-sm text-[#5A6080] hover:text-white transition"
            >
              Terms
            </Link>

            <Link
              href="/cookies"
              className="text-sm text-[#5A6080] hover:text-white transition"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}