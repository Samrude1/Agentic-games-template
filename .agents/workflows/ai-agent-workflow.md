---
slash_command: /ai-agent
description: "Design and implement a new AI behavior or NPC logic within the game loop."
trigger_phrases:
  - "add new enemy AI"
  - "create NPC behavior"
  - "add a bot"
  - "implement pathfinding"
when_not_to_use: "Use /game-entity if adding a static entity or simple projectile without complex decision-making logic."
---

# AI Agent & NPC Workflow

> **Purpose**: Design and integrate complex AI behaviors (e.g., pathfinding, state machines, decision trees) for NPCs or enemies without degrading the game loop performance.
> **Activates when**: User asks to "add new enemy AI", "create NPC behavior", or "implement pathfinding".
> **Avoid when**: Adding a simple entity with linear movement (use `/game-entity` instead).

---

## Prerequisites

Before planning AI behavior, read these files:

- [ ] [`architecture.md`](../context/architecture.md) — Verify how the main game loop and `update(deltaTime)` handle heavy computations.
- [ ] [`game-asset-registry.md`](../context/game-asset-registry.md) — Check for existing sprites/animations for this NPC.

---

## Step 1: Architect the Behavior (`/architect`)

**Goal**: Define the state machine or decision logic before writing code.

- [ ] **Identify the states**: Idle, Patrol, Chase, Attack, Flee, etc.
- [ ] **Define transitions**: What triggers a state change? (e.g., player in range, health low).
- [ ] **Performance check**: Ensure the AI logic (like A* pathfinding) will not block the main rendering thread. Propose optimizations if needed (e.g., frame-slicing or pre-computed paths).
- [ ] ⏸ **Stop. Present the implementation plan to the user and wait for explicit approval.**

**Output**: Approved `implementation_plan.md` artifact outlining the NPC's state machine.

---

## Step 2: Develop

**Goal**: Implement the behavior within the game's strict engine-less architecture.

- [ ] Implement the AI class extending the base entity class.
- [ ] Hook the AI's `update()` method into the main game loop.
- [ ] Ensure all rendering is handled properly in the `draw()` method.
- [ ] Log state changes conditionally to allow debugging without spamming the console.

**Output**: Working NPC behavior integrated into the game.

---

## Step 3: Review (`/review`)

**Goal**: Verify the AI behaves as expected and performance remains stable.

- [ ] Does the NPC transition between states correctly?
- [ ] Does it maintain a stable 60 FPS (or target framerate) when multiple instances are spawned?
- [ ] Are edge cases (like the player disappearing) handled gracefully?
- Output findings to a `walkthrough.md` artifact.

**Output**: `walkthrough.md` artifact.

---

## Step 4: Close the Loop

- Update `architecture.md` if a new AI pattern (like a behavior tree system) was introduced.
- Ask the user: *"NPC logic is implemented. Do you want me to add a debug toggle to visualize its pathfinding/state? "*

---

## ⚠️ Anti-Patterns — Never Do These

- ❌ **Do not use external game engines.** (Unity, Godot, etc. are forbidden). Implement logic in native JS/Python.
- ❌ **Never run heavy pathfinding synchronously on every frame.** Throttle AI updates or compute paths asynchronously so the game doesn't stutter.
- ❌ **Do not hardcode Magic Numbers.** Speed, aggro range, and attack damage must be configurable properties, not buried in `if` statements.

---

## 📎 Context Links

- [architecture.md](../context/architecture.md)
- [project-overview.md](../context/project-overview.md)
- [game-asset-registry.md](../context/game-asset-registry.md)
