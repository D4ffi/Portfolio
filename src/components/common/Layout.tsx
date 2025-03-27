import React, { useEffect } from 'react';
import Navbar from "./NavBar";

interface LayoutProps {
    children: React.ReactNode;
    title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
    useEffect(() => {
        // Update the document title when the component mounts or title changes
        document.title = `Koss | ${title}`;
    }, [title]);

    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
        </>
    );
};

export default Layout;