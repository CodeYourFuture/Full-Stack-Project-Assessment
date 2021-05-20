import React, { useState } from "react";

const AddVideo = ({addVid}) => {
  const [newVideo, setNewVideo] = useState({
    title: '',
    url: '',
    rating: 0
  });

  const onChangeAdd = (e) => {
    const { name, value } = e.target;

    setNewVideo((oldVideo) => {
      return {
        ...oldVideo,
        [name]: value,
      };
    });
  };

  const onSubmit = (e) => {
    addVid(newVideo);
    setNewVideo({
      title: '',
      url: '',
      rating: 0
    });
    e.preventDefault();
  };

  return (
    <form id="addContainer" onClick={onSubmit}>
      <input
        type="text"
        value={newVideo.title}
        name="title"
        placeholder="Enter video title"
        onChange={onChangeAdd}
      />
      <input
        type="text"
        value={newVideo.url}
        name="url"
        placeholder="Enter video URL"
        onChange={onChangeAdd}
      />
      <button type="onSubmit">Add Video</button>
    </form>
  );
};

export default AddVideo;
