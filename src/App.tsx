"use client";

import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

import Greeting from "./components/Greeting/Greeting";
import About from "./components/About/About";
import Header from "./components/Header/Header";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";
import { ArrowDown } from "lucide-react";
import ThemeToggle from "./components/Theme/ThemeToggle";
import Email from "./components/Email-Form/Email-form";
import {Snowfall} from "react-snowfall";
import "./App.css";


function DelayedMount({ when, children }: { when: boolean; children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (when) {
            setMounted(true);
        }
    }, [when]);

    return <>{mounted ? children : null}</>;
}

export default function App() {
    const { scrollYProgress } = useScroll();
    const [phase, setPhase] = useState<"loading" | "fading" | "ready">("loading");


    useEffect(() => {
        const startFadeTimeout = setTimeout(() => setPhase("fading"), 2000);
        const readyTimeout = setTimeout(() => setPhase("ready"), 3000);

        if (document.readyState === "complete") {

        }

        return () => {
            clearTimeout(startFadeTimeout);
            clearTimeout(readyTimeout);
        };
    }, []);

    const isFading = phase === "fading";
    const isReady = phase === "ready";

    return (
        <>
            <motion.div
                key="content-root"
                initial={{ opacity: 0 }}
                animate={{ opacity: isFading || isReady ? 1 : 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="relative z-10"
                style={{
                    pointerEvents: isReady ? "auto" : "none",
                }}
            >
                {isReady && (
                    <motion.div
                        id="scroll-indicator"
                        className="glow-bar"
                        style={{
                            scaleX: scrollYProgress,
                            transformOrigin: "left",
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 5,
                            zIndex: 999,
                            background: "linear-gradient(135deg, #4986d5, #5a67d8, #805ad5)",
                        }}
                    />
                )}

                <ThemeToggle />
                <DelayedMount when={isReady}>
                    <Snowfall color="#ffffff" speed={[4, 6]} changeFrequency={400}/>
                </DelayedMount>

                <div className="flex flex-col items-center w-full">
                    <br />
                    <br />
                    <br />

                    <DelayedMount when={isReady}>
                        <Greeting />
                    </DelayedMount>

                    <br />
                    <br />
                    <br />

                    <DelayedMount when={isReady}>
                        <About />
                    </DelayedMount>

                    <br />
                    <br />

                    <div className="flex justify-center items-center">
                        {/* Arrow bleibt unsichtbar bis ready, trotzdem kein flash */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: isReady ? 1 : 0, y: isReady ? 0 : 10 }}
                            transition={{ duration: 0.6 }}
                        >
                            <ArrowDown size={60} color="white" style={{ margin: 50 }} className="bounceTop" />
                        </motion.div>
                    </div>

                    <br />
                    <br />

                    <DelayedMount when={isReady}>
                        <Header input="</>Skills" />
                    </DelayedMount>

                    <br />
                    <br />

                    <DelayedMount when={isReady}>
                        <Skills />
                    </DelayedMount>

                    <br />
                    <br />

                    <DelayedMount when={isReady}>
                        <Header input="</>Projects" />
                    </DelayedMount>

                    <br />
                    <br />

                    <DelayedMount when={isReady}>
                        <Projects />
                    </DelayedMount>

                    <br />
                    <br />

                    <DelayedMount when={isReady}>
                        <Header input={"</>Interested?"}/>
                    </DelayedMount>

                    <br />
                    <br />
                    <DelayedMount when={isReady}>
                        <Email />
                    </DelayedMount>

                    <br />
                    <br />
                </div>

                <div className="w-full">
                    <DelayedMount when={isReady}>
                        <Footer />
                    </DelayedMount>
                </div>
            </motion.div>

            {/* Loader Overlay — fade out synchron zur Content-Animation */}
            {(phase === "loading" || phase === "fading") && (
                <motion.div
                    key="loader-overlay"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isFading ? 0 : 1 }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 9999,
                        // halbtransparentes Overlay (kein Weißblitz)
                        background: "linear-gradient(180deg, rgba(0,0,0,0.95), rgba(7,11,20,0.9))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        pointerEvents: isFading ? "none" : "auto",
                    }}
                >
                    <Loader />
                </motion.div>
            )}
        </>
    );
}
