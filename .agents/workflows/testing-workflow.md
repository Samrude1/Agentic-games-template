---
slash_command: /test-feature
description: "Write and execute tests for game logic, math utilities, and state management."
trigger_phrases:
  - "write tests for this"
  - "test the inventory"
  - "add unit tests"
  - "verify the physics"
when_not_to_use: "Do not use for testing visual rendering (Canvas/Pygame draw loops), as these are better verified manually or via screenshot testing."
---

# Game Testing Workflow

> **Purpose**: Verify that core game logic, physics math, and state machines work correctly and don't regress when other features are added.
> **Activates when**: User asks to "write tests", "test the inventory", or "verify physics".
> **Avoid when**: Trying to test visual output like `draw(ctx)`. Focus automated tests on logic (`update()` and helpers).

---

## Prerequisites

Before writing tests, understand what framework is used (e.g., Jest for JS, PyTest for Python):

- [ ] [`architecture.md`](../context/architecture.md) — Identify the testing stack and how game state is mocked.

---

## Step 1: Architect the Tests (`/architect`)

**Goal**: Decide what to test and how to mock the game loop.

- [ ] Identify pure functions (math, collision detection) that can be easily unit tested.
- [ ] Identify stateful logic (inventory management, health systems).
- [ ] Plan how to mock the `deltaTime` or input events to simulate the game loop.
- [ ] ⏸ **Stop. Present the test plan to the user for approval.**

**Output**: Approved `implementation_plan.md` artifact outlining the test cases.

---

## Step 2: Develop Tests

**Goal**: Write the tests using the appropriate framework.

- [ ] Write tests focusing on behavior, not implementation details.
- [ ] Mock native APIs (like `window.requestAnimationFrame` or pygame clocks) if necessary.
- [ ] Cover unhappy paths (e.g., taking damage when already at 0 HP).

**Output**: Written test files.

---

## Step 3: Execute & Fix (`/test`)

**Goal**: Ensure the tests pass and actually catch errors.

- [ ] Run the tests locally.
- [ ] If tests fail, diagnose whether the game logic is broken or the test is written incorrectly.
- [ ] Apply fixes until the suite is green.

**Output**: Passing test suite.

---

## Step 4: Close the Loop

- Ask the user: *"Tests are green. Should we implement the next feature or optimize the code we just tested?"*

---

## ⚠️ Anti-Patterns — Never Do These

- ❌ **Do not use external game engines.** The tests must run against native JS/Python code.
- ❌ **Do not attempt to unit test raw rendering.** Testing if `ctx.fillRect()` was called is brittle. Test the data (x, y, width, height) instead.
- ❌ **Never enter a test-fix death spiral.** If a test fails 3 times after fixing, stop and ask the user for help.

---

## 📎 Context Links

- [architecture.md](../context/architecture.md)
- [project-overview.md](../context/project-overview.md)
