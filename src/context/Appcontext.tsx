"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "dark" | "light";
type Lang = "en" | "id";

interface AppContextType {
    theme: Theme;
    lang: Lang;
    toggleTheme: () => void;
    toggleLang: () => void;
    t: (key: string) => string;
}

const translations: Record<string, Record<Lang, string>> = {
    // Navbar
    "nav.home":     { en: "Home",     id: "Beranda" },
    "nav.about":    { en: "About",    id: "Tentang" },
    "nav.projects": { en: "Projects", id: "Proyek" },
    "nav.contact":  { en: "Contact",  id: "Kontak" },

    // Hero
    "hero.welcome":       { en: "WELCOME TO MY PORTFOLIO",     id: "SELAMAT DATANG DI PORTOFOLIO SAYA" },
    "hero.available":     { en: "Available for work",           id: "Tersedia untuk bekerja" },
    "hero.desc":          { en: "I believe that learning is a lifelong journey, and every challenge is an opportunity to grow and become better.", id: "Saya percaya bahwa proses belajar tidak pernah selesai, dan setiap tantangan adalah kesempatan untuk tumbuh menjadi lebih baik." },
    "hero.cta.projects":  { en: "View Projects",               id: "Lihat Proyek" },
    "hero.cta.about":     { en: "About Me",                    id: "Tentang Saya" },

    // About page
    "about.label":    { en: "Who I Am",       id: "Siapa Saya" },
    "about.title":    { en: "ABOUT",          id: "TENTANG" },
    "about.role":     { en: "Fullstack Developer · Software Engineer", id: "Fullstack Developer · Software Engineer" },
    "about.bio1":     { en: "Hello! I'm Syahroni, an Informatics student who is passionate about technology, software development, and turning ideas into digital products.", id: "Halo! Saya Syahroni, seorang mahasiswa Informatika yang tertarik pada teknologi, software development, dan bagaimana ide bisa diwujudkan menjadi produk digital." },
    "about.bio2":     { en: "I enjoy the process of learning, experimenting with new things, and solving problems through technology.", id: "Saya menikmati proses belajar, bereksperimen dengan hal baru, dan memecahkan masalah melalui teknologi." },
    "about.bio3":     { en: "For me, every project is an opportunity to learn something new and grow further.", id: "Bagi saya, setiap project adalah kesempatan untuk belajar sesuatu yang baru dan berkembang lebih jauh." },
    "about.location": { en: "Location",       id: "Lokasi" },
    "about.focus":    { en: "Focus",          id: "Fokus" },
    "about.status":   { en: "Status",         id: "Status" },
    "about.status.v": { en: "Student",        id: "Pelajar" },
    "about.focus.v":  { en: "Fullstack Web",  id: "Fullstack Web" },
    "about.tech.label": { en: "Technologies", id: "Teknologi" },
    "about.tech.title": { en: "TECH",         id: "TECH" },

    // Projects
    "proj.label":   { en: "My Work",         id: "Karya Saya" },
    "proj.title":   { en: "PROJECTS",        id: "PROYEK" },
    "proj.desc":    { en: "A collection of projects built with modern technologies, spanning e-commerce, real-time apps, and developer tools.", id: "Kumpulan proyek yang dibangun dengan teknologi modern, mencakup e-commerce, aplikasi real-time, dan developer tools." },
    "proj.demo":    { en: "Live Demo",       id: "Demo Langsung" },
    "proj.github":  { en: "GitHub",          id: "GitHub" },
    "proj.cta":     { en: "Want to see more? Check out my GitHub profile.", id: "Ingin lihat lebih banyak? Kunjungi profil GitHub saya." },
    "proj.github.btn": { en: "View GitHub Profile →", id: "Lihat Profil GitHub →" },
    "proj.filter.all": { en: "All",          id: "Semua" },

    // Footer
    "footer.role":  { en: "Fullstack Developer · Software Engineer", id: "Fullstack Developer · Software Engineer" },
    "footer.copy":  { en: "© 2024 Syahroni · Built with Next.js + TailwindCSS · Deployed on Vercel", id: "© 2024 Syahroni · Dibangun dengan Next.js + TailwindCSS · Deploy di Vercel" },
};

const AppContext = createContext<AppContextType>({
    theme: "dark",
    lang: "en",
    toggleTheme: () => {},
    toggleLang: () => {},
    t: (k) => k,
});

export function AppProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark");
    const [lang, setLang] = useState<Lang>("en");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as Theme | null;
        const savedLang = localStorage.getItem("lang") as Lang | null;
        if (savedTheme) setTheme(savedTheme);
        if (savedLang) setLang(savedLang);
    }, []);

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem("lang", lang);
    }, [lang]);

    const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");
    const toggleLang = () => setLang(l => l === "en" ? "id" : "en");

    const t = (key: string): string => {
        if (translations[key]) return translations[key][lang] ?? key;
        return key;
    };

    return (
        <AppContext.Provider value={{ theme, lang, toggleTheme, toggleLang, t }}>
            {children}
        </AppContext.Provider>
    );
}

export const useApp = () => useContext(AppContext);