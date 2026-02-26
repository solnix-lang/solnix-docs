# eBPF Limitations

While eBPF is powerful, it operates under strict constraints to guarantee kernel safety and performance.

## Resource Limits
- **Stack size**: Strictly limited to 512 bytes.
- **Dynamic Allocation**: There is no `malloc` or `free`. All memory must be pre-allocated via maps or the stack.
- **Recursion**: Recursion is strictly forbidden to prevent stack overflow.

## Execution Limits
- **Loops**: Loops must be bounded and detectable by the verifier at load time. Solnix encourages unrolled or simple bounded iterations.
- **Instruction Count**: There is a limit on the number of non-branch instructions in a single program path (historically 4k, modern kernels allow up to 1M).
- **Execution Time**: Programs must run to completion quickly to avoid stalling the kernel.

## Contextual Restrictions
- Not all helpers are available to all program types (e.g., packet mangling is restricted to XDP and TC ingress).
- Certain program types (like Kprobes) cannot access network packet data directly without going through specific memory probes.

## Floating Point
- eBPF does not support floating-point arithmetic. Use integer arithmetic and scaling if decimal values are needed.
