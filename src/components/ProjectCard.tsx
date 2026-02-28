"use client";

import { motion } from "framer-motion";
import { Project } from "@/data/projects";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="group relative rounded-lg overflow-hidden"
            style={{
                background: "rgba(10, 22, 40, 0.7)",
                border: "1px solid rgba(0, 212, 255, 0.12)",
                backdropFilter: "blur(12px)",
            }}
        >
            {/* Hover glow */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                    background: "radial-gradient(circle at 50% 0%, rgba(0,212,255,0.08) 0%, transparent 70%)",
                    boxShadow: "inset 0 0 0 1px rgba(0,212,255,0.3)",
                }}
            />

            {/* Image */}
            <div
                className="relative h-48 overflow-hidden"
                style={{ background: "linear-gradient(135deg, #0a1628, #0d2137)" }}
            >
                {project.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
            <span style={{ fontSize: 48, filter: "drop-shadow(0 0 20px rgba(0,212,255,0.5))" }}>
              {project.emoji || "🚀"}
            </span>
                    </div>
                )}
                {/* Gradient overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(to bottom, transparent 40%, rgba(10,22,40,0.9) 100%)",
                    }}
                />
                {/* Status badge */}
                <div
                    className="absolute top-3 right-3 px-2 py-1 rounded text-xs tracking-wider uppercase"
                    style={{
                        background: project.status === "live" ? "rgba(0, 212, 255, 0.15)" : "rgba(123, 45, 255, 0.15)",
                        border: `1px solid ${project.status === "live" ? "rgba(0,212,255,0.4)" : "rgba(123,45,255,0.4)"}`,
                        color: project.status === "live" ? "#00d4ff" : "#7b2dff",
                        fontFamily: "JetBrains Mono",
                    }}
                >
                    {project.status || "dev"}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3
                    className="text-lg font-bold mb-2 group-hover:text-cyan-300 transition-colors"
                    style={{ fontFamily: "Orbitron", color: "white", fontSize: "0.95rem" }}
                >
                    {project.title}
                </h3>
                <p
                    className="text-sm mb-4 leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.5)", fontFamily: "Exo 2" }}
                >
                    {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-5">
                    {project.tech.map((t) => (
                        <span
                            key={t}
                            className="px-2 py-0.5 rounded text-xs"
                            style={{
                                background: "rgba(0, 212, 255, 0.07)",
                                border: "1px solid rgba(0, 212, 255, 0.2)",
                                color: "rgba(0, 212, 255, 0.8)",
                                fontFamily: "JetBrains Mono",
                            }}
                        >
              {t}
            </span>
                    ))}
                </div>

                {/* Links */}
                <div className="flex gap-3">
                    {project.demo && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2 text-xs text-center font-semibold tracking-widest uppercase rounded transition-all duration-300 hover:scale-105"
                            style={{
                                background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(123,45,255,0.2))",
                                border: "1px solid rgba(0,212,255,0.3)",
                                color: "#00d4ff",
                                fontFamily: "Exo 2",
                            }}
                        >
                            Live Demo
                        </a>
                    )}
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2 text-xs text-center font-semibold tracking-widest uppercase rounded transition-all duration-300 hover:scale-105"
                            style={{
                                border: "1px solid rgba(255,255,255,0.15)",
                                color: "rgba(255,255,255,0.6)",
                                fontFamily: "Exo 2",
                            }}
                        >
                            GitHub
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}