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

// Different gradient backgrounds for variety
const GRADIENTS = [
  { from: "#FF6B6B", to: "#4ECDC4" },  // coral to teal
  { from: "#667eea", to: "#764ba2" },  // purple gradient
  { from: "#f093fb", to: "#f5576c" },  // pink
  { from: "#4facfe", to: "#00f2fe" },  // blue cyan
  { from: "#43e97b", to: "#38f9d7" },  // green mint
  { from: "#fa709a", to: "#fee140" },  // pink yellow
  { from: "#30cfd0", to: "#330867" },  // cyan purple
  { from: "#a8edea", to: "#fed6e3" },  // soft pastel
  { from: "#ff9a9e", to: "#fecfef" },  // soft pink
  { from: "#667eea", to: "#00d4ff" },  // indigo blue
  { from: "#f83600", to: "#f9d423" },  // orange yellow
  { from: "#00c6fb", to: "#005bea" },  // sky blue
  { from: "#8E2DE2", to: "#4A00E0" },  // deep purple
  { from: "#FF416C", to: "#FF4B2B" },  // red orange
  { from: "#654ea3", to: "#eaafc8" },  // purple pink
  { from: "#11998e", to: "#38ef7d" },  // green gradient
  { from: "#FC466B", to: "#3F5EFB" },  // pink blue
  { from: "#0F2027", to: "#2C5364" },  // dark teal
  { from: "#373B44", to: "#4286f4" },  // dark blue
  { from: "#834d9b", to: "#d04ed6" },  // magenta
];

async function createGradientBackground(fromColor: string, toColor: string, size: number = 400): Promise<Buffer> {
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${fromColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${toColor};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" rx="20" ry="20"/>
    </svg>
  `;
  
  return sharp(Buffer.from(svg)).png().toBuffer();
}

async function createThumbnail(index: number, swordBuffer: Buffer): Promise<string> {
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const size = 400;
  const swordSize = 140; // Sword icon size - proportional to thumbnail
  const circleRadius = 85;
  
  // Create gradient background
  const bgBuffer = await createGradientBackground(gradient.from, gradient.to, size);
  
  // Create white circle with sword on it (pre-composited)
  // First create the circle
  const circleSvg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size/2}" cy="${size/2}" r="${circleRadius}" fill="white"/>
    </svg>
  `;
  
  // Create white circle buffer
  const circleBuffer = await sharp(Buffer.from(circleSvg)).png().toBuffer();
  
  // Resize sword icon and extract just the sword (make white transparent)
  const resizedSword = await sharp(swordBuffer)
    .resize(swordSize, swordSize, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toBuffer();
  
  const filename = `product-thumb-${index + 1}.png`;
  const filepath = path.join(THUMBNAILS_DIR, filename);
  
  // Position sword in center
  const swordLeft = Math.floor((size - swordSize) / 2);
  const swordTop = Math.floor((size - swordSize) / 2);
  
  // Composite: gradient -> white circle -> sword (multiply blend to show only the blue)
  await sharp(bgBuffer)
    .composite([
      { input: circleBuffer, blend: 'over' },
      { input: resizedSword, left: swordLeft, top: swordTop, blend: 'multiply' }
    ])
    .toFile(filepath);
  
  return `/images/thumbnails/${filename}`;
}

async function generateAllThumbnails() {
  console.log("Loading sword icon...");
  
  // Load the sword icon
  const swordBuffer = await sharp(SWORD_ICON)
    .flatten({ background: { r: 255, g: 255, b: 255 } }) // Remove any alpha, use white bg
    .png()
    .toBuffer();
  
  console.log("Generating thumbnails...");
  
  // Generate 20 different thumbnails
  const thumbnailUrls: string[] = [];
  for (let i = 0; i < 20; i++) {
    const url = await createThumbnail(i, swordBuffer);
    thumbnailUrls.push(url);
    console.log(`Created thumbnail ${i + 1}: ${url}`);
  }
  
  return thumbnailUrls;
}

async function updateProducts() {
  try {
    // Generate thumbnails first
    const thumbnailUrls = await generateAllThumbnails();
    
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
    
    console.log(`\nDone! Updated ${updated} products with unique thumbnails.`);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

updateProducts().catch((err) => {
  console.error(err);
  pool.end().then(() => process.exit(1));
});
