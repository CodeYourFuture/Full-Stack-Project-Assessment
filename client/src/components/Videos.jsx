import React from "react";
import Rating from "./Rating";

function Videos(props) {
  // Split after '=' get second array allows to get embed!
  let src;
  if (props.videos.video_url) {
    src =
      "https://www.youtube.com/embed/" + props.videos.video_url.split("=")[1];
    console.log(props.videos);
  }
  console.log(props.videos.video_url);

  return (
    <div>
      <div className="container">
        <div
          className="card mb-4 shadow-sm"
          style={{
            background: "black",
            border: "#D43C31 solid",
            margin: "5px",
            padding: "5px",
          }}
        >
          <div>
            <h6 style={{ color: "#D43C31", fontSize: "2rem" }}>
              {props.videos.video_title}
            </h6>
            <span>
              <Rating video={props.videos} />
            </span>
          </div>

          <iframe
            style={{ height: "600px", weihgt: "300px" }}
            className="card-img-top"
            alt={props.videos.Title}
            src={src}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={props.videos.video_title}
          />
        </div>
      </div>
    </div>
  );
}

export default Videos;
