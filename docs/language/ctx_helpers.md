# ctx helpers

Built-in methods for interacting with the eBPF program context and kernel state.

---

## Syntax

```snx
ctx.method_name(arguments)
```

---

## Description

- Provides access to packet data, process information, and kernel utilities.
- `load_u8/u16/u32/u64`: Loads data from context at an offset (e.g., packet data).
- `get_pid_tgid()`: Returns current PID (high 32 bits) and TGID (low 32 bits).
- `get_uid_gid()`: Returns current UID and GID.
- `get_current_comm()`: Returns the current process name.
- `get_ktime_ns()`: Returns the current kernel time in nanoseconds.
- `probe_read_user_str(dest, size, src)`: Safely reads a string from userspace memory.
- `probe_read_kernel_str(dest, size, src)`: Safely reads a string from kernel memory.
- Availability of specific helpers depends on the `unit` section type (XDP, TC, Kprobe, etc.).

---

## Example

```snx
reg src_port = ctx.load_u16(34);
reg pid = ctx.get_pid_tgid() >> 32;
reg time = ctx.get_ktime_ns();
```
