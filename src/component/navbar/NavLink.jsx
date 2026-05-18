import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, label, onClick }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-150 font-dm-sans ${
        isActive
          ? "bg-[#1A1D26] text-[#F0F2FF]"
          : "text-[#9AA0B8] hover:text-[#F0F2FF] hover:bg-[#1A1D26]"
      }`}
    >
      {label}
    </Link>
  );
}