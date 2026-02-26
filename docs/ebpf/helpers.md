# eBPF Helpers

eBPF programs interact with the kernel through a stable set of "helper functions" provided by the Linux kernel.

## How Solnix Wraps Helpers
Solnix provides a clean syntax (`ctx.method`) which the compiler automatically maps to the corresponding eBPF helper call with the correct arguments.

## Mapping Table

| Solnix Method | Linux Kernel Helper | Purpose |
| :--- | :--- | :--- |
| `ctx.get_pid_tgid()` | `bpf_get_current_pid_tgid` | Get 64-bit PID and TGID |
| `ctx.get_uid_gid()` | `bpf_get_current_uid_gid` | Get current UID and GID |
| `ctx.get_current_comm()` | `bpf_get_current_comm` | Copy process name to buffer |
| `ctx.get_ktime_ns()` | `bpf_ktime_get_ns` | Get uptime in nanoseconds |
| `ctx.probe_read_user_str()` | `bpf_probe_read_user_str` | Read string from userspace |
| `ctx.probe_read_kernel_str()` | `bpf_probe_read_kernel_str` | Read string from kernel |
| `map.lookup(key)` | `bpf_map_lookup_elem` | Retrieve pointer from map |
| `map.update(key, val)` | `bpf_map_update_elem` | Update or insert map element |

## Implementation
These helpers are essentially system calls for eBPF. Solnix handles the register allocation and calling conventions required by the BPF calling standard (R1-R5 for arguments, R0 for return value).
