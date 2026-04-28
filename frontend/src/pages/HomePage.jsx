import { Link } from "react-router";

function HomePage() {
  return (
    <section className="min-h-[calc(100vh-4rem)] bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_40%),linear-gradient(180deg,_rgba(15,23,42,0.03),_transparent)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <div className="badge badge-primary badge-outline">Simple CRUD note app</div>
          <h1 className="max-w-2xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Capture notes fast, then edit or delete them without leaving the page.
          </h1>
          <p className="max-w-xl text-lg text-base-content/70">
            This version uses axios for the backend API and DaisyUI for the UI so you can create, read, update, and delete notes with a clean flow.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/notes" className="btn btn-primary">
              View Notes
            </Link>
            <Link to="/create" className="btn btn-outline">
              Create Note
            </Link>
          </div>
        </div>

        <div className="card border border-base-200 bg-base-100 shadow-2xl">
          <div className="card-body gap-5">
            <div className="stats stats-vertical bg-base-100 shadow sm:stats-horizontal">
              <div className="stat">
                <div className="stat-title">Backend</div>
                <div className="stat-value text-primary">PHP</div>
                <div className="stat-desc">REST-style notes endpoint</div>
              </div>
              <div className="stat">
                <div className="stat-title">Frontend</div>
                <div className="stat-value text-secondary">React</div>
                <div className="stat-desc">Axios + DaisyUI</div>
              </div>
            </div>
            <div className="alert">
              <span>Use the notes page for the full list and inline delete actions.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage