import { db } from '../../db/schema';
import { sql } from 'drizzle-orm';

// SECURITY STUFF: Stores last submission timestamps to prevent spam (rate limiting)
const lastSubmissionTime = new Map();

// SECURITY STUFF: Function to sanitize input (defeats XSS & HTML/Script injection)
const sanitizeInput = (input: string) => {
    return input.replace(/[<>]/g, '');
}

// API Handler for POST requests
export async function POST({ request }) {
    try {
        // 1. Parse incoming JSON data
        const data = await request.json();

        // 2. Validate all required fields
        if (!data.name || !data.email || !data.subject || !data.message) {
            return new Response(
                JSON.stringify({ success: false, error: "All fields are required." }),
                { status: 400 }
            );
        }

        // 3. Validate Email Format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return new Response(
                JSON.stringify({ success: false, error: "Invalid email format." }),
                { status: 400 }
            );
        }

        // 4. Honeypot Field
        if (data.hidden_field) {
            return new Response(
                JSON.stringify({ success: false, error: "Spam detected." }),
                { status: 400 }
            );
        }

        // 5. Prevent spam flooding (rate limit per email)
        const now = Date.now();
        const lastTime = lastSubmissionTime.get(data.email) || 0;
        if (now - lastTime < 60000) {
            return new Response(
                JSON.stringify({ success: false, error: "Too many submissions. Try again later." }),
                { status: 429 }
            );
        }
        lastSubmissionTime.set(data.email, now);

        // 6. SECURITY STUFF: Sanitize inputs to prevent XSS & '<' or '>' attacks
        const name = sanitizeInput(data.name);
        const email = sanitizeInput(data.email);
        const subject = sanitizeInput(data.subject);
        const message = sanitizeInput(data.message);

        // 7. Insert data into SQLite database
        await db.run(sql`
            INSERT INTO contact_form (name, email, subject, message)
            VALUES (${name}, ${email}, ${subject}, ${message})
        `);

        // 8. Send success response
        return new Response(
            JSON.stringify({ success: true, message: "Message sent successfully." }),
            { status: 200 }
        );

    } catch (error) {
        // 9. Handle errors
        console.error('Form Submission Error', error);
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            { status: 500 }
        );
    }
}