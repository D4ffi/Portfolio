import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from "lucide-react";

const ToggleDarkMode: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    useEffect(() => {
        // Verificar preferencia guardada en localStorage
        const savedTheme = localStorage.getItem('theme');
        // Verificar preferencia del sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Si hay un tema guardado o el sistema prefiere oscuro, activar dark mode
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDarkMode(true);
            document.body.classList.add('dark');
        }
    }, []);

    // Función para cambiar entre modos claro y oscuro
    const toggleDarkMode = () => {
        if (isDarkMode) {
            // Cambiar a modo claro
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            // Cambiar a modo oscuro
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        setIsDarkMode(!isDarkMode);
    };

    return (
        <button
            onClick={toggleDarkMode}
            className="p-2 sm:p-3 md:p-4 lg:p-5 flex items-center transition-colors duration-200 ease-in-out focus:outline-none"
            aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
            {isDarkMode ? (
                <MoonIcon className="w-5 h-5 sm:w-6 sm:h-6 text-tropical-indigo hover:text-violet-100 cursor-pointer transition-colors duration-200" />
            ) : (
                <SunIcon className="w-5 h-5 sm:w-6 sm:h-6 text-tekhelet hover:text-tekhelet-dark cursor-pointer transition-colors duration-200" />
            )}
        </button>
    );
};

export default ToggleDarkMode;