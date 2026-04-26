"use client";

import { useState } from "react";
import { navLinks } from "../data/mockData";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-3 mx-auto mt-5 w-[95%] max-w-7xl rounded-full bg-[#0a0b0d]/85 backdrop-blur-xl border border-white/[0.06] shadow-[0_0_40px_rgba(0,0,0,0.6)]">
        <Link href="/" id="iod-logo" className="block select-none">
          <img src="/logo-iod.png" alt="IOD Logo" className="h-16 sm:h-[72px] w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            // Determine active state roughly
            const isActive = link.href === pathname || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`font-headline uppercase tracking-widest text-xs font-bold transition-colors duration-200 ${
                  isActive ? "text-[#c8f400]" : "text-[#8d9ba8] hover:text-[#c8f400]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <a href="https://www.instagram.com/iod_yourshop" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 text-[#8d9ba8] hover:text-[#ff56ed] transition-colors duration-200 active:scale-90">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://tiktok.com/@iod" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="p-2 text-[#8d9ba8] hover:text-[#00c8f0] transition-colors duration-200 active:scale-90">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.05a8.3 8.3 0 0 0 4.76 1.49V7.1a4.83 4.83 0 0 1-1-.41z"/></svg>
            </a>
            <div className="w-px h-5 bg-white/10 mx-1" aria-hidden />
          </div>

          <button id="cart-btn" aria-label="Warenkorb" className="p-2 text-[#8d9ba8] hover:text-[#00c8f0] transition-colors active:scale-90">
            <span className="material-symbols-outlined text-2xl">shopping_bag</span>
          </button>
          
          {/* Hamburger Menu Button */}
          <button 
            className="md:hidden p-2 text-[#8d9ba8] hover:text-[#c8f400] transition-colors active:scale-90 z-50 relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-symbols-outlined text-2xl">{isMenuOpen ? "close" : "menu"}</span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0a0b0d]/95 backdrop-blur-2xl flex flex-col items-center justify-center pt-20">
          <nav className="flex flex-col gap-8 text-center">
            {navLinks.map((link) => {
              const isActive = link.href === pathname || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`font-headline uppercase tracking-widest text-2xl font-black transition-colors ${
                    isActive ? "text-[#c8f400]" : "text-[#e8ecef]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
