import React, { useState, useEffect } from "react";
import Videos from "./Videos";

const BASE_URL = "http://localhost:5000/";

function AddVideoForm() {
  const [videoList, setVideoList] = useState("");

  const getAllVideos = async () => {
    try {
      const response = await fetch(BASE_URL);
      const jsonData = await response.json();
      console.log(jsonData);
      setVideoList(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAllVideos();
  }, []);

  // fetch(BASE_URL)
  //   .then((res) => res.json())
  //   .then((data) => {
  //     setVideoList(data);
  //   });

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
          {videoList === "" ? (
            "Waiting for data"
          ) : (
            <Videos data={videoList} setter={setVideoList} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AddVideoForm;
