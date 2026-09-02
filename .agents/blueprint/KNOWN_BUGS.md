# Known & Resolved Bugs (KNOWN_BUGS.md)

This file logs detected, investigated, and resolved bugs as part of the `/debug` (`game-debug`) diagnostic workflow.

---

## 🟢 Resolved Issues

| Date | Component | Symptom | Root Cause | Resolution |
| :--- | :--- | :--- | :--- | :--- |
| 2026-09-02 | `State.js` / `ParticleEmitter` | GC stutter in game loop | Dynamic object instantiation & `splice()` in loop | Replaced with `ObjectPool` recycling |
| 2026-09-02 | `Engine.js` | Physics teleportation on tab switch | Tab backgrounding resulted in massive delta-time jump | Added `visibilitychange` auto-pause & clock reset |
| 2026-09-02 | `Audio.js` | Fanfare notes out of sync | Used inaccurate `setTimeout()` instead of audio clock | Converted to `AudioContext.currentTime` scheduling |
| 2026-09-02 | `GameScene.js` | Hardcoded colors violated Style Guide | Static hex strings in scene code | Synced with `:root` CSS variables via `getComputedStyle` |

---

## 🔴 Open Issues

*No active defects currently registered.*
