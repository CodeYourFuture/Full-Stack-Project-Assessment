import React from "react";
import videoData from "../../exampleresponse.json";
import ReactPlayer from "react-player/lazy";
import '../videos/videos.css'

const Videos = () => {
  return (
    <div className="vid-background">
      <div className="videos-div">
        <h1>Videos Component</h1>
        <div className="vid-div">
          {videoData.map((video) => (
            <div key={video.id} className="video-card">
              <ReactPlayer url={video.url} />
              <div>
                <h4>{video.title}</h4>
                <h4>{`Rating: ${video.rating}`}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Videos;
