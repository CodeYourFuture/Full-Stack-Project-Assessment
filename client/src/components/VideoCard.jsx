import React from "react";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function VideoCard(props) {
  const deleteIcon = <DeleteForeverIcon />;

  return (
    <div className="card" style={{ width: "330px", height: "350px" }}>
      <iframe
        width="auto"
        height="315"
        src={`https://www.youtube.com/embed/${props.url.slice(-11)}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div className="card-body">
        <p className="card-text">{props.title}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <button onClick={props.delete}>{deleteIcon}</button>
        </li>
        <li className="list-group-item">{props.rating}</li>
      </ul>
    </div>
  );
}

export default VideoCard;
