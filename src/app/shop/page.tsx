"use client";

import { useState } from "react";
import { productsData, collabData, showcaseData, sizesData } from "../../data/mockData";
import { useCart, CartItem } from "../../context/CartContext";

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

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart: (item: CartItem) => void }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const badgeColors: Record<string, string> = {
    primary: "bg-[#c8f400] text-[#1a2000]",
    secondary: "bg-[#00c8f0] text-[#001f29]",
    tertiary: "bg-[#ff56ed] text-[#2d0029]",
  };

  const handleAdd = () => {
    if (!selectedSize) return;
    const sizeObj = SIZES.find(s => s.id === selectedSize);
    onAddToCart({
      product,
      size: selectedSize,
      sizeLabel: sizeObj ? `${sizeObj.label} (${sizeObj.age})` : selectedSize,
      qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group flex flex-col bg-[#111316] border border-white/[0.03] rounded-2xl overflow-hidden hover:border-[#c8f400]/20 transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-square bg-[#161a1e] overflow-hidden">
        <div className="absolute inset-0 asphalt-texture opacity-5" aria-hidden />
        {product.badge && (
          <div className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-[10px] font-headline font-black uppercase tracking-widest ${badgeColors[product.badgeType] || badgeColors.primary}`}>
            {product.badge}
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col flex-1 gap-4">
        <div>
          <h3 className="font-headline font-black uppercase tracking-widest text-base text-[#e8ecef]">
            {product.name}
          </h3>
          <p className="text-[#8d9ba8] text-xs leading-relaxed mt-0.5 line-clamp-2">
            {product.alt || "IOD Premium Ellbogenschützer Sleeve"}
          </p>
        </div>

        {/* Size Selector */}
        <div>
          <p className="font-headline text-[10px] font-black uppercase tracking-widest text-[#8d9ba8] mb-2 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-[#c8f400]">straighten</span>
            GRÖSSE WÄHLEN
            {!selectedSize && <span className="text-[#ff56ed] ml-1">*</span>}
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {SIZES.map((size) => (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size.id)}
                className={`relative px-2 py-2 rounded-lg border text-center transition-all duration-200 ${
                  selectedSize === size.id
                    ? "border-[#c8f400] bg-[#c8f400]/10 text-[#c8f400]"
                    : "border-white/[0.08] text-[#8d9ba8] hover:border-white/20 hover:text-[#e8ecef]"
                }`}
              >
                <span className="font-headline font-black text-[10px] uppercase tracking-wider block">{size.label}</span>
                <span className="font-body text-[9px] text-current opacity-60 block">{size.age}</span>
              </button>
            ))}
          </div>
        </div>

        {/* QTY + Add to Cart */}
        <div className="flex items-center gap-3 mt-auto pt-3 border-t border-white/[0.05]">
          <span className="font-headline font-black text-[#c8f400] text-base whitespace-nowrap">
            {product.price}
          </span>

          {/* QTY Stepper */}
          <div className="flex items-center gap-1 bg-[#0a0b0d] rounded-lg border border-white/[0.08] p-0.5 ml-auto">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-7 h-7 flex items-center justify-center text-[#8d9ba8] hover:text-[#e8ecef] transition-colors rounded-md hover:bg-white/[0.05]"
              aria-label="Weniger"
            >
              <span className="material-symbols-outlined text-base">remove</span>
            </button>
            <span className="font-headline font-black text-sm text-[#e8ecef] w-6 text-center">
              {qty}
            </span>
            <button
              onClick={() => setQty((q) => Math.min(10, q + 1))}
              className="w-7 h-7 flex items-center justify-center text-[#8d9ba8] hover:text-[#e8ecef] transition-colors rounded-md hover:bg-white/[0.05]"
              aria-label="Mehr"
            >
              <span className="material-symbols-outlined text-base">add</span>
            </button>
          </div>
        </div>

        {/* Add Button */}
        <button
          onClick={handleAdd}
          disabled={!selectedSize}
          className={`w-full py-3 rounded-xl font-headline font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 ${
            added
              ? "bg-[#c8f400] text-[#1a2000]"
              : selectedSize
              ? "bg-[#c8f400] text-[#1a2000] hover:shadow-[0_0_20px_rgba(200,244,0,0.4)] active:scale-95"
              : "bg-white/[0.05] text-[#3e4c58] cursor-not-allowed"
          }`}
        >
          <span className="material-symbols-outlined text-base">
            {added ? "check_circle" : "add_shopping_cart"}
          </span>
          {added ? "IN WARENKORB!" : selectedSize ? `IN WARENKORB` : "GRÖSSE WÄHLEN"}
        </button>
      </div>
    </div>
  );
}

// ─── MAIN SHOP PAGE ───────────────────────────────────────────────────────────
export default function Shop() {
  const [filter, setFilter] = useState("ALL");
  const { addItem, openDrawer } = useCart();

  const filteredProducts = filter === "ALL"
    ? allProducts
    : allProducts.filter((p) => {
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
