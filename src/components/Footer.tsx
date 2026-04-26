"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { client } from "../sanity/client";
import { useEffect, useState } from "react";

interface SiteSettings {
  instagramUrl?: string;
  tiktokUrl?: string;
  youtubeUrl?: string;
  footerText?: string;
}

export default function Footer() {
  const pathname = usePathname();
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await client.fetch(`*[_type == "siteSettings"][0]`);
      setSettings(data);
    };
    fetchSettings();
  }, []);

  if (pathname.startsWith("/studio")) return null;

  return (
    <footer className="w-full px-6 sm:px-10 py-12 bg-[#0d0f11] border-t border-white/[0.05] rounded-t-[3rem] mt-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="mb-2">
            <img src="/logo-iod.png" alt="IOD Logo" className="h-36 w-auto object-contain" />
          </div>
          <p className="font-headline text-xs font-medium tracking-tight text-[#3e4c58]">
            © 2024 Inside Out Design — 100% Textile. 0% Plastik.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href={settings?.instagramUrl || "https://www.instagram.com/iod_yourshop"} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[#8d9ba8] hover:text-[#ff56ed] hover:border-[#ff56ed]/30 hover:bg-[#ff56ed]/10 transition-all duration-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href={settings?.tiktokUrl || "https://tiktok.com/@iod"} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="p-2.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[#8d9ba8] hover:text-[#00c8f0] hover:border-[#00c8f0]/30 hover:bg-[#00c8f0]/10 transition-all duration-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.05a8.3 8.3 0 0 0 4.76 1.49V7.1a4.83 4.83 0 0 1-1-.41z"/></svg>
            </a>
            <a href={settings?.youtubeUrl || "https://youtube.com/@iod"} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="p-2.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[#8d9ba8] hover:text-[#c8f400] hover:border-[#c8f400]/30 hover:bg-[#c8f400]/10 transition-all duration-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.56 31.56 0 0 0 0 12a31.56 31.56 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.84.55 9.38.55 9.38.55s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.56 31.56 0 0 0 24 12a31.56 31.56 0 0 0-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
            </a>
          </div>
          {/* Legal Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer Links">
            {[
              { label: "Sizing Guide", href: "/#sizes" },
              { label: "Datenschutz", href: "#" },
              { label: "AGB", href: "#" },
              { label: "Versand & Rueckgabe", href: "#" },
            ].map((link) => (
              <Link key={link.label} href={link.href} className="font-headline text-xs font-medium tracking-widest uppercase text-[#3e4c58] hover:text-[#c8f400] transition-colors duration-200">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="font-headline font-black text-xl text-[#c8f400] rotate-2 glow-lime select-none">
          ONLY FLOW.
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-white/[0.04] text-center">
        <p className="text-[#3e4c58] text-xs leading-relaxed">
          {settings?.footerText || (
            <>
              Alle Preise inkl. MwSt., zzgl.{" "}
              <Link href="#" className="underline hover:text-[#8d9ba8]">Versandkosten</Link>.
              {" "}Widerrufsrecht: 14 Tage nach Erhalt der Ware.
            </>
          )}
        </p>
      </div>
    </footer>
  );
}
