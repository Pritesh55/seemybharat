// 3.3.2: Database Client कनेक्शन बनाना
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// लेकिन src/db/schema/index.ts
//  अभी पूरी तरह खाली है (export {};), उसमें कोई भी टेबल या ऑब्जेक्ट एक्सपोर्ट नहीं हुआ है। 
// जब TypeScript को उस फोल्डर में कोई एक्सपोर्टेड ऑब्जेक्ट नहीं मिलता, तो वह कहता है कि "मुझे schema मॉड्यूल में कुछ नहीं मिला"\।
// 👉 जैसे ही हम अपना पहला टेबल स्कीमा (users.ts) बनाएंगे और उसे एक्सपोर्ट करेंगे, यह एरर अपने आप पूरी तरह गायब हो जाएगा!

// Next.js Server Actions और API Routes में डेटाबेस क्वेरीज़ चलाने के लिए एक सिंगल (Singleton) Drizzle इंस्टेंस तैयार करना।

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("DATABASE_URL is not defined in environment variables");
}

// Next.js Dev मोड में बार-बार नए DB कनेक्शन्स बनने से रोकने के लिए Singleton pattern
const globalForDb = globalThis as unknown as {
    conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(connectionString, { prepare: false });

if (process.env.NODE_ENV !== "production") {
    globalForDb.conn = conn;
}

export const db = drizzle(conn, { schema });
