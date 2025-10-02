import Note from "../models/Note.js";

// GET all notes (only for logged-in user, with  search)
export async function getAllNotes(req, res) {
  try {
    const { q } = req.query; //  search term
    const userId = req.user.id;

    // base filter: only this user's notes
    const filter = { userId };

    // if search query exists, add OR condition
    if (q && q.trim() !== "") {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
        { tags: { $regex: q, $options: "i" } },
      ];
    }

    const notes = await Note.find(filter).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
}

// CREATE a new note
export async function createNote(req, res) {
  try {
    const { title, content, tags } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId,
    });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ error: "Failed to create note" });
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
    res.status(500).json({ error: "Failed to update note" });
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
    res.status(500).json({ error: "Failed to delete note" });
  }
}

// Edit Note

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Failed to load note", error: err.message });
  }
}


