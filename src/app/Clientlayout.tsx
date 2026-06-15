import SpaceBackground from "@/components/SpaceBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChapterProgress from "@/components/ChapterProgress";
import ScrollProgressBar from "@/components/ScrollProgressBar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <a href="#ignition" className="skip-link">Skip to content</a>
            <ScrollProgressBar />
            <SpaceBackground />
            <Navbar />
            <ChapterProgress />
            <main id="main" style={{ position: "relative", zIndex: 1 }}>
                {children}
            </main>
            <Footer />
        </>
    );
}
