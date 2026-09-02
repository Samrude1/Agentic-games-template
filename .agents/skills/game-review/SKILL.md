---
name: game-review
description: >-
  Audits and optimizes HTML/CSS/JS game code quality. Use this skill whenever
  the user requests a code review, quality check, optimization, spaghetti code audit,
  or runs /review or /optimize.
---

# Game Code Review & Optimization Skill

This skill guides the agent in conducting an in-depth code quality, architecture, and performance audit for an HTML5 Canvas / JavaScript game. It is designed for post-sprint quality gates and multi-session validation.

---

## Audit Checklist

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
  - Are entities isolated in `src/entities/`?
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

### 5. UI & Style Drift Audit
- Compare interface elements against `.agents/blueprint/STYLE_GUIDE.md`:
  - **Buttons**: Are all buttons styled with `.btn-*` or `.touch-btn` classes?
  - **Colors**: Are hex codes in CSS replaced with `:root` CSS variables?
  - **Canvas Palette**: Do canvas draw calls align with the style guide palette?

---

## Deliverables

1. Update `.agents/blueprint/CODE_REVIEW.md` with grades (A–F), critical findings, and before/after code refactoring snippets.
2. Update `.agents/blueprint/PROJECT_STATUS.md` technical debt section.
3. Present an Executive Summary to the developer with actionable proposals.
