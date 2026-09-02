# Style Guide & Design System (STYLE_GUIDE.md)

This document is the official Single Source of Truth for the game's UI design, typography, and visual tokens. All developers and AI agents must follow these definitions. Ad-hoc styles, arbitrary hex codes, or unstyled buttons are strictly prohibited without updating this guide.

---

## 1. Color System (CSS Custom Properties)

All colors and visual effects are defined in `:root` inside `style.css`:

```css
:root {
  /* Backgrounds & Panels */
  --bg-color: #0b0f19;                    /* Canvas and page background */
  --panel-bg: rgba(15, 23, 42, 0.85);     /* Modal dialogs and panel backgrounds */
  --overlay-bg: rgba(11, 15, 25, 0.85);   /* Darkened backdrop for overlays */
  --border-color: rgba(255, 255, 255, 0.1);/* Subtle boundary borders */

  /* Brand & Action Colors */
  --primary: #38bdf8;                     /* Primary action / Player color (Cyan/Sky) */
  --primary-hover: #0ea5e9;               /* Primary hover state */
  --secondary: #64748b;                   /* Secondary color (Slate) */
  --secondary-hover: #475569;             /* Secondary hover state */
  --accent: #f43f5e;                      /* Accent / Danger / Enemy (Rose) */
  --success: #10b981;                     /* Success / Pickup / Green (Emerald) */
  --warning: #f59e0b;                     /* Warning / Bonus / Gold (Amber) */

  /* Typography */
  --text-main: #f8fafc;                   /* Primary text (Light) */
  --text-muted: #94a3b8;                  /* Secondary / dimmed text */

  /* Radii & Shadows */
  --radius-sm: 0.375rem;                  /* 6px for small badges/chips */
  --radius-md: 0.5rem;                    /* 8px for standard buttons */
  --radius-lg: 1rem;                      /* 16px for modals and cards */
  --shadow-box: 0 10px 30px rgba(0, 0, 0, 0.7);
  --shadow-glow: 0 4px 15px rgba(56, 189, 248, 0.4);
}
```

---

## 2. Typography

- **Font Family**: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` (or pixel font if specified).
- **Headings (H1 - H3)**:
  - `H1`: 2.2rem, bold (800), linear gradient (`linear-gradient(135deg, var(--primary) 0%, #818cf8 100%)`).
  - `H2`: 1.5rem, bold (700), color `--text-main`.
  - `H3`: 1.2rem, semi-bold (600), color `--text-muted`.
- **Body Text**: 1rem, color `--text-muted`, line-height 1.5.
- **HUD & Scoreboard**: Monospace or clean sans-serif with high contrast against the game background.

---

## 3. Button Component Library

All game buttons must use one of the standard classes:

### A. Primary Action (`.btn-primary`)
Game start, confirm, restart:
```css
.btn-primary {
  background: linear-gradient(135deg, var(--primary) 0%, #2563eb 100%);
  color: #fff;
  border: none;
  padding: 0.9rem 2rem;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: var(--radius-md);
  cursor: pointer;
  box-shadow: var(--shadow-glow);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(56, 189, 248, 0.6);
}
.btn-primary:active {
  transform: translateY(1px);
}
```

### B. Secondary Action (`.btn-secondary`)
Settings, back, pause menu options:
```css
.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-main);
  border: 1px solid var(--border-color);
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background 0.15s ease, transform 0.15s ease;
}
.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}
```

### C. Mobile Touch Buttons (`.touch-btn`)
On-screen virtual controls:
- Semi-transparent backdrop (`backdrop-filter: blur(4px)`), circular shape (`border-radius: 50%`).
- Active feedback: scale down (`scale(0.92)`) and highlight.

---

## 4. Modals and Overlays

- **Backdrop**: `.overlay` - `position: absolute; inset: 0; backdrop-filter: blur(8px);`
- **Container**: `.overlay-content`
  - Background: `var(--panel-bg)`
  - Border: `1px solid var(--border-color)`
  - Radius: `var(--radius-lg)`
  - Animation: `animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);`

---

## 5. Coding Rules of Thumb

1. **Never Hardcode Hex Values in CSS**: Always reference `var(--primary)`, `var(--bg-color)`, etc.
2. **No Inline Styles on Buttons**.
3. **Canvas Color Synchronization**: When drawing directly on canvas, use matching tokens:
   - Player: `#38bdf8` (`--primary`)
   - Enemies / Hazards: `#f43f5e` (`--accent`)
   - Collectibles / Bonus: `#f59e0b` (`--warning`) or `#10b981` (`--success`)
   - Alternatively read directly at runtime via `getComputedStyle(document.documentElement).getPropertyValue('--primary')`.
