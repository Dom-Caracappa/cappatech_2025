import express from "express";
import { db } from "./db/drizzle.mts";
import { contactFormSubmissions } from "./db/schema";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import pricingRoutes from "../../../server/routes/pricing.mts";

// Get the current file's directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express app
const app = express();
app.use(express.json());
app.use("/api/pricing", pricingRoutes);

// Ensure the database file exists
const dbDir = path.resolve(__dirname, "db");
if (!fs.existsSync(dbDir)) {
  console.log(`Creating database directory: ${dbDir}`);
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.resolve(dbDir, "contact-form.db");
if (!fs.existsSync(dbPath)) {
  console.log(`Creating empty database file: ${dbPath}`);
  fs.writeFileSync(dbPath, ""); // Create an empty file
}

// Define routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Get all submissions
app.get("/api/submissions", async (req, res) => {
  try {
    const submissions = await db.select().from(contactFormSubmissions);
    res.json(submissions);
  } catch (error) {
    console.error("Failed to fetch submissions:", error);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});

// Create a submission
app.post("/api/submissions", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const result = await db.insert(contactFormSubmissions).values({ name, email, subject, message });
    res.status(201).json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    console.error("Failed to create submission:", error);
    res.status(500).json({ error: "Failed to create submission" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
