import nanoid from "nanoid";
import Video from "./Video";
import exampleVideos from "./exampleresponse.json";

function Videos() {
  const displayVideos = exampleVideos.map((vid) => {
    return <Video title={vid.title} url={vid.url} rating={vid.rating} />;
  });
  return <div className="videoContainer">{displayVideos}</div>;
}

export default Videos;
