import React from 'react'
import Rating from './Rating'

function VideoCards(props) {
    let src = "https://www.youtube.com/embed/" + props.video.url.split("=")[1];
  return (
    <>
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
          <h6 style={{ color: "#D43C31" }}>{props.video.title}</h6>
          <span>
            <Rating rt={props.data} v={props.videos} id={props.video} />
          </span>
        </div>

        <iframe
          style={{ height: "500px", weihgt: "200px" }}
          className="card-img-top"
          alt={props.video.Title}
          src={src}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
    </>
  );
}

export default VideoCards
