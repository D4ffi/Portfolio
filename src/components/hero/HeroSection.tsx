import React, { useState } from "react";
import ButtonIcon from "./ButtonIcon";
import { GithubIcon, LucideLinkedin, MailIcon } from "lucide-react";
import EmailModal from "../common/EmailModal";
import {useLanguage} from "../../context/LanguageContext.tsx";


const HeroSection: React.FC = () => {
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const { t } = useLanguage();

    const handleEmailClick = () => {
        setIsEmailModalOpen(true);
    };

    const closeEmailModal = () => {
        setIsEmailModalOpen(false);
    };

    return (
        <div className="w-full h-screen bg-gradient-to-b from-mauve to-neutral-200 flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500
            dark:bg-gradient-to-b dark:from-violet-russian dark:to-violet-dark
        ">
            {/* Contenido principal centrado */}
            <div className="text-tekhelet flex flex-col items-center dark:text-tropical-indigo transition-colors duration-500">
                {/* Position "I am" to align with the start of "K" in "KOSS" */}
                <p className="self-start ml-3 -mb-7 transition-colors duration-500">{t('hero.greeting')}</p>

                <h1 className=" text-tekhelet text-[14rem] font-extrabold tracking-widest leading-none dark:text-tropical-indigo transition-colors duration-500">
                    KOSS
                </h1>

                {/* Position paragraphs to align with the end of "KOSS" */}
                <div className="text-tekhelet self-end mr-9 -mt-1 flex flex-col items-end dark:text-tropical-indigo transition-colors duration-500">
                    <p className="text-lg transition-colors duration-500">{t('hero.role')}</p>
                </div>
            </div>

            <div className="absolute bottom-15 inset-x-0 flex flex-col justify-end items-end p-8 ">
                <p className="text-tekhelet tracking-widest transform origin-bottom-left dark:text-tropical-indigo transition-colors duration-500">
                    {t('hero.easter_egg')}
                </p>
            </div>

            {/* Botón posicionado en la parte inferior central */}
            <div className="absolute bottom-15 inset-x-0 flex flex-col justify-evenly p-8 ">
                <ButtonIcon icon={LucideLinkedin} href={"https://www.linkedin.com/in/kevin-coss-25427225b/"} />
                <ButtonIcon icon={GithubIcon} href={"https://github.com/D4ffi"} />
                <ButtonIcon icon={MailIcon} onClick={handleEmailClick} />
            </div>

            {/* Email Modal */}
            <EmailModal isOpen={isEmailModalOpen} onClose={closeEmailModal} />
        </div>
    );
};

export default HeroSection;