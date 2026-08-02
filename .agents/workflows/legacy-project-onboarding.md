---
slash_command: /onboard
description: "Map an existing game project and initialize the .agents folder for AI-assisted development."
trigger_phrases:
  - "analyze this project"
  - "map the codebase"
  - "onboard to this game"
  - "initialize the agents folder"
when_not_to_use: "Use /init for brand new, empty projects that haven't been built yet."
---

# Legacy Game Project Onboarding

> **Purpose**: Take an existing, undocumented game project and reverse-engineer its architecture, game loop, and asset structure to populate the `.agents/context/` files.
> **Activates when**: User asks to "analyze this project", "map the codebase", or "onboard to this game".
> **Avoid when**: Starting a brand new game from the template (use `/init` instead).

---

## Step 1: Scan the Architecture

**Goal**: Understand the game's core structure and rendering engine.

- [ ] Find the main entry point (e.g., `main.js`, `game.py`, `index.html`).
- [ ] Identify the Game Loop (where `update` and `draw` are called repeatedly).
- [ ] Identify the rendering technology (e.g., Canvas 2D API, Pygame Surfaces). Note: Unity/Godot/Unreal are not supported by this template.
- [ ] Identify how inputs (keyboard/mouse) are handled.

**Output**: Internal understanding of the game's architecture.

---

## Step 2: Map the Entities and Assets

**Goal**: Understand what currently exists in the game.

- [ ] Scan for existing entity classes (Player, Enemy, Item).
- [ ] Identify how collisions are currently handled.
- [ ] Locate the assets folder (images, sounds, maps) and understand the loading strategy.
- [ ] ⏸ **Stop. Present a summary of your findings to the user and wait for confirmation before writing context files.**

**Output**: Summary presented to the user.

---

## Step 3: Populate Context Files

**Goal**: Establish the Ground Truth for future AI sessions.

- [ ] Create/Update `architecture.md` detailing the game loop and rendering strategy.
- [ ] Create/Update `game-asset-registry.md` listing the core entities and loaded sprites.
- [ ] Create/Update `project-overview.md` with the perceived goal of the game.

**Output**: Fully populated `.agents/context/` directory.

---

## Step 4: Close the Loop

- Ask the user: *"Onboarding complete. The context files are populated. What is the first new feature or bug fix we should tackle?"*

---

## ⚠️ Anti-Patterns — Never Do These

- ❌ **Do not rewrite existing code during onboarding.** This workflow is strictly for mapping and understanding, not refactoring.
- ❌ **Do not hallucinate mechanics.** If you can't find an inventory system, don't invent one in the documentation. Document only what exists.

---

## 📎 Context Links

- [architecture.md](../context/architecture.md)
- [project-overview.md](../context/project-overview.md)
- [game-asset-registry.md](../context/game-asset-registry.md)
