// 4.4.1: src/db/schema/products.ts फाइल बनाएं

// प्रोडक्ट्स की सभी जानकारियाँ (
// टाइटल, डिस्क्रिप्शन, सेलिंग प्राइस, डिस्काउंटेड प्राइस, स्टॉक क्वांटिटी, SKU कोड, फीचर्ड स्टेटस) और उनकी एक से अधिक इमेजेस (Gallery) को स्टोर करने के लिए।

import { pgTable, text, timestamp, uuid, boolean, integer, decimal } from "drizzle-orm/pg-core";
import { categories, brands } from "./categories";

// 1. Products Table
export const products = pgTable("products", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(), // e.g. "apple-iphone-16-pro"
    description: text("description"),
    price: decimal("price", { precision: 10, scale: 2 }).notNull(), // Selling Price (₹)
    compareAtPrice: decimal("compare_at_price", { precision: 10, scale: 2 }), // Original MRP (फॉर डिस्काउंट % दिखाने के लिए)
    stock: integer("stock").default(0).notNull(), // इन्वेंट्री स्टॉक
    sku: text("sku").unique(), // Stock Keeping Unit (e.g. "IPHONE16-BLK-128")
    categoryId: uuid("category_id").references(() => categories.id, { onDelete: "set null" }),
    brandId: uuid("brand_id").references(() => brands.id, { onDelete: "set null" }),
    isFeatured: boolean("is_featured").default(false).notNull(), // होमपेज पर ट्रेंडिंग दिखाने के लिए
    isActive: boolean("is_active").default(true).notNull(), // ड्राफ्ट या लाइव
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// 2. Product Images Table (Supabase Storage URLs)
export const productImages = pgTable("product_images", {
    id: uuid("id").defaultRandom().primaryKey(),
    productId: uuid("product_id")
        .references(() => products.id, { onDelete: "cascade" })
        .notNull(),
    url: text("url").notNull(), // Supabase Storage Public URL
    altText: text("alt_text"),
    isPrimary: boolean("is_primary").default(false).notNull(), // मुख्य थंबनेल इमेज
    sortOrder: integer("sort_order").default(0).notNull(), // इमेजेस का क्रम (1, 2, 3...)
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type ProductImage = typeof productImages.$inferSelect;

// TypeScript & Drizzle समझें:
// --------
// decimal("price", { precision: 10, scale: 2 }):
// पैसों / रुपयों को कभी भी फ्लोट(float) में स्टोर नहीं करना चाहिए ताकि राउंडिंग की गलती न हो। precision: 10, scale: 2 का मतलब है ₹99, 999, 999.99 तक के सटीक पैसे।

// references(() => categories.id, { onDelete: "set null" }): फॉरेन की(Foreign Key) रिलेशन—अगर कोई कैटेगरी डिलीट भी हो जाए, तो प्रोडक्ट डिलीट नहीं होगा बल्कि उसकी  कैटेगरी null हो जाएगी।

// productImages टेबल: 1 प्रोडक्ट की कई इमेजेस हो सकती हैं। isPrimary: true वाली इमेज मुख्य थंबनेल बनेगी।