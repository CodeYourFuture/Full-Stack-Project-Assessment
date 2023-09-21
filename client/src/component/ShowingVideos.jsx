import React, { useState } from "react";

function ShowingVideos(props) {
  const [videos, setVideos] = useState(props.result);

  function convertToEmbedUrl(url) {
    const videoId = url.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  function deleteVideo(id) {
    const updatedVideos = videos.filter((video) => video.id !== id);
    setVideos(updatedVideos);
  }

  function handleRating(id, type) {
    const updatedVideos = videos.map((video) => {
      if (video.id === id) {
        if (type === "thumbs-up") {
          return { ...video, rating: video.rating + 1 };
        } else if (type === "thumbs-down") {
          return { ...video, rating: video.rating - 1 };
        }
      }
      return video;
    });

    setVideos(updatedVideos);
  }

  const sortedVideos = [...videos].sort((a, b) => b.rating - a.rating);

  return (
    <div className="ShowingVideos">
      {sortedVideos.map((video) => (
        <div className="videos" key={video.id}>
          <p>{video.title}</p>
          <div className="buttons">
            <i
              className="fa-solid fa-thumbs-up"
              onClick={() => handleRating(video.id)}
            ></i>
            <h4>{video.rating}</h4>
            <i
              className="fa-solid fa-thumbs-down"
              onClick={() => handleRating(video.id)}
            ></i>
          </div>

          <iframe
            className="allVideos"
            width="300"
            height="220"
            src={convertToEmbedUrl(video.url)}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <button onClick={() => deleteVideo(video.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ShowingVideos;