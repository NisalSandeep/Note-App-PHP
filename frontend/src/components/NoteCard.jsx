import { Link } from "react-router";

function NoteCard({ note, onDelete, isDeleting = false }) {
  const preview = note.content.length > 140 ? `${note.content.slice(0, 140)}...` : note.content;

  return (
    <article className="card border border-base-200 bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="card-body gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="card-title text-lg">{note.title}</h2>
            <p className="mt-3 line-clamp-4 text-sm text-base-content/70">
              {preview}
            </p>
          </div>
        </div>

        <div className="card-actions justify-between">
          <Link to={`/notes/${note.id}`} className="btn btn-outline btn-sm">
            View & Edit
          </Link>
          <button
            type="button"
            className="btn btn-error btn-sm btn-outline"
            onClick={() => onDelete(note.id)}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default NoteCard