import { useState } from "react";
const AddVideo = ({ addVideo }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    addVideo(title, url);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <h4 className="form-header">Add your favorite video</h4>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <label>Url</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        ></input>
        <button type="submit">Add Video</button>
      </form>
    </div>
  );
};
export default AddVideo;
