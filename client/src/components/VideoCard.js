import React, { useContext } from "react";
import { ThumbUp, ThumbDown, DeleteForever } from "@material-ui/icons";
import { VideoContext } from "../contexts/VideoContext";

function VideoCard({ data }) {
  const { dispatch } = useContext(VideoContext);

  return (
    <div
      key={data.id}
      className="card col-12 col-md-3 m-3 p-0"
      style={{ width: "16rem" }}
    >
      <iframe
        className="card-img-top"
        src={`https://www.youtube.com/embed/${data.url.split("watch?v=")[1]}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={data.title}
      />

      <div className="card-body justify-content-between">
        <h1 className="card-title">{data.title}</h1>
        <div className="d-flex justify-content-between">
          <div onClick={() => dispatch({ type: "THUMBUP", payload: data.id })}>
            <ThumbUp />
          </div>
          <h2 className="card-text">Rating: {data.rating}</h2>
          <div
            onClick={() => dispatch({ type: "THUMBDOWN", payload: data.id })}
          >
            <ThumbDown />
          </div>
        </div>
        <div onClick={() => dispatch({ type: "DELETE", payload: data.id })}>
          <DeleteForever fontSize="large" color="secondary" />
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
