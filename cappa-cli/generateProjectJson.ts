import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { execSync } from "child_process";

// Load environment variables
dotenv.config();

// Paths
const rootDir = process.cwd();  // Root project directory
const projectJsonPath = path.join(rootDir, "project-tracker/project.json");

// Function to read and parse a `package.json` file
const readPackageJson = (packagePath: string) => {
    if (fs.existsSync(packagePath)) {
        return JSON.parse(fs.readFileSync(packagePath, "utf8"));
    }
    return null;
};

// Read the root `package.json`
const rootPackageJsonPath = path.join(rootDir, "package.json");
const rootPackageJson = readPackageJson(rootPackageJsonPath) || {};

// Detect subprojects (directories that contain a `package.json`)
const directories = fs.readdirSync(rootDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && !["node_modules", "dist", ".git", "project-tracker"].includes(dirent.name))
    .map(dirent => dirent.name);

const subprojects: Record<string, any> = {};

directories.forEach(dir => {
    const packageJsonPath = path.join(rootDir, dir, "package.json");
    const packageJson = readPackageJson(packageJsonPath);

    if (packageJson) {
        subprojects[dir] = packageJson;
    }
});

// Extract environment variables
const envFilePath = path.join(rootDir, ".env");
const envVariables: Record<string, string> = {};
if (fs.existsSync(envFilePath)) {
    const envData = fs.readFileSync(envFilePath, "utf8").split("\n");
    envData.forEach(line => {
        const [key, value] = line.split("=");
        if (key && value) envVariables[key.trim()] = value.trim();
    });
}

// Detect TypeScript usage
const isTypeScript = "typescript" in (rootPackageJson.devDependencies || {});

// Detect Node.js version
const nodeVersion = execSync("node -v").toString().trim();

// Detect package manager
const packageManager = fs.existsSync("pnpm-lock.yaml")
    ? "pnpm"
    : fs.existsSync("yarn.lock")
        ? "yarn"
        : "npm";

// Merge dependencies across all `package.json` files
const dependencies: Record<string, string> = {};
const devDependencies: Record<string, string> = {};

const mergeDependencies = (pkgJson: any) => {
    if (pkgJson.dependencies) {
        Object.entries(pkgJson.dependencies).forEach(([dep, version]) => {
            dependencies[dep] = version as string;
        });
    }
    if (pkgJson.devDependencies) {
        Object.entries(pkgJson.devDependencies).forEach(([dep, version]) => {
            devDependencies[dep] = version as string;
        });
    }
};

// Merge dependencies from the root and all subprojects
mergeDependencies(rootPackageJson);
Object.values(subprojects).forEach(mergeDependencies);

// Categorize dependencies
const astroPlugins = Object.keys(dependencies).filter(dep => dep.startsWith("@astrojs/"));
const reactLibraries = Object.keys(dependencies).filter(dep => dep.startsWith("@react-three/"));
const databaseTools = Object.keys(dependencies).filter(dep => ["drizzle-orm", "better-sqlite3"].includes(dep));
const backendTools = Object.keys(dependencies).filter(dep => ["express", "cors", "dotenv", "jsonwebtoken"].includes(dep));

// Generate `project.json`
const projectJson = {
    name: rootPackageJson.name || "Unknown Project",
    version: rootPackageJson.version || "0.0.1",
    description: rootPackageJson.description || "No description provided.",
    author: rootPackageJson.author || "Unknown",
    createdAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
    stack: {
        frontend: "Astro + React + TailwindCSS",
        backend: backendTools.length > 0 ? "Express + Node.js" : "Not Detected",
        database: databaseTools.length > 0 ? databaseTools.join(", ") : "Not Detected",
        language: isTypeScript ? "TypeScript" : "JavaScript"
    },
    development: {
        nodeVersion,
        packageManager,
        astroVersion: dependencies["astro"] || "Unknown",
        typescriptVersion: devDependencies["typescript"] || "Unknown"
    },
    structure: directories,
    scripts: rootPackageJson.scripts || {},
    dependencies: {
        astroPlugins,
        reactLibraries,
        backend: backendTools,
        database: databaseTools,
        other: Object.keys(dependencies).filter(
            dep => !astroPlugins.includes(dep) && !reactLibraries.includes(dep) && !databaseTools.includes(dep) && !backendTools.includes(dep)
        )
    },
    devDependencies,
    env: envVariables,
    apiConfig: {
        apiEndpoints: [
            envVariables.PUBLIC_API_URL ? `${envVariables.PUBLIC_API_URL}/api/pricing` : "Not configured"
        ],
        usesAuthentication: !!envVariables.AUTH_SECRET,
        middleware: ["CORS", "Logging", "Rate Limiting"]
    },
    contributors: rootPackageJson.contributors || ["Unknown"],
    subprojects: subprojects, // ✅ Include subproject package.json details
    notes: [
        "This file is auto-generated.",
        "It contains project structure, dependencies, scripts, and environment details.",
        "TypeScript is explicitly tracked.",
        "Backend dependencies (Express, CORS, etc.) are now included.",
        "Development info like Node version and package manager is recorded."
    ]
};

// Write `project.json`
fs.writeFileSync(projectJsonPath, JSON.stringify(projectJson, null, 4));

console.log("✅ `project.json` has been successfully updated in `project-tracker/`!");
