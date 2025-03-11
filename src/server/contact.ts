import express from "express";
import type { Request, Response } from "express";

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
    // TypeScript will now assume req.body has { name, email, message }
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required." });
    }

    console.log("📩 New Contact Form Submission:", { name, email, message });
    res.json({ success: true, message: "Message received!" });
});

export default router;
