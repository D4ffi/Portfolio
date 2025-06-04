import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Tipos para las traducciones
export type Language = 'en' | 'es';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

// Traducciones
const translations = {
    en: {
        // Navigation
        'nav.about': 'About Me',
        'nav.projects': 'Projects',
        'nav.contact': 'Contact',

        // Hero Section
        'hero.greeting': 'Hi I am',
        'hero.role': 'Full Stack Developer',
        'hero.easter_egg': 'If you read this, you are awesome',

        // About Section
        'about.title': 'A little about me',
        'about.description': 'I started this journey as a software developer because of Minecraft! Creating modpacks, editing configs, making datapacks, and even developing my own mod with Java—the rest is history. Now, I\'m on this software development path, and I love it, from planning and developing to publishing.',
        'about.mod_link': 'See my Mod dev page',
        'about.tech_title': 'Tech Stack & Tools',
        'about.tech_description': 'I have experience with a variety of technologies and tools, including Java, JavaScript, TypeScript, React, Node.js, Express, MongoDB, PostgreSQL, and more. I also have experience with cloud platforms like AWS and GCP.',

        // Projects Section
        'projects.title': 'Projects',
        'projects.inventory.title': 'Inventory Management Software',
        'projects.inventory.description': 'This project is an inventory manager created for Sesa Promo, a company based in Monterrey that specializes in the sale of promotional products. The solution includes a way to register and manage products, categories, and organize stock across the different warehouses the company has, with the ability to create or edit them.',
        'projects.details_button': 'Project Details',

        // Contact Section
        'contact.title': 'Let\'s Connect',
        'contact.description': 'I\'m always open to discussing new opportunities, collaborating on exciting projects, or just having a chat about technology and development.',
        'contact.ready': 'Ready to start a conversation?',
        'contact.reach_out': 'Feel free to reach out through any of the platforms above',

        // Email Modal
        'email.modal.title': 'Contact Information',
        'email.modal.label': 'Email Address',
        'email.modal.copy': 'Copy',
        'email.modal.copied': 'Copied!',
        'email.modal.description': 'Feel free to reach out for collaboration opportunities, questions, or just to say hello!',
        'email.modal.close': 'Close',

        // Social Labels
        'social.linkedin': 'LinkedIn',
        'social.github': 'GitHub',
        'social.email': 'Email',

        // Theme Toggle
        'theme.light': 'Switch to light mode',
        'theme.dark': 'Switch to dark mode',
    },
    es: {
        // Navigation
        'nav.about': 'Sobre Mí',
        'nav.projects': 'Proyectos',
        'nav.contact': 'Contacto',

        // Hero Section
        'hero.greeting': 'Hola soy',
        'hero.role': 'Desarrollador Full Stack',
        'hero.easter_egg': 'Si lees esto, eres increíble',

        // About Section
        'about.title': 'Un poco sobre mí',
        'about.description': '¡Comencé este viaje como desarrollador de software por Minecraft! Creando modpacks, editando configuraciones, haciendo datapacks, e incluso desarrollando mi propio mod con Java—el resto es historia. Ahora, estoy en este camino del desarrollo de software, y me encanta, desde planificar y desarrollar hasta publicar.',
        'about.mod_link': 'Ver mi página de desarrollo de Mods',
        'about.tech_title': 'Stack Tecnológico y Herramientas',
        'about.tech_description': 'Tengo experiencia con una variedad de tecnologías y herramientas, incluyendo Java, JavaScript, TypeScript, React, Node.js, Express, MongoDB, PostgreSQL, y más. También tengo experiencia con plataformas en la nube como AWS y GCP.',

        // Projects Section
        'projects.title': 'Proyectos',
        'projects.inventory.title': 'Software de Gestión de Inventario',
        'projects.inventory.description': 'Este proyecto es un gestor de inventario creado para Sesa Promo, una empresa con sede en Monterrey que se especializa en la venta de productos promocionales. La solución incluye una forma de registrar y gestionar productos, categorías, y organizar el stock a través de los diferentes almacenes que tiene la empresa, con la capacidad de crearlos o editarlos.',
        'projects.details_button': 'Detalles del Proyecto',

        // Contact Section
        'contact.title': 'Conectemos',
        'contact.description': 'Siempre estoy abierto a discutir nuevas oportunidades, colaborar en proyectos emocionantes, o simplemente tener una charla sobre tecnología y desarrollo.',
        'contact.ready': '¿Listo para comenzar una conversación?',
        'contact.reach_out': 'No dudes en contactarme a través de cualquiera de las plataformas de arriba',

        // Email Modal
        'email.modal.title': 'Información de Contacto',
        'email.modal.label': 'Dirección de Email',
        'email.modal.copy': 'Copiar',
        'email.modal.copied': '¡Copiado!',
        'email.modal.description': '¡No dudes en contactarme para oportunidades de colaboración, preguntas, o simplemente para saludar!',
        'email.modal.close': 'Cerrar',

        // Social Labels
        'social.linkedin': 'LinkedIn',
        'social.github': 'GitHub',
        'social.email': 'Email',

        // Theme Toggle
        'theme.light': 'Cambiar a modo claro',
        'theme.dark': 'Cambiar a modo oscuro',
    }
};

// Crear el contexto
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

// Proveedor del contexto
interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(() => {
        // Intentar obtener el idioma guardado
        const savedLanguage = localStorage.getItem('portfolio-language') as Language;
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
            return savedLanguage;
        }

        // Detectar idioma del navegador
        const browserLanguage = navigator.language.toLowerCase();
        if (browserLanguage.startsWith('es')) {
            return 'es';
        }

        return 'en'; // Idioma por defecto
    });

    // Función para cambiar idioma
    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('portfolio-language', lang);

        // Actualizar el atributo lang del documento
        document.documentElement.lang = lang;
    };

    // Función de traducción
    const t = (key: string): string => {
        const translation = translations[language][key as keyof typeof translations[typeof language]];

        if (!translation) {
            console.warn(`Translation missing for key: ${key} in language: ${language}`);
            return key; // Retorna la clave si no encuentra la traducción
        }

        return translation;
    };

    // Establecer el idioma en el documento al montar
    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    const value = {
        language,
        setLanguage: handleSetLanguage,
        t
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};