# Quickstart

This guide walks you through compiling and running your first Solnix eBPF programs.

Solnix programs are written in `.snx` files and compiled using:

solnixc compile program.snx program.o

After compilation, build artifacts are generated in:

.snx/build/

---

# 1 Execve Filename Monitor

This example captures filenames passed to `execve()` using a ring buffer.

File: `execve_filename_monitor.snx`

```bash
map events {  
    type: .ringbuf,  
    max: 1 << 24  
}  
  
event exec_event {  
    pid: u32,  
    filename: bytes[256]  
}  
  
unit trace_exec_filename {  
    section "tracepoint/syscalls/sys_enter_execve"  
    license "GPL"  
  
    reg pid_tgid = ctx.get_pid_tgid()  
    reg pid = pid_tgid  
  
    reg filename_ptr = ctx.load_u64(16)  
  
    heap evt = events.reserve(exec_event)  
  
    if guard(evt) {  
        evt.pid = pid  
        ctx.probe_read_user_str(evt.filename, 256, filename_ptr)  
        events.submit(evt)  
    }  
  
    return 0  
}

```
### Compile

```
solnixc compile execve_filename_monitor.snx execve_filename_monitor.o

```


# 2 Process Exit Counter

Counts how many times each PID exits using a hash map.

File: `sched_process_exit_counter.snx`

```bash
map exit_counter {  
    type: .hash;  
    key: u32;        
    value: u64;      
    max: 8192;  
}  
  
unit trace_exit_monitor {  
    section: "tracepoint/sched/sched_process_exit";  
    license: "GPL";  
      
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
### Compile

```bash
solnixc compile sched_process_exit_counter.snx sched_process_exit_counter.o
```

# 3 Process Fork Counter

Tracks how many forks are triggered per parent PID.

File: `sched_process_fork_monitor.snx`
```bash
map fork_counter {  
    type: .hash;  
    key: u32;        
    value: u64;      
    max: 8192;  
}  
  
unit trace_fork_monitor {  
    section: "tracepoint/sched/sched_process_fork";  
    license: "GPL";  
      
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
### Compile
```bash
solnixc compile sched_process_fork_monitor.snx sched_process_fork_monitor.o
```

# 4 Execve Counter (Hash Map Example)

Counts `execve` calls per PID.

File: `sys_enter_execve.snx`
```bash
map execve_counter {  
    type: .hash;  
    key: u32;  
    value: u64;  
    max: 10240;  
}  
  
unit trace_execve {  
    section: "tracepoint/syscalls/sys_enter_execve";  
    license: "GPL";  
      
    reg pid_tgid = get_pid_tgid();  
    reg pid = pid_tgid;  
      
    heap count_ptr = execve_counter.lookup(pid);  
  
    if guard(count_ptr) {  
        *count_ptr += 1;  
    } else {  
        execve_counter.update(pid, 1);  
    }  
  
    return 0;  
}
```
### Compile
```bash
solnixc compile sys_enter_execve.snx sys_enter_execve.o
```

# Build Output

After compilation:

.snx/  
 └── build/  
      ├── <generated>.c  
      ├── <program>.o  
      └── vmlinux.h

- `.c` → Generated backend C code
    
- `.o` → eBPF ELF object
    
- `vmlinux.h` → Kernel BTF header
    

---

# Loading the Program (Example)

After compilation:

sudo bpftool prog load execve_filename_monitor.o /sys/fs/bpf/execmon

Attach to tracepoint:

sudo bpftool prog attach pinned /sys/fs/bpf/execmon tracepoint syscalls:sys_enter_execve

---

