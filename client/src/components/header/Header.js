import React from "react";
import { Navbar } from "react-bootstrap";
import SearchVideo from "../video/SearchVideo";

const Header = () => {
  return (
    <div className="header">
      <header className="App-header">
        <h1>Video Recommendation</h1>
        <Navbar>
          <SearchVideo/>
        </Navbar>
      </header>
    </div>
  );
};

export default Header;
