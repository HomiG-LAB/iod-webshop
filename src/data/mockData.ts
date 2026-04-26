// ─────────────────────────────────────────────────────────────────────────────
// IOD Webshop — Mock Data Layer
// Skin: "Kinetic Asphalt" — Dark concrete base, neon accents
// Inspired by: Monster Track Edition, Ronaldo x IOD GOAT, Nur Stoff Nur Flow,
//              IOD Action Lookbook: Der pure Flow
// ─────────────────────────────────────────────────────────────────────────────

// ─── NAVIGATION ──────────────────────────────────────────────────────────────
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Design", href: "/#showcase" },
  { label: "Story", href: "/#story" },
  { label: "Team", href: "/#team" },
  { label: "Store", href: "/shop" },
];

// ─── HERO ─────────────────────────────────────────────────────────────────────
export const heroData = {
  tagline: "KEIN POLSTER. NUR FLOW.",
  headlineLine1: "Second skin.",
  headlineLine2: "But with a statement.",
  subTagline: "Der Ellbogenschützer, der sich anfühlt wie nichts — und trotzdem alles sagt. Hauchdünn, elastisch, komplett bedruckbar. Für alle, die auf dem Pumptrack ihre eigene Linie fahren.",
  cta1: "JETZT BESTELLEN",
  cta2: "MEHR ERFAHREN",
  image:
    "/pumptrack_seamless_sleeve_1777204026688.png",
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
  ctaShop: "ADD TO CART — 39.00 CHF",
  ctaDetails: "ALLE DETAILS",
  price: "39.00 CHF",
  priceNote: "* inkl. MwSt., zzgl. Versandkosten",
  image:
    "/pumptrack_seamless_sleeve_1777204026688.png",
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
        "/product_victory_lap.png",
    },
    {
      id: "pro-street",
      name: "PRO STREET",
      description: "Dunkelgrau, Neon-Lime Nr. 7 + Graffiti-Silhouette.",
      badge: "5 LEFT",
      badgeColor: "primary",
      image:
        "/product_pro_street.png",
    },
    {
      id: "goat-mask",
      name: "GOAT MASK",
      description: "Weisses Knit, Gold-Kronen-Doodle + GOAT in Bubble-Schrift.",
      badge: "HOT",
      badgeColor: "secondary",
      image:
        "/product_goat_mask.png",
    },
    {
      id: "victory-lap",
      name: "VICTORY LAP",
      description: "Deep Purple + Neon-Cyan Motion-Streaks und das IOD-Logo.",
      badge: "NEW",
      badgeColor: "primary",
      image:
        "/product_victory_lap.png",
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
    "Das IOD sitzt so nah am Arm, dass du vergisst, dass du überhaupt Schutz trägst. Keine Polster, kein Klotz -- ein hauchdünner Sleeve mit integriertem Ellbogenpad und deinem Design drauf. Für alle ab Kids- bis Erwachsenengrösse.",
  points: [
    {
      icon: "fit_screen",
      title: "Second-Skin Passform",
      description: "4-Way Stretch, bewegt sich mit dir -- kein Einschneiden, kein Verrutschen.",
    },
    {
      icon: "palette",
      title: "Full-Print Sublimation",
      description: "Keine Farbbeschränkung, kein Verblassen. Dein Design in maximaler Schärfe.",
    },
    {
      icon: "shield",
      title: "Ultradünner Ellbogenpad",
      description: "Flach anliegend, exakt wo es zählt. Schutz ohne Volumen.",
    },
    {
      icon: "public",
      title: "Made in Switzerland",
      description: "Qualität, die man spürt. Produziert nach Schweizer Standards.",
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
  body: "Wir haben IOD gegründet, weil wir glauben: Unternehmertum lernt man nicht aus Büchern -- sondern indem man einfach anfängt. Der Gewinn geht in Bildung. Das Produkt kommt aus der Schweiz.\n\nNachhaltigkeit ist unser Antrieb: Wir setzen auf 100% recycelte Textilien, komplett plastikfreie Verpackungen und umweltschonende Produktionsprozesse. Jedes Sleeve ist nicht nur Performance-Ausrüstung, sondern auch ein Statement für unsere Umwelt.",
  ctaLabel: "MEHR ÜBER UNS",
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export const faqData = [
  {
    q: "Für wen sind die IOD Sleeves geeignet?",
    a: "Für alle! Wir haben Grössen ab Kids bis Erwachsene. Schau dir unsere Grössentabelle an -- und falls du unsicher bist, empfehlen wir eine Grösse grösser.",
  },
  {
    q: "Was unterscheidet IOD von normalen Ellbogenschützern?",
    a: "Kein Plastik, kein Klettverschluss, kein Bulk. Unser Sleeve sitzt wie eine zweite Haut, schützt durch High-Tech-Fasern und sieht dabei besser aus als alles andere auf dem Track.",
  },
  {
    q: "Kann ich ein eigenes Design drucken lassen?",
    a: "Ja! Full-Print Sublimation bedeutet: keine Farbbeschränkung, kein Verblassen. Kontaktier uns für Custom Orders.",
  },
  {
    q: "Wie wasche ich die Sleeves?",
    a: "Einfach in die Maschine bei 30 Grad. Die Farben bleiben knallig, der Sitz bleibt perfekt.",
  },
  {
    q: "Wohin geht der Gewinn?",
    a: "In Bildung. Wir sind ein Startup mit Mission -- ein Teil des Gewinns fliesst direkt in Lernprojekte für junge Menschen.",
  },
];

// ─── SIZES GUIDE ──────────────────────────────────────────────────────────────
export const sizesData = {
  eyebrow: "PERFEKTER FIT",
  title: "FIND DEINE\nGRÖSSE",
  description: "Kein Maßband nötig. Wir haben die Sleeves so entwickelt, dass sie sich deiner Altersgruppe und deinem Flow anpassen. Wähle deine Kategorie:",
  categories: [
    {
      id: "mini",
      age: "2–5 JAHRE",
      title: "MINI REBELS",
      description: "Für die allerersten Rollversuche. Hält, schützt, stört nicht auf dem Asphalt.",
      icon: "child_care",
      color: "primary"
    },
    {
      id: "kids",
      age: "6–11 JAHRE",
      title: "ROOKIES",
      description: "Pausenplatz-Helden & Rampen-Stürmer. Volle Bewegungsfreiheit für endlose Sessions.",
      icon: "sports_motorsports", // Alternatively: skateboarding
      color: "secondary"
    },
    {
      id: "teens",
      age: "12–15 JAHRE",
      title: "YOUNG BLOOD",
      description: "Higher Jumps, More Speed. Sitzt wie eine zweite Haut – egal wie hart der Drop ist.",
      icon: "bolt",
      color: "tertiary"
    },
    {
      id: "adults",
      age: "16+ JAHRE",
      title: "PROS",
      description: "Performance-Gear für höchste Ansprüche. Kein Klotz, nur Flow und maximaler Style.",
      icon: "local_fire_department",
      color: "primary"
    }
  ]
};

// Legacy exports for backwards compatibility
export const benefitsData = {
  main: {
    icon: "eco",
    title: "NO PADDING,<br/>JUST FLOW.",
    description:
      "Unser proprietäres Textile-Only-Gewebe schützt die Haut vor Asphalt-Abrieb ohne den Bulk von Plastikschalen.",
    cta: "DIE TECHNIK ENTDECKEN",
    image:
      "/pumptrack_seamless_sleeve_1777204026688.png",
  },
  card1: { icon: "wash", title: "MESS PROOF", description: "Toss them in the wash." },
  card2: { icon: "child_care", title: "5-10 JAHRE", description: "Engineered for the growth spurt." },
  newsletter: newsletterData,
};

export const productsData = [
  {
    id: 1,
    name: "Monster Track",
    price: "39.00 CHF",
    badge: "TRENDING",
    badgeType: "primary",
    image:
      "/product_monster_track.png",
    alt: "Monster Track Edition Sleeve",
  },
  {
    id: 2,
    name: "CR7 Street",
    price: "39.00 CHF",
    badge: "5 LEFT",
    badgeType: "tertiary",
    image:
      "/product_pro_street.png",
    alt: "CR7 Street Edition",
  },
  {
    id: 3,
    name: "GOAT Mask",
    price: "39.00 CHF",
    badge: "HOT",
    badgeType: "secondary",
    image:
      "/product_goat_mask.png",
    alt: "GOAT Mask Edition",
  },
  {
    id: 4,
    name: "Pumptrack Flow",
    price: "39.00 CHF",
    badge: null,
    badgeType: "primary",
    image:
      "/product_victory_lap.png",
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
    "/founder_story_mockup_1777204011615.png",
  alt: "Kind mit IOD Sleeve am Pumptrack",
  badge: "TESTED BY REBELS",
};
