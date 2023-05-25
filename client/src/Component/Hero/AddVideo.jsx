import "./addVideo.scss";
const AddVideo = () => {
  return (
    <div className="hero grid">
      <label htmlFor="add_url">url</label>
      <input id="add_url" type="text" />
      <label htmlFor="add_title">title</label>
      <input id="add_title" type="text" />
      <button className="btn">ADD</button>
    </div>
  );
};

export default AddVideo;
