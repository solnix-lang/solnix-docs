# Compiler Pipeline

Source (.snx)
 → Lexer (Zig)
 → Parser (AST)
 → Semantic Analysis (Verifier rules)
 → LLVM IR Generation
 → LLVM eBPF Backend
 → ELF Object (.o)
