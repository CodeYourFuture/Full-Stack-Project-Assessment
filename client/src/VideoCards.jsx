import Card from "./Card";

const data = require("./exampleresponse.json");

const VideoCards = () => {
  return (
    <div id="card-container">
      {data.map((video) => (
        <Card video={video} key={video.title} />
      ))}
    </div>
  );
};

export default VideoCards;
