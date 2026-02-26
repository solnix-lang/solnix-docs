# reg

Local variable declarations that map directly to CPU registers.

---

## Syntax

```snx
reg name = expression;
```

---

## Description

- Declares a register-backed variable.
- Used for arithmetic, logic, and storing results from context helpers.
- Scope is limited to the containing `unit`.
- Values can be modified using assignment operators (`=`, `+=`, etc.).

---

## Example

```snx
reg id = ctx.get_pid_tgid();
reg count = 10;
count += 1;
```
