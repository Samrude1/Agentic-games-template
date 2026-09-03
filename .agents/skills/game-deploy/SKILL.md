---
name: game-deploy
description: >-
  Packages and prepares the game for distribution (Desktop .exe, PWA, itch.io, GitHub Pages).
  Use this skill whenever the user wants to publish, package builds, make desktop executables,
  make an offline PWA, or runs /build, /deploy, or /export.
---

# Game Deploy & Packaging Skill (Studio Edition)

This skill guides the agent in packaging and optimizing an HTML5 Canvas game for multi-platform distribution. It ensures the build runs self-contained without server dependencies, supports mobile PWA installation, bundles directly into a standalone **Windows Desktop executable (.exe)**, and is ready for upload to **itch.io**, **Steam**, or **GitHub Pages**.

---

## Deployment Workflow

### Step 1: Production Readiness Audit
1. **Relative Paths**:
   - Verify all script imports, asset references, and stylesheets use relative paths (`./style.css`), enabling execution in any local or hosted subpath (e.g., `username.github.io/my-game/` or `file:///` inside desktop shells).
2. **Code Cleanliness & Unit Tests**:
   - Run `npm test` to guarantee 100% test pass.
   - Strip verbose debug `console.log` statements.
   - Ensure `showFps` is disabled by default for production builds.
3. **SEO & Social Sharing Metadata**:
   - Validate `<title>`, `<meta name="description">`, and OpenGraph social share tags (`og:title`, `og:image`, `og:description`) in `index.html`.

---

### Step 2: Desktop Executable (.exe) Packaging
If a standalone desktop application is targeted (for Steam, itch.io Windows download, or offline distribution):

#### Option A: One-Command Electron Shell Packaging
1. Create a minimal desktop entry point `electron-main.cjs` if needed:
   ```javascript
   const { app, BrowserWindow } = require('electron');
   const path = require('path');

   function createWindow() {
     const win = new BrowserWindow({
       width: 960,
       height: 540,
       useContentSize: true,
       autoHideMenuBar: true,
       backgroundColor: '#0b0f19',
       webPreferences: {
         nodeIntegration: false,
         contextIsolation: true
       }
     });
     win.loadFile('index.html');
   }

   app.whenReady().then(createWindow);
   app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
   ```
2. Build standalone executable directly via CLI:
   ```bash
   npx -y @electron/packager . MyGame --platform=win32 --arch=x64 --out=dist/exe --overwrite
   ```
3. Output: Self-contained Windows directory in `dist/exe/MyGame-win32-x64/MyGame.exe`.

#### Option B: Ultra-Lightweight Neutralinojs / NW.js Alternative
- For builds under 15MB: use Neutralinojs (`npx @neutralinojs/neu build`) or NW.js zip packaging.

---

### Step 3: Progressive Web App (PWA) Offline Support
If mobile installation or offline browser play is targeted:
1. **`manifest.json`**:
   - Name, short_name, `start_url: "./index.html"`, `display: "standalone"`, `orientation: "landscape"`, theme color tokens.
2. **Service Worker (`sw.js`)**:
   - Lightweight cache-first strategy caching `index.html`, `style.css`, and core `src/` modules for offline play.
3. **Registration**:
   - Service worker registration call in `src/main.js`.

---

### Step 4: Web Storefront Packaging

#### A. itch.io ZIP Package
- Archive files directly at the root of the ZIP (`index.html` at the zip root, no nested top-level folder).
- Recommended itch.io project settings:
  - *Kind of project*: HTML
  - *Viewport dimensions*: Match internal virtual resolution (e.g., 960 x 540).
  - *Mobile friendly*: Enabled.

#### B. GitHub Pages Release
- Prepare files for `main` or `gh-pages` branch.
- Simple 2-step activation instructions (*Repository Settings -> Pages -> Deploy from branch*).

---

### Step 5: Release Report for Developer
Deliver a concise summary with build details, manifest structure, and direct download / upload links.
