const Form = ({ handleAddFormSubmit, handleAddFormChange, setDisplayForm }) => {
  return (
    <form onSubmit={handleAddFormSubmit}>
      <label>
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Enter title..."
          onChange={handleAddFormChange}
          required
        />
      </label>

      <label>
        {/* Url */}
        <input
          type="url"
          name="url"
          placeholder="Enter url..."
          onChange={handleAddFormChange}
          required
        />
      </label>
      <br />
      <button className="button" onClick={() => setDisplayForm(false)}>
        Cancel
      </button>
      <button className="button" type="submit">
        ADD
      </button>
    </form>
  );
};

export default Form;
