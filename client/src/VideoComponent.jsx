import React from "react";
import Rating from "./Rating";


const VideoComponent = ({ videos, setVideos,  }) => {

  
  // function handleDeleteVideo(videoID) {
    
  //   fetch(`http://localhost:5000/video/${videoID}`, {
  //     method: "DELETE",
  //     headers: {
  //       Content_Type: "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`${videoID} could not be found`);
  //       }
  //       console.log(response);
  //       getAllVideos();
  //     })
  //     .catch((error) => console.log(error));
  // }

 

  const handleDelete = (id) => {
    setVideos(videos.filter((video) => video.id !== id));
  };
  return (
    <div>
      {videos.map((video, index) => (
        <div key={index} className="video-card">
          <h3>{video.title}</h3>
          <iframe
            width="560"
            height="315"
            src={videos.Url}
            title={videos.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <Rating rating={videos.rating} />
          <button onClick={() => handleDelete(video.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default VideoComponent;
