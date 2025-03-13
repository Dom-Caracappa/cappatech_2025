import { defineMiddleware } from "astro/middleware";
import { readFile } from "fs/promises";

export const onRequest = defineMiddleware(async (context, next) => {
    // Authenticate the request
    const authHeader = context.request.headers.get("Authorization");
    const expectedSecret = import.meta.env.VITE_ADMIN_SECRET;

    if (!authHeader || authHeader !== `Bearer ${expectedSecret}`) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    try {
        // Read messages from a JSON file (or use a real DB)
        const messages = JSON.parse(await readFile("data/messages.json", "utf-8"));
        return new Response(JSON.stringify(messages), { headers: { "Content-Type": "application/json" } });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to load messages" }), { status: 500 });
    }
});
