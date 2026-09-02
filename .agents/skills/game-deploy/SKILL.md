---
name: game-deploy
description: >-
  Packages and prepares the game for distribution (PWA, itch.io, GitHub Pages).
  Use this skill whenever the user wants to publish, package builds,
  make an offline PWA, or runs /build, /deploy, or /export.
---

# Game Deploy & Packaging Skill

This skill guides the agent in packaging and optimizing an HTML5 Canvas game for distribution. It ensures the build runs self-contained without server-side dependencies, supports mobile PWA installation, and is ready for upload to **itch.io** or **GitHub Pages**.

---

## Deployment Workflow

### Step 1: Production Readiness Audit
1. **Relative Paths**:
   - Verify all script imports, asset references, and stylesheets use relative paths (`./style.css`), enabling execution in any subpath (e.g., `username.github.io/my-game/`).
2. **Code Cleanliness**:
   - Strip verbose debug `console.log` statements.
   - Ensure `showFps` is disabled by default for production builds.
3. **SEO & Social Sharing Metadata**:
   - Validate `<title>`, `<meta name="description">`, and OpenGraph social share tags (`og:title`, `og:image`, `og:description`) in `index.html`.

---

### Step 2: Progressive Web App (PWA) Offline Support
If mobile installation or offline play is targeted:
1. **`manifest.json`**:
   - Name, short_name, `start_url: "./index.html"`, `display: "standalone"`, `orientation: "landscape"` (or portrait), theme color tokens.
2. **Service Worker (`sw.js`)**:
   - Lightweight cache-first strategy caching `index.html`, `style.css`, and core `src/` modules for offline play.
3. **Registration**:
   - Service worker registration call in `src/main.js`.

---

### Step 3: Platform Packaging

#### A. itch.io ZIP Package
- Archive files directly at the root of the ZIP (`index.html` at the zip root, no nested top-level folder).
- Recommended itch.io project settings:
  - *Kind of project*: HTML
  - *Viewport dimensions*: Match internal virtual resolution (e.g., 960 x 540).
  - *Mobile friendly*: Enabled.

#### B. GitHub Pages Release
- Prepare files for `main` or `gh-pages` branch.
- Provide simple 2-step activation instructions (*Repository Settings -> Pages -> Deploy from branch*).

---

### Step 4: Release Report for Developer
Deliver a concise summary with build details, manifest structure, and direct platform upload instructions.
