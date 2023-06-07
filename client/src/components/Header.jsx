import React from "react";

function Header({ orderChange }) {
  return (
    <header>
      <h1>Welcome to Video Server</h1>
      <nav>
        <a href="/">
          <h3>Home</h3>
        </a>
      </nav>
    </header>
  );
}

export default Header;
