<div align="center">

# ✦ Kishore A — Developer Portfolio

**A fully immersive, 3D interactive developer portfolio built to be experienced, not just read.**

<p>
  <a href="https://yourportfolio.com" target="_blank"><img src="https://img.shields.io/badge/Live%20Site-Visit%20Now-7c3aed?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Site" /></a>
  <a href="https://reactjs.org/" target="_blank"><img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" /></a>
  <a href="https://threejs.org/" target="_blank"><img src="https://img.shields.io/badge/Three.js-R3F-black?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js" /></a>
  <a href="https://www.framer.com/motion/" target="_blank"><img src="https://img.shields.io/badge/Framer%20Motion-12-ff4d4d?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" /></a>
  <a href="https://vitejs.dev/" target="_blank"><img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 7" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-lightgrey?style=for-the-badge" alt="MIT License" /></a>
</p>

</div>

---

## Overview

This isn't a portfolio you scroll through — it's one you explore. Built entirely as a single-page 3D experience, it visualizes technical competencies as an interactive neural network, lets visitors query the developer through a built-in CLI terminal, and presents projects as an immersive scroll-reveal showcase.

Designed with one goal: to make the work speak before a single word is read.

---

## 📋 Table of Contents

- [Live Demo](#live-demo)
- [Features](#-features)
- [AI-Assisted Workflow](#-ai-assisted-workflow)
- [Tech Stack](#️-tech-stack)
- [Repository Structure](#-repository-structure)
- [Getting Started](#-getting-started)
- [Content Editing Guide](#-content-editing-guide)
- [License](#-license)

---

## Live Demo

> **[yourportfolio.com](https://yourportfolio.com)** <!-- TODO: replace with your live URL -->

---

## ✨ Features

### 🧠 Interactive 3D Neural Network
A real-time 3D node graph rendered with `@react-three/fiber` that maps technical skills into layered neural architecture. Hovering over a skill layer triggers synapse propagation pulses across the graph. Each node renders its label as a floating 3D badge with adjustable emissive glow.

### 💻 Ask-Me-Anything CLI Terminal
A fully interactive terminal component embedded in the portfolio. Visitors can run commands like `about`, `projects`, `skills`, `stats`, `contact`, and `hire`, with custom boot-up log sequences and nested easter eggs buried throughout.

### 🎬 Featured Projects Showcase
A sticky scroll-reveal presentation that spotlights major projects — including a RAG system, AstraFlow, AstraStudio, and a Llama 3.2 fine-tuning pipeline — with custom metric callouts, technology tag arrays, and visual pipeline flow diagrams per project.

### ⚡ Symmetric Floating Projects Grid
The "More Projects" section dynamically backfills from the featured set to always render exactly 8 cards, maintaining perfect visual symmetry regardless of how many additional projects are listed.

### 🧭 Smart Floating Navbar
A center-aligned pill navigation bar with a live scroll-progress indicator. It automatically hides when the hero section leaves the viewport and re-appears on mouse approach to the top edge — keeping the canvas uncluttered while staying accessible.

### 🛡️ Defensive Layout Guards
Every section uses null-safe rendering patterns — if optional fields like pipeline steps or stat cards are omitted from the data layer, the layout adjusts gracefully instead of throwing rendering errors.

### ✏️ Content-Code Separation
All copy, stats, project specs, timeline entries, and terminal scripts live in standalone JS files under `src/data/`. No React knowledge needed to update the site's content — just edit the relevant data file.

---

## 🤖 AI-Assisted Workflow

This portfolio was built end-to-end through a deliberate, multi-model AI collaboration — each tool assigned based on its strengths:

| Model / Tool | Role in This Project |
|---|---|
| **Claude** | Initial design blueprint, responsive wireframes, component boundaries, and interactive flow architecture |
| **Google AI Studio** | Styling refinements, 3D neural node glow calibration, advanced layout and logic debugging |
| **Replit** | Early prototype setup and live mockup hosting |
| **Google Antigravity IDE** | Final agentic refactoring pass — content/code separation, defensive rendering guards, cross-route navbar scroll fixes, production build and type-check verification |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19, TypeScript |
| **Build Tool** | Vite 7 |
| **3D Engine** | Three.js, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing` |
| **Animations** | Framer Motion 12 |
| **Styling** | Tailwind CSS |
| **Routing** | React Router DOM 7 |
| **Icons** | Lucide React |
| **Package Manager** | pnpm (monorepo workspace) |

---

## 📁 Repository Structure

```
.
├── README.md                           # This file
├── package.json                        # Root monorepo scripts
├── pnpm-workspace.yaml                 # Monorepo workspace configuration
├── start.md                            # Development server reference guide
├── artifacts/
│   └── portfolio/                      # Core React portfolio application
│       ├── package.json
│       ├── index.html                  # Entry point — title, metadata, favicon
│       ├── public/                     # Static assets (logo, opengraph images)
│       └── src/
│           ├── App.tsx                 # Top-level routing, page transitions, AI capsule wrapper
│           ├── main.tsx                # Application entry point
│           ├── index.css               # Global styles and font imports
│           │
│           ├── data/                   # ← EDIT THIS FOLDER to update site content
│           │   ├── heroContent.js      # Hero taglines, typing scripts, and stats
│           │   ├── aboutContent.js     # Biography paragraphs and metrics
│           │   ├── skillsContent.js    # 3D neural layer definitions and node groups
│           │   ├── projects.js         # All 8 project specifications and metadata
│           │   ├── experienceContent.js# Academic timeline, certifications, achievements
│           │   ├── terminalContent.js  # CLI boot logs and command output definitions
│           │   └── contactContent.js   # Social links and availability status
│           │
│           ├── components/             # Reusable UI elements (SkillNodes, SkillEdges, Navbars)
│           ├── hooks/                  # Animation triggers and viewport detection logic
│           ├── pages/                  # Full router page views (e.g. /projects catalog)
│           └── sections/              # Main layout sections (Hero, About, Skills, Experience)
│
└── scripts/                            # Local setup helpers and DB schema utilities
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **pnpm** package manager

```bash
npm install -g pnpm
```

### Install Dependencies

From the repository root:

```bash
pnpm install
```

### Run Locally

Start the portfolio development server:

```bash
npx pnpm dev:portfolio
```

The app runs at **`http://localhost:8080/`**.

To run all services concurrently (portfolio + mockup sandbox + API mock server):

```bash
npx pnpm dev
```

### Build for Production

```bash
PORT=8080 BASE_PATH="/" npx pnpm run build
```

Output is written to `artifacts/portfolio/dist/public/`.

---

## ✏️ Content Editing Guide

All site content is decoupled from the React component layer. To update any part of the portfolio without touching component code, edit the corresponding file in `src/data/`:

| What to change | File to edit |
|---|---|
| Hero tagline, typing animation, headline stats | `heroContent.js` |
| Bio paragraphs and personal metrics | `aboutContent.js` |
| Skill layers and 3D neural node groupings | `skillsContent.js` |
| Project cards, tags, links, pipeline steps | `projects.js` |
| Resume timeline, certifications, awards | `experienceContent.js` |
| Terminal boot sequence and command responses | `terminalContent.js` |
| Social links, email, availability badge | `contactContent.js` |

---

## 📄 License

Released under the [MIT License](LICENSE). Feel free to fork and adapt this as a template for your own portfolio — attribution appreciated but not required.

---

<div align="center">

Designed and built by **[Kishore A](https://github.com/a-kishore-dev)**

*Vibe-coded with Claude, Google AI Studio, Replit, and Google Antigravity IDE.*

</div>