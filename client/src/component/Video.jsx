import React, { useState, useEffect } from "react";

import DeleteButton from "./DeleteButton";
import Rating from "./Rating";

function Video({ videoData }) {
  const [removedId, setRemovedId] = useState([]);

  function handleClick(id) {
    setRemovedId([...removedId, id]);
  }

  return (
    <div className="videos-Container">
      {videoData
        .filter((movie) => !removedId.includes(movie.id))
        .map((movie) => {
          const { id, title, url, rating } = movie;
          return (
            <div key={id} className="video">
              <div className="iframe_div">
                <iframe
                  width="300"
                  height="215"
                  src={url.replace("watch?v=", "embed/")}
                  title={title}
                ></iframe>
              </div>

              <div>
                <p>Title : {title}</p>
              </div>

              <Rating rating={rating} />
              {/*<DeleteButton videoId={id} />*/}
              <button
                onClick={() => {
                  handleClick(id);
                }}
              >
                Remove
              </button>
            </div>
          );
        })}
    </div>
  );
}
export default Video;
