---
name: init
description: Bootstraps a new game project from the template by interviewing the user and automatically populating all context files (architecture, project-overview, game-asset-registry, etc.).
---

A generic game template is not a game. A game has a specific core loop, a genre, and strict performance boundaries. 

When a developer clones this generic template to start something new, this skill transforms the empty shell into a highly opinionated, context-aware foundation. It ensures that every future AI session starts with a deep understanding of what is actually being built.

Run this skill ONLY when starting a brand new project, or when the user explicitly calls `/init` or `/bootstrap`.

---

## Step 1 — The Context Interview

Do not start writing files immediately. Do not guess what the game is about. Your first job is to extract the vision.

Check for an existing vision document (e.g., `docs/future-project-vision.md` or a prompt). If one exists, use it. If not, or if it is incomplete, interview the developer.

Ask exactly these questions, one at a time if necessary:

```
Let's bootstrap this game project. Before I populate the context files, I need to know what we are building:

1. What is the core game loop in one sentence?
2. What is the genre and visual style (e.g., 2D pixel art platformer, top-down Python shooter)?
3. What are the 3-4 main entities or mechanics (e.g., Player, Enemies, Collectibles)?
4. Are you using HTML/JS Canvas, Python Pygame, or another native approach? (Note: External engines like Unity are forbidden).
```

Wait for the developer to answer. Do not proceed until you have a clear picture.

---

## Step 2 — Propose the Context Mapping

Once you understand the vision, map out exactly how you will alter the `.agents/context/` files. Do not write the files yet. Present the plan.

```
Got it. Here is how I will configure the project context:

- project-overview.md: [Brief summary of the game's core loop and genre]
- architecture.md: [The specific native rendering approach (e.g. JS Canvas) and update loop]
- game-asset-registry.md: [The initial core sprites/audio needed based on the mechanics]
- ui-registry.md: [The primary design tokens for the HUD/Menus]

Does this foundation look correct?
```

Wait for explicit approval.

---

## Step 3 — Aggressive Overwrite

Once approved, execute the plan. You must aggressively overwrite the generic boilerplate in the `.agents/context/` directory.

- Remove all `[Project Name]` or `[Insert description]` placeholders.
- Write definitive, confident documentation based on the interview.
- Ensure `architecture.md` clearly states what is allowed and what is forbidden (strictly forbidding Unity/Godot/Unreal).

---

## Step 4 — The Handoff

When the files are updated, the project is officially bootstrapped. The template is now a bespoke game codebase.

Close the loop with the developer:

```
Bootstrap complete. All context files are populated.
The AI now understands the rules, mechanics, and native architecture of this game.

What is the first entity or feature we are building? (I recommend running /architect when you are ready).
```

---

## ⚠️ Anti-Patterns — Never Do These

- ❌ **Never assume an external game engine.** This template is strictly for native from-scratch development (HTML/JS Canvas, Python Pygame, etc.).
- ❌ **Never invent requirements.** If the user gives a vague one-word idea, ask clarifying questions. Do not hallucinate a massive RPG if they wanted Pong.
- ❌ **Never leave generic boilerplate behind.** A context file with `[Insert purpose here]` is a failure.
- ❌ **Never skip the interview.** Bootstrapping without understanding the domain leads to architecture drift on day one.
