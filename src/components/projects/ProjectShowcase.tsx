import React, { useState, useEffect } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

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

const ProjectShowcase: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDark, setIsDark] = useState(false);

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

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
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

      {/* Project List Sidebar */}
      <div className="w-80 flex-shrink-0 p-8 relative z-10 flex flex-col justify-center">
        <div className="space-y-2">
          <h2 className="text-sm font-bold tracking-widest mb-8 text-neutral-900/60 dark:text-neutral-50/60 transition-colors duration-150">
            PROJECTS
          </h2>

          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => handleProjectSelect(project)}
              className={`
                w-full text-left px-6 py-4 rounded-2xl transition-all duration-500 group
                ${selectedProject.id === project.id
                  ? 'bg-white/20 backdrop-blur-md shadow-xl scale-105'
                  : 'hover:bg-white/10 backdrop-blur-sm hover:scale-102'
                }
              `}
            >
              <div className="flex items-center gap-4">
                {project.id === '1' || project.id === '2' || project.id === '5' ? (
                  <img 
                    src={project.id === '1' ? "/allay/profile.png" : project.id === '2' ? "/catssets/logo dr wako.svg" : project.logo}
                    alt={project.name}
                    className="w-10 h-10 rounded-lg object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
                    {project.logo}
                  </span>
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-50 transition-colors duration-150">
                    {project.name}
                  </h3>
                </div>
                {selectedProject.id === project.id && (
                  <div className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-neutral-50 transition-all duration-500" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

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
