import HeroSection from "../components/hero/HeroSection.tsx";
import Layout from "../components/common/Layout.tsx";
import LanguageCard from "../components/common/LanguageCard.tsx";
import ProjectCard from "../components/common/ProjectCard.tsx";
import dashboard from '../assets/sesa/dashboard.png';
import dashboard1 from '../assets/sesa/dashboard1.png';
import dashboard2 from '../assets/sesa/dashboard2.png';
import dashboard3 from '../assets/sesa/dashboard3.png';
import ContactSection from "../components/common/ContactSection.tsx";

function Home() {
    return (
        <div className="bg-neutral-200 dark:bg-violet-grey transition-colors duration-500">
            <Layout title="Home">
                <section id="hero">
                    <HeroSection/>
                </section>

                <section id="about" className="bg-gradient-to-b from-neutral-200 to-neutral-200 dark:bg-gradient-to-b dark:from-violet-dark dark:to-violet-grey py-16 sm:py-20 md:py-24 lg:py-32 transition-colors duration-500">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center justify-center text-center">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-6 sm:mb-8 text-tekhelet dark:text-tropical-indigo transition-colors duration-500">
                                A little about me
                            </h1>

                            <p className="text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl lg:max-w-2xl text-balance mb-6 sm:mb-8 text-tekhelet dark:text-tropical-indigo transition-colors duration-500">
                                I started this journey as a software developer because of Minecraft!
                                Creating modpacks, editing configs, making datapacks,
                                and even developing my own mod with Java—the rest is history.
                                Now, I'm on this software development path, and I love it,
                                from planning and developing to publishing.
                            </p>

                            <a className="text-sm sm:text-base hover:underline transition-all duration-500 mb-12 sm:mb-16 md:mb-20 lg:mb-24 text-tekhelet dark:text-tropical-indigo hover:text-tekhelet-dark dark:hover:text-mauve"
                               href="https://google.com">
                                See my Mod dev page --{">"}
                            </a>

                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-6 sm:mb-8 text-tekhelet dark:text-tropical-indigo transition-colors duration-500">
                                Tech Stack & Tools
                            </h2>

                            <p className="text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl lg:max-w-2xl text-balance mb-8 sm:mb-10 md:mb-12 text-tekhelet dark:text-tropical-indigo transition-colors duration-500">
                                I have experience with a variety of technologies and tools,
                                including Java, JavaScript, TypeScript, React, Node.js, Express,
                                MongoDB, PostgreSQL, and more. I also have experience with
                                cloud platforms like AWS and GCP.
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

                <section id="projects" className="py-16 sm:py-20 md:py-24 lg:py-32 transition-colors duration-500">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center justify-center text-center">
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16 md:mb-20 text-tekhelet dark:text-tropical-indigo transition-colors duration-500">
                                Projects
                            </h1>

                            {/* Projects Container - Always centered regardless of quantity */}
                            <div className="w-full max-w-7xl">
                                <div className="flex flex-wrap justify-center gap-8 sm:gap-10 md:gap-12">
                                    <ProjectCard
                                        images={[dashboard1, dashboard, dashboard2, dashboard3]}
                                        title="Inventory Management Software"
                                        description="This project is an inventory manager created for Sesa Promo, a company based in Monterrey that specializes in the sale of promotional products. The solution includes a way to register and manage products, categories, and organize stock across the different warehouses the company has, with the ability to create or edit them."
                                        technologies={['TypeScript','React','TailwindCSS','Supabase']}
                                    />
                                    {/* Add more ProjectCard components here as needed */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <ContactSection />

            </Layout>
        </div>
    );
}

export default Home;