import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <header>
      <nav className="navbar">
        {!token &&
          <>
            <Link to="/"><button className="btn btn-nav">Register</button></Link>
            <Link to="/login"><button className="btn btn-nav">Login</button></Link>
          </>
        }
        {token && <button className="btn btn-nav" onClick={logout}>Logout</button>}
      </nav>
      <h1 className="heading">YouTube Video Manager</h1>
    </header>
  );
}

export default Header;