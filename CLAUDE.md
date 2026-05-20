# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with React, TypeScript, and Tailwind CSS v4. Single-page application showcasing projects, skills, and contact information with bilingual support (English/Spanish) and dark mode.

## Development Commands

```bash
# Start development server with HMR
npm run dev

# Build for production (TypeScript compilation + Vite build)
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## Core Architecture

### Application Entry Point

**Flow:** `main.tsx` → `Home.tsx` → `Layout.tsx`

The app uses a simple hierarchy:
- `main.tsx`: Root entry, wraps everything in `LanguageProvider`
- `Home.tsx`: Main page component, contains all sections (hero, about, projects, contact)
- `Layout.tsx`: Wrapper that provides navbar and sets document title

### Internationalization (i18n)

**Implementation:** `src/context/LanguageContext.tsx`

- Context-based translation system (no external i18n library)
- Supports English (`en`) and Spanish (`es`)
- Translations stored inline as JavaScript object
- Language persisted to localStorage as `'portfolio-language'`
- Auto-detects browser language on first visit
- Translation keys follow pattern: `section.key` (e.g., `'hero.greeting'`, `'nav.about'`)

**Usage:**
```tsx
const { t, language, setLanguage } = useLanguage();
<h1>{t('hero.greeting')}</h1>
```

### Dark Mode System

**Implementation:** `src/components/toggleDarkMode/ToggleDarkMode.tsx`

- Reads and syncs with DOM state (checks for `.dark` class on `<html>` or `<body>`)
- Persists theme to localStorage as `'portfolio-theme'`
- Falls back to system preference (`prefers-color-scheme`) if no saved theme
- Applies `.dark` class to both `document.documentElement` and `document.body`
- Uses MutationObserver to detect external DOM changes

**Key behavior:** Always prioritizes DOM state over localStorage to prevent mismatches after page reload.

### Styling System

**Tailwind CSS v4:**
- Configuration is in `src/index.css` using `@theme` directive (not a separate config file)
- Custom color palette: `violet-russian`, `mauve`, `tropical-indigo`, `tekhelet`
- Dark mode uses custom variant: `@custom-variant dark (&:where(.dark, .dark *))`

**Safe Area Support:**
- CSS classes for iPhone notch/safe areas: `.safe-area-full`, `.navbar-safe`, `.hero-full-screen`
- Uses `env(safe-area-inset-*)` for proper spacing on devices with notches

**Performance Optimization:**
- Transitions are conditionally applied via `body.transitions-enabled` class
- This prevents transition flashes on initial page load
- Global transition settings: `transition-duration: 500ms`, easing: `cubic-bezier(0.4, 0, 0.2, 1)`

### Component Structure

**Common Components:**
- `NavBar.tsx` - Navigation with language selector and dark mode toggle
- `Layout.tsx` - Page wrapper (navbar + title management)
- `ContactSection.tsx` - Contact information with social links
- `EmailModal.tsx` - Modal for displaying email address
- `LanguageCard.tsx` - Tech stack logo cards
- `LanguageSelector.tsx` - Language switcher dropdown
- `ProjectCard.tsx` - Project showcase card with image carousel

**Hero Components:**
- `HeroSection.tsx` - Landing section
- `ButtonIcon.tsx` - Icon buttons with hover effects

**Theme:**
- `ToggleDarkMode.tsx` - Dark mode toggle switch

### State Management

No external state management library. Uses React Context for:
- Language/translations (`LanguageContext`)
- No routing library (single-page app with anchor links)

## Important Patterns

### Adding New Translations

1. Add translation keys to both `en` and `es` objects in `LanguageContext.tsx`
2. Use the `t()` function in components: `t('section.key')`

### Adding New Sections

1. Add new section in `Home.tsx` with an `id` attribute for anchor navigation
2. Add corresponding translation keys in `LanguageContext.tsx`
3. Update navbar links in `NavBar.tsx` if needed

### Color Palette

Custom colors defined in `@theme` block of `index.css`:
- **violet-russian** (`#3A015C`) - Primary dark purple
- **mauve** (`#CAA8F5`) - Light purple accent
- **tropical-indigo** (`#9984D4`) - Medium purple
- **tekhelet** (`#592E83`) - Dark purple text
- **violet-grey** (`#18122B`) - Dark background

Use with Tailwind: `bg-violet-russian`, `text-mauve`, `dark:bg-violet-grey`

### Theme Toggle Persistence

Dark mode state is managed by:
1. Reading DOM state (`.dark` class presence)
2. Falling back to localStorage (`'portfolio-theme'`)
3. Falling back to system preference
4. MutationObserver watches for external theme changes

**Important:** The toggle component synchronizes with DOM changes to prevent state mismatches.

## AWS Amplify

The project is a **frontend-only** SPA. AWS Amplify is used purely for **hosting** (build config in `amplify.yml`). No Amplify SDK or backend packages are installed — `aws-amplify`, `@aws-amplify/backend`, `@aws-amplify/backend-cli`, `aws-cdk-lib`, `constructs` and `tsx` were removed because they were unused and accounted for ~90 npm vulnerabilities. If a backend is needed later, install the required Amplify packages at that point.

## File Naming Conventions

- Components: PascalCase (e.g., `HeroSection.tsx`)
- Contexts: PascalCase with `Context.tsx` suffix (e.g., `LanguageContext.tsx`)
- CSS: kebab-case for custom classes
