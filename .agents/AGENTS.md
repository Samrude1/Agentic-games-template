# AI Game Engineering Agent Workspace

This `.agents` directory serves as the "brain" for the game development project. All AI code generation, entity creation, and structural changes must follow the workflows and rules defined here.

## Structure
- `context/`: Contains the ground truth for our game architecture, design context, and code standards. Agents must consult these before modifying code.
- `workflows/`: Defines the strict loops (Architect -> Review -> Imprint) for specific tasks like adding new entities or mechanics.
- `skills/`: Contains custom scripts and cognitive tools for validation and code enforcement.
- `feature-specs/`: Stores the numbered, approved implementation plans (`01-feature.md`) for permanent documentation of what the AI has built.

---

<!-- BEGIN:gamedev-agent-rules -->
## Vanilla JS & Canvas Rules
1. **Performance**: Every frame matters. Avoid memory leaks, excessive object creation during the game loop (garbage collection pauses), and expensive DOM manipulations.
2. **Rendering**: Use HTML5 `<canvas>` for all gameplay rendering. Use DOM/CSS only for UI overlays (menus, HUD).
3. **Immutability**: Be careful with state. Do not update game state during the `draw()` loop. Keep `update()` and `draw()` strictly separated.
4. **Architecture**: Favor ES6 Classes for Game Entities with `update(deltaTime)` and `draw(ctx)` methods.
5. **Documentation Sync**: Whenever you create a new core file, move a file, or change the architecture/database structure, you MUST immediately update `README.md` (specifically the 'Project Structure', 'Tech Stack', and 'Architecture' sections) to reflect reality. Never leave the README out of sync with the actual codebase.
<!-- END:gamedev-agent-rules -->
