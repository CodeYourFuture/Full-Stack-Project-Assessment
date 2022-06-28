import React from "react";
import RenderVideo from "./RenderVideo";

const ListVideos = (props) => {
  return (
    <div>
      <ul className="All-Videos-List">
        {props.data.map((item, index) => {
          return (
            <li key={index}>
              <RenderVideo
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
};

export default ListVideos;
