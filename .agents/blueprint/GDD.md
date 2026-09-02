# Game Design Document (GDD.md)

This document is the official Game Design specification for the project. Update this file whenever rules, mechanics, entities, or victory conditions change.

---

## 1. Overview
- **Game Title**: [Title]
- **Genre**: [Genre, e.g., 2D Top-Down Shooter / Precision Platformer / Arcade]
- **Target Platform**: Desktop (Web) & Mobile (Touch)
- **Tech Stack**: HTML5 Canvas, Modern Vanilla JavaScript (ES Modules), Procedural Web Audio API
- **Visual Style & Theme**: [e.g., Neon Cyberpunk / Minimalist Vector / Retro Pixel Art]

---

## 2. Core Gameplay Loop
1. **Action**: Player maneuvers...
2. **Challenge**: Avoid obstacles, dodge hazards, destroy targets...
3. **Reward**: Gain points, collect power-ups, advance difficulty wave...
4. **Outcome**: High score leaderboard or stage victory.

---

## 3. Controls & Inputs
- **Keyboard**:
  - Movement: Arrow Keys / WASD
  - Primary Action (Shoot / Jump): Space
  - Secondary Action: Shift / Z
  - Pause: Escape / P
- **Touch / Mobile**:
  - Virtual on-screen D-pad on the left
  - Action buttons (A / B) on the right
- **Mouse**: (If crosshair aiming or click-to-move game)

---

## 4. Visuals & Audio
- **Resolution**: 960x540 (16:9 widescreen) virtual resolution, responsive aspect-ratio scaling.
- **Palette**: Synchronized with `STYLE_GUIDE.md`.
- **Sound Effects**: Procedural Web Audio API (Laser, Jump, Coin, Hit, Explosion, Victory).

---

## 5. Entities & Mechanics
- **Player**: Velocity, bounds clipping, collision radius, health.
- **Enemies / Hazards**: Behaviors, spawn timer, collision detection.
- **Win / Loss Conditions**:
  - Defeat: Health reaches 0 or timer runs out.
  - Victory: Wave completed or score threshold met.
