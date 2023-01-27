import React, { useState } from "react";
import "./App.css";

function AddNewVideo({ videoData, setVideoData }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const cancelNewVideo = (event) => {
    event.target.reset();
  }

  const addVideo = (event) => {
    event.preventDefault();
    let id = Math.max(...videoData.filter((v) => v.id)) + 1;
    setTitle(event.target.value);
    setUrl(event.target.value);
    const rating = 0;

    const isUrlValid = (url) => {
      if (url) {
        var regExp =
          /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (url.match(regExp)) {
          return true;
        }
      }
      return false;
    }

    let newVideo = {
      id: id,
      title: title,
      url: url,
      rating: rating,
    };
    let newVideoData = videoData.push(newVideo);
    if (title.length === 0) {
      alert("You need to enter the video title");
    } else if (!isUrlValid) {
      alert("Please enter a valid YouTube URL");
    } else {
      setVideoData(newVideoData);
    }
    // setTitle("");
    // setUrl("");
    event.target.reset();

    console.log("A video is successfully added!");
  };
  return (
    // <div className="">
    //   <button className="add-video-btn">Home</button>
    //   <div className="add-form">
    //     Title<input></input>
    //     URL<input></input>
    //   </div>
    //   <div className="add-cancel-buttons">
    //     <button className="cancel-btn">Cancel</button>
    //     <button className="add-btn">ADD</button>
    //   </div>
    // </div>
    <div className="upper-div">
      <button className="add-video-btn">Add Video</button>
      <div className="add-form">
        <form onSubmit={addVideo}>
          <label>Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter Video Title"
            onChange={(event) => setTitle(event.target.value)}
          ></input>
          <label>URL</label>
          <input
            type="text"
            id="videolink"
            placeholder="Enter the URL"
            onChange={(event) => setUrl(event.target.value)}
          ></input>
          <button className="add-btn">ADD</button>
          <button className="cancel-btn" onClick={cancelNewVideo}>Cancel</button>
        </form>
      </div>
      {/* <div className="add-cancel-buttons"> */}
      {/* </div> */}
    </div>
  );
}

export default AddNewVideo;
