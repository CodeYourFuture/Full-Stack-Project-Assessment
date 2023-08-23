import { useState } from "react";
import Video from "./Video";
import exampleVideos from "./exampleresponse.json";
import { nanoid } from "nanoid";
import AddVideo from "./AddVideo";

function Videos() {
  const [videos, setVideos] = useState(exampleVideos);
  function handleOnclick(val) {
    const deletedOneVideo = videos.filter((vid) => vid.title !== val);
    setVideos(deletedOneVideo);
  }
  function add(title, url) {
    const addedVideos = videos.slice();
    addedVideos.unshift({ title, url });
    setVideos(addedVideos);
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
  return (
    <div>
      <div>
        <AddVideo add={add} />
      </div>
      <div className="videoContainer">{displayVideos}</div>
    </div>
  );
}

export default Videos;
