import React from "react";
import ButtonIcon from "./ButtonIcon";
import {GithubIcon, LucideLinkedin, MailIcon} from "lucide-react";

const HeroSection: React.FC = () => {
    return (
        <div className="w-full h-screen bg-gradient-to-b from-gray-950 to-neutral-850 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Contenido principal centrado */}
            <div className="flex flex-col items-center">
                {/* Position "I am" to align with the start of "K" in "KOSS" */}
                <p className="self-start ml-3 -mb-7">Hi I am</p>

                <h1 className="text-[14rem] font-extrabold tracking-widest leading-none">
                    Daffi
                </h1>

                {/* Position paragraphs to align with the end of "KOSS" */}
                <div className="self-end mr-9 -mt-1 flex flex-col items-end">
                    <p className="text-lg">Full Stack Developer</p>
                    <p className="text-lg">For Web development</p>
                </div>
            </div>

            <div className="absolute bottom-0 inset-x-0 flex flex-col justify-end items-end p-8">
                <p className="tracking-widest transform origin-bottom-left">Mexican guy</p>
            </div>

            {/* Botón posicionado en la parte inferior central */}
            <div className="absolute bottom-0 inset-x-0 flex flex-col justify-start p-8">
                <ButtonIcon icon={LucideLinkedin} href={"https://www.linkedin.com/in/kevin-coss-25427225b/"}/>
                <ButtonIcon icon={GithubIcon} href={"https://github.com/D4ffi"} />
                <ButtonIcon icon={MailIcon} href={"mailto:your@email.com"} />
            </div>


        </div>
    );
};

export default HeroSection;