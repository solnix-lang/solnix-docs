# event

Custom structure definitions used for transmitting data to userspace, typically via ring buffers.

---

## Syntax

```snx
event Name {
    field_name: Type;
    field_name: Type[Size];
}
```

---

## Description

- Defines the layout of data sent from the kernel to userspace.
- Fields support primitive types (`u32`, `u64`, etc.).
- `bytes[N]`: Defines a raw byte buffer of size `N`.
- `Type[N]`: Defines a fixed-size array of the specified type.
- **Access**: Event fields can be accessed or assigned using dot notation: `ptr.field_name = value`.

---

## Example

```snx
event PacketInfo {
    src_ip: u32;
    payload_size: u32;
    signature: bytes[16];
}

// Inside a unit with a reserved ringbuf pointer:
heap evt = sample_rb.reserve(PacketInfo);
if guard(evt) {
    evt.src_ip = ctx.load_u32(26);
    sample_rb.submit(evt);
}
```
