import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ExternalLink, Eye } from 'lucide-react';
import {useLanguage} from "../../context/LanguageContext.tsx";

interface ProjectCardProps {
    images: string[];
    title: string;
    description: string;
    technologies: string[];
    onExpand?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
                                                     images,
                                                     title,
                                                     description,
                                                     technologies,
                                                     onExpand
                                                 }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const { t } = useLanguage();

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const openImageModal = () => {
        setIsImageModalOpen(true);
    };

    const closeImageModal = () => {
        setIsImageModalOpen(false);
    };

    // Colores para las etiquetas de tecnologías con glassmorphism
    const techColors = [
        'bg-blue-500/20 text-blue-900 border-blue-300/30 dark:bg-blue-400/10 dark:text-blue-300 dark:border-blue-400/20',
        'bg-green-500/20 text-green-900 border-green-300/30 dark:bg-green-400/10 dark:text-green-300 dark:border-green-400/20',
        'bg-purple-500/20 text-purple-900 border-purple-300/30 dark:bg-purple-400/10 dark:text-purple-300 dark:border-purple-400/20',
        'bg-yellow-500/20 text-yellow-900 border-yellow-300/30 dark:bg-yellow-400/10 dark:text-yellow-300 dark:border-yellow-400/20',
        'bg-pink-500/20 text-pink-900 border-pink-300/30 dark:bg-pink-400/10 dark:text-pink-300 dark:border-pink-400/20',
        'bg-indigo-500/20 text-indigo-900 border-indigo-300/30 dark:bg-indigo-400/10 dark:text-indigo-300 dark:border-indigo-400/20',
        'bg-red-500/20 text-red-900 border-red-300/30 dark:bg-red-400/10 dark:text-red-300 dark:border-red-400/20',
        'bg-teal-500/20 text-teal-900 border-teal-300/30 dark:bg-teal-400/10 dark:text-teal-300 dark:border-teal-400/20'
    ];

    console.log('🔍 ProjectCard:', {
        imagesCount: images.length,
        currentIndex: currentImageIndex,
        currentImageSrc: images[currentImageIndex]
    });

    return (
        <>
            {/* Glassmorphism Card */}
            <div className="relative max-w-md mx-auto group">
                {/* Card with glassmorphism effect */}
                <div className="relative backdrop-blur-md bg-white/10 dark:bg-black/20 rounded-2xl border border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:scale-[1.02] hover:bg-white/15 dark:hover:bg-black/30">

                    {/* Image Carousel with opacity */}
                    <div className="relative w-full h-64 overflow-hidden rounded-t-2xl">
                        {images.length > 0 && (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>

                                <img
                                    key={currentImageIndex}
                                    src={images[currentImageIndex]}
                                    alt={`${title} - Image ${currentImageIndex + 1}`}
                                    className="w-full h-full object-cover cursor-pointer transition-all duration-700 opacity-80 hover:opacity-95 hover:scale-105 relative z-10"
                                    onClick={openImageModal}
                                    onLoad={() => console.log(`✅ Loaded image ${currentImageIndex}:`, images[currentImageIndex])}
                                    onError={() => console.error(`❌ Failed image ${currentImageIndex}:`, images[currentImageIndex])}
                                />

                                {/* Overlay with glass effect - clickeable */}
                                <div
                                    className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center cursor-pointer z-5"
                                    onClick={openImageModal}
                                >
                                    <div className="backdrop-blur-sm bg-white/20 dark:bg-black/30 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 border border-white/30 pointer-events-none">
                                        <Eye className="text-white drop-shadow-lg" size={24} />
                                    </div>
                                </div>

                                {/* Navigation arrows */}
                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                prevImage();
                                            }}
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 backdrop-blur-md bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all duration-200 opacity-0 group-hover:opacity-100 z-20 border border-white/20"
                                        >
                                            <ChevronLeft size={18} />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                nextImage();
                                            }}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 backdrop-blur-md bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-all duration-200 opacity-0 group-hover:opacity-100 z-20 border border-white/20"
                                        >
                                            <ChevronRight size={18} />
                                        </button>
                                    </>
                                )}

                                {/* Image indicators */}
                                {images.length > 1 && (
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                                        {images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCurrentImageIndex(index);
                                                }}
                                                className={`w-2 h-2 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/30 ${
                                                    index === currentImageIndex
                                                        ? 'bg-white shadow-lg scale-125'
                                                        : 'bg-white/50 hover:bg-white/75'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Content with glass background */}
                    <div className="p-6 backdrop-blur-sm">
                        <h3 className="text-xl font-bold mb-3 text-tekhelet dark:text-tropical-indigo drop-shadow-sm">
                            {title}
                        </h3>

                        <p className="text-tekhelet/90 dark:text-tropical-indigo/90 text-sm leading-relaxed mb-4 text-justify drop-shadow-sm">
                            {description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {technologies.map((tech, index) => (
                                <span
                                    key={tech}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm border transition-all duration-200 hover:scale-105 ${
                                        techColors[index % techColors.length]
                                    }`}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <button
                            onClick={onExpand}
                            className="w-full backdrop-blur-md bg-tekhelet/20 hover:bg-tekhelet/30 dark:bg-tropical-indigo/20 dark:hover:bg-tropical-indigo/30 border border-tekhelet/30 dark:border-tropical-indigo/30 text-tekhelet dark:text-tropical-indigo font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/button hover:scale-[1.02] hover:shadow-lg"
                        >
                            {t('projects.details_button')}
                            <ExternalLink size={16} className="group-hover/button:translate-x-1 transition-transform duration-200" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal with glassmorphism */}
            {isImageModalOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 isolate"
                    onClick={closeImageModal}
                >
                    {/* Fixed Close Button */}
                    <button
                        onClick={closeImageModal}
                        className="fixed top-6 right-6 text-white hover:text-gray-300 z-[10001] backdrop-blur-md bg-black/40 hover:bg-black/60 rounded-full p-3 transition-all duration-200 border border-white/20"
                    >
                        <X size={24} />
                    </button>

                    {/* Fixed Navigation Arrows */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    prevImage();
                                }}
                                className="fixed left-6 top-1/2 transform -translate-y-1/2 backdrop-blur-md bg-black/40 hover:bg-black/60 text-white rounded-full p-3 z-[10001] transition-all duration-200 border border-white/20"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    nextImage();
                                }}
                                className="fixed right-6 top-1/2 transform -translate-y-1/2 backdrop-blur-md bg-black/40 hover:bg-black/60 text-white rounded-full p-3 z-[10001] transition-all duration-200 border border-white/20"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </>
                    )}

                    {/* Image Container */}
                    <div className="relative flex items-center justify-center max-w-full max-h-full isolate">
                        <img
                            src={images[currentImageIndex]}
                            alt={`${title} - Image ${currentImageIndex + 1}`}
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            style={{ maxHeight: '90vh', maxWidth: '90vw' }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    {/* Fixed Image Indicators */}
                    {images.length > 1 && (
                        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-[10001]">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentImageIndex(index);
                                    }}
                                    className={`w-3 h-3 rounded-full transition-all duration-200 backdrop-blur-sm border border-white/30 ${
                                        index === currentImageIndex
                                            ? 'bg-white shadow-lg'
                                            : 'bg-white/50 hover:bg-white/75'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default ProjectCard;