import React from "react";
import Votes from "./Votes";

function Video(props) {
  console.log(props.data);

  let videoId = "";

  function removeVideo(e) {
    const selectedVideo = e.target.selected;

    props.setter(props.data.filter((video) => video.id !== selectedVideo));
  }

  return props.data.map((video, index) => {
    videoId = video.url.slice(-11);

    return (
      <div class="content">
        <h5 class="title">{video.title}</h5>
        <div class="video">
          <iframe
            width="560"
            height="315"
            src={"https://www.youtube.com/embed/" + videoId}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <Votes data={video.rating} />
        <div class="removeButton">
          <button
            class="btn btn-outline-danger"
            selected={video.id}
            onClick={removeVideo}
          >
            Remove video
          </button>
        </div>
      </div>
    );
  });
}

export default Video;
