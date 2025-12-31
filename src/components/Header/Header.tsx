"use client";

import { motion } from "framer-motion";
import style from "./header.module.css";

function Header(props: { input: string }) {
    return (
        <div className="flex justify-center items-center w-full">
            <motion.h1
                className={`text-center m-6 text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold ${style.headerStylingWithGradient}`}
                initial={{ opacity: 0, y: 60, scale: 0.95, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                transition={{
                    duration: 1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                }}
                viewport={{ once: true, amount: 0.4 }}
                whileHover={{
                    scale: 1.05,
                    textShadow: "0 0 25px rgba(128, 90, 213, 0.6)",
                    transition: { duration: 0.1, ease: "easeOut" },
                }}
            >
                {props.input}
            </motion.h1>
        </div>
    );
}

export default Header;
