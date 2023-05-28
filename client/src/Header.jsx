function Header({ handleOrderChange }) {
  return (
    <header className="App-header">
      <h1>Rap N Blues</h1>
      <nav className="navbar">
        <a href="/" className="click-btn btn">
          <h3>Home</h3>
        </a>
        <a href="/videos" className="click-btn btn">
          <h3>All Videos</h3>
        </a>
      </nav>
    </header>
  );
}

export default Header;
