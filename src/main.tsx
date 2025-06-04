import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from "./pages/Home.tsx";
import {LanguageProvider} from "./context/LanguageContext.tsx";


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <LanguageProvider>
            <Home />
        </LanguageProvider>
    </StrictMode>,
)