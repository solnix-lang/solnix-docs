# Process Exit Counter

Count the number of times each process (by PID) exits using a hash map.

---

## Source

```snx
map exit_counter {
    type: .hash;
    key: u32;      
    value: u64;    
    max: 8192;
}

unit trace_exit_monitor {
    section: "tracepoint/sched/sched_process_exit";
    license: "GPL";
    
    // PID is at offset 16 in sched_process_exit
    reg pid = ctx.load_u32(16);

    heap count = exit_counter.lookup(pid);

    if guard(count) {
        *count += 1;
    } else {
        exit_counter.update(pid, 1);
    }

    return 0;
}
```

---

## Demonstrates

- `tracepoint` hooks
- `hash` maps for persistent state
- `lookup` and `update` map methods
- `heap` pointer safety and `guard` blocks
