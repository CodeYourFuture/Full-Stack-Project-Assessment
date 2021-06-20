import React from "react";
import data from "../exampleresponse.json";

function VideoContents() {
  return (
    <div className="row d-flex justify-content-center m-3">
      {data.map((video, index) => {
        return (
          <div
            key={video.id}
            className="card col-12 col-md-3 m-3"
            style={{ width: "18rem" }}
          >
            <iframe
              className="card-img-top"
              src={`https://www.youtube.com/embed/${
                video.url.split("watch?v=")[1]
              }`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />

            <div className="card-body">
              <h5 className="card-title">{video.title}</h5>
              <p className="card-text">Rating: {video.rating}</p>
              <button className="btn btn-primary">Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default VideoContents;
