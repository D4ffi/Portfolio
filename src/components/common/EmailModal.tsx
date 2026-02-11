import React, { useEffect, useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import {useLanguage} from "../../context/LanguageContext.tsx";


interface EmailModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const { t } = useLanguage();

    // Email obfuscado - se construye dinámicamente para evitar scraping
    const getEmail = () => {
        const user = 'koss.cr';
        const domain = 'outlook.com';
        return `${user}@${domain}`;
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(getEmail());
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy email:', err);
            // Fallback para navegadores más antiguos
            const textArea = document.createElement('textarea');
            textArea.value = getEmail();
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Cerrar modal con tecla Escape y conservar posición de scroll
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            // Guardar la posición actual de scroll
            setScrollPosition(window.pageYOffset);

            document.addEventListener('keydown', handleEscape);
            // Prevenir scroll del body cuando el modal está abierto
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${window.pageYOffset}px`;
            document.body.style.width = '100%';
        } else if (scrollPosition > 0) {
            // Restaurar scroll al cerrar el modal
            document.body.style.removeProperty('overflow');
            document.body.style.removeProperty('position');
            document.body.style.removeProperty('top');
            document.body.style.removeProperty('width');
            window.scrollTo(0, scrollPosition);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            if (isOpen) {
                document.body.style.removeProperty('overflow');
                document.body.style.removeProperty('position');
                document.body.style.removeProperty('top');
                document.body.style.removeProperty('width');
            }
        };
    }, [isOpen, onClose, scrollPosition]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
            onClick={handleBackdropClick}
        >
            <div
                className="bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-gray-200 dark:border-neutral-700 max-w-md w-full mx-4 animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-neutral-700">
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                        {t('email.modal.title')}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
                        aria-label="Close modal"
                    >
                        <X size={20} className="text-neutral-900 dark:text-neutral-50" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-neutral-900 dark:text-neutral-50 mb-2">
                            {t('email.modal.label')}
                        </label>
                        <div className="flex items-center gap-3">
                            <div
                                className="flex-1 px-4 py-3 bg-gray-50 dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
                                onClick={() => {
                                    // Seleccionar all email text when clicked
                                    const emailElement = document.getElementById('email-text');
                                    if (emailElement) {
                                        const range = document.createRange();
                                        range.selectNodeContents(emailElement);
                                        const selection = window.getSelection();
                                        selection?.removeAllRanges();
                                        selection?.addRange(range);
                                    }
                                }}
                                role="button"
                                tabIndex={0}
                                aria-label="Click to select email address"
                            >
                                <span id="email-text" className="text-neutral-900 dark:text-neutral-50 font-mono text-sm">
                                    {getEmail()}
                                </span>
                            </div>
                            <button
                                onClick={copyToClipboard}
                                className="px-4 py-3 bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-all duration-200 flex items-center gap-2 font-medium cursor-pointer"
                                aria-label="Copy email address"
                            >
                                {isCopied ? (
                                    <>
                                        <Check size={16} />
                                        {t('email.modal.copied')}
                                    </>
                                ) : (
                                    <>
                                        <Copy size={16} />
                                        {t('email.modal.copy')}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {t('email.modal.description')}
                    </p>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50 dark:bg-neutral-800 rounded-b-xl">
                    <button
                        onClick={onClose}
                        className="w-full px-4 py-2 text-neutral-900 dark:text-neutral-50 bg-white dark:bg-neutral-700 rounded-lg border border-gray-200 dark:border-neutral-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-600 transition-colors font-medium"
                    >
                        {t('email.modal.close')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmailModal;