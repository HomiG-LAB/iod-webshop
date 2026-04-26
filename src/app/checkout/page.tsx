"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";
import Link from "next/link";
import { useSession } from "next-auth/react";

type Step = "address" | "review" | "payment";

const SHIPPING_COST = 5.90;

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<Step>("address");
  const [processing, setProcessing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("card");

  // Address form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("Schweiz");
  const [email, setEmail] = useState("");

  // Auto-fill user data from NextAuth session
  useEffect(() => {
    if (session?.user) {
      if (session.user.email) setEmail(session.user.email);
      if (session.user.name) {
        const parts = session.user.name.split(" ");
        setFirstName(parts[0] || "");
        setLastName(parts.slice(1).join(" ") || "");
      }
    }
  }, [session]);

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

  const handlePlaceOrder = async () => {
    setProcessing(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          customerEmail: email,
          shippingAddress: { firstName, lastName, street, zipCode: zip, city, country }
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("No checkout URL returned:", data);
        setProcessing(false);
      }
    } catch (err) {
      console.error("Error starting checkout:", err);
      setProcessing(false);
    }
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
        <Link href="/shop" className="flex items-center gap-2 text-[#8d9ba8] hover:text-[#c8f400] transition-colors font-headline font-bold text-xs uppercase tracking-widest mb-8 w-fit group">
          <span className="material-symbols-outlined text-base group-hover:-translate-x-1 transition-transform">arrow_back</span>
          Zurück zum Shop
        </Link>

        <h1 className="font-headline font-black text-4xl sm:text-5xl text-[#e8ecef] tracking-tighter mb-10">
          KASSE
        </h1>

        {/* Step Indicators */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => i < stepIndex(step) && setStep(s.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-headline font-black text-xs uppercase tracking-widest transition-all duration-300 ${
                  s.id === step
                    ? "bg-[#c8f400] text-[#1a2000] shadow-[0_0_20px_rgba(200,244,0,0.2)] scale-105"
                    : stepIndex(step) > i
                    ? "bg-[#c8f400]/10 text-[#c8f400] border border-[#c8f400]/30 cursor-pointer hover:bg-[#c8f400]/20"
                    : "bg-[#111316] text-[#3e4c58] border border-white/[0.05] cursor-default"
                }`}
              >
                <span className="material-symbols-outlined text-sm">{s.icon}</span>
                {s.label}
              </button>
              {i < steps.length - 1 && (
                <span className={`material-symbols-outlined text-sm transition-colors duration-300 ${stepIndex(step) > i ? "text-[#c8f400]" : "text-[#1e2530]"}`}>
                  chevron_right
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* Left: Active Step */}
          <div className="relative">
            {/* ─── STEP 1: ADDRESS ──────────────────────────────────────────── */}
            {step === "address" && (
              <form onSubmit={handleAddressSubmit} className="step-content bg-[#111316]/80 backdrop-blur-xl border border-white/[0.05] rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl">
                <h2 className="font-headline font-black uppercase tracking-widest text-lg text-[#e8ecef] flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 rounded-full bg-[#c8f400]/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#c8f400] text-sm">location_on</span>
                  </div>
                  Lieferadresse
                </h2>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="relative group">
                    <input id="firstName" required value={firstName} onChange={e => setFirstName(e.target.value)} placeholder=" " className="field-input peer" />
                    <label htmlFor="firstName" className="field-label-floating">Vorname</label>
                  </div>
                  <div className="relative group">
                    <input id="lastName" required value={lastName} onChange={e => setLastName(e.target.value)} placeholder=" " className="field-input peer" />
                    <label htmlFor="lastName" className="field-label-floating">Nachname</label>
                  </div>
                </div>

                <div className="relative group">
                  <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder=" " className="field-input peer" />
                  <label htmlFor="email" className="field-label-floating">E-Mail</label>
                </div>

                <div className="relative group">
                  <input id="street" required value={street} onChange={e => setStreet(e.target.value)} placeholder=" " className="field-input peer" />
                  <label htmlFor="street" className="field-label-floating">Strasse & Hausnummer</label>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="relative group">
                    <input id="zip" required value={zip} onChange={e => setZip(e.target.value)} placeholder=" " className="field-input peer" />
                    <label htmlFor="zip" className="field-label-floating">PLZ</label>
                  </div>
                  <div className="relative group">
                    <input id="city" required value={city} onChange={e => setCity(e.target.value)} placeholder=" " className="field-input peer" />
                    <label htmlFor="city" className="field-label-floating">Ort</label>
                  </div>
                </div>

                <div className="relative group">
                  <select id="country" value={country} onChange={e => setCountry(e.target.value)} className="field-input peer text-[#e8ecef] appearance-none">
                    <option value="Schweiz">Schweiz</option>
                    <option value="Deutschland">Deutschland</option>
                    <option value="Österreich">Österreich</option>
                    <option value="Liechtenstein">Liechtenstein</option>
                  </select>
                  <label htmlFor="country" className="field-label-floating opacity-100 -translate-y-3 scale-75 text-[#c8f400]">Land</label>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#8d9ba8] pointer-events-none">expand_more</span>
                </div>

                <button type="submit" className="w-full mt-6 py-4 bg-[#c8f400] text-[#1a2000] font-headline font-black text-sm uppercase tracking-widest rounded-xl hover:shadow-[0_0_30px_rgba(200,244,0,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2">
                  Weiter zur Übersicht
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </form>
            )}

            {/* ─── STEP 2: REVIEW ───────────────────────────────────────────── */}
            {step === "review" && (
              <div className="step-content bg-[#111316]/80 backdrop-blur-xl border border-white/[0.05] rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl">
                <h2 className="font-headline font-black uppercase tracking-widest text-lg text-[#e8ecef] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#c8f400]/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#c8f400] text-sm">receipt_long</span>
                  </div>
                  Bestellung prüfen
                </h2>

                {/* Delivery Address Summary */}
                <div className="bg-gradient-to-br from-[#0d0f11] to-[#111316] rounded-2xl p-5 sm:p-6 border border-white/[0.04] relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#c8f400]"></div>
                  <div className="flex justify-between items-start mb-3">
                    <p className="font-headline font-black text-xs uppercase tracking-widest text-[#8d9ba8]">Lieferadresse</p>
                    <button onClick={() => setStep("address")} className="text-[#c8f400] font-headline font-bold text-xs uppercase hover:underline flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-sm">edit</span> Ändern
                    </button>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[#e8ecef] text-base font-bold">{firstName} {lastName}</p>
                    <p className="text-[#8d9ba8] text-sm">{street}</p>
                    <p className="text-[#8d9ba8] text-sm">{zip} {city}, {country}</p>
                    <p className="text-[#8d9ba8] text-sm mt-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">mail</span>
                      {email}
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-4">
                  <h3 className="font-headline font-black uppercase tracking-widest text-xs text-[#8d9ba8]">Artikel</h3>
                  {items.map((item, i) => (
                    <div key={i} className="flex gap-4 bg-[#0d0f11] rounded-2xl p-4 border border-white/[0.04] items-center hover:border-white/[0.1] transition-colors">
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#161a1e]">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-headline font-black text-sm text-[#e8ecef] uppercase">{item.product.name}</p>
                        <p className="text-[#8d9ba8] text-xs mt-1">Grösse: <span className="text-[#e8ecef]">{item.sizeLabel}</span> · Menge: <span className="text-[#e8ecef]">{item.qty}</span></p>
                      </div>
                      <div className="text-right">
                        <p className="font-headline font-black text-[#c8f400] text-lg">
                          {(parseFloat(item.product.price.replace(/[^0-9.]/g, "")) * item.qty).toFixed(2)} CHF
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setStep("payment")}
                  className="w-full py-4 bg-[#c8f400] text-[#1a2000] font-headline font-black text-sm uppercase tracking-widest rounded-xl hover:shadow-[0_0_30px_rgba(200,244,0,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 mt-4"
                >
                  Weiter zur Zahlung
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            )}

            {/* ─── STEP 3: PAYMENT ──────────────────────────────────────────── */}
            {step === "payment" && (
              <div className="step-content bg-[#111316]/80 backdrop-blur-xl border border-white/[0.05] rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl">
                <h2 className="font-headline font-black uppercase tracking-widest text-lg text-[#e8ecef] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#c8f400]/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#c8f400] text-sm">credit_card</span>
                  </div>
                  Zahlungsmittel wählen
                </h2>

                {/* Interactive Payment Methods */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "card", label: "Kreditkarte", icon: "credit_card" },
                    { id: "twint", label: "TWINT", icon: "qr_code_2" },
                    { id: "invoice", label: "Rechnung", icon: "receipt" },
                  ].map((m) => (
                    <div 
                      key={m.id} 
                      onClick={() => setSelectedPayment(m.id)}
                      className={`flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                        selectedPayment === m.id 
                          ? "border-[#c8f400] bg-[#c8f400]/5 shadow-[0_0_15px_rgba(200,244,0,0.15)] scale-105 z-10" 
                          : "border-white/[0.05] bg-[#0d0f11] hover:border-white/20 hover:bg-white/[0.02]"
                      }`}
                    >
                      <span className={`material-symbols-outlined text-3xl transition-colors duration-300 ${selectedPayment === m.id ? "text-[#c8f400]" : "text-[#8d9ba8]"}`}>{m.icon}</span>
                      <p className={`font-headline font-black text-xs uppercase tracking-widest transition-colors duration-300 ${selectedPayment === m.id ? "text-[#c8f400]" : "text-[#e8ecef]"}`}>{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* Card details (shows only if card is selected) */}
                <div className={`transition-all duration-500 overflow-hidden ${selectedPayment === "card" ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="space-y-5 bg-[#0d0f11] rounded-2xl p-6 border border-white/[0.04]">
                    <div className="relative group">
                      <input id="cardName" defaultValue={`${firstName} ${lastName}`} placeholder=" " className="field-input peer" />
                      <label htmlFor="cardName" className="field-label-floating">Karteninhaber</label>
                    </div>
                    <div className="relative group">
                      <input id="cardNumber" placeholder=" " maxLength={19} className="field-input peer font-mono tracking-widest" />
                      <label htmlFor="cardNumber" className="field-label-floating">Kartennummer</label>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                        <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold">VISA</div>
                        <div className="w-8 h-5 bg-white/10 rounded flex items-center justify-center text-[8px] font-bold">MC</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div className="relative group">
                        <input id="expiry" placeholder=" " maxLength={7} className="field-input peer font-mono tracking-widest" />
                        <label htmlFor="expiry" className="field-label-floating">Gültig bis (MM/JJ)</label>
                      </div>
                      <div className="relative group">
                        <input id="cvv" placeholder=" " maxLength={4} type="password" className="field-input peer font-mono tracking-widest" />
                        <label htmlFor="cvv" className="field-label-floating">CVV</label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* TWINT or Invoice messaging */}
                <div className={`transition-all duration-500 overflow-hidden ${selectedPayment !== "card" ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="bg-[#0d0f11] rounded-2xl p-6 border border-white/[0.04] flex items-center gap-4 text-[#8d9ba8]">
                    <span className="material-symbols-outlined text-3xl text-[#00c8f0]">{selectedPayment === "twint" ? "qr_code_scanner" : "mark_email_read"}</span>
                    <p className="text-sm">
                      {selectedPayment === "twint" 
                        ? "Du wirst im nächsten Schritt zur TWINT App weitergeleitet, um die Zahlung sicher freizugeben."
                        : "Du erhältst die Rechnung bequem per E-Mail nach Abschluss der Bestellung mit einem Zahlungsziel von 14 Tagen."}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[#8d9ba8] text-xs bg-[#c8f400]/5 border border-[#c8f400]/20 p-4 rounded-xl">
                  <span className="material-symbols-outlined text-lg text-[#c8f400]">lock</span>
                  <p>Deine Daten werden 256-bit SSL-verschlüsselt übertragen. Dies ist eine Demo-Umgebung, es werden keine echten Zahlungen verarbeitet.</p>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  disabled={processing}
                  className="w-full py-5 bg-[#c8f400] text-[#1a2000] font-headline font-black text-base uppercase tracking-widest rounded-xl hover:shadow-[0_0_40px_rgba(200,244,0,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-3 relative overflow-hidden"
                >
                  {processing ? (
                    <><span className="material-symbols-outlined text-xl animate-spin">progress_activity</span> Bestellung wird verarbeitet...</>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-xl">rocket_launch</span> 
                      Jetzt kaufen — {grandTotal} CHF
                      <div className="absolute inset-0 bg-white/20 w-full translate-x-[-100%] skew-x-[-15deg] animate-[shimmer_2.5s_infinite]"></div>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="lg:sticky lg:top-32 h-fit">
            <div className="bg-[#111316]/90 backdrop-blur-xl border border-white/[0.05] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <h3 className="font-headline font-black uppercase tracking-widest text-sm text-[#e8ecef] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#8d9ba8] text-sm">shopping_bag</span>
                Deine Bestellung
              </h3>
              
              <div className="max-h-[40vh] overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {items.map((item, i) => (
                  <div key={i} className="flex gap-3 items-center group">
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-[#161a1e] border border-white/[0.05] group-hover:border-white/20 transition-colors">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-headline font-black text-xs text-[#e8ecef] uppercase truncate">{item.product.name}</p>
                      <p className="text-[#8d9ba8] text-[10px] uppercase tracking-wider">{item.sizeLabel} · QTY: {item.qty}</p>
                    </div>
                    <p className="font-headline font-black text-xs text-[#c8f400] whitespace-nowrap">
                      {(parseFloat(item.product.price.replace(/[^0-9.]/g, "")) * item.qty).toFixed(2)} CHF
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/[0.05] space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#8d9ba8]">Zwischensumme</span>
                  <span className="text-[#e8ecef] font-headline font-bold">{subtotal.toFixed(2)} CHF</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#8d9ba8]">Standardversand</span>
                  <span className="text-[#e8ecef] font-headline font-bold">{SHIPPING_COST.toFixed(2)} CHF</span>
                </div>
                
                <div className="mt-4 p-4 bg-[#c8f400]/5 border border-[#c8f400]/20 rounded-xl relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-16 h-16 bg-[#c8f400]/10 rounded-full blur-xl"></div>
                  <div className="flex justify-between items-end relative z-10">
                    <div className="space-y-1">
                      <span className="font-headline font-black text-[#e8ecef] uppercase tracking-widest text-xs">Total</span>
                      <p className="text-[#8d9ba8] text-[10px]">inkl. MwSt.</p>
                    </div>
                    <span className="font-headline font-black text-[#c8f400] text-2xl">{grandTotal} CHF</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global CSS for Animations and Floating Labels */}
      <style>{`
        @keyframes fadeInSlideUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%) skew-x(-15deg); }
        }
        .step-content {
          animation: fadeInSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        /* Modern Floating Label Inputs */
        .field-input {
          width: 100%;
          background: #0d0f11;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 20px 16px 8px 16px;
          color: #e8ecef;
          font-size: 15px;
          outline: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .field-input:focus, .field-input:not(:placeholder-shown) {
          border-color: rgba(200,244,0,0.5);
          background: #111316;
          box-shadow: 0 0 0 4px rgba(200,244,0,0.05);
        }
        .field-label-floating {
          position: absolute;
          left: 16px;
          top: 14px;
          font-family: var(--font-headline, sans-serif);
          font-weight: 900;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #8d9ba8;
          pointer-events: none;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          transform-origin: left top;
        }
        .field-input:focus ~ .field-label-floating,
        .field-input:not(:placeholder-shown) ~ .field-label-floating {
          top: 8px;
          font-size: 9px;
          color: #c8f400;
          letter-spacing: 0.1em;
        }
      `}</style>
    </div>
  );
}
