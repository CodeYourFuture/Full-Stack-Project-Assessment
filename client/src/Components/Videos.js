import React, { useState, useEffect } from "react";
// import videosData from "./exampleresponse.json";
import VideoCard from "./VideoCard";
import NewVideo from "./NewVideo";

function Videos({ newVideos, handleSubmit }) {
  const [videos, setVideos] = useState([]);

  const url = "https://fullstack-backend-qwia.onrender.com/videos";

    const getTheVideos = async () => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            setVideos(data);

        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getTheVideos();
    }, [])


console.log(videos)

  const handleDelete = (id) => {
    setVideos((prevVideosData) =>
      prevVideosData.filter((video) => video.id !== id)
    );
  };

  const addVideos = (video) => {
    console.log("this is video", video);
    setVideos([video, ...videos]);
    console.log("in add videos", videos);
  };

  return (
    <div>
      <NewVideo
        onAddNewVideo={addVideos}
      />
      <div className="video-container">
        {videos &&
          videos
            .sort((a, b) => b.rating - a.rating)
            .map((video) => {
              return (
                <VideoCard
                  key={video.id}
                  video={video}
                  handleDelete={handleDelete}
                  newVideos={newVideos}
                  handleSubmit={handleSubmit}
                />
              );
            })}
      </div>
    </div>
  );
}

export default Videos;
