#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// IOD Webshop — Sanity CMS Full Content Seed
// Populates ALL Sanity documents to match the live website content.
// Idempotent: uses createOrReplace so it's safe to re-run.
//
// Usage:
//   node scripts/seedSanity.mjs
//
// Requires: SANITY_API_TOKEN, NEXT_PUBLIC_SANITY_PROJECT_ID,
//           NEXT_PUBLIC_SANITY_DATASET in .env.local
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import { resolve, basename } from "path";
import { config } from "dotenv";

// Load .env.local
config({ path: resolve(process.cwd(), ".env.local") });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: "2024-04-19",
  token,
});

const PUBLIC_DIR = resolve(process.cwd(), "public");

// ─── HELPERS ──────────────────────────────────────────────────────────────────

/**
 * Upload an image from the /public directory to Sanity Assets.
 * Returns a Sanity image reference object.
 */
async function uploadImage(relativePath) {
  const absPath = resolve(PUBLIC_DIR, relativePath.replace(/^\//, ""));
  if (!existsSync(absPath)) {
    console.warn(`  ⚠️  Image not found: ${absPath}`);
    return null;
  }

  const buffer = readFileSync(absPath);
  const filename = basename(absPath);
  const contentType = filename.endsWith(".png")
    ? "image/png"
    : filename.endsWith(".jpg") || filename.endsWith(".jpeg")
    ? "image/jpeg"
    : "image/png";

  try {
    const asset = await client.assets.upload("image", buffer, {
      filename,
      contentType,
    });
    console.log(`  📸 Uploaded: ${filename} → ${asset._id}`);
    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    };
  } catch (err) {
    console.error(`  ❌ Upload failed for ${filename}:`, err.message);
    return null;
  }
}

/** Generate a deterministic _key for array items */
function key(prefix, i) {
  return `${prefix}_${String(i).padStart(3, "0")}`;
}

// ─── 1. SEED HOMEPAGE ─────────────────────────────────────────────────────────

async function seedHomePage() {
  console.log("\n🏠 Seeding Home Page...");

  // Upload images
  const heroImage = await uploadImage("pumptrack_seamless_sleeve_1777204026688.png");
  const storyImage = await uploadImage("family_story_1777205766624.png");

  // Lookbook shots
  const lookbookImages = await Promise.all([
    uploadImage("product_monster_track.png"),
    uploadImage("product_goat_mask.png"),
    uploadImage("product_pro_street.png"),
  ]);

  const doc = {
    _id: "homePage",
    _type: "homePage",

    // ── Hero Section
    hero: {
      tagline: "KEIN POLSTER. NUR FLOW.",
      titlePart1: "SECOND",
      titlePart2: "SKIN.",
      titlePart3: "BUT WITH A",
      titlePart4: "STATEMENT.",
      subTagline:
        "Der Ellbogenschützer, der sich anfühlt wie nichts — und trotzdem alles sagt. Hauchdünn, elastisch, komplett bedruckbar. Für alle, die auf dem Pumptrack ihre eigene Linie fahren.",
      cta1: "BALD VERFÜGBAR",
      cta2: "MEHR ERFAHREN",
      ...(heroImage && { backgroundImage: heroImage }),
    },

    // ── USP Section
    usp: {
      eyebrow: "WARUM IOD",
      title: "Kein Klotz.\nKein Kompromiss.",
      description:
        "Das IOD sitzt so nah am Arm, dass du vergisst, dass du überhaupt Schutz trägst. Keine Polster, kein Klotz -- ein hauchdünner Sleeve mit integriertem Ellbogenpad und deinem Design drauf. Für alle ab Kids- bis Erwachsenengrösse.",
      points: [
        {
          _key: key("usp", 0),
          icon: "fit_screen",
          title: "Second-Skin Passform",
          description:
            "4-Way Stretch, bewegt sich mit dir -- kein Einschneiden, kein Verrutschen.",
        },
        {
          _key: key("usp", 1),
          icon: "palette",
          title: "Full-Print Sublimation",
          description:
            "Keine Farbbeschränkung, kein Verblassen. Dein Design in maximaler Schärfe.",
        },
        {
          _key: key("usp", 2),
          icon: "shield",
          title: "Ultradünner Ellbogenpad",
          description:
            "Flach anliegend, exakt wo es zählt. Schutz ohne Volumen.",
        },
        {
          _key: key("usp", 3),
          icon: "public",
          title: "Made in Switzerland",
          description:
            "Qualität, die man spürt. Produziert nach Schweizer Standards.",
        },
        {
          _key: key("usp", 4),
          icon: "eco",
          title: "0% Plastik",
          description:
            "100% Textil. Wir setzen auf nachhaltige Materialien und lokale Prozesse.",
        },
      ],
    },

    // ── Sizes Section
    sizes: {
      eyebrow: "PERFEKTER FIT",
      title: "FIND DEINE\nGRÖSSE",
      description:
        "Kein Maßband nötig. Wir haben die Sleeves so entwickelt, dass sie sich deiner Altersgruppe und deinem Flow anpassen. Wähle deine Kategorie:",
      categories: [
        {
          _key: key("size", 0),
          age: "2–5 JAHRE",
          title: "MINI REBELS",
          description:
            "Für die allerersten Rollversuche. Hält, schützt, stört nicht auf dem Asphalt.",
          icon: "child_care",
          color: "primary",
        },
        {
          _key: key("size", 1),
          age: "6–11 JAHRE",
          title: "ROOKIES",
          description:
            "Pausenplatz-Helden & Rampen-Stürmer. Volle Bewegungsfreiheit für endlose Sessions.",
          icon: "sports_motorsports",
          color: "secondary",
        },
        {
          _key: key("size", 2),
          age: "12–15 JAHRE",
          title: "YOUNG BLOOD",
          description:
            "Higher Jumps, More Speed. Sitzt wie eine zweite Haut – egal wie hart der Drop ist.",
          icon: "bolt",
          color: "tertiary",
        },
        {
          _key: key("size", 3),
          age: "16+ JAHRE",
          title: "PROS",
          description:
            "Performance-Gear für höchste Ansprüche. Kein Klotz, nur Flow und maximaler Style.",
          icon: "local_fire_department",
          color: "primary",
        },
      ],
    },

    // ── Story Section
    story: {
      eyebrow: "UNSERE STORY",
      title: "Ein Startup.\nEine Familie.\nEin Ziel.",
      body: "Wir haben IOD gegründet, weil wir glauben: Unternehmertum lernt man nicht aus Büchern -- sondern indem man einfach anfängt. Der Gewinn geht in Bildung. Das Produkt kommt aus der Schweiz.\n\nNachhaltigkeit ist unser Antrieb: Wir setzen auf 100% recycelte Textilien, komplett plastikfreie Verpackungen und umweltschonende Produktionsprozesse. Jedes Sleeve ist nicht nur Performance-Ausrüstung, sondern auch ein Statement für unsere Umwelt.",
      ctaLabel: "MEHR ÜBER UNS",
      ...(storyImage && { image: storyImage }),
    },

    // ── Lookbook Section
    lookbook: {
      badge: "IN AKTION",
      title: "DER PURE FLOW.",
      description:
        "Nicht nur Schutz. Ein Statement. Sieh, wie IOD Sleeves auf dem Track, in der Graffiti-Zone und überall dazwischen getragen werden.",
      ctaLabel: "ALLE STYLES ENTDECKEN",
      shots: [
        {
          _key: key("look", 0),
          caption: "Urban Camo Edition",
          tag: "LATEST",
          ...(lookbookImages[0] && { image: lookbookImages[0] }),
        },
        {
          _key: key("look", 1),
          caption: "SUI-VIBE Original",
          tag: "CLASSIC",
          ...(lookbookImages[1] && { image: lookbookImages[1] }),
        },
        {
          _key: key("look", 2),
          caption: "Night Rider Sleeve",
          tag: "LIMITED",
          ...(lookbookImages[2] && { image: lookbookImages[2] }),
        },
      ],
    },

    // ── FAQ Section
    faq: [
      {
        _key: key("faq", 0),
        question: "Für wen sind die IOD Sleeves geeignet?",
        answer:
          "Für alle! Wir haben Grössen ab Kids bis Erwachsene. Schau dir unsere Grössentabelle an -- und falls du unsicher bist, empfehlen wir eine Grösse grösser.",
      },
      {
        _key: key("faq", 1),
        question: "Was unterscheidet IOD von normalen Ellbogenschützern?",
        answer:
          "Kein Plastik, kein Klettverschluss, kein Bulk. Unser Sleeve sitzt wie eine zweite Haut, schützt durch High-Tech-Fasern und sieht dabei besser aus als alles andere auf dem Track.",
      },
      {
        _key: key("faq", 2),
        question: "Kann ich ein eigenes Design drucken lassen?",
        answer:
          "Ja! Full-Print Sublimation bedeutet: keine Farbbeschränkung, kein Verblassen. Kontaktier uns für Custom Orders.",
      },
      {
        _key: key("faq", 3),
        question: "Wie wasche ich die Sleeves?",
        answer:
          "Einfach in die Maschine bei 30 Grad. Die Farben bleiben knallig, der Sitz bleibt perfekt.",
      },
      {
        _key: key("faq", 4),
        question: "Wohin geht der Gewinn?",
        answer:
          "In Bildung. Wir sind ein Startup mit Mission -- ein Teil des Gewinns fliesst direkt in Lernprojekte für junge Menschen.",
      },
    ],

    // ── Newsletter Section
    newsletter: {
      title: "SEI DABEI WENN'S LOSGEHT.",
      description:
        "Wir bauen gerade was Neues. Trag dich ein und erfahre als Erster, wenn die Sleeves droppen — plus exklusive Pre-Launch Deals, die nur die Crew kriegt.",
      placeholder: "deine@rebel-mail.de",
      buttonText: "ICH BIN DABEI",
    },
  };

  await client.createOrReplace(doc);
  console.log("✅ Home Page seeded!");
}

// ─── 2. SEED SITE SETTINGS ───────────────────────────────────────────────────

async function seedSiteSettings() {
  console.log("\n⚙️  Seeding Site Settings...");

  const logo = await uploadImage("logo-iod.png");

  const doc = {
    _id: "siteSettings",
    _type: "siteSettings",
    title: "IOD — Inside Out Design",
    slogan: "KEIN POLSTER. NUR FLOW.",
    instagramUrl: "https://www.instagram.com/iod_yourshop",
    tiktokUrl: "https://tiktok.com/@iod",
    youtubeUrl: "https://youtube.com/@iod",
    footerText:
      "Alle Preise inkl. MwSt., zzgl. Versandkosten. Widerrufsrecht: 14 Tage nach Erhalt der Ware.",
    ...(logo && { logo }),
  };

  await client.createOrReplace(doc);
  console.log("✅ Site Settings seeded!");
}

// ─── 3. SEED PRODUCTS ────────────────────────────────────────────────────────

async function seedProducts() {
  console.log("\n📦 Seeding Products...");

  // First, delete any existing products to avoid duplicates from the old migration script
  const existing = await client.fetch(`*[_type == "product"]._id`);
  if (existing.length > 0) {
    console.log(`  🗑  Deleting ${existing.length} existing product(s)...`);
    const tx = client.transaction();
    existing.forEach((id) => tx.delete(id));
    await tx.commit();
  }

  const products = [
    {
      slug: "monster-track",
      name: "Monster Track",
      price: 39,
      badge: "TRENDING",
      badgeType: "primary",
      imagePath: "product_monster_track.png",
      description: "Monster Track Edition Sleeve",
    },
    {
      slug: "cr7-street",
      name: "CR7 Street",
      price: 39,
      badge: "5 LEFT",
      badgeType: "tertiary",
      imagePath: "product_pro_street.png",
      description: "CR7 Street Edition",
    },
    {
      slug: "goat-mask",
      name: "GOAT Mask",
      price: 39,
      badge: "HOT",
      badgeType: "secondary",
      imagePath: "product_goat_mask.png",
      description: "GOAT Mask Edition",
    },
    {
      slug: "pumptrack-flow",
      name: "Pumptrack Flow",
      price: 39,
      badge: null,
      badgeType: "primary",
      imagePath: "product_victory_lap.png",
      description: "Pumptrack Flow Sleeve",
    },
    {
      slug: "sui-vibe",
      name: "SUI-VIBE Original",
      price: 39,
      badge: "NEW DROP",
      badgeType: "secondary",
      imagePath: "product_goat_mask.png",
      description: "SUI-VIBE Original Edition",
    },
    {
      slug: "neon-rush",
      name: "Neon Rush",
      price: 39,
      badge: null,
      badgeType: "primary",
      imagePath: "product_victory_lap.png",
      description: "Neon Rush Sleeve",
    },
    {
      slug: "night-rider",
      name: "Night Rider",
      price: 39,
      badge: "LIMITED",
      badgeType: "tertiary",
      imagePath: "product_pro_street.png",
      description: "Night Rider Edition",
    },
    {
      slug: "urban-camo",
      name: "Urban Camo",
      price: 39,
      badge: "HOT",
      badgeType: "primary",
      imagePath: "product_monster_track.png",
      description: "Urban Camo Edition",
    },
    {
      slug: "velocity-burst",
      name: "Velocity Burst",
      price: 39,
      badge: "TRENDING",
      badgeType: "secondary",
      imagePath: "product_victory_lap.png",
      description: "Velocity Burst Sleeve",
    },
  ];

  for (const p of products) {
    const image = await uploadImage(p.imagePath);
    const doc = {
      _id: `product-${p.slug}`,
      _type: "product",
      title: p.name,
      slug: { _type: "slug", current: p.slug },
      price: p.price,
      badge: p.badge,
      badgeType: p.badgeType,
      description: p.description,
      comingSoon: true,
      ...(image && { image }),
    };

    await client.createOrReplace(doc);
    console.log(`  ✅ ${p.name}`);
  }

  console.log("✅ All products seeded!");
}

// ─── 4. SEED TEAM MEMBERS ─────────────────────────────────────────────────────

async function seedTeamMembers() {
  console.log("\n👥 Seeding Team Members...");

  // Delete existing team members to avoid duplicates
  const existing = await client.fetch(`*[_type == "teamMember"]._id`);
  if (existing.length > 0) {
    console.log(`  🗑  Deleting ${existing.length} existing team member(s)...`);
    const tx = client.transaction();
    existing.forEach((id) => tx.delete(id));
    await tx.commit();
  }

  const members = [
    {
      id: "katja",
      name: "Katja",
      role: "Entrepreneurship Coach & Strategic Lead",
      description:
        "Verbindet strategisches Denken mit praktischer Umsetzung und begleitet das Team dabei, Ideen in echte Projekte zu verwandeln. Im Mittelpunkt steht nicht nur das Projekt selbst, sondern auch das Lernen: Unternehmertum verstehen, ausprobieren und entwickeln.",
      imagePath: "team/katja-styled.png",
      order: 1,
    },
    {
      id: "homero",
      name: "Homero",
      role: 'Systems Architect aka "Tech Whisperer"',
      description:
        'Als echter Techie und Halb-Nerd lebt diese Rolle irgendwo zwischen Code, Logik und dem festen Glauben, dass „man das noch eleganter lösen kann". Wenn es technisch wird, ist er entweder schon dran oder hat es schon längst verbessert.',
      imagePath: "team/homero-styled.png",
      order: 2,
    },
    {
      id: "amaro",
      name: "Amaro",
      role: "Experimentation & Development Lead",
      description:
        "Bringt neue Ideen in die Praxis und testet sie strukturiert, kritisch und mit einem klaren Blick für Verbesserung. Hinterfragt Ansätze, entwickelt sie weiter und sorgt dafür, dass aus Konzepten funktionierende Lösungen werden. Als Chemie- und Sportenthusiast verbindet diese Rolle analytisches Denken aus dem Labor mit Ausdauer, Disziplin und Leistungsorientierung aus dem Sport.",
      imagePath: "team/amaro-styled.png",
      order: 3,
    },
    {
      id: "ciara",
      name: "Ciara",
      role: "Content & Social Media Lead",
      description:
        "Verantwortlich für die Erstellung von Content und die Pflege unserer Social-Media-Kanäle. Entwickelt kreative Inhalte, erzählt unsere Geschichte nach außen und sorgt dafür, dass unsere Marke online sichtbar, konsistent und nahbar bleibt.",
      imagePath: "team/ciara-styled.png",
      order: 4,
    },
    {
      id: "jonah",
      name: "Jonah",
      role: "Sales & Growth Lead",
      description:
        "Verantwortlich für den Aufbau von Kundenbeziehungen und die Weiterentwicklung unseres Vertriebs. Fokussiert auf Wachstum durch echte Verbindung: versteht Bedürfnisse, übersetzt sie in Lösungen und bringt Angebote gezielt an die richtigen Menschen.",
      imagePath: "team/jonah-styled.png",
      order: 5,
    },
    {
      id: "amy",
      name: "Amy",
      role: "Lead Product Tester & Experience Manager",
      description:
        "Testet alles, bevor es jemand anderes tut – kritisch, ehrlich und mit Blick fürs Detail. Sorgt dafür, dass unsere Produkte nicht nur funktionieren, sondern begeistern.",
      imagePath: "team/amy-styled.png",
      order: 6,
    },
    {
      id: "liv",
      name: "Liv",
      role: "Brand Lead & Community Magic",
      description:
        "Verantwortlich für die Aussenwirkung unserer Marke sowie den Aufbau und die Pflege unserer Community.",
      imagePath: "team/liv-styled.png",
      order: 7,
    },
    {
      id: "amigo",
      name: "Amigo",
      role: "Chief Security Officer",
      description:
        "Verantwortlich für Sicherheit, Alarmbereitschaft. Erkennt Gefahren frühzeitig und sorgt für regelmässige Bewegungspausen im Team.",
      imagePath: "team/amigo-styled.png",
      order: 8,
    },
    {
      id: "mrs-curry",
      name: "Mrs. Curry",
      role: "Chief Mental Health Officer",
      description:
        "Expertin für Entschleunigung und emotionale Balance. Erinnerte das Team daran, Pausen einzulegen, Prioritäten zu hinterfragen und das Leben nicht zu ernst zu nehmen.",
      imagePath: "team/curry-styled.png",
      order: 9,
    },
  ];

  for (const m of members) {
    const image = await uploadImage(m.imagePath);
    const doc = {
      _id: `team-${m.id}`,
      _type: "teamMember",
      name: m.name,
      role: m.role,
      description: m.description,
      order: m.order,
      ...(image && { image }),
    };

    await client.createOrReplace(doc);
    console.log(`  ✅ ${m.name}`);
  }

  console.log("✅ All team members seeded!");
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("═══════════════════════════════════════════════════════════");
  console.log("  IOD Webshop — Sanity CMS Full Content Seed");
  console.log(`  Project: ${projectId} | Dataset: ${dataset}`);
  console.log("═══════════════════════════════════════════════════════════");

  try {
    await seedHomePage();
    await seedSiteSettings();
    await seedProducts();
    await seedTeamMembers();

    console.log("\n═══════════════════════════════════════════════════════════");
    console.log("  🎉 ALL CONTENT SEEDED SUCCESSFULLY!");
    console.log("  Open http://localhost:3000/studio to verify.");
    console.log("═══════════════════════════════════════════════════════════\n");
  } catch (err) {
    console.error("\n❌ Seed failed:", err);
    process.exit(1);
  }
}

main();
