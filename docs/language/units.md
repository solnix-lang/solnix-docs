# unit

The primary container for eBPF program logic and metadata.

---

## Syntax

```snx
unit Name {
    section: "type";
    license: "License";
    
    // code body
}
```

---

## Description

- Defines an entry point for an eBPF program.
- `section`: Specifies the hook point (e.g., "xdp", "kprobe", "tc").
- `license`: Required by the Linux kernel (e.g., "GPL").
- Contains local variable declarations (`reg`, `imm`, `heap`) and logic.

---

## Example

```snx
unit filter_traffic {
    section: "xdp";
    license: "GPL";
    
    return 1;
}
```
