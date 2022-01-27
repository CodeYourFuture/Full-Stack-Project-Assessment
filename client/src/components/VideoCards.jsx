import { useState } from "react";
import Card from "./Card";

const data = require("../data/exampleresponse.json");

const VideoCards = () => {
  const [dataCopy, setDataCopy] = useState(data);

  // @param {int} - videoID will always match the video.id in the database
  // filters the data to remove the video the user clicked on
  const removeVideo = (videoID) =>
    setDataCopy((data) => data.filter((video) => video.id !== videoID));

  return (
    <div id="card-container">
      {dataCopy.map((video) => (
        <Card video={video} key={video.title} clickEvent={removeVideo} />
      ))}
    </div>
  );
};

export default VideoCards;
