# Solnix Verifier Model

This document describes how the Solnix compiler models the
Linux eBPF verifier and the key rules it enforces **before**
generating eBPF bytecode.

The Linux eBPF verifier rejects programs that could:
- crash the kernel
- access out-of-bounds memory
- loop indefinitely
- perform unsafe pointer arithmetic

Solnix enforces a **verifier-aware semantic model** so that
programs accepted by the compiler are highly likely to pass
the kernel verifier.

---

## Why This Matters

The eBPF verifier enforces safety properties at load time.
Unverified programs are **rejected and cannot run**.

Solnix’s verifier model ensures:
- No undefined behavior
- No unsafe reads/writes
- No unbounded loops
- No recursion
- Stack limits are respected
- Map access is safe
- BPF helper usage is correct

---

## High-Level Rules

### 1. **No Unbounded Loops**
Loops must have statically analyzable bounds.

✔ Allowed:
```solnix
for i in 0..4 {
    ...
}
```

❌ Disallowed:
```solnix
while condition {
    ...
}
```

---

### 2. **No Recursion**
The kernel verifier cannot handle recursive functions.

Solnix forbids:
```solnix
fn foo() {
    foo(); // ❌
}
```

---

### 3. **Stack Use Limits**
eBPF limits stack to **512 bytes**.

Solnix enforces:
- per-function stack usage
- no oversized local arrays
- no unsafe pointer aliasing

---

### 4. **Safe Pointer Usage**
Valid pointers:
- context pointer (e.g., `*xdp_md`)
- map value pointer
- safe stack pointer

Invalid operations are rejected:
- pointer arithmetic on arbitrary memory
- dereferencing non-verifier pointer
- unchecked casts

---

## Map Access Safety

Solnix ensures:
- map keys and values are typed
- lookup returns an `Option` or safe nullable pointer
- out-of-bounds access is prevented

Example:

```solnix
let val = map.lookup(&key);
if val.is_none() {
    return;
}
```

---

## BPF Helpers

Helper functions (e.g., `bpf_printk`, `bpf_map_update_elem`)
must be called with correct argument types.

Invalid helper calls are compile-time errors.

---

## Stack and Frame Safety

- No taking pointer to local frame that outlives scope
- No cross-frame pointer returning
- No pointer arithmetic violating verifier rules

---

## Constant Expression Rules

Loops and array bounds must be expressed with constants.

This ensures:
- verifier can reason about loop bounds
- no dynamic unbounded loops

---

## Error Reporting

When a verifier rule is violated, the compiler
produces a clear error:

```
error: unbounded loop
error: recursive call
error: pointer arithmetic not allowed
```

These errors help developers fix code **before** it reaches the kernel.

---

## Verifier Pipeline Summary

```
Source (.snx)
 ── Parser (AST)
 ── Semantic (Verifier Model)
 ── LLVM IR
 ── LLVM eBPF
 ── ELF Object
```

Only code that **passes the semantic verifier model**
is lowered to IR.

---

## Next Documents

- [compiler-pipeline.md](compiler-pipeline.md)  
- [llvm-backend.md](llvm-backend.md)  
- [elf-layout.md](elf-layout.md)
