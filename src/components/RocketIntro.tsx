"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Phase = "idle" | "launch" | "flash" | "done";

interface Props {
    onComplete: () => void;
}

export default function RocketIntro({ onComplete }: Props) {
    const [phase, setPhase] = useState<Phase>("idle");

    // Simpan callback ke ref agar tidak stale di dalam setTimeout
    const onCompleteRef = useRef<() => void>(onComplete);
    useEffect(() => {
        onCompleteRef.current = onComplete;
    });

    const [stars] = useState(() =>
        Array.from({ length: 80 }, (_, i) => ({
            id: i,
            left:     (i * 137.5) % 100,
            top:      (i * 97.3)  % 100,
            duration: (i % 3) + 1,
            delay:    (i % 4) * 0.5,
        }))
    );

    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase("launch"), 400),
            setTimeout(() => setPhase("flash"),  2200),
            setTimeout(() => setPhase("done"),   2900),
            setTimeout(() => onCompleteRef.current?.(), 3200),
        ];
        return () => timers.forEach(clearTimeout);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Gunakan variabel agar TypeScript tidak narrowing di dalam JSX
    const isVisible: boolean = phase !== "done";

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="rocket-intro"
                    className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
                    style={{ background: "#030712" }}
                    animate={phase === "flash" ? { opacity: [1, 1, 0] } : { opacity: 1 }}
                    transition={phase === "flash" ? { duration: 0.7, times: [0, 0.3, 1] } : {}}
                >
                    {/* ── Stars background ── */}
                    <div className="absolute inset-0">
                        {stars.map((s) => (
                            <motion.div
                                key={s.id}
                                className="absolute w-0.5 h-0.5 rounded-full bg-white"
                                style={{ left: `${s.left}%`, top: `${s.top}%` }}
                                animate={{ opacity: [0.2, 1, 0.2] }}
                                transition={{
                                    duration: s.duration,
                                    repeat: Infinity,
                                    delay: s.delay,
                                }}
                            />
                        ))}
                    </div>

                    {/* ── Flash burst ── */}
                    <AnimatePresence>
                        {phase === "flash" && (
                            <motion.div
                                key="flash-burst"
                                className="absolute inset-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6 }}
                                style={{
                                    background:
                                        "radial-gradient(circle at center, rgba(0,212,255,0.8) 0%, rgba(123,45,255,0.4) 40%, transparent 70%)",
                                }}
                            />
                        )}
                    </AnimatePresence>

                    {/* ── Rocket ── */}
                    <motion.div
                        className="relative"
                        initial={{ y: 200, opacity: 0 }}
                        animate={
                            phase === "launch"
                                ? { y: -600, opacity: [0, 1, 1, 0] }
                                : { y: 200,  opacity: 0 }
                        }
                        transition={
                            phase === "launch"
                                ? {
                                    duration: 2,
                                    ease: [0.2, 0, 0.8, 1],
                                    times: [0, 0.1, 0.8, 1],
                                }
                                : {}
                        }
                    >
                        <svg width="80" height="120" viewBox="0 0 80 120" fill="none">
                            {/* Body */}
                            <path
                                d="M40 5 C25 5 18 25 18 50 L18 80 L40 90 L62 80 L62 50 C62 25 55 5 40 5Z"
                                fill="url(#rocketBody)"
                            />
                            {/* Nose */}
                            <path d="M40 5 C35 5 30 15 28 25 L52 25 C50 15 45 5 40 5Z" fill="#00d4ff" />
                            {/* Window */}
                            <circle cx="40" cy="45" r="10" fill="url(#window)" />
                            <circle cx="40" cy="45" r="7"  fill="#0a1628" stroke="#00d4ff" strokeWidth="1" />
                            {/* Fins */}
                            <path d="M18 70 L5 90 L18 85 Z"  fill="#7b2dff" />
                            <path d="M62 70 L75 90 L62 85 Z" fill="#7b2dff" />
                            {/* Exhaust */}
                            <ellipse cx="40" cy="90" rx="12" ry="6" fill="#ff6600" opacity="0.8" />
                            <ellipse cx="40" cy="93" rx="8"  ry="4" fill="#ffaa00" />

                            <defs>
                                <linearGradient
                                    id="rocketBody"
                                    x1="18" y1="5" x2="62" y2="90"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#1a2a4a" />
                                    <stop offset="0.5" stopColor="#0d2137" />
                                    <stop offset="1"   stopColor="#091520" />
                                </linearGradient>
                                <radialGradient id="window" cx="0.3" cy="0.3" r="0.7">
                                    <stop stopColor="#00d4ff" stopOpacity="0.8" />
                                    <stop offset="1" stopColor="#0a1628" />
                                </radialGradient>
                            </defs>
                        </svg>

                        {/* Flame — outer */}
                        <motion.div
                            className="absolute left-1/2 -translate-x-1/2"
                            style={{ bottom: -40 }}
                            animate={{ scaleY: [1, 1.4, 0.9, 1.2], opacity: [0.8, 1, 0.7, 1] }}
                            transition={{ duration: 0.2, repeat: Infinity }}
                        >
                            <div
                                style={{
                                    width: 20, height: 50,
                                    background: "linear-gradient(to bottom, #ffaa00, #ff4400, transparent)",
                                    borderRadius: "0 0 50% 50%",
                                    filter: "blur(4px)",
                                }}
                            />
                        </motion.div>

                        {/* Flame — inner */}
                        <motion.div
                            className="absolute left-1/2 -translate-x-1/2"
                            style={{ bottom: -60 }}
                            animate={{ scaleY: [1, 1.6, 0.8, 1.3], opacity: [0.4, 0.7, 0.3, 0.6] }}
                            transition={{ duration: 0.3, repeat: Infinity }}
                        >
                            <div
                                style={{
                                    width: 12, height: 60,
                                    background: "linear-gradient(to bottom, #ff6600, #ff2200, transparent)",
                                    borderRadius: "0 0 50% 50%",
                                    filter: "blur(8px)",
                                }}
                            />
                        </motion.div>
                    </motion.div>

                    {/* ── Bottom text ── */}
                    <motion.div
                        className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: phase === "launch" ? 1 : 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <p
                            className="text-sm font-mono tracking-[0.4em] uppercase"
                            style={{ color: "rgba(0,212,255,0.7)" }}
                        >
                            Initializing Portfolio...
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}