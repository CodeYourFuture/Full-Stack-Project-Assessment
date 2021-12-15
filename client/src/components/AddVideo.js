import React, { useState } from "react";

const AddVideo = ({ videoData, setVideoData }) => {
  const [addVideo, setAddVideo] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleAddVideo = (e) => {
    e.preventDefault();
    const newVideoData = {
      id: Math.floor(Math.random() * 10000),
      title: title,
      url: url,
      rating: 0,
    };
    setVideoData(videoData.concat(newVideoData));
  };

  return (
    <section className="addVideoContainer">
      <button className="btn addVidBtn " onClick={() => setAddVideo(!addVideo)}>
        <h5>Add Video</h5>
      </button>
      {addVideo && (
        <form>
          <div>
            <input
              className="input"
              name="title"
              type="text"
              required
              placeholder="title"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <div>
            <input
              name="url"
              type="text"
              required
              placeholder="url"
              onChange={(e) => setUrl(e.target.value)}
            ></input>
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
