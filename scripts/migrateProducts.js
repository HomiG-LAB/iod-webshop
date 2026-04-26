const { createClient } = require('@sanity/client');
const { productsData } = require('../src/data/mockData.ts'); // Wait, mockData.ts is TypeScript. We need to convert it or read it.

// Let's write a self-contained script with the data embedded to avoid TS import issues in node scripts.
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-04-19',
  token: process.env.SANITY_API_TOKEN,
});

const products = [
  {
    id: "monster-track",
    name: "Monster Track",
    price: 39.00,
    badge: "TRENDING",
    badgeType: "primary",
    image: "/product_monster_track.png",
    description: "Urban Camo Edition Sleeve",
  },
  {
    id: "cr7-street",
    name: "CR7 Street",
    price: 39.00,
    badge: "5 LEFT",
    badgeType: "tertiary",
    image: "/product_pro_street.png",
    description: "CR7 Street Edition",
  },
  {
    id: "goat-mask",
    name: "GOAT Mask",
    price: 39.00,
    badge: "HOT",
    badgeType: "secondary",
    image: "/product_goat_mask.png",
    description: "GOAT Mask Edition",
  },
  {
    id: "pumptrack-flow",
    name: "Pumptrack Flow",
    price: 39.00,
    badge: null,
    badgeType: "primary",
    image: "/product_victory_lap.png",
    description: "Pumptrack Flow Sleeve",
  },
  {
    id: "sui-vibe",
    name: "SUI-VIBE Original",
    price: 39.00,
    badge: "NEW DROP",
    badgeType: "secondary",
    image: "/product_goat_mask.png",
    description: "SUI-VIBE Original Edition",
  },
  {
    id: "neon-rush",
    name: "Neon Rush",
    price: 39.00,
    badge: null,
    badgeType: "primary",
    image: "/product_victory_lap.png",
    description: "Neon Rush Sleeve",
  },
  {
    id: "night-rider",
    name: "Night Rider",
    price: 39.00,
    badge: "LIMITED",
    badgeType: "tertiary",
    image: "/product_pro_street.png",
    description: "Night Rider Edition",
  },
  {
    id: "urban-camo",
    name: "Urban Camo",
    price: 39.00,
    badge: "HOT",
    badgeType: "primary",
    image: "/product_monster_track.png",
    description: "Urban Camo Edition",
  },
  {
    id: "velocity-burst",
    name: "Velocity Burst",
    price: 39.00,
    badge: "TRENDING",
    badgeType: "secondary",
    image: "/product_victory_lap.png",
    description: "Velocity Burst Sleeve",
  },
];

async function migrate() {
  console.log("Starting migration...");
  
  if (!process.env.SANITY_API_TOKEN) {
    console.error("❌ SANITY_API_TOKEN is missing! Please add it to your environment variables.");
    process.exit(1);
  }

  for (const product of products) {
    const doc = {
      _type: 'product',
      title: product.name,
      slug: {
        _type: 'slug',
        current: product.id,
      },
      price: product.price,
      description: product.description,
      badge: product.badge,
      badgeType: product.badgeType,
      // Note: Images will need to be re-uploaded manually in Sanity Studio or via asset pipeline.
      // For now, we migrate the text data so you don't start from scratch.
    };

    try {
      const res = await client.create(doc);
      console.log(`✅ Migrated: ${product.name} (ID: ${res._id})`);
    } catch (err) {
      console.error(`❌ Failed to migrate ${product.name}:`, err.message);
    }
  }

  console.log("Migration complete!");
}

migrate();
