import React from "react";

const Video = (props) => {
    
    return (
      <div>
        {props.videoData.map((video) => (
          <div>
            <button>{video.rating}</button>
            <iframe
              width="560"
              height="315"
              src= {`https://www.youtube.com/embed/${video.url.split("=")[1]}`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button>Delete</button>
          </div>
        ))}
        ;
      </div>
    );
}

export default Video;