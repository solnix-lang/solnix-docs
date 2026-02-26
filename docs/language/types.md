# types

Primitive and complex data types supported by the Solnix language.

---

## Syntax

```snx
// Primitives
u32, u64
i32, i64

// Complex
bytes[N]
Type[N]
```

---

## Description

- **Primitives**: Sized integers (unsigned and signed).
- **bytes[N]**: A raw buffer of `N` bytes.
- **Type[N]**: A fixed-size array containing `N` elements of a specific type.
- Used in `map` definitions, `event` fields, and variable declarations.

---

## Example

```snx
event Log {
    msg: bytes[64];
    counts: u32[4];
    timestamp: u64;
}
```
