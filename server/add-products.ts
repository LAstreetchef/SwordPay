import "dotenv/config";
import { db } from "./db";
import { products, creators } from "@shared/schema";
import { eq } from "drizzle-orm";

async function addMoreProducts() {
  const allCreators = await db.select().from(creators);
  
  const productTemplates = [
    { name: "Digital Download Pack", price: 499, category: "digital" },
    { name: "Premium Tutorial", price: 1299, category: "digital" },
    { name: "Exclusive Content Bundle", price: 2499, category: "digital" },
    { name: "Monthly Subscription Box", price: 3999, category: "physical" },
    { name: "Personalized Consultation", price: 5999, category: "service" },
    { name: "Collector's Edition", price: 7999, category: "physical" },
    { name: "VIP Experience", price: 9999, category: "service" },
    { name: "Starter Kit", price: 799, category: "digital" },
    { name: "Pro Tools Bundle", price: 1999, category: "digital" },
    { name: "Masterclass Access", price: 4999, category: "digital" },
    { name: "Limited Print", price: 2999, category: "physical" },
    { name: "Quick Feedback Session", price: 3499, category: "service" },
    { name: "Resource Library Access", price: 1499, category: "digital" },
    { name: "Custom Commission (Basic)", price: 4499, category: "service" },
    { name: "Custom Commission (Premium)", price: 8999, category: "service" },
    { name: "Merch Bundle", price: 2199, category: "physical" },
  ];

  for (const creator of allCreators) {
    const existingProducts = await db.select().from(products).where(eq(products.creatorId, creator.id));
    const currentCount = existingProducts.length;
    
    // Add products to reach between 6 and 20
    const targetCount = Math.floor(Math.random() * 15) + 6; // 6-20
    const toAdd = Math.max(0, targetCount - currentCount);
    
    console.log(`${creator.name}: ${currentCount} existing, adding ${toAdd} more`);
    
    for (let i = 0; i < toAdd; i++) {
      const template = productTemplates[i % productTemplates.length];
      const priceVariation = Math.floor(Math.random() * 500) - 250; // +/- $2.50
      
      await db.insert(products).values({
        creatorId: creator.id,
        name: template.name,
        description: `Exclusive ${template.name.toLowerCase()} from ${creator.name}. High-quality content created with care.`,
        price: Math.max(99, template.price + priceVariation),
        category: template.category,
        isFeatured: Math.random() > 0.7,
        salesCount: Math.floor(Math.random() * 200),
      });
    }
  }
  
  console.log("Done adding products!");
  process.exit(0);
}

addMoreProducts().catch(console.error);
