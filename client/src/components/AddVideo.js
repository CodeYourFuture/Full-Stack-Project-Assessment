import React from "react";
import Videos from "./Videos";

function AddVideo() {
  //   function handleClick() {
  //     console.log("button clicked");
  //   }
  return (
    <div>
      <div className="add-video-container">
        <div className="form">
          <div className="add-video-inputs">
            <div className="input">
              <label>title</label>
              <input type="text" placeholder="type title" />
            </div>
            <div className="input">
              <label>url</label>
              <input type="text" placeholder="type url" />
            </div>
          </div>

          <div className="buttons">
            <button>cancel</button>
            <button>add</button>
          </div>
        </div>
      </div>
      <Videos />
    </div>
  );
}

export default AddVideo;
