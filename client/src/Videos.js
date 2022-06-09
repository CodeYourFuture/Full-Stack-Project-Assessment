import React, { useState } from "react";
import videoData from "./exampleresponse.json";
import Button from "./Buttons";

const Videos = () => {
  const [videos, setVideos] = useState(videoData);

  const deleteVideo = (id) => (e) => {
    e.preventDefault();
    console.log(e.target.id);
    const output = videos.filter((video) => video.id !== parseInt(e.target.id));
    setVideos(output);
  };


  return (
   <div className="container">
      {videos.map((video, index) => {
       const after_ = video.url.substring(video.url.indexOf("=") + 1) 
       console.log(after_)
        return (

          <>
            <div className="card">
              <Button />
              <h2 className="title">{video.title}</h2>

              <iframe
                width="320"
                height="320"
                src={`https://www.youtube.com/embed/${after_}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <span>Ratings: {video.rating}</span>
              <div className="delete--button">
                <button
                  className="button is-rounded dlt"
                  id={video.id}
                  onClick={deleteVideo(videos.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Videos;
