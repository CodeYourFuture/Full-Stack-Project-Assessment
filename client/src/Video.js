import React from "react";
import Votes from "./Votes";

function Video(props) {
  console.log(props.data);

  let videoId = "";

  function removeVideo(e) {
    const selectedVideo = e.target.selected;

    props.setter(props.data.filter((video) => video.id !== selectedVideo));
  }

  return (
    <div>
      {props.data.map((video, index) => {
        videoId = video.url.slice(-11);

        return (
          <div>
            <h4>{video.title}</h4>
            <iframe
              width="{560/1.5}"
              height="{315/1.5}"
              src={"https://www.youtube.com/embed/" + videoId}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button selected={video.id} onClick={removeVideo}>
              Remove video
            </button>
            <Votes data={video.rating} />
          </div>
        );
      })}
    </div>
  );
}

export default Video;
