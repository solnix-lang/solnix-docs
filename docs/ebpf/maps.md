# eBPF Maps

Maps are the primary mechanism for eBPF programs to maintain persistent state and communicate with other programs or userspace.

## Supported Map Types
Solnix supports the most common eBPF map structures:
- **.hash**: Key-value store (associative array).
- **.array**: Fixed-size index-based storage.
- **.lru_hash**: Hash map that automatically evicted least recently used items.
- **.ringbuf**: High-performance buffer for streaming data to userspace.
- **.prog_array**: Stores file descriptors for other eBPF programs (used for tail calls).

## Lifetime
- Maps exist independent of the eBPF program's execution.
- They are created when the program object is loaded into the kernel.
- They persist as long as a program or userspace process holds a reference to them.

## Memory Limits
- Map memory is allocated from kernel space (locked memory).
- The `max` field in Solnix defines the limit. Exceeding this limit will cause insertions to fail.
- For `ringbuf`, the size must be a multiple of the kernel page size (usually 4KB).
