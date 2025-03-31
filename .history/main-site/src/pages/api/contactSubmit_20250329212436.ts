import { db } from "../../../../docker/server/app/db/drizzle.mts";
import { contactFormSubmissions } from "../../../../docker/server/app/db/schema";

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
        await db.insert(contactFormSubmissions).values({
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
            submitted_at: new Date().toISOString(),
        });

        return new Response(
            JSON.stringify({ success: true, message: "Message sent successfully." }),
            { status: 200 }
        );

    } catch (error) {
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