# Solnix

A minimal domain-specific language for writing safe and structured eBPF programs.

Solnix compiles to C and targets the Linux eBPF subsystem.

---

## Why Solnix

- Structured syntax for eBPF programs
- Safer memory access
- Clean event-driven design
- Generates verifier-friendly C code

---

## Example

```snx
map events {
    type: .ringbuf,
    max: 1 << 24
}

event exec_event {
    pid: u32,
    filename: bytes[256]
}

unit trace_exec {
    section "tracepoint/syscalls/sys_enter_execve"
    license "GPL"

    reg pid_tgid = ctx.get_pid_tgid()
    reg pid = pid_tgid

    reg filename_ptr = ctx.load_u64(ctx + 16)
    ctx.probe_read_user_str(exec_event.filename, 256, filename_ptr)

    events.emit(exec_event)
}
```

---

## Documentation

- [Language Guide](./language/overview.md)
- [eBPF Model](./ebpf/overview.md)
- [Installation](./installation.md)
- [Examples](./examples/)

---

## Design Goals

- Minimal surface area
- Predictable memory model
- Verifier-safe abstractions
- No hidden runtime

---

## Status

Solnix is under active development.

APIs may change until v1.0.*

---