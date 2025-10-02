import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom"; 
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.error("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <div className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]">
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>

        {/* Tags section */}
        {note.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {note.tags.map((tag, idx) => (
              <span
                key={idx}
                className="badge badge-outline badge-sm text-primary"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>

          <div className="flex items-center gap-2">
            {/* Edit button navigates to edit page */}
            <Link to={`/notes/${note._id}/edit`} className="btn btn-ghost btn-xs">
              <PenSquareIcon className="size-4" />
            </Link>

            {/* Delete button */}
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
