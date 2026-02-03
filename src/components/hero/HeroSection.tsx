import React, { useEffect, useState, useRef } from "react";

const HeroSection: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const gradientRef = useRef<HTMLDivElement>(null);
  const lightImageRef = useRef<HTMLImageElement>(null);
  const darkImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Detectar el tema inicial
    const checkTheme = () => {
      const hasDarkClass =
        document.documentElement.classList.contains("dark") ||
        document.body.classList.contains("dark");
      setIsDark(hasDarkClass);
    };

    checkTheme();

    // Observer para detectar cambios en el tema
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Manipulación directa del DOM para el scroll
    const handleScroll = () => {
      if (
        !gradientRef.current ||
        !lightImageRef.current ||
        !darkImageRef.current
      )
        return;

      const scrollY = window.scrollY;

      // Threshold para el degradado (altura y opacidad)
      const gradientThreshold = 500;
      const progress = Math.min(scrollY / gradientThreshold, 1);

      // La opacidad del degradado sube muy rápido (primeros 50px)
      const gradientOpacity = Math.min(scrollY / 50, 1);

      // Threshold más alto para las imágenes (desaparecen más lento)
      const imageThreshold = 500;
      const imageOpacity = Math.max(1 - scrollY / imageThreshold, 0);

      // La altura crece de 30% a 50% según el scroll
      const minHeight = 30;
      const maxHeight = 50;
      const height = minHeight + (maxHeight - minHeight) * progress;

      // Actualizar el degradado
      gradientRef.current.style.opacity = gradientOpacity.toString();
      gradientRef.current.style.height = `${height}%`;

      // Actualizar opacidad de las imágenes (se desvanecen con el scroll)
      if (isDark) {
        darkImageRef.current.style.opacity = imageOpacity.toString();
      } else {
        lightImageRef.current.style.opacity = imageOpacity.toString();
      }
    };

    // Ejecutar al montar
    handleScroll();

    // Agregar listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDark]);

  return (
    <div className="hero-container w-full h-screen flex flex-col items-center justify-center relative overflow-hidden bg-bg-light dark:bg-bg-dark">
      {/* Imagen de fondo modo claro */}
      <img
        ref={lightImageRef}
        src="/fondo_light_2k.png"
        alt="Hero background light"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
        style={{ opacity: isDark ? 0 : 1 }}
      />

      {/* Imagen de fondo modo oscuro */}
      <img
        ref={darkImageRef}
        src="/fondo_dark_2k.png"
        alt="Hero background dark"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
        style={{ opacity: isDark ? 1 : 0 }}
      />

      {/* Degradado en la parte inferior para hacer fade con la siguiente sección */}
      <div
        ref={gradientRef}
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-[5]"
        style={{
          height: "30%",
          opacity: 0,
          background: isDark
            ? "linear-gradient(to bottom, rgba(21, 26, 31, 0) 0%, rgba(21, 26, 31, 0.8) 50%, rgba(21, 26, 31, 1) 100%)"
            : "linear-gradient(to bottom, rgba(252, 252, 251, 0) 0%, rgba(252, 252, 251, 0.8) 50%, rgba(252, 252, 251, 1) 100%)",
          transition: "background 700ms ease-in-out",
        }}
      />

      {/* Texto "Koss" */}
      <h1
        className="hero-text text-9xl font-serif tracking-wider z-10 relative transition-colors duration-700"
        style={{
          color: isDark ? "#FCFCFB" : "#171717",
          fontFamily: '"Playfair Display", serif',
          fontWeight: 700,
          letterSpacing: "0.15em",
        }}
      >
        Koss
      </h1>
    </div>
  );
};

export default HeroSection;
