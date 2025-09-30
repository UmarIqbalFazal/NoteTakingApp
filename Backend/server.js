import express from "express";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";

dotenv.config();


const app = express();

connectDB();

app.use("/api/notes", notesRoutes);

app.listen(5001, () =>{
    console.log("Server started on PORT: 5001");
});