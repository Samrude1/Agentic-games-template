# Release Notes & Distribution Manifest: {{GAME_TITLE}}

> **Project**: {{GAME_TITLE}}  
> **Current Version**: {{VERSION}}  
> **Release Date**: {{RELEASE_DATE}}  
> **Target Channels**: Web PWA / itch.io ZIP / Standalone Windows Desktop (.exe)  

---

## 1. Version Changelog

### Version {{VERSION}} ({{RELEASE_DATE}})
- **Core Gameplay**:
  - Initial public release of {{GAME_TITLE}}.
  - 60 FPS deterministic canvas loop with virtual 960x540 resolution.
  - Multi-input support: Keyboard, Mouse, Mobile Touch, and Gamepad.
- **Visuals & Juice**:
  - Trauma-based screen shake on impacts.
  - Zero-allocation particle effects via ObjectPool.
  - High-contrast responsive HUD with active score and combo multiplier.
- **Audio**:
  - 100% procedural Web Audio API sound synthesis.
  - Sound effects for actions, collisions, collection, and victory fanfare.
- **Persistence**:
  - LocalStorage high-score and settings persistence via SaveManager.

---

## 2. Supported Platforms & Build Artifacts

| Platform | Target Artifact | Build Command | Delivery Path |
| :--- | :--- | :--- | :--- |
| **Web PWA** | Static HTML/CSS/JS + `manifest.json` | N/A (Self-contained) | `dist/` or Project Root |
| **Desktop (.exe)** | Windows x64 Executable | `npm run build:exe` | `dist/exe/{{GAME_TITLE}}-win32-x64/` |
| **itch.io** | Standalone HTML5 ZIP archive | `npm run build:zip` / manual zip | `dist/{{GAME_TITLE}}-itch.zip` |
| **GitHub Pages** | Static hosted web game | `git push origin main` | `username.github.io/repo/` |

---

## 3. Pre-Release Quality Gate Checklist

- [ ] All automated unit tests passing (`npm test`).
- [ ] UI style guide compliance verified (`npm run lint:style`).
- [ ] Zero unhandled JavaScript errors in console.
- [ ] Autoplay audio unlocking cleanly on first user gesture.
- [ ] Virtual resolution scaling correctly on both ultra-wide and mobile viewports.
- [ ] Mute state and high scores persisting across page refreshes.
- [ ] Store screenshots and promotional GIFs captured.
