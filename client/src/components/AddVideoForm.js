import React, { useState } from "react";
import Videos from "./Videos";
import data from "../exampleresponse.json";

function AddVideoForm() {
  const defaultList = data;
  const [videoList, setVideoList] = useState(defaultList);

  function addVideo(event) {
    let title = document.getElementById("form-title").value;
    let url = document.getElementById("form-url").value;

    setVideoList((video) => {
      videoList.push({
        id: videoList.length,
        title,
        url,
        rating: 0,
      });
      return videoList;
    });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-3 form">
          <form>
            <div className="row">
              <label>Title:</label>
              <input
                className="form-field"
                id="form-title"
                type="text"
                placeholder="Video title"
                name="videoTitle"
              />
            </div>
            <div className="row">
              <label>URL:</label>

              <input
                className="form-field"
                id="form-url"
                type="text"
                placeholder="Video URL"
                name="videoUrl"
              />
            </div>
            <div className="row">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={addVideo}
              >
                Submit video
              </button>
            </div>
          </form>
        </div>

        <div className="col-9">
          <Videos data={videoList} setter={setVideoList} />
        </div>
      </div>
    </div>
  );
}

export default AddVideoForm;
