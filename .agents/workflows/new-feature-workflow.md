# New Game Feature Workflow

Use this workflow when adding major mechanics, game modes, complex UI systems, or new capabilities.

---

## 1. Architect Phase (`/architect` or `/grill-me`)
- Check `architecture.md` and `code-standards.md` to ensure performance & game loop compliance.
- Resolve architectural decisions by presenting clear options with recommendations.
- Create `implementation_plan.md` artifact with `RequestFeedback: true` for user approval.

## 2. Develop Phase
- Implement code strictly following the approved blueprint.
- Enforce clean state isolation (keep UI overlays in HTML/CSS, game rendering in HTML5 Canvas).

## 3. Verify Phase (`/review`)
- **Empirical Check**: Run syntax/build verification (`node -c`) or test suites (`/test`). Never declare complete without empirical execution evidence.
- Produce comprehensive summary in `walkthrough.md`.

## 4. Imprint & Remember Phase (`/imprint`, `/remember save`)
- Update `game-registry.md` if new entity patterns or global rules were added.
- Save memory to `memory.md`.
