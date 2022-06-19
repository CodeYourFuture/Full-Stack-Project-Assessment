import React, { useEffect, useState } from "react";
import videoData from "./exampleresponse.json";
import Likes from "./Likes";
import axios from "axios";
import Search from "./Search";

const baseURL = "http://localhost:5000";

const Videos = () => {
  const [videos, setVideos] = useState(videoData);

  //added use effect, now videos coming from the server
  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setVideos(response.data);
    });
  }, []);

  if (!videos) return null;

  //deletes post from the server
  const deleteVideo = (id) => (e) => {
    e.preventDefault();
    axios.delete(`${baseURL}/id`).then(() => {
      const output = videos.filter(
        (video) => video.id !== parseInt(e.target.id)
      );
      alert(`are sure you want to deleted this video?`);
      setVideos(output);
    });
  };

  return (
    <>
    <Search video={videoData} setVideos={setVideos}/>
      <div className="container">
        {videos.map((video, index) => {
          const after_ = video.url.substring(video.url.indexOf("=") + 1);

          return (
            <>
              <div className="card">
                <h2 className="title">{video.title}</h2>
                <Likes />
                <div className="iframe">
                  <iframe
                    width="250"
                    height="250"
                    src={`https://www.youtube.com/embed/${after_}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
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
    </>
  );
};

export default Videos;
