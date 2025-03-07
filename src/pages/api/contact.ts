import { db } from '../../db/db'; // Ensure correct db file is imported
import { contactForm } from '../../db/schema'; // Import the schema
import { eq } from 'drizzle-orm';

export const prerender = false; // Ensure this route is server-rendered

// SECURITY: Stores last submission timestamps to prevent spam (rate limiting)
const lastSubmissionTime = new Map<string, number>();

// SECURITY: Function to sanitize input (defeats XSS & HTML/Script injection)
const sanitizeInput = (input: string): string => {
    return input.replace(/[<>]/g, '');
};

// API Handler for POST requests
export async function POST({ request }: { request: Request }) {
    try {
        console.log("📩 Incoming contact form submission...");

        // 1️. Ensure the request body exists before parsing
        const text = await request.text();
        if (!text) {
            console.error("❌ No request body received");
            return new Response(
                JSON.stringify({ success: false, error: "Empty request body." }),
                { status: 400 }
            );
        }

        const data = JSON.parse(text);
        console.log("✅ Parsed Form Data:", data);

        // 2️. Validate required fields
        if (!data.name || !data.email || !data.subject || !data.message) {
            console.error("❌ Missing required fields");
            return new Response(
                JSON.stringify({ success: false, error: "All fields are required." }),
                { status: 400 }
            );
        }

        // 3️. Validate Email Format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            console.error("❌ Invalid email format:", data.email);
            return new Response(
                JSON.stringify({ success: false, error: "Invalid email format." }),
                { status: 400 }
            );
        }

        // 4️. Honeypot Field (Stops bots)
        if (data.hidden_field) {
            console.warn("🚨 Spam detected via honeypot");
            return new Response(
                JSON.stringify({ success: false, error: "Spam detected." }),
                { status: 400 }
            );
        }

        // 5️. Rate Limiting (Prevent Flooding)
        const now = Date.now();
        const lastTime = lastSubmissionTime.get(data.email) || 0;
        if (now - lastTime < 60000) {
            console.warn("⏳ Rate limit hit for:", data.email);
            return new Response(
                JSON.stringify({ success: false, error: "Too many submissions. Try again later." }),
                { status: 429 }
            );
        }
        lastSubmissionTime.set(data.email, now);

        // 6️. SECURITY: Sanitize Inputs
        const name = sanitizeInput(data.name);
        const email = sanitizeInput(data.email);
        const subject = sanitizeInput(data.subject);
        const message = sanitizeInput(data.message);

        console.log("📝 Saving to database...");

        // 7️. Save to SQLite Using Drizzle ORM
        await db.insert(contactForm).values({
            name,
            email,
            subject,
            message,
        });

        console.log("✅ Data successfully saved!");

        // 8️. Send Success Response
        return new Response(
            JSON.stringify({ success: true, message: "Message sent successfully." }),
            { status: 200 }
        );

    } catch (error) {
        console.error("🚨 Server error:", error);
        return new Response(
            JSON.stringify({
                success: false,
                error: `Server Error: ${error instanceof Error ? error.message : "Unknown error"}`
            }),
            { status: 500 }
        );
    }
}
