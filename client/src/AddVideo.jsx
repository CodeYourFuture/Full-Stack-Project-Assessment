import React, { useState } from "react";

function AddVideo({ videos, setVideos }) {
  const [showValid, Setvalid] = useState(true);
    const [newVideo, setNewVideo] = useState({});
   const [videoTitle, setTitle] = useState("");
  const [videoUrl, setUrl] = useState("");
  //   const [, setVideos] = useState(videos);

  const handleShowValid = () => {
    Setvalid(!showValid);}
  
   function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }
  const handleAddVideo = (event) => {
    event.preventDefault();
    videoTitle !== ""
      ? (newVideo.title = videoTitle)
      : alert("Please add a title for your video.");

    isValidUrl(videoUrl)
      ? (newVideo.url = videoUrl)
      : alert("Please add a valid url.");
    newVideo.rating = Math.floor(Math.random() * 5000) + 1;

 
 newVideo.id = videoUrl.split("=")[1];
    setVideos([newVideo, ...videos]);
     setNewVideo({});
    setTitle("");
    setUrl("");
  };

  return (
    <div>
      
        <form onSubmit={handleAddVideo}>
          <div>
            <label htmlFor="title">Tile:</label>
            <input
              type="text"
              id="title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <label htmlFor="url">Url:</label>
            <input
              type="text"
              id="url"
              onChange={(e) => {
                setUrl(e.target.value);
              }}
              required
            ></input>
          </div>
          <div>
            <button type="button" onClick={handleShowValid}>
              Cancel
            </button>
            <button type="submit">Add</button>
          </div>
        </form>
      
    </div>
  );
}

export default AddVideo;
