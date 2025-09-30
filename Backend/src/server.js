import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());              // Allow frontend (React) to access backend
app.use(express.json());      // Parse JSON request body

// Routes
app.use("/api/auth", authRoutes);   // signup & login
app.use("/api/notes", notesRoutes); // CRUD for notes

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
