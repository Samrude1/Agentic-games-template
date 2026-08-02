# Code Standards

## Principles

1. **Simplicity over Complexity**: We are using Vanilla JS. Do not over-engineer with excessive patterns. Simple ES6 classes are often enough.
2. **Performance First**: The game runs at 60 FPS (or higher). Every frame is ~16ms. Code inside `update()` and `draw()` must be fast.
3. **Readable Math**: Physics and collision math can get complex. Abstract complex formulas into readable helper functions or clearly comment what the math does.

## Rules

- **Object Pooling**: If the game spawns many transient objects (like bullets or particles), do not create and destroy them every frame. Create a pool of objects and toggle their `active` state.
- **`requestAnimationFrame`**: Always use `requestAnimationFrame` for the game loop, never `setInterval` or `setTimeout`.
- **Canvas Context Restores**: When applying transformations (scale, rotate, translate) to the canvas `ctx`, ALWAYS use `ctx.save()` before and `ctx.restore()` after to avoid affecting other entities.
- **Delta Time (`dt`)**: Every update method must take `dt` (in seconds or milliseconds, be consistent).
    ```javascript
    // YES
    this.x += this.speed * dt;
    
    // NO
    this.x += this.speed;
    ```
- **File Structure**: Each major Game Entity (e.g., Player, Enemy) or System (e.g., InputManager) should have its own `.js` file to keep things organized.

## Naming Conventions

- **Classes**: PascalCase (`class Player`, `class InputHandler`).
- **Methods/Variables**: camelCase (`update`, `draw`, `health`, `maxSpeed`).
- **Constants**: UPPER_SNAKE_CASE (`const GRAVITY = 9.8`, `const MAX_ENEMIES = 50`).
