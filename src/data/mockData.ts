// ─────────────────────────────────────────────────────────────────────────────
// IOD Webshop — Mock Data Layer
// Skin: "Kinetic Asphalt" — Dark concrete base, neon accents
// Inspired by: Monster Track Edition, Ronaldo x IOD GOAT, Nur Stoff Nur Flow,
//              IOD Action Lookbook: Der pure Flow
// ─────────────────────────────────────────────────────────────────────────────

// ─── NAVIGATION ──────────────────────────────────────────────────────────────
export const navLinks = [
  { label: "Shop", href: "#shop" },
  { label: "Designs", href: "#showcase" },
  { label: "Grössen", href: "#sizes" },
  { label: "Story", href: "#story" },
];

// ─── HERO ─────────────────────────────────────────────────────────────────────
export const heroData = {
  tagline: "KEIN POLSTER. NUR FLOW.",
  headlineLine1: "Second skin.",
  headlineLine2: "But with a statement.",
  subTagline: "Der Ellbogenschuetzer, der sich anfuehlt wie nichts — und trotzdem alles sagt. Hauchduenn, elastisch, komplett bedruckbar. Fuer alle, die auf dem Pumptrack ihre eigene Linie fahren.",
  cta1: "JETZT BESTELLEN",
  cta2: "MEHR ERFAHREN",
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA014PgZ-2zmS3vXq8GhfQFnKbBDrXzk-m3O-bMBjK82Z732GjIY-WMmijKxq0kmQ9ohNGvhAXYOs_ThfpzVeDkFZImHySobBXVUR38gNvXHI_xIIZsI_pXwneEpMVYJy_pkvVK62QFl-ekDqtwI1MvQLGX69DZI5l-Mgpvy7I7fSN6fDKvfk3rtqdLoOoyt3eNl8iatHgNTd1nhZuytCfb91niXV1re0-H-PYZzV31SVd3y6FmYujjMqcADBLnvyC9yfR4ZjEqHfY",
  alt: "Kind auf Pumptrack mit IOD Neon-Ellenbogen-Sleeves",
};

// ─── TECH SPECS — "Second Skin" cards (from Nur Stoff + Monster Track) ───────
export const techSpecsData = [
  {
    icon: "air",
    title: "AERO-MESH VENT",
    description:
      "Strategische Belüftungszonen atmen so hart wie du reitest. Kein schwitziger Arm – nur frischer Wind.",
  },
  {
    icon: "sports_gymnastics",
    title: "FLOWFLEX WEAVE",
    description:
      "Zero-Restriction-Bewegung. Es bewegt sich mit deinen Muskeln, nicht dagegen. Pure fluide Agilität.",
  },
  {
    icon: "recycling",
    title: "RECYCLED SOUL",
    description:
      "100 % aus recycelten High-Tech-Fasern. Den Planeten retten, während du den Asphalt zerstörst.",
  },
  {
    icon: "security",
    title: "PRECISION ANCHORS",
    description:
      "Silikon-Gripbänder halten den Monster Track exakt dort, wo du ihn platzierst – egal wie viel Air.",
  },
];

// ─── MONSTER TRACK SHOWCASE — featured design ────────────────────────────────
export const showcaseData = {
  badge: "NEW DROP",
  title: "MONSTER TRACK",
  subtitle: "EDITION",
  tagline: "PURE FLOW. NO RULES.",
  description:
    "Der Sleeve, der sich anfühlt wie eine zweite Haut. Designed für den Betonurwald und die Dirtracks, auf denen Legenden geboren werden.",
  ctaShop: "ADD TO CART — 34,99 €",
  ctaDetails: "ALLE DETAILS",
  price: "34,99 €",
  priceNote: "* inkl. MwSt., zzgl. Versandkosten",
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBme__7JPNhkpmbE7MY40lWOc17gIGXMdjR1iNTczM4MJwXtlg7RkZMct3XqRzodb4uOSOoheXInTYxk4LFaOK21pmF140ENeb1gmnlPQsvmfEzuk_5oWHL8u6ZbdeJEz4K-jVZ2N3gXnROeSQybY6oMJHIoKJdUTFiWPXpsPVw_DpugDHB3T00RefrWb9pdWja82rfs5YWLtzcOJ7MojnEMWl9HSs_4OJ3C8zKhrk1QCYF0Anpu2hzU3rIFs6M2MGY7GekmrYKc9Y",
  alt: "Monster Track Edition Sleeve auf Kinderarm am Pumptrack",
  colorways: ["#7c3aed", "#22d3ee", "#a3e635", "#f43f5e"],
};

