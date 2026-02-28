"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useApp } from "@/context/Appcontext";

const postsEn = [
    { id: 1, title: "Building Scalable APIs with Node.js and Clean Architecture", excerpt: "Explore how to structure your Node.js applications using Clean Architecture principles for maintainability and testability at scale.", date: "Dec 15, 2024", readTime: "8 min read", tags: ["Node.js", "Architecture", "Backend"], emoji: "⚙️", featured: true },
    { id: 2, title: "Next.js 14 App Router: The Complete Guide", excerpt: "Deep dive into Next.js 14's App Router, Server Components, and the new paradigm of React development.", date: "Nov 28, 2024", readTime: "12 min read", tags: ["Next.js", "React", "Frontend"], emoji: "🚀" },
    { id: 3, title: "TypeScript Advanced Patterns You Should Know", excerpt: "From conditional types to mapped types — mastering TypeScript's type system for writing safer, smarter code.", date: "Nov 10, 2024", readTime: "10 min read", tags: ["TypeScript", "JavaScript"], emoji: "🔷" },
    { id: 4, title: "WebSocket vs Server-Sent Events: When to Use Which", excerpt: "A comprehensive comparison of real-time communication technologies for your next app.", date: "Oct 22, 2024", readTime: "7 min read", tags: ["WebSocket", "Backend", "Real-time"], emoji: "⚡" },
    { id: 5, title: "Docker for Node.js Developers: A Practical Guide", excerpt: "Containerize your Node.js applications like a pro with Dockerfile best practices and docker-compose.", date: "Oct 5, 2024", readTime: "9 min read", tags: ["Docker", "DevOps", "Node.js"], emoji: "🐳" },
    { id: 6, title: "Mastering TailwindCSS: Advanced Techniques", excerpt: "Go beyond utility classes with custom plugins, arbitrary values, and performance optimization.", date: "Sep 18, 2024", readTime: "6 min read", tags: ["TailwindCSS", "CSS", "Frontend"], emoji: "🎨" },
];

const postsId = [
    { id: 1, title: "Membangun API Skalabel dengan Node.js dan Clean Architecture", excerpt: "Pelajari cara menyusun aplikasi Node.js menggunakan prinsip Clean Architecture untuk maintainability dan testability.", date: "15 Des 2024", readTime: "8 mnt baca", tags: ["Node.js", "Arsitektur", "Backend"], emoji: "⚙️", featured: true },
    { id: 2, title: "Next.js 14 App Router: Panduan Lengkap", excerpt: "Selami App Router Next.js 14, Server Components, dan paradigma baru pengembangan React.", date: "28 Nov 2024", readTime: "12 mnt baca", tags: ["Next.js", "React", "Frontend"], emoji: "🚀" },
    { id: 3, title: "Pola TypeScript Lanjutan yang Wajib Kamu Tahu", excerpt: "Dari conditional types hingga mapped types — kuasai sistem tipe TypeScript untuk kode yang lebih aman.", date: "10 Nov 2024", readTime: "10 mnt baca", tags: ["TypeScript", "JavaScript"], emoji: "🔷" },
    { id: 4, title: "WebSocket vs Server-Sent Events: Kapan Menggunakan Yang Mana", excerpt: "Perbandingan komprehensif teknologi komunikasi real-time untuk aplikasimu.", date: "22 Okt 2024", readTime: "7 mnt baca", tags: ["WebSocket", "Backend", "Real-time"], emoji: "⚡" },
    { id: 5, title: "Docker untuk Developer Node.js: Panduan Praktis", excerpt: "Kontainerisasi aplikasi Node.js seperti profesional dengan Dockerfile dan docker-compose.", date: "5 Okt 2024", readTime: "9 mnt baca", tags: ["Docker", "DevOps", "Node.js"], emoji: "🐳" },
    { id: 6, title: "Menguasai TailwindCSS: Teknik Lanjutan", excerpt: "Melampaui utility classes dengan custom plugins, arbitrary values, dan optimasi performa.", date: "18 Sep 2024", readTime: "6 mnt baca", tags: ["TailwindCSS", "CSS", "Frontend"], emoji: "🎨" },
];

export default function BlogPage() {
    const { t, lang } = useApp();
    const [email, setEmail] = useState("");
    const posts = lang === "en" ? postsEn : postsId;
    const featured = posts[0];
    const rest = posts.slice(1);

    return (
        <section className="page-section">
            <div className="page-container">

                {/* Header */}
                <motion.div className="section-header" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                    <span className="section-label">{t("blog.label")}</span>
                    <h1 className="section-title">{t("blog.title")}</h1>
                    <p className="body-text" style={{ maxWidth: 520, margin: "12px auto 0" }}>{t("blog.desc")}</p>
                    <div className="section-divider pink" />
                </motion.div>

                {/* Featured */}
                <motion.article className="card" style={{ padding: "28px 32px", marginBottom: 28, cursor: "pointer" }}
                                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} whileHover={{ y: -4 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                        <span style={{ fontSize: 40, flexShrink: 0 }}>{featured.emoji}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                                <span className="tag" style={{ fontWeight: 700 }}>{t("blog.featured")}</span>
                                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.7rem", color: "var(--text-muted)" }}>{featured.date} · {featured.readTime}</span>
                            </div>
                            <h2 style={{ fontFamily: "Orbitron, monospace", fontSize: "clamp(0.92rem, 2vw, 1.12rem)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 10, lineHeight: 1.4 }}>
                                {featured.title}
                            </h2>
                            <p className="body-text" style={{ marginBottom: 14 }}>{featured.excerpt}</p>
                            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                {featured.tags.map(tg => <span key={tg} className="tag purple">{tg}</span>)}
                            </div>
                        </div>
                    </div>
                </motion.article>

                {/* Grid */}
                <div className="grid-2" style={{ marginBottom: 56 }}>
                    {rest.map((post, i) => (
                        <motion.article key={post.id} className="card" style={{ padding: "22px 26px", cursor: "pointer" }}
                                        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -4 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                                <span style={{ fontSize: 26 }}>{post.emoji}</span>
                                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.68rem", color: "var(--text-muted)" }}>
                  {post.date} · {post.readTime}
                </span>
                            </div>
                            <h3 style={{ fontFamily: "Orbitron, monospace", fontSize: "0.83rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 8, lineHeight: 1.45 }}>
                                {post.title}
                            </h3>
                            <p className="body-text" style={{ fontSize: "0.83rem", marginBottom: 14 }}>{post.excerpt}</p>
                            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                {post.tags.map(tg => <span key={tg} className="tag">{tg}</span>)}
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Newsletter */}
                <motion.div className="card" style={{ padding: "44px 36px", textAlign: "center" }}
                            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h3 style={{ fontFamily: "Orbitron, monospace", fontSize: "1.4rem", fontWeight: 900, color: "var(--text-primary)", marginBottom: 8 }}>
                        {t("blog.newsletter.title")} <span style={{ color: "var(--cyan)" }}>{t("blog.newsletter.accent")}</span>
                    </h3>
                    <p className="body-text" style={{ marginBottom: 28 }}>{t("blog.newsletter.desc")}</p>
                    <div style={{ display: "flex", gap: 12, maxWidth: 420, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
                        <input type="email" placeholder={t("blog.email.placeholder")} value={email}
                               onChange={e => setEmail(e.target.value)}
                               style={{ flex: "1 1 200px", padding: "11px 16px", borderRadius: 6 }} />
                        <button className="btn-primary">{t("blog.subscribe")}</button>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}