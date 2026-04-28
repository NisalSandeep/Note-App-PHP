import { Link, NavLink } from "react-router";

function NavBar() {
  return (
    <div className="navbar border-b border-base-200 bg-base-100/80 shadow-sm backdrop-blur">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl tracking-wide">
          NoteApp
        </Link>
      </div>
      <div className="navbar-center hidden gap-2 md:flex">
        <NavLink to="/notes" className="btn btn-ghost btn-sm">
          Notes
        </NavLink>
        <NavLink to="/create" className="btn btn-ghost btn-sm">
          Create
        </NavLink>
      </div>
      <div className="navbar-end">
        <Link to="/create" className="btn btn-primary btn-sm md:btn-md">
          Create Note
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
