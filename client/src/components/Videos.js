import React from "react";
// import Video from "./Video";
import data from "../data";

function Videos() {
  return data.map((item) => {
    return <Video item={item} />;
  });
}

function Video(props) {
  return (
    <div className="video">
      <h2>{props.item.title}</h2>
      <div className="votes">
        <button>up</button>
        <p>{props.item.rating}</p>
        <button>down</button>
      </div>

      <div>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <button id="remove">remove</button>

      <hr />
    </div>
  );
}

export default Videos;
