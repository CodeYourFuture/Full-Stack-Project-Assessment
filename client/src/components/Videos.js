import React from "react";
import Votes from "./Votes";

function Videos(props) {
  console.log(props);

  let videoId = "";
  let youtubeId = [];

  function removeVideo(e) {
    const selectedVideo = e.target.selected;

    props.setter(props.data.filter((video) => video.id !== selectedVideo));
  }

  return props.data.map((video) => {
    youtubeId = video.url.split("=");
    videoId = youtubeId[1];
    return (
      <>
        <div className="content">
          <h5 className="title">{video.title}</h5>
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
          <div className="removeButton">
            <button
              className="btn btn-outline-danger btn-sm"
              selected={video.id}
              onClick={removeVideo}
            >
              Remove video
            </button>
            <Votes data={video} />
          </div>
        </div>
      </>
    );
  });
}

export default Videos;
