import "dotenv/config";
import sharp from "sharp";
import { db, pool } from "./db";
import { products } from "@shared/schema";
import { eq } from "drizzle-orm";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, "../client/public/images");
const THUMBNAILS_DIR = path.join(IMAGES_DIR, "thumbnails");
const SWORD_ICON = path.join(IMAGES_DIR, "sword-icon.png");

// Ensure thumbnails directory exists
if (!fs.existsSync(THUMBNAILS_DIR)) {
  fs.mkdirSync(THUMBNAILS_DIR, { recursive: true });
}

// Background images to use
const BACKGROUND_IMAGES = [
  "cover-1.png",
  "cover-2.png",
  "cover-3.png",
  "creator-1.png",
  "creator-2.png",
  "creator-3.png",
  "creator-4.png",
  "creator-5.png",
  "creator-6.png",
  "hero-bg.png",
  "hero2-1.webp",
  "hero2-2.webp",
  "hero2-4.jpg",
  "hero3-bg.webp",
  "card-marketing.webp",
  "fileshare-preview.png",
  "card-payments.jpeg",
  "card-conversion.jpeg",
  "hero2-3.jpeg",
  "liga-strip.png",
];

async function createThumbnail(index: number, swordBuffer: Buffer): Promise<string> {
  const bgFile = BACKGROUND_IMAGES[index % BACKGROUND_IMAGES.length];
  const bgPath = path.join(IMAGES_DIR, bgFile);
  const size = 400;
  const swordSize = 200;
  const circleRadius = 120;
  
  // Load and resize background image to square
  const bgBuffer = await sharp(bgPath)
    .resize(size, size, { fit: 'cover', position: 'center' })
    .png()
    .toBuffer();
  
  // Create semi-transparent white circle for visibility against photos
  const circleSvg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size/2}" cy="${size/2}" r="${circleRadius}" fill="rgba(255,255,255,0.92)"/>
    </svg>
  `;
  const circleBuffer = await sharp(Buffer.from(circleSvg)).png().toBuffer();
  
  // Resize sword icon
  const resizedSword = await sharp(swordBuffer)
    .resize(swordSize, swordSize, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toBuffer();
  
  const filename = `product-thumb-${index + 1}.png`;
  const filepath = path.join(THUMBNAILS_DIR, filename);
  
  // Position sword in center
  const swordLeft = Math.floor((size - swordSize) / 2);
  const swordTop = Math.floor((size - swordSize) / 2);
  
  // Add slight rounded corners to the final image
  const roundedCornersMask = Buffer.from(`
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" rx="20" ry="20" fill="white"/>
    </svg>
  `);
  
  // First composite: background + white circle
  const withCircle = await sharp(bgBuffer)
    .composite([{ input: circleBuffer, blend: 'over' }])
    .png()
    .toBuffer();
  
  // Second composite: add sword with multiply (keeps only blue)
  const withSword = await sharp(withCircle)
    .composite([{ input: resizedSword, left: swordLeft, top: swordTop, blend: 'multiply' }])
    .png()
    .toBuffer();
  
  // Final: apply rounded corners
  await sharp(withSword)
    .composite([{ input: roundedCornersMask, blend: 'dest-in' }])
    .toFile(filepath);
  
  return `/images/thumbnails/${filename}`;
}

async function generateAllThumbnails() {
  console.log("Loading sword icon...");
  
  // Load the sword icon
  const swordBuffer = await sharp(SWORD_ICON)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .png()
    .toBuffer();
  
  console.log("Generating thumbnails with photo backgrounds...");
  
  // Generate thumbnails for each background image
  const thumbnailUrls: string[] = [];
  for (let i = 0; i < BACKGROUND_IMAGES.length; i++) {
    try {
      const url = await createThumbnail(i, swordBuffer);
      thumbnailUrls.push(url);
      console.log(`Created thumbnail ${i + 1}: ${url} (from ${BACKGROUND_IMAGES[i]})`);
    } catch (err) {
      console.error(`Error creating thumbnail ${i + 1} from ${BACKGROUND_IMAGES[i]}:`, err);
    }
  }
  
  return thumbnailUrls;
}

async function updateProducts() {
  try {
    // Generate thumbnails first
    const thumbnailUrls = await generateAllThumbnails();
    
    if (thumbnailUrls.length === 0) {
      throw new Error("No thumbnails were generated!");
    }
    
    // Get all products
    const allProducts = await db.select().from(products);
    console.log(`\nUpdating ${allProducts.length} products...`);
    
    let updated = 0;
    for (const product of allProducts) {
      // Assign thumbnail based on product index (cycling through available thumbnails)
      const thumbnailIndex = updated % thumbnailUrls.length;
      const imageUrl = thumbnailUrls[thumbnailIndex];
      
      await db.update(products)
        .set({ imageUrl })
        .where(eq(products.id, product.id));
      
      updated++;
      if (updated % 10 === 0) {
        console.log(`  Updated ${updated}/${allProducts.length}...`);
      }
    }
    
    console.log(`\nDone! Updated ${updated} products with unique photo thumbnails.`);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

updateProducts().catch((err) => {
  console.error(err);
  pool.end().then(() => process.exit(1));
});
