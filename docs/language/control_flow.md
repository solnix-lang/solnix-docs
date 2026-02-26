# control flow

Branching and termination constructs for eBPF program logic.

---

## Syntax

```snx
// Pointer validation
if guard(heap_ptr) {
    // verified safe block
} else {
    // optional fallback block
}

// Program termination
return expression;
```

---

## Description

- **if guard**: The primary conditional construct. It is used to validate `heap` pointers (map lookup results). 
- **else**: An optional block executed if the `guard` condition fails (pointer is null).
- **return**: Terminates the program execution and returns a status code to the kernel.
- **Return Values**:
  - In `xdp` programs, common values are `1` (PASS) or `2` (DROP).
  - In `kprobe` and other tracing types, the return value is usually `0`.

---

## Example

```snx
heap val = my_map.lookup(key);

if guard(val) {
    *val += 1;
    return 1;
} else {
    return 2;
}
```
