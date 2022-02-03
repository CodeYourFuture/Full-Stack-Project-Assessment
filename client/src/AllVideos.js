import React from "react";
import Video from "./Video";

export default function AllVideos(props) {
  return (
    <div>
      <ul className="video-cards">
        {props.data.map((item) => {
          return (
            <li className="each-card">
              <Video
                key={item.id}
                title={item.title}
                Url={item.url.replace("watch?v=", "embed/")}
                rating={item.rating}
                videoId={item.id}
                delete={props.delete}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
