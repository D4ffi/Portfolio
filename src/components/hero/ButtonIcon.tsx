import { LucideIcon } from 'lucide-react';

type ButtonIconProps = {
    icon: LucideIcon;
    onClick?: () => void;
    href?: string;
    className?: string;
};

const ButtonIcon = ({ icon: Icon, onClick, href, className = '' }: ButtonIconProps) => {
    const handleClick = () => {
        if (href) {
            window.open(href, '_blank');
        }

        if (onClick) {
            onClick();
        }
    };

    return (
        <div className="p-1 sm:p-2">
            <button
                type="button"
                onClick={handleClick}
                className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 
                          border-tekhelet text-tekhelet dark:text-tropical-indigo 
                          flex items-center justify-center transition-all duration-300
                          dark:border-tropical-indigo dark:hover:border-violet-100 dark:hover:text-violet-100
                          hover:bg-white/10 active:bg-white/20 cursor-pointer 
                          hover:scale-110 hover:shadow-lg
                          ${className}`}
            >
                <Icon size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
        </div>
    );
};

export default ButtonIcon;