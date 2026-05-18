import Link from "next/link";
import NavLink from "./NavLink";

export default function MobileMenu({ links, user, onLogout, onClose }) {
  const handleLogout = () => {
    onLogout();
    onClose();
  };

  return (
    <div className="md:hidden border-t border-white/[0.07] bg-[#0A0B0F]/98 backdrop-blur-md">
      <div className="px-4 pt-3 pb-4 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.href}
            {...link}
            onClick={onClose}
            className="block"
          />
        ))}

        <div className="pt-3 border-t border-white/[0.06] space-y-2">
          {user ? (
            <>
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6C8EFF] to-[#A78BFA] flex items-center justify-center text-[12px] font-semibold text-white">
                  {user.displayName?.[0]?.toUpperCase() ?? "U"}
                </div>
                <div>
                  <p className="text-[13px] font-medium text-[#F0F2FF] font-dm-sans">
                    {user.displayName}
                  </p>
                  <p className="text-[11px] text-[#5A6080]">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2.5 rounded-lg text-[13px] font-medium text-[#E24B4A] hover:bg-[#E24B4A]/10 transition-colors font-dm-sans"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={onClose}
                className="block px-3 py-2.5 rounded-lg text-[13px] font-medium text-[#9AA0B8] hover:text-[#F0F2FF] hover:bg-[#1A1D26] transition-all font-dm-sans"
              >
                Login
              </Link>
              <Link
                href="/authentication/register"
                onClick={onClose}
                className="block px-3 py-2.5 rounded-lg text-[13px] font-medium text-white bg-[#6C8EFF] hover:bg-[#5B7EFF] text-center transition-all font-dm-sans"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}