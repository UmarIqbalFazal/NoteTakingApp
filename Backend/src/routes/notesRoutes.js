import { createNote, deleteNote, getAllNotes, updateNote } from "../controllers/notesController.js";

import express from "express";

const router = express.Router();

router.get("/", getAllNotes);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router