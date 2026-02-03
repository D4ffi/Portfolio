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
        <nav className="navbar-fade fixed top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <button
                            onClick={() => handleNavClick('hero')}
                            className="font-bold text-xl transition-colors duration-700 cursor-pointer text-[#171717] dark:text-[#FCFCFB]"
                        >
                            &lt; KOSS /&gt;
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <button
                            onClick={() => handleNavClick('about')}
                            className="hover:underline cursor-pointer transition-all duration-700 hover:opacity-70 text-[#171717] dark:text-[#FCFCFB]"
                        >
                            {t('nav.about')}
                        </button>
                        <button
                            onClick={() => handleNavClick('projects')}
                            className="hover:underline cursor-pointer transition-all duration-700 hover:opacity-70 text-[#171717] dark:text-[#FCFCFB]"
                        >
                            {t('nav.projects')}
                        </button>
                        <button
                            onClick={() => handleNavClick('contact')}
                            className="hover:underline cursor-pointer transition-all duration-700 hover:opacity-70 text-[#171717] dark:text-[#FCFCFB]"
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
                            className="transition-all duration-700 hover:opacity-70 text-[#171717] dark:text-[#FCFCFB]"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-16 left-0 right-0 bg-bg-light/95 dark:bg-bg-dark/95 backdrop-blur-md border-b border-gray-200/20 shadow-lg">
                        <div className="px-4 py-6 space-y-4">
                            <button
                                onClick={() => handleNavClick('about')}
                                className="block w-full text-left hover:underline cursor-pointer transition-all duration-700 hover:opacity-70 py-2 text-[#171717] dark:text-[#FCFCFB]"
                            >
                                {t('nav.about')}
                            </button>
                            <button
                                onClick={() => handleNavClick('projects')}
                                className="block w-full text-left hover:underline cursor-pointer transition-all duration-700 hover:opacity-70 py-2 text-[#171717] dark:text-[#FCFCFB]"
                            >
                                {t('nav.projects')}
                            </button>
                            <button
                                onClick={() => handleNavClick('contact')}
                                className="block w-full text-left hover:underline cursor-pointer transition-all duration-700 hover:opacity-70 py-2 text-[#171717] dark:text-[#FCFCFB]"
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