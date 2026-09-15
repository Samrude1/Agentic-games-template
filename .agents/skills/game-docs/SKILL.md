---
name: game-docs
description: >-
  Generates, synchronizes, and audits professional studio-grade development and release documentation.
  Use this skill whenever the user requests documentation, asks to generate/update game docs,
  prepares a release kit, or runs /docs, /document, or /docs:generate.
---

# Game Documentation Suite Skill (`game-docs`)

This skill manages the **Studio Documentation Suite** for the project. It provides standardized, studio-grade documentation across both the **active development lifecycle** and the **commercial release & distribution phase**.

Whenever a project foundation is established (via `/init` or `/onboard`) or when mechanics, art, audio, or release targets change, `/docs` ensures complete alignment between the game code and its single source of truth.

---

## 📚 Studio Documentation Architecture

All project documentation is partitioned cleanly into two directories:

### 1. Development & Engine Blueprint (`.agents/blueprint/`)
Persistent internal source of truth for the solo developer and AI coding agent:
- **`GDD.md`**: Core game mechanics, inputs, scoring rules, state machine, and camera bounds.
- **`ARCHITECTURE.md`**: Technical architecture, module boundaries, scene lifecycle, and zero-allocation memory budget.
- **`STYLE_GUIDE.md`**: Visual design tokens (`:root`), button styles (`.btn-*`), canvas palette, and UI rules.
- **`PROJECT_STATUS.md`**: Feature implementation matrix, active sprint tasks, and roadmap.

### 2. Studio Specifications & Release Kit (`docs/`)
Public and studio-facing documentation for production quality and distribution:
- **`docs/ART_BIBLE.md`**: Visual pillars, color tokens, pixel grid/vector standards, entity animation tables.
- **`docs/AUDIO_SPEC.md`**: Web Audio synthesis matrix, oscillator frequencies, envelopes, and sound buses.
- **`docs/LEVEL_DESIGN.md`**: Mathematical difficulty curves, wave spawn formulas, pacing, and scoring economy.
- **`docs/QA_PLAN.md`**: Unit test matrix, automated browser smoke checklist, and edge-case failure modes.
- **`docs/MARKETING_ONE_PAGER.md`**: Elevator pitch, itch.io & Steam store descriptions, metadata tags, GIF/screenshot checklist.
- **`docs/RELEASE_NOTES.md`**: Version changelog, platform release targets (Web PWA, Desktop `.exe`, itch.io), and distribution checklist.

---

## ⚡ Commands & Operating Modes

| Command | Mode | Description |
| :--- | :--- | :--- |
| `/docs`, `/docs generate` | **Generate / Scaffold** | Scaffolds any missing documentation files using studio templates, populated with project-specific mechanics. |
| `/docs sync` | **Synchronize** | Scans codebase (`src/`, `style.css`, `index.html`) to synchronize docs with live code realities (SFX, inputs, tokens). |
| `/docs audit`, `/docs check` | **Audit & Lint** | Verifies all documents exist, checks for lingering `{{PLACEHOLDERS}}`, dead references, and code mismatches. |
| `/docs release` | **Release Kit** | Generates or finalizes store-facing copy, itch.io tags, platform distribution checklists, and version changelog. |

---

## 🔄 Workflow Instructions for the Agent

### Mode 1: Full Suite Generation (`/docs generate`)

Execute when initializing a new project post-`/init` or establishing documentation after `/onboard`:

1. **Information Extraction**:
   - Inspect existing files: `src/`, `style.css`, `index.html`, `package.json`, `.agents/blueprint/`.
   - Identify: Game title, genre, controls, visual theme, audio sfx methods, win/loss rules, and save keys.
2. **Template Population**:
   - Read templates from `resources/templates/`.
   - Never write raw un-substituted template markers like `{{GAME_TITLE}}` or `{{SPEED}}`. Replace every variable with verified game data or calculated parameters.
