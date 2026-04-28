import { useState } from "react";
import { useNavigate } from "react-router";
import { createNote } from "../api/notes";

function CreateNote() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      await createNote(form);
      navigate("/notes");
    } catch (requestError) {
      setError(requestError?.response?.data?.error ?? "Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">Create</p>
        <h1 className="text-3xl font-bold">Add a new note</h1>
      </div>

      {error ? <div className="alert alert-error mb-6">{error}</div> : null}

      <form className="card border border-base-200 bg-base-100 shadow-sm" onSubmit={handleSubmit}>
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
              placeholder="Enter note title"
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
              placeholder="Write your note here"
              className="textarea textarea-bordered min-h-44"
              required
            />
          </label>

          <div className="card-actions justify-end">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Saving..." : "Save Note"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default CreateNote