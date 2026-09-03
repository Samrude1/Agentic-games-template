---
name: game-init
description: >-
  Initializes a new HTML5/Canvas/JS game project to studio quality standards.
  Use this skill whenever the user requests to start a new game, runs /init, or asks to scaffold a project.
  Includes an interactive 8-question Grill-Me interview, full game documentation suite, and complete 60 FPS scaffolding.
---

# Game Init Skill (Studio Edition)

This skill guides the initialization and scaffolding of a studio-grade HTML5 Canvas / JavaScript game project. It ensures a comprehensive documentation suite (GDD, Art Bible, Audio Spec, Level Design & Economy, QA Plan, Marketing One-Pager) and robust architecture are locked in before code generation begins, adhering to strict 60 FPS zero-allocation standards.

---

## Workflow Steps

### Step 1: Initial Concept Check
Inspect if a game design or description already exists in the project or prompt:
1. Look for: `docs/GDD.md`, `game_design.md`, `README.md`, or pitch notes.
2. If the user provided a detailed concept, proceed directly to **Step 3**.
3. If the concept is missing or ambiguous, proceed to **Step 2 (Grill-Me)**.

---

### Step 2: Studio Grill-Me Interview (If Needed)
Do not guess mechanics. Enter interactive interview mode and present 8 focused questions to establish studio-grade clarity:

1. **Genre & Core Gameplay Loop**:
   - *What kind of game is this? (e.g., Roguelite arcade, precision platformer, top-down arena shooter, physics puzzle?)*
2. **Controls & Platform Targets**:
   - *How is it controlled? (Keyboard WASD, Mouse aiming, virtual mobile D-pad, or Gamepad?)*
3. **Visual Style & Art Direction**:
   - *What is the visual theme? (Neon Vector / Cyberpunk, Retro 8-bit Pixel Art, Minimalist Vector, Sci-Fi Clean?)*
4. **Win / Loss & Scoring Conditions**:
   - *How do players score and when does the game end? (Lives, timer, wave survival, combo multiplier?)*
5. **Pacing & Difficulty Scaling**:
   - *How does the challenge escalate? (Linear spawn rate, wave-based tiers, boss encounters, adaptive pacing?)*
6. **Juice & Game Feel Feedback**:
   - *What audiovisual feedback is needed? (Trauma screen shake, particle bursts, damage flashes, freeze-frames?)*
7. **Progression & Meta-Loop**:
   - *What persists across runs? (Local high score leaderboard, unlockable abilities, achievement stats?)*
8. **Art & Asset Pipeline**:
   - *Will the game use 100% procedural geometric canvas rendering or load spritesheets / image assets?*

*Wait for user response before generating code.*

---

### Step 3: Generate Studio Documentation Suite (.agents/blueprint/ & docs/)
Once the concept is aligned, generate the full documentation suite:
1. `.agents/blueprint/GDD.md` <- [resources/docs/GDD_COMPREHENSIVE.md](./resources/docs/GDD_COMPREHENSIVE.md)
2. `.agents/blueprint/ARCHITECTURE.md` (Technical architecture, scene state machine, memory budget)
3. `.agents/blueprint/STYLE_GUIDE.md` (Design tokens, CSS classes, canvas palette synchronization)
4. `docs/ART_BIBLE.md` <- [resources/docs/ART_BIBLE.md](./resources/docs/ART_BIBLE.md)
5. `docs/AUDIO_SPEC.md` <- [resources/docs/AUDIO_SPEC.md](./resources/docs/AUDIO_SPEC.md)
6. `docs/LEVEL_DESIGN.md` <- [resources/docs/LEVEL_DESIGN.md](./resources/docs/LEVEL_DESIGN.md)
7. `docs/QA_PLAN.md` <- [resources/docs/QA_PLAN.md](./resources/docs/QA_PLAN.md)
8. `docs/MARKETING_ONE_PAGER.md` <- [resources/docs/MARKETING_ONE_PAGER.md](./resources/docs/MARKETING_ONE_PAGER.md)
9. `.agents/blueprint/PROJECT_STATUS.md` (Status, feature matrix, roadmap)

---

### Step 4: Scaffold the Game Boilerplate
Copy and customize the template files to the project root:
1. `index.html` <- [resources/index.html](./resources/index.html)
2. `style.css` <- [resources/style.css](./resources/style.css)
3. `src/main.js` <- [resources/src/main.js](./resources/src/main.js)
4. **Core Modules**:
   - `src/core/Engine.js` (60 FPS loop, auto postUpdate, clamped dt, visibilitychange)
   - `src/core/Input.js` (Keyboard, mouse, mobile touch D-pad & action buttons)
   - `src/core/Audio.js` (Procedural Web Audio API sound generator)
   - `src/core/State.js` (Scene base class, ParticleEmitter with ObjectPool)
5. **Scenes**:
   - `src/scenes/MenuScene.js` (Start menu, high scores, audio toggle)
   - `src/scenes/GameScene.js` (Core game loop, player, targets, screen shake juice)
   - `src/scenes/GameOverScene.js` (Results, new high score check, restart)
6. **Entities**:
   - `src/entities/Entity.js` (Pooled entity base class: pos, vel, active, render, reset)
7. **Utilities**:
   - `src/utils/SaveManager.js` (Safe localStorage wrapper with high score persistence)
   - `src/utils/ScreenShake.js` (Trauma-based camera screen shake)
   - `src/utils/Camera.js` (2D smooth tracking camera with bounds clamping)
   - `src/utils/Timer.js` (Zero-allocation cooldowns and delay timers)
   - `src/utils/ObjectPool.js` (Zero-allocation GC recycling)
   - `src/utils/math.js` (Optimized 2D vector math helpers)
   - `src/utils/Collision.js` (High-performance circle and AABB rectangle checks)
   - `src/utils/AssetLoader.js` & `src/utils/SpriteSheet.js` (Sprite & asset handling)

---

### Step 5: Verification and Launch
1. Run `npm test` to verify all unit tests pass.
2. Ensure the game boots cleanly with zero console errors.
3. Test controls across MenuScene -> GameScene -> GameOverScene.
4. Deliver an executive kick-off summary to the solo developer.
