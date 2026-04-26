
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
  sizesData,
  productsData as mockProductsData,
  teamData,
} from "../data/mockData";
import { client } from "../sanity/client";
import { urlFor } from "../sanity/image";
import TeamCarousel from "../components/TeamCarousel";
import NewsletterForm from "../components/NewsletterForm";
// -----------------------------------------------------------------------------
// IOD Webshop Homepage — Skin: "Kinetic Asphalt"
export const revalidate = 0; // Disable caching so Sanity updates are immediately visible
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
// -----------------------------------------------------------------------------

export default async function Home() {
  const sanityProductsRaw = await client.fetch(`*[_type == "product"]{
    "id": slug.current,
    "name": title,
    price,
    badge,
    badgeType,
    description,
    image
  }`);

  const productsData = sanityProductsRaw.map((sp: any) => {
    // using loose comparison string vs number, or match by string
    const match = mockProductsData.find(m => String(m.id) === sp.id || sp.id.includes(m.name.toLowerCase().replace(/ /g, '-')));
    return {
      id: sp.id,
      name: sp.name,
      price: `CHF ${sp.price}.00`,
      badge: sp.badge,
      badgeType: sp.badgeType || "primary",
      image: sp.image ? urlFor(sp.image).url() : (match?.image || "/product_monster_track.png"),
      alt: sp.description || match?.alt || "IOD Premium Sleeve"
    };
  });

  const homePage = await client.fetch(`*[_type == "homePage"][0]`);
  
  const hero = homePage?.hero || heroData;
  const usp = homePage?.usp || uspData;
  const sizes = homePage?.sizes || sizesData;
  const story = homePage?.story || storyData;
  const lookbook = {
    ...(homePage?.lookbook || lookbookData),
    shots: lookbookData.shots, // Always use local action images for lookbook
  };
  const faq = homePage?.faq || faqData;
  const newsletter = homePage?.newsletter || newsletterData;

  const heroImage = homePage?.hero?.backgroundImage ? urlFor(homePage.hero.backgroundImage).url() : heroData.image;
  const storyImage = homePage?.story?.image ? urlFor(homePage.story.image).url() : "/family_story_1777205766624.png";

  return (
    <>

      <main className="pt-28">
        {/* --- 2. HERO ------------------------------------------------------- */}
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
                {hero.tagline}
              </div>

              <h1 className="font-headline font-black italic text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] tracking-tighter mb-5 uppercase">
                <span className="text-[#e8ecef]">{hero.titlePart1 || "SECOND"}</span>{" "}
                <span className="text-[#c8f400] text-glow-lime">{hero.titlePart2 || "SKIN."}</span>
                <br />
                <span className="text-[#e8ecef]">{hero.titlePart3 || "BUT WITH A"}</span>{" "}
                <span className="text-[#00c8f0] glow-cyan">{hero.titlePart4 || "STATEMENT."}</span>
              </h1>

              <p className="text-[#8d9ba8] text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                {hero.subTagline}
              </p>

              <div className="flex flex-wrap gap-4">
                <button id="hero-cta-order" className="btn-kinetic-primary px-10 py-4 text-sm shadow-[0_0_30px_rgba(200,244,0,0.3)]">
                  {hero.cta1}
                </button>
                <button id="hero-cta-learn" className="btn-kinetic-ghost bg-[#0a0b0d]/40 backdrop-blur-md px-10 py-4 text-sm hover:bg-[#00c8f0]/10 border-white/15 hover:border-[#00c8f0]">
                  {hero.cta2}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* --- 3. USP — Produkt Infos --------------------------------------- */}
        <section id="shop" aria-label="Produkt USPs" className="px-4 sm:px-6 max-w-7xl mx-auto mb-32">
          <div className="mb-16 max-w-3xl mx-auto text-center">
            <span className="font-headline text-xs font-black uppercase tracking-[0.2em] text-[#00c8f0] block mb-4">
              {usp.eyebrow}
            </span>
            <h2 className="font-headline font-black text-5xl sm:text-6xl text-[#e8ecef] leading-tight tracking-tighter mb-6 whitespace-pre-line">
              {usp.title}
            </h2>
            <p className="text-[#8d9ba8] text-lg leading-relaxed">
              {usp.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8">
            {usp.points?.map((point: any, i: number) => (
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

        {/* --- 4. FEATURED DESIGNS ------------------------------------ */}
        <section id="showcase" aria-label="Featured Designs" className="px-4 sm:px-6 max-w-7xl mx-auto mb-32">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 border border-[#c8f400]/40 text-[#c8f400] px-4 py-1 rounded-full text-xs font-headline font-black uppercase tracking-widest mb-4">
                <span className="material-symbols-outlined text-sm">bolt</span>
                LATEST DROPS
              </div>
              <h2 className="font-headline font-black text-5xl sm:text-6xl leading-none tracking-tighter text-[#e8ecef]">
                FEATURED
                <br />
                <span className="text-[#c8f400] glow-lime">DESIGNS</span>
              </h2>
            </div>
            <p className="text-[#8d9ba8] text-sm max-w-xs leading-relaxed">
              Die neuesten Sleeves für den Betonurwald und Dirtracks. Kein Klotz, nur Flow.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {productsData.slice(0, 4).map((design: any, i: number) => {
              const badgeColors: Record<string, string> = {
                primary:  "bg-[#c8f400] text-[#1a2000]",
                secondary: "bg-[#00c8f0] text-[#001f29]",
                tertiary:  "bg-[#ff56ed] text-[#2d0029]",
              };
              return (
                <div key={design.id} id={`collab-${design.id}`} className={`group cursor-pointer ${i % 2 !== 0 ? "mt-6 sm:mt-10" : ""}`}>
                  <div className="relative bg-[#161a1e] rounded-xl overflow-hidden aspect-square mb-3 flex items-center justify-center p-6 border border-white/[0.05] hover:border-[#c8f400]/30 transition-all duration-300">
                    <div className="absolute inset-0 asphalt-texture opacity-5" aria-hidden />
                    <img src={design.image} alt={design.name} className="relative z-10 w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                    <div className={`absolute top-3 right-3 z-20 px-2.5 py-0.5 rounded-full text-[10px] font-headline font-black uppercase tracking-widest ${badgeColors[design.badgeType] ?? badgeColors.primary}`}>
                      {design.badge}
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-[#c8f400]/10 to-transparent" aria-hidden />
                  </div>
                  <h3 className="font-headline text-sm font-black uppercase tracking-widest text-[#e8ecef]">{design.name}</h3>
                  <p className="text-[#8d9ba8] text-xs leading-relaxed mt-1">{design.alt}</p>
                  <p className="text-[#c8f400] font-headline font-black text-sm mt-2">{design.price}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-16 flex justify-center">
            <a href="/shop" id="collabs-view-all" className="btn-kinetic-ghost px-12 py-4 text-sm inline-block">
              ALLE DESIGNS IM SHOP ENTDECKEN
            </a>
          </div>
        </section>

        {/* --- 4.5 ACTION LOOKBOOK — "Der pure Flow" ------------------------- */}
        <section id="flow" aria-label="IOD Action Lookbook" className="px-4 sm:px-6 max-w-7xl mx-auto mb-32">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#00c8f0]/10 border border-[#00c8f0]/20 text-[#00c8f0] px-4 py-1.5 rounded-full text-xs font-headline font-black uppercase tracking-widest mb-5">
              <span className="material-symbols-outlined text-sm">photo_camera</span>
              {lookbook.badge}
            </div>
            <h2 className="font-headline font-black text-5xl sm:text-6xl tracking-tighter text-[#e8ecef] leading-none mb-4">
              {lookbook.title}
            </h2>
            <p className="text-[#8d9ba8] text-sm max-w-md mx-auto leading-relaxed">
              {lookbook.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {lookbook.shots?.map((shot: any, i: number) => (
              <div
                key={shot.id || i}
                id={`lookbook-shot-${shot.id || i}`}
                className="group relative overflow-hidden rounded-xl cursor-pointer aspect-[4/5]"
              >
                <img src={shot.image && typeof shot.image !== 'string' ? urlFor(shot.image).url() : (shot.image || "/lookbook_fallback.png")} alt={shot.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
              {lookbook.ctaLabel}
            </button>
          </div>
        </section>

        {/* --- 5. SIZES GUIDE ------------------------------------------------ */}
        <section id="sizes" aria-label="Grössen Guide" className="px-4 sm:px-6 max-w-7xl mx-auto mb-32">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 border border-[#c8f400]/40 text-[#c8f400] px-4 py-1 rounded-full text-xs font-headline font-black uppercase tracking-widest mb-4">
              <span className="material-symbols-outlined text-sm">straighten</span>
              {sizes.eyebrow}
            </div>
            <h2 className="font-headline font-black text-5xl sm:text-6xl text-[#e8ecef] leading-tight tracking-tighter mb-6 whitespace-pre-line">
              {sizes.title}
            </h2>
            <p className="text-[#8d9ba8] text-lg leading-relaxed">
              {sizes.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {sizes.categories?.map((category: any, i: number) => {
              const themeColors: Record<string, { border: string, text: string, bg: string, glow: string }> = {
                primary: { border: "group-hover:border-[#c8f400]/50", text: "text-[#c8f400]", bg: "from-[#c8f400]/10", glow: "glow-lime" },
                secondary: { border: "group-hover:border-[#00c8f0]/50", text: "text-[#00c8f0]", bg: "from-[#00c8f0]/10", glow: "glow-cyan" },
                tertiary: { border: "group-hover:border-[#ff56ed]/50", text: "text-[#ff56ed]", bg: "from-[#ff56ed]/10", glow: "glow-pink" },
              };
              const theme = themeColors[category.color] || themeColors.primary;

              return (
                <div key={category.id || i} className={`group relative bg-[#161a1e] rounded-xl overflow-hidden p-6 sm:p-8 border border-white/[0.05] ${theme.border} transition-all duration-300 min-h-[300px] flex flex-col justify-end`}>
                  {/* Huge Background Text (Watermark) */}
                  <div className="absolute top-4 left-4 right-4 text-7xl md:text-8xl font-headline font-black text-white/[0.02] tracking-tighter leading-none select-none pointer-events-none break-words">
                    {category.age}
                  </div>
                  
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t ${theme.bg} to-transparent mix-blend-screen pointer-events-none`} aria-hidden />
                  
                  <div className="relative z-10">
                    <span className={`material-symbols-outlined text-4xl sm:text-5xl ${theme.text} mb-4 block group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300`}>
                      {category.icon}
                    </span>
                    <h3 className={`font-headline text-2xl font-black uppercase tracking-tighter text-[#e8ecef] mb-1 ${theme.text} group-hover:${theme.glow} transition-all`}>
                      {category.title}
                    </h3>
                    <p className="font-headline text-xs font-black uppercase tracking-widest text-[#8d9ba8] mb-3">
                      Alter: {category.age}
                    </p>
                    <p className="text-[#8d9ba8] text-sm leading-relaxed group-hover:text-white transition-colors">
                      {category.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* --- 6. STORY — Founder Section ----------------------------------- */}
        <section id="story" aria-label="Die IOD Story" className="px-4 sm:px-6 max-w-7xl mx-auto mb-32">
          <div className="relative overflow-hidden rounded-[2rem] bg-transparent grid md:grid-cols-2 gap-8 md:gap-16 min-h-[460px] items-center">
            {/* Left — decorative asphalt + neon streak */}
            <div className="relative overflow-hidden h-[300px] md:h-full rounded-[2rem] border border-white/[0.03]">
              <img src={storyImage} alt="IOD Familie" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#c8f400]/10 via-[#111316]/50 to-transparent mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0d] via-transparent to-transparent opacity-80" />
            </div>

            {/* Right — text */}
            <div className="flex flex-col justify-center py-8">
              <span className="font-headline text-xs font-black uppercase tracking-[0.2em] text-[#00c8f0] block mb-4">
                {story.eyebrow}
              </span>
              <h2 className="font-headline font-black text-4xl sm:text-5xl text-[#e8ecef] leading-tight tracking-tighter mb-6 whitespace-pre-line">
                {story.title}
              </h2>
              <p className="text-[#8d9ba8] text-base leading-relaxed mb-8 whitespace-pre-line">
                {story.body}
              </p>
              <button id="story-cta" className="btn-kinetic-ghost w-fit px-8 py-3 text-sm">
                {story.ctaLabel}
              </button>
            </div>
          </div>
        </section>

        {/* --- 6.5 TEAM — Meet the Crew ------------------------------------ */}
        <section id="team" aria-label="Das IOD Team" className="px-4 sm:px-6 max-w-7xl mx-auto mb-32">
          <div className="text-center mb-16">
            <span className="font-headline text-xs font-black uppercase tracking-[0.2em] text-[#c8f400] block mb-3">
              {teamData.eyebrow}
            </span>
            <h2 className="font-headline font-black text-4xl sm:text-6xl text-[#e8ecef] tracking-tighter leading-none mb-4 whitespace-pre-line">
              {teamData.title}
            </h2>
            <p className="text-[#8d9ba8] text-sm max-w-md mx-auto leading-relaxed">
              {teamData.description}
            </p>
          </div>

          <TeamCarousel />
        </section>



        {/* --- 8. FAQ ------------------------------------------------------- */}
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
            {faq?.map((item: any, i: number) => (
              <details
                key={i}
                id={`faq-${i}`}
                className="group border-b border-white/[0.08] overflow-hidden cursor-pointer hover:border-[#c8f400]/40 transition-colors pb-2"
              >
                <summary className="flex justify-between items-center py-5 font-headline font-bold text-base sm:text-lg text-[#e8ecef] list-none select-none">
                  {item.question || item.q}
                  <span className="material-symbols-outlined text-[#8d9ba8] group-hover:text-[#c8f400] text-2xl ml-6 group-open:rotate-45 transition-transform duration-300 flex-shrink-0">
                    add
                  </span>
                </summary>
                <div className="pb-6 pr-12 text-[#8d9ba8] text-base leading-relaxed pt-2 whitespace-pre-line">
                  {item.answer || item.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* --- 9. NEWSLETTER ------------------------------------------------ */}
        <section id="crew" aria-label="Join the Crew" className="px-4 sm:px-6 max-w-5xl mx-auto mb-32">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#c8f400] px-8 sm:px-16 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/12 blur-2xl" aria-hidden />
            <div className="absolute -bottom-10 right-10 w-56 h-56 rounded-full bg-[#a0c200]/40 blur-3xl" aria-hidden />
            <div className="relative z-10">
              <h2 className="font-headline font-black text-4xl sm:text-5xl uppercase tracking-tighter text-[#1a2000] leading-none mb-2">
                {newsletter.title}
              </h2>
              <p className="text-[#384900] font-medium text-base">{newsletter.description}</p>
            </div>
            <NewsletterForm newsletter={newsletter} />
          </div>
        </section>
      </main>


    </>
  );
}
