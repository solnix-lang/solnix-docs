# Documentation Contribution Guide

Thank you for your interest in improving the Solnix documentation! High-quality docs are essential for a professional programming language.

## Getting Started

Solnix documentation is built using **MkDocs** with the **Material theme**. All content is written in Markdown.

## Contribution Workflow

Fork Repo → Create Branch → Edit .md Files → Local Preview → Submit PR

## Documentation Style

- **Clarity**: Use simple, direct language. Avoid jargon where possible.
- **Consistency**: Follow the existing terminology and formatting.
- **Examples**: Include code snippets for all technical concepts.
- **Visuals**: Use Mermaid diagrams for architecture or workflows.

## Setting Up Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/solnix/solnix-docs.git
   cd solnix-docs
   ```

2. **Install dependencies**:
   ```bash
   pip install mkdocs-material
   ```

3. **Serve the site**:
   ```bash
   mkdocs serve
   ```
   Open `http://localhost:8000` in your browser to see live changes.
