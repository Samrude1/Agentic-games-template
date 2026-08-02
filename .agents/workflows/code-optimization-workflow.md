---
slash_command: /optimize
description: "Analyze and refactor the game loop, rendering pipelines, or memory management for better performance."
trigger_phrases:
  - "optimize performance"
  - "fix framerate drop"
  - "clean up code"
  - "reduce memory usage"
when_not_to_use: "Use /new-feature when adding new capabilities. Optimization should not change gameplay behavior."
---

# Code & Performance Optimization Workflow

> **Purpose**: Refactor messy code and optimize performance bottlenecks in the rendering or update loops to maintain a smooth framerate.
> **Activates when**: User complains about FPS drops, memory leaks, or asks to "clean up" the codebase.
> **Avoid when**: Adding new behavior. Optimization must strictly preserve existing gameplay.

---

## Prerequisites

Before refactoring, understand the performance baseline:

- [ ] [`architecture.md`](../context/architecture.md) — Identify the game loop structure and rendering approach (e.g., Canvas 2D API, Pygame Surfaces).

---

## Step 1: Diagnose the Bottleneck

**Goal**: Identify exactly what is slow before changing anything.

- [ ] Analyze the code causing the issue (e.g., `update()` loop, `draw()` calls, collision detection).
- [ ] Look for **Spaghetti logic**: Deeply nested `if/else`, massive update functions.
- [ ] Look for **Performance killers**: Object creation inside the game loop (Garbage Collection stutter), O(N^2) collision checks, redrawing static backgrounds every frame.
- [ ] Create an `implementation_plan.md` detailing the bottleneck and the proposed fix (e.g., "Implement spatial hashing for collisions", "Add object pooling").
- [ ] ⏸ **Stop. Present the diagnosis and plan to the user for approval.**

**Output**: Approved `implementation_plan.md` artifact.

---

## Step 2: Refactor & Optimize

**Goal**: Execute the plan while preserving exact gameplay parity.

- [ ] Break large functions into smaller, single-responsibility helpers if cleaning up spaghetti code.
- [ ] Implement object pooling if addressing garbage collection stutters.
- [ ] Optimize collision loops or rendering passes (e.g., drawing to an offscreen canvas).
- [ ] Do NOT change the game's mechanics or rules during this step.

**Output**: Optimized codebase.

---

## Step 3: Review (`/review`)

**Goal**: Prove the optimization worked without breaking the game.

- [ ] Does the game run significantly smoother or use less memory?
- [ ] Did any visual glitches appear as a result of rendering optimizations?
- [ ] Do the mechanics feel exactly the same as before?
- Output findings to a `walkthrough.md` artifact.

**Output**: `walkthrough.md` artifact.

---

## Step 4: Close the Loop

- Update `architecture.md` if a new structural pattern (like Object Pooling or Spatial Hashing) was introduced.
- Ask the user: *"Optimization complete. Shall we run a quick playtest to verify the framerate is stable?"*

---

## ⚠️ Anti-Patterns — Never Do These

- ❌ **Do not use external game engines.** Maintain the engine-less (JS/Python) architecture.
- ❌ **Never optimize by guessing.** If you don't know what's slow, don't just rewrite code. Look for GC spikes or O(N^2) loops.
- ❌ **Do not allocate new memory in the game loop.** Creating `new Object()` or `[]` inside `update()` or `draw()` causes massive stuttering. Reuse objects.

---

## 📎 Context Links

- [architecture.md](../context/architecture.md)
- [project-overview.md](../context/project-overview.md)
