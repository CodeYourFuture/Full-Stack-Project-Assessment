import React from "react";
import Video from "./Video";

const VideoList = (props) => {

  return (
    <div className="video-container">
      <ul>
        {props.data.map((example) => {
          return (
            <Video
              id={example.id}
              title={example.title}
              url={example.url.replace("watch?v=", "embed/")}
              rating={example.rating}
              key={example.id}
              delete={props.delete}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default VideoList;
