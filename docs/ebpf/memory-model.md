# eBPF Memory Model

Understanding the different memory regions available to eBPF programs is key to writing efficient and verifiable code.

## Stack Memory
- Local variables declared with `reg` or `imm` occupy registers or a small portion of the stack.
- **Size**: 512 bytes maximum.
- **Usage**: Small counters, temporary constants, and pointers.

## Map Memory
- Reserved via the `map` keyword.
- Resides outside the program stack.
- Accessible via the `heap` keyword in Solnix.
- **Usage**: Persistent state, large tables, and cross-invocation data.

## Ring Buffer Memory
- Specialized memory for passing events to userspace.
- Programs "reserve" a chunk, fill it, and "submit" it.
- Shared with userspace via a memory-mapped buffer.

## Kernel vs. User Memory
- eBPF programs run in kernel space. They cannot directly dereference userspace pointers.
- To read from userspace (e.g., in a syscall tracepoint), you must use "probe read" helpers: `ctx.probe_read_user_str`.

## Pointer Safety
All memory access must be bounded and verified. Solnix enforces this through its `heap` pointer rules and the `if guard` safety block.
