// src/db/schema/categories.ts 

//  Sub-step 4.2: Categories & Brands Schema

// क्यों किया (Why): 
// --------------------
// प्रोडक्ट्स को श्रेणियों में बांटने के लिए (जैसे "Electronics", "Fashion", "Footwear") और ब्रांड्स (जैसे "Apple", "Nike", "Sony") को मैनेज करने के लिए।

// TypeScript & Drizzle समझें:

// slug: URL-friendly नाम (उदा. electronics ताकि URL बने /category/electronics)।

// imageUrl: Supabase Storage में स्टोर की गई कैटेगरी बैनर/इमेज का लिंक।

import { pgTable, text, timestamp, uuid, boolean } from "drizzle-orm/pg-core";

// 1. Categories Table (जैसे: Electronics, Clothing, Home)
export const categories = pgTable("categories", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    imageUrl: text("image_url"),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// 2. Brands Table (जैसे: Apple, Samsung, Nike)
export const brands = pgTable("brands", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    logoUrl: text("logo_url"),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Category = typeof categories.$inferSelect;
export type Brand = typeof brands.$inferSelect;
