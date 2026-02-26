# Sys Openat Counter

Count how many times each process attempts to open a file.

---

## Source

```snx
map open_counter {
    type: .hash;
    key: u32;
    value: u64;
    max: 10240;
}

unit trace_openat {
    section: "tracepoint/syscalls/sys_enter_openat";
    license: "GPL";
    
    reg pid_tgid = ctx.get_pid_tgid();
    reg pid = pid_tgid;
    
    heap count_ptr = open_counter.lookup(pid);

    if guard(count_ptr) {
        *count_ptr += 1;
    } else {
        open_counter.update(pid, 1);
    }

    return 0;
}
```

---

## Demonstrates

- Syscall entry `tracepoint`
- Using `ctx.get_pid_tgid()` for process identification
- Conditional map updates
