/**
 * Seed 3 new IOD product designs into Sanity CMS
 * - Neon Graffiti Edition
 * - Purple Cyan Edition  
 * - Urban Flow Edition
 * 
 * Run: node scripts/seed-new-products.mjs
 */

import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const client = createClient({
  projectId: '5mib0g4n',
  dataset: 'production',
  apiVersion: '2024-04-19',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const newProducts = [
  {
    title: 'Neon Graffiti',
    slug: 'neon-graffiti',
    description: 'Neon-Grün auf Schwarz mit wildem Graffiti-Street-Art-Print. Auffällig, laut, unverwechselbar.',
    price: 39,
    badge: 'NEW DROP',
    badgeType: 'primary',
    imagePath: resolve('public/product_neon_graffiti.png'),
  },
  {
    title: 'Purple Cyan',
    slug: 'purple-cyan',
    description: 'Geometrisches Design in Deep Purple und Cyan mit IOD-Logo. Futuristisch und einzigartig.',
    price: 39,
    badge: 'HOT',
    badgeType: 'secondary',
    imagePath: resolve('public/product_purple_cyan.png'),
  },
  {
    title: 'Urban Flow',
    slug: 'urban-flow',
    description: 'Neon-Gelb auf Schwarz mit Bold-Tag-Style Urban Art. Der ultimative Street-Look.',
    price: 39,
    badge: 'TRENDING',
    badgeType: 'primary',
    imagePath: resolve('public/product_urban_flow.png'),
  },
];

async function uploadImage(filePath) {
  const imageBuffer = readFileSync(filePath);
  const asset = await client.assets.upload('image', imageBuffer, {
    filename: filePath.split('/').pop(),
    contentType: 'image/png',
  });
  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  };
}

async function seedProducts() {
  console.log('🌱 Seeding 3 new IOD products into Sanity...\n');

  for (const product of newProducts) {
    // Check if already exists
    const existing = await client.fetch(
      `*[_type == "product" && slug.current == $slug][0]`,
      { slug: product.slug }
    );

    if (existing) {
      console.log(`⏭️  "${product.title}" already exists — skipping`);
      continue;
    }

    console.log(`📸 Uploading image for "${product.title}"...`);
    const image = await uploadImage(product.imagePath);

    console.log(`📝 Creating product "${product.title}"...`);
    const doc = await client.create({
      _type: 'product',
      title: product.title,
      slug: { _type: 'slug', current: product.slug },
      description: product.description,
      price: product.price,
      badge: product.badge,
      badgeType: product.badgeType,
      image,
    });

    console.log(`✅ Created "${product.title}" → ${doc._id}\n`);
  }

  console.log('🎉 Done! All 3 new products are now in Sanity Studio.');
}

seedProducts().catch((err) => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
