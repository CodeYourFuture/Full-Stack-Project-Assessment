import React from "react";

const VideoCard = ({ videoData, setVideoData }) => {
  //console.log(videos);
  function handleDelete(id) {
    const deletedItem = videoData.filter((video) => video.id !== id);
    // console.log(deletedItem);
    setVideoData(deletedItem);
  }

  return (
    <div className="flex-container">
      {videoData.map((video) => {
        //console.log(video);
        return (
          <div key={video.id}>
            <p className="title">{video.title}</p>
            <iframe
              className="video"
              src={`https://www.youtube.com/embed/${video.url.slice(32)}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button onClick={() => handleDelete(video.id)}>Delete</button>
          </div>
        );
      })}
      hello there!!!
    </div>
  );
};

export default VideoCard;
