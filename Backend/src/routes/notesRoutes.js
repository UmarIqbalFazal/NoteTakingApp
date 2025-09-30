import express from "express";
import { getAllNotes, createNote, updateNote, deleteNote } from "../controllers/notesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// all note routes are protected
router.get("/", authMiddleware, getAllNotes);
router.post("/", authMiddleware, createNote);
router.put("/:id", authMiddleware, updateNote);
router.delete("/:id", authMiddleware, deleteNote);

export default router;
