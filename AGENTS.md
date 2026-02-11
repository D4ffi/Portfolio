# Project Guide for AI Coding Agents

This file provides essential information for AI coding agents working with this portfolio website codebase.

## Project Overview

**Portfolio Website** - A personal portfolio website built as a Single-Page Application (SPA) showcasing projects, skills, and contact information. The site features bilingual support (English/Spanish), persistent dark mode, and polished UI animations.

**Owner:** Kevin Coss (Koss)
**Primary Language:** English and Spanish (bilingual)

## Technology Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 |
| Language | TypeScript 5.8 |
| Build Tool | Vite 6.2 |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| 3D (dependencies present) | Three.js, React Three Fiber, React Three Drei |
| Hosting | AWS Amplify |

## Project Structure

```
├── amplify.yml              # AWS Amplify deployment configuration
├── index.html               # Entry HTML with theme initialization script
├── package.json             # Dependencies and scripts
├── public/                  # Static assets
│   ├── fondo_dark_2k.png   # Hero background (dark mode)
│   ├── fondo_light_2k.png  # Hero background (light mode)
│   ├── logos/              # Technology stack logos (SVG/PNG)
│   └── white-heart.svg     # Favicon
├── src/
│   ├── main.tsx            # Application entry point
│   ├── index.css           # Tailwind v4 theme configuration + custom CSS
│   ├── vite-env.d.ts       # Vite type declarations
│   ├── App.tsx             # Default Vite template (unused)
│   ├── App.css             # Default Vite styles (unused)
│   ├── assets/             # Project images (Sesa Promo screenshots)
│   ├── components/
│   │   ├── common/         # Shared UI components
│   │   │   ├── ContactSection.tsx
│   │   │   ├── EmailModal.tsx
│   │   │   ├── LanguageCard.tsx      # Tech stack logo cards
│   │   │   ├── LanguageSelector.tsx  # Language dropdown
│   │   │   ├── Layout.tsx            # Page wrapper with navbar
│   │   │   ├── NavBar.tsx
│   │   │   └── ProjectCard.tsx       # Project showcase card
│   │   ├── hero/
│   │   │   ├── ButtonIcon.tsx        # Social link buttons
│   │   │   └── HeroSection.tsx       # Landing section with parallax
│   │   ├── projects/
│   │   │   └── ProjectShowcase.tsx   # Project gallery (currently active)
│   │   └── toggleDarkMode/
│   │       └── ToggleDarkMode.tsx    # Dark mode toggle
│   ├── context/
│   │   └── LanguageContext.tsx       # i18n context (EN/ES)
│   └── pages/
│       └── Home.tsx          # Main page composition
```

## Build and Development Commands

```bash
# Install dependencies
npm install

# Start development server (Vite HMR)
npm run dev

# Build for production
npm run build
# Note: Runs `tsc -b && vite build`

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

## Application Architecture

### Entry Flow
```
main.tsx → LanguageProvider → Home.tsx → Layout.tsx + sections
```

### State Management
- **No external state library** - Uses React Context only
- `LanguageContext`: Manages language preference (EN/ES) and translations
- `ToggleDarkMode`: Manages theme state via DOM classes and localStorage

### Routing
- **No routing library** (no react-router)
- Single-page application with anchor link navigation (`#hero`, `#about`, `#projects`, `#contact`)
- Smooth scroll behavior via `scrollIntoView({ behavior: 'smooth' })`

## Internationalization (i18n)

**Implementation:** Custom context-based system in `src/context/LanguageContext.tsx`

**Supported Languages:**
- English (`en`) - default
- Spanish (`es`)

**Translation Keys Pattern:** `section.key`
```typescript
// Examples:
'hero.greeting'      // "Hi I am" / "Hola soy"
'nav.about'          // "About Me" / "Sobre Mí"
'contact.title'      // "Let's Connect" / "Conectemos"
```

**Adding New Translations:**
1. Add keys to both `en` and `es` objects in `LanguageContext.tsx`
2. Use with `const { t } = useLanguage(); t('section.key')`

**Persistence:** 
- Key: `portfolio-language` in localStorage
- Auto-detects browser language on first visit

## Dark Mode System

**Implementation:** `src/components/toggleDarkMode/ToggleDarkMode.tsx`

**Behavior:**
- Applies `.dark` class to `document.documentElement` and `document.body`
- Persists to localStorage key: `portfolio-theme`
- Falls back to `prefers-color-scheme: dark` if no saved preference
- Uses MutationObserver to sync state with DOM changes

**Theme Detection Priority:**
1. DOM state (`.dark` class presence)
2. localStorage value
3. System preference

