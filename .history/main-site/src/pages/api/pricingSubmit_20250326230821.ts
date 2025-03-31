// File: main-site/src/pages/api/pricingSubmit.ts

import type { APIRoute } from "astro";

// Get backend server URL from env
const BACKEND_URL = import.meta.env.PUBLIC_SERVER_URL;

export const POST: APIRoute = async ({ request }) => {
    try {
        // Parse form JSON
        const data = await request.json();
        const { name, email, planTitle } = data;

        // Basic validation
        if (!name || !email || !planTitle) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "All fields (name, email, planTitle) are required.",
                }),
                { status: 400 }
            );
        }

        // Attempt form submission to backend
        const backendRes = await fetch(`${BACKEND_URL}/api/pricing`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                planTitle,
                submitted_at: new Date().toISOString(),
            }),
        });

        if (!backendRes.ok) {
            const errorDetails = await backendRes.text();
            throw new Error(
                `❌ Backend error (${backendRes.status}): ${errorDetails}`
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "✅ Pricing form sent successfully!",
            }),
            { status: 200 }
        );
    } catch (err) {
        console.error("❌ API route error:", err);
        return new Response(
            JSON.stringify({
                success: false,
                error: "Server error while submitting pricing form.",
            }),
            { status: 500 }
        );
    }
};
