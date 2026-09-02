---
name: game-onboard
description: >-
  Audits and reverse-engineers an existing or legacy HTML/CSS/JS game project.
  Use this skill whenever the user asks to onboard an existing codebase, audit code,
  take over a project, or runs /onboard or /audit.
  Generates a full project status and blueprint (.agents/blueprint/).
---

# Game Onboarding & Codebase Audit Skill

This skill guides the agent in systematically taking over an existing, unfinished, or legacy game project. Its objective is to evaluate the codebase, create persistent blueprint documentation (`.agents/blueprint/`), and establish an actionable roadmap before any modifications are made.

---

## Workflow Steps

### Step 1: Deep Codebase Audit
Examine all project files using exploration tools (`list_dir`, `view_file`, `grep_search`):

1. **HTML & DOM Structure**:
   - Check `index.html`: Canvas initialization, viewport meta tags, UI overlays, HUD elements.
2. **Game Loop & Timing**:
   - Find the main loop (`requestAnimationFrame`, `setInterval`).
   - Check whether movement relies on **delta-time (`dt`)** or is tied to screen refresh rate (Hz).
   - Verify if delta-time is clamped against lag spikes (`Math.min(dt, maxDt)`).
3. **Architecture & Modularity**:
   - Is code isolated into ES Modules or dumped into a monolithic script?
   - Are there hazardous global variables (`window.x`, `var`)?
   - How are states handled (Menu, Game, GameOver)? Is there a scene/state machine?
4. **Responsiveness & Aspect Ratio**:
   - Is the canvas fixed or does it scale while maintaining aspect ratio?
   - How are mouse and touch coordinates mapped to virtual canvas space?
5. **Input Handling**:
   - Which input methods are implemented (Keyboard, Mouse, Touch)?
   - Are virtual touch controls available for mobile?
6. **Audio & Juice**:
   - How are sound effects implemented (Web Audio API vs HTML5 `<audio>`)?
   - Are impacts and events enhanced with screen shake, particle effects, or flashes?

---

## Step 2: Generate Blueprint Documentation (.agents/blueprint/)
Synthesize findings into persistent blueprint files:

1. **`.agents/blueprint/GDD.md`**: Reverse-engineered design document (core loop, controls, mechanics, rules).
2. **`.agents/blueprint/ARCHITECTURE.md`**: Technical architecture diagram (Mermaid), file responsibilities, and refactoring needs.
3. **`.agents/blueprint/PROJECT_STATUS.md`**:
   - Estimated completion percentage (0–100%).
   - Feature Matrix (Done, In Progress, Missing).
   - Technical Debt and identified risks.
   - Prioritized Action Plan for upcoming sprints.

---

## Step 3: Executive Debrief to Developer
Deliver a concise executive debrief:

```markdown
## 🕹️ Project Onboarding & Audit Report

### 1. Executive Summary
- **Game**: [Game genre and type]
- **Completion**: [Estimated %]
- **Current State**: [1-2 sentence high-level summary]

### 2. What Works Well (The Good)
- [Positive architectural strengths]

### 3. Technical Debt & Risks (Areas for Improvement)
- [Critical issues: missing delta-time, hardcoded resolutions, unhandled memory]

### 4. Proposed Action Plan (Next Steps)
1. [First logical fix or feature]
2. [Second step]

Full blueprint saved to: `.agents/blueprint/`.
```

Conclude by asking developer confirmation: *"Would you like me to start with step 1?"*
