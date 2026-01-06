"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleLoaded = () => {
            setTimeout(() => setIsLoading(false), 2600);
        };

        if (document.readyState === "complete") {
            handleLoaded();
        } else {
            window.addEventListener("load", handleLoaded);
        }

        return () => window.removeEventListener("load", handleLoaded);
    }, []);

    const cells = Array.from({ length: 9 });

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.4 } }}
                    className="fixed inset-0 flex flex-col items-center justify-center gap-8 bg-black z-[9999]"
                >
                    <div className="grid grid-cols-3 gap-3">
                        {cells.map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-6 h-6 bg-gradient-to-br
                                from-[#4986d5] via-[#5a67d8] to-[#805ad5]"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                    duration: 0.4,
                                    delay: i * 0.12,
                                    ease: "easeOut",
                                    repeat: Infinity,
                                    repeatDelay: 1.2,
                                }}
                            />
                        ))}
                    </div>

                    <motion.span
                        className="text-sm uppercase
                        text-transparent bg-clip-text bg-gradient-to-r
                        from-[#4986d5] via-[#5a67d8] to-[#805ad5]"
                        style={{fontFamily: "ui-sans-serif, sans-serif"}}
                        transition={{
                            duration: 1.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        Loading ...
                    </motion.span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
