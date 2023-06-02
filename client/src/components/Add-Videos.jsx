const AddVideos = ({ inputsTableVisibility, addToVideos, handleChange }) => {
  return (
    <form onSubmit={addToVideos} className="add-video">
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        onChange={handleChange}
        name="title"
        required
      ></input>
      <label htmlFor="url">URL</label>
      <input
        type="text"
        id="url"
        onChange={handleChange}
        name="url"
        required
      ></input>
      <button onClick={inputsTableVisibility}>Cancel</button>
      <button>ADD</button>
    </form>
  );
};
export default AddVideos;
