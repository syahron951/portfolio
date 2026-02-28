"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import SpaceBackground from "@/components/SpaceBackground";
import RocketIntro from "@/components/RocketIntro";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/Customcursor";
import FloatingControls from "@/components/Floatingcontrols";
import { AppProvider } from "@/context/Appcontext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    // null = belum cek sessionStorage, true/false = sudah dicek
    const [skipIntro, setSkipIntro]         = useState<boolean | null>(null);
    const [introComplete, setIntroComplete] = useState(false);
    const [showContent,   setShowContent]   = useState(false);

    // Cek sessionStorage hanya sekali setelah mount
    useEffect(() => {
        const seen = sessionStorage.getItem("intro_seen");
        if (seen) {
            // Sudah pernah lihat intro — skip langsung
            setSkipIntro(true);
            setIntroComplete(true);
            setShowContent(true);
        } else {
            // Belum pernah — tampilkan intro
            setSkipIntro(false);
        }
    }, []);

    const handleIntroComplete = useCallback(() => {
        sessionStorage.setItem("intro_seen", "1");
        setIntroComplete(true);
        setTimeout(() => setShowContent(true), 100);
    }, []);

    // Belum hydrated — jangan render apapun dulu (hindari flicker)
    if (skipIntro === null) return null;

    return (
        <AppProvider>
            <CustomCursor />
            <SpaceBackground />

            {/* Tampilkan rocket intro hanya jika belum pernah lihat */}
            {skipIntro === false && !introComplete && (
                <RocketIntro onComplete={handleIntroComplete} />
            )}

            {/* Konten utama — muncul setelah intro selesai atau skip */}
            {(showContent || skipIntro === true) && (
                <div
                    style={{
                        position: "relative",
                        zIndex: 1,
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "100vh",
                        opacity: 1,
                        animation: skipIntro === false ? "fadeInContent 0.5s ease" : "none",
                    }}
                >
                    <Navbar />
                    <main style={{ flex: "1 0 auto" }}>{children}</main>
                    <Footer />
                    <FloatingControls />
                </div>
            )}

            <style>{`
                @keyframes fadeInContent {
                    from { opacity: 0; }
                    to   { opacity: 1; }
                }
            `}</style>
        </AppProvider>
    );
}