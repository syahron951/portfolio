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
        <body>
        <ClientLayout>{children}</ClientLayout>
        </body>
        </html>
    );
}