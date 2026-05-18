import Link from "next/link";

export default function AuthButtons() {
  return (
    <>
      <Link
        href="/authentication/login"
        className="px-4 py-2 rounded-lg text-[13px] font-medium text-[#9AA0B8] hover:text-[#F0F2FF] hover:bg-[#1A1D26] transition-all duration-150 font-dm-sans"
      >
        Login
      </Link>
      <Link
        href="/authentication/register"
        className="px-4 py-2 rounded-lg text-[13px] font-medium text-white bg-[#6C8EFF] hover:bg-[#5B7EFF] border border-[#6C8EFF]/50 transition-all duration-150 font-dm-sans"
      >
        Register
      </Link>
    </>
  );
}