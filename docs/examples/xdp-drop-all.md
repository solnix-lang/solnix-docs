# XDP Packet Dropper

A simple XDP program that counts processed packets and drops all traffic.

---

## Source

```snx
map drop_stats {
    type: .array;
    key: u32;
    value: u64;
    max: 1;
}

unit xdp_drop_all {
    section: "xdp";
    license: "GPL";
    
    reg key = 0;
    heap count = drop_stats.lookup(key);

    if guard(count) {
        *count += 1;
    }

    // Return 2 to DROP the packet
    return 2;
}
```

---

## Demonstrates

- `xdp` program type for high-performance networking
- `array` maps for global counters
- Returning action codes (DROP) to the kernel
