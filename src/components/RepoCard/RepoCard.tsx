"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import style from "./repoCard.module.css";

type RepoCardProps = {
    urlLinkMd: string;
    repoName: string;
    repoUrl: string;
};

export default function RepoCard({ urlLinkMd, repoName, repoUrl }: RepoCardProps) {
    const [content, setContent] = useState("No README.md found.");
    const [open, setOpen] = useState(false);

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
    // README laden
    useEffect(() => {
        fetch(urlLinkMd)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load Markdown");
                return res.text();
            })
            .then(setContent)
            .catch((err) => console.error(err));
    }, [urlLinkMd]);

    // modern, robust entry animation (no filter anims): fade + gentle rise + depth pop
    const entry = {
        initial: { opacity: 0, y: 60, scale: 0.985, rotateX: 4 },
        animate: { opacity: 1, y: 0, scale: 1, rotateX: 0 },
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    };

    return (
        <motion.div
            className={`w-[80%] m-2 flex flex-col items-start justify-center
        p-4 sm:p-6 border border-gray-700 rounded-2xl shadow-lg 
        bg-gray-900/70 transition-all duration-300 
        overflow-hidden ${style.baseStyle}`}
            initial={entry.initial}
            whileInView={entry.animate}
            transition={entry.transition}
            viewport={{ once: true, amount: 0.5 }}
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
        >
            <motion.h2
                className={`text-lg sm:text-2xl md:text-3xl font-bold mb-2 break-words ${style.baseStyleForHeader}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: true }}

            >
                {repoName}
            </motion.h2>

            <details
                className="w-full"
                onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
                style={{
                    color: isDarkMode ? "white" : "black",
                }}
            >
                <summary className="flex items-center justify-between cursor-pointer select-none list-none text-base sm:text-lg font-semibold">
                    <span style={{color: isDarkMode ? "white" : "black"}}>README.md</span>
                    {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5 transition-transform" />}
                </summary>

                <div
                    className={`
    prose
    mt-3 sm:mt-4 text-sm sm:text-base break-words w-full
    [&_a]:no-underline [&_a:hover]:underline
    [&_table]:block [&_code]:break-words [&_img]:h-auto
    [&_pre]:bg-transparent [&_pre]:p-0
    ${isDarkMode
                        ? "text-white [&_*]:text-white [&_code]:text-white [&_strong]:text-white [&_a]:text-white"
                        : "text-black [&_*]:text-black [&_code]:text-black [&_strong]:text-black [&_a]:text-black"
                    }
  `}
                >
                    <ReactMarkdown>{content}</ReactMarkdown>
                </div>

            </details>

            <br />
            <motion.a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm sm:text-base transition-all duration-500 text-sky-50"
                whileHover={{ translateY: -2, scale: 1.02 }}
            >
        <span
            className={`
            transition-all duration-500
            group-hover:text-transparent
            group-hover:bg-clip-text
            group-hover:bg-gradient-to-r
            group-hover:from-[#4986d5]
            group-hover:via-[#5a67d8]
            group-hover:to-[#805ad5] ${!isDarkMode ? "text-black" : ""}`}

        >
          Visit Repository
        </span>
            </motion.a>
        </motion.div>
    );
}