// ─── COLLABS — Pro Rider x IOD GOAT Collection ─────────────────────────────────
export const collabData = {
  badge: "SPECIAL EDITION",
  artist: "PRO RIDER × IOD",
  title: "THE GOAT",
  subtitle: "COLLECTION",
  description:
    "Vier legendary Designs. Ein Ziel: den Pumptrack dominieren. Neon-Gold auf Schwarz, Signature-Street-Grafiken und GOAT-Badge-Bubble-Letters. Limitiert.",
  designs: [
    {
      id: "sui-vibe",
      name: "SUI-VIBE",
      description: "Schwarzes Fabric, riesiges Neon-Gold Logo + weisse Splats.",
      badge: "SOLD OUT",
      badgeColor: "tertiary",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuADOdrlwYGFsSUw0mrdqsJIPwBjGh6Y8bzCiPv31gtoxbEZWsVmNKFQPxz26wIEeDaacfIqP9NPibY2z2fVHA_pYgCenJfrfpLIPp_Lf1FwB8LyHR3dQdTW3WkXwBsmjBRmuNxmLRzeBRjq9wsgPl12hUlvMLilhfYjHpoI7hWYwX3zwAVOWG12h4cbVagehJyKzabQ5WzPvJNWi9MP3PUX1hy1yxc2rDqvOoUeugc-2Yz01PpATzrNSb70aVX77ez6qGfLDmcVX8E",
    },
    {
      id: "pro-street",
      name: "PRO STREET",
      description: "Dunkelgrau, Neon-Lime Nr. 7 + Graffiti-Silhouette.",
      badge: "5 LEFT",
      badgeColor: "primary",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDGN6Ukr97pXLSXTqN8kVfI2D802hs-bxTDOCFYu3YeUTiDdAoNVvyQAXYIkRIKbiqbOSGlxlNmCj1neNTMQojet_ZIcKGSRBqAexIXuld5Vji1NUFQZ0_T9y7aYfIqUGBkvH8T2I6K043RyU0UoCNDBzhFm1zaI70NiEmmg9Hul81ux6ik0c6aN40MedSGZIGXlhuF03Ar4dQFzP8u2FTcZJSRm19HxEMCSufOSe0Drj3KlZziCZQXhZ1ySYb0Wl4zrnyJd9Gwjhw",
    },
    {
      id: "goat-mask",
      name: "GOAT MASK",
      description: "Weisses Knit, Gold-Kronen-Doodle + GOAT in Bubble-Schrift.",
      badge: "HOT",
      badgeColor: "secondary",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBWEoCeOA2KWzf1hps8DYpLdfOIe5MrHenR5LLhNKR-eibADaJaAspHwIBlikdE_CtOsaSVyXfHW3BortRLm0Tp2Dg86qK3C5ojyZaVVRgVda2sS0mlmI8r6T5Ow9tl8hsC4sFbBOXDYLCSZ3lUy8yCN90-Lci4U3Yptxyc2QG2Qta9bqY7JG7zCB2oTP_lNYKcNlxM2ssHVY-LD4XcqYwVAPTjJ_e8kU9ZKPjFxFkR8Jw9pTzghvDB7zgzQxWx6fO8B58i3FW80U8",
    },
    {
      id: "victory-lap",
      name: "VICTORY LAP",
      description: "Deep Purple + Neon-Cyan Motion-Streaks und das IOD-Logo.",
      badge: "NEW",
      badgeColor: "primary",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDuTC-7YRcxp6_8Mxzp2hLfP5KnTI2D802hs-bxTDOCFYu3YeUTiDdAoNVvyQAXYIkRIKbiqbOSGlxlNmCj1neNT",
    },
  ],
};

// ─── ACTION LOOKBOOK — "Der pure Flow" photo editorial ───────────────────────
export const lookbookData = {
  badge: "IN AKTION",
  title: "DER PURE FLOW.",
  description:
    "Nicht nur Schutz. Ein Statement. Sieh, wie IOD Sleeves auf dem Track, in der Graffiti-Zone und überall dazwischen getragen werden.",
  ctaLabel: "ALLE STYLES ENTDECKEN",
  shots: [
    {
      id: 1,
      image: "/lookbook_pumptrack_v2_1777206340949.png",
      caption: "Asphalt & Lime",
      tag: "PUMPTRACK",
    },
    {
      id: 2,
      image: "/lookbook_style_1777205737529.png",
      caption: "Cyber Splat im Flow",
      tag: "STYLE",
    },
    {
      id: 3,
      image: "/lookbook_action_v2_1777206355478.png",
      caption: "Neon im Staub",
      tag: "ACTION",
    },
  ],
};

