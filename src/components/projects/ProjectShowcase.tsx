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
  hidden?: boolean;
}

interface SkoposSlide {
  src: string;
  alt: string;
  eyebrow: string;
  caption: string;
}

const skoposSlides: SkoposSlide[] = [
  {
    src: '/skopos/skopos-rpl.png',
    alt: 'Skopos interactive REPL',
    eyebrow: 'Interactive REPL',
    caption: 'Local-first cockpit — commands, usage and costs in one place.',
  },
  {
    src: '/skopos/skopos-code.png',
    alt: 'Skopos project picker',
    eyebrow: 'Project picker',
    caption: 'Jump between repos and providers without leaving the terminal.',
  },
  {
    src: '/skopos/skopos-network.png',
    alt: 'Skopos network monitor',
    eyebrow: 'Network monitor',
    caption: 'Latency, outages and link history at a glance.',
  },
  {
    src: '/skopos/skopos-usage.png',
    alt: 'Skopos usage and limits',
    eyebrow: 'Usage & limits',
    caption: 'Tokens, costs and reset windows per provider.',
  },
  {
    src: '/skopos/skopos-pallete.png',
    alt: 'Skopos palette and profiles',
    eyebrow: 'Palette & profiles',
    caption: 'Swap themes and scoped profiles on the fly.',
  },
];

