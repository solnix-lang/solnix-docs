# LLVM eBPF Backend

This document explains how Solnix uses **LLVM** to generate eBPF bytecode
and what the compiler frontend must guarantee for correct lowering.

The backend’s responsibility is to transform Solnix’s intermediate
representation (IR) into an eBPF object file that the Linux kernel
verifier will accept.

---

## Why LLVM

LLVM provides:
- Mature optimizations
- A stable eBPF code generator
- Register allocation
- Target-specific lowering
- Object file emission

Using LLVM allows Solnix to focus on **semantic correctness** and
verifier safety without re-implementing a full eBPF backend from scratch.

---

## Targeting eBPF

Solnix emits LLVM IR that is then compiled to eBPF using LLVM’s
backend:

```sh
llc -march=bpf -filetype=obj input.ll -o output.o
```

Possible targets:
- `bpf`        — generic eBPF
- `bpfel`      — little-endian eBPF
- `bpfeb`      — big-endian eBPF

Most Linux systems use **little-endian**, so `bpfel` is common.

---

## What the Frontend Must Guarantee

LLVM’s eBPF backend assumes that:
- All control flow is structured
- Stack usage is computed
- No invalid pointer arithmetic exists
- Only allowed registers and calling conventions are used

The Solnix frontend enforces these properties during semantic analysis
so the LLVM IR it generates is **verifier-friendly**.

---

## ABI & Calling Convention

### Function Signatures

eBPF functions follow a restricted calling convention:
- Arguments passed in registers `r1`–`r5`
- Return value in `r0`

Solnix must generate IR that respects this convention:
- Entry parameter types must match expected types
- No unsupported variadic functions

---

## Register Constraints

eBPF has a fixed register file:
- `r0`        — return value
- `r1`–`r5`   — arguments
- `r6`–`r9`   — callee-saved registers
- `r10`       — frame pointer

LLVM’s backend will allocate registers accordingly, but the frontend must
not generate constructs that break verifier assumptions.

---

## Stack & Alloca

The eBPF verifier enforces a 512-byte stack limit.

The LLVM backend:
- Allocates stack for `alloca` instructions
- Tracks usage
- Rejects IR that exceeds the limit

Solnix must enforce stack bounds and avoid arbitrarily large stack
allocations in the frontend.

---

## Map Metadata & Relocations

Solnix declares BPF maps in LLVM IR with special metadata so that:
- Map definitions get placed in the `.maps` section
- Relocations are created for map file descriptors

Example:

```llvm
@my_map = external global %struct.bpf_map_def
```

A post-linking tool like `llvm-objcopy` or `bpftool` can fix up map
relocations for the loader.

---

## Helper Calls

LLVM IR calls to BPF helper functions must use the correct prototype
so that the verifier sees the right types.

Example:

```llvm
declare i64 @llvm.bpf.pseudo(i64, i64)

; call bpf_map_update_elem
%1 = call i64 @llvm.bpf.pseudo(i64 1, i64 0)
```

Solnix must emit calls that follow verifier expectations.

---

## Optimization Considerations

LLVM provides several optimization passes that are safe for eBPF:

- CFG simplification
- Dead code elimination
- Constant folding
- Inliner (subject to verifier safety)

The Solnix compiler should run a minimal optimization pipeline that does
not break verifier constraints.

---

## Putting It All Together

A typical backend invocation looks like:

```sh
solnix-compiler input.snx -o input.o
llc -march=bpf -filetype=obj input.ll -o output.o
```

The result is an ELF object that can be loaded into the kernel.

---

## Next Documents

- [compiler-pipeline.md](compiler-pipeline.md)
- [elf-layout.md](elf-layout.md)
