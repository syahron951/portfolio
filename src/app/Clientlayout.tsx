import VoyageBackground from "@/components/three/VoyageBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChapterProgress from "@/components/ChapterProgress";
import ScrollProgressBar from "@/components/ScrollProgressBar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <a href="#main" className="skip-link">Skip to content</a>
            <ScrollProgressBar />
            <VoyageBackground />
            <Navbar />
            <ChapterProgress />
            <main id="main" tabIndex={-1} style={{ position: "relative", zIndex: 2, outline: "none" }}>
                {children}
            </main>
            <Footer />
        </>
    );
}
