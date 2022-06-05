import React, { useState } from "react";
import Video from "./Video";
import videos from "./exampleresponse.json";

function AddVideoForm() {
  const defaultList = videos;
  const [videoList, setVideoList] = useState(defaultList);

  function addVideo(event) {
    let title = document.getElementById("form-title").value;
    let url = document.getElementById("form-url").value;

    setVideoList((video) => {
      videoList.unshift({ id: videoList.length, title, url, rating: 0 });
      return videoList;
    });
  }

  return (
    <div class="container">
      <div class="row">
        <div class="col">
          <form>
            <input
              id="form-title"
              className="form-field"
              type="text"
              placeholder="Video title"
              name="videoTitle"
            />
            <input
              id="form-url"
              className="form-field"
              type="text"
              placeholder="Video URL"
              name="videoUrl"
            />
            <button
              type="button"
              class="btn btn-outline-primary"
              onClick={addVideo}
            >
              Submit video
            </button>
          </form>
        </div>
      </div>

      <div class="col">
        <Video data={videoList} setter={setVideoList} />;
      </div>
    </div>
  );
}

export default AddVideoForm;
