import React, { useState } from "react";
import { nanoid } from "nanoid";

const AddNewVideo = ({ setVideos }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  // const [addVideo, SetAddVideo] = useState(video);

  // const handleAddVideo = (e) => {
  //   e.preventDefault();
  //   const fieldName = e.target.getAttribute("name");
  //   const fieldValue = e.target.value;

  //   const newVideo = { ...addVideo };
  //   newVideo[fieldName] = fieldValue;
  //   SetAddVideo(newVideo);
  // };
  const handleOnSubmit = (e) => {
    e.preventDefault();

    const newVideo = {
      id: nanoid(),
      title: title,
      url: url,
      rating: 0,
    };
    // const allVideos = videos.concat(newVideo);
    setVideos((prevs) => prevs.concat(newVideo));
  };

  return (
    <form onSubmit={handleOnSubmit} className="VideoAdd">
      <input
        type="text"
        id="titleArea"
        value={title}
        name="title"
        placeholder="Video Title:"
        required="required"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        style={{ marginLeft: "20px" }}
        type="text"
        id="urlArea"
        value={url}
        name="url"
        placeholder="Video Url:"
        required="required"
        onChange={(e) => setUrl(e.target.value)}
      />

      <button type="submit" value="submit" className="addButton">
        {" "}
        Add a video
      </button>
    </form>
  );
};
export default AddNewVideo;
