import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./Clientlayout";
import { site } from "@/config/site";
import { display, sans, mono } from "@/lib/fonts";

export const metadata: Metadata = {
    title: `${site.name} · Fullstack Developer`,
    description: `${site.name} — ${site.tagline}. Builder of Lumero, a real food & beverage platform. Building real things with modern web technologies.`,
    keywords: ["Fullstack Developer", "Software Engineer", "React", "Next.js", "Portfolio", "M. Abdullah Syahroni", "Lumero"],
    authors: [{ name: site.name }],
    openGraph: {
        title: `${site.name} · Fullstack Developer & Builder`,
        description: `${site.tagline}. Builder of Lumero — a real, deployed F&B platform.`,
        type: "website",
        locale: "en_US",
        siteName: site.name,
    },
    twitter: {
        card: "summary_large_image",
        title: `${site.name} · Fullstack Developer & Builder`,
        description: `${site.tagline}. Builder of Lumero.`,
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
        <body>
        <ClientLayout>{children}</ClientLayout>
        </body>
        </html>
    );
}
