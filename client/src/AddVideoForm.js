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
    <div>
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
        <button type="button" onClick={addVideo}>
          Submit video
        </button>
      </form>
      <Video data={videoList} setter={setVideoList} />;
    </div>
  );
}

export default AddVideoForm;
