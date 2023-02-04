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
    if (!VideoTitle || !VideoUrl) {
      alert("ALl fields must be filled correctly");
      return;
    }
    addNewVideo(newVideo);
  };

  return (
    <div className="new-vid-wrapper">
      <form className="adding-video-form">
        <label>Video Title</label>
        <input required="" type="text" name="name" onChange={handleTitle} />
        <label>Video URL</label>
        <input
          required=""
          type="text"
          name="name"
          label="URL"
          onChange={handleUrl}
        />
      </form>
      <div>
      <button
        onClick={handleSubmit}
        className="btn btn-outline-primary"
        type="submit"
        form="form1"
        value="Submit"
      >
        Add
      </button>
      </div>
      <VideoCard />
    </div>
  );
};

export default AddNewVideo;
