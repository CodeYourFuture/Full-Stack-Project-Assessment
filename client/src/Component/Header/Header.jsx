import "./header.scss";
import { useState } from "react";
import { ImVideoCamera } from "react-icons/im";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsFillMenuButtonFill } from "react-icons/bs";

const Header = () => {
  const [active, setActive] = useState("nav_bar");

  const showMenue = () => {
    setActive("nav_bar show_nav_bar");
  };

  const closeMenue = () => {
    setActive("nav_bar");
  };

  return (
    <section className="header_section">
      <header className="header flex">
        <div className="logo_div">
          <a href="#" className="logo flex">
            <h1>
              <ImVideoCamera className="icon" /> My Favorite Videos
            </h1>
          </a>
        </div>

        <div className={active}>
          <ul className="nav_lists flex">
            <li className="navItem">
              <a href="#" className="navLink">
                Home
              </a>
            </li>
            <li className="navItem">
              <a href="#" className="navLink">
                More Videos
              </a>
            </li>
            <li className="navItem">
              <a href="#" className="navLink">
                Add video
              </a>
            </li>
            <li className="navItem">
              <a href="#" className="navLink">
                About
              </a>
            </li>
            <li className="navItem">
              <a href="#" className="navLink">
                contact
              </a>
            </li>
            <button className="btn">Log In</button>
          </ul>

          <div onClick={closeMenue} className="close_nav_bar">
            <AiFillCloseCircle className="icon" />
          </div>
        </div>

        <div onClick={showMenue} className="toggle_nav_bar">
          <BsFillMenuButtonFill className="icon" />
        </div>
      </header>
    </section>
  );
};

export default Header;
