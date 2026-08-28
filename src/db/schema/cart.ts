// 4.5.1: जब कोई लॉगिन किया हुआ यूजर कार्ट में आइटम ऐड करेगा, तो उसका कार्ट डेटाबेस में सुरक्षित रहेगा ताकि अगर वह मोबाइल से लैपटॉप पर जाए, तो भी उसका कार्ट खाली न हो।


// TypeScript & Drizzle समझें:
// quantity: कार्ट में उस आइटम की संख्या (जैसे 1, 2, 3 पीस)।
// wishlist: ग्राहक द्वारा पसंद किए गए (Hearted ❤️) प्रोडक्ट्स।

import { pgTable, timestamp, uuid, integer, unique } from "drizzle-orm/pg-core";
import { users } from "./users";
import { products } from "./products";

// 1. User Cart Table
export const cartItems = pgTable(
    "cart_items",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        userId: uuid("user_id")
            .references(() => users.id, { onDelete: "cascade" })
            .notNull(),
        productId: uuid("product_id")
            .references(() => products.id, { onDelete: "cascade" })
            .notNull(),
        quantity: integer("quantity").default(1).notNull(),
        createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
        updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
    },
    (table) => [
        // 1 यूजर के कार्ट में 1 प्रोडक्ट 1 ही बार आ सकता है (क्वांटिटी बढ़ेगी)
        unique("user_product_unique").on(table.userId, table.productId),
    ]
);

// 2. User Wishlist Table
export const wishlist = pgTable(
    "wishlist",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        userId: uuid("user_id")
            .references(() => users.id, { onDelete: "cascade" })
            .notNull(),
        productId: uuid("product_id")
            .references(() => products.id, { onDelete: "cascade" })
            .notNull(),
        createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    },
    (table) => [
        unique("wishlist_user_product_unique").on(table.userId, table.productId),
    ]
);

export type CartItem = typeof cartItems.$inferSelect;
export type WishlistItem = typeof wishlist.$inferSelect;
