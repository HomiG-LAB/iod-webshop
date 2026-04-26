import {
  navLinks,
  heroData,
  techSpecsData,
  showcaseData,
  collabData,
  lookbookData,
  uspData,
  storyData,
  faqData,
  newsletterData,
} from "../data/mockData";

// ─────────────────────────────────────────────────────────────────────────────
// IOD Webshop Homepage — Skin: "Kinetic Asphalt"
// Page structure (from user brief + Stitch screens):
//   1. TopNav (Shop | Designs | Grössen | Story)
//   2. Hero — "Second skin. But with a statement."
//   3. USP — Produkt Infos (4 pillars)
//   4. Monster Track Showcase — featured design
//   5. Ronaldo × IOD — The GOAT Collection
//   6. Story — Founder section
//   7. Action Lookbook — "Der pure Flow"
//   8. FAQ
//   9. Newsletter — Join the Crew
//  10. Footer (DACH legal)
//  11. Mobile Bottom Nav
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      {/* ─── 1. TOP NAV ─────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-3 mx-auto mt-5 w-[95%] max-w-7xl rounded-full bg-[#0a0b0d]/85 backdrop-blur-xl border border-white/[0.06] shadow-[0_0_40px_rgba(0,0,0,0.6)]">
        <a href="#hero" id="iod-logo" className="block select-none">
          <img src="/logo-iod.png" alt="IOD Logo" className="h-20 w-auto object-contain" />
        </a>

        <nav className="hidden md:flex items-center gap-8" aria-label="Hauptnavigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-headline uppercase tracking-widest text-xs font-bold text-[#8d9ba8] hover:text-[#c8f400] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Social Icons */}
          <a href="https://www.instagram.com/iod_yourshop" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hidden sm:flex p-2 text-[#8d9ba8] hover:text-[#ff56ed] transition-colors duration-200 active:scale-90">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="https://tiktok.com/@iod" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hidden sm:flex p-2 text-[#8d9ba8] hover:text-[#00c8f0] transition-colors duration-200 active:scale-90">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.05a8.3 8.3 0 0 0 4.76 1.49V7.1a4.83 4.83 0 0 1-1-.41z"/></svg>
          </a>

          <div className="hidden sm:block w-px h-5 bg-white/10 mx-1" aria-hidden />

          <button id="cart-btn" aria-label="Warenkorb" className="p-2 text-[#8d9ba8] hover:text-[#00c8f0] transition-colors active:scale-90">
            <span className="material-symbols-outlined text-2xl">shopping_bag</span>
          </button>
          <button id="customize-btn" className="btn-kinetic-primary px-5 py-2 text-xs">
            Bestellen
          </button>
        </div>
      </header>

      <main className="pt-28">
        {/* ─── 2. HERO ─────────────────────────────────────────────────────── */}
        <section id="hero" aria-label="Hero" className="relative px-4 sm:px-6 max-w-7xl mx-auto mb-32">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#111316] min-h-[90vh] flex flex-col justify-end px-8 sm:px-16 pb-20 border border-white/[0.03]">
            
            {/* Background Video (Full Bleed — flush top) */}
            <div className="absolute inset-0 z-0">
              <video 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover"
                poster={heroData.image}
              >
                <source src="/IOD_Platzhalter.mov" type="video/mp4" />
              </video>
              {/* Gradient overlay: keeps top visible, darkens bottom for text */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-[#0a0b0d]/60 to-transparent z-10" aria-hidden />
            </div>

            {/* Content pinned to bottom */}
            <div className="relative z-20 w-full max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-[#ff56ed]/15 border border-[#ff56ed]/30 text-[#ff56ed] px-5 py-2 rounded-full text-xs font-headline font-black uppercase tracking-widest mb-6 w-fit -rotate-1 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff56ed] animate-pulse" aria-hidden />
                {heroData.tagline}
              </div>

              <h1 className="font-headline font-black italic text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] tracking-tighter mb-5 uppercase">
                <span className="text-[#e8ecef]">SECOND</span>{" "}
                <span className="text-[#c8f400] text-glow-lime">SKIN.</span>
                <br />
                <span className="text-[#e8ecef]">BUT WITH A</span>{" "}
                <span className="text-[#00c8f0] glow-cyan">STATEMENT.</span>
              </h1>

              <p className="text-[#8d9ba8] text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                {heroData.subTagline}
              </p>

              <div className="flex flex-wrap gap-4">
                <button id="hero-cta-order" className="btn-kinetic-primary px-10 py-4 text-sm shadow-[0_0_30px_rgba(200,244,0,0.3)]">
                  {heroData.cta1}
                </button>
                <button id="hero-cta-learn" className="btn-kinetic-ghost bg-[#0a0b0d]/40 backdrop-blur-md px-10 py-4 text-sm hover:bg-[#00c8f0]/10 border-white/15 hover:border-[#00c8f0]">
                  {heroData.cta2}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. USP — Produkt Infos ─────────────────────────────────────── */}
        <section id="shop" aria-label="Produkt USPs" className="px-4 sm:px-6 max-w-7xl mx-auto mb-32">
          <div className="mb-16 max-w-3xl mx-auto text-center">
            <span className="font-headline text-xs font-black uppercase tracking-[0.2em] text-[#00c8f0] block mb-4">
              {uspData.eyebrow}
            </span>
            <h2 className="font-headline font-black text-5xl sm:text-6xl text-[#e8ecef] leading-tight tracking-tighter mb-6 whitespace-pre-line">
              {uspData.title}
            </h2>
            <p className="text-[#8d9ba8] text-lg leading-relaxed">
              {uspData.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {uspData.points.map((point, i) => (
              <div
                key={i}
                id={`usp-${i}`}
                className="group flex flex-col items-center text-center pt-8 border-t border-white/10 hover:border-[#c8f400]/50 transition-colors duration-500"
              >
                <span className="material-symbols-outlined text-4xl text-[#c8f400] mb-6 block group-hover:-translate-y-2 transition-transform duration-300">
                  {point.icon}
                </span>
                <h3 className="font-headline text-base font-black uppercase tracking-widest text-[#e8ecef] mb-3">
                  {point.title}
                </h3>
                <p className="text-[#8d9ba8] text-sm leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 4. MONSTER TRACK SHOWCASE ──────────────────────────────────── */}
        <section id="showcase" aria-label="Monster Track Showcase" className="px-4 sm:px-6 max-w-7xl mx-auto mb-32">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0d0f11] to-[#111316] grid md:grid-cols-2 min-h-[600px] border border-white/[0.02]">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c8f400] to-transparent" aria-hidden />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#c8f400]/4 blur-[120px]" aria-hidden />

            <div className="relative z-10 flex flex-col justify-center p-8 sm:p-14">
              <div className="inline-flex items-center gap-2 bg-[#c8f400] text-[#1a2000] px-4 py-1 rounded-full text-xs font-headline font-black uppercase tracking-widest mb-6 w-fit -rotate-1">
                {showcaseData.badge}
              </div>
              <h2 className="font-headline font-black text-[clamp(3rem,6vw,5.5rem)] leading-[0.9] tracking-tighter text-[#e8ecef] mb-1">
                {showcaseData.title}
              </h2>
              <span className="font-headline font-black text-3xl sm:text-4xl text-[#c8f400] text-glow-lime tracking-tighter block mb-6">
                {showcaseData.subtitle}
              </span>
              <p className="text-[#8d9ba8] text-sm leading-relaxed mb-8 max-w-sm">
                {showcaseData.description}
              </p>

              {/* Color swatches */}
              <div className="flex gap-3 mb-8">
                {showcaseData.colorways.map((color, i) => (
                  <button
                    key={i}
                    id={`colorway-${i}`}
                    aria-label={`Farbe ${i + 1}`}
                    style={{ backgroundColor: color }}
                    className="w-6 h-6 rounded-full border-2 border-white/20 hover:scale-125 hover:border-white/60 transition-all"
                  />
                ))}
              </div>

              <div className="space-y-3">
                <div className="font-headline font-black text-3xl text-[#e8ecef]">
                  {showcaseData.price}
                  <span className="text-sm font-normal text-[#8d9ba8] ml-2">inkl. MwSt.</span>
                </div>
                <button id="showcase-add-to-cart" className="btn-kinetic-primary w-full sm:w-auto px-8 py-4 text-sm">
                  {showcaseData.ctaShop}
                </button>
                <p className="text-[#3e4c58] text-xs">{showcaseData.priceNote}</p>
              </div>
            </div>

            <div className="relative flex items-center justify-center p-8 overflow-hidden">
              <div className="absolute inset-0 asphalt-texture opacity-6" aria-hidden />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0d0f11]/50" aria-hidden />
              <img
                src={showcaseData.image}
                alt={showcaseData.alt}
                className="relative z-10 w-full max-w-xs object-contain drop-shadow-[0_0_40px_rgba(200,244,0,0.12)] hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </section>

        {/* ─── 5. RONALDO × IOD — THE GOAT COLLECTION ─────────────────────── */}
        <section id="designs" aria-label="Ronaldo x IOD GOAT Collection" className="px-4 sm:px-6 max-w-7xl mx-auto mb-32">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 border border-[#ff56ed]/40 text-[#ff56ed] px-4 py-1 rounded-full text-xs font-headline font-black uppercase tracking-widest mb-4">
                <span className="material-symbols-outlined text-sm">star</span>
                {collabData.badge}
              </div>
              <h2 className="font-headline font-black text-5xl sm:text-6xl leading-none tracking-tighter text-[#e8ecef]">
                {collabData.artist}
                <br />
                <span className="text-[#ff56ed] glow-pink">{collabData.title}</span>{" "}
                <span className="text-[#e8ecef]">{collabData.subtitle}</span>
              </h2>
            </div>
            <p className="text-[#8d9ba8] text-sm max-w-xs leading-relaxed">
              {collabData.description}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {collabData.designs.map((design, i) => {
              const badgeColors: Record<string, string> = {
                primary:  "bg-[#c8f400] text-[#1a2000]",
                secondary: "bg-[#00c8f0] text-[#001f29]",
                tertiary:  "bg-[#ff56ed] text-[#2d0029]",
              };
              return (
                <div key={design.id} id={`collab-${design.id}`} className={`group cursor-pointer ${i % 2 !== 0 ? "mt-6 sm:mt-10" : ""}`}>
                  <div className="relative bg-[#161a1e] rounded-xl overflow-hidden aspect-square mb-3 flex items-center justify-center p-6 border border-white/[0.05] hover:border-[#ff56ed]/30 transition-all duration-300">
                    <div className="absolute inset-0 asphalt-texture opacity-5" aria-hidden />
                    <img src={design.image} alt={design.name} className="relative z-10 w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                    <div className={`absolute top-3 right-3 z-20 px-2.5 py-0.5 rounded-full text-[10px] font-headline font-black uppercase tracking-widest ${badgeColors[design.badgeColor] ?? badgeColors.primary}`}>
                      {design.badge}
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-[#ff56ed]/10 to-transparent" aria-hidden />
                  </div>
                  <h3 className="font-headline text-sm font-black uppercase tracking-widest text-[#e8ecef]">{design.name}</h3>
                  <p className="text-[#8d9ba8] text-xs leading-relaxed mt-1">{design.description}</p>
                  <p className="text-[#c8f400] font-headline font-black text-sm mt-2">39,99 €</p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex justify-center">
            <button id="collabs-view-all" className="btn-kinetic-ghost px-12 py-4 text-sm">
              ALLE GOAT-DESIGNS ANSEHEN
            </button>
          </div>
        </section>

        {/* ─── 6. STORY — Founder Section ─────────────────────────────────── */}
        <section id="story" aria-label="Die IOD Story" className="px-4 sm:px-6 max-w-7xl mx-auto mb-32">
          <div className="relative overflow-hidden rounded-[2rem] bg-transparent grid md:grid-cols-2 gap-8 md:gap-16 min-h-[460px] items-center">
            {/* Left — decorative asphalt + neon streak */}
            <div className="relative overflow-hidden h-[300px] md:h-full rounded-[2rem] border border-white/[0.03]">
              <img src="/family_story_1777205766624.png" alt="IOD Familie — Startup Collaboration" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#c8f400]/10 via-[#111316]/50 to-transparent mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-transparent to-transparent opacity-80" />
            </div>

            {/* Right — text */}
            <div className="flex flex-col justify-center py-8">
              <span className="font-headline text-xs font-black uppercase tracking-[0.2em] text-[#00c8f0] block mb-4">
                {storyData.eyebrow}
              </span>
              <h2 className="font-headline font-black text-4xl sm:text-5xl text-[#e8ecef] leading-tight tracking-tighter mb-6 whitespace-pre-line">
                {storyData.title}
              </h2>
              <p className="text-[#8d9ba8] text-base leading-relaxed mb-8">
                {storyData.body}
              </p>
              <button id="story-cta" className="btn-kinetic-ghost w-fit px-8 py-3 text-sm">
                {storyData.ctaLabel}
              </button>
            </div>
          </div>
        </section>

        {/* ─── 7. ACTION LOOKBOOK ─────────────────────────────────────────── */}
        <section id="flow" aria-label="IOD Action Lookbook" className="px-4 sm:px-6 max-w-7xl mx-auto mb-40">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#00c8f0]/10 border border-[#00c8f0]/20 text-[#00c8f0] px-4 py-1.5 rounded-full text-xs font-headline font-black uppercase tracking-widest mb-5">
              <span className="material-symbols-outlined text-sm">photo_camera</span>
              {lookbookData.badge}
            </div>
            <h2 className="font-headline font-black text-5xl sm:text-6xl tracking-tighter text-[#e8ecef] leading-none mb-4">
              {lookbookData.title}
            </h2>
            <p className="text-[#8d9ba8] text-sm max-w-md mx-auto leading-relaxed">
              {lookbookData.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {lookbookData.shots.map((shot) => (
              <div
                key={shot.id}
                id={`lookbook-shot-${shot.id}`}
                className="group relative overflow-hidden rounded-xl cursor-pointer aspect-[4/5]"
              >
                <img src={shot.image} alt={shot.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d]/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <span className="inline-block font-headline text-[10px] font-black uppercase tracking-widest text-[#00c8f0] border border-[#00c8f0]/40 px-2.5 py-0.5 rounded-full mb-2">
                    {shot.tag}
                  </span>
                  <p className="font-headline font-bold text-sm text-[#e8ecef]">{shot.caption}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button id="lookbook-discover" className="btn-kinetic-primary px-10 py-4 text-sm">
              {lookbookData.ctaLabel}
            </button>
          </div>
        </section>

        {/* ─── 8. FAQ ─────────────────────────────────────────────────────── */}
        <section id="faq" aria-label="FAQ" className="px-4 sm:px-6 max-w-4xl mx-auto mb-40">
          <div className="text-center mb-16">
            <span className="font-headline text-xs font-black uppercase tracking-[0.2em] text-[#ff56ed] block mb-3">
              ALLES KLAR?
            </span>
            <h2 className="font-headline font-black text-4xl sm:text-5xl text-[#e8ecef] tracking-tighter">
              FAQ
            </h2>
          </div>

          <div className="space-y-2">
            {faqData.map((item, i) => (
              <details
                key={i}
                id={`faq-${i}`}
                className="group border-b border-white/[0.08] overflow-hidden cursor-pointer hover:border-[#c8f400]/40 transition-colors pb-2"
              >
                <summary className="flex justify-between items-center py-5 font-headline font-bold text-base sm:text-lg text-[#e8ecef] list-none select-none">
                  {item.q}
                  <span className="material-symbols-outlined text-[#8d9ba8] group-hover:text-[#c8f400] text-2xl ml-6 group-open:rotate-45 transition-transform duration-300 flex-shrink-0">
                    add
                  </span>
                </summary>
                <div className="pb-6 pr-12 text-[#8d9ba8] text-base leading-relaxed pt-2">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ─── 9. NEWSLETTER ──────────────────────────────────────────────── */}
        <section id="crew" aria-label="Join the Crew" className="px-4 sm:px-6 max-w-5xl mx-auto mb-32">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#c8f400] px-8 sm:px-16 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/12 blur-2xl" aria-hidden />
            <div className="absolute -bottom-10 right-10 w-56 h-56 rounded-full bg-[#a0c200]/40 blur-3xl" aria-hidden />
            <div className="relative z-10">
              <h2 className="font-headline font-black text-4xl sm:text-5xl uppercase tracking-tighter text-[#1a2000] leading-none mb-2">
                {newsletterData.title}
              </h2>
              <p className="text-[#384900] font-medium text-base">{newsletterData.description}</p>
            </div>
            <div className="relative z-10 flex w-full md:w-auto gap-2">
              <input
                id="newsletter-input"
                type="email"
                placeholder={newsletterData.placeholder}
                className="bg-[#1a2000]/15 border-none rounded-full px-6 py-3 w-full md:w-72 placeholder:text-[#1a2000]/50 text-[#1a2000] font-medium focus:outline-none focus:ring-2 focus:ring-[#1a2000]/40"
                aria-label="E-Mail Adresse"
              />
              <button id="newsletter-submit" className="btn-kinetic-primary !bg-[#1a2000] !text-[#c8f400] px-8 py-3 text-sm whitespace-nowrap">
                {newsletterData.buttonText}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ─── 10. FOOTER ──────────────────────────────────────────────────── */}
      <footer className="w-full px-6 sm:px-10 py-12 bg-[#0d0f11] border-t border-white/[0.05] rounded-t-[3rem] mt-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="mb-2">
              <img src="/logo-iod.png" alt="IOD Logo" className="h-16 w-auto object-contain" />
            </div>
            <p className="font-headline text-xs font-medium tracking-tight text-[#3e4c58]">
              © 2024 Inside Out Design — 100% Textile. 0% Plastik.
            </p>
          </div>

          <div className="flex flex-col items-center gap-6">
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/iod_yourshop" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[#8d9ba8] hover:text-[#ff56ed] hover:border-[#ff56ed]/30 hover:bg-[#ff56ed]/10 transition-all duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://tiktok.com/@iod" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="p-2.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[#8d9ba8] hover:text-[#00c8f0] hover:border-[#00c8f0]/30 hover:bg-[#00c8f0]/10 transition-all duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.05a8.3 8.3 0 0 0 4.76 1.49V7.1a4.83 4.83 0 0 1-1-.41z"/></svg>
              </a>
              <a href="https://youtube.com/@iod" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="p-2.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[#8d9ba8] hover:text-[#c8f400] hover:border-[#c8f400]/30 hover:bg-[#c8f400]/10 transition-all duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.56 31.56 0 0 0 0 12a31.56 31.56 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.84.55 9.38.55 9.38.55s7.54 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.56 31.56 0 0 0 24 12a31.56 31.56 0 0 0-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
              </a>
            </div>
            {/* Legal Links */}
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer Links">
              {[
                { label: "Sizing Guide", href: "#sizes" },
                { label: "Datenschutz", href: "#" },
                { label: "AGB", href: "#" },
                { label: "Versand & Rueckgabe", href: "#" },
              ].map((link) => (
                <a key={link.label} href={link.href} className="font-headline text-xs font-medium tracking-widest uppercase text-[#3e4c58] hover:text-[#c8f400] transition-colors duration-200">
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="font-headline font-black text-xl text-[#ff56ed] rotate-2 glow-pink select-none">
            GO FAST.
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-white/[0.04] text-center">
          <p className="text-[#3e4c58] text-xs leading-relaxed">
            Alle Preise inkl. MwSt., zzgl.{" "}
            <a href="#" className="underline hover:text-[#8d9ba8]">Versandkosten</a>.
            {" "}Widerrufsrecht: 14 Tage nach Erhalt der Ware.
          </p>
        </div>
      </footer>

      {/* ─── 11. MOBILE BOTTOM NAV ──────────────────────────────────────── */}
      <nav aria-label="Mobile Navigation" className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0d0f11]/95 backdrop-blur-xl border-t border-white/[0.06] flex justify-around items-center py-3 px-4">
        {[
          { icon: "home", label: "Home", href: "#hero", active: true },
          { icon: "storefront", label: "Shop", href: "#shop", active: false },
          { icon: "star", label: "GOAT", href: "#designs", active: false },
          { icon: "auto_stories", label: "Story", href: "#story", active: false },
          { icon: "help_outline", label: "FAQ", href: "#faq", active: false },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            id={`mobile-nav-${item.label.toLowerCase()}`}
            className={`flex flex-col items-center gap-0.5 ${item.active ? "text-[#c8f400]" : "text-[#3e4c58] hover:text-[#8d9ba8]"} transition-colors`}
          >
            <span className="material-symbols-outlined text-xl" style={item.active ? { fontVariationSettings: "'FILL' 1" } : {}}>
              {item.icon}
            </span>
            <span className="text-[9px] font-headline font-black uppercase tracking-widest">{item.label}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
