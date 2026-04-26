"use client";

import { useCart } from "../context/CartContext";
import Link from "next/link";
import { useEffect } from "react";

export default function CartDrawer() {
  const { items, isOpen, totalItems, totalPrice, closeDrawer, removeItem, updateQty } = useCart();

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
        onClick={closeDrawer}
        aria-hidden
      />

      {/* Drawer Panel */}
      <aside
        role="dialog"
        aria-label="Warenkorb"
        className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-[420px] bg-[#0d0f11] border-l border-white/[0.06] flex flex-col shadow-2xl"
        style={{ animation: "slideInRight 0.3s cubic-bezier(0.22, 1, 0.36, 1)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#c8f400]">shopping_bag</span>
            <h2 className="font-headline font-black uppercase tracking-widest text-lg text-[#e8ecef]">
              Warenkorb
            </h2>
            {totalItems > 0 && (
              <span className="bg-[#c8f400] text-[#1a2000] font-headline font-black text-xs px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeDrawer}
            aria-label="Warenkorb schliessen"
            className="p-2 text-[#8d9ba8] hover:text-[#e8ecef] transition-colors rounded-lg hover:bg-white/[0.05]"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-20">
              <span className="material-symbols-outlined text-5xl text-[#3e4c58]">shopping_bag</span>
              <p className="font-headline font-black uppercase tracking-widest text-[#3e4c58] text-sm">
                Dein Warenkorb ist leer
              </p>
              <button
                onClick={closeDrawer}
                className="text-xs font-headline font-bold uppercase tracking-widest text-[#c8f400] hover:underline"
              >
                Weiter shoppen →
              </button>
            </div>
          ) : (
            items.map((item, i) => (
              <div
                key={`${item.product.id}-${item.size}-${i}`}
                className="flex gap-4 bg-[#111316] rounded-xl p-4 border border-white/[0.04]"
              >
                {/* Product Image */}
                <div className="w-20 h-20 rounded-lg bg-[#161a1e] overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-headline font-black uppercase text-sm text-[#e8ecef] tracking-wide truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-[#8d9ba8] text-xs mt-0.5">
                    Grösse: <span className="text-[#c8f400] font-bold">{item.sizeLabel}</span>
                  </p>
                  <p className="font-headline font-black text-[#c8f400] text-sm mt-1">
                    {item.product.price}
                  </p>

                  {/* QTY + Remove Row */}
                  <div className="flex items-center gap-3 mt-3">
                    {/* Qty Stepper */}
                    <div className="flex items-center bg-[#0a0b0d] rounded-lg border border-white/[0.08] overflow-hidden">
                      <button
                        onClick={() => updateQty(item.product.id, item.size, item.qty - 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#8d9ba8] hover:text-white transition-colors hover:bg-white/[0.05]"
                        aria-label="Weniger"
                      >
                        <span className="material-symbols-outlined text-sm">remove</span>
                      </button>
                      <span className="font-headline font-black text-sm text-[#e8ecef] w-7 text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.product.id, item.size, item.qty + 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#8d9ba8] hover:text-white transition-colors hover:bg-white/[0.05]"
                        aria-label="Mehr"
                      >
                        <span className="material-symbols-outlined text-sm">add</span>
                      </button>
                    </div>

                    {/* Line Total */}
                    <span className="text-[#8d9ba8] text-xs ml-auto">
                      {(parseFloat(item.product.price.replace(/[^0-9.]/g, "")) * item.qty).toFixed(2)} CHF
                    </span>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.product.id, item.size)}
                      aria-label="Entfernen"
                      className="text-[#3e4c58] hover:text-[#ff56ed] transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-white/[0.06] space-y-4 bg-[#0d0f11]">
            {/* Subtotal */}
            <div className="flex justify-between items-center">
              <span className="text-[#8d9ba8] text-sm">Zwischensumme</span>
              <span className="font-headline font-black text-[#e8ecef] text-lg">
                {totalPrice} CHF
              </span>
            </div>
            <p className="text-[#3e4c58] text-xs">
              inkl. MwSt. · zzgl. Versandkosten
            </p>

            {/* CTA */}
            <Link
              href="/auth"
              onClick={closeDrawer}
              className="block w-full py-4 bg-[#c8f400] text-[#1a2000] font-headline font-black text-sm uppercase tracking-widest text-center rounded-xl hover:shadow-[0_0_24px_rgba(200,244,0,0.4)] transition-all active:scale-95"
            >
              Zur Kasse
            </Link>
            <button
              onClick={closeDrawer}
              className="block w-full py-3 border border-white/[0.08] text-[#8d9ba8] font-headline font-bold text-xs uppercase tracking-widest text-center rounded-xl hover:border-white/20 hover:text-[#e8ecef] transition-all"
            >
              Weiter shoppen
            </button>
          </div>
        )}
      </aside>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0.5; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </>
  );
}
