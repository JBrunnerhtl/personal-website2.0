"use client";

import { useRef, useState, useEffect } from "react";
import type { FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";


export default function ContactMe() {
    const form = useRef<HTMLFormElement | null>(null);

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

    const sendEmail = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.current) return;

        emailjs.sendForm("service_2xy699q", "template_ndty7cf", form.current, {
            publicKey: "bJO-ZPLpTqThaZkAC",
        });
        form.current.reset();
        alert("Message sent! I'll get back to you soon.");
    };

    return (
        <div
            className="w-full"
            style={{
                paddingLeft: "env(safe-area-inset-left, 1rem)",
                paddingRight: "env(safe-area-inset-right, 1rem)",
            }}
        >
            <div className="px-4 sm:px-6">
                <motion.form
                    ref={form}
                    onSubmit={sendEmail}
                    className="
                        rounded-2xl border p-6
                        w-full max-w-2xl
                        mx-auto
                        my-8 sm:my-10
                        backdrop-blur-lg shadow-lg
                        transition-all duration-700 ease-in-out
                    "
                    style={{
                        boxSizing: "border-box",
                        background: isDarkMode
                            ? "linear-gradient(135deg, rgba(73,134,213,0.15), rgba(90,103,216,0.1), rgba(128,90,213,0.1))"
                            : "linear-gradient(135deg, rgba(200,210,240,0.5), rgba(170,185,230,0.4), rgba(190,200,245,0.5))",
                        border: isDarkMode
                            ? "1px solid rgba(100,100,120,0.4)"
                            : "1px solid rgba(150,150,180,0.3)",
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
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.h2
                        className="text-3xl font-bold text-center mb-6"
                        style={{
                            background: "linear-gradient(135deg, #4986d5, #5a67d8, #805ad5)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                        viewport={{ once: true }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Contact Me
                    </motion.h2>

                    <div className="flex flex-col gap-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            viewport={{ once: true }}
                        >
                            <label className="text-white/80 font-medium">Name</label>
                            <motion.input
                                viewport={{ once: true }}
                                type="text"
                                name="user_name"
                                id="name"
                                required
                                className="
                                    mt-1 w-full p-3 rounded-xl
                                    bg-[#1a1f2e]/70
                                    text-white
                                    border border-white/10
                                    outline-none
                                "
                                whileFocus={{
                                    scale: 1.02,
                                    boxShadow: "0 0 12px rgba(73,134,213,0.4)",
                                }}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <label className="text-white/80 font-medium">Email</label>
                            <motion.input
                                type="email"
                                name="user_email"
                                id="email"
                                required
                                className="
                                    mt-1 w-full p-3 rounded-xl
                                    bg-[#1a1f2e]/70
                                    text-white
                                    border border-white/10
                                    outline-none
                                "
                                whileFocus={{
                                    scale: 1.02,
                                    boxShadow: "0 0 12px rgba(73,134,213,0.4)",
                                }}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.25 }}
                            viewport={{ once: true }}
                        >
                            <label className="text-white/80 font-medium">Message</label>
                            <motion.textarea
                                name="message"
                                rows={6}
                                required
                                id="message"
                                className="
                                    mt-1 w-full p-3 rounded-xl
                                    bg-[#1a1f2e]/70
                                    text-white
                                    border border-white/10
                                    outline-none resize-none
                                "
                                whileFocus={{
                                    scale: 1.02,
                                    boxShadow: "0 0 12px rgba(73,134,213,0.4)",
                                }}
                                viewport={{ once: true }}
                            />
                        </motion.div>
                    </div>

                    <motion.button
                        type="submit"
                        className="
                            mt-6 w-full py-3 rounded-xl font-semibold text-white
                            bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-500
                            shadow-xl shadow-black/40
                        "
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        viewport={{ once: true }}
                    >
                        Send Message
                    </motion.button>
                </motion.form>
            </div>
        </div>
    );
}
