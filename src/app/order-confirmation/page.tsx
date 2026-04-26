"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

type Order = {
  id: string;
  date: string;
  items: Array<{ product: { name: string; image: string; price: string }; size: string; sizeLabel: string; qty: number }>;
  address: { firstName: string; lastName: string; street: string; zip: string; city: string; country: string; email: string };
  subtotal: string;
  shipping: string;
  total: string;
};

function ConfirmationContent() {
  const params = useSearchParams();
  const orderId = params.get("id");
  const sessionId = params.get("session_id");
  const { clearCart } = useCart();
  const [order, setOrder] = useState<Order | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (sessionId) {
      // It's a Stripe order, we clear the cart
      clearCart();
    } else if (orderId) {
      try {
        const orders: Order[] = JSON.parse(localStorage.getItem("iod_orders_v1") || "[]");
        const found = orders.find((o) => o.id === orderId);
        setOrder(found || null);
      } catch {}
    }
    // Trigger entrance animation
    setTimeout(() => setShow(true), 100);
  }, [orderId, sessionId, clearCart]);

  return (
    <div
      className={`min-h-screen bg-[#0a0b0d] pt-28 pb-20 px-4 transition-all duration-700 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="relative inline-block mb-8">
          <div className="w-24 h-24 rounded-full bg-[#c8f400]/10 border border-[#c8f400]/30 flex items-center justify-center mx-auto">
            <span
              className="material-symbols-outlined text-5xl text-[#c8f400]"
              style={{ animation: show ? "popIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both" : "none" }}
            >
              check_circle
            </span>
          </div>
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-full bg-[#c8f400]/10 blur-2xl scale-150 pointer-events-none" aria-hidden />
        </div>

        <h1 className="font-headline font-black text-4xl sm:text-5xl text-[#e8ecef] tracking-tighter mb-3">
          BESTELLUNG<br />
          <span className="text-[#c8f400] glow-lime">BESTÄTIGT!</span>
        </h1>

        {orderId && (
          <p className="text-[#8d9ba8] text-base mb-2">
            Bestellnummer: <span className="font-headline font-black text-[#e8ecef]">{orderId}</span>
          </p>
        )}
        
        {sessionId && (
          <p className="text-[#8d9ba8] text-base mb-2">
            Stripe Session ID: <span className="font-headline font-black text-[#e8ecef]">{sessionId.substring(0, 16)}...</span>
          </p>
        )}

        {order && (
          <p className="text-[#8d9ba8] text-sm mb-10">
            Bestätigungs-E-Mail geht an{" "}
            <span className="text-[#e8ecef]">{order.address.email}</span>
          </p>
        )}

        {/* Order Summary Card */}
        {order && (
          <div className="bg-[#111316] border border-white/[0.05] rounded-2xl p-6 text-left mb-8 space-y-4">
            <h2 className="font-headline font-black uppercase tracking-widest text-xs text-[#8d9ba8] mb-4">
              Deine Bestellung
            </h2>

            {order.items.map((item, i) => (
              <div key={i} className="flex gap-4 bg-[#0d0f11] rounded-xl p-4 border border-white/[0.04]">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-headline font-black text-sm text-[#e8ecef] uppercase">{item.product.name}</p>
                  <p className="text-[#8d9ba8] text-xs">Grösse: {item.sizeLabel} · Menge: {item.qty}</p>
                  <p className="font-headline font-black text-[#c8f400] text-sm mt-1">
                    {(parseFloat(item.product.price.replace(/[^0-9.]/g, "")) * item.qty).toFixed(2)} CHF
                  </p>
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-white/[0.05] space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-[#8d9ba8]">Zwischensumme</span>
                <span className="text-[#e8ecef]">{order.subtotal} CHF</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#8d9ba8]">Versand</span>
                <span className="text-[#e8ecef]">{order.shipping} CHF</span>
              </div>
              <div className="flex justify-between text-base font-headline font-black pt-2 border-t border-white/[0.05]">
                <span className="text-[#e8ecef] uppercase tracking-wide">Total</span>
                <span className="text-[#c8f400]">{order.total} CHF</span>
              </div>
            </div>

            {/* Shipping address */}
            <div className="bg-[#0d0f11] rounded-xl p-4 border border-white/[0.04] mt-2">
              <p className="font-headline font-black text-[10px] uppercase tracking-widest text-[#8d9ba8] mb-2">Lieferadresse</p>
              <p className="text-[#e8ecef] text-sm">{order.address.firstName} {order.address.lastName}</p>
              <p className="text-[#8d9ba8] text-sm">{order.address.street}</p>
              <p className="text-[#8d9ba8] text-sm">{order.address.zip} {order.address.city}, {order.address.country}</p>
            </div>
          </div>
        )}

        {/* What next */}
        <div className="flex items-start gap-3 bg-[#00c8f0]/5 border border-[#00c8f0]/20 rounded-xl px-5 py-4 text-left mb-8">
          <span className="material-symbols-outlined text-[#00c8f0] text-xl mt-0.5">local_shipping</span>
          <div>
            <p className="font-headline font-black text-sm text-[#00c8f0] uppercase tracking-wide mb-0.5">Was passiert als nächstes?</p>
            <p className="text-[#8d9ba8] text-sm leading-relaxed">
              Deine Bestellung wird innerhalb von 1–2 Werktagen bearbeitet und per Post (CH) verschickt. Lieferzeit: 3–5 Werktage.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="px-8 py-4 bg-[#c8f400] text-[#1a2000] font-headline font-black text-sm uppercase tracking-widest rounded-xl hover:shadow-[0_0_24px_rgba(200,244,0,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-base">storefront</span>
            Weiter shoppen
          </Link>
          <Link
            href="/"
            className="px-8 py-4 border border-white/[0.08] text-[#8d9ba8] font-headline font-bold text-sm uppercase tracking-widest rounded-xl hover:border-white/20 hover:text-[#e8ecef] transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-base">home</span>
            Zur Startseite
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes popIn {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0b0d] flex items-center justify-center">
        <span className="material-symbols-outlined text-4xl text-[#c8f400] animate-spin">progress_activity</span>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
