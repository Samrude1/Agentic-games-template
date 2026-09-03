---
name: game-review
description: >-
  Audits and optimizes HTML/CSS/JS game code quality and validates UI style guide compliance.
  Use this skill whenever the user requests a code review, quality check, optimization,
  runs /review, /optimize, or /style-check.
---

# Game Code Review & Style Validation Skill

This skill guides the agent in conducting an in-depth code quality, architecture, performance, and UI style guide audit for an HTML5 Canvas / JavaScript game. It guarantees that performance stays pinned at 60 FPS and that buttons, colors, and layouts never suffer from visual or stylistic drift.

---

## ⚡ Style Guide & UI Consistency Check (`/style-check`)

Always run the automated style linter first or when verifying interface elements:
```bash
npm run lint:style
```
*(Runs `node scripts/check-style.js`)*

### Automated Style Rules Enforced:
1. **Buttons**: Every `<button>` must strictly possess one of the approved classes:
   - `.btn-primary` (Start, confirm, restart, key actions)
   - `.btn-secondary` (Settings, back, menu options)
   - `.touch-btn` / `.touch-action-btn` (Virtual mobile touch controls)
   - *Ad-hoc or unstyled buttons trigger a build error.*
2. **No Inline Styles**: Flags all `style="..."` attributes in HTML or direct element style mutations (`elem.style.background = ...`).
3. **No Arbitrary Hex Colors**: Flags hardcoded hex colors in CSS outside of `:root`. All styles must reference design tokens (e.g. `var(--primary)`, `var(--bg-color)`).
4. **Canvas Palette Alignment**: Canvas rendering must reference tokens via `getComputedStyle(document.documentElement).getPropertyValue('--primary')` or defined constants matching `STYLE_GUIDE.md`.

---

## 🔍 Full Quality Audit Checklist (`/review`)

### 1. Performance & 60 FPS Standards
- **Garbage Collection (GC) Pressure**:
  - Scan `update()` and `render()` loops for `new` calls (e.g. `new Vector()`, `new Particle()`) or object/array literals (`{}`, `[]`).
  - *Rule*: Entities created/destroyed in loops must be managed via **`ObjectPool.js`**.
- **Collision Efficiency**:
  - Is collision checking $O(n^2)$? Can checks use bounding radius, spatial grids, or squared distance comparison (`distanceSq`) to avoid `Math.sqrt`?
- **Canvas Rendering**:
  - Are unnecessary `ctx.save()` / `ctx.restore()` calls minimized?
  - Is off-screen culling applied?
- **DOM & Layout Thrashing**:
  - Are layout properties (`getBoundingClientRect`, `offsetWidth`) read inside the game loop? (Must only be read on resize).

### 2. Architecture & Decoupling
- **Single Responsibility**:
  - Is any scene or file overly monolithic (>300–400 lines) mixing physics, rendering, audio, and rules?
  - Are entities isolated in `src/entities/` inheriting from `Entity.js`?
- **Coupling & Encapsulation**:
  - Do entities mutate private variables across boundaries?
- **Global Variables**:
  - Verify absence of `window.x` or `var` variables.

### 3. Readability & Code Documentation
- **JSDoc**:
  - Are core classes, public methods, and parameters documented?
- **Game Math Explanations**:
  - Are complex physics, steering behaviors, or trigonometry formulas commented clearly?
- **Magic Numbers**:
  - Are literal numbers converted into named constants (`x += SPEED * dt`)?

### 4. Edge Cases & Resilience
- Is `dt` clamped (`Math.min(dt, 0.1)`)?
- Does the engine handle tab switching smoothly (`visibilitychange`)?
- Are audio calls guarded against autoplay policies?
- Is input cleanup automated via `engine.registerInput(input)`?

---

## Deliverables

1. Run `npm run lint:style` and report any style violations.
2. Update `.agents/blueprint/CODE_REVIEW.md` with grades (A–F), critical findings, and before/after code refactoring snippets.
3. Update `.agents/blueprint/PROJECT_STATUS.md` technical debt section.
4. Present an Executive Summary to the developer with actionable proposals.
