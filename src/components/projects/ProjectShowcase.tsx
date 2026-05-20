import React, { useState, useEffect } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  logo: string;
  title: string;
  description: string;
  images: string[];
  url: string;
  textColor: string;
}

const projects: Project[] = [
  {
    id: '1',
    name: 'Ally DSM',
    color: '#8B5CF6',
    gradientFrom: '#8B5CF6',
    gradientTo: '#7C3AED',
    logo: '🪚',
    title: 'Ally DSM',
    description: 'Digital platform designed to support individuals with Dravet Syndrome and their families. Provides educational resources, community connection, and tools for managing daily care and treatment.',
    images: ['/allay/allay-img-0.webp', '/allay/allay-img-1.webp'],
    url: 'https://allyweb.bydaffi.com/',
    textColor: '#5B21B6'
  },
  {
    id: '2',
    name: 'Catssets',
    color: '#F59E0B',
    gradientFrom: '#F59E0B',
    gradientTo: '#D97706',
    logo: '🐱',
    title: 'Catssets',
    description: 'A delightful cat-themed asset management platform. Organize, preview, and share your digital assets with a playful feline-inspired interface.',
    images: ['/placeholder-1.jpg', '/placeholder-2.jpg'],
    url: '#',
    textColor: '#92400E'
  },
  {
    id: '3',
    name: 'Violet Dream',
    color: '#A855F7',
    gradientFrom: '#A855F7',
    gradientTo: '#9333EA',
    logo: '✨',
    title: 'Violet Dream Engine',
    description: 'Next-generation 3D rendering engine with unparalleled performance. Built for creators who demand excellence and precision in every frame.',
    images: ['/placeholder-1.jpg', '/placeholder-2.jpg', '/placeholder-3.jpg', '/placeholder-4.jpg'],
    url: '#',
    textColor: '#581C87'
  },
  {
    id: '4',
    name: 'Obsidian Core',
    color: '#1F2937',
    gradientFrom: '#1F2937',
    gradientTo: '#111827',
    logo: '⚫',
    title: 'Obsidian Core Systems',
    description: 'Enterprise-grade infrastructure management platform. Robust, secure, and scalable solutions for mission-critical operations.',
    images: ['/placeholder-1.jpg'],
    url: '#',
    textColor: '#F9FAFB'
  },
  {
    id: '5',
    name: 'Okiro Tarot Cards Mod',
    color: '#F97316',
    gradientFrom: '#F97316',
    gradientTo: '#EA580C',
    logo: '/tarot/icon2.png',
    title: 'Okiro Tarot Cards Mod',
    description: 'A Minecraft mod that introduces mystical tarot cards into the game. Players can craft, collect, and use tarot cards to gain unique abilities, foresee events, and enhance their gameplay experience with magical divination mechanics.',
    images: ['/tarot/tarot0.png', '/tarot/tarot1.webp', '/placeholder-3.jpg'],
    url: 'https://www.curseforge.com/minecraft/mc-mods/okiro-tarot-cards',
    textColor: '#7C2D12'
  }
];

/* Icono del proyecto: ruta de imagen para los proyectos 1/2/5, null si usa emoji. */
const iconSrc = (p: Project): string | null => {
  if (p.id === '1') return '/allay/profile.png';
  if (p.id === '2') return '/catssets/logo dr wako.svg';
  if (p.id === '5') return p.logo;
  return null;
};

