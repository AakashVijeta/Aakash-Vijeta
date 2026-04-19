# aakashvijeta.me

Personal portfolio site — live at [aakashvijeta.me](https://aakashvijeta.me).

Tech-noir, single-page portfolio with a terminal/F1 dual theme, GSAP-powered section transitions, and a custom preloader.

## Tech stack

- React 19 + Vite
- GSAP (ScrollTrigger, Observer, CustomEase) for all animations and transitions
- Deployed on Vercel

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint

## Project structure

```
src/
  components/        React components
    sections/        IntroSection, ProjectsSection, AboutSection, ContactSection
  context/           SectionContext — global nav state
  hooks/             useSectionManager — keyboard/wheel/touch input
  data/              projects.js — project content
  styles/            Global CSS, themes, section styles, preloader
  App.jsx            Root layout
  main.jsx           Entry point
public/              Static assets (project images, favicon)
```

## Themes

Press `T` (or use the toggle top-left) to switch between:
- **Terminal** — phosphor green CRT aesthetic
- **F1** — carbon fibre red racing aesthetic

## Deployment

Configured for Vercel. Push to `main` and Vercel handles the rest.

## License

Personal project — feel free to read the source for reference, but please don't redeploy it as your own.
