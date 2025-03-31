import { db } from "../../docker/server/app/db/drizzle.mts";
import { pricingSubmissions } from "../../docker/server/app/db/schema";

// List all submissions
export async function listSubmissions() {
    const results = await db.select().from(pricingSubmissions);
    console.table(results);
}

// Add a new submission (for testing or scripting)
export async function addSubmission({ name, email, planTitle }: { name: string; email: string; planTitle: string }) {
    const submitted_at = new Date().toISOString();
    await db.insert(pricingSubmissions).values({ name, email, planTitle, submitted_at });
    console.log("✅ Submission added.");
}

// Clear all submissions
export async function clearSubmissions() {
    await db.delete(pricingSubmissions);
    console.log("🧹 All submissions cleared.");
}

// Export all to JSON
export async function exportSubmissions() {
    const results = await db.select().from(pricingSubmissions);
    console.log(JSON.stringify(results, null, 2));
}
