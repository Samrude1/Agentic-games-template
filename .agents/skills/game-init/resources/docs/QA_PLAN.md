# Quality Assurance & Test Plan: {{GAME_TITLE}}

> **Project**: {{GAME_TITLE}}  
> **Standard**: Production Quality Verification & Regression Prevention  
> **Execution**: Unit Testing (`npm test`) + Automated Headless Browser Smoke Testing (`/test`)  

---

## 1. Test Strategy Overview

Quality assurance is divided into two distinct gates:
1. **Tier 1 (Deterministic Unit Tests)**: Instant node-based testing of core math, collisions, pooling, and save state logic (`npm test`).
2. **Tier 2 (Browser Automated Verification)**: End-to-end playtesting via `browser_subagent` checking 60 FPS, Canvas drawing, and Web Audio unlock.

---

## 2. Test Execution Matrix

| Test Suite | Target Modules | Pass Criteria | Command / Trigger |
| :--- | :--- | :--- | :--- |
| **Math & Vectors** | `src/utils/math.js` | 100% assertions match (lerp, clamp, normalize) | `node --test tests/math.test.js` |
| **Collision Tests** | `src/utils/Collision.js` | Zero false positives/negatives in circle & rect tests | `node --test tests/collision.test.js` |
| **Object Pool** | `src/utils/ObjectPool.js` | Zero memory leaks, correct pool recycling counts | `node --test tests/pool.test.js` |
| **Save Manager** | `src/utils/SaveManager.js` | Safe fallback on invalid JSON / storage exceptions | `node --test tests/save.test.js` |
| **Browser Smoke Test** | `index.html` + `Engine.js` | Zero uncaught errors, Canvas 960x540 drawn | `/test` (`game-test` skill) |
| **Framerate Stability** | Game Loop | 58–60 FPS over 10-second continuous simulation | `/test` (`game-test` skill) |

---

## 3. Critical Edge Cases & Failure Mode Checklist

- [ ] **Tab Backgrounding**: Does switching browser tabs and returning freeze or jump delta-time? (Must clamp `dt <= 0.1s`).
- [ ] **Autoplay Audio Policy**: Does audio remain silent without throwing `AudioContext not allowed to start` errors before user interaction?
- [ ] **Virtual Coordinate Translation**: Does clicking canvas on arbitrary browser aspect ratio map cleanly to internal 960x540 virtual space?
- [ ] **Mobile Touch Input**: Do virtual D-pad and Action buttons block browser pinch-to-zoom and page scrolling (`touch-action: none`)?
- [ ] **Garbage Collection Leaks**: Are any `new` object allocations detected in `update()` or `render()` methods?
- [ ] **Local Storage Corrupted Data**: Does the game safely recover with default stats if `localStorage` contains malformed JSON?
