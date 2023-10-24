import React from "react";
import Data from "./exampleresponse.json";

export default function InsertVideos() {
  return (
    <div className="all-videos">
      {Data.map((video, key) => {
        let videoLink = video.url.replace("watch?v=", "embed/")
        return (
          <div className="video" key={key}>
            <p>{video.title}</p>
            <div className="ratings">
              <button className="thumbup">👍</button>
              <p>{video.rating} votes </p>
              <button className="thumbdown">👎</button>
            </div>
            <iframe
              width="400"
              height="315"
              src={videoLink}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <button className="delete-button">Delete</button>
          </div>
        );
      })}
    </div>
  );
}
