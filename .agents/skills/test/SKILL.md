---
name: test
description: Writes, executes, and fixes automated tests for the game's core logic, physics math, and state machines.
---

Testing a game is not about achieving 100% line coverage. Testing is about confidence in the core mechanics.

When AI writes game tests, it often tries to test the `draw()` loop or visual rendering, resulting in brittle tests that break anytime a pixel changes. Or it writes "shallow" tests that mock everything and verify nothing.

This skill forces you to write tests that actually matter. Tests that verify physics math, collision detection, and state machines, ignoring the visual layer entirely.

---

## Step 1 — Interrogate the Contract

Before writing any tests, understand what the game logic is *supposed* to do. Do not just look at what the code *currently does*.

Read the target file and ask yourself:
1. Is this pure logic (math, hitboxes, state)? (If yes, it's highly testable).
2. What are the expected success states? (e.g., Player takes damage when hitbox overlaps enemy).
3. What are the failure/edge cases? (e.g., Player has invincibility frames, or HP is already 0).

If the expected behavior is unclear, stop and ask the developer:

```
Before I write tests for [Entity/Function], what is the expected behavior when [Edge Case] happens?
```

---

## Step 2 — Write Behavioral Tests

Write the tests. Follow these strict rules:

- **Test behavior, not implementation.** Do not assert that an internal state variable changed. Assert that the `Player.takeDamage()` method resulted in the correct `isDead` state.
- **Do not test rendering.** Never write assertions checking if `ctx.fillRect()` or `pygame.draw.rect()` was called. Test the underlying data model (x, y coordinates).
- **Mock the Game Loop cautiously.** You will likely need to mock `deltaTime` or tick the clock manually in the tests to simulate frames advancing.
- **Cover the "Unhappy Path".** AI always tests the happy path. You must write tests for edge cases (e.g., moving out of bounds).

---

## Step 3 — Execute and Fix (The Loop)

Never assume your tests pass. Run them locally using the appropriate command (e.g., `npm run test` or `pytest`).

If tests fail, diagnose the failure before changing code:
1. Did the test fail because the *code* is broken? (Fix the code)
2. Did the test fail because the *test* is wrong? (e.g., bad mock, wrong delta time) (Fix the test)

**The Death Spiral Rule:**
If you try to fix a failing test 3 times and it still fails, **STOP**. Do not blindly rewrite the test again. 

Present the failure to the developer:
```
I am stuck on this test failure for [Test Name].

Error:
[Brief error snippet]

I have tried [what you tried]. Should I rethink the approach, or is there a missing mock/setup I am not seeing?
```

---

## Step 4 — Report Confidence

When the tests are green, report back. Do not dump the entire test file into the chat. Summarize what you proved.

```
Tests for [Target] are written and passing.

Coverage added:
✅ Physics/Math: [Brief description]
✅ State Changes: [Brief description]
✅ Edge cases: [Brief description]

Total passing: [X] tests.
```

---

## ⚠️ Anti-Patterns — Never Do These

- ❌ **Do not use external game engines.** Tests must run against native JS/Python logic.
- ❌ **Never test visual rendering.** Testing UI/draw methods is a waste of time and highly brittle. Stick to the data layer.
- ❌ **Never assume a test works without running it.** AI code always contains minor syntax errors. Run it to prove it.
- ❌ **Never enter a fix-loop.** 3 strikes and you stop to ask the developer.
