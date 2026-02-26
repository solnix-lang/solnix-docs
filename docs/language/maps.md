# map

Global data structures used for persistent state and sharing data between kernel and userspace.

---

## Syntax

```snx
map Name {
    type: .map_kind;
    key: KeyType;
    value: ValueType;
    max: Entries;
}
```

---

## Description

- `type`: The eBPF map type (prefixed with `.`). Supported: `.hash`, `.array`, `.ringbuf`, `.lru_hash`, `.prog_array`, `.perf_event_array`.
- `key`: The primitive data type for the lookup key.
- `value`: The data type for the stored value.
- `max`: Defines the maximum number of entries or buffer size.

---

## Methods

- `lookup(key)`: Returns a `heap` pointer to the value associated with the key.
- `update(key, value)`: Updates or inserts a value for the specified key.
- `reserve(EventName)`: Reserves space in a `ringbuf` for an event of the given type.
- `submit(ptr)`: Commits a reserved `ringbuf` entry for transmission.

---

## Example

```snx
map counters {
    type: .hash;
    key: u32;
    value: u64;
    max: 1024;
}

// In unit:
reg key = 1;
counters.update(key, 100);
heap val = counters.lookup(key);
```
