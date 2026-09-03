# Project Status & Roadmap (PROJECT_STATUS.md)

This document tracks verified implementation progress, active feature matrix, technical debt, and sprint action plans. Update this after each development sprint.

---

## 1. Executive Status
- **Current State**: Studio Grade & Fully Reproducible (Production Solo Dev Kit)
- **Estimated Completion**: 100% (Full Engine, Comprehensive Docs Suite, Unit Tests & CI/CD)
- **Last Updated**: 2026-09-03
- **Key Focus**:
  - Studio-grade documentation suite integrated (`docs/`: GDD, Art Bible, Audio Spec, Level Design & Economy, QA Plan, Marketing One-Pager).
  - Complete scene state machine (`MenuScene`, `GameScene`, `GameOverScene`).
  - Pooled `Entity.js` base class and studio utilities (`SaveManager`, `ScreenShake`, `Camera`, `Timer`, `AssetLoader`, `SpriteSheet`).
  - Deterministic zero-dependency unit testing (`npm test` via `node:test`) + GitHub Actions CI.
  - Multi-platform deployment: Web, PWA, itch.io, and Windows Desktop `.exe`.

---

## 2. Feature Matrix

| Domain | Feature | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Documentation** | Studio Game Documentation Suite | 🟩 Complete | GDD, Art Bible, Audio Spec, Level Design, QA Plan, Marketing One-Pager |
| **Core** | Game Loop & Clamped Delta-Time | 🟩 Complete | 60 FPS `requestAnimationFrame`, clamped `dt <= 0.1s` |
| **Core** | Tab Visibility Pause/Resume | 🟩 Complete | `visibilitychange` guards against lag spikes |
| **Core** | Automated Input Post-Update | 🟩 Complete | `engine.registerInput()` clears frame states automatically |
| **Core** | Canvas Scaling & Aspect Ratio | 🟩 Complete | Aspect-ratio letterbox & virtual coordinates (960x540) |
| **Core** | Object Pooling | 🟩 Complete | `ObjectPool.js` for zero GC pressure |
| **Core** | Entity Base Class | 🟩 Complete | `Entity.js` pool-friendly base class |
| **Scenes** | Complete State Machine | 🟩 Complete | `MenuScene`, `GameScene`, `GameOverScene` |
| **Utilities** | Save & High Score System | 🟩 Complete | `SaveManager.js` with schema versioning & fallbacks |
| **Utilities** | Screen Shake Juice | 🟩 Complete | `ScreenShake.js` trauma-based camera shake |
| **Utilities** | 2D Camera Tracking | 🟩 Complete | `Camera.js` with smooth lerp & world bounds clamping |
| **Utilities** | Deterministic Timers | 🟩 Complete | `Timer.js` zero-allocation cooldowns and delays |
| **Utilities** | Asset & Sprite Pipelines | 🟩 Complete | `AssetLoader.js` & `SpriteSheet.js` |
| **Utilities** | Game Math & Physics Helpers | 🟩 Complete | `math.js` (`lerp`, `clamp`, `distanceSq`, `normalize`) |
| **Utilities** | Collision Detection | 🟩 Complete | `Collision.js` (`circleVsCircle`, `rectVsRect`, `circleVsRect`) |
| **Inputs** | Keyboard, Mouse, Touch | 🟩 Complete | Unified `Input.js` with virtual mobile controls |
| **Graphics & UI** | HUD & Modal Overlays | 🟩 Complete | Standardized CSS tokens (`--text-main`, `.btn-primary`) |
| **Audio** | Procedural Web Audio | 🟩 Complete | Accurate Web Audio clock scheduling with zero mp3/wav files |
| **Testing** | Zero-Dependency Unit Tests | 🟩 Complete | `npm test` running 14 unit tests across utilities |
| **Testing** | Browser Smoke Playtest | 🟩 Complete | `/test` (`game-test` skill) with canvas & FPS check |
| **CI/CD** | GitHub Actions Workflow | 🟩 Complete | `.github/workflows/ci.yml` running unit tests on push/PR |
| **Packaging** | Multi-Target Distribution | 🟩 Complete | Web PWA, itch.io ZIP, and Desktop `.exe` (`game-deploy`) |
| **Memory** | Session Memory & Handoff | 🟩 Complete | `/save` & `/resume` (`game-memory` skill) |

*Status Legend: 🟩 Complete | 🟨 In Progress | 🟥 Defect / Needs Fix | ⬜ Planned*

---

## 3. Technical Debt & Resolved Issues
- [x] Implemented missing scenes: `MenuScene.js` and `GameOverScene.js`.
- [x] Implemented missing entity base class: `Entity.js`.
- [x] Fixed input cycle architecture: moved `input.postUpdate()` into `Engine.loop()`.
- [x] Implemented `SaveManager.js` for safe persistent high scores and settings.
- [x] Implemented `ScreenShake.js` for visceral visual impact feedback.
- [x] Implemented `Camera.js`, `Timer.js`, `AssetLoader.js`, and `SpriteSheet.js`.
- [x] Added zero-dependency unit tests (`tests/*.test.js`) and `package.json` scripts.
- [x] Added GitHub Actions CI pipeline (`.github/workflows/ci.yml`).
- [x] Added MIT `LICENSE` and updated `.gitignore`.
- [x] Synced typography token `--text-main` across `STYLE_GUIDE.md` and `style.css`.
- [x] Added Desktop `.exe` packaging instructions to `game-deploy`.
- [x] Expanded `game-init` to 8-question studio Grill-Me and full documentation suite generator.

---

## 4. Solo Dev Roadmap
1. **To start a new studio game**: Type `/init` to launch the 8-question Grill-Me interview and documentation scaffold.
2. **To verify code health**: Run `npm test` or type `/test` for browser verification.
3. **To export for distribution**: Type `/build` for PWA, itch.io, or desktop `.exe`.
