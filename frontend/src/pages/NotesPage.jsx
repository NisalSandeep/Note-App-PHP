import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import { deleteNote, fetchNotes } from "../api/notes";

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchNotes();
        setNotes(Array.isArray(data) ? data : []);
      } catch (requestError) {
        setError(requestError?.response?.data?.error ?? "Failed to load notes");
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this note permanently?");
    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      await deleteNote(id);
      setNotes((currentNotes) => currentNotes.filter((note) => note.id !== id));
    } catch (requestError) {
      setError(requestError?.response?.data?.error ?? "Failed to delete note");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-primary">Notes</p>
          <h1 className="text-3xl font-bold">All saved notes</h1>
        </div>
        <div className="badge badge-outline badge-lg">{notes.length} total</div>
      </div>

      {error ? <div className="alert alert-error mb-6">{error}</div> : null}

      {loading ? (
        <div className="flex min-h-64 items-center justify-center">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : notes.length === 0 ? (
        <div className="card border border-dashed border-base-300 bg-base-100">
          <div className="card-body items-center text-center">
            <h2 className="card-title">No notes yet</h2>
            <p className="text-base-content/70">Create your first note to see it appear here.</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={handleDelete}
              isDeleting={deletingId === note.id}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default NotesPage