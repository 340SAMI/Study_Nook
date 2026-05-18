"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const DROPDOWN_LINKS = [
  { href: "/my-listings", label: "My Listings" },
  { href: "/my-bookings", label: "My Bookings" },
];

function Avatar({ user, size = "sm" }) {
  const dimensions = size === "sm" ? "w-6 h-6 text-[10px]" : "w-8 h-8 text-[12px]";

  if (user.photoURL) {
    return (
      <img
        src={user.photoURL}
        alt={user.displayName}
        className={`${dimensions} rounded-full object-cover`}
      />
    );
  }

  return (
    <div
      className={`${dimensions} rounded-full bg-gradient-to-br from-[#6C8EFF] to-[#A78BFA] flex items-center justify-center font-semibold text-white`}
    >
      {user.displayName?.[0]?.toUpperCase() ?? "U"}
    </div>
  );
}

export default function UserMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    onLogout();
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full border border-white/[0.08] bg-[#12141A] hover:border-white/[0.14] transition-all duration-150"
      >
        <Avatar user={user} size="sm" />
        <span className="text-[13px] text-[#9AA0B8] font-dm-sans">
          {user.displayName?.split(" ")[0] ?? "User"}
        </span>
        <svg
          className={`w-3 h-3 text-[#5A6080] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-[#12141A] border border-white/[0.07] rounded-xl shadow-xl shadow-black/40 overflow-hidden py-1 z-50">
          <div className="px-3 py-2 border-b border-white/[0.06]">
            <p className="text-[13px] font-medium text-[#F0F2FF] truncate font-dm-sans">
              {user.displayName}
            </p>
            <p className="text-[11px] text-[#5A6080] truncate">{user.email}</p>
          </div>

          {DROPDOWN_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center px-3 py-2 text-[13px] text-[#9AA0B8] hover:text-[#F0F2FF] hover:bg-[#1A1D26] transition-colors font-dm-sans"
            >
              {item.label}
            </Link>
          ))}

          <div className="border-t border-white/[0.06] mt-1 pt-1">
            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center px-3 py-2 text-[13px] text-[#E24B4A] hover:bg-[#E24B4A]/10 transition-colors font-dm-sans"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}