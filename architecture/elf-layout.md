# ELF Layout for Solnix eBPF Programs

This document explains how the Solnix compiler generates **ELF object files** (.o)
from eBPF programs and what sections, metadata, and relocations are required
for the Linux kernel loader.

---

## ELF Overview

ELF (Executable and Linkable Format) is used by the Linux kernel
to load eBPF programs. Solnix emits ELF objects compatible with:

- bpftool
- ip link
- tc

An ELF object for eBPF typically contains:

- `.text`       — eBPF instructions
- `.maps`       — BPF map definitions
- `.license`    — Program license (GPL or BSD)
- `.version`    — Kernel version (optional)
- Relocations   — Fixups for maps and helpers

---

## Sections

### 1. `.text`

- Contains the compiled eBPF bytecode.
- Entry points correspond to program types (XDP, kprobe, tc, etc.).
- Must conform to verifier rules.

Example:

```asm
.section .text,"ax"
.globl xdp_prog
xdp_prog:
    ...
```

---

### 2. `.maps`

- Defines BPF maps used by the program.
- Each map contains:
  - Type (HASH, ARRAY, etc.)
  - Key and value size
  - Max entries
  - Flags

Example:

```c
struct {
    __uint(type, BPF_MAP_TYPE_HASH);
    __uint(max_entries, 1024);
    __type(key, u32);
    __type(value, u64);
} my_map SEC(".maps");
```

Solnix emits metadata so that map offsets and file descriptors can be fixed at load time.

---

### 3. `.license`

The kernel requires a license for programs.

Common values:
- "GPL"
- "BSD"

The license determines whether certain helper functions are allowed.

```asm
.section .license
.string "GPL"
```

---

### 4. `.version`

Optional section specifying the kernel version the program targets.

Used by some verification tools.

```asm
.section .version
.int 0xFFFFFFFE
```

---

### 5. Relocations

`.rel.text` or `.rela.text` sections track references to maps or helper calls.

Required for loaders to resolve:

- Map file descriptors
- Helper addresses

Example:

```llvm
@my_map = external global %struct.bpf_map_def
```

After linking, tools like `bpftool` patch these relocations.

---

## Program Types

Each program type has an entry point:

| Type        | ELF Section |
|-------------|-------------|
| XDP         | .text       |
| TC          | .text       |
| Kprobe      | .text       |
| Tracepoint  | .text       |

The compiler ensures that:

- Entry points have correct calling conventions
- Context pointer types are correct
- Stack and register usage conform to verifier rules

---

## Putting It Together

```
ELF Object (.o)
├─ .text        : eBPF instructions
├─ .maps        : BPF map metadata
├─ .license     : Program license
├─ .version     : Kernel version
└─ Relocations  : Map / helper fixups
```

---

## Loading the ELF

Once compiled, ELF objects can be loaded using:

```bash
# Example for XDP
sudo ip link set dev eth0 xdp obj xdp_prog.o sec xdp_prog

# Using bpftool
sudo bpftool prog load xdp_prog.o /sys/fs/bpf/xdp_prog
```

Solnix ensures that all sections, maps, and relocations conform to
verifier and loader requirements.

---

## Next Documents

- compiler-pipeline.md
- verifier-model.md
- llvm-backend.md
