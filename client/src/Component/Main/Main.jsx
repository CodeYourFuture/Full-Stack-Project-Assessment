import videosData from "../../data/exampleresponse.json";
import VideoCard from "./VideoCard";
const Videos = () => {
  return (
    <div className="main_container">
      {videosData.map((video) => (
        <VideoCard video={video} />
      ))}
    </div>
  );
};

export default Videos;
