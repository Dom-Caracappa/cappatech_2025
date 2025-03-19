# Fix Dependencies Script

## Overview
This script ensures all dependencies are correctly installed and prevents version conflicts.

## Running the Script
To fix dependencies, run:
```sh
pnpm fix-dependencies
```

## What It Does
- ✅ Scans for missing dependencies.
- 🔄 Installs missing packages automatically.
- ⚖️ Resolves conflicting versions.

## Example Output
```
✅ No conflicting dependencies found!
```
or
```
❌ Missing peer dependency: react@18
✅ Installed missing dependencies.
```

## Troubleshooting
If dependency errors persist:
1. **Delete node_modules and re-install**
   ```sh
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```
2. **Check package versions**
   ```sh
   pnpm list
   ```