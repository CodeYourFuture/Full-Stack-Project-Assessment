import React, { useState } from "react";
import AddVideoButton from "./AddVideoButton";

const AddVideo = ({ videoData, setVideoData }) => {
  const [addVideo, setAddVideo] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleAddVideo = (e) => {
    e.preventDefault();

    const newVideoData = {
      title: title,
      url: url,
      timePosted: new Date().toLocaleDateString(),
    };
    newVideoData.title && newVideoData.url
      ? setVideoData(videoData.concat(newVideoData))
      : !newVideoData.title
      ? alert("Please provide a title")
      : !newVideoData.url
      ? alert("Please provide a valid url")
      : alert("Sorry, Something went wrong");
  };

  return (
    <section className="addVideoContainer">
      <h4 onClick={() => setAddVideo(!addVideo)}>Add Video</h4>
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
              className="btn btn-warning input"
              type="cancel"
            >
              Cancel
            </button>
            <AddVideoButton onClick={handleAddVideo} />
          </div>
        </form>
      )}
    </section>
  );
};

export default AddVideo;
