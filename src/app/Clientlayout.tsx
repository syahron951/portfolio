"use client";

import { useState, useEffect } from "react";
import SpaceBackground from "@/components/SpaceBackground";
import RocketIntro from "@/components/RocketIntro";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/Customcursor";
import FloatingControls from "@/components/Floatingcontrols";
import { AppProvider } from "@/context/Appcontext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [introComplete, setIntroComplete] = useState(false);
    const [showContent,   setShowContent]   = useState(false);

    useEffect(() => {
        const seen = sessionStorage.getItem("intro_seen");
        if (seen) {
            setIntroComplete(true);
            setShowContent(true);
        }
    }, []);

    const handleIntroComplete = () => {
        sessionStorage.setItem("intro_seen", "1");
        setIntroComplete(true);
        setTimeout(() => setShowContent(true), 100);
    };

    return (
        <AppProvider>
            <CustomCursor />
            <SpaceBackground />

            {!introComplete && <RocketIntro onComplete={handleIntroComplete} />}

            {(showContent || introComplete) && (
                <div
                    style={{
                        position: "relative",
                        zIndex: 1,
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "100vh",
                        opacity: introComplete ? 1 : 0,
                        transition: "opacity 0.5s ease",
                    }}
                >
                    <Navbar />
                    {/* main grows to push footer down naturally */}
                    <main style={{ flex: "1 0 auto" }}>{children}</main>
                    {/* footer never stretches, just wraps its own content */}
                    <Footer />
                    <FloatingControls />
                </div>
            )}
        </AppProvider>
    );
}