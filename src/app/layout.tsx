import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./Clientlayout";
import { site } from "@/config/site";

export const metadata: Metadata = {
    title: `${site.name} · Fullstack Developer`,
    description: `Portfolio of ${site.name} — ${site.tagline}. Building real things with React, Next.js and modern web technologies.`,
    keywords: ["Fullstack Developer", "Software Engineer", "React", "Next.js", "Portfolio", "M. Abdullah Syahroni"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Exo+2:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=JetBrains+Mono:wght@300;400;500&display=swap"
            />
        </head>
        <body>
        <ClientLayout>{children}</ClientLayout>
        </body>
        </html>
    );
}