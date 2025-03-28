
import React from "react";
import ToggleDarkMode from "../toggleDarkMode/ToggleDarkMode.tsx";

const NavBar: React.FC = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between pr-30 bg-transparent">

            <div>
                <h1 className="p-5 pl-10 text-tekhelet font-bold text-[1.3rem] hover:text-tekhelet-dark transition-colors cursor-pointer dark:text-tropical-indigo dark:hover:text-violet-100">&lt; Daffi /&gt;</h1>
            </div>

            <div className={" flex flex-row items-end justify-end "}>
                <p className="p-5 pr-10 text-tekhelet hover:text-gray-700 hover:underline cursor-pointer transition-colors
                dark:text-tropical-indigo dark:hover:text-violet-100">Projects</p>
                <p className="p-5 pr-10 text-tekhelet hover:text-gray-700 hover:underline cursor-pointer transition-colors
                dark:text-tropical-indigo dark:hover:text-violet-100">About Me</p>
                <p className="p-5 pr-10 text-tekhelet hover:text-gray-700 hover:underline cursor-pointer transition-colors
                dark:text-tropical-indigo dark:hover:text-violet-100">Contact</p>
                <ToggleDarkMode />
            </div>
        </nav>
    )
}

export default NavBar;