import React, { useState } from "react";

const AddVideo = ({ videoData, setVideoData }) => {
  const [addVideo, setAddVideo] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleAddVideo = (e) => {
    e.preventDefault();
    const newVideoData = {
      title: title,
      url: url,
    };
    setVideoData(videoData.concat(newVideoData));
  };

  return (
    <section className="addVideoContainer">
      <button className="btn btn-info" onClick={() => setAddVideo(!addVideo)}>
        <h4>Add Video</h4>
      </button>
      {addVideo && (
        <form>
          <div>
            <label>
              Title
              <input
                className="input"
                name="title"
                type="text"
                required
                placeholder="title"
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </label>
          </div>
          <div>
            <label>
              URL
              <input
                name="url"
                type="text"
                required
                placeholder="url"
                onChange={(e) => setUrl(e.target.value)}
              ></input>
            </label>
          </div>
          <div>
            <button
              onClick={() => setAddVideo(!addVideo)}
              className="btn btn-danger"
              type="cancel"
            >
              Cancel
            </button>
            <button
              onClick={handleAddVideo}
              className="btn btn-warning input"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default AddVideo;
