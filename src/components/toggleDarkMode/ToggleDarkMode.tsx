import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from "lucide-react";
import {useLanguage} from "../../context/LanguageContext.tsx";


const ToggleDarkMode: React.FC = () => {
    const { t } = useLanguage();

    // Inicializar con el tema del cache para evitar flash del icono
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        const THEME_KEY = 'portfolio-theme';
        const savedTheme = localStorage.getItem(THEME_KEY);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return savedTheme === 'dark' || (!savedTheme && prefersDark);
    });

    // Sincronizar con el estado actual del tema
    useEffect(() => {
        // Leer el estado actual del DOM y localStorage
        const THEME_KEY = 'portfolio-theme';
        const savedTheme = localStorage.getItem(THEME_KEY);

        // Si hay discrepancia, usar el tema guardado como fuente de verdad
        const shouldBeDark = savedTheme === 'dark' ||
            (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);

        setIsDarkMode(shouldBeDark);

        // Escuchar cambios en el tema (opcional, para sincronización entre pestañas)
        const observer = new MutationObserver(() => {
            const isNowDark = document.body.classList.contains('dark');
            setIsDarkMode(isNowDark);
        });

        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);

    // Función para cambiar tema usando transiciones
    const toggleTheme = () => {
        const THEME_KEY = 'portfolio-theme';
        const currentlyDark = isDarkMode; // Usar el estado local como referencia
        const newTheme = currentlyDark ? 'light' : 'dark';

        if (currentlyDark) {
            document.documentElement.classList.remove('dark');
            document.body.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
            document.body.classList.add('dark');
        }

        // Guardar preferencia
        localStorage.setItem(THEME_KEY, newTheme);
        setIsDarkMode(!currentlyDark);
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-5 pr-10 flex items-center focus:outline-none transition-colors duration-200"
            aria-label={isDarkMode ? t('theme.light') : t('theme.dark')}
        >
            {isDarkMode ? (
                <MoonIcon className="w-6 h-6 text-tropical-indigo hover:text-violet-100 cursor-pointer transition-colors duration-200" />
            ) : (
                <SunIcon className="w-6 h-6 text-tekhelet hover:text-tekhelet-dark cursor-pointer transition-colors duration-200" />
            )}
        </button>
    );
};

export default ToggleDarkMode;