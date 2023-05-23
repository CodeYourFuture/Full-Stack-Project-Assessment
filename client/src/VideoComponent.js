import React, {useState} from "react";
import Rating from "./Rating";


const VideoComponent = ({ data }) => {
  const [videos, setVideos] = useState(data);

  const handleDelete = (id) => {
    setVideos(videos.filter((video) => video.id !== id));
  };
  return (
    <div>
      {videos.map((video, index) => (
        <div key={index} className="video-card">
          <h3>{video.title}</h3>
          <iframe
            src={video.url.replace("watch?v=", "embed/")}
            title={video.title}
          ></iframe>
          <Rating rating={video.rating} />
          <button onClick={() => handleDelete(video.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default VideoComponent;
