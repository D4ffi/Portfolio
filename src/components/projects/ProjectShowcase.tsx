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
    name: 'Azure Wave',
    color: '#60A5FA',
    gradientFrom: '#60A5FA',
    gradientTo: '#3B82F6',
    logo: '🌊',
    title: 'Azure Wave Platform',
    description: 'A comprehensive cloud-based solution for managing distributed teams. Features real-time collaboration, advanced analytics, and seamless integration with existing workflows.',
    images: ['/placeholder-1.jpg', '/placeholder-2.jpg', '/placeholder-3.jpg'],
    url: '#',
    textColor: '#1E3A8A'
  },
  {
    id: '2',
    name: 'Crimson Flow',
    color: '#EF4444',
    gradientFrom: '#EF4444',
    gradientTo: '#DC2626',
    logo: '🔥',
    title: 'Crimson Flow Studio',
    description: 'Revolutionary design tool that brings creativity to life. Powerful features combined with an intuitive interface for designers and artists worldwide.',
    images: ['/placeholder-1.jpg', '/placeholder-2.jpg'],
    url: '#',
    textColor: '#7F1D1D'
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
    name: 'Tangerine Spark',
    color: '#F97316',
    gradientFrom: '#F97316',
    gradientTo: '#EA580C',
    logo: '🧡',
    title: 'Tangerine Spark Labs',
    description: 'Innovation hub for cutting-edge research and development. Where bold ideas transform into revolutionary products that shape the future.',
    images: ['/placeholder-1.jpg', '/placeholder-2.jpg', '/placeholder-3.jpg'],
    url: '#',
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
      className="min-h-screen w-full flex relative overflow-hidden transition-all duration-1000 ease-in-out shadow-none border-0"
      style={{
        backgroundColor: pageBackgroundColor
      }}
    >

      {/* Project List Sidebar */}
      <div className="w-80 flex-shrink-0 p-8 relative z-10 flex flex-col justify-center">
        <div className="space-y-2">
          <h2
            className="text-sm font-bold tracking-widest mb-8 transition-colors duration-700"
            style={{
              color: selectedProject.id === '4' ? '#F9FAFB' : '#1F2937',
              opacity: 0.6
            }}
          >
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
                <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
                  {project.logo}
                </span>
                <div className="flex-1">
                  <h3
                    className="font-bold text-lg transition-colors duration-700"
                    style={{
                      color: selectedProject.id === '4' ? '#F9FAFB' : '#1F2937'
                    }}
                  >
                    {project.name}
                  </h3>
                </div>
                {selectedProject.id === project.id && (
                  <div
                    className="w-2 h-2 rounded-full transition-all duration-500"
                    style={{ backgroundColor: selectedProject.id === '4' ? '#F9FAFB' : '#1F2937' }}
                  />
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
              <span className="text-8xl">{selectedProject.logo}</span>
              <div>
                <h1
                  className="text-6xl font-bold mb-2 transition-colors duration-700"
                  style={{
                    color: selectedProject.id === '4' ? '#F9FAFB' : '#1F2937',
                    fontFamily: '"Playfair Display", serif'
                  }}
                >
                  {selectedProject.title}
                </h1>
              </div>
            </div>

            <p
              className="text-xl leading-relaxed max-w-3xl mb-8 transition-colors duration-700"
              style={{
                color: selectedProject.id === '4' ? '#E5E7EB' : '#374151'
              }}
            >
              {selectedProject.description}
            </p>

            <button
              onClick={() => window.open(selectedProject.url, '_blank')}
              className="group px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-500 flex items-center gap-3 hover:gap-5 backdrop-blur-md hover:scale-105 shadow-lg hover:shadow-2xl"
              style={{
                backgroundColor: selectedProject.id === '4' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                color: selectedProject.id === '4' ? '#F9FAFB' : '#1F2937',
                border: `2px solid ${selectedProject.id === '4' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)'}`
              }}
            >
              Visit Project
              <ExternalLink size={20} className="transition-transform duration-300 group-hover:rotate-12" />
            </button>
          </div>

          {/* Image Gallery */}
          {selectedProject.images.length > 0 && (
            <div className="relative group/gallery">
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm bg-white/10 border border-white/20">
                <div
                  className="absolute inset-0 flex items-center justify-center text-9xl opacity-20"
                  style={{ color: selectedProject.id === '4' ? '#F9FAFB' : '#1F2937' }}
                >
                  {selectedProject.logo}
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <p
                    className="text-2xl font-semibold"
                    style={{ color: selectedProject.id === '4' ? '#F9FAFB' : '#1F2937' }}
                  >
                    Image Gallery Placeholder
                  </p>
                </div>

                {/* Navigation Arrows */}
                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-md transition-all duration-300 opacity-0 group-hover/gallery:opacity-100 hover:scale-110 shadow-lg"
                      style={{
                        backgroundColor: selectedProject.id === '4' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                        color: selectedProject.id === '4' ? '#F9FAFB' : '#1F2937'
                      }}
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-md transition-all duration-300 opacity-0 group-hover/gallery:opacity-100 hover:scale-110 shadow-lg"
                      style={{
                        backgroundColor: selectedProject.id === '4' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                        color: selectedProject.id === '4' ? '#F9FAFB' : '#1F2937'
                      }}
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
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex ? 'w-8' : 'hover:scale-125'
                        }`}
                        style={{
                          backgroundColor: index === currentImageIndex
                            ? (selectedProject.id === '4' ? '#F9FAFB' : '#1F2937')
                            : (selectedProject.id === '4' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)')
                        }}
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
