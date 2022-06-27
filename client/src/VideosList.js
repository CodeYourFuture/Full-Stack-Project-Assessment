import React from "react";
import Video from "./Video";

function VideosList(props) {
  return (
    <div className="video-list-container">
      <ul>
        <li>
          {props.data.map((item) => {
            return (
              <Video
                key={item.id}
                title={item.title}
                url={item.url.replace("watch?v=", "embed/")}
                videoId={item.id}
                delete={props.delete}
              />
            );
          })}
        </li>
      </ul>
    </div>
  );
}

export default VideosList;
