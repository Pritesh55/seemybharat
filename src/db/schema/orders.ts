// Sub-step 4.6: Orders, Addresses & Payments Schema
// डिलीवरी एड्रेस, कस्टमर के ऑर्डर्स, ऑर्डर के अंदर के आइटम्स और उनकी कीमत को रिकॉर्ड करने के लिए।

// TypeScript & Drizzle समझें:
// orderStatusEnum: ऑर्डर की स्थिति (pending, paid, processing, shipped, delivered, cancelled)।
// priceAtPurchase: ऑर्डर बनने के समय जो कीमत थी वह यहाँ फिक्स हो जाती है (ताकि भविष्य में प्रोडक्ट की कीमत बदलने पर पुराने बिल पर कोई असर न पड़े - E-commerce Best Practice)।

import { pgTable, text, timestamp, uuid, integer, decimal, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./users";
import { products } from "./products";

// 1. Order Status Enums
export const orderStatusEnum = pgEnum("order_status", [
    "pending",
    "paid",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
]);

// 2. Shipping Addresses Table
export const addresses = pgTable("addresses", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
        .references(() => users.id, { onDelete: "cascade" })
        .notNull(),
    fullName: text("full_name").notNull(),
    phone: text("phone").notNull(),
    streetAddress: text("street_address").notNull(),
    city: text("city").notNull(),
    state: text("state").notNull(),
    postalCode: text("postal_code").notNull(),
    country: text("country").default("India").notNull(),
    isDefault: text("is_default").default("false").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// 3. Orders Table
export const orders = pgTable("orders", {
    id: uuid("id").defaultRandom().primaryKey(),
    orderNumber: text("order_number").notNull().unique(), // e.g. "ORD-2026-98741"
    userId: uuid("user_id")
        .references(() => users.id, { onDelete: "cascade" })
        .notNull(),
    addressId: uuid("address_id")
        .references(() => addresses.id)
        .notNull(),
    totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
    status: orderStatusEnum("status").default("pending").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// 4. Order Items Table (ऑर्डर में कौन-कौन से प्रोडक्ट्स खरीदे गए)
export const orderItems = pgTable("order_items", {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id")
        .references(() => orders.id, { onDelete: "cascade" })
        .notNull(),
    productId: uuid("productId")
        .references(() => products.id)
        .notNull(),
    quantity: integer("quantity").notNull(),
    priceAtPurchase: decimal("price_at_purchase", { precision: 10, scale: 2 }).notNull(), // बिलिंग के समय की कीमत
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
export type Address = typeof addresses.$inferSelect;
