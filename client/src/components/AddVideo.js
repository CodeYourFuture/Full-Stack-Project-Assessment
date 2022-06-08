import React from "react";
import Videos from "./Videos";
import Form from "./Form";
// import Video1 from "../Video1";

function AddVideo() {
  const [addVideo, setAddVideo] = React.useState("");

  console.log(addVideo);
  function handleAddVideo() {
    console.log("button clicked");
    setAddVideo(addVideo);
  }

  return (
    <div>
      <div className="add-video-container">
        <button id="btn-add-video" onClick={handleAddVideo}>
          Add video
        </button>
        <Form />
      </div>
      <div>{addVideo}</div>
      <Videos />
      {/* <Video1 /> */}
    </div>
  );
}

export default AddVideo;
