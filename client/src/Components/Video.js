import React from "react";
import data from "../exampleresponse.json";
import Votes from "./Votes";

const Video = () => {
  const videoData = data;
  console.log(videoData);

  return (
    <div>
      {videoData.map((item) => {
        return (
          <div>
            <h3>{item.title}</h3>

            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${item.url.slice(-11)}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <Votes />
          </div>
        );
      })}
    </div>
  );
};
export default Video;
