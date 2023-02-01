import React from "react";
import videos from "../exampleresponse.json";
console.log(videos.length);

const VideoCard = () => {
  return (
    <div className="Cards">
      
      {videos.map((item, i) => {
        <div key={i} className="VideoCard">
          <div className="VideoCard-body">
            <h3>{item.title}</h3>
            <h3>{item.rating}</h3>
            <h3>{item.id}</h3>
            <a
              href={item.url}
              className="btn btn-primary"
            >
              Watch
            </a>
          </div>
        </div>;
      })}
    </div>
  );
};

export default VideoCard;
