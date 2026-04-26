"use client";

import { useState } from "react";

export default function NewsletterForm({ newsletter }: { newsletter: any }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Ein Fehler ist aufgetreten.");
      } else {
        setStatus("success");
        setMessage(data.message || "Willkommen in der Crew! Du bist dabei.");
        setEmail("");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Es gab ein Problem. Bitte versuche es später noch einmal.");
    }
  };

  return (
    <div className="relative z-10 flex flex-col w-full md:w-auto gap-2">
      {status === "success" ? (
        <div className="bg-[#1a2000]/20 text-[#1a2000] px-6 py-3 rounded-full font-bold text-center">
          {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row w-full gap-2">
          <input
            id="newsletter-input"
            type="email"
            placeholder={newsletter.placeholder || "DEINE EMAIL"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            required
            className="bg-[#1a2000]/15 border-none rounded-full px-6 py-3 w-full md:w-72 placeholder:text-[#1a2000]/50 text-[#1a2000] font-medium focus:outline-none focus:ring-2 focus:ring-[#1a2000]/40 disabled:opacity-50"
            aria-label="E-Mail Adresse"
          />
          <button 
            id="newsletter-submit" 
            type="submit"
            disabled={status === "loading" || !email}
            className="btn-kinetic-primary !bg-[#1a2000] !text-[#c8f400] px-8 py-3 text-sm whitespace-nowrap disabled:opacity-50"
          >
            {status === "loading" ? "LÄDT..." : (newsletter.buttonText || "ICH BIN DABEI")}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="text-[#1a2000] text-xs font-medium mt-1 ml-2">{message}</p>
      )}
    </div>
  );
}
