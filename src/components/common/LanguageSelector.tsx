import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage, Language } from '../../context/LanguageContext.tsx';

const LanguageSelector: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const languages = [
        { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
        { code: 'es' as Language, name: 'Español', flag: '🇪🇸' }
    ];

    const currentLanguage = languages.find(lang => lang.code === language);

    // Cerrar dropdown al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLanguageChange = (langCode: Language) => {
        setLanguage(langCode);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Botón principal */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 dark:hover:bg-black/10 transition-colors duration-200 text-tekhelet dark:text-tropical-indigo"
                aria-label="Select language"
            >
                <Globe size={20} />
                <span className="text-sm font-medium">
          {currentLanguage?.flag} {currentLanguage?.code.toUpperCase()}
        </span>
                <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 backdrop-blur-md bg-white/90 dark:bg-violet-russian/90 border border-white/20 dark:border-white/10 rounded-lg shadow-xl z-50 overflow-hidden">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors duration-200 ${
                                language === lang.code
                                    ? 'bg-tekhelet/20 dark:bg-tropical-indigo/20 text-tekhelet dark:text-tropical-indigo'
                                    : 'hover:bg-tekhelet/10 dark:hover:bg-tropical-indigo/10 text-tekhelet dark:text-tropical-indigo'
                            }`}
                        >
                            <span className="text-lg">{lang.flag}</span>
                            <div className="flex flex-col">
                                <span className="font-medium">{lang.name}</span>
                                <span className="text-xs opacity-70">{lang.code.toUpperCase()}</span>
                            </div>
                            {language === lang.code && (
                                <div className="ml-auto w-2 h-2 bg-tekhelet dark:bg-tropical-indigo rounded-full"></div>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;