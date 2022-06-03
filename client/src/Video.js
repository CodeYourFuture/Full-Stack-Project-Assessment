import React, { useState } from "react";
import videos from "./exampleresponse.json";
import Votes from "./Votes";

function Video() {
  let videoId = "";

  function removeVideo() {
    console.log("Video remove button clicked");
  }

  return (
    <div>
      {videos.map((video, index) => {
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
            <button>Remove me</button>
            <Votes data={video.rating} />
          </div>
        );
      })}
    </div>
  );
}

export default Video;
