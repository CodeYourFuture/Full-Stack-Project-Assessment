import { slide as Menu } from "react-burger-menu";
import { Link } from "react-scroll";

import "./Header.css";

const Header = () => {
  return (
    <header>
      <Menu right>
        <Link to="add-video-form" smooth={true} duration={500}>
          <span className="menu-link">Adding Form</span>
        </Link>
        <a
          href="https://github.com/leilafarsani/Full-Stack-Project-Assessment"
          target="_blank"
          rel="noopener noreferrer"
          className="menu-link"
        >
          Source Code
        </a>
      </Menu>
      <div className="logo-container">
        <img src="logo.jpg" alt="Logo" className="logo" />
        <h1 className="app-title">Movie App</h1>
      </div>
    </header>
  );
};

export default Header;
