import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pricingRoutes from "./routes/pricing.mts";
import contactRoutes from "./routes/contact.mts";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5042;

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json()); // Allows Express to parse JSON in req.body

// Routes
app.use("/api/pricing", pricingRoutes);
app.use("api/contact", contactRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
