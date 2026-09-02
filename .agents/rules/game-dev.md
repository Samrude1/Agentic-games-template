# HTML5 Canvas / JavaScript Game Development Rules & Standards

These rules govern all game development and code generation in this repository. Any AI agent or developer must adhere to these principles when writing, refactoring, or optimizing code.

---

## 1. Architecture & Technology Stack
- **Platform**: Pure HTML5 Canvas (or DOM overlays where appropriate), Modern Vanilla JavaScript (ES Modules `type="module"`), Vanilla CSS.
- **Dependencies**: Avoid unnecessary or heavy third-party libraries (such as Phaser, Pixi, Lodash) unless explicitly requested. Lightweight math or physics helpers are allowed only when necessary.
- **Modularity**: Organize code into clear, single-responsibility modules:
  - `src/core/` (Game loop, input abstraction, audio synthesis, state management)
  - `src/scenes/` (Menus, gameplay scenes, game over screens)
  - `src/entities/` (Player, enemies, projectiles, items)
  - `src/utils/` (Vector math, collision checks, object pooling)

---

## 2. Game Loop & Timing
- Always use `requestAnimationFrame` for rendering and update synchronization.
- **Delta-Time (`dt`)**: All physics, movement, and animations must be scaled by `dt` (in seconds):
  ```javascript
  position.x += velocity.x * dt;
  ```
- **Clamp Delta-Time**: Always clamp the maximum `dt` (e.g., `Math.min(dt, 0.1)`) to prevent tunneling or game breaks when switching tabs or experiencing frame drops.
- Support fixed timestep accumulation (e.g., 60 Hz) if deterministic physics are required (e.g., precision platformers).

---

## 3. Responsive Canvas & Scaling
- **Internal Virtual Resolution**: Define an internal virtual coordinate resolution (e.g., 960x540 widescreen or 480x800 portrait).
- **Aspect Ratio Preservation**:
  - Canvas must scale via CSS or JS resize handler while maintaining the aspect ratio (letterbox / pillarbox).
  - Prevent blurry scaling: On high-DPI screens account for `window.devicePixelRatio`. For pixel-art games, set `imageSmoothingEnabled = false` and CSS `image-rendering: pixelated`.
- **Coordinate Translation**: Input coordinates (mouse / touch) must always be converted to internal virtual canvas coordinates via `engine.screenToVirtual(x, y)`.

---

## 4. Input Abstraction
- Unify keyboard, mouse, and mobile touch under a single `Input` class.
- **Mobile / Touch**: Every game must consider touch playability:
  - Simple games: tap-to-jump or drag-to-move.
  - Complex games: on-screen virtual D-pad / joystick and action buttons.
- Prevent default mobile browser gestures on the play area:
  - `touch-action: none;`
  - `user-select: none;`
  - Disable context menu (right click) on the canvas.

---

## 5. Procedural Audio (Web Audio API)
- Do not require external audio files (`.mp3`/`.wav`) for basic sound effects.
- Use code-based procedural synthesis (`AudioContext`, `OscillatorNode`, `GainNode`).
- **Autoplay Policy**: Initialize or resume `AudioContext` only upon the first user interaction (click / keypress).

---

## 6. Performance & Memory Management (Garbage Collection)
- **Object Pooling**: Use reusable object pools (`ObjectPool.js`) for short-lived, frequently spawned entities (particles, bullets, spark effects) to prevent Garbage Collection frame stutter.
- **Zero Allocations in Loop**: Never allocate new objects or arrays (`new Vector()`, `{}`, `[]`) inside `update()` or `render()` methods.

---

## 7. Visual Polish & "Juice"
- Games must feel responsive and alive:
  - Visual feedback for impacts (screen shake, flash effect, particle sparks).
  - Smooth animations and easing functions.
  - Clear, legible HUD and UI (score, health, state).

---

## 8. UI, Buttons & Style Consistency (Design System)
- All UI elements, modal overlays, buttons, and typography **must strictly follow `.agents/blueprint/STYLE_GUIDE.md`**.
- **No Ad-Hoc Styles**: Never create arbitrary buttons without `.btn-*` or `.touch-btn` classes.
- **No Hardcoded Hex Colors in CSS**: Reference CSS variables (`var(--primary)`, `var(--bg-color)`).
- **No Inline Styles**: Avoid inline `style="..."` or direct JS element styling (`elem.style.color = ...`). Use CSS classes.
- **Canvas Color Synchronization**: Colors drawn directly on canvas should match the hex tokens defined in `STYLE_GUIDE.md`.
