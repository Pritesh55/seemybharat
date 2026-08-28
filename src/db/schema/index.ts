// 3.3.3: src/db/schema/index.ts बनाना (Barrel Export)

// यह फाइल आगे आने वाले सभी ((Users, Products, Orders आदि)) DB schema tables को एक साथ एक्सपोर्ट करेगी

// 🔹 Sub-step 4.3: src/db/schema/index.ts में एक्सपोर्ट जोड़ना


// All Schema Tables Export
export * from "./users";
export * from "./categories";
export * from "./products";
export * from "./cart";
export * from "./orders";
export * from "./payments";