3. **Write Documentation Files**:
   - Ensure the `docs/` folder exists at project root.
   - Generate all 6 standard `docs/` files:
     - `docs/ART_BIBLE.md`
     - `docs/AUDIO_SPEC.md`
     - `docs/LEVEL_DESIGN.md`
     - `docs/QA_PLAN.md`
     - `docs/MARKETING_ONE_PAGER.md`
     - `docs/RELEASE_NOTES.md`
   - Ensure `.agents/blueprint/` contains up-to-date `GDD.md`, `ARCHITECTURE.md`, `STYLE_GUIDE.md`, and `PROJECT_STATUS.md`.
4. **Summary & Verification**:
   - Report a clear status table to the developer indicating all generated files and key metrics.

---

### Mode 2: Codebase Synchronization (`/docs sync`)

Execute during development sprints when mechanics, audio, entities, or styling have evolved:

1. **Extract Live Code Realities**:
   - **Audio (`src/core/Audio.js`)**: Scan for procedural sound methods (e.g. `playJump`, `playLaser`, `playCoin`). Update `docs/AUDIO_SPEC.md` table.
   - **Input (`src/core/Input.js`, `index.html`)**: Scan keybindings and touch buttons (`.touch-btn`). Update `.agents/blueprint/GDD.md` control table.
   - **Style Tokens (`style.css`)**: Extract `:root` custom properties (`--primary`, `--bg-color`). Synchronize with `STYLE_GUIDE.md` and `docs/ART_BIBLE.md`.
   - **Level & Scaling (`src/scenes/GameScene.js`)**: Check spawn interval timers, enemy speed escalation, and scoring increments. Update `docs/LEVEL_DESIGN.md`.
   - **Entities & Pools (`src/entities/`, `src/utils/ObjectPool.js`)**: Update entity catalogs and capacity budgets in `.agents/blueprint/ARCHITECTURE.md`.
2. **Atomic Updates**:
   - Apply targeted edits using `replace_file_content` without rewriting unchanged sections.
3. **Log Synchronization**:
   - Append a sync note to `.agents/blueprint/DEV_LOG.md`.

---

### Mode 3: Documentation Quality Audit (`/docs audit`)

Execute before major checkpoints, code reviews (`/review`), or releases:

1. **Completeness Verification**:
   - Confirm all required files exist in `.agents/blueprint/` and `docs/`.
2. **Zero-Placeholder Check**:
   - Grep search for leftover template placeholders: `{{[A-Z0-9_]+}}`.
   - Any detected unreplaced token is considered a quality defect and must be resolved.
3. **Consistency Check**:
   - Check that color hex codes in `docs/ART_BIBLE.md` match `style.css`.
   - Check that sound effect names in `docs/AUDIO_SPEC.md` match actual methods in `src/core/Audio.js`.
   - Check that virtual resolution in `docs/ART_BIBLE.md` matches `Engine.js` (`960x540`).
4. **Deliver Audit Report**:
   - Score documentation health (A–F) and list actionable remediation steps.

---

### Mode 4: Release & Distribution Kit (`/docs release`)

Execute prior to packaging (`/build` / `game-deploy`):

1. **Read Version & Target Info**:
   - Check `package.json` version and game title.
2. **Draft Store Metadata**:
   - Formulate high-converting store copy in `docs/MARKETING_ONE_PAGER.md`:
     - Elevator pitch & one-line hook.
     - Short description (300 chars max) for itch.io card preview.
     - Long description with bullet points and GIF recommendations.
     - Itch.io / Steam / Web game tags.
3. **Prepare Release Notes**:
   - Update `docs/RELEASE_NOTES.md` with version header, release date, new features, bug fixes, and verified target platforms (`Web PWA`, `Desktop .exe`, `itch.io ZIP`).
4. **Deliver Launch Checklist**:
   - Provide the developer with a step-by-step launch checklist (build verification, screenshot creation, itch.io upload).

---

## 📐 Documentation Quality Standards

1. **Exact & Actionable**: Avoid vague generalities (e.g. "enemies move fast"). Always cite concrete units: `velocity: 240 px/s`, `canvas: 960x540`, `frequency: 880Hz -> 110Hz`.
2. **Visual Architecture**: Use Mermaid diagrams for loops, state machines, audio buses, and architecture flows.
3. **Single Source of Truth**: When values change in code, run `/docs sync` immediately to prevent doc-code drift.
