---
name: game-test
description: >-
  Performs automated browser playtesting and quality verification.
  Use this skill whenever the user requests testing, runs /test or /playtest,
  or after modifying code to verify nothing broke.
---

# Game Test & Automated Playtesting Skill

This skill guides the agent in running automated headless/browser tests for an HTML5 Canvas / JavaScript game. In solo development, this functions as the developer's automated QA tester, catching regressions immediately.

---

## Playtesting Workflow

### Step 1: Environment Initialization
1. Ensure a local dev server or static file host is serving `index.html`.
2. Launch `browser_subagent` to perform the automated test session.

---

### Step 2: Browser Subagent Verification Checklist

Instruct the subagent to complete the following checks:

1. **Console Errors**:
   - Check for unhandled exceptions (`Uncaught TypeError`, `ReferenceError`, `404 Not Found`).
2. **Boot & Canvas Rendering**:
   - Verify game loads without a blank/black screen.
   - Verify UI overlay (Start Screen) displays properly.
   - Verify Canvas dimensions and aspect ratio match configuration.
3. **Interaction & State Transition**:
   - Trigger start button click (`#btn-start`) or simulate Space key.
   - Verify overlay hides and active gameplay state initializes (`GameScene`).
4. **Game Loop & Framerate**:
   - Monitor FPS stability (~60 FPS target).
   - Check for lag spikes or micro-stutter.
5. **Audio Context**:
   - Verify `AudioContext` transitions to `'running'` upon user interaction.
6. **Visual Screenshot**:
   - Capture a screenshot of active gameplay for the test report.

---

### Step 3: Playtest Report for Developer

Present a concise summary:

```markdown
## 🧪 Playtest Verification Report

### Overview
- **Status**: ✅ PASSED / ❌ ISSUES DETECTED
- **Framerate**: ~[60] FPS (Stable / Fluctuating)
- **Console Errors**: [0 found / error count & snippets]
- **Audio System**: [Active / Blocked by autoplay]

### Observations
- [Observation 1: Start menu and scene transition cleanly]
- [Observation 2: Entities update and particles render without errors]

### Visual State
[Screenshot attachment]
```

If errors are detected, propose immediate resolution or transition to `/debug`.
