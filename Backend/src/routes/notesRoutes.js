import express from "express";
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/notesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllNotes);
router.post("/", authMiddleware, createNote);
router.get("/:id", authMiddleware, getNoteById); 
router.put("/:id", authMiddleware, updateNote);
router.delete("/:id", authMiddleware, deleteNote);

export default router;
