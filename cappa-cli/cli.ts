#!/usr/bin/env node

import chalk from "chalk";
import figlet from "figlet";
import inquirer from "inquirer";
import { execSync } from "child_process";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

// 🛠️ Required Dependencies
const requiredPackages = ["ts-node", "inquirer", "figlet", "chalk"];

// Get current directory (ESM-compatible)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Function to check and install missing dependencies before executing CLI.
 */
const checkDependencies = () => {
    console.log(chalk.yellow("🔍 Checking required dependencies...\n"));

    let installedDeps: Set<string>;
    try {
        const installedPackages = JSON.parse(execSync("pnpm list --depth 0 --json").toString());
        installedDeps = new Set(installedPackages.map((pkg: any) => pkg.name));
    } catch (error) {
        console.error(chalk.red("⚠️ Error checking installed dependencies. Ensure pnpm is installed."));
        process.exit(1);
    }

    // Find missing dependencies
    const missingDeps = requiredPackages.filter(dep => !installedDeps.has(dep));

    if (missingDeps.length > 0) {
        console.log(chalk.red(`❌ Missing dependencies detected: ${missingDeps.join(", ")}`));
        console.log(chalk.yellow("📦 Installing missing dependencies...\n"));

        try {
            execSync(`pnpm add -D ${missingDeps.join(" ")} --workspace-root`, { stdio: "inherit" });
            console.log(chalk.green("✅ Dependencies installed successfully!\n"));
        } catch (error) {
            console.error(chalk.red("\n❌ Error installing dependencies."));
            console.log(chalk.yellow("\n💡 If the issue persists, manually run:"));
            console.log(chalk.cyan(`\n pnpm add -D ${missingDeps.join(" ")} --workspace-root\n`));
            process.exit(1);
        }
    } else {
        console.log(chalk.green("✅ All required dependencies are installed.\n"));
    }
};

// Run dependency check at startup
checkDependencies();

/**
 * Determines the correct shell for cross-platform compatibility.
 */
const detectShell = () => {
    return os.platform() === "win32" ? "cmd.exe" : "/bin/bash";
};

/**
 * Executes shell commands and handles errors gracefully.
 * @param command - The command to execute.
 */
const runCommand = (command: string) => {
    try {
        console.log(chalk.blue(`\n▶ Running: ${command}\n`));
        execSync(command, { stdio: "inherit", shell: detectShell() });
        console.log(chalk.green("\n✅ Done!\n"));
    } catch (error: any) {
        console.error(chalk.red(`\n❌ Error executing: ${command}\n`));
        console.error(chalk.red(`⚠️ Error details: ${error.message}\n`));
    }
};

// 🎨 CLI ASCII Banner
console.log(chalk.cyan(figlet.textSync("CappaTech CLI")));
console.log(chalk.green("\n✨ Welcome to CappaTech Project Manager\n"));

// 📜 Menu Options (Loop Until Exit)
const menu = async () => {
    let exitSelected = false;

    while (!exitSelected) {
        const { action } = await inquirer.prompt([
            {
                type: "list",
                name: "action",
                message: "Choose an action:",
                choices: [
                    { name: "🔧 Fix Dependencies", value: "fix-dependencies" },
                    { name: "📄 Generate project.json", value: "generate-project" },
                    { name: "🧹 Clean Cache", value: "clean-cache" },
                    { name: "❌ Exit", value: "exit" },
                ],
            },
        ]);

        switch (action) {
            case "fix-dependencies":
                runCommand(`pnpm ts-node ${path.join(__dirname, "fixDependencies.ts")}`);
                break;
            case "generate-project":
                runCommand(`pnpm ts-node ${path.join(__dirname, "generateProjectJson.ts")}`);
                break;
            case "clean-cache":
                runCommand("pnpm clean");
                break;
            case "exit":
                exitSelected = true;
                console.log(chalk.yellow("\n👋 Exiting... Have a great day!\n"));
                break;
        }
    }
};

// 🚀 Start the Menu
menu();
