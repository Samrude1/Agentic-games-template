# Art Bible & Visual Design Guidelines: {{GAME_TITLE}}

> **Project**: {{GAME_TITLE}}  
> **Visual Identity**: {{VISUAL_THEME}} (e.g., Neon Vector / Retro 8-bit Pixel Art / Cyberpunk Minimalist)  
> **Status**: Official Visual Single Source of Truth  

---

## 1. Visual Pillars & Aesthetic Target

1. **High Contrast & Immediate Legibility**:
   - Player, interactive hazards, and background must have distinct contrast ratios.
   - Gameplay elements must never blend into background effects.
2. **Juice & Punchy Visual Feedback**:
   - Every impact generates particle bursts, trauma screen shake, or flash frames.
3. **Harmonious Palette**:
   - Maximum 4 primary colors in play at once to prevent visual noise.

---

## 2. Color Palette & Canvas Tokens

Synchronized directly with `STYLE_GUIDE.md` and `:root` CSS variables:

| Token | Hex Value | Semantic Usage |
| :--- | :--- | :--- |
| `--bg-color` | `#0b0f19` | Canvas clear color, outer viewport letterbox background |
| `--panel-bg` | `rgba(15, 23, 42, 0.85)` | UI cards, pause menu, game over container |
| `--primary` | `#38bdf8` | Player body, allied projectiles, primary action buttons |
| `--primary-hover` | `#0ea5e9` | Hover states, player trail glow |
| `--accent` | `#f43f5e` | Hostile enemies, lethal hazards, damage flashes |
| `--warning` | `#f59e0b` | Collectibles, bonus gems, score multipliers |
| `--success` | `#10b981` | Health pickups, victory fanfares, FPS counter |
| `--text-main` | `#f8fafc` | Primary typography, high-contrast scoreboards |
| `--text-muted` | `#94a3b8` | Subtitles, button secondary text, instructions |

---

## 3. Resolution & Pixel Grid Standards

- **Virtual Resolution**: `960 x 540` (16:9 widescreen).
- **Pixel Art Rules (If Applicable)**:
  - Base tile size: `16x16` or `32x32`.
  - `ctx.imageSmoothingEnabled = false` (enforced via `Engine.js`).
  - CSS rendering: `image-rendering: pixelated;`.
- **Vector / Procedural Geometry Rules (If Applicable)**:
  - Antialiased rendering (`ctx.imageSmoothingEnabled = true`).
  - Glow effects: `ctx.shadowBlur = 10` to `15` using matching palette token.

---

## 4. Animation Principles

| Entity | State | Animation / Visual Feedback |
| :--- | :--- | :--- |
| **Player** | Idle | Subtle breathing pulse (`Math.sin(time * 3) * 1.5px`) |
| **Player** | Moving | Directional squish/stretch (`sx: 1.1, sy: 0.9`) + trail particles |
| **Player** | Damaged | Flash white for `0.1s`, rapid opacity blink (`Math.floor(time * 20) % 2 === 0`) |
| **Enemy** | Spawn | Pop-in scale from `0.1` to `1.0` over `0.25s` |
| **Collectibles**| Idle | Float bobbing + subtle rotational drift |
| **Impacts** | Destroyed | Radial explosion of 12–25 square/circle particles from pool |

---

## 5. UI & Typography Hierarchy

- **Font Family**: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` (or custom 8-bit monospace pixel font).
- **H1 (Game Title / Game Over)**: `2.2rem`, bold (800), linear gradient sky-to-indigo.
- **HUD Numbers (Score / Wave)**: Monospace, `20px` bold, top-left pinned with shadow offset.
- **Touch Controls**: Semi-transparent round badges (`rgba(255,255,255,0.15)`), active scale feedback (`scale(0.92)`).
