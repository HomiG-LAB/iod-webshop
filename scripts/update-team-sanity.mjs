import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import { resolve, basename } from "path";
import { config } from "dotenv";

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

async function uploadImage(relativePath) {
  const absPath = resolve(PUBLIC_DIR, relativePath.replace(/^\//, ""));
  if (!existsSync(absPath)) {
    console.warn(`  ⚠️  Image not found: ${absPath}`);
    return null;
  }

  const buffer = readFileSync(absPath);
  const filename = basename(absPath);
  const contentType = "image/png";

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

async function main() {
  console.log("Updating Amigo and adding Rookie to Sanity...");

  // Update Amigo
  const amigoImage = await uploadImage("team_amigo.png");
  if (amigoImage) {
    await client
      .patch("team-amigo")
      .set({ image: amigoImage })
      .commit();
    console.log("✅ Updated Amigo in Sanity.");
  }

  // Create Rookie
  const rookieImage = await uploadImage("team_rookie.png");
  const rookieDoc = {
    _id: `team-rookie`,
    _type: "teamMember",
    name: "Rookie",
    role: "Praktikant Chief Feel Good Officer (Temporary)",
    description: "His strengh keeping us motivated. As a puppy trainee, he brings chaotic joy and reminds us to always stay curious. (Temporary assignment until the next puppy takes over!)",
    order: 10,
    ...(rookieImage && { image: rookieImage }),
  };

  await client.createOrReplace(rookieDoc);
  console.log("✅ Created Rookie in Sanity.");
}

main().catch(console.error);
