"use client";

// "use client": यह बताता है कि यह कोड ब्राउज़र (Client) में चलेगा, क्योंकि ThemeToggle यूजर के button के click को और लोकल स्टोरेज को हैंडल करता है। 

// 2.2.1 Create Theme Provider Component

// यह next-themes का Context Provider है, जो app में theme toggle functionality run करने के लिए required होता है।   

// createContext(): React का एक फंक्शन, जो ThemeProvider कॉम्पोनेन्ट के अंदर एक "Context" बनाता है। यही Context थीम डेटा (theme value) और उसे बदलने वाली function को app की बाकी सभी निचली कॉम्पोनेन्ट्स (children) तक पहुंचाता है, बिना props को बार-बार पास किए (Prop Drilling से बचाता है)।



import * as React from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider(
    { children, ...props }:
        React.ComponentProps<typeof NextThemesProvider>
)

// {children, ...props}:

// ...props: यह rest parameter है। जो भी extra settings (जैसे attribute, defaultTheme, enableSystem, disableTransitionOnChange) बाहर से आएंगी, वो all एक props object में store हो जाएंगी।

// TypeScript generics <typeof NextThemesProvider>: यह सुनिश्चित करता है कि ThemeProvider कॉम्पोनेन्ट ठीक वैसे ही काम करे जैसा original next-themes के ThemeProvider कॉम्पोनेन्ट करता है। यह type safety देता है।
{
    return (
        <NextThemesProvider {...props}>

            {children}

            {/* children में layout.tsx से आने वाले all components display होंगे 
        
        children (React.ReactNode): यह उस content को Represent करता है जिसे ThemeProvider के अंदर रखा जाएगा।

        */}
        </NextThemesProvider>
    )
}
