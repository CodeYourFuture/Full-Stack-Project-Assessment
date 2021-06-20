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
      {dataArray.map((video, index) => {
        return (
          <VideoCard key={index} data={video} handleDelete={handleDelete} />
        );
      })}
    </div>
  );
}

export default VideoContents;
