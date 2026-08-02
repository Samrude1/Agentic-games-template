# Architecture Context

## Stack

| Layer     | Technology                  | Role   |
| --------- | --------------------------- | ------ |
| Rendering | HTML5 `<canvas>`            | Draws the game world and entities |
| Logic     | Vanilla JavaScript (ES6)    | Game loop, physics, input, entities |
| UI/Menus  | Vanilla HTML/CSS            | HUD, Pause Menu, Main Menu overlays |
| Audio     | Web Audio API / HTML Audio  | Sound effects and background music |

## Core Systems

- `Game Loop` — The beating heart of the game, utilizing `requestAnimationFrame`. Calculates `deltaTime`, calls `update()` on all entities, and then `draw()` on the canvas.
- `InputManager` — Listens for `keydown`/`keyup` or mouse events and maps them to boolean flags (e.g., `keys.ArrowUp = true`).
- `EntityManager` (or Scene) — An array/collection holding all active game objects. Responsible for iterating over them and removing dead entities.
- `CollisionSystem` — A system for AABB (Axis-Aligned Bounding Box) or circular collision detection between entities.

## State Management

- **GameState**: High-level state of the game (e.g., `START_MENU`, `PLAYING`, `PAUSED`, `GAME_OVER`).
- **Entity State**: Individual state variables for entities (e.g., `isJumping`, `health`, `x`, `y`, `velocityX`, `velocityY`).

## Invariants

1. **Separation of Update and Draw**: The `draw(ctx)` method must NEVER mutate the state of the entity (e.g., do not update `x` or `y` inside `draw`). Only `update(deltaTime)` should mutate state.
2. **Delta Time Dependence**: All movement and physics must be multiplied by `deltaTime` to ensure consistent speed regardless of the player's monitor refresh rate (60Hz vs 144Hz).
3. **No Garbage Collection Pauses**: Avoid creating new objects (using `new` or returning `{}`) inside the `update` or `draw` loops every frame. Reuse objects or use object pools where possible.
