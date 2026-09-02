---
name: game-init
description: >-
  Initializes a new HTML5/Canvas/JS game project. Use this skill whenever the user
  requests to start a new game, runs /init, or asks to scaffold a project.
  Includes an interactive 4-question Grill-Me interview and complete game scaffolding.
---

# Game Init Skill

This skill guides the initialization and scaffolding of a new HTML5/Canvas/JS game project. It ensures a clear Game Design Document (GDD) and architecture blueprint are locked in before code generation begins, adhering to strict 60 FPS performance standards.

---

## Workflow Steps

### Step 1: Initial Concept Check
Inspect if a game design or description already exists in the project or prompt:
1. Look for: `docs/GDD.md`, `game_design.md`, `README.md`, or pitch notes.
2. If the user provided a detailed concept, proceed directly to **Step 3**.
3. If the concept is missing or ambiguous, proceed to **Step 2 (Grill-Me)**.

---

### Step 2: Grill-Me Interview (If Needed)
Do not guess mechanics. Enter interactive interview mode and present 4 focused questions:

1. **Genre & Core Loop**:
   - *What kind of game is this? (e.g., Flappy Bird clone, Asteroids space shooter, top-down arena survival, physics puzzle?)*
2. **Controls & Target Devices**:
   - *How is it controlled? (Keyboard, Mouse/Touch, or virtual mobile D-pad?)*
3. **Visual Style & Theme**:
   - *What is the visual theme? (e.g., Neon Glow / Cyberpunk, Retro 8-bit Pixel Art, Minimalist Vector, Sci-Fi Clean?)*
4. **Win / Loss Conditions**:
   - *How do players score and when does the game end? (e.g., 3 lives, time limit, wave-based survival?)*

*Wait for user response before generating code.*

---

### Step 3: Generate Blueprint & GDD (.agents/blueprint/)
Once the concept is aligned:
1. Create or update `.agents/blueprint/GDD.md` (Game Design Document, rules, mechanics).
2. Create or update `.agents/blueprint/ARCHITECTURE.md` (technical architecture, file layout).
3. Create or update `.agents/blueprint/PROJECT_STATUS.md` (status, feature matrix, roadmap).

---

### Step 4: Scaffold the Game Boilerplate
Copy and customize the template files to the project root:
1. `index.html` <- [resources/index.html](./resources/index.html)
   - Update game title and UI overlay text.
2. `style.css` <- [resources/style.css](./resources/style.css)
   - Adjust theme color tokens.
3. `src/core/Engine.js` <- [resources/src/core/Engine.js](./resources/src/core/Engine.js)
4. `src/core/Input.js` <- [resources/src/core/Input.js](./resources/src/core/Input.js)
5. `src/core/Audio.js` <- [resources/src/core/Audio.js](./resources/src/core/Audio.js)
6. `src/core/State.js` <- [resources/src/core/State.js](./resources/src/core/State.js)
7. `src/utils/ObjectPool.js` <- [resources/src/utils/ObjectPool.js](./resources/src/utils/ObjectPool.js)
8. `src/utils/math.js` <- [resources/src/utils/math.js](./resources/src/utils/math.js)
9. `src/utils/Collision.js` <- [resources/src/utils/Collision.js](./resources/src/utils/Collision.js)
10. `src/scenes/GameScene.js` <- [resources/src/scenes/GameScene.js](./resources/src/scenes/GameScene.js)
    - Customize entities, objects, and mechanics according to `.agents/blueprint/GDD.md`.
11. `src/main.js` <- [resources/src/main.js](./resources/src/main.js)

---

### Step 5: Verification and Launch
1. Ensure the game launches without console errors.
2. Test basic controls (movement, audio triggers, touch overlays).
3. Give the developer a concise kick-off summary and propose the first feature sprint.
