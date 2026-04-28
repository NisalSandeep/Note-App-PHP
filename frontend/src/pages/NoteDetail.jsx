import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { deleteNote, fetchNote, updateNote } from "../api/notes";

function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadNote = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchNote(id);
        setNote(data);
        setForm({ title: data.title ?? "", content: data.content ?? "" });
      } catch (requestError) {
        setError(requestError?.response?.data?.error ?? "Failed to load note");
      } finally {
        setLoading(false);
      }
    };

    loadNote();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      await updateNote(id, form);
      setNote((currentNote) => ({ ...currentNote, ...form }));
    } catch (requestError) {
      setError(requestError?.response?.data?.error ?? "Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Delete this note permanently?");
    if (!confirmed) {
      return;
    }

    try {
      await deleteNote(id);
      navigate("/notes");
    } catch (requestError) {
      setError(requestError?.response?.data?.error ?? "Failed to delete note");
    }
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-primary">Note detail</p>
          <h1 className="text-3xl font-bold">Edit your note</h1>
        </div>
        <button type="button" className="btn btn-error btn-outline" onClick={handleDelete}>
          Delete Note
        </button>
      </div>

      {error ? <div className="alert alert-error mb-6">{error}</div> : null}

      {loading ? (
        <div className="flex min-h-64 items-center justify-center">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : note ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <form className="card border border-base-200 bg-base-100 shadow-sm" onSubmit={handleUpdate}>
            <div className="card-body gap-5">
              <label className="form-control">
                <div className="label">
                  <span className="label-text">Title</span>
                </div>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="input input-bordered"
                  required
                />
              </label>

              <label className="form-control">
                <div className="label">
                  <span className="label-text">Content</span>
                </div>
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  className="textarea textarea-bordered min-h-56"
                  required
                />
              </label>

              <div className="card-actions justify-end">
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? "Updating..." : "Update Note"}
                </button>
              </div>
            </div>
          </form>

          <article className="card border border-base-200 bg-base-100 shadow-sm">
            <div className="card-body gap-4">
              <div className="badge badge-secondary badge-outline w-fit">Preview</div>
              <h2 className="card-title text-2xl">{note.title}</h2>
              <p className="whitespace-pre-wrap text-base-content/75">{note.content}</p>
            </div>
          </article>
        </div>
      ) : null}
    </section>
  );
}

export default NoteDetail