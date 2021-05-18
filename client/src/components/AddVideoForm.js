import React, { useState, useEffect } from "react";

const AddVideoForm = ({ showAddVideoForm, videoList, setVideoList }) => {
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let newVideo = {
      title: videoTitle,
      url: videoUrl,
      rating: 0,
    };
    /*
     videoList.push(newVideo) returns the index of the new element
     and thus cannot be used in setVideoList function
    */
    setVideoList(() => [...videoList, newVideo]);
    setVideoTitle("");
    setVideoUrl("");
  };

  const handleVideoTitleChange = (event) => {
    setVideoTitle(event.target.value);
  };

  const handleVideoUrlChange = (event) => {
    setVideoUrl(event.target.value);
  };

  return (
    <>
      {showAddVideoForm && (
        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input
              type="text"
              name="title"
              placeholder="Add a Video Title"
              value={videoTitle}
              onChange={handleVideoTitleChange}
            />
          </label>
          <label>
            URL
            <input
              type="url"
              name="url"
              placeholder="Add the Video URL"
              value={videoUrl}
              onChange={handleVideoUrlChange}
            />
          </label>
          <button>Submit</button>
        </form>
      )}
    </>
  );
};

export default AddVideoForm;
