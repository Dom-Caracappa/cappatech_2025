// file: server/routes/contact.mts

import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
    console.log("Contact form data:", req.body);
    return res.status(200).json({ success: true, message: "Contact form accepted!" });
});

export default router;
