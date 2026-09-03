# 🎮 Agentic Games Template (Solo Dev Kit - Studio Edition)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Engine: Vanilla JS / HTML5 Canvas](https://img.shields.io/badge/Engine-Vanilla%20JS%20%2F%20Canvas-orange.svg)](#-core-engine-features)
[![AI-First Architecture](https://img.shields.io/badge/AI--First-Skill--Based-emerald.svg)](#-slash-commands--skills)
[![Performance: 60 FPS](https://img.shields.io/badge/Performance-60%20FPS%20Determined-brightgreen.svg)](#-performance-standards)
[![CI / Unit Tests](https://img.shields.io/badge/Tests-Node%20Native%20100%25-green.svg)](tests/)

A professional, high-performance **HTML5 Canvas / Vanilla JavaScript** game development template and cognitive workflow kit optimized for **solo developers pair-programming with AI coding agents** (Antigravity IDE, Claude, Cursor, Copilot). Designed to deliver **studio-quality, reproducible results** with zero third-party game engine bloat.

---

## 💡 Why This Template?

Building games with AI coding assistants can quickly lead to context explosion, spaghetti code, memory leaks (Garbage Collection spikes), and broken state machines. 

This repository solves these challenges with:
- **Zero Heavy Dependencies**: Pure ES Modules, zero external game engines, and 100% transparent control.
- **Studio Documentation Standard**: Pre-structured blueprints for GDD, Art Bible, Audio Spec, Level Design & Economy, QA Test Plan, and Marketing One-Pagers.
- **Complete Scene Machine**: Out-of-the-box `MenuScene`, `GameScene`, and `GameOverScene` wired to persistent local high scores.
- **Battle-Tested 60 FPS Standards**: Built-in object pooling, clamped delta-time, trauma-based screen shake, 2D smooth tracking camera, and procedural Web Audio.
- **Automated Quality Gates**: Instant deterministic unit testing (`npm test` via native `node:test`), GitHub Actions CI, and browser playtesting.
- **Multi-Platform Releases**: One-command deployments to Web PWA, itch.io ZIP, GitHub Pages, and standalone **Windows Desktop executable (.exe)**.

---

## 🔄 The Solo Developer Loop

When developing with an AI assistant, maintain a disciplined, high-velocity loop:

```mermaid
graph TD
    A["🌅 1. /resume<br/>(Restore memory & pick key files)"] --> B["🔨 2. Feature Development<br/>(Atomic, focused implementation)"]
    B --> C["🧪 3. /test<br/>(Unit tests + browser playtesting)"]
    C -- Bug or failure --> D["🐛 4. /debug<br/>(Root cause & KNOWN_BUGS logging)"]
    D --> B
    C -- Clean pass --> E["🔍 5. /review<br/>(GC audit, style drift & 60 FPS check)"]
    E --> F["🌆 6. /save<br/>(Record session state & dev log)"]
    F --> G["🚀 7. /build<br/>(Desktop .exe, PWA & itch.io export)"]
```

---

## ⚡ Slash Commands & Skills

Control your AI assistant with crisp, standardized commands:

| Command | Skill | Description |
| :--- | :--- | :--- |
| `/resume` | `game-memory` | **Start of Day**: Restores memory from `SESSION_STATE.md` and loads only 2–4 key files to minimize token usage. |
| `/init` | `game-init` | **New Game**: Triggers an 8-question *Grill-Me* design interview, writes the complete studio docs suite, and scaffolds a working 60 FPS game. |
| `/onboard` | `game-onboard` | **Legacy Audit**: Dissects existing codebases, audits timing/rendering, and generates a blueprint structure. |
| `/test` | `game-test` | **Automated Testing**: Runs fast deterministic unit tests (`npm test`) and browser playtesting checking console errors, canvas drawing, and 60 FPS. |
| `/debug` | `game-debug` | **Diagnostics**: Locates root causes (canvas coordinate bugs, NaN delta-time, z-index traps) and updates `KNOWN_BUGS.md`. |
| `/review`, `/style-check` | `game-review` | **Quality & Style Assurance**: Runs the automated style linter (`npm run lint:style`), enforces button classes (`.btn-*`), flags GC allocations and CSS Style Drift. |
| `/save` | `game-memory` | **End of Day**: Compiles session achievements, logs next steps in `SESSION_STATE.md` and commits to `DEV_LOG.md`. |
| `/build` | `game-deploy` | **Distribution**: Generates offline PWA service workers, itch.io zips, and standalone Windows Desktop `.exe` binaries. |

---

## 📁 Repository Structure

```text
.
├── .agents/
│   ├── blueprint/              # 📌 Persistent Single Source of Truth
│   │   ├── GDD.md              # Game Design Document (rules, mechanics, inputs)
│   │   ├── ARCHITECTURE.md     # System architecture, class responsibilities, loop data flow
│   │   ├── STYLE_GUIDE.md      # 🎨 Design System: CSS tokens, button standards (.btn-*), HUD
│   │   ├── PROJECT_STATUS.md   # Current status, feature matrix, roadmap & technical debt
│   │   ├── CODE_REVIEW.md      # Performance and code health scorecards (A–F)
│   │   ├── KNOWN_BUGS.md       # Root-cause bug registry and fixed issues
│   │   ├── SESSION_STATE.md    # 🧠 Handoff baton between AI conversations
│   │   └── DEV_LOG.md          # 📜 Chronological developer diary
│   ├── rules/
│   │   └── game-dev.md         # Non-negotiable game dev rules (60 FPS, delta-time, pooling)
│   └── skills/                 # ⚡ Autonomous agent tools & execution prompts
│       ├── game-init/          # Scaffolding and studio documentation generator
│       │   └── resources/docs/ # 📚 Studio docs templates (Art Bible, Audio, Level Design, QA, Marketing)
│       ├── game-onboard/       # Codebase discovery and architecture mapping
│       ├── game-review/        # GC, coupling, and style audits
│       ├── game-test/          # Deterministic unit testing and automated browser verification
│       ├── game-debug/         # Diagnostic workflows
│       ├── game-memory/        # Token-efficient save/resume protocol
│       └── game-deploy/        # Multi-target distribution (.exe, PWA, itch.io)
├── .github/workflows/
│   └── ci.yml                  # 🚀 Automated GitHub Actions CI test pipeline
├── tests/                      # 🧪 Deterministic unit tests (node --test)
│   ├── math.test.js            # Vector math, clamping, and interpolation tests
│   ├── collision.test.js       # Circle and AABB box collision intersection tests
│   ├── pool.test.js            # Object pool recycling & zero memory leak tests
│   └── save.test.js            # SaveManager fallback & local storage tests
├── AGENTS.md                   # 🎯 Primary AI Agent instruction card
├── package.json                # 📦 Scripts: test, dev, build:exe
├── LICENSE                     # 📄 MIT License
├── README.md                   # 📖 Project documentation
└── .gitignore                  # 🛡️ Clean repository guard
```

---

## 🎮 Core Engine Features

When initialized (`/init`), the generated scaffold includes:

1. **Deterministic Engine (`src/core/Engine.js`)**:
   - 60 FPS `requestAnimationFrame` loop with clamped delta-time (`Math.min(dt, 0.1)`).
   - Automated input reset at end of frame via `engine.registerInput(input)`.
   - Built-in `visibilitychange` listener with auto-pause/resume and clock reconciliation.
   - Responsive aspect-ratio preservation (letterbox/pillarbox) with virtual coordinate translation (`screenToVirtual`).

2. **Complete Scene State Machine (`src/scenes/`)**:
   - `MenuScene.js`: Title screen, high score banner from `SaveManager`, and audio prompt.
   - `GameScene.js`: Active game loop, player movement, collisions, screen shake, and particles.
   - `GameOverScene.js`: Run statistics, high-score recognition, restart, and menu return.

3. **Pooled Entity Base Class (`src/entities/Entity.js`)**:
   - Generic base class with `pos`, `vel`, `radius`, `health`, `active`, `update`, `render`, and `reset()`.

4. **Studio Juice & Utilities (`src/utils/`)**:
   - `SaveManager.js`: Safe, schema-versioned `localStorage` wrapper with graceful fallbacks.
   - `ScreenShake.js`: Trauma-based non-linear screen shake (`shake = trauma^2`).
   - `Camera.js`: 2D smooth tracking camera with lerp and world bounds clamping.
   - `Timer.js`: Zero-allocation cooldowns, repeating delays, and progress normalization.
   - `ObjectPool.js`: Generic reusable object pool for particles, projectiles, and hazards.
   - `AssetLoader.js` & `SpriteSheet.js`: Async image asset preloading and sprite frame animation slicing.
   - `math.js` & `Collision.js`: Optimized 2D vector math and intersection checks.

5. **Procedural Web Audio (`src/core/Audio.js`)**:
   - 100% code-based procedural sound synthesis using the Web Audio API.
   - Out-of-the-box SFX: Jump, Laser/Shoot, Coin/Pickup, Hit, Explosion, and Victory Fanfare.
   - Precise audio clock scheduling (`ctx.currentTime`) with browser autoplay policy compliance.

---

## 🚀 Quick Start

### 1. Clone or Template
```bash
git clone https://github.com/Samrude1/Agentic-games-template.git my-game
cd my-game
```

### 2. Launch in your AI IDE
Open the folder in **Antigravity IDE**, **Cursor**, or your favorite AI coding environment.

### 3. Kick off your game
In your chat prompt, simply type:
```
/init
```
The agent will guide you through the 8-question studio concept interview, generate your full documentation suite (`GDD.md`, `ART_BIBLE.md`, `AUDIO_SPEC.md`, `LEVEL_DESIGN.md`, `QA_PLAN.md`, `MARKETING_ONE_PAGER.md`), and scaffold a playable 60 FPS game.

### 4. Run tests
```bash
npm test
```

### 5. Build for Desktop (.exe)
```bash
npm run build:exe
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Feel free to use it for personal, commercial, or game jam projects!
