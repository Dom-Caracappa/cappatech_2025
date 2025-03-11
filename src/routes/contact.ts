// contact.ts
import express from "express";               // <-- Actual import for Router
import type { Request, Response } from "express"; // <-- Type-only import for req/res

// Create the router using express.Router()
const router = express.Router();

// Define the body type for your request
interface ContactForm {
    name: string;
    email: string;
    message: string;
}

// POST route with typed req.body
router.post("/", (req: Request<{}, {}, ContactForm>, res: Response) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required." });
    }

    console.log("📩 New Contact Form Submission:", { name, email, message });
    res.json({ success: true, message: "Message received!" });
});

export default router;
