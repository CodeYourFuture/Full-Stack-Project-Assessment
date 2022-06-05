import React from "react";
import data from "./data.json";

export default function ButtonDelete(props) {
  return (
    <div>
      <button
        className="btn bg-info col-sm-12 mb-4"
        /*   onClick={() => handleDelete(data.id)} 
      onClick={() => setVideos((id) => videos.filter((video) => video.id !== id)
    )*/
      >
        Delete
      </button>
    </div>
  );
}
