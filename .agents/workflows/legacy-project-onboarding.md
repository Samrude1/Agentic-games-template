# Legacy Project Onboarding Workflow

Use this workflow when introducing `.agents` context into an existing, legacy, or imported project.

---

## 1. Analyze Project Phase
- **Read README & Specs**: Inspect `README.md`, `package.json`, or configuration files to grasp project objectives.
- **Directory Scan**: Recursively analyze folder structures, core languages, frameworks, build scripts, and dependencies.
- **Architectural Discovery**: Trace main entry points, data flows, UI overlays, and state managers.

## 2. Document Context Phase (`/imprint`)
- Create or update `.agents/context/` ground truth files:
  - `architecture.md`: Document core architecture, loop structures, and data flows.
  - `game-asset-registry.md` / `tech-stack.md`: Inventory images, audio engines, CSS tokens, and libraries.
  - `code-standards.md`: Establish code formatting, state mutation rules, and performance guidelines.

## 3. Establish Baseline Phase (`/remember`)
- Initialize `memory.md` with current working features, known bugs, technical debt, and immediate roadmap goals.

## 4. Align & Plan Phase (`/architect`)
- Compare existing code against `.agents/AGENTS.md` rules.
- Create `implementation_plan.md` outlining necessary refactoring steps before feature additions.
