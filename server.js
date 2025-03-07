import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contact.js"; // Import API route

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow frontend to talk to backend
app.use(express.json()); // Parse JSON requests

// Routes
app.use("/api/contact", contactRoutes); // Connect API

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
