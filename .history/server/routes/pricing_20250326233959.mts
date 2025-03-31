import { Router } from "express";
import { db } from "../db/drizzle.mts";
import { pricingSubmissions } from "../db/schema";

const router = Router();

router.post("/", async (req, res) => {
    const { name, email, planTitle } = req.body;
    const submitted_at = new Date().toISOString();

    try {
        const result = await db.insert(pricingSubmissions).values({
            name,
            email,
            planTitle,
            submitted_at,
        });
        console.log("✅ DB Insert Result:", result);
        return res.status(200).json({ success: true, message: "Pricing form accepted!" });
    } catch (err) {
        console.error("❌ DB Insert Error:", err);
        return res.status(500).json({ success: false, error: "Database error" });
        return res.status(200).json({ success: true, message: "Pricing form accepted!" });
    }
});

export default router;
