# Project Context: Digital Dossier

## Overview
**Digital Dossier** is a high-performance, professional portfolio and personal information repository for **Naman Soni**, a Backend and Full-Stack Developer. The project is designed with a "systems-first" mindset, reflecting the developer's technical depth and attention to craft.

## Tech Stack
The project leverages a modern, cutting-edge web development stack:

- **Framework**: [TanStack Start](https://tanstack.com/router/latest/docs/framework/react/start/overview) (React 19)
  - Provides Full-stack SSR capabilities on top of TanStack Router.
- **Router**: TanStack Router (Type-safe routing).
- **Styling**: Tailwind CSS 4.0 (utilizing the new `@theme` engine and OKLCH colors).
- **Animations**: Framer Motion (for smooth transitions and interactive micro-animations).
- **UI Components**: Radix UI primitives (headless components for accessibility and robustness).
- **Bundler**: Vite 7.
- **Runtime/Package Manager**: Bun.
- **Infrastructure**: Targeted for Cloudflare Workers/Pages (judging by `wrangler.jsonc`).

## Project Structure
- `src/routes/`: Contains the application pages and layouts using file-based routing.
  - `__root.tsx`: The main shell of the application.
  - `index.tsx`: The landing page containing all primary sections.
  - `resume.tsx`: A dedicated interactive resume view.
- `src/components/`: Modular UI components (Hero, Projects, Skills, etc.).
- `src/styles.css`: Central hub for design tokens and custom CSS utilities (Scanlines, Grid patterns).
- `src/lib/`: Utility functions and shared logic.

## Key Features
- **Server-Side Rendering (SSR)** for SEO and performance.
- **Dynamic Content Sections**: Modular architecture for easy updates to projects and experience.
- **Interactive UI**: Motion-heavy, terminal-inspired design.
