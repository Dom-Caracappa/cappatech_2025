// file: server/routes/pricing.mts

import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
    console.log("Pricing form data:", req.body);
    return res.status(200).json({ success: true, message: "Pricing form accepted!" });
});

export default router;
