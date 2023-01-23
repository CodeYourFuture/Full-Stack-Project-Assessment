import React from "react";
import Rating from "./Rating";

function Videos(props) {
  // Split after '=' get second array allows to get embed!

  let src = "https://www.youtube.com/embed/" + props.data.url.split("=")[1];

  return (
    <div>
      <div className="container">
        <div
          className="card mb-4 shadow-sm"
          style={{
            background: "black",
            border: "#D43C31 solid",
            margin: "2px",
            padding: "2px",
          }}
        >
          <div>
            <h6 style={{ color: "#D43C31" }}>{props.data.title}</h6>
            <span>
              <Rating video={props.data} />
            </span>
          </div>

          <iframe
            style={{ height: "500px", weihgt: "200px" }}
            className="card-img-top"
            alt={props.data.Title}
            src={src}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
      </div>
    </div>
  );
}

export default Videos;