# AI Agent Development Workflow (FastAPI / Web Audio / Logic)

Use this workflow when creating or modifying AI capabilities (e.g. smart targeting algorithms, LLM integrations, dynamic behaviors, or decision trees).

---

## 1. Architect Phase (`/architect` or `/grill-me`)
- Define the Agent's objective, decision matrix, memory pools, and state structures.
- Align on language and design choices by presenting options alongside clear recommendations.
- Check compliance against `.agents/context/architecture.md` and `.agents/context/code-standards.md`.
- Create an `implementation_plan.md` artifact for approval before writing code.

## 2. Develop Phase
- Implement the agent logic (e.g., state machines, targeting algorithms, JSON schemas, FastAPI handlers).
- Ensure deterministic state updates and zero memory leaks (avoid allocating temporary arrays/objects inside game loop steps).
- Keep game logic strictly decoupled from canvas rendering.

## 3. Verify Phase (`/review`)
- **Empirical Check**: Run automated unit tests (`/test`) or node execution checks (`node -c`) to verify decision logic.
- Verify edge cases (e.g., adjacent ship hits, boundary limits, invalid inputs).
- Output review findings into `walkthrough.md`.

## 4. Imprint & Remember Phase (`/imprint`, `/remember save`)
- Update `game-registry.md` with new AI decision patterns, targeting algorithms, or parameters.
- Save memory state to `memory.md`.
