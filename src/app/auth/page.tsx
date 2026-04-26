"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

export default function AuthPage() {
  const router = useRouter();
  const { status } = useSession();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/checkout");
    }
  }, [status, router]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("E-Mail oder Passwort ist falsch.");
        setLoading(false);
      } else {
        router.push("/checkout");
        router.refresh();
      }
    } catch (err) {
      setError("Ein Fehler ist aufgetreten.");
      setLoading(false);
    }
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const registerRes = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await registerRes.json();

      if (!registerRes.ok) {
        setError(data.error || "Registrierung fehlgeschlagen.");
        setLoading(false);
        return;
      }

      // If registration is successful, log them in automatically
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Konto erstellt, aber Anmeldung fehlgeschlagen.");
        setLoading(false);
      } else {
        router.push("/checkout");
        router.refresh();
      }
    } catch (err) {
      setError("Ein Fehler ist aufgetreten.");
      setLoading(false);
    }
  };

  const handleGuest = () => {
    // In a real app with next-auth, guest checkout might just redirect to checkout
    // without saving a session, or use an anonymous session.
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-[#0a0b0d] flex items-center justify-center px-4 pt-24 pb-16">
      <div className="w-full max-w-md">
        {/* Logo / Back */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/shop" className="flex items-center gap-2 text-[#8d9ba8] hover:text-[#c8f400] transition-colors font-headline font-bold text-xs uppercase tracking-widest">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Zurück zum Shop
          </Link>
          <img src="/logo-iod.png" alt="IOD" className="h-10 w-auto object-contain" />
        </div>

        {/* Card */}
        <div className="bg-[#111316] border border-white/[0.06] rounded-3xl p-8 shadow-2xl">
          {/* Tabs */}
          <div className="flex bg-[#0d0f11] rounded-xl p-1 mb-8">
            {(["login", "register"] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(""); }}
                className={`flex-1 py-2.5 rounded-lg font-headline font-black text-xs uppercase tracking-widest transition-all duration-200 ${
                  tab === t
                    ? "bg-[#c8f400] text-[#1a2000]"
                    : "text-[#8d9ba8] hover:text-[#e8ecef]"
                }`}
              >
                {t === "login" ? "Anmelden" : "Registrieren"}
              </button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 flex items-center gap-2 bg-[#ff56ed]/10 border border-[#ff56ed]/30 text-[#ff56ed] px-4 py-3 rounded-xl text-sm font-headline font-bold">
              <span className="material-symbols-outlined text-base">error</span>
              {error}
            </div>
          )}

          {/* Login Form */}
          {tab === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block font-headline font-black text-[10px] uppercase tracking-widest text-[#8d9ba8] mb-1.5">
                  E-Mail
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="deine@email.ch"
                  className="w-full bg-[#0d0f11] border border-white/[0.08] rounded-xl px-4 py-3 text-[#e8ecef] text-sm placeholder:text-[#3e4c58] focus:outline-none focus:border-[#c8f400]/50 transition-colors"
                />
              </div>
              <div>
                <label className="block font-headline font-black text-[10px] uppercase tracking-widest text-[#8d9ba8] mb-1.5">
                  Passwort
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0d0f11] border border-white/[0.08] rounded-xl px-4 py-3 text-[#e8ecef] text-sm placeholder:text-[#3e4c58] focus:outline-none focus:border-[#c8f400]/50 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#c8f400] text-[#1a2000] font-headline font-black text-sm uppercase tracking-widest rounded-xl hover:shadow-[0_0_24px_rgba(200,244,0,0.35)] transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><span className="material-symbols-outlined text-base animate-spin">progress_activity</span> Laden...</>
                ) : "Anmelden & zur Kasse"}
              </button>
            </form>
          )}

          {/* Register Form */}
          {tab === "register" && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block font-headline font-black text-[10px] uppercase tracking-widest text-[#8d9ba8] mb-1.5">
                  Dein Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Max Muster"
                  className="w-full bg-[#0d0f11] border border-white/[0.08] rounded-xl px-4 py-3 text-[#e8ecef] text-sm placeholder:text-[#3e4c58] focus:outline-none focus:border-[#c8f400]/50 transition-colors"
                />
              </div>
              <div>
                <label className="block font-headline font-black text-[10px] uppercase tracking-widest text-[#8d9ba8] mb-1.5">
                  E-Mail
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="deine@email.ch"
                  className="w-full bg-[#0d0f11] border border-white/[0.08] rounded-xl px-4 py-3 text-[#e8ecef] text-sm placeholder:text-[#3e4c58] focus:outline-none focus:border-[#c8f400]/50 transition-colors"
                />
              </div>
              <div>
                <label className="block font-headline font-black text-[10px] uppercase tracking-widest text-[#8d9ba8] mb-1.5">
                  Passwort
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="min. 6 Zeichen"
                  className="w-full bg-[#0d0f11] border border-white/[0.08] rounded-xl px-4 py-3 text-[#e8ecef] text-sm placeholder:text-[#3e4c58] focus:outline-none focus:border-[#c8f400]/50 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#c8f400] text-[#1a2000] font-headline font-black text-sm uppercase tracking-widest rounded-xl hover:shadow-[0_0_24px_rgba(200,244,0,0.35)] transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><span className="material-symbols-outlined text-base animate-spin">progress_activity</span> Laden...</>
                ) : "Konto erstellen & zur Kasse"}
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-[#3e4c58] text-xs font-headline uppercase tracking-widest">oder</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* Guest Checkout */}
          <button
            onClick={handleGuest}
            className="w-full py-3.5 border border-white/[0.08] text-[#8d9ba8] font-headline font-bold text-sm uppercase tracking-widest rounded-xl hover:border-white/20 hover:text-[#e8ecef] transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-base">person_outline</span>
            Als Gast fortfahren
          </button>

          <p className="mt-6 text-center text-[#3e4c58] text-xs leading-relaxed">
            Durch das Fortfahren stimmst du unseren{" "}
            <a href="#" className="underline hover:text-[#8d9ba8]">AGB</a>{" "}
            und der{" "}
            <a href="#" className="underline hover:text-[#8d9ba8]">Datenschutzerklärung</a> zu.
          </p>
        </div>
      </div>
    </div>
  );
}
