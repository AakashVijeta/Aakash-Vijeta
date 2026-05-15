# Aakash Vijeta — Cinematic Portfolio

<div align="center">
  <p align="center">
    <a href="https://aakashvijeta.me"><b>Live Demo</b></a> •
    <a href="#-the-experience">The Experience</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-interaction-controls">Controls</a>
  </p>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</div>

---

## 🎬 The Experience

The portfolio leverages a **"Cinematic Tech-Noir"** aesthetic, blending industrial F1-inspired UI with terminal-grade digital elements. Every interaction is designed to feel tactile, weighted, and responsive.

### Key Features

*   **🌑 Atmospheric Noise Engine:** A custom canvas-based animated grain atmosphere that provides depth and texture without sacrificing performance.
*   **🌓 Dual-Persona Themes:** 
    *   `TERMINAL` — A phosphor green, CRT-inspired aesthetic for the builder/engineer.
    *   `F1` — A high-contrast, carbon fibre and racing-red aesthetic for the performance-driven professional.
*   **⚡ GSAP-Powered Motion System:** Deep integration with GSAP (ScrollTrigger, Observer) for smooth, logic-based section transitions and entrance animations.
*   **⏳ Signal-Tracing Preloader:** A sophisticated entry sequence featuring a collapsing frequency wave and a curtain-split reveal. It uses `sessionStorage` persistence to respect user time on return visits.
*   **🖱 Custom Cursor & Key Hints:** Bespoke pointer states and an on-screen keyboard hint layer reinforce the tactile, instrument-panel feel.

---

## 🛠 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) |
| **Animation** | [GSAP](https://gsap.com/) (ScrollTrigger, CustomEase, Observer) |
| **Styling** | Vanilla CSS (CSS Variables for dynamic theming) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📂 Project Structure

```bash
src/
├── components/
│   ├── sections/            # Intro, Projects (Evidence Board), About, Contact
│   ├── ProjectOverlay.jsx   # Detailed project view (Decryption Mode)
│   ├── Preloader.jsx        # Signal-tracing entry sequence
│   ├── SectionManager.jsx   # Orchestrates section transitions
│   ├── GlitchTransition.jsx # Inter-section glitch effect
│   ├── WipeTransition.jsx   # Curtain-style transition layer
│   ├── CustomCursor.jsx     # Bespoke pointer states
│   ├── KeyHints.jsx         # On-screen keyboard guide
│   ├── NavDots.jsx          # Section indicator dots
│   ├── BottomBar.jsx        # HUD-style status bar
│   ├── SectionCounter.jsx   # Section position readout
│   └── ThemeToggle.jsx      # Aesthetic mode switcher
├── hooks/
│   └── useSectionManager.js # Wheel/touch/keyboard navigation logic
├── context/
│   └── SectionContext.jsx   # Global state for sections and overlays
├── data/
│   └── projects.js          # Project catalogue
└── styles/
    ├── Global.css           # Tokens, resets, base layout
    ├── themes.css           # TERMINAL / F1 theme variables
    ├── sections.css         # Section-specific cinematic styling
    ├── Preloader.css        # Entry sequence
    ├── BottomBar.css        # HUD chrome
    └── ThemeToggle.css      # Toggle widget
```

---

## ⌨️ Interaction Controls

| Action | Control |
| :--- | :--- |
| **Navigation** | Scroll Wheel / Arrow Keys / Swipe (Mobile) |
| **Theme Toggle** | Press `T` or use the top-left toggle |
| **Decrypt Project** | Click any card on the **Evidence Board** |
| **Exit Overlay** | Press `ESC` or click outside the briefing |

---

## 🚀 Getting Started

```bash
# Clone and install
npm install

# Start development
npm run dev

# Build for production
npm run build
```

---

## ⚖️ License

Personal project — feel free to explore the source for architectural reference. Please do not redeploy the design or content as your own.

&copy; 2026 Aakash Vijeta

---

## 🧹 Note on local tooling

Local AI/agent config (`.claude/`, `.codex/`, `.cursor/`, `.superpowers/`, `.impeccable/`, `CLAUDE.md`, `AGENTS.md`, `DESIGN.md`, `PRODUCT.md`, etc.) and graphify artifacts (`graphify-out/`) are git-ignored. If any slip into a commit, run `git rm --cached -r <path>` and re-commit.
