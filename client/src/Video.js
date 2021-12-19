import React from "react";

import data from "./exampleresponse.json";
import Voting from "./voting";
import Search from "./search";
const Video = ({ videos, setVideos }) => {
  return (
    <div>
      {data.map((video, index) => (
        <div className="onevideo">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${video.url.split("=")[1]}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <Voting />
          <Search />
        </div>
      ))}
      ;
    </div>
  );
};

export default Video;
