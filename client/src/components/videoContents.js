import React from "react";
import React, { useState } from "react";
import data from "../exampleresponse.json";
import VideoCard from "./VideoCard";

function VideoContents() {
  const [dataArray, setDataArray] = useState(data);

  function handleDelete(id) {
    console.log(id);
    setDataArray(dataArray.filter((data) => data.id !== id));
  }

  return (
    <div className="row d-flex justify-content-center m-3">
      {data.map((video, index) => {
      {dataArray.map((video, index) => {
        return (
            <><div
                key={video.id}
                className="card col-12 col-md-5 m-5"
                style={{ width: "20rem" }}
            >
                <iframe className="" width="560" height="315" src="https://www.youtube.com/embed/s50vvwTystA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                <div className="card-box">
                    <h5 className="card-name">{video.title}</h5>
                    <p className="card-text">Rating: {video.rating}</p>
                    <button className="btn btn-success">Click</button>
                </div>
            </div><VideoCard key={index} data={video} handleDelete={handleDelete} /></>
        );
      })}
    </div>
  );
}
export default VideoContents;