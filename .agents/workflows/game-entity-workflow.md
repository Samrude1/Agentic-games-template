---
slash_command: /game-entity
description: "Create a new in-game object (e.g., enemy, item, platform) and integrate it into the game loop."
trigger_phrases:
  - "add an enemy"
  - "create a new item"
  - "add a moving platform"
  - "build a projectile"
when_not_to_use: "Use /ai-agent if the entity requires complex decision-making, pathfinding, or state machines."
---

# Game Entity Workflow

> **Purpose**: Standardize the creation of simple in-game objects (entities) ensuring they follow the engine's update/draw loop and maintain performance.
> **Activates when**: User asks to "add an enemy", "create an item", or "add a platform".
> **Avoid when**: The entity requires complex AI or pathfinding (use `/ai-agent` instead).

---

## Prerequisites

Before building an entity, verify the existing patterns:

- [ ] [`architecture.md`](../context/architecture.md) — Ensure you understand the BaseEntity structure and how entities are stored (e.g., in an `EntityManager`).
- [ ] [`game-asset-registry.md`](../context/game-asset-registry.md) — Identify if sprites/assets already exist for this entity or if placeholders are needed.

---

## Step 1: Architect the Entity (`/architect`)

**Goal**: Define the entity's properties and behavior before writing code.

- [ ] **Define Physics**: Hitbox dimensions, velocity, gravity multiplier.
- [ ] **Define Behavior**: What happens in `update(deltaTime)`? (e.g., simple linear movement, sine wave floating).
- [ ] **Define Visuals**: What happens in `draw(ctx)`? (e.g., sprite rendering, primitive shapes).
- [ ] ⏸ **Stop. Present the implementation plan to the user and wait for explicit approval.**

**Output**: Approved `implementation_plan.md` artifact.

---

## Step 2: Develop

**Goal**: Implement the entity class and register it properly.

- [ ] Create the entity class extending the standard BaseEntity.
- [ ] Implement `update()` and `draw()` methods.
- [ ] Hook the entity into the collision detection system.
- [ ] Register it with the central `EntityManager` or spawner.

**Output**: Working entity integrated into the game.

---

## Step 3: Review (`/review`)

**Goal**: Verify the entity functions correctly within the physics engine.

- [ ] Does the entity render at the correct coordinates?
- [ ] Do collisions trigger properly against the player or terrain?
- [ ] Is it cleaned up (garbage collected/pooled) when it goes off-screen or is destroyed?
- Output findings to a `walkthrough.md` artifact.

**Output**: `walkthrough.md` artifact.

---

## Step 4: Close the Loop

- **If this entity introduces a new pattern** (e.g., the first homing projectile): Update `game-asset-registry.md` with the new pattern.
- Ask the user: *"Entity created and rendering. Shall we tweak the movement speed or hitbox size?"*

---

## ⚠️ Anti-Patterns — Never Do These

- ❌ **Do not use external game engines.** (No Unity, Godot, etc.). Built native JS/Python logic.
- ❌ **Never forget entity cleanup.** Entities that move off-screen and are never destroyed will cause massive memory leaks and crash the game.
- ❌ **Never hardcode image paths directly in the draw loop.** Pre-load assets during initialization.

---

## 📎 Context Links

- [architecture.md](../context/architecture.md)
- [project-overview.md](../context/project-overview.md)
- [game-asset-registry.md](../context/game-asset-registry.md)
