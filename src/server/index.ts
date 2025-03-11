// index.ts
import express from "express";
import contactRoutes from "../routes/contact"; // The file above

const app = express();
const PORT = process.env.PORT || 5000;

// Enable JSON body parsing
app.use(express.json());

// Use the router
app.use("/api/contact", contactRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
