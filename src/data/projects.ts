export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image?: string;
  emoji?: string;
  demo?: string;
  github?: string;
  status?: "live" | "dev" | "archived";
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "nebula-commerce",
    title: "Nebula Commerce",
    description:
        "Full-featured e-commerce platform with real-time inventory, payment integration (Stripe), and admin dashboard. Supports 10k+ concurrent users.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Stripe", "Redis", "TailwindCSS"],
    emoji: "🛍️",
    demo: "https://demo.example.com",
    github: "https://github.com/syahroni/nebula-commerce",
    status: "live",
    featured: true,
  },
  {
    id: "orbit-chat",
    title: "Orbit Chat",
    description:
        "Real-time messaging app with WebSocket, end-to-end encryption, file sharing, and video call support. Built for teams.",
    tech: ["React", "Node.js", "Socket.io", "PostgreSQL", "WebRTC"],
    emoji: "💬",
    demo: "https://demo.example.com",
    github: "https://github.com/syahroni/orbit-chat",
    status: "live",
    featured: true,
  },
  {
    id: "stellar-cms",
    title: "Stellar CMS",
    description:
        "Headless CMS with drag-and-drop page builder, multi-language support, and API-first architecture for modern web projects.",
    tech: ["Next.js", "Prisma", "GraphQL", "PostgreSQL", "AWS S3"],
    emoji: "📝",
    github: "https://github.com/syahroni/stellar-cms",
    status: "dev",
    featured: true,
  },
  {
    id: "void-analytics",
    title: "Void Analytics",
    description:
        "Privacy-first web analytics dashboard. No cookies, GDPR compliant, real-time metrics with beautiful data visualizations.",
    tech: ["React", "D3.js", "Express", "ClickHouse", "Docker"],
    emoji: "📊",
    demo: "https://demo.example.com",
    github: "https://github.com/syahroni/void-analytics",
    status: "live",
  },
  {
    id: "aurora-auth",
    title: "Aurora Auth",
    description:
        "Authentication microservice with OAuth2, MFA, JWT rotation, and rate limiting. Drop-in solution for any Node.js app.",
    tech: ["Node.js", "Express", "Redis", "JWT", "TOTP"],
    emoji: "🔐",
    github: "https://github.com/syahroni/aurora-auth",
    status: "live",
  },
  {
    id: "cosmos-api",
    title: "Cosmos API Gateway",
    description:
        "API gateway with rate limiting, caching, request transformation, and detailed logging. Handles 1M+ requests/day.",
    tech: ["Node.js", "Nginx", "Redis", "Docker", "Kubernetes"],
    emoji: "⚡",
    github: "https://github.com/syahroni/cosmos-api",
    status: "dev",
  },
];