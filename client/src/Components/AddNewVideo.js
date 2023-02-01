import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import VideoCard from "./VideoCard";

const AddNewVideo = ({ addNewVideo }) => {
  const [VideoTitle, setVideoTitle] = useState("");
  const [VideoUrl, setVideoUrl] = useState("");

  const handleTitle = (e) => {
    setVideoTitle(e.target.value);
  };

  const handleUrl = (e) => {
    let VideoUrl = e.target.value;
    setVideoUrl(VideoUrl);

    let urlCheck =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVideo = {
      id: uuidv4(),
      title: VideoTitle,
      url: VideoUrl,
      rating: 0,
    };
    addNewVideo(newVideo);
    if (!VideoTitle || !VideoUrl) {
      alert("ALl fields must be filled correctly");
      return false;
    }
  };

  return (
    <div className="new-vid-wrapper">
      <form className="adding-video-form">
        <label>
          Video Title:
          <input required="" type="text" name="name" onChange={handleTitle} />
        </label>
        <label>
          Video URL:
          <input
            required=""
            type="text"
            name="name"
            label="URL"
            onChange={handleUrl}
          />
        </label>
      </form>
      <button
        onClick={handleSubmit}
        className="btn btn-primary"
        type="submit"
        form="form1"
        value="Submit"
      >
        Add
      </button>
      <VideoCard />
    </div>
  );
};

export default AddNewVideo;
