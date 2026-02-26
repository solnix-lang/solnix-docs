# Process Fork Monitor

Track how many times parent processes fork new children.

---

## Source

```snx
map fork_counter {
    type: .hash;
    key: u32;      
    value: u64;    
    max: 8192;
}

unit trace_fork_monitor {
    section: "tracepoint/sched/sched_process_fork";
    license: "GPL";
    
    // Parent PID is at offset 16 in sched_process_fork
    reg parent_pid = ctx.load_u32(16);

    heap count = fork_counter.lookup(parent_pid);

    if guard(count) {
        *count += 1;
    } else {
        fork_counter.update(parent_pid, 1);
    }

    return 0;
}
```

---

## Demonstrates

- `tracepoint` hook for scheduler events
- `hash` map usage
- Atomic-like updates via `*count += 1` in guarded blocks
