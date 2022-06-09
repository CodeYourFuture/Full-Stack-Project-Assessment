import React from "react";

const Header = () => {
  return (
    <header className="Header">
      <div
        className="hamburger"
        // onClick={() => setToggleSidebar(!toggleSidebar)}
      >
        <div className="ham"></div>
        <div className="ham"></div>
        <div className="ham"></div>
      </div>
      <h1>Craig Tube</h1>
    </header>
  );
};

export default Header;