const ProjectShowcase: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDark, setIsDark] = useState(false);

  // Estado del rail de proyectos (colapsado por defecto; se expande al hover).
  const [railHovered, setRailHovered] = useState(false);
  const [railFocused, setRailFocused] = useState(false);
  const [clickCollapsed, setClickCollapsed] = useState(false);
  const [canHover, setCanHover] = useState(true);

  // En táctil no hay hover: el rail queda expandido y dentro del flujo normal.
  const railExpanded = !canHover || railFocused || (railHovered && !clickCollapsed);

  useEffect(() => {
    // Detectar el tema inicial
    const checkTheme = () => {
      const hasDarkClass =
        document.documentElement.classList.contains('dark') ||
        document.body.classList.contains('dark');
      setIsDark(hasDarkClass);
    };

    checkTheme();

    // Observer para detectar cambios en el tema
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Detecta si el dispositivo puede hacer hover (escritorio vs táctil).
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover)');
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setClickCollapsed(true); // al elegir, el rail se contrae aunque el mouse siga encima
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % selectedProject.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      (prev - 1 + selectedProject.images.length) % selectedProject.images.length
    );
  };

  // Color de fondo de la página según el tema
  const pageBackgroundColor = isDark ? '#151A1F' : '#FCFCFB';

  return (
    <section
      id="projects"
      className="min-h-screen w-full flex relative overflow-hidden transition-all duration-700 ease-in-out shadow-none border-0"
      style={{
        backgroundColor: pageBackgroundColor
      }}
    >

      {/* Spacer: reserva el ancho del rail colapsado (solo en escritorio, donde el rail flota sobre el contenido) */}
      {canHover && <div className="w-20 flex-shrink-0" aria-hidden="true" />}

      {/* Rail de proyectos — colapsado (solo iconos); se expande al pasar el
          mouse o al enfocar con teclado, y se contrae al elegir un proyecto. */}
      <aside
        aria-label="Projects"
        onMouseEnter={() => setRailHovered(true)}
        onMouseLeave={() => {
          setRailHovered(false);
          setClickCollapsed(false);
        }}
        onFocus={(e) => {
          if ((e.target as HTMLElement).matches(':focus-visible')) {
            setRailFocused(true);
          }
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
            setRailFocused(false);
          }
        }}
        className={`flex flex-col justify-center flex-shrink-0 overflow-hidden border-r
                    border-neutral-200 bg-bg-light transition-[width,box-shadow]
                    duration-300 ease-[cubic-bezier(.2,.8,.2,1)] dark:border-neutral-800
                    dark:bg-bg-dark motion-reduce:transition-none
                    ${canHover ? 'absolute inset-y-0 left-0 z-20' : 'relative'}
                    ${railExpanded ? 'w-[272px]' : 'w-20'}
                    ${canHover && railExpanded ? 'shadow-2xl shadow-black/10 dark:shadow-black/40' : ''}`}
      >
        <div className="flex flex-col gap-1 px-2.5">
          {/* Encabezado */}
          <div className="mb-3 flex items-center gap-3 px-2.5">
            <span className="flex w-10 shrink-0 justify-center">
              <LayoutGrid size={18} strokeWidth={2} className="text-neutral-400 dark:text-neutral-500" />
            </span>
            <span
              aria-hidden="true"
              className={`whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em]
                          text-neutral-400 transition-opacity duration-200 dark:text-neutral-500
                          ${railExpanded ? 'opacity-100 delay-75' : 'opacity-0'}`}
            >
              Projects
            </span>
          </div>

          {/* Lista de proyectos */}
          {projects.map((project) => {
            const src = iconSrc(project);
            const active = selectedProject.id === project.id;
            return (
              <button
                key={project.id}
                aria-label={project.name}
                aria-current={active ? 'true' : undefined}
                onClick={() => handleProjectSelect(project)}
                className={`group relative flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5
                            outline-none transition-colors duration-150 focus-visible:ring-2
                            focus-visible:ring-inset focus-visible:ring-tropical-indigo
                            motion-reduce:transition-none
                            ${active
                              ? 'bg-black/[0.055] dark:bg-white/[0.07]'
                              : 'hover:bg-black/[0.035] dark:hover:bg-white/[0.05]'}`}
              >
                {/* Barra de acento del proyecto activo (visible colapsado y expandido) */}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-r-full
                              bg-tekhelet transition-opacity duration-200 dark:bg-tropical-indigo
                              motion-reduce:transition-none ${active ? 'opacity-100' : 'opacity-0'}`}
                />

                {/* Icono */}
                <span className="flex h-10 w-10 shrink-0 items-center justify-center">
                  {src ? (
                    <img
                      src={src}
                      alt=""
                      className="h-10 w-10 rounded-lg object-cover transition-transform duration-200
                                 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-105
                                 motion-reduce:transition-none"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="text-3xl leading-none transition-transform duration-200
                                 group-hover:scale-105 motion-reduce:transition-none"
                    >
                      {project.logo}
                    </span>
                  )}
                </span>

                {/* Nombre — se revela al expandir el rail */}
                <span
                  aria-hidden="true"
                  className={`whitespace-nowrap text-sm font-medium transition-opacity duration-200
                              ${active
                                ? 'text-neutral-900 dark:text-neutral-50'
                                : 'text-neutral-500 dark:text-neutral-400'}
                              ${railExpanded ? 'opacity-100 delay-75' : 'opacity-0'}`}
                >
                  {project.name}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center p-12 relative z-10">
        <div className="max-w-5xl w-full">
          {/* Project Details */}
          <div className="mb-12 animate-fadeIn">
            <div className="flex items-center gap-6 mb-6">
              {selectedProject.id === '1' || selectedProject.id === '2' || selectedProject.id === '5' ? (
                <img
                  src={selectedProject.id === '1' ? "/allay/profile.png" : selectedProject.id === '2' ? "/catssets/logo dr wako.svg" : selectedProject.logo}
                  alt={selectedProject.name}
                  className="w-24 h-24 rounded-2xl object-cover"
                />
              ) : (
                <span className="text-8xl">{selectedProject.logo}</span>
              )}
              <div>
                <h1
                  className="text-6xl font-bold mb-2 text-neutral-900 dark:text-neutral-50 transition-colors duration-150"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  {selectedProject.title}
                </h1>
              </div>
            </div>

            <p className="text-xl leading-relaxed max-w-3xl mb-8 text-neutral-600 dark:text-neutral-300 transition-colors duration-150">
              {selectedProject.description}
            </p>

            <button
              onClick={() => window.open(selectedProject.url, '_blank')}
              className="group px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-500 flex items-center gap-3 hover:gap-5 backdrop-blur-md hover:scale-105 shadow-lg hover:shadow-2xl cursor-pointer bg-black/10 dark:bg-white/20 text-neutral-900 dark:text-neutral-50 border-2 border-black/20 dark:border-white/30"
            >
              Visit Project
              <ExternalLink size={20} className="transition-transform duration-300 group-hover:rotate-12" />
            </button>

            {/* Title Image for Okiro Tarot */}
            {selectedProject.id === '5' && (
              <div className="mt-8 w-full">
                <img
                  src="/tarot/tittle.png"
                  alt="Okiro Tarot Cards Mod Title"
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </div>
            )}
          </div>

          {/* Image Gallery */}
          {selectedProject.images.length > 0 && (
            <div className="relative group/gallery mx-auto">
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm bg-white/10 border border-white/20">
                {selectedProject.id !== '1' && selectedProject.id !== '2' && selectedProject.id !== '5' && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none text-neutral-900 dark:text-neutral-50">
                    <span className="text-9xl">{selectedProject.logo}</span>
                  </div>
                )}

                <img
                  src={selectedProject.images[currentImageIndex]}
                  alt={`${selectedProject.name} screenshot ${currentImageIndex + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Navigation Arrows */}
                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className={`absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-md transition-all duration-300 opacity-0 group-hover/gallery:opacity-100 hover:scale-110 shadow-lg bg-black/20 dark:bg-white/20 cursor-pointer ${selectedProject.id === '1' || selectedProject.id === '2' ? 'text-white' : 'text-neutral-900 dark:text-neutral-50'}`}
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-md transition-all duration-300 opacity-0 group-hover/gallery:opacity-100 hover:scale-110 shadow-lg bg-black/20 dark:bg-white/20 cursor-pointer ${selectedProject.id === '1' || selectedProject.id === '2' ? 'text-white' : 'text-neutral-900 dark:text-neutral-50'}`}
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                {/* Image Indicators */}
                {selectedProject.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedProject.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          selectedProject.id === '1' || selectedProject.id === '2'
                            ? (index === currentImageIndex ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:scale-125')
                            : (index === currentImageIndex ? 'w-8 bg-neutral-900 dark:bg-neutral-50' : 'w-2 bg-black/40 dark:bg-white/40 hover:scale-125')
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;
