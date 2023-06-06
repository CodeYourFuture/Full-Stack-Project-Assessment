import React from "react";
import Video from "./Video";

export default function VideoList(props) {
  return (
    <div>
      <ul className="Videos-List">
        {props.data.map((item) => {
          return (
            <li key={item.id}>
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
