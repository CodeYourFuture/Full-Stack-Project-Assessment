import React from "react";
import Form from "./Form";

function AddVideoForm(props) {
  const [addVideo, setAddVideo] = React.useState("");

  console.log(addVideo);

  function handleAddVideo() {
    console.log("button clicked");
    const form = <Form handleAddNewVideo={props.handleAddNewVideo} />;
    console.log(form);
    setAddVideo(form);
  }

  return (
    <div>
      <div className="add-video-container">
        <button id="btn-add-video" onClick={handleAddVideo}>
          Add video
        </button>
      </div>
      <div>{addVideo}</div>
    </div>
  );
}

export default AddVideoForm;
