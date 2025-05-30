import React from "react";
import ButtonIcon from "./ButtonIcon";
import {GithubIcon, LucideLinkedin, MailIcon} from "lucide-react";

const HeroSection: React.FC = () => {
    return (
        <div className="w-full hero-full-screen bg-gradient-to-b from-mauve to-neutral-200 flex flex-col items-center justify-center relative overflow-hidden
            dark:bg-gradient-to-b dark:from-violet-russian dark:to-violet-dark px-4
        ">
            {/* Contenido principal centrado */}
            <div className="text-tekhelet flex flex-col items-center dark:text-tropical-indigo text-center">
                {/* "Hi I am" text - responsive positioning */}
                <p className="text-sm sm:text-base md:text-lg mb-2 sm:mb-4 md:mb-6 lg:mb-8
                   self-start sm:ml-2 md:ml-3 lg:ml-4 xl:ml-6">
                    Hi I am
                </p>

                {/* KOSS text - responsive sizing */}
                <h1 className="text-tekhelet font-extrabold tracking-wider leading-none dark:text-tropical-indigo
                   text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem]
                   mb-2 sm:mb-4 md:mb-6">
                    KOSS
                </h1>

                {/* Subtitle - responsive positioning and sizing */}
                <div className="text-tekhelet dark:text-tropical-indigo text-center sm:text-right
                    sm:self-end sm:mr-4 md:mr-6 lg:mr-8 xl:mr-9">
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium">
                        Full Stack Developer
                    </p>
                </div>
            </div>

            {/* Social buttons - responsive layout */}
            <div className="absolute bottom-8 sm:bottom-12 md:bottom-16 lg:bottom-20
                left-1/2 transform -translate-x-1/2 sm:left-8 md:left-12 lg:left-16 xl:left-20
                sm:transform-none
                flex flex-row sm:flex-col justify-center items-center gap-2 sm:gap-4">
                <ButtonIcon icon={LucideLinkedin} href={"https://www.linkedin.com/in/kevin-coss-25427225b/"}/>
                <ButtonIcon icon={GithubIcon} href={"https://github.com/D4ffi"} />
                <ButtonIcon icon={MailIcon} href={"mailto:koss.cr@outlook.com"} />
            </div>

            {/* Bottom message - responsive positioning and sizing - Hidden on small screens */}
            <div className="absolute bottom-4 sm:bottom-8 md:bottom-12 lg:bottom-16 right-4 sm:right-8 md:right-12 lg:right-16">
                <p className="text-tekhelet dark:text-tropical-indigo text-xs sm:text-sm md:text-base
                   tracking-wide transform origin-bottom-right max-w-xs sm:max-w-none text-right
                   hidden sm:block">
                    If you read this, you are awesome
                </p>
            </div>
        </div>
    );
};

export default HeroSection;