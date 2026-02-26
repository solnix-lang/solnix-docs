# imm

Declarations for immediate values and constants.

---

## Syntax

```snx
imm name = constant_expression;
```

---

## Description

- Defines a named constant or immediate value.
- Expressions are evaluated at compile-time.
- Used for flags, offsets, or configuration values that do not change during execution.

---

## Example

```snx
imm ETH_P_IP = 0x0800;
imm MAX_RETRIES = 5;
```
