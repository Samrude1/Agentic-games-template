# Game Entity Workflow

Use this workflow when creating or modifying in-game entities (e.g. ships, projectiles, particle systems, obstacles, or HUD overlays).

---

## 1. Architect Phase (`/architect` or `/grill-me`)
- Plan entity parameters (hitboxes, health, dimensions, movement vectors) based on `game-design-context.md`.
- Define how `update(deltaTime)` and `draw(ctx)` methods operate independently.
- Produce `implementation_plan.md` artifact for approval.

## 2. Develop Phase
- Create the entity class using ES6 syntax.
- Integrate into entity manager / main game loop.
- Use object pooling if the entity is instantiated frequently (e.g., particles, missiles, explosions).

## 3. Verify Phase (`/review`)
- **Empirical Check**: Validate collision bounds, grid alignments, and state transitions using automated tests (`/test`) or manual validation routines.
- Ensure no garbage collection allocations occur inside `draw()` or `update()`.
- Log review notes in `walkthrough.md`.

## 4. Imprint Phase (`/imprint`)
- Register the new entity parameters (dimensions, spacing, health, color tokens) in `game-registry.md` to enforce project-wide entity consistency.
