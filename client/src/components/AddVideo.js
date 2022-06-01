import React from "react";
import Videos from "./Videos";
import Form from "./Form";

function AddVideo() {
  //   function handleClick() {
  //     console.log("button clicked");
  //   }
  return (
    <div>
      <div className="add-video-container">
        <button id="btn-add-video">Add video</button>
        <Form />
      </div>
      <Videos />
    </div>
  );
}

export default AddVideo;
