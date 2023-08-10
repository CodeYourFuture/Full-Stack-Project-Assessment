import React from "react";
import videoData from "../exampleresponse.json";


const Videos = () => {

  return (
    <div className="videos-div">
      <h1>Videos Component</h1>
      <div className="vid-div">
        {videoData.map((video) => (
          <div key={video.id} className="video-card">
            <video controls className="vid-size">
              <source src={video.url} type="video/mp4" />
            </video>
            <div>
              <h4>{video.title}</h4>
              <h4>{`Rating: ${video.rating}`}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;

// <div class="card">
//     <h2>{video.title}</h2>
//     <div className="video">
//       <ReactPlayer url={video.url} controls={true} />
//     </div>
//   </div>
