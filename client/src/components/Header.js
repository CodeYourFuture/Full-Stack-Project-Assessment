import React from "react";
import Video from "./images/Videos2.mp4";

const Header = () => {
  return (
    <header className="App-header">
      <video autoPlay Loop muted className="bg-header">
        <source src={Video} type="video/mp4" />
      </video>
      <section className="section-logo">
        <span className="logo-span">
          <strong>MOVIE</strong>
        </span>
      </section>
      <nav className="nav-auto">
        <a href="/">
          <li>Home</li>
        </a>
        <a href="/features">
          <li>Features</li>
        </a>
        <a href="/pricing">
          <li>Pricing</li>
        </a>
        <a href="/about">
          <li>About</li>
        </a>
      </nav>
    </header>
  );
};

export default Header;
