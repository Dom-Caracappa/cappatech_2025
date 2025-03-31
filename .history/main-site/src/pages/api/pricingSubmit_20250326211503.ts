// src/pages/api/pricing-submit.ts

import { db } from "../../../../server/db/drizzle.mts";
import { pricingSubmissions } from "../../../../server/db/schema";


export async function POST({ request }: { request: Request }) {
    try {
        const data = await request.json();
        console.log("Received data:", data); // DEBUG

        if (!data.name || !data.email || !data.planTitle) {
            return new Response(
                JSON.stringify({ success: false, error: "All fields are required." }),
                { status: 400 }
            );
        }

        await db.insert(pricingSubmissions).values({
            name: data.name,
            email: data.email,
            planTitle: data.planTitle,
            submitted_at: new Date().toISOString(),
        });
        console.log("DB Insert Result:", result); // DEBUG

        return new Response(
            JSON.stringify({ success: true, message: "Pricing form sent!" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("🔥 SERVER ERROR:", error); // DEBUG
        const errorMessage = error instanceof Error ? error.message : "Unknown error.";
        console.error("Pricing submission error:", errorMessage);
        return new Response(
            JSON.stringify({ success: false, error: errorMessage }),
            { status: 500 }
        );
    }
}
