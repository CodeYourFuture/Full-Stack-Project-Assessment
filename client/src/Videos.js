import { useState } from "react";
import Video from "./Video";
import exampleVideos from "./exampleresponse.json";
import { nanoid } from "nanoid";

function Videos() {
  const [videos, setVideos] = useState(exampleVideos);
  function handleOnclick(val) {
    const deletedOneVideo = videos.filter((vid) => vid.title !== val);
    console.log(deletedOneVideo);
    setVideos(deletedOneVideo);
  }
  const displayVideos = videos.map((vid) => {
    return (
      <Video
        key={nanoid()}
        onclick={handleOnclick}
        title={vid.title}
        url={vid.url}
        rating={vid.rating}
      />
    );
  });
  return <div className="videoContainer">{displayVideos}</div>;
}

export default Videos;
