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
        <div className="p-2">
            <button
                type="button"
                onClick={handleClick}
                className={`w-10 h-10 rounded-full border-2 border-tekhelet text-tekhelet dark:text-tropical-indigo flex items-center justify-center  transition-colors
                dark:border-tropical-indigo dark:hover:border-violet-100 dark:hover:text-violet-100
             hover:bg-white/10 active:bg-white/20 cursor-pointer ${className}`}
            >
                <Icon size={20} />
            </button>
        </div>
    );
};

export default ButtonIcon;