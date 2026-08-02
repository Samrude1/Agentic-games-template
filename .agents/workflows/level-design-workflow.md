---
slash_command: /level-design
description: "Create or modify level data, tilemaps, and entity spawn configurations."
trigger_phrases:
  - "create a new level"
  - "add a map"
  - "modify the tilemap"
  - "build stage 2"
when_not_to_use: "Use /game-entity when creating the behavior of the things inside the level, rather than the level layout itself."
---

# Level Design Workflow

> **Purpose**: Standardize the creation and modification of game levels, ensuring tilemaps load correctly and entities spawn at the right coordinates.
> **Activates when**: User asks to "create a new level", "add a map", or "modify the tilemap".
> **Avoid when**: Creating the actual entity logic (use `/game-entity` instead).

---

## Prerequisites

Before designing a level, verify the level parsing logic:

- [ ] [`architecture.md`](../context/architecture.md) — Understand how the game loads levels (e.g., 2D Arrays, Tiled JSON, Text strings).
- [ ] [`game-asset-registry.md`](../context/game-asset-registry.md) — Identify which tilesets or sprites are available for the environment.

---

## Step 1: Architect the Level (`/architect`)

**Goal**: Plan the layout and dimensions before writing data structures.

- [ ] **Define Dimensions**: How wide and tall is the level in tiles/pixels?
- [ ] **Plan the Layout**: Where are the walls, platforms, hazards, and the exit?
- [ ] **Spawn Points**: Where does the player start? Where do enemies spawn?
- [ ] ⏸ **Stop. Present the implementation plan (including a rough ascii representation of the map if applicable) and wait for approval.**

**Output**: Approved `implementation_plan.md` artifact.

---

## Step 2: Develop

**Goal**: Implement the level data and integrate it into the game loader.

- [ ] Create the level data structure (e.g., a 2D array or JSON file).
- [ ] Hook the new level into the game's level manager or progression system.
- [ ] Ensure the level parser correctly instantiates the terrain and entities.

**Output**: Working level loaded into the game.

---

## Step 3: Review (`/review`)

**Goal**: Verify the level is playable and technically sound.

- [ ] Does the level load without crashing?
- [ ] Do collisions work correctly against all newly placed terrain?
- [ ] Are all spawn points valid (nobody spawns inside a wall)?
- Output findings to a `walkthrough.md` artifact.

**Output**: `walkthrough.md` artifact.

---

## Step 4: Close the Loop

- Update `game-asset-registry.md` with the new level metadata if necessary.
- Ask the user: *"Level loaded. Shall we adjust the enemy placements or tweak the platform jumps?"*

---

## ⚠️ Anti-Patterns — Never Do These

- ❌ **Do not use external game engines.** Levels must be loaded via native JS arrays/JSON or Python lists, not Unity Scenes.
- ❌ **Never hardcode level data directly into the Game Loop class.** Level data must be separated from engine logic.
- ❌ **Never ignore camera bounds.** Ensure the camera clamps correctly to the new level dimensions.

---

## 📎 Context Links

- [architecture.md](../context/architecture.md)
- [project-overview.md](../context/project-overview.md)
- [game-asset-registry.md](../context/game-asset-registry.md)
