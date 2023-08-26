import { useState } from "react";

const AddVideo = ({ videos, setVideos }) => {
  const [videoName, setVideoName] = useState("");
  const [videoLink, setVideoLink] = useState("");
  function handleInputChange(event) {
    if (event.target.name === "name") {
      setVideoName(event.target.value);
    } else if (event.target.name === "url") {
      setVideoLink(event.target.value);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    let video = {
      id: Math.floor(Math.random() * 10000),
      title: videoName,
      url: videoLink,
      rating: Math.floor(Math.random() * 100),
    };
    console.log(video);
    const newVideoList = [...videos, video];
    setVideos(newVideoList);
    console.log(videos);
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="new-video">
        <input
          type="text"
          name="name"
          placeholder="Add a video name"
          value={videoName}
          onChange={handleInputChange}
        />
        <input
          type="url"
          name="url"
          placeholder="Add URL"
          value={videoLink}
          onChange={handleInputChange}
        />
        <button type="submit" onClick={handleSubmit}>
          Add Video
        </button>
      </div>
    </form>
  );
};

export default AddVideo;
