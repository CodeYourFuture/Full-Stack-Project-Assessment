import React from "react";
import Videos from "./Videos";
import Form from "./Form";

function AddVideo() {
  const [result, setResult] = React.useState(1);
  console.log(result);
  function handleClick() {
    console.log("button clicked");
    setResult(2);
  }
  return (
    <div>
      <div className="add-video-container">
        <button id="btn-add-video" onClick={handleClick}>
          Add video
        </button>
        <Form />
      </div>
      <div>{result}</div>
      <Videos />
    </div>
  );
}

export default AddVideo;
