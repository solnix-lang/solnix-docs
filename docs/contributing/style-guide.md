# Style Guide

Consistency is key to maintaining a high-quality codebase and documentation. This guide outlines the conventions we use at Solnix.

## Rust Code Style

We follow the standard Rust conventions. When in doubt, let the tools decide.

### Tools
- **Formatting**: Always use `cargo fmt`.
- **Linting**: We use `clippy` for catch common mistakes. Run `cargo clippy` and ensure it's clean.

### Naming Conventions
- **Types/Traits**: `PascalCase` (e.g., `ProgramContext`)
- **Functions/Variables**: `snake_case` (e.g., `emit_instruction`)
- **Constants**: `SCREAMING_SNAKE_CASE` (e.g., `MAX_STACK_DEPTH`)
- **Modules**: `snake_case` (e.g., `codegen`)

### Error Handling
- Use `Result` and `Option` types instead of `panic!`.
- Use the `thiserror` or `anyhow` crates for descriptive error messages in the compiler.

## Documentation Style

Our documentation aims to be "Linux Kernel meets Stripe" – technical yet extremely accessible.

### Markdown Rules
- **Headers**: Use Title Case for H1 and H2.
- **Code Blocks**: Always specify the language (e.g., ` ```rust `).
- **Admonitions**: Use Material for MkDocs admonitions (e.g., `!!! info`) to highlight important notes.

### Visuals
- Use **Mermaid.js** for all diagrams.
- Keep diagrams simple and focused on one concept.

## Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat: ...` for new features.
- `fix: ...` for bug fixes.
- `docs: ...` for documentation changes.
- `refactor: ...` for code changes that neither fix a bug nor add a feature.

---

*Found an inconsistency? Submit a PR to update this guide!*
