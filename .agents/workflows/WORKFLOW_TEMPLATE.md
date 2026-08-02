---
slash_command: /workflow-name
description: "What this workflow does, in one sentence."
trigger_phrases:
  - "user phrase that means this workflow"
  - "another natural trigger"
when_not_to_use: "Use /other-workflow instead when [edge case]."
---

# [Workflow Name]

> **Purpose**: [What this workflow achieves and why it exists.]
> **Activates when**: User asks "[phrase 1]", "[phrase 2]", or explicitly mentions this file.
> **Avoid when**: [Describe the edge case and which workflow to use instead.]

---

## Prerequisites

Before starting any step, read the following context files to avoid conflicts:

- [ ] [`architecture.md`](../context/architecture.md) — Verify the change respects the engine-less requirement (HTML/JS Canvas or Python Pygame) and architectural patterns.
- [ ] [`.agents/context/[relevant].md`](../context/) — [what to check in this file]

---

## Step 1: [Phase Name] (`/skill-name`)

**Goal**: [One-sentence description of what this step achieves.]

- [ ] [Concrete, specific task — not vague, e.g. "Read `architecture.md` and confirm no conflicts"]
- [ ] [Another task with a measurable outcome]
- [ ] ⏸ **Stop. Present findings to the user and wait for explicit approval** before moving to Step 2.

**Output**: [What artifact or file this step produces]

---

## Step 2: [Phase Name]

**Goal**: [One-sentence description.]

- [ ] [Concrete task]
- [ ] [Concrete task]

**Output**: [What this step produces]

---

## Step N: Close the Loop

- Update context: `[.agents/context/file.md]` to reflect the new state.
- Update memory: run `/remember save` if session knowledge changed.
- Ask the user: *"[Suggest the logical next action, e.g., 'Do you want me to write tests for this now?']"*

---

## ⚠️ Anti-Patterns — Never Do These

- ❌ **Do not use external game engines.** This template strictly enforces building from scratch using HTML5 Canvas/JS, Python Pygame, or similar low-level rendering. Unity, Godot, and Unreal are strictly forbidden.
- ❌ **Do not proceed past `⏸` without user approval.** The checkpoint exists to catch misunderstandings early.
- ❌ [Domain-specific anti-pattern]

---

## 📎 Context Links

- [architecture.md](../context/architecture.md)
- [project-overview.md](../context/project-overview.md)
- [game-asset-registry.md](../context/game-asset-registry.md)
- [ui-registry.md](../context/ui-registry.md)
