import "dotenv/config";
import sharp from "sharp";
import { db, pool } from "./db";
import { products, creators } from "@shared/schema";
import { eq } from "drizzle-orm";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.join(__dirname, "../client/public/images");
const THUMBNAILS_DIR = path.join(IMAGES_DIR, "thumbnails");

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

// Sword icon SVG (the SwordPay logo - matches product-placeholder.png)
const SWORD_SVG = `
<svg width="80" height="120" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" stroke="#1e40af" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <!-- Blade tip -->
    <line x1="40" y1="5" x2="40" y2="45"/>
    <!-- Cross guard -->
    <line x1="20" y1="25" x2="60" y2="25"/>
    <!-- Left side of shield/pommel -->
    <line x1="25" y1="45" x2="25" y2="100"/>
    <!-- Right side of shield/pommel -->
    <line x1="55" y1="45" x2="55" y2="100"/>
    <!-- Center line through handle -->
    <line x1="40" y1="45" x2="40" y2="115"/>
    <!-- Shield bottom left -->
    <line x1="25" y1="100" x2="40" y2="115"/>
    <!-- Shield bottom right -->
    <line x1="55" y1="100" x2="40" y2="115"/>
    <!-- Top connector left -->
    <line x1="25" y1="45" x2="40" y2="45"/>
    <!-- Top connector right -->
    <line x1="40" y1="45" x2="55" y2="45"/>
  </g>
</svg>
`;

async function createGradientImage(fromColor: string, toColor: string, size: number = 400): Promise<Buffer> {
  // Create SVG gradient
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
  
  return Buffer.from(svg);
}

async function createThumbnail(index: number): Promise<string> {
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const size = 400;
  
  // Create gradient background
  const bgSvg = await createGradientImage(gradient.from, gradient.to, size);
  
  // Create sword overlay SVG with white semi-transparent background circle
  const swordWithBg = Buffer.from(`
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size/2}" cy="${size/2}" r="70" fill="rgba(255,255,255,0.85)"/>
      <g transform="translate(${size/2 - 40}, ${size/2 - 60})">
        ${SWORD_SVG.replace(/<\/?svg[^>]*>/g, '')}
      </g>
    </svg>
  `);
  
  const filename = `product-thumb-${index + 1}.png`;
  const filepath = path.join(THUMBNAILS_DIR, filename);
  
  // Composite the images
  await sharp(bgSvg)
    .resize(size, size)
    .png()
    .composite([{
      input: swordWithBg,
      blend: 'over'
    }])
    .toFile(filepath);
  
  return `/images/thumbnails/${filename}`;
}

async function generateAllThumbnails() {
  console.log("Generating thumbnails...");
  
  // Generate 20 different thumbnails
  const thumbnailUrls: string[] = [];
  for (let i = 0; i < 20; i++) {
    const url = await createThumbnail(i);
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
