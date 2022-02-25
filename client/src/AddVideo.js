import React, { useState } from "react";

function AddVideo(props) {
  const [addVideo, setAddVideo] = useState({ title: "", url: "", rating: 0 });

  //updates the state of addVideo, with the new video data from input fields
  const addVideoInput = (e) => {
    const inputType = e.target.getAttribute("id");
    const inputValue = e.target.value;
    const newVideo = { ...addVideo };
    newVideo[inputType] = inputValue;
    setAddVideo(newVideo);
  };

  //handles the form submission, for new video data
  const handleSubmit = (e) => {
    e.preventDefault();
    const newVideo = {
      url: addVideo.url,
      title: addVideo.title,
      id: Math.floor(Math.random() * 1000000),
    };
    let updatedVideos = [...props.state, newVideo];
    props.stateUpdate(updatedVideos);
    setAddVideo({ title: "", url: "" });
    //resets the form, clears the input
    let inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
  };

  return (
    <div>
      <h1 className="add-video-title">Add Your Own Soul Video</h1>
      <form onSubmit={handleSubmit} name="addVideo">
        <div>
          <input
            type="text"
            id="title"
            placeholder="Video Title"
            name="name"
            onChange={addVideoInput}
            required
          />
        </div>
        <div>
          <input
            type="text"
            id="url"
            placeholder="YouTube URL"
            onChange={addVideoInput}
            required
          />
        </div>
        <div className="add-button">
          <button>Add Video to list</button>
        </div>
      </form>
    </div>
  );
}

export default AddVideo;
