"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import AuthButtons from "./AuthButtons";
import MobileMenu from "./MobileMenu";
import { PUBLIC_LINKS, PRIVATE_LINKS } from "./constants";

// Replace with your actual auth context/hook
// import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Replace with real auth state
  // const { user, logout } = useAuth();
  const user = null;
  const logout = () => {};

  const navLinks = user
    ? [...PUBLIC_LINKS, ...PRIVATE_LINKS]
    : [...PUBLIC_LINKS, ...PRIVATE_LINKS];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#12141A]/95 border-b border-white/[0.07] backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-[#12141A]/80 border-b border-transparent backdrop-blur-sm"
      }`}
    >
      <div className="w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-bold text-[32px] tracking-tight text-[#F0F2FF] font-syne">
              Study<span className="text-[#6C8EFF]">Nook</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <NavLinks links={navLinks} className="hidden md:flex" />

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <UserMenu user={user} onLogout={logout} />
            ) : (
              <AuthButtons />
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg text-[#9AA0B8] hover:text-[#F0F2FF] hover:bg-[#1A1D26] transition-all"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <MobileMenu
          links={navLinks}
          user={user}
          onLogout={logout}
          onClose={() => setMenuOpen(false)}
        />
      )}
    </nav>
  );
}