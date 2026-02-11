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
                          border-neutral-900 text-neutral-900 dark:border-neutral-50 dark:text-neutral-50 
                          flex items-center justify-center transition-all duration-300
                          hover:bg-neutral-900/10 dark:hover:bg-neutral-50/10
                          active:bg-neutral-900/20 dark:active:bg-neutral-50/20
                          cursor-pointer hover:scale-110 hover:shadow-lg
                          ${className}`}
            >
                <Icon size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
        </div>
    );
};

export default ButtonIcon;