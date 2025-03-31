import type { APIRoute } from "astro";
import { db } from "@server/db/drizzle.mts";
import { pricingSubmissions } from "@server/db/schema";

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();
        console.log("📨 Received pricing form data:", data); // DEBUG

        // Validate required fields
        if (!data?.name || !data?.email || !data?.planTitle) {
            return new Response(
                JSON.stringify({ success: false, error: "All fields are required." }),
                { status: 400 }
            );
        }

        try {
            const insertResult = await db.insert(pricingSubmissions).values({
                name: data.name,
                email: data.email,
                planTitle: data.planTitle,
                submitted_at: new Date().toISOString(),
            });

            console.log("✅ DB Insert Result:", insertResult); // DEBUG

            return new Response(
                JSON.stringify({ success: true, message: "Pricing form sent!" }),
                { status: 200 }
            );
        } catch (dbError) {
            console.error("❌ DB Insert Error:", dbError);
            return new Response(
                JSON.stringify({ success: false, error: "Database insert failed." }),
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("🔥 Unexpected server error:", error);
        return new Response(
            JSON.stringify({
                success: false,
                error:
                    error instanceof Error ? error.message : "Unknown server error.",
            }),
            { status: 500 }
        );
    }
};
