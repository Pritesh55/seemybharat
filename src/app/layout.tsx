import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prit E-Commerce | Modern Online Store",
  description: "High-performance e-commerce platform built with Next.js, Supabase, and Drizzle ORM.",
};




export default function RootLayout(
  { children }: Readonly<{ children: React.ReactNode; }>
) {

  // { children } (JavaScript Destructuring):

  // React में layout.tsx एक कंटेनर (फ्रेम) की तरह होता है। इसके अंदर जो भी पेज लोड होगा (जैसे Home Page, Product Page), वह children नाम के वेरिएबल में आता है।
  // children: React.ReactNode (TypeScript Type):

  // React.ReactNode का मतलब है: "ऐसी कोई भी चीज़ जिसे React स्क्रीन पर दिखा सकता है" — जैसे HTML टैग्स (<div>, <p>), टेक्स्ट (String), नंबर, या कोई अन्य React कॉम्पोनेन्ट।
  // हमने TypeScript को बताया कि children के अंदर सिर्फ मान्य React तत्व ही आ सकते हैं।
  // Readonly<{ ... }> (सुरक्षा / Best Practice):

  // इसका मतलब है कि यह इनपुट सिर्फ पढ़ने (Read-Only) के लिए है। फंक्शन के अंदर कोई गलती से children = null करके डेटा को बदल न दे।
  // LayoutProps<"/"> को क्यों हटाया?

  // LayoutProps<"/"> Next.js 15/16 का एक आंतरिक (Internal experimental) टाइप है जो कभी-कभी अलग-अलग Next.js वर्जन्स में एरर दे देता है।
  // Readonly<{ children: React.ReactNode }> पूरी दुनिया में React और Next.js का सबसे Standard, Stable और Safe तरीका है।
  return (
    <html
      lang="en"
      className={cn(geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground">{children}</body>
    </html>
  );
}
