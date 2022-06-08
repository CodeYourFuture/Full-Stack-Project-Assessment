import React from "react";
import videos from "./exampleresponse.json";

function Video1() {
  let videoId = "";
  return (
    <div>
      {videos.map((video) => {
        videoId = video.url.slice(-11);
        return (
          <div>
            <h4>{video.title}</h4>
            <iframe
              width="560"
              height="315"
              src={"https://www.youtube.com/embed/" + videoId}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p>Votes: {video.rating}</p>
            <button>Remove me</button>
          </div>
        );
      })}
    </div>
  );
}

export default Video1;
