import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./Clientlayout";

export const metadata: Metadata = {
    title: "Syahroni · Fullstack Developer",
    description:
        "Portfolio of Syahroni — Fullstack Developer & Software Engineer specializing in React, Next.js, Node.js and modern web technologies.",
    keywords: ["Fullstack Developer", "Software Engineer", "React", "Next.js", "Portfolio"],
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