// ─── NEWSLETTER ───────────────────────────────────────────────────────────────
export const newsletterData = {
  title: "JOIN THE CREW",
  description: "Exklusiver Zugang zu Drops, Pro-Tipps vom Track und einer Community aus Rebellen.",
  placeholder: "deine@rebel-mail.de",
  buttonText: "REINGEHEN",
};

// ─── USP — Produkt Infos ──────────────────────────────────────────────────────
export const uspData = {
  eyebrow: "WARUM IOD",
  title: "Kein Klotz.\nKein Kompromiss.",
  description:
    "Das IOD sitzt so nah am Arm, dass du vergisst, dass du ueberhaupt Schutz traegst. Keine Polster, kein Klotz -- ein hauchduenner Sleeve mit integriertem Ellbogenpad und deinem Design drauf. Fuer alle ab Kids- bis Erwachsenengroesse.",
  points: [
    {
      icon: "fitbit",
      title: "Second-Skin Passform",
      description: "4-Way Stretch, bewegt sich mit dir -- kein Einschneiden, kein Verrutschen.",
    },
    {
      icon: "palette",
      title: "Full-Print Sublimation",
      description: "Keine Farbbeschraenkung, kein Verblassen. Dein Design in maximaler Schaerfe.",
    },
    {
      icon: "shield",
      title: "Ultradunner Ellbogenpad",
      description: "Flach anliegend, exakt wo es zaehlt. Schutz ohne Volumen.",
    },
    {
      icon: "public",
      title: "Made in Switzerland",
      description: "Qualitaet, die man spuert. Produziert nach Schweizer Standards.",
    },
    {
      icon: "eco",
      title: "0% Plastik",
      description: "100% Textil. Wir setzen auf nachhaltige Materialien und lokale Prozesse.",
    },
  ],
};

