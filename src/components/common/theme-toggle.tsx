"use client";

// 2.2.2 Create Theme Toggle Button Component

// यह theme-toggle.tsx कॉम्पोनेन्ट है जो next-themes से थीम स्टेट को मैनेज करता है और सन (Sun ☀️) / मून (Moon 🌙) आइकन दिखाता है। 

// यूजर स्क्रीन पर Sun ☀️ और Moon 🌙 आइकन वाले बटन पर क्लिक करके डार्क/लाइट मोड आसानी से बदल सके।



import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export const ThemeToggle = () => {

    const { theme, setTheme } = useTheme();
    // useTheme();: next-themes का हुक है जो वर्तमान थीम की जानकारी देता है और नई थीम सेट करने का फंक्शन (setTheme) देता है।

    return (

        <Button
            variant="outline" size="icon"
            onPress=
            {
                // React Aria के बटन में onClick की जगह onPress सबसे बेस्ट और एक्सेसिबल होता है 

                // (जो माउस क्लिक, टच और कीबोर्ड Enter/Spacebar सभी को एक साथ हैंडल करता है)।

                () => setTheme(theme === "dark" ? "light" : "dark")

                // एक क्लिक में टर्नरी ऑपरेटर (variable === value1 ? "value2" : value1) चेक करता है—अगर अभी theme की value (dark) है तो light कर दो, नहीं तो (light हैं तो) dark कर दो ||
            }
            className="relative rounded-full cursor-pointer"
            aria-label="Toggle Dark/Light Mode"
        >


            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />

            {/* यूजर स्क्रीन पर Sun ☀️ और Moon 🌙 आइकन वाले बटन पर क्लिक करके डार्क/लाइट मोड आसानी से बदल सके। */}

            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">
                Toggle theme
            </span>
        </Button>
    );
}
