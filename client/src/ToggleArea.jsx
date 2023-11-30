function ToggleArea({ handleOrderChange }) {
  return (
    <section className="order">
      <legend className="order-name">Order Videos</legend>
      <div className="toggle-btn">
        <span>ASC</span>
        <input type="checkbox" id="switch" />
        <label htmlFor="switch" onClick={handleOrderChange} id="switch-btn">
          Toggle
        </label>
        <span>DESC</span>
      </div>
    </section>
  );
}

export default ToggleArea;
