# UI & Visual Style Guide: {{GAME_TITLE}}

> **Status**: Official UI Single Source of Truth  
> **Linter**: Enforced via `npm run lint:style` (`scripts/check-style.js`)  

---

## 1. Color Palette Tokens (`:root`)

All interface styles and canvas rendering routines must strictly reference these tokens:

```css
:root {
  --bg-color: #0b0f19;
  --panel-bg: rgba(15, 23, 42, 0.85);
  --primary: #38bdf8;
  --primary-hover: #0ea5e9;
  --accent: #f43f5e;
  --warning: #f59e0b;
  --success: #10b981;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
}
```

---

## 2. Typography

- **Font Family**: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif.
- **Sizes**:
  - Headings (`h1`): `1.75rem` to `2rem`, bold (`700`), letter-spacing `-0.025em`.
  - Body / Subtitles: `0.9rem` to `1rem`, color `var(--text-muted)`.
  - Buttons: `1rem`, font-weight `600`.

---

## 3. Standard UI Components & Button Classes

To prevent CSS drift and pass `npm run lint:style`, all buttons must use standard classes:

| Class | Appearance | Usage |
| :--- | :--- | :--- |
| `.btn-primary` | Solid `--primary` background, white text | Main actions (Start, Play Again, Resume) |
| `.btn-secondary` | Translucent background, border, `--text-muted` | Secondary actions (Audio toggle, Settings, Quit) |
| `.touch-btn` | Circular semi-transparent touch button | Virtual mobile touch controls (D-pad, Action A/B) |

---

## 4. Canvas Coordinate & Scaling Rules

- **Virtual Canvas**: `960x540` (16:9).
- **Letterboxing**: Viewport scales to fit screen while maintaining 16:9 ratio via CSS letterboxing.
- **Input Coordinate Mapping**: Use `engine.screenToVirtual(clientX, clientY)` to translate clicks/touches accurately.