const projects: Project[] = [
  {
    id: 'skopos',
    name: 'Skopos',
    color: '#7C3AED',
    gradientFrom: '#7C3AED',
    gradientTo: '#4C1D95',
    logo: '/skopos/skopos-logo.png',
    title: 'Skopos',
    description: 'Local-first observability for AI usage. A Rust CLI that tracks tokens, costs, and rate limits across Claude Code, Codex, Gemini and Hermes from a single terminal-native workflow.',
    images: [],
    url: 'https://skopos.bydaffi.com',
    textColor: '#4C1D95'
  },
  {
    id: 'ally',
    name: 'Ally DSM',
    color: '#8B5CF6',
    gradientFrom: '#8B5CF6',
    gradientTo: '#7C3AED',
    logo: '/allay/profile.png',
    title: 'Ally DSM',
    description: 'Digital platform designed to support individuals with Dravet Syndrome and their families. Provides educational resources, community connection, and tools for managing daily care and treatment.',
    images: ['/allay/allay-img-0.webp', '/allay/allay-img-1.webp'],
    url: 'https://allyweb.bydaffi.com/',
    textColor: '#5B21B6'
  },
  {
    id: 'footprint',
    name: 'Footprint',
    color: '#A855F7',
    gradientFrom: '#A855F7',
    gradientTo: '#7E22CE',
    logo: '🦶',
    title: 'Footprint',
    description: 'Personal map web app for marking and remembering the places you have visited. Custom marker types, photo memories, a radial category search, and a shared "lazo" mode for couples — built with React, Firebase, and Google Maps.',
    images: [],
    url: '#',
    textColor: '#581C87',
    hidden: true
  },
  {
    id: 'catssets',
    name: 'Catssets',
    color: '#F59E0B',
    gradientFrom: '#F59E0B',
    gradientTo: '#D97706',
    logo: '/catssets/logo dr wako.svg',
    title: 'Catssets',
    description: 'A delightful cat-themed asset management platform. Organize, preview, and share your digital assets with a playful feline-inspired interface.',
    images: ['/placeholder-1.jpg', '/placeholder-2.jpg'],
    url: '#',
    textColor: '#92400E',
    hidden: true
  },
  {
    id: 'otter-finance',
    name: 'Otter Finance',
    color: '#0EA5E9',
    gradientFrom: '#0EA5E9',
    gradientTo: '#0369A1',
    logo: '🦦',
    title: 'Otter Finance',
    description: 'Personal finance app focused on helping users take control of their money: expense tracking, credit history, provisional tax filings, invoicing, and more — all in one place.',
    images: [],
    url: '#',
    textColor: '#0C4A6E',
    hidden: true
  },
  {
    id: 'tarot',
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

/* Si `logo` empieza con `/` es un asset (imagen); si no, es un emoji. */
const iconSrc = (p: Project): string | null => (p.logo.startsWith('/') ? p.logo : null);

/* Proyectos cuyas galerías usan controles claros sobre imágenes oscuras/saturadas. */
const hasDarkGallery = (id: string) => id === 'ally' || id === 'catssets';

/* Visibles en el showcase. Toggle `hidden: true` para ocultar en producción. */
const visibleProjects = projects.filter((p) => !p.hidden);

const ProjectShowcase: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project>(visibleProjects[0]);
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
          {visibleProjects.map((project) => {
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
              {iconSrc(selectedProject) ? (
                <img
                  src={iconSrc(selectedProject)!}
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

            {selectedProject.url && selectedProject.url !== '#' ? (
              <button
                onClick={() => window.open(selectedProject.url, '_blank')}
                className="group px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-500 flex items-center gap-3 hover:gap-5 backdrop-blur-md hover:scale-105 shadow-lg hover:shadow-2xl cursor-pointer bg-black/10 dark:bg-white/20 text-neutral-900 dark:text-neutral-50 border-2 border-black/20 dark:border-white/30"
              >
                Visit Project
                <ExternalLink size={20} className="transition-transform duration-300 group-hover:rotate-12" />
              </button>
            ) : (
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium tracking-wide text-neutral-500 dark:text-neutral-400 bg-black/[0.04] dark:bg-white/[0.06] border border-black/10 dark:border-white/10">
                Coming soon
              </span>
            )}

            {/* Title Image for Okiro Tarot */}
            {selectedProject.id === 'tarot' && (
              <div className="mt-8 w-full">
                <img
                  src="/tarot/tittle.png"
                  alt="Okiro Tarot Cards Mod Title"
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </div>
            )}

          </div>

          {/* Skopos carousel: REPL first, then project picker, network, usage,
              palette. Screenshots have dark backgrounds and varied aspect ratios,
              so we use object-contain on a near-black canvas with a per-slide
              caption (light text, violet eyebrow). */}
          {selectedProject.id === 'skopos' && (() => {
            const slide = skoposSlides[currentImageIndex % skoposSlides.length];
            const goNext = () => setCurrentImageIndex((prev) => (prev + 1) % skoposSlides.length);
            const goPrev = () => setCurrentImageIndex((prev) => (prev - 1 + skoposSlides.length) % skoposSlides.length);
            return (
              <div className="relative group/gallery mx-auto">
                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-neutral-950">
                  <img
                    key={slide.src}
                    src={slide.src}
                    alt={slide.alt}
                    className="absolute inset-0 w-full h-full object-contain animate-fadeIn"
                  />

                  {/* Caption strip */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent px-6 py-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-300/90">
                      {slide.eyebrow}
                    </p>
                    <p className="mt-1 text-sm text-white/90">{slide.caption}</p>
                  </div>

                  {/* Navigation arrows */}
                  <button
                    onClick={goPrev}
                    aria-label="Previous screenshot"
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-md transition-all duration-300 opacity-0 group-hover/gallery:opacity-100 hover:scale-110 shadow-lg bg-white/15 text-white cursor-pointer"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={goNext}
                    aria-label="Next screenshot"
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-md transition-all duration-300 opacity-0 group-hover/gallery:opacity-100 hover:scale-110 shadow-lg bg-white/15 text-white cursor-pointer"
                  >
                    <ChevronRight size={24} />
                  </button>

                  {/* Dots */}
                  <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
                    {skoposSlides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        aria-label={`Go to slide ${index + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          index === currentImageIndex ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:scale-125'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Image Gallery */}
          {selectedProject.images.length > 0 && (
            <div className="relative group/gallery mx-auto">
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm bg-white/10 border border-white/20">
                {!iconSrc(selectedProject) && (
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
                      className={`absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-md transition-all duration-300 opacity-0 group-hover/gallery:opacity-100 hover:scale-110 shadow-lg bg-black/20 dark:bg-white/20 cursor-pointer ${hasDarkGallery(selectedProject.id) ? 'text-white' : 'text-neutral-900 dark:text-neutral-50'}`}
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-md transition-all duration-300 opacity-0 group-hover/gallery:opacity-100 hover:scale-110 shadow-lg bg-black/20 dark:bg-white/20 cursor-pointer ${hasDarkGallery(selectedProject.id) ? 'text-white' : 'text-neutral-900 dark:text-neutral-50'}`}
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
                          hasDarkGallery(selectedProject.id)
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
