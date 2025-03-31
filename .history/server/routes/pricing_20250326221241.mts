// file: server/routes/pricing.mts

import { Router } from "express";
import { db } from "../db/drizzle.mts";
import { pricingSubmissions } from "../db/schema";

const router = Router();

router.post("/", async (req, res) => {
    const { name, email, planTitle } = req.body;

    // Check required fields
    if (!name || !email || !planTitle) {
        return res.status(400).json({
            success: false,
            error: "All fields (name, email, planTitle) are required.",
        });
    }

    try {
        const result = await db.insert(pricingSubmissions).values({
            name,
            email,
            planTitle,
            submitted_at: new Date().toISOString(),
        });

        console.log("✅ DB Insert Result:", result);

        return res.status(200).json({
            success: true,
            message: "Pricing form accepted!",
        });
    } catch (err) {
        console.error("🔥 DB Insert Error:", err);
        return res.status(500).json({
            success: false,
            error: "Internal server error while submitting form.",
        });
    }
});

export default router;
