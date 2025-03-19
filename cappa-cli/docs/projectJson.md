# Project Tracker

The Project Tracker is an automated documentation tool that generates a project.json file containing key details about your project's structure, dependencies, scripts, environment variables, and more.

This allows you to quickly reference important project details without manually tracking them across multiple files.

## What does this Script Do?

The script in scripts/generateProjectJson.ts collects and organizes details about this project, including:

| Category          | Details                                                                   |
| ----------------- | ------------------------------------------------------------------------- |
| Project Metadata  | Name, version, description, author, creation date                         |
| Stack             | Frontend, backend, database, primary language (TypeScript)                |
| Development Setup | Node.js version, package manager (pnpm/yarn/npm), TypeScript version      |
| Project Structure | Folders in the root directory (e.g., main-site, admin-panel, blog-site)   |
| Dependencies      | Categorized as Astro plugins, React libraries, database tools, and others |  |
| Env. Variables    | Extracted from .env (e.g., PUBLIC_API_URL)                                |
| API Configuration | API endpoints, authentication settings, middleware                        |
| Scripts           | Lists scripts defined in `package.json`                                   |
| Warning & Notes   | Highlights missing configurations, depreciated dependencies, etc.         |
    
The output is a structured project.json file that serves as a quick-reference guide for your project.

## Getting Started

### 1. Install Requirements

The script which generates the Project Tracker JSON requires the following:
- Node.js (Check if it's installed: node -v)
- pnpm (or npm/yarn) (Check: pnpm -v)
- TypeScript & Dependencies (Install if missing)


This command ensures *TypeScript*, node type definitions, *tsx*, and *dotenv* are installed.
```sh
pnpm add -D typescript @types/node tsx dotenv
```

### 2. Run the Script

The script is located in `project-tracker/scripts/generateProjectJson.ts.`

To generate project.json, run:

```sh
pnpm dlx tsx project-tracker/scripts/generateProjectJson.ts
```

### 3. View the Generated `project.json`

After running the script, check the `project.json` file inside project-tracker/.


## Troubleshooting

### Missing pnpm or tsx

If you don’t have pnpm, install it:

```sh
npm install -g pnpm
```

### `project.json` Not Updating

Try running:

```sh
rm -rf project-tracker/project.json
pnpm generate:project
```

