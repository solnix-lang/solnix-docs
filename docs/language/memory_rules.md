# memory rules

Rules and constraints for safe memory access in eBPF programs.

---

## Syntax

```snx
if guard(ptr) {
    *ptr = ...;
}
```

---

## Description

- **Guard Rule**: All `heap` pointers obtained from map lookups must be checked for `null` using the `if guard(ptr)` construct before access.
- **Dereference**: Use the `*` operator to access the underlying value of a `heap` pointer.
- **Stack Constraints**: Local `reg` variables are stored in registers or on the stack; stack size is limited (typically 512 bytes).
- **Immutability**: `imm` values are evaluated at compile-time and cannot be modified at runtime.

---

## Example

```snx
heap ptr = my_map.lookup(key);

if guard(ptr) {
    // Verified safe to access
    *ptr = 100;
}
```
