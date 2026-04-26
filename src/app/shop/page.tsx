"use client";

import { useState, useEffect } from "react";
import { productsData, collabData, showcaseData, sizesData } from "../../data/mockData";
import { useCart, CartItem } from "../../context/CartContext";
import { client } from "../../sanity/client";

// ─── TYPES ────────────────────────────────────────────────────────────────────
type Product = {
  id: string | number;
  name: string;
  price: string;
  badge: string | null;
  badgeType: string;
  image: string;
  alt: string;
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const allProducts: Product[] = productsData.map((p) => ({
  id: p.id,
  name: p.name,
  price: p.price,
  badge: p.badge,
  badgeType: p.badgeType,
  image: p.image,
  alt: p.alt,
}));
const SIZES = sizesData.categories.map((c) => ({
  id: c.id,
  label: c.title,
  age: c.age,
}));

// ─── PRODUCT CARD (COMING SOON) ───────────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  const badgeColors: Record<string, string> = {
    primary: "bg-[#c8f400] text-[#1a2000]",
    secondary: "bg-[#00c8f0] text-[#001f29]",
    tertiary: "bg-[#ff56ed] text-[#2d0029]",
  };

  return (
    <div className="group flex flex-col bg-[#111316] border border-white/[0.03] rounded-2xl overflow-hidden hover:border-[#c8f400]/20 transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-square bg-[#161a1e] overflow-hidden">
        <div className="absolute inset-0 asphalt-texture opacity-5" aria-hidden />
        {/* Coming Soon Overlay */}
        <div className="absolute inset-0 z-30 bg-[#0a0b0d]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="font-headline font-black text-xl uppercase tracking-widest text-[#c8f400] bg-[#0a0b0d]/80 px-6 py-3 rounded-full border border-[#c8f400]/30 backdrop-blur-sm">
            COMING SOON
          </span>
        </div>
        {product.badge && (
          <div className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-[10px] font-headline font-black uppercase tracking-widest ${badgeColors[product.badgeType] || badgeColors.primary}`}>
            {product.badge}
          </div>
        )}
        {/* Coming Soon corner ribbon */}
        <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-[10px] font-headline font-black uppercase tracking-widest bg-[#ff56ed]/90 text-white backdrop-blur-sm flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          BALD DA
        </div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <h3 className="font-headline font-black uppercase tracking-widest text-base text-[#e8ecef]">
            {product.name}
          </h3>
          <p className="text-[#8d9ba8] text-xs leading-relaxed mt-0.5 line-clamp-2">
            {product.alt || "IOD Premium Ellbogenschützer Sleeve"}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/[0.05]">
          <span className="font-headline font-black text-[#c8f400] text-base whitespace-nowrap">
            {product.price}
          </span>
          <span className="font-headline text-[10px] font-black uppercase tracking-widest text-[#ff56ed] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">schedule</span>
            COMING SOON
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN SHOP PAGE ───────────────────────────────────────────────────────────
export default function Shop() {
  const [sanityProducts, setSanityProducts] = useState(allProducts);
  const [filter, setFilter] = useState("ALL");
  const { addItem, openDrawer } = useCart();

  useEffect(() => {
    client.fetch(`*[_type == "product"]{
      "id": slug.current,
      "name": title,
      price,
      badge,
      badgeType,
      description
    }`).then((data: any[]) => {
      const merged = data.map(sp => {
        const match = allProducts.find(p => p.id === sp.id);
        return {
          id: sp.id,
          name: sp.name,
          price: `CHF ${sp.price}.00`,
          badge: sp.badge,
          badgeType: sp.badgeType || "primary",
          image: match?.image || "/product_monster_track.png",
          alt: sp.description || match?.alt || "IOD Premium Sleeve"
        };
      });
      setSanityProducts(merged);
    }).catch(console.error);
  }, []);

  const filteredProducts = filter === "ALL"
    ? sanityProducts
    : sanityProducts.filter((p) => {
        if (filter === "TRENDING" && p.badge === "TRENDING") return true;
        if (filter === "NEW" && (p.badge === "NEW" || p.badge === "NEW DROP")) return true;
        if (filter === "GOAT" && collabData.designs.find((d) => d.name === p.name)) return true;
        return false;
      });

  const handleAddToCart = (item: CartItem) => {
    addItem(item);
    openDrawer();
  };

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-[#e8ecef] selection:bg-[#c8f400] selection:text-[#1a2000]">
      <main className="pt-36 px-4 sm:px-6 max-w-7xl mx-auto pb-32">
        {/* Header */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-headline font-black text-5xl sm:text-7xl leading-none tracking-tighter text-[#e8ecef] mb-3">
              THE <span className="text-[#c8f400] glow-lime">STORE.</span>
            </h1>
            <p className="text-[#8d9ba8] text-base max-w-lg">
              Entdecke alle Designs unserer Second-Skin Sleeves. Hauchdünn, elastisch, komplett bedruckbar.
            </p>
          </div>
        </div>

        {/* Filters + Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-60 flex-shrink-0">
            <div className="sticky top-32 p-5 rounded-2xl bg-[#111316] border border-white/[0.05]">
              <h3 className="font-headline font-black uppercase tracking-widest text-xs text-[#e8ecef] mb-5 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-[#c8f400]">tune</span>
                Filter
              </h3>
              <div className="space-y-2">
                {["ALL", "TRENDING", "NEW", "GOAT"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl font-headline text-xs font-bold uppercase tracking-widest transition-all ${
                      filter === f
                        ? "bg-[#c8f400]/10 text-[#c8f400] border border-[#c8f400]/30"
                        : "text-[#8d9ba8] hover:bg-white/[0.03] hover:text-[#e8ecef] border border-transparent"
                    }`}
                  >
                    {f === "ALL" ? "Alle Designs" : f === "TRENDING" ? "Trending" : f === "NEW" ? "Neu" : "GOAT Collection"}
                  </button>
                ))}
              </div>

              {/* Size Guide Link */}
              <div className="mt-6 pt-5 border-t border-white/[0.05]">
                <a
                  href="/#sizes"
                  className="flex items-center gap-2 text-[#8d9ba8] hover:text-[#00c8f0] transition-colors font-headline font-bold text-xs uppercase tracking-widest"
                >
                  <span className="material-symbols-outlined text-sm">straighten</span>
                  Grössentabelle
                </a>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Size Reminder Banner */}
            <div className="flex items-start gap-3 bg-[#00c8f0]/5 border border-[#00c8f0]/20 rounded-xl px-4 py-3 mb-6">
              <span className="material-symbols-outlined text-[#00c8f0] text-lg mt-0.5">info</span>
              <p className="text-[#8d9ba8] text-xs leading-relaxed">
                <span className="text-[#00c8f0] font-headline font-black">Bitte Grösse wählen</span> bevor du in den Warenkorb legst.{" "}
                <a href="/#sizes" className="underline hover:text-[#c8f400] transition-colors">Grössenguide ansehen →</a>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-20 text-center border border-white/[0.05] rounded-2xl bg-[#111316]">
                <span className="material-symbols-outlined text-4xl text-[#3e4c58] mb-4 block">search_off</span>
                <h3 className="font-headline font-black text-xl text-[#e8ecef] mb-2">KEINE DESIGNS GEFUNDEN</h3>
                <p className="text-[#8d9ba8]">Versuche einen anderen Filter auszuwählen.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
