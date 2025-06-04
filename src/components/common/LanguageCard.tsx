import React from "react";

interface LanguageCardProps {
    imagePath: string;
    name: string;
}

const LanguageCard: React.FC<LanguageCardProps> = ({ imagePath, name }) => {
    return (
        <div className="flex flex-col items-center p-4 rounded-lg transition-all duration-500 hover:bg-neutral-300 dark:hover:bg-violet-dark">
            <img
                src={`/logos/${imagePath}`}
                alt={`${name} logo`}
                className="w-20 h-20 object-contain mb-2"
                onError={(e) => {
                    console.error(`Failed to load image: /logos/${imagePath}`);
                    // Fallback opcional
                    e.currentTarget.src = '/logos/default.svg';
                }}
            />
            <p className="text-tekhelet font-medium dark:text-tropical-indigo transition-colors duration-500">{name}</p>
        </div>
    );
};

export default LanguageCard;