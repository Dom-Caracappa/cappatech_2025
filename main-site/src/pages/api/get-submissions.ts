import { db } from '../../db/db';
import { sql } from 'drizzle-orm';

export async function POST({ request }: { request: Request }) {
    try {
        const data = await request.json();

        if (!data.name || !data.email || !data.subject || !data.message) {
            return new Response(
                JSON.stringify({ success: false, error: "All fields are required." }),
                { status: 400 }
            );
        }

        // Insert into database
        await db.run(sql`
            INSERT INTO contact_form (name, email, subject, message)
            VALUES (${data.name}, ${data.email}, ${data.subject}, ${data.message})
        `);

        return new Response(
            JSON.stringify({ success: true, message: "Message sent successfully." }),
            { status: 200 }
        );

    } catch (error) {  // ✅ This now belongs to the try block
        let errorMessage = "An unknown error occurred";

        if (error instanceof Error) {
            errorMessage = error.message;
        }

        console.error("Form submission error:", errorMessage);
        return new Response(
            JSON.stringify({ success: false, error: errorMessage }),
            { status: 500 }
        );
    }
}

