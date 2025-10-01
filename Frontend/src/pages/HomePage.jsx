import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // 🔎 new state for search

  // fetch notes (optionally with query)
  const fetchNotes = async (query = "") => {
    try {
      const url = query ? `/notes?q=${query}` : "/notes";
      const res = await api.get(url);
      setNotes(res.data);
    } catch (error) {
      console.log("Error fetching notes", error.response);
      toast.error("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  // initial fetch
  useEffect(() => {
    fetchNotes();
  }, []);

  // search
  const handleSearch = () => {
    fetchNotes(search.trim());
  };

  // clear search
  const handleClear = () => {
    setSearch(""); // reset input
    fetchNotes(); // fetch all notes again
  };

  // allow pressing Enter in input
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {/* 🔎 Search bar */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="input input-bordered w-full"
          />
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
          {search && (
            <button onClick={handleClear} className="btn btn-ghost">
              Clear
            </button>
          )}
        </div>

        {loading && (
          <div className="text-center text-primary py-10">Loading notes...</div>
        )}

        {notes.length === 0 && !loading && <NotesNotFound />}

        {notes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
