# Code Optimization & Refactoring Workflow

Use this workflow when improving code quality, game loop performance, memory management, or readability without changing external behavior.

---

## 1. Analyze Phase (`/optimize`)
- Review target files and identify performance bottlenecks in `update()` or `draw()` loops.
- Check for memory leaks, garbage collection spikes, redundant canvas API calls, or spaghetti logic.
- Cross-examine code against `.agents/context/code-standards.md` and `.agents/context/architecture.md`.

## 2. Architect Phase (`/architect`)
- Propose an optimization blueprint in `implementation_plan.md`.
- Detail exact refactoring steps, object pooling targets, off-screen canvas caching, and expected performance gains.
- Obtain human review before modifying any source files.

## 3. Refactor Phase
- Execute cleanup strictly adhering to the approved plan.
- Enforce modern Vanilla JS / ES6+ standards, object pooling, and strict separation between `update(dt)` and `draw(ctx)`.

## 4. Verify Phase (`/review`)
- **Empirical Check**: Run syntax checks (`node -c`) and game loop performance validation.
- Confirm zero functional regressions and 60FPS smoothness.
- Document refactoring metrics and results in `walkthrough.md`.

## 5. Remember Phase (`/remember save`)
- Update `memory.md` so future sessions inherit the optimized architectural patterns.
