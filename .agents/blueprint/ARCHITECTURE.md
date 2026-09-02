# Technical Architecture (ARCHITECTURE.md)

This document defines the technical structure, module responsibilities, data flow, and performance standards of the game engine. Every developer and AI agent must adhere to this architecture.

---

## 1. System Architecture & Modules

```mermaid
graph TD
    A[index.html] --> B[src/main.js - Bootstrap]
    B --> C[src/core/Engine.js - Game Loop & Scaling]
    B --> D[src/core/Input.js - Keyboard, Mouse, Touch]
    B --> E[src/core/Audio.js - Procedural Web Audio API]
    C --> F[src/core/State.js - Scene Machine & Particles]
    F --> G[src/scenes/ - Game States]
    G --> H[MenuScene]
    G --> I[GameScene]
    G --> J[GameOverScene]
    I --> K[src/entities/ - Player, Enemies, Projectiles]
    I --> L[src/utils/ - Math, Collision, ObjectPool]
```

---

## 2. Directory Structure & Responsibilities

| File / Directory | Responsibility |
| :--- | :--- |
| `index.html` | Canvas element, HUD/UI overlays, and on-screen mobile touch controls |
| `style.css` | Responsive layout, letterbox scaling, color tokens, and modal animations |
| `src/main.js` | Bootstrap script, dependency wiring, and initial scene activation |
| `src/core/Engine.js` | Deterministic 60 FPS loop, clamped delta-time, tab visibility pause/resume |
| `src/core/Input.js` | Unified input abstraction (keyboard, mouse, virtual touch controls) |
| `src/core/Audio.js` | 100% code-based procedural Web Audio API synthesizer |
| `src/core/State.js` | Scene base class and object-pooled particle system |
| `src/scenes/` | Discrete game scenes (`enter`, `exit`, `update`, `render`) |
| `src/entities/` | Game objects, state, behavior, and rendering |
| `src/utils/ObjectPool.js` | Generic object pool for zero-allocation GC optimization |
| `src/utils/math.js` | Vector math helpers (`lerp`, `clamp`, `distanceSq`, `angleBetween`) |
| `src/utils/Collision.js` | 2D collision tests (`circleVsCircle`, `rectVsRect`, `circleVsRect`) |

---

## 3. Game Loop & Rendering Rules

1. **Delta-Time (`dt`)**:
   - All motion and timers are scaled by `dt` (in seconds).
   - `Math.min(dt, 0.1)` guards against tunneling and spiral-of-death lag spikes.
2. **Virtual Resolution (Canvas Scaling)**:
   - Fixed internal coordinate space (default: 960x540 widescreen).
   - Canvas scales responsively while preserving aspect ratio (letterbox/pillarbox).
   - Mouse and touch screen coordinates must always be converted to virtual canvas coordinates via `engine.screenToVirtual(x, y)`.
3. **Object Pooling**:
   - Bullets, particles, and enemies are recycled in object pools to eliminate Garbage Collection stutter.
4. **Audio Autoplay**:
   - `AudioContext` is initialized or resumed on the first user interaction (`audio.init()`).
