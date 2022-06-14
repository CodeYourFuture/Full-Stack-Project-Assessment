import React from "react";
import RenderVideo from "./RenderVideo";

function ListVideos() {
  return (
    <div>
      <ul className="All-Videos-List">
        {data.map((item) => {
          return (
            <li>
              <RenderVideo
                key={item.id}
                title={item.title}
                Url={item.url.replace("watch?v=", "embed/")}
                rating={item.rating}
                videoId={item.id}
                delete={delete}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ListVideos;
