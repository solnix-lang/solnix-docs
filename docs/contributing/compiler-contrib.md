# Compiler Contribution Guide

Welcome to the Solnix Compiler development team! This guide provides the necessary information to help you contribute to the core heart of the Solnix language.

## Overview

The Solnix compiler is written in **Rust** and acts as a high-performance bridge between Solnix source code and eBPF-compatible C code. Our goal is to provide a safe, expressive, and efficient way to write kernel-level logic.

### The Pipeline
1. **Frontend**: Lexing and Parsing (Source → AST)
2. **Analysis**: Semantic Validation and Type Checking
3. **Safety Engine**: eBPF boundary verification
4. **Backend**: IR generation and C Code Emission

## Getting Started

### Prerequisites
To build and test the compiler, you will need:
- **Rust Toolchain**: [Install Rust](https://rustup.rs/) (Stable channel)
- **Clang/LLVM**: Version 11+ (Required for eBPF object verification)
- **libbpf**: Development headers

### Setting Up the Environment
1. Clone the main repository:
   ```bash
   git clone https://github.com/solnix/solnix.git
   cd solnix
   ```
2. Build the compiler in debug mode:
   ```bash
   cargo build
   ```
## How to Contribute

### Adding a New Feature
1. **Syntax**: Define the new syntax in `ast/mod.rs` and update the `parser`.
2. **Semantics**: Add type checking logic in `sema/`.
3. **Safety**: Ensure the feature respects eBPF stack limits and instruction counts.
4. **Codegen**: Implement the C emission logic in `codegen/`.
5. **Tests**: Add a regression test in `tests/`.

### Bug Fixes
- Always include a reproduction script in your PR.
- Ensure that `cargo test` passes across all supported architectures.

## Coding Standards

- **Safety First**: Use `unsafe` sparingly and only with documented justification.
- **Performance**: Solnix is a systems language; avoid unnecessary allocations in the hot path.
- **Documentation**: All public API functions must have doc comments (`///`).
- **Idiomatic Rust**: Follow [Rust API Guidelines](https://rust-lang.github.io/api-guidelines/).

## Testing Checklist

Before submitting a Pull Request, ensure:
- [ ] Code is formatted with `cargo fmt`.
- [ ] No new `clippy` warnings are introduced.
- [ ] All unit and integration tests are passing.
- [ ] You have added documentation for new flags or features.

---

*Need help? Join our [Discord/Slack] or open an issue on GitHub!*
