import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import chalk from "chalk";

// Detect the correct shell for cross-platform compatibility
const shellPath = process.platform === "win32"
    ? "cmd.exe"
    : fs.existsSync("/bin/zsh") ? "/bin/zsh" // CappaTech's shell of choice
        : fs.existsSync("/bin/bash") ? "/bin/bash" // Old Faithful
            : "/bin/sh"; // If this doesn't work, how are you running this script?

// Read package.json
const packageJsonPath = path.join(process.cwd(), "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));

// Get installed dependencies
const installedPackagesRaw = execSync("pnpm list --json").toString();
const installedPackages = JSON.parse(installedPackagesRaw);

// Store missing/conflicting dependencies
const missingDependencies: string[] = [];
const conflictingDependencies: string[] = [];

// Helper function to check if a package is installed
const isInstalled = (pkg: string): boolean => {
    return installedPackages.dependencies?.[pkg] ||
        installedPackages.devDependencies?.[pkg] ||
        installedPackages.peerDependencies?.[pkg] ||
        false;
};

// TypeScript packages that require @types/*
const typePackages: Record<string, string> = {
    "better-sqlite3": "@types/better-sqlite3",
    "cookie": "@types/cookie",
    "express": "@types/express"
};

// Function to format dependencies properly for the shell (wraps versions in quotes)
const formatDepsForShell = (deps: string[]) =>
    deps.map(dep => `"${dep}"`).join(" ");

// Function to safely execute shell commands
const runCommand = (command: string) => {
    try {
        console.log(chalk.blue(`\n🚀 Running: ${command}\n`));
        execSync(command, { stdio: "inherit", shell: shellPath });
        console.log(chalk.green("\n✅ Done!\n"));
    } catch (error) {
        console.error(chalk.red(`\n❌ Error executing: ${command}\n`));
        console.error(chalk.red(`⚠️ Error details: ${(error as Error).message}\n`));
        process.exit(1);
    }
};

// Check for missing dependencies
Object.entries(packageJson.dependencies || {}).forEach(([pkg]) => {
    try {
        const packageInfoRaw = execSync(`pnpm info ${pkg} --json`).toString();
        const packageInfo = JSON.parse(packageInfoRaw);

        // Extract peer dependencies
        const peerDeps = packageInfo.peerDependencies || {};
        Object.entries(peerDeps).forEach(([peer, expectedVersion]) => {
            if (!isInstalled(peer)) {
                console.log(chalk.red(`❌ Missing peer dependency: ${peer}@${expectedVersion}`));
                missingDependencies.push(`${peer}@${expectedVersion}`);
            }
        });

    } catch (error) {
        console.error(chalk.red(`⚠️ Error fetching info for ${pkg}:`), error);
    }
});

// Check for conflicts
const peerMeta = packageJson.peerDependenciesMeta || {};
Object.keys(peerMeta).forEach(peer => {
    if (peerMeta[peer]?.optional !== true && isInstalled(peer)) {
        console.log(chalk.red(`⚠️ Conflicting peer dependency: ${peer}`));
        conflictingDependencies.push(peer);
    }
});

// Install missing dependencies (Escape versions properly)
if (missingDependencies.length > 0) {
    console.log(chalk.yellow(`📦 Installing missing dependencies...`));

    const formattedDeps = formatDepsForShell(missingDependencies);
    runCommand(`pnpm add -D ${formattedDeps} --ignore-workspace-root-check`);

    // Install @types dependencies if needed
    const missingTypes = Object.entries(typePackages)
        .filter(([pkg]) => missingDependencies.includes(pkg))
        .map(([, typePkg]) => typePkg);

    if (missingTypes.length > 0) {
        console.log(chalk.yellow(`📦 Installing missing TypeScript types...`));
        runCommand(`pnpm add -D ${formatDepsForShell(missingTypes)} --ignore-workspace-root-check`);
    }

    console.log(chalk.green("✅ Dependencies installed successfully!\n"));
} else {
    console.log(chalk.green("✅ All dependencies are installed.\n"));
}

// Fix conflicting dependencies
if (conflictingDependencies.length > 0) {
    console.log(chalk.yellow("⚠️ Fixing conflicting dependencies..."));
    runCommand("pnpm install --recursive");
    console.log(chalk.green("✅ Conflicts resolved!"));
} else {
    console.log(chalk.green("✅ No conflicting dependencies found!"));
}
