import React from "react";

interface LanguageCardProps {
    imagePath: string;
    name: string;
}

const LanguageCard: React.FC<LanguageCardProps> = ({ imagePath, name }) => {
    return (
        <div className="flex flex-col items-center p-4 rounded-lg transition-all duration-500 hover:bg-neutral-200 dark:hover:bg-neutral-800">
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
            <p className="text-neutral-900 dark:text-neutral-50 font-medium transition-colors duration-150">{name}</p>
        </div>
    );
};

export default LanguageCard;