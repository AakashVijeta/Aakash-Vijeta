# aakashvijeta.me

Personal portfolio site — live at [aakashvijeta.me](https://aakashvijeta.me).

Dark, minimal, single-page site with an interactive particle portrait, animated navigation, and a spotlight layout for featured work.

## Tech stack

- React 19 + Vite
- MUI + Bootstrap for UI primitives
- Custom Canvas animation for the particle portrait
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
  components/    React components (Intro, Projects, NavBar, ParticlePortrait, ...)
  styles/        Per-component CSS
  App.jsx        Root layout
  main.jsx       Entry point
public/          Static assets
```

## Deployment

Configured for Vercel (see [vercel.json](vercel.json)). Push to `main` and Vercel handles the rest. Custom domain routing is managed via DNS records pointing at Vercel.

## License

Personal project — feel free to read the source for reference, but please don't redeploy it as your own.
