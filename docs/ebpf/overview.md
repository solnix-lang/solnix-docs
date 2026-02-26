# eBPF Overview

## What is eBPF
eBPF (Extended Berkeley Packet Filter) is a revolutionary technology that allows running sandboxed programs within the Linux kernel without changing kernel source code or loading kernel modules. It provides a safe way to extend kernel functionality for networking, observability, and security.

## Execution Model
eBPF programs are event-driven. They are attached to specific "hook points" in the kernel (such as packet arrival, system calls, or function entries). When the hook point is reached, the eBPF program executes.
- **Hooks**: Entry points like XDP, TC, or Kprobes.
- **Verification**: Programs are strictly checked by the kernel verifier before loading to ensure they won't crash the system.
- **JIT Compilation**: Bytecode is JIT-compiled into native CPU instructions for near-native performance.

## How Solnix Targets eBPF
Solnix provides a high-level domain-specific language that abstracts away the complexities of C-based eBPF development.
1. **Source**: You write Solnix (.snx) code.
2. **Compiler**: `solnixc` parses and lowers the code into an Intermediate Representation (IR).
3. **Backend**: The compiler generates eBPF-compatible C code or bytecode.
4. **Loading**: The resulting object file is loaded into the kernel using standard tools like `iproute2` or `libbpf`.
