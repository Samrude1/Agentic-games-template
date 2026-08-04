# Testing & QA Workflow

Use this workflow to build, execute, and verify automated unit or integration tests for game logic, state machines, math utilities, and AI behaviors.

---

## 1. Architect Test Plan (`/architect`)
- Review `architecture.md` and `game-design-context.md` to identify critical paths and boundary conditions.
- Target pure game logic: targeting algorithms, hit validation, collision math, state transitions, and inventory rules.

## 2. Develop Tests Phase (`/test`)
- Write deterministic unit and integration tests.
- Isolate test code from DOM rendering or heavy canvas contexts.

## 3. Execute & Verify Phase
- **Empirical Check**: Execute test suites using test runners or Node.js execution scripts.
- Trace and fix any failing assertions at the root cause (never mute tests or swallow exceptions).

## 4. Review & Remember Phase (`/review`, `/remember save`)
- Ensure adequate coverage for critical gameplay paths.
- Update `memory.md` with test pass results.
