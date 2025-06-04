import React, { useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import ButtonIcon from '../hero/ButtonIcon';
import EmailModal from '../common/EmailModal';
import {useLanguage} from "../../context/LanguageContext.tsx";

const ContactSection: React.FC = () => {
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const { t } = useLanguage();

    const handleEmailClick = () => {
        setIsEmailModalOpen(true);
    };

    const closeEmailModal = () => {
        setIsEmailModalOpen(false);
    };

    return (
        <section id="contact" className="py-20 bg-gradient-to-b from-neutral-200 to-mauve dark:from-violet-grey dark:to-violet-russian transition-colors duration-500">
            <div className="max-w-4xl mx-auto px-8">
                {/* Glassmorphism container */}
                <div className="backdrop-blur-sm bg-white/5 dark:bg-black/10 rounded-3xl border border-white/10 dark:border-white/5 p-8 md:p-12 shadow-xl hover:shadow-2xl hover:bg-white/10 dark:hover:bg-black/15 transition-all duration-500">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-tekhelet dark:text-tropical-indigo mb-6 transition-colors duration-500">
                            {t('contact.title')}
                        </h2>
                        <p className="text-lg text-tekhelet dark:text-tropical-indigo max-w-2xl mx-auto transition-colors duration-500">
                            {t('contact.description')}
                        </p>
                    </div>

                    {/* Contact Buttons */}
                    <div className="flex justify-center items-center gap-8 mb-12">
                        <div className="flex flex-col items-center group">
                            <ButtonIcon
                                icon={Linkedin}
                                href="https://www.linkedin.com/in/kevin-coss-25427225b/"
                                className="transform group-hover:scale-110 transition-all duration-500"
                            />
                            <span className="mt-3 text-sm font-medium text-tekhelet dark:text-tropical-indigo opacity-0 group-hover:opacity-100 transition-all duration-500">
                                {t('social.linkedin')}
                            </span>
                        </div>

                        <div className="flex flex-col items-center group">
                            <ButtonIcon
                                icon={Github}
                                href="https://github.com/D4ffi"
                                className="transform group-hover:scale-110 transition-all duration-500"
                            />
                            <span className="mt-3 text-sm font-medium text-tekhelet dark:text-tropical-indigo opacity-0 group-hover:opacity-100 transition-all duration-500">
                                {t('social.github')}
                            </span>
                        </div>

                        <div className="flex flex-col items-center group">
                            <ButtonIcon
                                icon={Mail}
                                onClick={handleEmailClick}
                                className="transform group-hover:scale-110 transition-all duration-500"
                            />
                            <span className="mt-3 text-sm font-medium text-tekhelet dark:text-tropical-indigo opacity-0 group-hover:opacity-100 transition-all duration-500">
                                {t('social.email')}
                            </span>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center">
                        <p className="text-tekhelet dark:text-tropical-indigo font-medium transition-colors duration-500">
                            {t('contact.ready')}
                        </p>
                        <p className="text-sm text-tekhelet/70 dark:text-tropical-indigo/70 mt-2 transition-colors duration-500">
                            {t('contact.reach_out')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Email Modal */}
            <EmailModal isOpen={isEmailModalOpen} onClose={closeEmailModal} />
        </section>
    );
};

export default ContactSection;