import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
    res.json({ message: "POST request recieved" });
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required." });
    }

    console.log("📩 New Pricing Inquiry:", { name, email, message });

    res.json({ success: true, message: "Request received!" });
});

export default router;
