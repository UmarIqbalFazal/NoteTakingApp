import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path"

import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const __dirname = path.resolve()

// Connect to MongoDB
connectDB();

// Middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}             // Allow frontend (React) to access backend
app.use(express.json());      // Parse JSON request body

// Routes
app.use("/api/auth", authRoutes);   // signup & login
app.use("/api/notes", notesRoutes); // CRUD for notes

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname,"../Frontend/dist")));

app.get("*",(req,res) => {
  res.sendFile(path.join(__dirname,"../Frontend","dist","index.html"));
});
}

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server successfully running on http://localhost:${PORT}`);
});
