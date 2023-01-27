import React from "react";
import "./App.css";

function AddNewVideo() {
  return (
    <div className="App">
      <header className="my-App-header">
        <h1>Video Recommendation</h1>
      </header>
      <body>
        <div className="">
          <button className="add-video-btn">Home</button>
          <div className="add-form">
          Title<input></input>
          URL<input></input></div>
          <div className="add-cancel-buttons">
          <button className="cancel-btn">Cancel</button>
          <button className="add-btn">ADD</button>

          </div>
        </div>
        
      </body>
    </div>
  );
}

export default AddNewVideo;
