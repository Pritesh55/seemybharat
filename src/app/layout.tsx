// --------------------------------------------------------------
// React में layout.tsx एक कंटेनर (फ्रेम) की तरह होता है। इसके अंदर जो भी पेज लोड होगा (जैसे Home Page, Product Page), वह children नाम के वेरिएबल में आता है।
// --------------------------------------------------------------
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/common/theme-provider";
// --------------------------------
import { Toaster } from "@/components/ui/sonner";
// sonner यह notification वाला component है , जो shadcn ui से लिया है ||

// npx shadcn@latest add card dialog field popover separator badge sonner;

//  जब भी यूजर किसी प्रोडक्ट को Cart में ऐड करेगा, या पेमेंट सक्सेसफुल होगी, तो हम toast.success("Added to Cart!") चला सकेंगे और एक सुंदर नोटिफिकेशन पॉपअप स्क्रीन पर दिखेगा ||
// --------------------------------


// children: React.ReactNode (TypeScript Type):

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

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
  // जैसे Home Page, Product Page

  // React.ReactNode का मतलब है: "ऐसी कोई भी चीज़ जिसे React स्क्रीन पर दिखा सकता है" — जैसे HTML टैग्स (<div>, <p>), टेक्स्ट (String), नंबर, या कोई अन्य React कॉम्पोनेन्ट।

  // हमने TypeScript को बताया कि children के अंदर सिर्फ मान्य React तत्व ही आ सकते हैं।
  // Readonly<{ ... }> (सुरक्षा / Best Practice):

  // इसका मतलब है कि यह इनपुट सिर्फ पढ़ने (Read-Only) के लिए है। फंक्शन के अंदर कोई गलती से children = null करके डेटा को बदल न दे।

  return (
    // React/JavaScript में जब भी JSX को अगली लाइन में ले जाना हो, तो हमेशा return ( के साथ गोल ब्रैकेट (Parentheses) का उपयोग किया जाता है , या फिर टैग को return के ठीक आगे से शुरू किया जाता है ||

    // return के ठीक बाद ( लगाया ताकि JavaScript को पता चले कि JSX कोड नीचे तक जारी है ||

    <html lang="en"
      suppressHydrationWarning
      className={cn(geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground">

        {/* 2.2.3 Wrap Layout with ThemeProvider 
        
        पूरी वेबसाइट को ThemeProvider के अंदर लपेटना (wrap करना) ताकि हर पेज, हेडर और फुटर को डार्क/लाइट मोड का पता रहे।
        
        */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />

        </ThemeProvider>
      </body>
    </html>
  );
}



// LayoutProps<"/"> को क्यों हटाया?

// LayoutProps<"/"> Next.js 15/16 का एक आंतरिक (Internal experimental) टाइप है जो कभी-कभी अलग-अलग Next.js वर्जन्स में एरर दे देता है।

// Readonly<{ children: React.ReactNode }> पूरी दुनिया में React और Next.js का सबसे Standard, Stable और Safe तरीका है।