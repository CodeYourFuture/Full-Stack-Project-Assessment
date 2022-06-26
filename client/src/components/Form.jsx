import React from "react";

const Form = ({ setDisplayForm, handleAddFormSubmit, handleAddFormChange }) => {
  return (
    <form onSubmit={handleAddFormSubmit} autocomplete="off">
      <label>
        <input
          type="text"
          name="title"
          placeholder="Enter title..."
          onChange={handleAddFormChange}
          required
        />
      </label>

      <label>
        <input
          type="url"
          name="url"
          placeholder="Enter url..."
          onChange={handleAddFormChange}
          required
        />
      </label>
      <label>
        <input
          type="number"
          name="rating"
          placeholder="Enter rating..."
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
