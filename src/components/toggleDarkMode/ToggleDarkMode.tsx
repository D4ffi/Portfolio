import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext.tsx";

const ToggleDarkMode: React.FC = () => {
    const { t } = useLanguage();

    // Función para leer el estado REAL del DOM
    const readDOMTheme = (): boolean => {
        return document.body.classList.contains('dark') ||
            document.documentElement.classList.contains('dark');
    };

    // Inicializar leyendo primero el DOM, luego localStorage
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        // Si estamos en el navegador, leer el estado real del DOM primero
        if (typeof window !== 'undefined') {
            // Intentar leer del DOM (más confiable)
            const domHasDark = readDOMTheme();

            // Si el DOM ya tiene la clase dark, usar eso
            if (domHasDark) {
                return true;
            }

            // Si no, verificar localStorage
            const THEME_KEY = 'portfolio-theme';
            const savedTheme = localStorage.getItem(THEME_KEY);
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            return savedTheme === 'dark' || (!savedTheme && prefersDark);
        }

        return false; // SSR fallback
    });

    // Sincronización en el mount y cuando cambie el DOM
    useEffect(() => {
        // Función para sincronizar el estado con el DOM real
        const syncWithDOM = () => {
            const currentDOMState = readDOMTheme();

            // Solo actualizar si hay diferencia
            if (currentDOMState !== isDarkMode) {
                console.log('🔄 Syncing icon with DOM state:', currentDOMState);
                setIsDarkMode(currentDOMState);
            }
        };

        // Sincronizar inmediatamente
        syncWithDOM();

        // Observer para detectar cambios en las clases del DOM
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' &&
                    (mutation.attributeName === 'class')) {
                    syncWithDOM();
                }
            });
        });

        // Observar cambios en body y html
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        // Listener para cambios de localStorage entre pestañas
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'portfolio-theme') {
                // Pequeño delay para que el DOM se actualice primero
                setTimeout(syncWithDOM, 50);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            observer.disconnect();
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []); // Solo ejecutar una vez al montar

    // Función para cambiar tema
    const toggleTheme = () => {
        const THEME_KEY = 'portfolio-theme';
        const newTheme = !isDarkMode;

        // Aplicar cambios al DOM
        if (newTheme) {
            document.documentElement.classList.add('dark');
            document.body.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.body.classList.remove('dark');
        }

        // Guardar en localStorage
        localStorage.setItem(THEME_KEY, newTheme ? 'dark' : 'light');

        // Actualizar estado local
        setIsDarkMode(newTheme);
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