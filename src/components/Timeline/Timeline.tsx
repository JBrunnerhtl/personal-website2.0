"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const entries = [
    {
        year: "2022",
        title: "First Contact with Coding",
        description: "Started my programming journey by building a functional calculator using JS, HTML, and CSS."
    },
    {
        year: "2023",
        title: "HTL Leonding",
        description: "Began attending HTL Leonding (IT branch), focusing on software development and C# fundamentals."
    },
    {
        year: "2024",
        title: "Advancing Skills",
        description: "Moved up to the second grade and expanded my stack with C, C#, HTML, CSS, and JavaScript."
    },
    {
        year: "2025",
        title: "Continuous Progress",
        description: "Successfully finished the second grade and advanced to the third year of my IT education."
    },
    {
        year: "2026",
        title: "Current Focus",
        description: "Currently mastering Java, TypeScript, and SQL while exploring new technologies to broaden my IT expertise."
    },
];

export function Timeline() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        setIsDarkMode(document.documentElement.classList.contains("dark"));
        const handler = (e: Event) => {
            const customEvent = e as CustomEvent<"light" | "dark">;
            setIsDarkMode(customEvent.detail === "dark");
        };
        window.addEventListener("themeChanged", handler);
        return () => window.removeEventListener("themeChanged", handler);
    }, []);

    const accentColor = isDarkMode ? "#4986d5" : "#82a0dc";
    const glassGradient = isDarkMode
        ? "linear-gradient(135deg, rgba(73,134,213,0.15), rgba(90,103,216,0.1), rgba(128,90,213,0.1))"
        : "linear-gradient(135deg, rgba(200,210,240,0.5), rgba(170,185,230,0.4), rgba(190,200,245,0.5))";
    const glassBorder = isDarkMode ? "1px solid rgba(100,100,120,0.4)" : "1px solid rgba(150,150,180,0.3)";

    return (
        <div className="w-full min-h-screen py-32 px-4" style={{ fontFamily: "Arial, sans-serif" }}>
            <div className="relative max-w-6xl mx-auto flex flex-col items-center">


                <div className="relative z-10 flex flex-col items-center w-full">

                    <div
                        className="absolute left-[26px] md:left-1/2 transform -translate-x-1/2 w-10 h-[3px] rounded-full"
                        style={{ background: accentColor, boxShadow: `0 0 15px ${accentColor}` }}
                    />
                    <div
                        className="absolute left-[26px] md:left-1/2 transform -translate-x-1/2 top-0 w-[2px] h-10"
                        style={{ background: accentColor }}
                    />
                </div>

                <div
                    className="absolute left-[26px] md:left-1/2 transform md:-translate-x-1/2 w-[2px] h-full top-0 z-0"
                    style={{
                        background: accentColor,
                        boxShadow: `0 0 15px ${accentColor}`,
                    }}
                />

                <div className="w-full space-y-20 md:space-y-0 relative z-10 pt-10 pb-10">
                    {entries.map((item, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div key={index} className="grid grid-cols-[52px_1fr] md:grid-cols-[1fr_auto_1fr] items-center w-full md:min-h-[220px]">

                                <div className="hidden md:flex w-full justify-end pr-12">
                                    {!isEven && <TimelineCard item={item} isDarkMode={isDarkMode} gradient={glassGradient} border={glassBorder} direction={-1} />}
                                </div>

                                <div className="flex justify-center items-center w-[52px] md:w-auto">
                                    <div
                                        className="w-4 h-4 rounded-full border-2 border-white shrink-0 z-20"
                                        style={{ background: accentColor, boxShadow: `0 0 15px ${accentColor}` }}
                                    />
                                </div>

                                <div className="flex w-full justify-start pl-4 md:pl-12">
                                    {isEven ? (
                                        <TimelineCard item={item} isDarkMode={isDarkMode} gradient={glassGradient} border={glassBorder} direction={1} />
                                    ) : (
                                        <div className="md:hidden w-full">
                                            <TimelineCard item={item} isDarkMode={isDarkMode} gradient={glassGradient} border={glassBorder} direction={1} />
                                        </div>
                                    )}
                                </div>

                            </div>
                        );
                    })}
                </div>

                <div className="relative z-10 flex flex-col items-center w-full">
                    <div
                        className="absolute left-[26px] md:left-1/2 transform -translate-x-1/2 bottom-0 w-[2px] h-10"
                        style={{ background: accentColor }}
                    />
                    <div
                        className="absolute left-[26px] md:left-1/2 transform -translate-x-1/2 bottom-0 w-10 h-[3px] rounded-full"
                        style={{ background: accentColor, boxShadow: `0 0 15px ${accentColor}` }}
                    />
                </div>

            </div>
        </div>
    );
}

function TimelineCard({ item, isDarkMode, gradient, border, direction }: any) {
    return (
        <motion.div
            className="w-full rounded-2xl p-6 backdrop-blur-md"
            style={{
                background: gradient,
                border: border,
                boxShadow: isDarkMode ? "0 0 20px rgba(73,134,213,0.15)" : "0 0 20px rgba(130,160,220,0.15)"
            }}
            initial={{ opacity: 0, x: 20 * direction }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
      <span className={`text-[25px] font-bold tracking-widest uppercase ${isDarkMode ? "text-blue-300" : "text-blue-600"}`}>
        {item.year}
      </span>
            <h2 className={`text-xl font-bold mt-1 mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                {item.title}
            </h2>
            <p className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                {item.description}
            </p>
        </motion.div>
    );
}