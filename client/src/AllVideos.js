import React from "react";
import Video from "./Video";

export default function AllVideos(props) {
  return (
    <div>
      {props.data.map((item) => {
        return (
          <Video
            key={item.id}
            title={item.title}
            Url={item.url.replace("watch?v=", "embed/")}
            videoId={item.id}
          />
        );
      })}
    </div>
  );
}
