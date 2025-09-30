import Note from "../models/Note.js";

// GET all notes (only for logged-in user, with optional search)
export async function getAllNotes(req, res) {
  try {
    const query = req.query.q || ""; // search text
    const userId = req.user.id;

    const notes = await Note.find({
      userId, // only fetch this user's notes
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } }
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// CREATE a new note
export async function createNote(req, res) {
  try {
    const { title, content, tags } = req.body;
    const userId = req.user.id;

    const note = new Note({
      title,
      content,
      tags,
      userId,
    });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// UPDATE a note
export async function updateNote(req, res) {
  try {
    const { id } = req.params;
    const { title, content, tags } = req.body;
    const userId = req.user.id;

    const note = await Note.findOneAndUpdate(
      { _id: id, userId }, // only allow if user owns the note
      { title, content, tags },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ error: "Note not found or not authorized" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// DELETE a note
export async function deleteNote(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const note = await Note.findOneAndDelete({ _id: id, userId });
    if (!note) {
      return res.status(404).json({ error: "Note not found or not authorized" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
