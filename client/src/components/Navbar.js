import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink to="/">
            <span>All Videos</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/search">
            <span>Search</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-video">
            <span>Add Video</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
