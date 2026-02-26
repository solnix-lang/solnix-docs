# heap

Variable declarations for pointers that reference memory in eBPF maps.

---

## Syntax

```snx
heap name = map_name.lookup(key);
```

---

## Description

- Stores a pointer to a value in a map.
- Memory is managed by the eBPF map system.
- **Safety**: A `heap` pointer must be verified via `if guard()` before it can be dereferenced.
- Supports indirect modification of map values via the dereference operator `*`.

---

## Example

```snx
heap val = my_map.lookup(key);
if guard(val) {
    *val += 1;
}
```
