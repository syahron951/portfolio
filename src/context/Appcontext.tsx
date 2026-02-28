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
    "nav.blog":     { en: "Blog",     id: "Blog" },
    "nav.contact":  { en: "Contact",  id: "Kontak" },

    // Hero
    "hero.welcome":       { en: "WELCOME TO MY PORTFOLIO",     id: "SELAMAT DATANG DI PORTOFOLIO SAYA" },
    "hero.available":     { en: "Available for work",           id: "Tersedia untuk bekerja" },
    "hero.desc":          { en: "Crafting digital experiences that push the boundaries of the web. Passionate about clean code, stunning UI, and scalable architecture.", id: "Menciptakan pengalaman digital yang melampaui batas web. Passionate terhadap kode bersih, UI memukau, dan arsitektur yang skalabel." },
    "hero.cta.projects":  { en: "View Projects",               id: "Lihat Proyek" },
    "hero.cta.about":     { en: "About Me",                    id: "Tentang Saya" },
    "hero.years":         { en: "Years Exp",                   id: "Thn Pengalaman" },
    "hero.projects":      { en: "Projects",                    id: "Proyek" },
    "hero.tech":          { en: "Technologies",                id: "Teknologi" },

    // About page
    "about.label":    { en: "Who I Am",       id: "Siapa Saya" },
    "about.title":    { en: "ABOUT",          id: "TENTANG" },
    "about.role":     { en: "Fullstack Developer · Software Engineer", id: "Fullstack Developer · Software Engineer" },
    "about.bio1":     { en: "Hi! I'm Syahroni, a Fullstack Developer with 3+ years of experience building digital products from scratch to production.", id: "Halo! Saya Syahroni, seorang Fullstack Developer dengan pengalaman 3+ tahun membangun produk digital dari nol hingga production." },
    "about.bio2":     { en: "I believe good code is not only code that works, but also maintainable, scalable, and a pleasure to read.", id: "Saya percaya kode yang baik bukan hanya yang bekerja, tapi juga yang maintainable, scalable, dan a pleasure to read." },
    "about.bio3":     { en: "When not coding, I explore new technologies, contribute to open source, and share technical knowledge.", id: "Ketika tidak coding, saya menjelajahi teknologi terbaru, berkontribusi ke open source, dan berbagi pengetahuan teknis." },
    "about.location": { en: "Location",       id: "Lokasi" },
    "about.exp":      { en: "Experience",     id: "Pengalaman" },
    "about.focus":    { en: "Focus",          id: "Fokus" },
    "about.status":   { en: "Status",         id: "Status" },
    "about.status.v": { en: "Open to Work ✓", id: "Terbuka untuk Kerja ✓" },
    "about.focus.v":  { en: "Fullstack Web",  id: "Fullstack Web" },
    "about.tech.label": { en: "Technologies", id: "Teknologi" },
    "about.tech.title": { en: "TECH",         id: "TECH" },
    "about.exp.label":  { en: "Experience",   id: "Pengalaman" },
    "about.exp.title":  { en: "EXPERIENCE",   id: "PENGALAMAN" },
    "about.timeline": { en: "TIMELINE",       id: "LINIMASA" },

    // Timeline
    "tl.1.title":   { en: "Senior Fullstack Developer", id: "Senior Fullstack Developer" },
    "tl.1.company": { en: "Tech Startup, Jakarta",       id: "Tech Startup, Jakarta" },
    "tl.1.desc":    { en: "Leading development of scalable SaaS products serving 50k+ users.", id: "Memimpin pengembangan produk SaaS scalable yang melayani 50k+ pengguna." },
    "tl.2.title":   { en: "Fullstack Developer",         id: "Fullstack Developer" },
    "tl.2.company": { en: "Digital Agency, Surabaya",    id: "Digital Agency, Surabaya" },
    "tl.2.desc":    { en: "Built web applications for enterprise clients across e-commerce and fintech.", id: "Membangun aplikasi web untuk klien enterprise di bidang e-commerce dan fintech." },
    "tl.3.title":   { en: "Frontend Developer",          id: "Frontend Developer" },
    "tl.3.company": { en: "Remote · Freelance",          id: "Remote · Freelance" },
    "tl.3.desc":    { en: "Delivered 15+ projects for clients globally, specializing in React and modern UI.", id: "Menyelesaikan 15+ proyek untuk klien global, spesialisasi React dan UI modern." },
    "tl.4.title":   { en: "Started Coding Journey",      id: "Mulai Perjalanan Coding" },
    "tl.4.company": { en: "Self-taught",                 id: "Otodidak" },
    "tl.4.desc":    { en: "Began learning web development through online courses and personal projects.", id: "Mulai belajar web development melalui kursus online dan proyek pribadi." },

    // Projects
    "proj.label":   { en: "My Work",         id: "Karya Saya" },
    "proj.title":   { en: "PROJECTS",        id: "PROYEK" },
    "proj.desc":    { en: "A collection of projects built with modern technologies, spanning e-commerce, real-time apps, and developer tools.", id: "Kumpulan proyek yang dibangun dengan teknologi modern, mencakup e-commerce, aplikasi real-time, dan developer tools." },
    "proj.demo":    { en: "Live Demo",       id: "Demo Langsung" },
    "proj.github":  { en: "GitHub",          id: "GitHub" },
    "proj.cta":     { en: "Want to see more? Check out my GitHub profile.", id: "Ingin lihat lebih banyak? Kunjungi profil GitHub saya." },
    "proj.github.btn": { en: "View GitHub Profile →", id: "Lihat Profil GitHub →" },
    "proj.filter.all": { en: "All",          id: "Semua" },

    // Blog
    "blog.label":   { en: "Thoughts & Tutorials", id: "Pemikiran & Tutorial" },
    "blog.title":   { en: "BLOG",            id: "BLOG" },
    "blog.desc":    { en: "Articles about web development, software engineering, and the technologies I work with every day.", id: "Artikel tentang pengembangan web, software engineering, dan teknologi yang saya gunakan setiap hari." },
    "blog.featured": { en: "Featured",       id: "Unggulan" },
    "blog.newsletter.title": { en: "STAY",   id: "TETAP" },
    "blog.newsletter.accent": { en: "UPDATED", id: "UPDATE" },
    "blog.newsletter.desc": { en: "Get notified when I publish new articles. No spam, ever.", id: "Dapatkan notifikasi saat saya menerbitkan artikel baru. Tanpa spam." },
    "blog.subscribe": { en: "Subscribe",     id: "Langganan" },
    "blog.email.placeholder": { en: "your@email.com", id: "email@anda.com" },

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