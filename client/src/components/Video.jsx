import React, { useState } from "react";

const Video = ({ videos, handleDeleteClick }) => {
  const [count, setCount] = useState(25);

  
  return videos.map((video) => {
    const { id, title, url } = video;
    const base_url = "https://www.youtube.com/embed/";
    return (
      <div className="wrapper" key={id}>
        <h2>{title}</h2>
        <div>
          <button onClick={() => setCount(count + 1)}>Up Vote</button> {count}
          <button onClick={() => setCount(count - 1)}>Down Vote</button>
        </div>
        <iframe
          width="350"
          height="315"
          src={base_url + url.slice(-11)}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div>
          <button type="button" onClick={() => handleDeleteClick(video.id)}>
            delete
          </button>
        </div>
      </div>
    );
  });
};
//validate youtube url
//https://stackoverflow.com/questions/28735459/how-to-validate-youtube-url-in-client-side-in-text-box

export default Video;
