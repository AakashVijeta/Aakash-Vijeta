# Medium Refresh Implementation Plan

**Goal:** Improve the portfolio's premium feel through restrained GSAP motion and tighter UI states without changing the core terminal/F1 identity or preloader.

**Scope:**
- Refine section entrance animation timing and easing.
- Improve intro timeline and existing dossier divider animation.
- Add GSAP hover polish to project strips.
- Improve about/project/contact visual states with CSS.
- Preserve reduced-motion support and mobile performance.

**Files:**
- `src/components/SectionManager.jsx`
- `src/components/sections/IntroSection.jsx`
- `src/components/sections/ProjectsSection.jsx`
- `src/styles/sections.css`

**Verification:**
- Targeted ESLint for touched JSX files.
- Production build if the environment allows Vite/esbuild spawn.
- Graphify rebuild after code changes.
