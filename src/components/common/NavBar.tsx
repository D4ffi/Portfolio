import React, { useState } from "react";
import ToggleDarkMode from "../toggleDarkMode/ToggleDarkMode.tsx";
import LanguageSelector from "./LanguageSelector.tsx";
import { Menu, X } from "lucide-react";
import {useLanguage} from "../../context/LanguageContext.tsx";

const NavBar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { t } = useLanguage();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavClick = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false); // Close mobile menu after navigation
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <button
                            onClick={() => handleNavClick('hero')}
                            className="text-tekhelet font-bold text-xl hover:text-tekhelet-dark transition-colors cursor-pointer dark:text-tropical-indigo dark:hover:text-violet-100">
                            &lt; KOSS /&gt;
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <button
                            onClick={() => handleNavClick('about')}
                            className="text-tekhelet hover:text-tekhelet-dark hover:underline cursor-pointer transition-colors dark:text-tropical-indigo dark:hover:text-violet-100"
                        >
                            {t('nav.about')}
                        </button>
                        <button
                            onClick={() => handleNavClick('projects')}
                            className="text-tekhelet hover:text-tekhelet-dark hover:underline cursor-pointer transition-colors dark:text-tropical-indigo dark:hover:text-violet-100"
                        >
                            {t('nav.projects')}
                        </button>
                        <button
                            onClick={() => handleNavClick('contact')}
                            className="text-tekhelet hover:text-tekhelet-dark hover:underline cursor-pointer transition-colors dark:text-tropical-indigo dark:hover:text-violet-100"
                        >
                            {t('nav.contact')}
                        </button>
                        <LanguageSelector />
                        <ToggleDarkMode />
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center space-x-2">
                        <LanguageSelector />
                        <ToggleDarkMode />
                        <button
                            onClick={toggleMenu}
                            className="text-tekhelet dark:text-tropical-indigo hover:text-tekhelet-dark dark:hover:text-violet-100 transition-colors"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 dark:bg-violet-russian/95 backdrop-blur-md border-b border-gray-200/20 dark:border-violet-100/10 shadow-lg">
                        <div className="px-4 py-6 space-y-4">
                            <button
                                onClick={() => handleNavClick('about')}
                                className="block w-full text-left text-tekhelet hover:text-tekhelet-dark hover:underline cursor-pointer transition-colors dark:text-tropical-indigo dark:hover:text-violet-100 py-2"
                            >
                                {t('nav.about')}
                            </button>
                            <button
                                onClick={() => handleNavClick('projects')}
                                className="block w-full text-left text-tekhelet hover:text-tekhelet-dark hover:underline cursor-pointer transition-colors dark:text-tropical-indigo dark:hover:text-violet-100 py-2"
                            >
                                {t('nav.projects')}
                            </button>
                            <button
                                onClick={() => handleNavClick('contact')}
                                className="block w-full text-left text-tekhelet hover:text-tekhelet-dark hover:underline cursor-pointer transition-colors dark:text-tropical-indigo dark:hover:text-violet-100 py-2"
                            >
                                {t('nav.contact')}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;