import React from "react";
import ButtonIcon from "./ButtonIcon";
import {GithubIcon, LucideLinkedin, MailIcon} from "lucide-react";

const HeroSection: React.FC = () => {
    return (
        <div className="w-full h-screen bg-gradient-to-b from-mauve to-neutral-200 flex flex-col items-center justify-center relative overflow-hidden
            dark:bg-gradient-to-b dark:from-violet-russian dark:to-violet-dark
        ">


            {/* Contenido principal centrado */}
            <div className="text-tekhelet flex flex-col items-center dark:text-tropical-indigo">
                {/* Position "I am" to align with the start of "K" in "KOSS" */}
                <p className="self-start ml-3 -mb-7 ">Hi I am</p>

                <h1 className=" text-tekhelet text-[14rem] font-extrabold tracking-widest leading-none dark:text-tropical-indigo">
                    KOSS
                </h1>

                {/* Position paragraphs to align with the end of "KOSS" */}
                <div className="text-tekhelet self-end mr-9 -mt-1 flex flex-col items-end dark:text-tropical-indigo">
                    <p className="text-lg">Full Stack Developer</p>
                </div>
            </div>

            <div className="absolute bottom-15 inset-x-0 flex flex-col justify-end items-end p-8 ">
                <p className="text-tekhelet tracking-widest transform origin-bottom-left dark:text-tropical-indigo">If you read this, you are awesome</p>
            </div>

            {/* Botón posicionado en la parte inferior central */}
            <div className="absolute bottom-15 inset-x-0 flex flex-col justify-evenly p-8 ">
                <ButtonIcon icon={LucideLinkedin} href={"https://www.linkedin.com/in/kevin-coss-25427225b/"}/>
                <ButtonIcon icon={GithubIcon} href={"https://github.com/D4ffi"} />
                <ButtonIcon icon={MailIcon} href={"mailto:koss.cr@outlook.com"} />
            </div>


        </div>
    );
};

export default HeroSection;