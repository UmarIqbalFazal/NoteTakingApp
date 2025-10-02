import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../lib/axios";

const EditNotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagsInput, setTagsInput] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        const note = res.data;
        setTitle(note.title || "");
        setContent(note.content || "");
        setTagsInput(note.tags && note.tags.length ? note.tags.join(", ") : "");
      } catch (err) {
        console.error("Error fetching note for edit:", err.response || err.message);
        toast.error("Failed to load note");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    setSaving(true);
    try {
      await api.put(`/notes/${id}`, { title, content, tags });
      toast.success("Note updated!");
      navigate("/"); // go back to list (no detail page)
    } catch (err) {
      console.error("Error updating note:", err.response || err.message);
      toast.error(err.response?.data?.error || "Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading note...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Note</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="input input-bordered w-full"
          required
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows="8"
          className="textarea textarea-bordered w-full"
          required
        />

        <input
          type="text"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="Tags (comma separated)"
          className="input input-bordered w-full"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNotePage;
