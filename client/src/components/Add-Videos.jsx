const AddVideos = ({ inputsTableVisibility, addToVideos, handleChange }) => {
  return (
    <div className="add-videos-container">
      <form onSubmit={addToVideos} className="add-videos-form">
        <div className="form-row">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            onChange={handleChange}
            name="title"
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="url">URL:</label>
          <input
            type="text"
            id="url"
            onChange={handleChange}
            name="url"
            required
          />
        </div>
        <div className="buttons">
          <button className="cancel-button" onClick={inputsTableVisibility}>
            Cancel
          </button>
          <button type="submit" className="add-button">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddVideos;
