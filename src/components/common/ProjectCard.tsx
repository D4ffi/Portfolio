import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ExternalLink, Eye } from 'lucide-react';

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

    const techColors = [
        'bg-blue-100 text-blue-800',
        'bg-green-100 text-green-800',
        'bg-purple-100 text-purple-800',
        'bg-yellow-100 text-yellow-800',
        'bg-pink-100 text-pink-800',
        'bg-indigo-100 text-indigo-800',
        'bg-red-100 text-red-800',
        'bg-teal-100 text-teal-800'
    ];

    console.log('🔍 ProjectCard:', {
        imagesCount: images.length,
        currentIndex: currentImageIndex,
        currentImageSrc: images[currentImageIndex]
    });

    return (
        <>
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 max-w-md mx-auto">
                {/* Image Carousel */}
                <div className="relative w-full h-64 bg-gray-50 group overflow-hidden">
                    {images.length > 0 && (
                        <>
                            <img
                                key={currentImageIndex}
                                src={images[currentImageIndex]}
                                alt={`${title} - Image ${currentImageIndex + 1}`}
                                className="w-full h-full object-cover cursor-pointer transition-all duration-500"
                                onClick={openImageModal}
                                onLoad={() => console.log(`✅ Loaded image ${currentImageIndex}:`, images[currentImageIndex])}
                                onError={() => console.error(`❌ Failed image ${currentImageIndex}:`, images[currentImageIndex])}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center pointer-events-none">
                                <Eye className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                            </div>

                            {/* Navigation arrows */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            prevImage();
                                        }}
                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:cursor-pointer hover:bg-black/75 text-white rounded-full p-2 transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            nextImage();
                                        }}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:cursor-pointer hover:bg-black/75 text-white rounded-full p-2 transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </>
                            )}

                            {/* Image indicators */}
                            {images.length > 1 && (
                                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                                    {images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setCurrentImageIndex(index);
                                            }}
                                            className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                                index === currentImageIndex
                                                    ? 'bg-white shadow-lg'
                                                    : 'bg-white/50 hover:bg-white/75'
                                            }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Content */}
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 text-justify">{description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {technologies.map((tech, index) => (
                            <span
                                key={tech}
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    techColors[index % techColors.length]
                                }`}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <button
                        onClick={onExpand}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                        Project Details
                        <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isImageModalOpen && (
                <div
                    className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4 isolate"
                    onClick={closeImageModal}
                >
                    {/* Fixed Close Button - Always top-right of viewport */}
                    <button
                        onClick={closeImageModal}
                        className="fixed top-6 right-6 text-white hover:text-gray-300 z-[10001] hover:cursor-pointer bg-black/50 hover:bg-black/70 rounded-full p-3 transition-colors duration-200"
                    >
                        <X size={24} />
                    </button>

                    {/* Fixed Navigation Arrows - Always center-left and center-right of viewport */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    prevImage();
                                }}
                                className="fixed left-6 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 hover:cursor-pointer text-white rounded-full p-3 z-[10001] transition-colors duration-200"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    nextImage();
                                }}
                                className="fixed right-6 top-1/2 transform -translate-y-1/2 bg-black/70 hover:bg-black/90 hover:cursor-pointer text-white rounded-full p-3 z-[10001] transition-colors duration-200"
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
                            className="max-w-full max-h-full object-contain"
                            style={{ maxHeight: '90vh', maxWidth: '90vw' }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    {/* Fixed Image Indicators - Always bottom-center of viewport */}
                    {images.length > 1 && (
                        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-[10001]">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentImageIndex(index);
                                    }}
                                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                        index === currentImageIndex
                                            ? 'bg-white'
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