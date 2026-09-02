---
name: game-debug
description: >-
  Diagnoses, locates, and fixes game bugs and technical defects.
  Use this skill whenever the user reports a bug, blank screen, erratic physics,
  or runs /debug or /fix.
---

# Game Debug & Diagnostics Skill

This skill guides the agent in conducting systematic troubleshooting for HTML5 Canvas / JavaScript games. Its goal is to isolate root causes quickly, apply clean architectural fixes, and document findings to prevent regressions.

---

## Diagnostic Workflow

### Step 1: Symptom Mapping
Clarify the issue:
1. **What is happening?** (Black screen, input unresponsive, crash during specific event, physics jitter, silent audio?)
2. **When does it occur?** (At boot, after clicking a button, during entity collision?)

---

### Step 2: Root Cause Checklist

Investigate common HTML5 Canvas failure modes:

#### 1. Black Screen or Missing Render
- Check canvas dimensions: are `virtualWidth` / `virtualHeight` zero or undefined?
- Check `ctx.clearRect()`: is the scene rendering after clear, or returning early?
- Check CSS z-index and overlays: is `#ui-overlay` blocking clicks or hiding canvas (`pointer-events`)?
- Check asset loading: is rendering waiting on an unhandled Promise or failed image load?

#### 2. Coordinate & Physics Instability
- Search for `NaN` or `undefined` in coordinates (`x`, `y`, `vx`, `vy`).
  *(Common cause: division by zero during vector normalization).*
- Check delta-time: did `dt` spike due to an unhandled tab change?
- Check coordinate transformation: is input using `engine.screenToVirtual()`?

#### 3. State Machine & Loop Freezes
- Was `engine.switchScene()` called with an unregistered scene key?
- Is `isRunning` false or did an unhandled exception break the `requestAnimationFrame` chain?

#### 4. Audio Failures
- Was `audio.init()` called inside a genuine user gesture handler?
- Is `AudioContext.state` suspended?
- Is `isMuted` active or master volume zero?

---

### Step 3: Implement & Verify Fix
1. Pinpoint the exact file and line.
2. Implement the fix maintaining architectural standards (no global variables, no ad-hoc styles).
3. Ensure the fix does not introduce GC allocations in the loop.

---

### Step 4: Bug Registry Update (.agents/blueprint/KNOWN_BUGS.md)
Document the resolution in `.agents/blueprint/KNOWN_BUGS.md`:
- Date & Symptom
- Root Cause
- Resolution & Modified Files
