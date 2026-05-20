import HeroSection from "../components/hero/HeroSection.tsx";
import Layout from "../components/common/Layout.tsx";
import AboutSection from "../components/about/AboutSection.tsx";
import ProjectShowcase from "../components/projects/ProjectShowcase.tsx";
import ContactSection from "../components/common/ContactSection.tsx";

function Home() {
    return (
        <div>
            <Layout title="Home">
                <section id="hero">
                    <HeroSection/>
                </section>

                <AboutSection />

                <ProjectShowcase />

                {/* Contact Section */}
                <ContactSection />

            </Layout>
        </div>
    );
}

export default Home;
