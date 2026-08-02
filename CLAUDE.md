## Application Building Context

Read the following files in order before implementing
or making any architectural decision:

1. `.agents/context/project-overview.md` — product definition,
   goals, features, and scope
2. `.agents/context/architecture.md` — system structure,
   boundaries, storage model, and invariants
3. `.agents/context/ui-context.md` — theme, colors, typography,
   and component conventions
4. `.agents/context/code-standards.md` — implementation rules
   and conventions
5. `.agents/workflows/` — development workflow,
   scoping rules, and delivery approach

If implementation changes the architecture, scope, or
standards documented in the context files, update the
relevant file before continuing.

## Anti-SaaS Philosophy (Strict Rule)

This is an "Anti-SaaS" template. Your primary architectural stance MUST be self-hosted and custom-built. 
- Do NOT suggest or default to external third-party SaaS services (e.g., Clerk, Firebase, Supabase Auth, Auth0, etc.) unless the user explicitly requests them.
- For authentication and core features, always propose building it in-house (e.g., Auth.js / NextAuth, or custom JWT/Session cookies) even if it requires more boilerplate or effort.
- You must prioritize owning the stack entirely.
