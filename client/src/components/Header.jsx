import React from "react";

const Header = () => {
  return (
    <header className="App-header">
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#home">
          <img
            src="https://media.istockphoto.com/photos/red-play-icon-button-on-white-background-social-media-and-sign-3d-picture-id1348212541?b=1&k=20&m=1348212541&s=170667a&w=0&h=6L67l228RvKoBbEzcw7LtfZDspPL3AQP4P9QZmeziIQ="
            width="70"
            height="70"
            alt=""
          />
        </a>
        <h1 className=" header-text navbar-text">Video Recommendation</h1>
      </nav>
    </header>
  );
};

export default Header;
