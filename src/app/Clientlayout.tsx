import SpaceBackground from "@/components/SpaceBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <a href="#origin" className="skip-link">Skip to content</a>
            <SpaceBackground />
            <Navbar />
            <main id="main" style={{ position: "relative", zIndex: 1 }}>
                {children}
            </main>
            <Footer />
        </>
    );
}
