
import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from "lucide-react";

const ToggleDarkMode: React.FC = () => {
    // Usamos useState para manejar el estado del dark mode
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    // Verificar el tema preferido al inicio, ya sea en localStorage o preferencias del sistema
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
            className="p-5 pr-10 flex items-center transition-colors duration-200 ease-in-out focus:outline-none"
            aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
            {isDarkMode ? (
                <SunIcon className="w-6 h-6 text-tropical-indigo hover:text-violet-100 cursor-pointer" />
            ) : (
                <MoonIcon className="w-6 h-6 text-tekhelet hover:text-tekhelet-dark cursor-pointer" />
            )}
        </button>
    );
};

export default ToggleDarkMode;