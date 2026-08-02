# 🎮 Agentic Games Template (Engine-less)

Welcome to the **Agentic Games Template**. This is a highly opinionated, AI-first development environment designed for **Autonomous Game Engineering**.

Unlike traditional game dev workflows, this template enforces a strict **Engine-less Architecture**. There is no Unity, Godot, or Unreal here. Games are built completely from scratch using native technologies (e.g., HTML5/JS Canvas or Python Pygame). This gives you and the AI complete, transparent control over the game loop, rendering pipeline, and memory management.

Most importantly, it includes an **AI Brain** (`.agents/` directory) that forces your AI coding assistant (like Antigravity IDE, Claude, or Cursor) to act like a disciplined Senior Game Developer, preventing spaghetti code and architecture drift.

---

## 🚀 The Secret Sauce: The `.agents` Directory

AI agents are fast, but without discipline, they create unmanageable technical debt—especially in game development where performance is critical. This template solves that with a set of rules, workflows, and cognitive skills that your AI assistant must read and follow.

### 📁 Structure
- **`/context`**: The Ground Truth. Contains your `project-overview.md`, `architecture.md` (defining your native game loop), `game-asset-registry.md`, and `ui-registry.md`. The AI reads this before modifying *any* code.
- **`/workflows`**: The Processes. Defines *what* the AI should do (e.g., adding an AI agent, creating a game entity, designing a level). Built on a strict "Gold-Standard" YAML-frontmatter template for reliable AI execution.
- **`/skills`**: The Cognitive Tools. Defines *how* the AI should think and execute. Includes highly-structured, S-tier behavioral prompts like `/init`, `/architect`, `/optimize`, `/recover`, `/remember`, `/test`, and `/review`.

---

## ⚙️ The Engineering Loop

You don't tell the AI to "just build a new enemy". You put it through the **Engineering Loop**.

1. **Architect (`/architect`)**: The AI creates an Implementation Plan and surfaces architectural decisions (e.g., physics, state). It waits for your approval.
2. **Develop**: The AI writes the code according to the approved plan.
3. **Review (`/review`)**: The AI audits its own code against the project's architecture, looking for GC spikes or performance bottlenecks.
4. **Imprint (`/imprint`)**: If a new visual or entity pattern was introduced, the AI saves it to the registry to guarantee consistency.
5. **Remember (`/remember save`)**: At the end of the session, the AI saves the state to `memory.md` so it never loses context between days.

---

## 🛠️ How to Start Using This Template

1. **Clone & Initialize**
   ```bash
   git clone https://github.com/Samrude1/Agentic-games-template.git my-new-game
   cd my-new-game
   ```

2. **Set Your Game Context**
   Open your AI editor and run the `/init` skill.
   > *"Run `/init` to set up this new game project."*
   
   The AI will interview you about your game's core loop, genre, and tech stack (Canvas vs. Pygame), and then automatically populate the `.agents/context/` directory with your specific goals.

3. **Engage the AI**
   Once the context is initialized, give your prompt to kick off the development:
   > *"Let's build the player character. Follow the `/game-entity` workflow."*

---

## 📦 Tech Stack (Engine-less Philosophy)
This template is agnostic to the exact native language, but it strictly forbids external engines. Recommended approaches include:
- **Web Games**: HTML5 Canvas + Vanilla JavaScript/TypeScript
- **Desktop Games**: Python + Pygame

*Built for game developers who want to own their engine and lead their AI.*
