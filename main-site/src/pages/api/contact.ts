// src/pages/api/contact.ts
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();
        console.log("📩 Contact form data received:", data);

        // TODO: Save to DB or forward to admin-panel

        return new Response(JSON.stringify({ success: true, message: "Contact received!" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("❌ Contact form error:", error);
        return new Response(JSON.stringify({ success: false, message: "Server error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};
