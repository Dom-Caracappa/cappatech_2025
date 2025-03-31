// main-site/src/pages/api/pricingSubmit.ts

export async function POST({ request }: { request: Request }) {
    try {
        const data = await request.json();

        const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/api/pricing`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        return new Response(JSON.stringify(result), {
            status: response.status,
        });

    } catch (err) {
        console.error("🚨 Astro API Forward Error:", err);
        return new Response(
            JSON.stringify({ success: false, error: "Server error" }),
            { status: 500 }
        );
    }
}
