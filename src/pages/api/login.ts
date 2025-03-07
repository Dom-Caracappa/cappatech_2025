import { serialize } from 'cookie';

export async function POST({ request }: { request: Request }) {
    const data = await request.json();

    if (data.username === process.env.ADMIN_USER && data.password === process.env.ADMIN_PASS) {
        const cookie = serialize("session", "admin-logged-in", {
            httpOnly: true,
            maxAge: 60 * 60, // 1 hour
            path: "/"
        });

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: new Headers({ "Set-Cookie": cookie })
        });
    }

    return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
}
