import HeroSection from "../components/hero/HeroSection.tsx";
import Layout from "../components/common/Layout.tsx";
import LanguageCard from "../components/common/LanguageCard.tsx";
import ProjectShowcase from "../components/projects/ProjectShowcase.tsx";
import ContactSection from "../components/common/ContactSection.tsx";
import {useLanguage} from "../context/LanguageContext.tsx";

function Home() {
    const { t } = useLanguage();

    return (
        <div>
            <Layout title="Home">
                <section id="hero">
                    <HeroSection/>
                </section>

                <section id="about" className="py-16 sm:py-20 md:py-24 lg:py-32 transition-colors duration-500">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center justify-center text-center">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-6 sm:mb-8 text-tekhelet dark:text-tropical-indigo transition-colors duration-500">
                                {t('about.title')}
                            </h1>

                            <p className="text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl lg:max-w-2xl text-balance mb-6 sm:mb-8 text-tekhelet dark:text-tropical-indigo transition-colors duration-500">
                                {t('about.description')}
                            </p>

                            <a className="text-sm sm:text-base hover:underline transition-all duration-500 mb-12 sm:mb-16 md:mb-20 lg:mb-24 text-tekhelet dark:text-tropical-indigo hover:text-tekhelet-dark dark:hover:text-mauve"
                               href="https://google.com">
                                {t('about.mod_link')} --{">"}
                            </a>

                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-6 sm:mb-8 text-tekhelet dark:text-tropical-indigo transition-colors duration-500">
                                {t('about.tech_title')}
                            </h2>

                            <p className="text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl lg:max-w-2xl text-balance mb-8 sm:mb-10 md:mb-12 text-tekhelet dark:text-tropical-indigo transition-colors duration-500">
                                {t('about.tech_description')}
                            </p>

                            {/*  TECH STACK Flexbox con wrap (Recomendada) */}
                            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
                                <LanguageCard imagePath="nodejs.svg" name="Node JS"/>
                                <LanguageCard imagePath="javascript.svg" name="Javascript"/>
                                <LanguageCard imagePath="typescript.svg" name="Typescript"/>
                                <LanguageCard imagePath="react.svg" name="React"/>
                                <LanguageCard imagePath="tailwind.svg" name="Tailwind CSS"/>
                                <LanguageCard imagePath="java.svg" name="Java"/>
                                <LanguageCard imagePath="spring.svg" name="Spring"/>
                                <LanguageCard imagePath="rust.svg" name="Rust"/>
                                <LanguageCard imagePath="tauri.svg" name="Tauri"/>
                                <LanguageCard imagePath="csharp.png" name="C Sharp"/>
                                <LanguageCard imagePath="dotnet.svg" name=".Net"/>
                            </div>
                        </div>
                    </div>
                </section>

                <ProjectShowcase />

                {/* Contact Section */}
                <ContactSection />

            </Layout>
        </div>
    );
}

export default Home;