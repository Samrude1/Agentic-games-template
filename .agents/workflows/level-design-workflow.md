# Level & Map Design Workflow

Use this workflow when designing game boards, level maps, grid tilemaps, or scene placements.

---

## 1. Architect Phase (`/architect`)
- Plan board layouts, grid sizes (e.g. 10x10), placement constraints (e.g. 1-tile gap rule), and spawn points.
- Create `implementation_plan.md` artifact for approval.

## 2. Develop Phase
- Implement board data structures, grid matrix generators, or tilemap parsers.
- Integrate validity checks (e.g., `canPlaceShip`, bounds checking, collision matrices).

## 3. Verify Phase (`/review`)
- **Empirical Check**: Validate matrix boundaries, grid coordinate calculations, and randomizer iteration safety.
- Document test outcomes in `walkthrough.md`.

## 4. Imprint & Remember Phase (`/imprint`, `/remember save`)
- Log grid rules and spacing constraints in `game-registry.md`.
- Save state to `memory.md`.
