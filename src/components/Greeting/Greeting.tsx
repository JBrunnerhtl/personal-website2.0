"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./greeting.module.css";

function Greeting() {
    const [name, setName] = useState<string>("Jan");
    const [time, setTime] = useState(new Date());

    // Uhrzeit-Update (jede Minute)
    useEffect(() => {
        const updateTime = () => setTime(new Date());
        updateTime();
        const interval = setInterval(updateTime, 60_000);
        return () => clearInterval(interval);
    }, []);

    // Name wechseln
    useEffect(() => {
        const iv = setInterval(() => setName((prev) => (prev === "Jan" ? "JBrunnerhtl" : "Jan")), 3000);
        return () => clearInterval(iv);
    }, []);

    // greetingText abhängig von Stunde (memo so es nicht bei jedem Render neu gebaut wird)
    const greetingText = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning, I'm";
        if (hour < 18) return "Good Afternoon, I'm";
        return "Good Evening, I'm";
    }, [time]);

    // Build array of chars (keeps spaces as nbsp). For small screens insert line breaks.
    const chars = useMemo(() => {
        const arr = greetingText.split("").map((ch, i) => ({
            key: `g-${i}`,
            char: ch === " " ? "\u00A0" : ch,
        }));
        // responsive line breaks for narrow screens
        if (typeof window !== "undefined" && window.innerWidth < 768) {
            // find first and last space roughly
            const firstSpace = arr.findIndex((c) => c.char === "\u00A0");
            const lastSpace = (() => {
                for (let i = arr.length - 1; i >= 0; i--) if (arr[i].char === "\u00A0") return i;
                return -1;
            })();
            if (firstSpace !== -1) arr.splice(firstSpace, 0, { key: "br1", char: "<br>" } as any);
            if (lastSpace !== -1 && lastSpace + 1 < arr.length) arr.splice(lastSpace + 2, 0, { key: "br2", char: "<br>" } as any);
        }
        return arr;
    }, [greetingText]);

    // Framer Motion Variants
    const container = {
        hidden: { opacity: 1 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
                delayChildren: 0.15,
            },
        },
    } as const;

    const charVariant = {
        hidden: { opacity: 0, y: 8, scale: 0.98 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
    } as const;

    const nameVariant = {
        initial: { opacity: 0, y: 6, scale: 0.985 },
        animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
        exit: { opacity: 0, y: -8, scale: 0.985, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
    } as const;

    return (
        <>
            <div className="pt-24" /> {/* spacing top - adapt if needed */}
            <div className="flex flex-col items-center justify-start w-full">
                {/* greeting line with staggered chars */}
                <motion.h1
                    id="greeting"
                    className={`leading-none text-sky-50 text-center m-5 ${styles.greetingHeading}`}
                    variants={container}
                    initial="hidden"
                    animate="show"

                    aria-label={greetingText}
                    style={{textShadow: "0 0 25px rgba(128, 90, 213, 0.25)",}}
                >
                    {chars.map((c) =>
                        // handle inserted <br> placeholders
                        (c as any).char === "<br>" ? (
                            <br key={c.key} />
                        ) : (
                            <motion.span key={c.key} className={styles.charInline} variants={charVariant}>
                                {c.char}
                            </motion.span>
                        )
                    )}
                </motion.h1>

                {/* name that swaps — AnimatePresence gives nice exit/enter */}
                <div className="relative h-[3.5rem] sm:h-[4.5rem]">
                    <AnimatePresence mode="wait">
                        <motion.h2
                            key={name}
                            className={`text-sky-50 text-5xl sm:text-6xl md:text-6xl m-5 font-bold ${styles.nameGradient}`}
                            variants={nameVariant}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            style={{ willChange: "transform, opacity" }}
                        >
                            {name}
                        </motion.h2>
                    </AnimatePresence>
                </div>
            </div>
        </>
    );
}

export default Greeting;
