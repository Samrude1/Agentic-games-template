# Game Design Document (GDD): {{GAME_TITLE}}

## 1. Overview
- **Title**: {{GAME_TITLE}}
- **Genre**: {{GENRE}} (e.g., Arcade / Precision Platformer / Top-down Shooter / Puzzle)
- **Target Platform**: Desktop (Web) & Mobile (Touch)
- **Tech Stack**: HTML5 Canvas, Vanilla JavaScript (ES Modules), Web Audio API
- **Audience & Theme**: {{THEME}}

---

## 2. Core Gameplay Loop
1. **Action**: Player maneuvers...
2. **Challenge**: Dodge / Collect / Destroy...
3. **Reward**: Score / Power-ups / Difficulty progression...
4. **Outcome**: High score leaderboard or stage victory.

---

## 3. Controls & Inputs
- **Keyboard**:
  - Movement: Arrow Keys / WASD
  - Primary Action (Jump / Shoot): Space
  - Secondary Action: Z / Shift
  - Pause: Esc / P
- **Mobile / Touch**:
  - Virtual D-pad / Joystick on the left
  - Action buttons (A / B) on the right
- **Mouse**: (If aiming or cursor-based game)

---

## 4. Visual Style & Sound
- **Resolution**: 960x540 (16:9 widescreen) virtual resolution with automatic aspect-ratio scaling.
- **Visuals**: {{VISUAL_STYLE}} (e.g., Neon Cyberpunk / Minimalist Vector / Retro Pixel Art).
- **Sound Effects**: Procedural Web Audio API (Laser, Jump, Hit, Explosion, Coin, Win).

---

## 5. Game Mechanics & Rules
- **Player Attributes**: Speed, health, abilities.
- **Enemies / Hazards**: Movement patterns, spawn behavior, collision reactions.
- **Win & Loss Conditions**:
  - Loss: Health depleted or timer expires.
  - Victory: Wave survived or target score reached.

---

## 6. Technical Architecture
- `src/core/Engine.js`: 60 FPS deterministic game loop & canvas scaling
- `src/core/Input.js`: Unified multi-input abstraction
- `src/core/Audio.js`: Procedural sound synthesis
- `src/scenes/`: Discrete scene management (Menu, Game, GameOver)
