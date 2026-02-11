# Project Context: Portfolio Website

## Project Overview
This is a personal portfolio website built as a Single-Page Application (SPA). It showcases projects, skills, and contact information. The application features a custom bilingual support system (English/Spanish), a persistent dark mode, and 3D elements using Three.js.

## Tech Stack
- **Framework:** React 19 (Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (configured via CSS variables in `src/index.css`)
- **3D Graphics:** Three.js, React Three Fiber, React Three Drei
- **Icons:** Lucide React
- **Backend/Hosting:** AWS Amplify dependencies are present (`aws-amplify`, `@aws-amplify/backend`), though currently noted as potentially unused for active features.

## Key Files & Directories
- **`src/main.tsx`**: Application entry point. Wraps the app in `LanguageProvider`.
- **`src/pages/Home.tsx`**: The main page component containing all sections (Hero, Projects, Contact, etc.).
- **`src/context/LanguageContext.tsx`**: Custom internationalization system. Manages translations and language persistence (`portfolio-language` in localStorage).
- **`src/components/toggleDarkMode/ToggleDarkMode.tsx`**: Manages dark mode logic, syncing with the DOM and localStorage (`portfolio-theme`).
- **`src/index.css`**: Main stylesheet containing Tailwind v4 `@theme` configuration and custom color definitions.
- **`src/components/common/`**: Reusable UI components like `NavBar`, `ProjectCard`, and `ContactSection`.
- **`amplify.yml`**: Configuration for AWS Amplify build settings.

## Building and Running
The project uses standard `npm` scripts defined in `package.json`:

- **Start Development Server:**
  ```bash
  npm run dev
  ```
- **Build for Production:**
  ```bash
  npm run build
  ```
  *Runs TypeScript compilation (`tsc -b`) followed by Vite build.*
- **Preview Production Build:**
  ```bash
  npm run preview
  ```
- **Lint Code:**
  ```bash
  npm run lint
  ```

## Development Conventions

### Architecture
- **Flow:** `main.tsx` → `Home.tsx` → `Layout.tsx`.
- **State Management:** Relies on React Context (specifically `LanguageContext`) rather than external state libraries like Redux or Zustand.
- **Routing:** No external router (e.g., react-router); uses anchor links for navigation within the SPA.

### Styling (Tailwind CSS v4)
- **Configuration:** Custom colors and theme settings are defined directly in `src/index.css` using the `@theme` directive.
- **Dark Mode:** Implemented via the `.dark` class on `html`/`body`.
- **Custom Palette:** defined as `violet-russian`, `mauve`, `tropical-indigo`, `tekhelet`, etc.

### Internationalization
- **Pattern:** Translations are stored as objects within `LanguageContext.tsx`.
- **Usage:** `const { t } = useLanguage();` -> `{t('section.key')}`.
- **Adding Languages:** Requires updating the dictionary objects in the context file.

### Naming Conventions
- **Components:** PascalCase (e.g., `HeroSection.tsx`).
- **Contexts:** PascalCase with `Context` suffix (e.g., `LanguageContext.tsx`).
- **CSS Classes:** Kebab-case (standard Tailwind/CSS).
