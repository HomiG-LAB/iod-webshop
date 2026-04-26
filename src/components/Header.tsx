"use client";

import { useState, useEffect } from "react";
import { navLinks } from "../data/mockData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../context/CartContext";
import { client } from "../sanity/client";
import { useSession, signOut } from "next-auth/react";

interface SiteSettings {
  instagramUrl?: string;
  tiktokUrl?: string;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const pathname = usePathname();
  const { totalItems, openDrawer } = useCart();
  const { data: session } = useSession();

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await client.fetch(`*[_type == "siteSettings"][0]`);
      setSettings(data);
    };
    fetchSettings();
  }, []);

  // Hide the header inside the Sanity Studio
  if (pathname.startsWith("/studio")) return null;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-3 mx-auto mt-5 w-[95%] max-w-7xl rounded-full bg-[#0a0b0d]/85 backdrop-blur-xl border border-white/[0.06] shadow-[0_0_40px_rgba(0,0,0,0.6)]">
        <Link href="/" id="iod-logo" className="block select-none">
          <img src="/logo-iod.png" alt="IOD Logo" className="h-24 sm:h-[108px] w-auto object-contain" />
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
            <a href={settings?.instagramUrl || "https://www.instagram.com/iod_yourshop"} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 text-[#8d9ba8] hover:text-[#ff56ed] transition-colors duration-200 active:scale-90">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href={settings?.tiktokUrl || "https://tiktok.com/@iod"} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="p-2 text-[#8d9ba8] hover:text-[#00c8f0] transition-colors duration-200 active:scale-90">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.05a8.3 8.3 0 0 0 4.76 1.49V7.1a4.83 4.83 0 0 1-1-.41z"/></svg>
            </a>
            <div className="w-px h-5 bg-white/10 mx-1" aria-hidden />
          </div>

          {session ? (
            <div className="relative group flex items-center">
              <button aria-label="Account" className="relative p-2 text-[#8d9ba8] hover:text-[#00c8f0] transition-colors active:scale-90">
                <span className="material-symbols-outlined text-2xl">person</span>
              </button>
              <div className="absolute top-full right-0 mt-2 w-48 bg-[#111316] border border-white/[0.06] rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-4 border-b border-white/[0.06]">
                  <p className="text-[#e8ecef] text-sm font-headline font-bold truncate">{session.user?.name}</p>
                  <p className="text-[#8d9ba8] text-xs truncate">{session.user?.email}</p>
                </div>
                <div className="p-2">
                  <button onClick={() => signOut()} className="w-full text-left px-3 py-2 text-[#ff56ed] hover:bg-white/[0.04] rounded-lg text-xs font-headline font-bold uppercase tracking-widest transition-colors">
                    Abmelden
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/auth" aria-label="Anmelden" className="relative p-2 text-[#8d9ba8] hover:text-[#c8f400] transition-colors active:scale-90">
              <span className="material-symbols-outlined text-2xl">login</span>
            </Link>
          )}

          <button id="cart-btn" aria-label="Warenkorb" onClick={openDrawer} className="relative p-2 text-[#8d9ba8] hover:text-[#00c8f0] transition-colors active:scale-90">
            <span className="material-symbols-outlined text-2xl">shopping_bag</span>
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-[#c8f400] text-[#1a2000] font-headline font-black text-[10px] rounded-full flex items-center justify-center px-1">
                {totalItems}
              </span>
            )}
          </button>
          
          <Link href="/shop" className="hidden sm:inline-flex btn-kinetic-primary px-6 py-2.5 text-xs items-center justify-center">
            BESTELLEN
          </Link>
          
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
