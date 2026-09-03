---
name: game-test
description: >-
  Performs automated unit testing and browser playtesting quality verification.
  Use this skill whenever the user requests testing, runs /test or /playtest,
  or after modifying code to verify nothing broke.
---

# Game Test & Automated Playtesting Skill (Studio Edition)

This skill guides the agent in running automated quality verification for an HTML5 Canvas / JavaScript game. It acts as the solo developer's QA engineer, combining fast deterministic unit testing with headless browser playtesting to catch regressions immediately.

---

## Playtesting Workflow

### Step 1: Deterministic Unit Testing Gate
Always run the instant zero-dependency unit tests first:
1. Run command: `npm test` (or `node --test tests/*.test.js`).
2. Verify that all test suites pass:
   - `tests/math.test.js` (Vector math, interpolation, bounds clamping)
   - `tests/collision.test.js` (Circle and AABB intersection logic)
   - `tests/pool.test.js` (Zero-leak object recycling)
   - `tests/save.test.js` (SaveManager persistence and fallback safety)
3. If any unit test fails, halt immediately and diagnose root cause before opening the browser.

---

### Step 2: Browser Environment & Launch
1. Ensure a local dev server or static file host is serving `index.html`.
2. Launch `browser_subagent` to execute the automated playtest session.

---

### Step 3: Browser Verification Checklist
Instruct the browser subagent to execute:

1. **Console Errors**:
   - Check for unhandled exceptions (`Uncaught TypeError`, `ReferenceError`, `404 Not Found`).
2. **Boot & Canvas Rendering**:
   - Verify game loads without a blank/black screen.
   - Verify Canvas dimensions and 16:9 letterbox aspect ratio.
3. **State Machine & Scene Transitions**:
   - Trigger start action (`Space` or `#btn-start` click).
   - Verify transition from `MenuScene` to `GameScene`.
   - Verify that losing or pressing `Escape` triggers `GameOverScene`.
4. **Game Loop & Framerate**:
   - Verify 60 FPS target framerate with no GC micro-stutters.
5. **Audio Context**:
   - Verify `AudioContext` initializes to `'running'` state on first interaction.
6. **Visual Screenshot**:
   - Capture an in-game screenshot for the developer report.

---

### Step 4: Playtest Report for Developer
Present a concise summary:

```markdown
## 🧪 Studio Playtest Verification Report

### 1. Unit Test Gate (Node.js)
- **Status**: ✅ PASSED (14/14 tests)
- **Duration**: ~150ms

### 2. Browser Playtest (Smoke & Integration)
- **Status**: ✅ PASSED / ❌ ISSUES DETECTED
- **Framerate**: ~60 FPS (Stable)
- **Console Errors**: 0 found
- **Audio System**: Running & Synthesizing
- **Scenes Verified**: MenuScene -> GameScene -> GameOverScene

### 3. Visual State
[Screenshot attachment]
```

If errors are detected, propose immediate resolution or transition to `/debug`.
