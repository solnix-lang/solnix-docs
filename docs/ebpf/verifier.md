# eBPF Verifier

The verifier is a safety gatekeeper that ensures eBPF programs cannot compromise kernel stability or security.

## Common Rejection Reasons
Programs are rejected if they:
- Attempt to access out-of-bounds memory.
- Contain infinite loops or reach the instruction limit.
- Access uninitialized registers.
- Use pointers without null-checks (see Solnix `if guard`).

## Stack Limit
- **Constraint**: Each eBPF program is limited to **512 bytes** of stack space.
- **Tip**: Use `reg` for small counters and `heap` (via maps) for larger data structures or state.

## Pointer Safety
- Pointers must be validated before derefencing.
- The verifier tracks the state of every register. If a register contains a pointer that might be NULL (e.g., from a map lookup), any access to it without a previous zero-check will fail verification.

## Loops
- Historically, eBPF did not support loops. 
- Modern kernels allow bounded loops, but Solnix current focus is on unrolled execution or simple bounded patterns to maintain wide compatibility.
