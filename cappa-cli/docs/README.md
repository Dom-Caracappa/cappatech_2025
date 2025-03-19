# CappaTech Project Utilities

## Overview
This repository contains scripts and tools for managing dependencies, generating project metadata, and maintaining consistency across the **CappaTech** project. It includes a **CLI tool** for interacting with common development tasks in an efficient and user-friendly manner.

## Features
- **Dependency Fixer**: Automatically resolves missing and conflicting dependencies in your PNPM workspace.
- **Project Metadata Generator**: Generates a `project.json` file that documents the project's structure, dependencies, and environment.
- **Custom CLI**: Provides a single entry point for running scripts with a fun and interactive interface.

---

## Installation & Setup

1. **Clone the Repository** (if not already set up):
   ```sh
   git clone https://github.com/your-repo/cappatech_2025.git
   cd cappatech_2025
   ```

2. **Install Dependencies**:
   ```sh
   pnpm install
   ```

3. **Ensure Node.js is Installed**:
   ```sh
   node -v
   ```
   _(Recommended: Node.js v18 or higher)_

4. **Run the CLI**:
   ```sh
   pnpm cli
   ```
   This will open an interactive CLI with options to:
   - Fix dependencies
   - Generate `project.json`
   - Run other project-specific tasks

---

## Scripts

### **Fix Dependencies**
Ensures all required dependencies are installed and resolves conflicts.
```sh
pnpm fix-dependencies
```
- Detects missing peer dependencies.
- Installs required versions.
- Forces resolution if necessary.

### **Generate Project Metadata**
Creates a `project.json` file with structured details of the project.
```sh
pnpm generate-project
```
- Captures workspace dependencies.
- Lists installed packages per workspace.
- Tracks API URLs and environment variables.

### **Run CLI**
The **CappaTech CLI** provides a colorful, interactive experience for running commands.
```sh
pnpm cli
```
- Uses ASCII art and colors.
- Provides quick access to common tasks.

---

## Directory Structure

```
📂 cappatech_2025/
 ├── 📂 project-tracker/      # Stores `project.json` and related utilities
 │   ├── generateProjectJson.ts
 │   ├── fixDependencies.ts
 │   ├── cli.ts               # Interactive CLI script
 │   ├── README.md            # Documentation for these utilities
 │   └── 📂 readmes/          # Additional docs for each script
 │       ├── CLI.md
 │       ├── Dependencies.md
 │       ├── ProjectJson.md
 ├── 📂 main-site/            # Primary Astro site
 ├── 📂 admin-panel/          # Admin panel application
 ├── 📂 blog-site/            # Blog system
 ├── package.json             # Root workspace package file
 ├── pnpm-workspace.yaml      # PNPM workspace configuration
 ├── README.md                # You're reading this!
```

---

## Contribution
1. **Fork the repo**
2. **Create a branch** (`git checkout -b feature-name`)
3. **Commit your changes** (`git commit -m "Add feature X"`)
4. **Push to your fork** (`git push origin feature-name`)
5. **Submit a Pull Request**

---

## Future Ideas 💡
- Expand CLI with more automation tools.
- Implement logging and debugging modes.
- Improve dependency resolution logic.

---

