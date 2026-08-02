---
slash_command: /new-feature
description: "Plan, build, review, and document a major new game mechanic or system."
trigger_phrases:
  - "build new feature"
  - "add game mechanic"
  - "implement inventory system"
  - "add multiplayer"
when_not_to_use: "Use specific sub-workflows for smaller scoped changes (e.g., /game-entity for a single enemy, /level-design for a map)."
---

# New Game Feature Workflow

> **Purpose**: Full end-to-end workflow for designing and building any major new game mechanic — from aligning on the plan to updating context files after completion.
> **Activates when**: User asks to "build a new feature", "add a game mechanic", or "implement a system".
> **Avoid when**: Only one specific thing needs to change (e.g., just a new enemy). Use the targeted sub-workflow instead.

---

## Prerequisites

Before planning the feature, read ALL of these files to understand the engine-less constraints:

- [ ] [`architecture.md`](../context/architecture.md) — verify the feature fits the custom game loop and rendering pipeline.
- [ ] [`project-overview.md`](../context/project-overview.md) — confirm the mechanic aligns with the game's core loop and genre.
- [ ] [`game-asset-registry.md`](../context/game-asset-registry.md) — check what assets are available or need to be created.

---

## Step 1: Architect (`/architect`)

**Goal**: Think through the entire system before writing a single line of code.

- [ ] **Identify the scope**: Does this require new input handling, new rendering layers, or changes to the core `update()` loop?
- [ ] **Define State**: How will the state of this feature be stored? (e.g., player inventory array, global game state object).
- [ ] **Performance check**: Ensure the feature won't introduce O(N^2) loops or heavy allocations during `update()`.
- [ ] Create the `implementation_plan.md` artifact with the exact steps.
- [ ] ⏸ **Present the implementation plan to the user and wait for explicit approval.**

**Output**: Approved `implementation_plan.md` artifact.

---

## Step 2: Develop

**Goal**: Build the feature strictly following the approved plan.

- [ ] Implement the feature using native JS/Python without relying on heavy external game engines.
- [ ] If you discover a necessary architectural change not in the plan: **stop, update the plan, and re-confirm** before proceeding.

**Output**: Working feature implementation.

---

## Step 3: Review (`/review`)

**Goal**: Verify the feature works mechanically and visually.

- [ ] Does the implementation match every point in the approved plan?
- [ ] Are edge cases handled (e.g., using an item when inventory is empty)?
- [ ] Does the game maintain target framerate while this feature is active?
- Output the review to a `walkthrough.md` artifact.

**Output**: `walkthrough.md` artifact with review findings.

---

## Step 4: Close the Loop

- [ ] Update `architecture.md` if the core game loop was modified.
- [ ] Run `/remember save` to preserve session knowledge.
- Ask the user: *"Feature complete. Do you want me to write tests for this logic, or move to the next feature?"*

---

## ⚠️ Anti-Patterns — Never Do These

- ❌ **Do not use external game engines.** (No Unity, Unreal, or Godot). Everything is built natively (HTML/JS or Python/Pygame).
- ❌ **Never skip the architect step.** Game mechanics often have cascading effects on physics and rendering. Plan first.
- ❌ **Never deviate from the approved plan** without re-confirming. Scope creep destroys game projects.

---

## 📎 Context Links

- [architecture.md](../context/architecture.md)
- [project-overview.md](../context/project-overview.md)
- [game-asset-registry.md](../context/game-asset-registry.md)
- [ui-registry.md](../context/ui-registry.md)
