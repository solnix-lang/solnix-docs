# Architecture


## Pipeline Design

```mermaid
graph TD
    A["Solnix Source Code"] --> B["Lexer + Parser"]
    B --> C["AST Builder"]
    C --> D["Semantic Safety Validator (eBPF rules)"]
    D --> E["Intermediate Representation (IR)"]
    E --> F["C Code Backend Generator"]
    F --> G["Generate .o Object File"]
```

## Backend Strategy

- Compiler directly emits C source code  
- Kernel eBPF program struct and logic are generated in C  
- Lightweight translation layer only    

## Implementation Stack

- Compiler Core → Rust  
- Output Target →  C backend code  
- Verification → Built-in Solnix safety checker

---

### Help Us Build Solnix
Interested in working on the parser, IR, or backend? Check out our [Compiler Contribution Guide](../contributing/compiler-contrib.md) to get started!
