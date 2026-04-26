"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import Link from "next/link";

const SESSION_KEY = "iod_session_v1";

type Step = "address" | "review" | "payment";

const SHIPPING_COST = 5.90;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<Step>("address");
  const [processing, setProcessing] = useState(false);

  // Address form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Schweiz");
  const [email, setEmail] = useState("");

  // Read session email
  useEffect(() => {
    try {
      const sess = JSON.parse(localStorage.getItem(SESSION_KEY) || "{}");
      if (sess.email && sess.email !== "gast@iod.ch") setEmail(sess.email);
    } catch {}
  }, []);

  // Guard: redirect if cart empty
  useEffect(() => {
    if (items.length === 0) router.push("/shop");
  }, [items, router]);

  const subtotal = parseFloat(totalPrice);
  const grandTotal = (subtotal + SHIPPING_COST).toFixed(2);

  const handleAddressSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStep("review");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = () => {
    setProcessing(true);
    const orderId = "IOD-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setTimeout(() => {
      // Save order to localStorage
      const order = {
        id: orderId,
        date: new Date().toISOString(),
        items,
        address: { firstName, lastName, street, zip, city, country, email },
        subtotal: subtotal.toFixed(2),
        shipping: SHIPPING_COST.toFixed(2),
        total: grandTotal,
      };
      try {
        const prev = JSON.parse(localStorage.getItem("iod_orders_v1") || "[]");
        localStorage.setItem("iod_orders_v1", JSON.stringify([order, ...prev]));
      } catch {}
      clearCart();
      router.push(`/order-confirmation?id=${orderId}`);
    }, 1800);
  };

  const steps: { id: Step; label: string; icon: string }[] = [
    { id: "address", label: "Adresse", icon: "location_on" },
    { id: "review", label: "Prüfen", icon: "receipt_long" },
    { id: "payment", label: "Zahlung", icon: "credit_card" },
  ];

  const stepIndex = (s: Step) => steps.findIndex((x) => x.id === s);

  return (
    <div className="min-h-screen bg-[#0a0b0d] pt-28 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back */}
        <Link href="/shop" className="flex items-center gap-2 text-[#8d9ba8] hover:text-[#c8f400] transition-colors font-headline font-bold text-xs uppercase tracking-widest mb-8 w-fit">
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Zurück zum Shop
        </Link>

        <h1 className="font-headline font-black text-4xl sm:text-5xl text-[#e8ecef] tracking-tighter mb-10">
          KASSE
        </h1>

        {/* Step Indicators */}
        <div className="flex items-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <button
                onClick={() => i < stepIndex(step) && setStep(s.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-headline font-black text-xs uppercase tracking-widest transition-all ${
                  s.id === step
                    ? "bg-[#c8f400] text-[#1a2000]"
                    : stepIndex(step) > i
                    ? "bg-[#c8f400]/20 text-[#c8f400] cursor-pointer hover:bg-[#c8f400]/30"
                    : "bg-[#111316] text-[#3e4c58] cursor-default"
                }`}
              >
                <span className="material-symbols-outlined text-sm">{s.icon}</span>
                {s.label}
              </button>
              {i < steps.length - 1 && (
                <span className={`material-symbols-outlined text-sm ${stepIndex(step) > i ? "text-[#c8f400]" : "text-[#1e2530]"}`}>
                  chevron_right
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Left: Active Step */}
          <div>
            {/* ─── STEP 1: ADDRESS ──────────────────────────────────────────── */}
            {step === "address" && (
              <form onSubmit={handleAddressSubmit} className="bg-[#111316] border border-white/[0.05] rounded-2xl p-6 sm:p-8 space-y-5">
                <h2 className="font-headline font-black uppercase tracking-widest text-base text-[#e8ecef] flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-[#c8f400]">location_on</span>
                  Lieferadresse
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="field-label">Vorname</label>
                    <input required value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="Max" className="field-input" />
                  </div>
                  <div>
                    <label className="field-label">Nachname</label>
                    <input required value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Muster" className="field-input" />
                  </div>
                </div>

                <div>
                  <label className="field-label">E-Mail</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="max@email.ch" className="field-input" />
                </div>

                <div>
                  <label className="field-label">Strasse & Hausnummer</label>
                  <input required value={street} onChange={e => setStreet(e.target.value)} placeholder="Musterstrasse 12" className="field-input" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="field-label">PLZ</label>
                    <input required value={zip} onChange={e => setZip(e.target.value)} placeholder="8001" className="field-input" />
                  </div>
                  <div>
                    <label className="field-label">Ort</label>
                    <input required value={city} onChange={e => setCity(e.target.value)} placeholder="Zürich" className="field-input" />
                  </div>
                </div>

                <div>
                  <label className="field-label">Land</label>
                  <select value={country} onChange={e => setCountry(e.target.value)} className="field-input">
                    <option>Schweiz</option>
                    <option>Deutschland</option>
                    <option>Österreich</option>
                    <option>Liechtenstein</option>
                  </select>
                </div>

                <button type="submit" className="w-full mt-4 py-4 bg-[#c8f400] text-[#1a2000] font-headline font-black text-sm uppercase tracking-widest rounded-xl hover:shadow-[0_0_24px_rgba(200,244,0,0.35)] transition-all active:scale-95 flex items-center justify-center gap-2">
                  Weiter zur Übersicht
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </form>
            )}

            {/* ─── STEP 2: REVIEW ───────────────────────────────────────────── */}
            {step === "review" && (
              <div className="bg-[#111316] border border-white/[0.05] rounded-2xl p-6 sm:p-8 space-y-6">
                <h2 className="font-headline font-black uppercase tracking-widest text-base text-[#e8ecef] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#c8f400]">receipt_long</span>
                  Bestellung prüfen
                </h2>

                {/* Delivery Address Summary */}
                <div className="bg-[#0d0f11] rounded-xl p-4 border border-white/[0.04]">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-headline font-black text-xs uppercase tracking-widest text-[#8d9ba8]">Lieferadresse</p>
                    <button onClick={() => setStep("address")} className="text-[#c8f400] font-headline font-bold text-xs uppercase hover:underline">Ändern</button>
                  </div>
                  <p className="text-[#e8ecef] text-sm">{firstName} {lastName}</p>
                  <p className="text-[#8d9ba8] text-sm">{street}, {zip} {city}, {country}</p>
                  <p className="text-[#8d9ba8] text-sm">{email}</p>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {items.map((item, i) => (
                    <div key={i} className="flex gap-4 bg-[#0d0f11] rounded-xl p-4 border border-white/[0.04]">
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-headline font-black text-sm text-[#e8ecef] uppercase">{item.product.name}</p>
                        <p className="text-[#8d9ba8] text-xs">Grösse: {item.sizeLabel} · Qty: {item.qty}</p>
                        <p className="font-headline font-black text-[#c8f400] text-sm mt-1">
                          {(parseFloat(item.product.price.replace(/[^0-9.]/g, "")) * item.qty).toFixed(2)} CHF
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setStep("payment")}
                  className="w-full py-4 bg-[#c8f400] text-[#1a2000] font-headline font-black text-sm uppercase tracking-widest rounded-xl hover:shadow-[0_0_24px_rgba(200,244,0,0.35)] transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Weiter zur Zahlung
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            )}

            {/* ─── STEP 3: PAYMENT ──────────────────────────────────────────── */}
            {step === "payment" && (
              <div className="bg-[#111316] border border-white/[0.05] rounded-2xl p-6 sm:p-8 space-y-6">
                <h2 className="font-headline font-black uppercase tracking-widest text-base text-[#e8ecef] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#c8f400]">credit_card</span>
                  Zahlung
                </h2>

                {/* Simulated payment method */}
                <div className="flex flex-col gap-3">
                  {[
                    { id: "card", label: "Kreditkarte", icon: "credit_card", note: "Visa, Mastercard, AMEX" },
                    { id: "twint", label: "TWINT", icon: "qr_code_2", note: "Schweizer Bezahl-App" },
                    { id: "invoice", label: "Rechnung", icon: "receipt", note: "+14 Tage Zahlungsziel" },
                  ].map((m) => (
                    <div key={m.id} className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${m.id === "card" ? "border-[#c8f400]/40 bg-[#c8f400]/5" : "border-white/[0.05] hover:border-white/10"}`}>
                      <span className={`material-symbols-outlined text-2xl ${m.id === "card" ? "text-[#c8f400]" : "text-[#8d9ba8]"}`}>{m.icon}</span>
                      <div>
                        <p className={`font-headline font-black text-sm uppercase tracking-wide ${m.id === "card" ? "text-[#c8f400]" : "text-[#e8ecef]"}`}>{m.label}</p>
                        <p className="text-[#8d9ba8] text-xs">{m.note}</p>
                      </div>
                      {m.id === "card" && (
                        <span className="ml-auto material-symbols-outlined text-[#c8f400] text-base">check_circle</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Card fields (simulated) */}
                <div className="space-y-4 bg-[#0d0f11] rounded-xl p-5 border border-white/[0.04]">
                  <div>
                    <label className="field-label">Karteninhaber</label>
                    <input defaultValue={`${firstName} ${lastName}`} className="field-input" placeholder="Max Muster" />
                  </div>
                  <div>
                    <label className="field-label">Kartennummer</label>
                    <input className="field-input" placeholder="•••• •••• •••• ••••" maxLength={19} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="field-label">Gültig bis</label>
                      <input className="field-input" placeholder="MM / JJ" maxLength={7} />
                    </div>
                    <div>
                      <label className="field-label">CVV</label>
                      <input className="field-input" placeholder="•••" maxLength={4} type="password" />
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-[#8d9ba8] text-xs">
                  <span className="material-symbols-outlined text-sm text-[#3e4c58] mt-0.5">lock</span>
                  Deine Daten werden SSL-verschlüsselt übertragen. Testzahlung — keine echte Transaktion.
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={processing}
                  className="w-full py-4 bg-[#c8f400] text-[#1a2000] font-headline font-black text-base uppercase tracking-widest rounded-xl hover:shadow-[0_0_28px_rgba(200,244,0,0.45)] transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <><span className="material-symbols-outlined text-lg animate-spin">progress_activity</span> Bestellung wird verarbeitet...</>
                  ) : (
                    <><span className="material-symbols-outlined text-lg">rocket_launch</span> Jetzt kaufen — {grandTotal} CHF</>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="lg:sticky lg:top-28 h-fit">
            <div className="bg-[#111316] border border-white/[0.05] rounded-2xl p-6 space-y-4">
              <h3 className="font-headline font-black uppercase tracking-widest text-xs text-[#8d9ba8] mb-4">
                Bestellübersicht
              </h3>
              {items.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-[#161a1e]">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-headline font-black text-xs text-[#e8ecef] uppercase truncate">{item.product.name}</p>
                    <p className="text-[#8d9ba8] text-[10px]">{item.sizeLabel} · ×{item.qty}</p>
                  </div>
                  <p className="font-headline font-black text-xs text-[#c8f400] whitespace-nowrap">
                    {(parseFloat(item.product.price.replace(/[^0-9.]/g, "")) * item.qty).toFixed(2)} CHF
                  </p>
                </div>
              ))}

              <div className="pt-4 border-t border-white/[0.05] space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#8d9ba8]">Zwischensumme</span>
                  <span className="text-[#e8ecef] font-headline font-bold">{subtotal.toFixed(2)} CHF</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#8d9ba8]">Versand (CH)</span>
                  <span className="text-[#e8ecef] font-headline font-bold">{SHIPPING_COST.toFixed(2)} CHF</span>
                </div>
                <div className="flex justify-between text-base pt-2 border-t border-white/[0.05]">
                  <span className="font-headline font-black text-[#e8ecef] uppercase tracking-wide">Total</span>
                  <span className="font-headline font-black text-[#c8f400] text-lg">{grandTotal} CHF</span>
                </div>
                <p className="text-[#3e4c58] text-[10px]">inkl. MwSt.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global field styles injected */}
      <style>{`
        .field-label {
          display: block;
          font-family: var(--font-headline, sans-serif);
          font-weight: 900;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #8d9ba8;
          margin-bottom: 6px;
        }
        .field-input {
          width: 100%;
          background: #0d0f11;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 12px 16px;
          color: #e8ecef;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }
        .field-input:focus {
          border-color: rgba(200,244,0,0.5);
        }
        .field-input::placeholder {
          color: #3e4c58;
        }
      `}</style>
    </div>
  );
}
