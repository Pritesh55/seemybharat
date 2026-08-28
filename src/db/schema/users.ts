//  Sub-step 4.1: Users & Profiles Table Schema
// // कार्य (Action):

// src/db/schema/users.ts
//  नाम की नई फाइल बनाएं।

// क्यों किया (Why): जब यूजर Supabase Auth से साइन-अप करेगा, तो उसकी प्रोफाइल, रोल (customer या admin), नाम, फोन नंबर और अवतार (Profile Picture) यहाँ स्टोर होंगे।

// TypeScript & Drizzle समझें:

// pgTable("users", { ... }): PostgreSQL में users नाम का टेबल बनाता है।

// uuid("id").primaryKey(): Supabase Auth के auth.users.id से मैच होने वाला यूनीक UUID।

// pgEnum("user_role", ["customer", "admin"]): डेटाबेस लेवल पर तय करता है कि यूजर सिर्फ customer या admin ही हो सकता है (Security Best Practice)।

// timestamp("created_at").defaultNow(): अकाउंट बनने का सटीक समय खुद-ब-खुद रिकॉर्ड करेगा।

import { pgTable, text, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";

// 1. User Roles: ग्राहक या एडमिन
export const userRoleEnum = pgEnum("user_role", ["customer", "admin"]);

// 2. Users / Profiles Table (Supabase auth.users से लिंक्ड)
export const users = pgTable("users", {
    id: uuid("id").primaryKey(), // Supabase Auth User ID
    email: text("email").notNull().unique(),
    fullName: text("full_name"),
    avatarUrl: text("avatar_url"),
    phone: text("phone"),
    role: userRoleEnum("role").default("customer").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// TypeScript Types (Type Safety के लिए)
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
