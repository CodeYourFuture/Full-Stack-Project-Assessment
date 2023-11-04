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
    <header className="header flex">
      <div className="logo_div">
        <a href="#" className="logo flex">
          <ImVideoCamera className="icon" />
          <h1>My Favorite Videos</h1>
        </a>
      </div>

      <div className={active}>
        <ul className="nav_lists flex">
          <li className="nav_item">
            <a href="#" className="nav_link">
              Home
            </a>
          </li>
          <li className="nav_item">
            <a href="#" className="nav_link">
              More Videos
            </a>
          </li>
          <li className="nav_item">
            <a href="#" className="nav_link">
              Add video
            </a>
          </li>
          <li className="nav_item">
            <a href="#" className="nav_link">
              About
            </a>
          </li>
          <li className="nav_item">
            <a href="#" className="nav_link">
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
  );
};

export default Header;
