# Toolchain


The **Solnix toolchain** is responsible for compiling `.snx` source files into eBPF-compatible object files using a C backend generation model.

Currently, the toolchain consists of a single CLI compiler:

solnixc

The compiler is implemented in Rust and generates C code, which is then compiled using Clang into an eBPF object file.

---


## Compiler CLI

The main compiler binary:

solnixc

Check version:

```bash
solnixc --version

```


## Basic Compilation

Compile a Solnix program:

```bash
solnixc compile test.snx test.o
```
### What Happens Internally

When you run the command above:

1. `test.snx` is parsed and validated.
    
2. C backend code is generated.
    
3. Clang compiles generated C code into eBPF bytecode.
    
4. Required kernel headers (vmlinux.h) are included.
    
5. Final ELF object file is produced.
    

---

## Build Output Structure

After compilation, Solnix generates a build directory:

.snx/  
 └── build/  
      ├── test.c  
      ├── test.o  
      └── vmlinux.h

### Generated Files

|File|Description|
|---|---|
|`test.c`|Generated C backend code|
|`test.o`|Compiled eBPF ELF object|
|`vmlinux.h`|Auto-generated BTF header|

---

## Automatic vmlinux.h Generation

If not present, Solnix generates:

.snx/build/vmlinux.h

Using kernel BTF data (via bpftool or system BTF path).

This header enables:

- CO-RE (Compile Once – Run Everywhere)
    
- Kernel struct compatibility
    
- BPF Type Format resolution
    

---

## Default Build Directory

Solnix always creates:

.snx/

This directory contains:

- Intermediate files
    
- Build artifacts
    
- Kernel headers
    
- Cache (future feature)
    

It is recommended to add `.snx/` to `.gitignore`.

---

## Architecture Support

Currently supported:

x86_64

Planned:

arm64

---

## Future Toolchain Expansion

Planned additions:

- `solnixc build` (project mode)
    
- `solnixc run`
    
- `solnixc check`
    
- `solnixc fmt`
    
- Package manager integration
    
- Incremental compilation
    
- Optimized IR passes
    

---

## Summary

Current toolchain includes:

solnixc  →  C backend  →  Clang  →  eBPF ELF object

Output artifacts:

.snx/build/

Solnix keeps the toolchain minimal, explicit, and transparent.