import React, { useState } from "react";
import YouTube from 'react-youtube';
import LikeDislike from "./LikeDislike";



function VideoAdder() {
  const [showForm, setShowForm] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoList, setVideoList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    const newVideo = {
      title: videoTitle,
      url: videoUrl,
    };
    setVideoList([...videoList, newVideo]);
    setShowForm(false);
  };

  const handleDelete = (title) => {
    setVideoList(videoList.filter((video) => video.title !== title));
  };

  const filteredVideos = videoList.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add a video" }
      </button>
      {showForm && (
        <form onSubmit={handleSubmit}>
         
          <label>
            Video Title:
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
            />
          </label>
          <br />
          <label>
            Video URL:
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </label>
          <br />
          <input type="submit" value="Add Video" />
        </form>
      )}
      <br />
      <label>
        Search:
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </label>
      <br />
      <div>
        {filteredVideos.map((video, index) => (
          <div key={index}>
            <LikeDislike />
            <h3>{video.title}</h3>
            <video width="320" height="240" controls>
              <source src={video.url} type="video/mp4" />
            </video>
            <br />
            <button onClick={() => handleDelete(video.title)}>
              Delete Video
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoAdder;
