import React, { useState } from "react";
import videosData from "./exampleresponse.json";
import Button from "./Button";


function Video() {

  const [videos, setVideos] = useState(videosData);
  console.log(videos)

  const handleDelete = (id) => {
    console.log("im clicked")
    console.log(id)
      setVideos((prevVideosData) => prevVideosData.filter((video) => video.id !== id));
    
    };

  return (
    <div>
      <div className="video-container">
        {videos && videos.sort((a , b) => b.rating - a.rating).map((video) => {
            return (
              <div key={video.id}>
                <p>{video.title}</p>
                <iframe
                  width="850"
                  height="400"
                  src={video.url.replace("watch?v=", "embed/")}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title="Youtube Videos"
                  allowFullScreen/>
                <p>
                  <strong>RATINGS: </strong>{video.rating}
                </p>
                <Button video={video}/>
                <br></br>
                <div>
                  <button className="btn-del" onClick={() => handleDelete(video.id)}>Delete 🗑️</button>
                 
                </div>
                <br></br>
                <hr></hr>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Video;
