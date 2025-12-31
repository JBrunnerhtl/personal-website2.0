"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        const root = document.documentElement;

        if (storedTheme) {
            setTheme(storedTheme);
            root.classList.toggle("dark", storedTheme === "dark");
        } else {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }

        // ✅ gleich beim Laden Event auslösen (z. B. für SSR)
        window.dispatchEvent(new CustomEvent("themeChanged", { detail: storedTheme ?? "dark" }));
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);

        const root = document.documentElement;
        root.classList.toggle("dark", newTheme === "dark");

        localStorage.setItem("theme", newTheme);

        // ✅ hier Event dispatchen
        window.dispatchEvent(new CustomEvent("themeChanged", { detail: newTheme }));
    };

    return (
        <motion.button
            onClick={toggleTheme}
            className="fixed top-5 right-5 z-50 p-3 rounded-full shadow-lg backdrop-blur-md
                 border border-white/10 hover:scale-110 transition-transform
                 bg-gradient-to-br from-[#4986d5] to-[#805ad5]"
            whileTap={{ scale: 0.9 }}
        >
            <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                    <motion.div
                        key="moon"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Moon className="text-white" size={22} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="sun"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Sun className="text-white" size={22} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