**CSS Usage:**
```css
/* Tailwind dark variant */
@custom-variant dark (&:where(.dark, .dark *));

/* In components */
className="text-tekhelet dark:text-tropical-indigo"
```

## Styling Guidelines

### Tailwind CSS v4 Configuration
Theme configuration is in `src/index.css` using `@theme` directive (NOT a separate config file):

```css
@theme {
  --color-violet-russian: #3A015C;
  --color-mauve: #CAA8F5;
  --color-tropical-indigo: #9984D4;
  --color-tekhelet: #592E83;
  --color-bg-light: #FCFCFB;
  --color-bg-dark: #151A1F;
}
```

### Custom Color Palette
| Name | Hex | Usage |
|------|-----|-------|
| violet-russian | #3A015C | Primary dark purple |
| mauve | #CAA8F5 | Light purple accent |
| tropical-indigo | #9984D4 | Medium purple (dark mode text) |
| tekhelet | #592E83 | Dark purple text (light mode) |
| violet-grey | #18122B | Dark background |
| bg-light | #FCFCFB | Light background |
| bg-dark | #151A1F | Dark background |

### Safe Area Support
Custom CSS classes for iPhone notch compatibility:
- `.safe-area-full` - Full viewport with notch padding
- `.navbar-safe` - Navbar with safe area padding
- `.hero-full-screen` - Hero section with safe area support

### Animation Guidelines
- Transitions are conditionally applied via `body.transitions-enabled`
- Prevents flash on initial page load
- Duration: 500ms default, 200ms for fast transitions
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)`

## Component Patterns

### Creating New Sections
1. Add section component in appropriate `src/components/` subdirectory
2. Import and add to `src/pages/Home.tsx` with section `id` for anchor navigation
3. Add translations to `LanguageContext.tsx` if needed
4. Use `useLanguage()` hook for text content

### Glassmorphism Effect Pattern
```tsx
<div className="backdrop-blur-md bg-white/10 dark:bg-black/20 
                rounded-2xl border border-white/20 dark:border-white/10 
                shadow-xl hover:shadow-2xl transition-all duration-500">
```

### Responsive Breakpoints
Tailwind default breakpoints:
- `sm:` - 640px
- `md:` - 768px (tablet navigation threshold)
- `lg:` - 1024px
- `xl:` - 1280px

## File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `HeroSection.tsx` |
| Contexts | PascalCase + Context.tsx | `LanguageContext.tsx` |
| CSS Classes | kebab-case | `hero-container` |
| Assets | kebab-case | `fondo_dark_2k.png` |

## TypeScript Configuration

- **Strict mode enabled** (`strict: true`)
- **Target:** ES2020
- **Module:** ESNext with bundler resolution
- **JSX:** react-jsx transform
- No unused locals/parameters allowed

## Deployment

**Platform:** AWS Amplify

**Build Settings** (`amplify.yml`):
- Node.js 20 required
- Build command: `npm run build`
- Output directory: `dist`

**Cache:**
- `node_modules/**/*`
- `.npm/**/*`

## Environment Variables

No environment variables are currently configured. The project uses static configuration.

## Important Implementation Details

### Hero Section Scroll Effect
- Implements parallax scroll effect on hero background images
- Gradient overlay height/opacity changes with scroll position
- Images fade out as user scrolls down (500px threshold)

### Email Modal Security
- Email address is obfuscated and constructed dynamically
- Prevents email scraping bots
- Copy-to-clipboard functionality with fallback for older browsers

### Image Handling
- Tech stack logos stored in `/public/logos/`
- Project screenshots stored in `/src/assets/`
- Hero backgrounds in `/public/` (high resolution 2K images)

### Performance Optimizations
- Transitions disabled during initial page load
- Passive scroll listeners
- Image lazy loading (implicit via browser)

## Dependencies Notes

**AWS Amplify packages** (`aws-amplify`, `@aws-amplify/backend`) are included but no active backend configuration is in use. The project is purely frontend-hosted on Amplify.

**Three.js packages** (`three`, `@react-three/fiber`, `@react-three/drei`) are included as dependencies but not actively used in the current component set. The ProjectShowcase component contains placeholder 3D content.

## Common Tasks

### Adding a New Project
Edit `src/components/projects/ProjectShowcase.tsx`:
1. Add project object to `projects` array
2. Include: id, name, color, gradient, logo (emoji), title, description, images, URL

### Adding a Technology Logo
1. Add SVG/PNG to `/public/logos/`
2. Add `<LanguageCard />` to the tech stack grid in `Home.tsx`

### Adding a New Language
1. Extend `Language` type in `LanguageContext.tsx`
2. Add translation object for new language
3. Add language option to `LanguageSelector.tsx`
