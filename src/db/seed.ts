//  Sub-step 5.2: Seed Script (शुरुआती डेटा डालना)

// वेबसाइट को लाइव टेस्ट करने के लिए हमें कुछ शुरुआती श्रेणियां (Categories), ब्रांड्स और प्रोडक्ट्स चाहिए ताकि हमारा होमपेज और स्टोरफ्रंट भरा हुआ और सुंदर दिखे।

// एक क्लिक में डेटाबेस के अंदर रियल दिखने वाले डेमो प्रोडक्ट्स, इमेजेस और कैटेगरीज इन्सर्ट करने के लिए।

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { db } from "./index";
import { categories, brands, products, productImages } from "./schema";

async function runSeed() {
    console.log("🌱 Seeding database with initial e-commerce data...");

    try {
        // 1. Insert Categories
        console.log("📁 Creating categories...");
        const [electronics, fashion, footwear] = await db
            .insert(categories)
            .values([
                {
                    name: "Electronics & Gadgets",
                    slug: "electronics",
                    description: "Smartphones, Laptops, Audio and High-tech accessories",
                    imageUrl: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80",
                },
                {
                    name: "Fashion & Apparel",
                    slug: "fashion",
                    description: "Trendy menswear, womenswear, and luxury fashion",
                    imageUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
                },
                {
                    name: "Footwear & Sneakers",
                    slug: "footwear",
                    description: "Premium running shoes, sneakers, and casual boots",
                    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
                },
            ])
            .returning();

        // 2. Insert Brands
        console.log("🏷️ Creating brands...");
        const [apple, nike, sony] = await db
            .insert(brands)
            .values([
                { name: "Apple", slug: "apple" },
                { name: "Nike", slug: "nike" },
                { name: "Sony", slug: "sony" },
            ])
            .returning();

        // 3. Insert Products
        console.log("📦 Creating products...");
        const [iphone, headphones, sneakers, hoodie] = await db
            .insert(products)
            .values([
                {
                    name: "Apple iPhone 16 Pro Max - 256GB Titanium",
                    slug: "apple-iphone-16-pro-max-titanium",
                    description: "Super Retina XDR display with ProMotion, A18 Pro chip, and Grade 5 Titanium finish.",
                    price: "134900.00",
                    compareAtPrice: "144900.00",
                    stock: 25,
                    sku: "APL-IP16PM-256",
                    categoryId: electronics.id,
                    brandId: apple.id,
                    isFeatured: true,
                },
                {
                    name: "Sony WH-1000XM5 Wireless Noise-Cancelling Headphones",
                    slug: "sony-wh1000xm5-wireless-headphones",
                    description: "Industry-leading noise cancellation with two processors and 8 microphones for crystal clear audio.",
                    price: "29990.00",
                    compareAtPrice: "34990.00",
                    stock: 40,
                    sku: "SNY-WH1000XM5-BLK",
                    categoryId: electronics.id,
                    brandId: sony.id,
                    isFeatured: true,
                },
                {
                    name: "Nike Air Max 270 React Sneakers",
                    slug: "nike-air-max-270-react",
                    description: "The Nike Air Max 270 delivers unrivaled, all-day comfort with a bold, modern silhouette.",
                    price: "11995.00",
                    compareAtPrice: "13995.00",
                    stock: 30,
                    sku: "NKE-AM270-RED",
                    categoryId: footwear.id,
                    brandId: nike.id,
                    isFeatured: true,
                },
                {
                    name: "Premium Heavyweight Cotton Oversized Hoodie",
                    slug: "premium-heavyweight-oversized-hoodie",
                    description: "450 GSM luxury French Terry cotton, drop shoulder relaxed fit, pre-shrunk fabric.",
                    price: "3499.00",
                    compareAtPrice: "4999.00",
                    stock: 60,
                    sku: "FSH-HD-BLK-L",
                    categoryId: fashion.id,
                    brandId: null,
                    isFeatured: true,
                },
            ])
            .returning();

        // 4. Insert Product Images
        console.log("🖼️ Linking product images...");
        await db.insert(productImages).values([
            {
                productId: iphone.id,
                url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80",
                altText: "iPhone 16 Pro Max",
                isPrimary: true,
                sortOrder: 1,
            },
            {
                productId: headphones.id,
                url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
                altText: "Sony WH-1000XM5 Headphones",
                isPrimary: true,
                sortOrder: 1,
            },
            {
                productId: sneakers.id,
                url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
                altText: "Nike Air Max 270",
                isPrimary: true,
                sortOrder: 1,
            },
            {
                productId: hoodie.id,
                url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80",
                altText: "Oversized Hoodie",
                isPrimary: true,
                sortOrder: 1,
            },
        ]);

        console.log("✅ Database seeding completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
}

runSeed();
