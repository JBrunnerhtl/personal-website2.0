"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import style from "./card.module.css";

type CardProps = {
    header: string;
    content: string;
    time: number;
};

export default function Card({ header, content, time }: CardProps) {
    const delay =
        typeof window !== "undefined" && window.innerWidth < 768 ? 0 : time / 5;

    // Theme detection
    const [isDarkMode, setIsDarkMode] = useState(
        typeof window !== "undefined" &&
        document.documentElement.classList.contains("dark")
    );

    useEffect(() => {
        const handler = (e: Event) => {
            const customEvent = e as CustomEvent<"light" | "dark">;
            setIsDarkMode(customEvent.detail === "dark");
        };

        window.addEventListener("themeChanged", handler);
        return () => window.removeEventListener("themeChanged", handler);
    }, []);

    return (
        <motion.div
            className={`rounded-2xl border p-6 m-5 backdrop-blur-lg shadow-lg transition-all duration-700 ease-in-out ${style.baseStyle}`}
            style={{
                background: isDarkMode
                    ? "linear-gradient(135deg, rgba(73,134,213,0.15), rgba(90,103,216,0.1), rgba(128,90,213,0.1))"
                    : "linear-gradient(135deg, rgba(200,210,240,0.5), rgba(170,185,230,0.4), rgba(190,200,245,0.5))",
                border: isDarkMode ? "1px solid rgba(100,100,120,0.4)" : "1px solid rgba(150,150,180,0.3)",
                boxShadow: isDarkMode
                    ? "0 0 20px rgba(73,134,213,0.3), 0 0 40px rgba(90,103,216,0.2)"
                    : "0 0 25px rgba(130,160,220,0.4), 0 0 45px rgba(150,180,240,0.3)",
            }}
            whileHover={{
                boxShadow: isDarkMode
                    ? "0 0 35px rgba(73,134,213,0.45), 0 0 65px rgba(90,103,216,0.35)"
                    : "0 0 45px rgba(130,160,220,0.55), 0 0 75px rgba(150,180,240,0.45)",
                scale: 1.03,
                transition: { duration: 0.35, ease: "easeInOut" },
            }}
            initial={{ opacity: 0, y: 60, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: delay,
                ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.h2
                className={`text-2xl font-bold mb-4 text-center ${style.colorTheme} ${
                    isDarkMode ? "text-sky-100" : "text-sky-700"
                } transition-colors duration-700 ease-in-out`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.6,
                    delay: delay + 0.1,
                    ease: [0.25, 0.1, 0.25, 1],
                }}
                viewport={{ once: true }}
            >
                {header}
            </motion.h2>

            <motion.p
                className={`text-center ${
                    isDarkMode ? "text-sky-50" : "text-gray-800"
                } transition-colors duration-700 ease-in-out`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.8,
                    delay: delay + 0.2,
                    ease: [0.25, 0.1, 0.25, 1],
                }}
                viewport={{ once: true }}
            >
                {content}
            </motion.p>
        </motion.div>
    );
}
