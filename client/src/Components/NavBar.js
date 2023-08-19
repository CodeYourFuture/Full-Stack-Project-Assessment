const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top">
        <div className="container">
          <a href="#" className="navbar-brand">
            VideoWorld
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#nav-menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="nav-menu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a href="#video" className="nav-link">
                  Video
                </a>
              </li>
              <li className="nav-item">
                <a href="#recommendations" className="nav-link">
                  Recommendations
                </a>
              </li>
              <li className="nav-item">
                <a href="#Contact" className="nav-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default NavBar;
