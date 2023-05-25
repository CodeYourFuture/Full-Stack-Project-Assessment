function Header({ handleOrderChange }) {
  return (
    <header className="App-header">
      <h1>Rap N B</h1>
      <div className="toggle-btn">
        <span>ASC</span>
        <input type="checkbox" id="switch" />
        <label htmlFor="switch" onClick={handleOrderChange} id="switch-btn">
          Toggle
        </label>
        <span>DESC</span>
      </div>
    </header>
  );
}

export default Header;
