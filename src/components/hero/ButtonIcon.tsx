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
                className={`w-10 h-10 rounded-full border-2 border-tekhelet flex items-center justify-center  transition
                dark:border-tropical-indigo
             hover:bg-white/10 active:bg-white/20 cursor-pointer ${className}`}
            >
                <Icon size={20} className={"text-tekhelet dark:text-tropical-indigo"} />
            </button>
        </div>
    );
};

export default ButtonIcon;