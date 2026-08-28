// 4.6.2: src/db/schema/payments.ts फाइल बनाएं

// Razorpay से आने वाले Payment IDs (razorpay_order_id, razorpay_payment_id, razorpay_signature) और स्टेटस (created, captured, failed, refunded) को सुरक्षित स्टोर करने के लिए।


import { pgTable, text, timestamp, uuid, decimal, pgEnum } from "drizzle-orm/pg-core";
import { orders } from "./orders";

export const paymentStatusEnum = pgEnum("payment_status", [
    "created",
    "captured",
    "failed",
    "refunded",
]);

export const payments = pgTable("payments", {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id")
        .references(() => orders.id, { onDelete: "cascade" })
        .notNull(),
    razorpayOrderId: text("razorpay_order_id").notNull(),
    razorpayPaymentId: text("razorpay_payment_id"),
    razorpaySignature: text("razorpay_signature"),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    currency: text("currency").default("INR").notNull(),
    status: paymentStatusEnum("status").default("created").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Payment = typeof payments.$inferSelect;