// ─── STORY — Founder Section ──────────────────────────────────────────────────
export const storyData = {
  eyebrow: "UNSERE STORY",
  title: "Ein Startup.\nEine Familie.\nEin Ziel.",
  body: "Wir haben IOD gegruendet, weil wir glauben: Unternehmertum lernt man nicht aus Buechern -- sondern indem man einfach anfaengt. Der Gewinn geht in Bildung. Das Produkt kommt aus der Schweiz.",
  ctaLabel: "MEHR UEBER UNS",
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export const faqData = [
  {
    q: "Fuer wen sind die IOD Sleeves geeignet?",
    a: "Fuer alle! Wir haben Groessen ab Kids bis Erwachsene. Schau dir unsere Groessentabelle an -- und falls du unsicher bist, empfehlen wir eine Groesse groesser.",
  },
  {
    q: "Was unterscheidet IOD von normalen Ellbogenschuetzern?",
    a: "Kein Plastik, kein Klettverschluss, kein Bulk. Unser Sleeve sitzt wie eine zweite Haut, schuetzt durch High-Tech-Fasern und sieht dabei besser aus als alles andere auf dem Track.",
  },
  {
    q: "Kann ich ein eigenes Design drucken lassen?",
    a: "Ja! Full-Print Sublimation bedeutet: keine Farbbeschraenkung, kein Verblassen. Kontaktier uns fuer Custom Orders.",
  },
  {
    q: "Wie wasche ich die Sleeves?",
    a: "Einfach in die Maschine bei 30 Grad. Die Farben bleiben knallig, der Sitz bleibt perfekt.",
  },
  {
    q: "Wohin geht der Gewinn?",
    a: "In Bildung. Wir sind ein Startup mit Mission -- ein Teil des Gewinns fliesst direkt in Lernprojekte fuer junge Menschen.",
  },
];


// Legacy exports for backwards compatibility
export const benefitsData = {
  main: {
    icon: "eco",
    title: "NO PADDING,<br/>JUST FLOW.",
    description:
      "Unser proprietäres Textile-Only-Gewebe schützt die Haut vor Asphalt-Abrieb ohne den Bulk von Plastikschalen.",
    cta: "DIE TECHNIK ENTDECKEN",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBWEoCeOA2KWzf1hps8DYpLdfOIe5MrHenR5LLhNKR-eibADaJaAspHwIBlikdE_CtOsaSVyXfHW3BortRLm0Tp2Dg86qK3C5ojyZaVVRgVda2sS0mlmI8r6T5Ow9tl8hsC4sFbBOXDYLCSZ3lUy8yCN90-Lci4U3Yptxyc2QG2Qta9bqY7JG7zCB2oTP_lNYKcNlxM2ssHVY-LD4XcqYwVAPTjJ_e8kU9ZKPjFxFkR8Jw9pTzghvDB7zgzQxWx6fO8B58i3FW80U8",
  },
  card1: { icon: "wash", title: "MESS PROOF", description: "Toss them in the wash." },
  card2: { icon: "child_care", title: "5-10 JAHRE", description: "Engineered for the growth spurt." },
  newsletter: newsletterData,
};

export const productsData = [
  {
    id: 1,
    name: "Monster Track",
    price: "34,99 €",
    badge: "TRENDING",
    badgeType: "primary",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuADOdrlwYGFsSUw0mrdqsJIPwBjGh6Y8bzCiPv31gtoxbEZWsVmNKFQPxz26wIEeDaacfIqP9NPibY2z2fVHA_pYgCenJfrfpLIPp_Lf1FwB8LyHR3dQdTW3WkXwBsmjBRmuNxmLRzeBRjq9wsgPl12hUlvMLilhfYjHpoI7hWYwX3zwAVOWG12h4cbVagehJyKzabQ5WzPvJNWi9MP3PUX1hy1yxc2rDqvOoUeugc-2Yz01PpATzrNSb70aVX77ez6qGfLDmcVX8E",
    alt: "Monster Track Edition Sleeve",
  },
  {
    id: 2,
    name: "CR7 Street",
    price: "39,99 €",
    badge: "5 LEFT",
    badgeType: "tertiary",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDGN6Ukr97pXLSXTqN8kVfI2D802hs-bxTDOCFYu3YeUTiDdAoNVvyQAXYIkRIKbiqbOSGlxlNmCj1neNTMQojet_ZIcKGSRBqAexIXuld5Vji1NUFQZ0_T9y7aYfIqUGBkvH8T2I6K043RyU0UoCNDBzhFm1zaI70NiEmmg9Hul81ux6ik0c6aN40MedSGZIGXlhuF03Ar4dQFzP8u2FTcZJSRm19HxEMCSufOSe0Drj3KlZziCZQXhZ1ySYb0Wl4zrnyJd9Gwjhw",
    alt: "CR7 Street Edition",
  },
  {
    id: 3,
    name: "GOAT Mask",
    price: "39,99 €",
    badge: "HOT",
    badgeType: "secondary",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBWEoCeOA2KWzf1hps8DYpLdfOIe5MrHenR5LLhNKR-eibADaJaAspHwIBlikdE_CtOsaSVyXfHW3BortRLm0Tp2Dg86qK3C5ojyZaVVRgVda2sS0mlmI8r6T5Ow9tl8hsC4sFbBOXDYLCSZ3lUy8yCN90-Lci4U3Yptxyc2QG2Qta9bqY7JG7zCB2oTP_lNYKcNlxM2ssHVY-LD4XcqYwVAPTjJ_e8kU9ZKPjFxFkR8Jw9pTzghvDB7zgzQxWx6fO8B58i3FW80U8",
    alt: "GOAT Mask Edition",
  },
  {
    id: 4,
    name: "Pumptrack Flow",
    price: "34,99 €",
    badge: null,
    badgeType: "primary",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDuTC-7YRcxp6_8Mxzp2hLfP5KnTI2D802hs",
    alt: "Pumptrack Flow Sleeve",
  },
];

export const philosophyData = {
  title: "GEGEN DEN<br/>BETON IM KOPF.",
  description:
    "Klobiges Plastik, schwitzige Klettverschlüsse, Bewegungseinschränkung — das war The Old Way. Der IOD Weg: Atmungsaktiver Stoffstrumpf, stilvoller Schutz durch hochfeste Fasern. Fühlt sich an wie dein Lieblings-Hoodie.",
  points: [
    { title: "Zero Plastic — 100% Textile", type: "primary" },
    { title: "Second Skin Fit", type: "secondary" },
    { title: "Recycled High-Tech Fasern", type: "tertiary" },
  ],
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA8VuCJlTWz0lUUg005uT2QdqphyYv-93nkiAAOR0RXSslLGJjbhw96a0ek1WTJph8dP9ngasOIjDFToIdOooE_JKKyqqjk5L29iIAHp3jseysw0Ed1VSLk4e6hflRTepkU4MAbvuG1_kM1AG21gGSg1nr5FxiSUA4qeoxKoQG-dx3DpT-wIKrneJD5-e_Gl7qiCiaubIVLwqFm-zKWmFTSVSzfQH-hLIhDctUBOMIX_ocrVOVZqTHfZZPLFm1P4ZIsLIg1K4mxtoc",
  alt: "Kind mit IOD Sleeve am Pumptrack",
  badge: "TESTED BY REBELS",
};
