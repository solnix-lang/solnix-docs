# Installation

This guide explains how to install the **Solnix** compiler and CLI on Linux

---

##  Requirements

Before installing Solnix, make sure you have:

- **Linux kernel 5.10+** (required for eBPF support)
- clang (for C backend compilation)
- Rust (for building from source)
- libbpf

---

## Quick Install (Prebuilt Binary)

Download the latest version:

![Latest Version](https://img.shields.io/github/v/release/solnix-lang/solnix-compiler?label=latest&style=flat)

<a href="https://github.com/solnix-lang/solnix-compiler/releases/" target="_blank">
  Download for Linux x86_64
</a>

## Verify

```
solnixc --version

```

## Build From Source

```
git clone https://github.com/solnix-lang/solnix-compiler.git

cd solnix-compiler

cargo build --release

```
**Note:** After successful build, the binary `solnixc` will be generated in `target/release/`

## Post-Install Setup

### Kernel Headers
Ensure kernel headers are installed for your distribution:

```bash
# Ubuntu/Debian
sudo apt install linux-headers-$(uname -r)

# Fedora/RHEL
sudo dnf install kernel-headers kernel-devel

# Arch
sudo pacman -S linux-headers
```