# eBPF Program Types

Solnix supports various eBPF program types, each tailored for specific kernel hook points.

## XDP (eXpress Data Path)
- **When it runs**: At the earliest point in the network driver, before the kernel networking stack processes the packet.
- **Context type**: `struct xdp_md`
- **Typical usage**: High-speed packet filtering, DDoS protection, and load balancing.

## TC (Traffic Control)
- **When it runs**: During the ingress or egress phases of the Linux networking stack.
- **Context type**: `struct __sk_buff`
- **Typical usage**: Traffic shaping, policing, and advanced packet mangling.

## Kprobe & Kretprobe
- **When it runs**: At the entry (kprobe) or exit (kretprobe) of almost any kernel function.
- **Context type**: `struct pt_regs`
- **Typical usage**: Dynamic performance tracing and kernel debugging.

## Tracepoint
- **When it runs**: At pre-defined static tracepoints built into the kernel.
- **Context type**: Specific to the tracepoint.
- **Typical usage**: Stable observability and event logging.

## Raw Tracepoint
- **When it runs**: Similar to tracepoints but with direct access to raw arguments for higher performance.
- **Context type**: `struct bpf_raw_tracepoint_args`
- **Typical usage**: Low-overhead monitoring.
