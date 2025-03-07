import { db } from '../../db/db';
import { contactForm } from '../../db/schema';

export async function GET({ request }: { request: Request }) {
    const cookies = request.headers.get('cookie') || '';
    if (!cookies.includes("session=admin-logged-in")) {
        return new Response(
            JSON.stringify({ error: "Unauthorized" }),
            { status: 403 }
        );
    }

    // Fetch messages from the database
    const messages = await db.select().from(contactForm);
    return new Response(JSON.stringify(messages), { status: 200 });
}
